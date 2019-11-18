from app import app, login_manager, db
from flask import request, jsonify, send_from_directory
from app.models import StoredFile, FileShare, Account, Folder
from flask_login import login_required, login_user, logout_user, current_user
from sqlalchemy.exc import IntegrityError
from flask_cors import cross_origin
import os
import sys


@login_manager.unauthorized_handler
def unauthorized():
    response = jsonify({"error": "Unauthorized, please log in."})
    return response, 403


@login_manager.user_loader
def load_user(user_id):
    account = Account.query.filter_by(id=user_id).first()
    return account


@app.route("/")
def index():
    return jsonify({"json": True})


@app.route("/api/user", methods=["POST"])
def create_user():
    form = request.json["email"]

    email = form["username"]
    if not email:
        return jsonify({"success": False, "error": "Specify username"})

    existing = Account.query.filter_by(email=email).first()
    if existing:
        return jsonify({"success": False, "error": "User already exists"})

    password = form["password"]
    if not password:
        return jsonify({"success": False, "error": "Specify a password"})

    account = Account(email, password)
    home = Folder("home", "", account.id)
    account.folders.append(home)
    db.session.add(account)
    db.session.commit()
    db.engine.dispose()

    registered = Account.query.filter_by(email=email).first()
    if not registered:
        return jsonify({"success": False, "error": "Failed to save user"})

    login_user(registered)

    return jsonify({"success": True, "user_id": registered.id})


@app.route("/api/user", methods=["DELETE"])
def delete_user():
    # TODO delete a user (log them out if it's current user)
    return jsonify({"success": True})


@app.route("/api/auth/login", methods=["POST"])
def login():
    form = request.json["email"]

    email = form["username"]
    if not email:
        return jsonify({"success": False, "error": "Specify username"})

    password = form["password"]
    if not password:
        return jsonify({"success": False, "error": "Specify a password"})

    account = Account.query.filter_by(email=email).first()

    if not account:
        return jsonify({"success": False, "error": "User doesn't exist"})

    if not password == account.password:
        return jsonify({"success": False, "error": "Wrong Password"})

    login_user(account)

    return jsonify({"success": True, "user_id": account.id})


@app.route("/api/auth/logout", methods=["POST"])
def logout():
    logout_user()
    return jsonify({"success": True})


@app.route("/api/<user>/files")
@login_required
def list_files(user):
    folders = Account.query.filter(Account.email == user).first().folders
    folderDicts = list(map(lambda f: f.toDict(), folders))
    return jsonify(folderDicts)


@app.route("/api/<user>/files/<folderId>/<id>")
@login_required
def download_file(user, id, folderId):
    f = StoredFile.query.filter(StoredFile.id == id).first()
    uploads = os.path.join(
        app.root_path, app.config["UPLOAD_FOLDER"], f.path.strip(f.name))
    return send_from_directory(directory=uploads, filename=f.name)


@app.route("/api/<user>/files/<folderId>", methods=["POST"])
# @login_required
def upload_file(user, folderId):
    uploads = os.path.join(app.root_path, app.config["UPLOAD_FOLDER"])
    file = None
    try:
        file = request.files["file"]
        if file:
            filename = file.filename
            userObject = Account.query.filter(Account.email == user).first()
            folderObject = Folder.query.filter(Folder.id == folderId).first()
            dirPath = os.path.join(uploads, user, folderObject.path)
            if not os.path.exists(dirPath):
                os.makedirs(dirPath)
            fullPath = os.path.join(dirPath, filename)
            appPath = os.path.join(user, folderObject.path, filename)
            file.save(fullPath)
            dbFile = StoredFile(
                userObject.id, userObject.email, appPath, filename)
            userObject.files.append(dbFile)
            folderObject.files.append(dbFile)
            db.session.add(dbFile)
            db.session.commit()
            db.engine.dispose()
        return jsonify({"success": True})
    except IntegrityError:
        return jsonify({"success": False, "error": "File already exists"})
    except Exception as e:
        print(e)
        error = "500"
        return jsonify({"success": False, "error": error})


@app.route("/api/<user>/file/<id>", methods=["DELETE"])
@login_required
def delete_file(user, id):
    try:
        fileData = StoredFile.query.filter(
            StoredFile.id == id
        ).first()
        file_path = os.path.join(
            app.root_path, app.config["UPLOAD_FOLDER"], fileData.path
        )
        os.remove(file_path)
        db.session.delete(fileData)
        db.session.commit()
        db.engine.dispose()
    except Exception as e:
        print(e)
        return jsonify({"success": False})
    return jsonify({"success": True})


@app.route("/api/<user>/file/<id>", methods=["PUT"])
@login_required
def rename_file(user, id):
    try:
        newName = request.json["name"]
        storedFile = StoredFile.query.filter(StoredFile.id == id).first()
        storedFile.name = newName
        db.session.add(storedFile)
        db.session.commit()
        db.engine.dispose()
    except Exception as e:
        print(e)
    return jsonify({"success": True})


@app.route("/api/<user>/shared")
def list_shared_with_user(user):
    files = (
        FileShare.query.filter(FileShare.userId == user).join(
            FileShare.fileItem).all()
    )
    fileDicts = list(map(lambda f: f.fileItem.toDict(), files))
    print(fileDicts)
    return jsonify(fileDicts)


@app.route("/api/<user>/folder/new", methods=["POST"])
def createFolder(user):
    try:
        name = request.json["name"]
        path = request.json["path"]
        if path.startswith("/"):
            path = path[1:]
        fullPath = os.path.join(
            app.root_path, app.config["UPLOAD_FOLDER"], user, path, name
        )
        os.makedirs(fullPath)
        folder = Folder(name, path, user)
        owner = Account.query.filter(Account.email == user).first()
        owner.folders.append(folder)
        parent = (
            Folder.query.filter(Folder.userId == owner.id)
            .filter(Folder.path == path)
            .first()
        )
        if parent:
            parent.subfolders.append(folder)
        db.session.add(owner)
        db.session.add(folder)
        db.session.commit()
        db.engine.dispose()
        return jsonify({"success": True})
    except FileExistsError:
        return jsonify({"success": False, "error": "Folder already exists"})
    except Exception:
        return jsonify({"success": False, "error": "Something went wrong!"})

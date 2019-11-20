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
    return send_from_directory("dist", "index.html")


@app.route("/dist.bundle.js")
def bundle():
    return send_from_directory("dist", "dist.bundle.js")


@app.route("/api/user", methods=["POST"])
def create_user():
    form = request.json["email"]

    email = form["username"]

    existing = Account.query.filter_by(email=email).first()
    if existing:
        response = jsonify({"success": False, "error": "User already exists"})
        return jsonify({"success": False, "error": "User already exists"}), 409

    password = form["password"]
    account = Account(email, password)
    # TODO: use os.path join
    home = Folder("home", email, account.id)
    account.folders.append(home)
    db.session.add(account)
    db.session.commit()
    db.engine.dispose()

    registered = Account.query.filter_by(email=email).first()
    if not registered:
        response = jsonify({"success": False, "error": "Failed to save user"})
        app.logger.error("Failed to create account %s.", account.email)
        return response, 500

    login_user(registered)
    app.logger.info("Account: %s created", account.email)

    return jsonify({"success": True, "user_id": registered.id})


@app.route("/api/user", methods=["DELETE"])
def delete_user():
    # TODO delete a user (log them out if it's current user)
    return jsonify({"success": True})


@app.route("/api/auth/login", methods=["POST"])
def login():
    form = request.json["email"]
    email = form["username"]
    password = form["password"]
    account = Account.query.filter_by(email=email).first()

    if not account:
        response = jsonify({"success": False, "error": "User doesn't exist"})
        return response, 404

    if not password == account.password:
        response = jsonify({"success": False, "error": "Wrong Password"})
        return response, 400

    login_user(account)
    app.logger.info("%s logged in.", account.email)

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
    print(folderDicts)
    return jsonify(folderDicts)


@app.route("/api/<user>/files/<folderId>/<id>")
@login_required
def download_file(user, id, folderId):
    f = StoredFile.query.filter(StoredFile.id == id).first()
    print(f.folder.path)
    uploads = os.path.join(
        app.root_path, app.config["UPLOAD_FOLDER"], f.folder.path
    )
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
            print(folderObject.name, folderObject.id)
            dirPath = os.path.join(uploads, folderObject.path)
            if not os.path.exists(dirPath):
                os.makedirs(dirPath)
            fullPath = os.path.join(dirPath, filename)
            appPath = os.path.join(folderObject.path, filename)
            file.save(fullPath)
            dbFile = StoredFile(
                userObject.id, userObject.email, appPath, filename)
            userObject.files.append(dbFile)
            folderObject.files.append(dbFile)
            db.session.add(dbFile)
            db.session.commit()
            db.engine.dispose()
        return jsonify({"success": True})
    except IntegrityError as e:
        app.logger.info("Integrity error in creating a file: %s", e)
        response = jsonify({"success": False, "error": "File already exists"})
        return response, 409
    except Exception as e:
        app.logger.info("Internal Server Error in creating a file: %s", e)
        error = "Internal Server Error"
        response = jsonify({"success": False, "error": error})
        return response, 500


@app.route("/api/<user>/file/<id>", methods=["DELETE"])
@login_required
def delete_file(user, id):
    try:
        fileData = StoredFile.query.filter(StoredFile.id == id).first()
        file_path = os.path.join(
            app.root_path, app.config["UPLOAD_FOLDER"], fileData.path
        )
        os.remove(file_path)
        db.session.delete(fileData)
        db.session.commit()
        db.engine.dispose()
    except Exception as e:
        app.logger.info("Internal Server Error in creating a file: %s", e)
        error = "Internal Server Error"
        return jsonify({"success": False, "error": error}), 500
    return jsonify({"success": True})


@app.route("/api/<user>/file/<id>", methods=["PUT"])
@login_required
def rename_file(user, id):
    try:
        newName = request.json["name"]
        storedFile = StoredFile.query.filter(StoredFile.id == id).first()
        oldPath = storedFile.path
        newPath = oldPath.strip(storedFile.name) + newName
        storedFile.name = newName
        storedFile.path = newPath
        StoredFile.modified = db.func.current_timestamp()
        oldFullPath = os.path.join(
            app.root_path, app.config["UPLOAD_FOLDER"], oldPath)
        newFullPath = os.path.join(
            app.root_path, app.config["UPLOAD_FOLDER"], newPath)
        os.rename(oldFullPath, newFullPath)
        db.session.add(storedFile)
        db.session.commit()
        db.engine.dispose()
        app.logger.info("Renamed %s to %s", oldPath, newPath)
    except Exception as e:
        app.logger.info("Internal Server Error in renaming a file: %s", e)
        error = "Internal Server Error"
        return jsonify({"success": False, "error": error}), 500
    return jsonify({"success": True})


@app.route("/api/<user>/shared")
def list_shared_with_user(user):
    files = (
        FileShare.query.filter(FileShare.userId == user).join(
            FileShare.fileItem).all()
    )
    fileDicts = list(map(lambda f: f.fileItem.toDict(), files))
    return jsonify(fileDicts)


@app.route("/api/<user>/folder/new", methods=["POST"])
def create_folder(user):
    try:
        name = request.json["name"]
        path = request.json["path"]
        print(path)
        if path.startswith("/"):
            path = path[1:]
        if path.endswith("/"):
            path = path[:-1]
        fullPath = os.path.join(
            app.root_path, app.config["UPLOAD_FOLDER"], path, name)
        os.makedirs(fullPath)
        appPath = os.path.join(path, name)
        folder = Folder(name, appPath, user)
        owner = Account.query.filter(Account.email == user).first()
        owner.folders.append(folder)
        parent = (
            Folder.query.filter(Folder.userId == owner.id)
            .filter(Folder.path == path)
            .first()
        )
        if parent is not None:
            folder.parent = parent
        db.session.add(folder)
        db.session.add(owner)
        db.session.commit()
        db.engine.dispose()
        print(folder.toDict())
        app.logger.info("Created folder %s.", folder.path)
        return jsonify({"success": True})
    except FileExistsError:
        app.logger.info("Trying to create existing directory")
        error = "Folder already exists"
        return jsonify({"success": False, "error": error}), 409
    except Exception as e:
        app.logger.info("Error in making a directory: %s", e)
        return jsonify({"success": False, "error": "Internal Server Error"})

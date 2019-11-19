from app import app, login_manager, db
from flask import request, jsonify, send_from_directory
from app.models import StoredFile, FileShare, Account
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
    # TODO: The form validation should be handled in frontend.
    if not email:
        return jsonify({"success": False, "error": "Specify username"})

    existing = Account.query.filter_by(email=email).first()
    if existing:
        response = jsonify({"success": False, "error": "User already exists"})
        return jsonify({"success": False, "error": "User already exists"}), 409

    password = form["password"]
    if not password:
        return jsonify({"success": False, "error": "Specify a password"})

    account = Account(email, password)
    db.session.add(account)
    db.session.commit()
    db.engine.dispose()

    registered = Account.query.filter_by(email=email).first()
    if not registered:
        response = jsonify({"success": False, "error": "Failed to save user"})
        return response, 500

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
        response = jsonify({"success": False, "error": "User doesn't exist"})
        return response, 404

    if not password == account.password:
        response = jsonify({"success": False, "error": "Wrong Password"})
        return response, 400

    login_user(account)

    return jsonify({"success": True, "user_id": account.id})


@app.route("/api/auth/logout", methods=["POST"])
def logout():
    logout_user()
    return jsonify({"success": True})


@app.route("/api/<user>/files")
@login_required
def list_files(user):
    files = StoredFile.query.filter(StoredFile.ownerEmail == user).all()
    fileDicts = list(map(lambda f: f.toDict(), files))
    return jsonify(fileDicts)


@app.route("/api/<user>/files/<id>")
@login_required
def download_file(user, id):
    print("GET FILE")
    f = StoredFile.query.filter(StoredFile.id == id).first()
    uploads = os.path.join(app.root_path, app.config["UPLOAD_FOLDER"], user)
    return send_from_directory(directory=uploads, filename=f.name)


@app.route("/api/<user>/files", methods=["POST"])
@login_required
def upload_file(user):
    uploads = os.path.join(app.root_path, app.config["UPLOAD_FOLDER"], user)
    if not os.path.exists(uploads):
        os.makedirs(uploads)
    file = None
    try:
        file = request.files["file"]
        if file:
            filename = file.filename
            userObject = Account.query.filter(Account.email == user).first()
            fullPath = os.path.join(
                app.root_path, app.config["UPLOAD_FOLDER"], user, filename
            )
            file.save(fullPath)
            dbFile = StoredFile(userObject.id, userObject.email, fullPath, filename)
            userObject.files.append(dbFile)
            db.session.add(dbFile)
            db.session.commit()
            db.engine.dispose()
        return jsonify({"success": True})
    except IntegrityError:
        response = jsonify({"success": False, "error": "File already exists"})
        return response, 409
    except Exception:
        print(sys.exc_info()[2])
        error = "Internal Server Error"
        response = jsonify({"success": False, "error": error})
        return response, 500


@app.route("/api/<user>/files/<id>", methods=["DELETE"])
@login_required
def delete_file(user, id):
    file_path = None  # TODO get Path from database
    # TODO delete teh file
    return jsonify({"success": True})


@app.route("/api/<user>/files/<id>", methods=["PUT"])
@login_required
def rename_file(user, id):
    # TODO get the new name from the request
    return jsonify({"success": True})


@app.route("/api/<user>/shared")
def list_shared_with_user(user):
    files = (
        FileShare.query.filter(FileShare.userId == user).join(FileShare.fileItem).all()
    )
    fileDicts = list(map(lambda f: f.fileItem.toDict(), files))
    print(fileDicts)
    return jsonify(fileDicts)

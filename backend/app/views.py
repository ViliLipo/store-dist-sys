from app import app
from flask import jsonify, send_from_directory
from app.models import StoredFile, FileShare, Account
from flask_login import login_required, login_user, logout_user, current_user
import os


@app.route("/")
def index():
    return jsonify({"json": True})


@app.route("/api/user", methods=["POST"])
def create_user():
    # TODO create a new user
    return jsonify({"success": True, "user_id": "01f009e0-76ad-423c-8439-37257df04880"})


@app.route("/api/user", methods=["DELETE"])
def delete_user():
    # TODO delete a user (log them out if it's current user)
    return jsonify({"success": True})


@app.route("/api/auth/login", methods=["POST"])
def login():
    response = jsonify(
        {"success": True, "user_id": "01f009e0-76ad-423c-8439-37257df04880"})
    
    # TODO get the user and verify password.
    
    access_token = "xxxxx.yyyyy.zzzzz" # TODO Generate access token
    user = {"access_token": access_token}

    login_user(user)
    response.set_cookie("access_token", access_token)

    return response


@app.route("/api/auth/logout", methods=["POST"])
def logout():
    response = jsonify({"success": True})
    response.set_cookie("access_token", "")

    logout_user(current_user)
    return response


@app.route("/api/<user>/files")
@login_required
def list_files(user):
    files = StoredFile.query.filter(StoredFile.ownerId == user).all()
    fileDicts = list(map(lambda f: f.toDict(), files))
    return jsonify(fileDicts)


@app.route("/api/<user>/files/<id>")
@login_required
def download_file(user, id):
    file_path = None  # TODO get Path from database
    uploads = os.path.join(app.root_path, app.config["UPLOAD_FOLDER"], user)
    return send_from_directory(directory=uploads, filename=file_path)


@app.route("/api/<user>/files", methods=["POST"])
@login_required
def upload_file(user):
    uploads = os.path.join(app.root_path, app.config["UPLOAD_FOLDER"], user)
    file = None
    try:
        file = request.files['file']
        if file:
            filename = file.filename
            # TODO Add file to database
            file.save(uploads, filename)

        return jsonify({"success": True})
    except error:
        return jsonify({"success": False, "error": error})


@app.route("/api/<user>/files/<id>", methods = ["DELETE"])
@login_required
def delete_file(user, id):
    file_path=None  # TODO get Path from database
    # TODO delete teh file
    return jsonify({"success": True})


@app.route("/api/<user>/files/<id>", methods = ["PUT"])
@login_required
def rename_file(user, id):
    # TODO get the new name from the request
    return jsonify({"success": True})


@app.route("/api/<user>/shared")
def list_shared_with_user(user):
    files = FileShare.query.filter(
        FileShare.userId == user).join(FileShare.fileItem).all()
    fileDicts = list(map(lambda f: f.fileItem.toDict(), files))
    print(fileDicts)
    return jsonify(fileDicts)

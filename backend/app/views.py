from app import app
from flask import jsonify, send_from_directory
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
    # TODO delete a user
    return jsonify({"success": True})


@app.route("/api/auth/login", methods=["POST"])
def login():
    response = jsonify(
        {"success": True, "user_id": "01f009e0-76ad-423c-8439-37257df04880"})
    # TODO Generate access token
    response.set_cookie("access_token", "xxxxx.yyyyy.zzzzz")
    return response


@app.route("/api/auth/logout", methods=["POST"])
def logout():
    response = jsonify({"success": True})
    response.set_cookie("access_token", "")
    return response


@app.route("/api/<user>/files")
def list_files(user):
    # TODO Get files of the user
    return jsonify(
        [
            {
                "id": "1",
                "name": "first.png",
                "path": "folder/example.png",
                "sha1_hash": "43A025512880D4A84012721C4DD82B736988C07D",
            },
            {
                "id": "2",
                "name": "second.png",
                "path": "folder/xd/example.png",
                "sha1_hash": "43A025512880D4A84012721C4DD82B736988C07E",
            },
        ]
    )


@app.route("/api/<user>/files/<id>")
def download_file(user, id):
    file_path = None  # TODO get Path from database
    uploads = os.path.join(app.root_path, app.config["UPLOAD_FOLDER"], user)
    return send_from_directory(directory=uploads, filename=file_path)


@app.route("/api/<user>/files", methods=["POST"])
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
def delete_file(user, id):
    file_path=None  # TODO get Path from database
    # TODO delete teh file
    return jsonify({"success": True})


@app.route("/api/<user>/files/<id>", methods = ["PUT"])
def rename_file(user, id):
    # TODO get the new name from the request
    return jsonify({"success": True})

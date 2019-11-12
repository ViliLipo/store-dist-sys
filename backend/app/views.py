from app import app
from flask import jsonify, send_from_directory
from app.models import StoredFile
import os


@app.route("/")
def index():
    return jsonify({"json": True})


@app.route("/api/<user>/files")
def list_files(user):
    # TODO Get files of the user
    files = StoredFile.query.filter(StoredFile.owner == user)\
            .order_by(StoredFile.created.desc())
    fileDicts = map(lambda f: f.toDict(), files)
    return jsonify(fileDicts)


@app.route("/api/<user>/files/<path:file_path>")
def download_file(user, file_path):
    # TODO Set UPLOAD_FOLDER and add user specific stuff
    uploads = os.path.join(app.root_path, app.config["UPLOAD_FOLDER"])
    return send_from_directory(directory=uploads, filename=file_path)


@app.route("/api/<user>/files", methods=["POST"])
def upload_file(user):
    # TODO get the file from the post request
    return jsonify({"success": True})

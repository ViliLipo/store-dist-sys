from app import app
from flask import jsonify


@app.route("/")
def index():
    return jsonify({"json": True})


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


@app.route("/api/<user>/files/<path:file_path>")
def download_file(user, file_path):
    # TODO Set UPLOAD_FOLDER and add user specific stuff
    uploads = os.path.join(app.root_path, app.config["UPLOAD_FOLDER"])
    return send_from_directory(directory=uploads, filename=filename)


@app.route("/api/<user>/files", methods=["POST"])
def upload_file(user):
    # TODO get the file from the post request
    return jsonify({"success": True})

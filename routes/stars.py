from flask import Flask, jsonify, request, make_response, send_from_directory
from werkzeug.utils import secure_filename
from db.database import database
import util.cfg as cfg

from . import routes

FILE_LOCATION = cfg.FILE_PATH

# Retrieve list of stars
@routes.route('/stars', methods=["GET"])
def getStars():
    # TODO add pagination(?)
    stars = database.getStars()
    return jsonify(stars)
    # SQLite objects created in a thread can only be used in that same thread. The object was created in thread id 44332 and this is thread id 45968.


# Create a new star
@routes.route('/stars', methods=["POST"])
def addStar():
    # read multipart data
    # write file to filesystem
    # get correct path of file
    # call database.createStar()
    if 'files' not in request.files:
        return '', 403
        # TODO https://www.reddit.com/r/flask/comments/vxxhzv/comment/ifyt6tk/?utm_source=share&utm_medium=web2x&context=3

    files = request.files.getlist("files")
    for f in files:
        f_name = secure_filename(f.filename)
        f.save(FILE_LOCATION + f_name)
        database.createStar(star_properties=[request.form.get('name'), FILE_LOCATION + f_name])

    return '', 204

# Retrieve a star
@routes.route('/stars/<int:star_id>', methods=["GET"])
def getStar(star_id: int):
    star = database.getStarByID(star_id)
    return jsonify(star)

# Update an existing star
### Add or remove star from cluster
@routes.route('/stars/<int:star_id>', methods=["PUT"])
def updateStar(star_id: int):
    body = request.get_json()
    # request.json['cluster_id']
    # request.json['action'] == "add" / "remove"
    # request.json['cluster_ids']

    """
    {
        "action": "add", # "add", "remove", "set"
        "clusters": [
            1,
            2,
            3
        ]
    }
    """
    star = database.getStarByID(star_id)
    return jsonify(star)

# Delete a star
@routes.route('/stars/<int:star_id>', methods=["DELETE"])
def deleteStar(star_id: int):
    database.deleteStarByID(star_id)
    return '', 204

@routes.route('/stars/<int:star_id>/resource', methods=["GET"])
def serveResourceByStarId(star_id):
    filepath = database.getResourcePathByStarId(star_id)
    return send_from_directory(FILE_LOCATION[:-1], filepath)
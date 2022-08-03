from flask import Flask, jsonify, request, make_response, send_from_directory, abort
from werkzeug.utils import secure_filename
from db.database import database
import util.cfg as cfg

from . import routes

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
        f.save(cfg.FILE_PATH + f_name)

        # set name of star to filename
        database.createStar(star_properties=[f_name, cfg.FILE_PATH + f_name])

    return '', 204

# Retrieve a star
@routes.route('/stars/<int:star_id>', methods=["GET"])
def getStar(star_id: int):
    star = database.getStarByID(star_id)
    return jsonify(star)

# # Update an existing star
# @routes.route('/stars/<int:star_id>', methods=["PATCH"])
# def updateStar(star_id: int):
#     body = request.get_json()
#     # request.json['cluster_id']
#     # request.json['action'] == "add" / "remove"
#     # request.json['cluster_ids']

#     """
#     {
        
#     }
#     """
#     star = database.getStarByID(star_id)
#     return jsonify(star)

# Delete a star
@routes.route('/stars/<int:star_id>', methods=["DELETE"])
def deleteStar(star_id: int):
    database.deleteStarByID(star_id)
    return '', 204

@routes.route('/stars/<int:star_id>/resource', methods=["GET"])
def serveResourceByStarId(star_id):
    filepath, error = database.getResourcePathByStarId(star_id)

    if filepath:
        return send_from_directory(cfg.FILE_PATH[:-1], filepath)
    else:
        abort(error['code'], error['message'])


# https://stackoverflow.com/a/53614394
@routes.route('/stars/<int:star_id>', methods=['PATCH'])
def addStarToClusters(star_id):
    body = request.get_json()

    if not body["actions"]:
        return '', 400 # bad request

    if len(body["actions"]) == 0:
        return '', 400 # bad request

    rows_affected = 0
    total_actions = 0
    for action in body["actions"]:
        total_actions += len(action['clusters'])   
        if action['action'] == 'add':
            rows_affected += database.addStarToClusters(star_id, action['clusters'])
            
        elif action['action'] == 'remove':
            rows_affected += database.removeStarFromClusters(star_id, action['clusters'])
            print(rows_affected)

        elif action['action'] == "replace":
            pass     

        
    if rows_affected == total_actions:
        return '', 200
        
    elif rows_affected > 0:
        return 'worked somewhat', 200
        
    elif rows_affected == 0:
        return '', 404

    """
    {
        "actions": [
            { "action": "add", "clusters": [1, 2, 3] },
            { "action": "remove", "clusters": [1, 2, 3] },
            { "action": "replace", "clusters": [1, 2, 3] },
        ]
    }
    """

''' 
example patch data
[
  { "op": "replace", "path": "/baz", "value": "boo" },
  { "op": "add", "path": "/hello", "value": ["world"] },
  { "op": "remove", "path": "/foo" }
]
'''

@routes.route('/startest', methods=['GET'])
def temp():
    database.tempstar(1)
    return '', 200
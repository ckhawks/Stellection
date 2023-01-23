from flask import Flask, jsonify, request, make_response, send_from_directory, abort # WAAZUP BUIG GUY
from werkzeug.utils import secure_filename
from db.database import database
import util.cfg as cfg

from . import routes

# Retrieve list of stars
@routes.route('/stars', methods=["GET"])
async def getStars():
    # TODO add pagination(?)
    # limit and offset in sql 
    stars, _ = await database.getStars()
    return jsonify(stars)
    # SQLite objects created in a thread can only be used in that same thread. The object was created in thread id 44332 and this is thread id 45968.


# Create a new star
@routes.route('/stars', methods=["POST"])
async def addStar():
    # read multipart data
    # write file to filesystem
    # get correct path of file
    # call database.createStar()
    if 'files' not in request.files:
        abort(400, "No file(s) included.")
        # TODO https://www.reddit.com/r/flask/comments/vxxhzv/comment/ifyt6tk/?utm_source=share&utm_medium=web2x&context=3

    # request.clusters
    clusterIds = None
    # add optional argument to database.createStar(clusters=None)
    if 'clusters' in request.form:
        print(request.form.get('clusters')) # "2,5"
        if clusters := request.form.get('clusters'):
            clusterIds = [int(cluster_id) for cluster_id in clusters.split(",")]
            print(clusterIds)

    files = request.files.getlist("files")
    stars = {"stars": []}
    for f in files:
        f_name = secure_filename(f.filename)
        f.save(cfg.FILE_PATH + f_name)

        # set name of star to filename
        star, _ = await database.createStar(star_properties=[f_name, f_name], clusters=clusterIds)
        stars['stars'].append(star)

    return jsonify(stars), 200

# Retrieve a star
@routes.route('/stars/<int:star_id>', methods=["GET"])
async def getStar(star_id: int):
    star, error = await database.getStarByID(star_id)
    if error:
        abort(error['code'], error['message'])
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
async def deleteStar(star_id: int):
    element, error = await database.deleteStarByID(star_id)
    return '', 204

@routes.route('/stars/<int:star_id>/resource', methods=["GET"])
async def serveResourceByStarId(star_id):
    filepath, error = await database.getResourcePathByStarId(star_id)

    if filepath:
        return send_from_directory(cfg.FILE_PATH[:-1], filepath)
    else:
        abort(error['code'], error['message'])


# https://stackoverflow.com/a/53614394
@routes.route('/stars/<int:star_id>', methods=['PATCH'])
async def addStarToClusters(star_id):
    body = request.get_json()

    if not body:
        abort(400, 'No data supplied')

    if not body["actions"]:
        abort(400, 'No data supplied')

    if len(body["actions"]) == 0:
        return '', 400 # bad request

    rows_affected = 0
    total_actions = 0
    for action in body["actions"]:
        total_actions += len(action['clusters'])   
        if action['action'] == 'add':
            temp_rows_affected, error = await database.addStarToClusters(star_id, action['clusters'])
            
            if not temp_rows_affected:
                abort(error['code'], error['message'])

            rows_affected += temp_rows_affected
            
        elif action['action'] == 'remove':
            rows_affected += await database.removeStarFromClusters(star_id, action['clusters'])
            print(rows_affected)

        elif action['action'] == "replace":
            pass     

        
    if rows_affected == total_actions:
        star = await database.getStarByID(star_id)
        return jsonify(star), 200
        
    elif rows_affected > 0:
        star = await database.getStarByID(star_id)
        return jsonify(star)
        return 'worked somewhat', 200 # TODO how do we send both object and error about partial failure
        
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

    # response:
    """
    {
        "error": {'code': 404, 'message': 'Star not found'}
        "star": {
            normal star getStar thing
        }
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

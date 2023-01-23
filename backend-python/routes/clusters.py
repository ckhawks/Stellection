from flask import Flask, jsonify, request, make_response, send_from_directory, abort
from werkzeug.utils import secure_filename
from db.database import database

from . import routes

@routes.route('/clusters', methods=["GET"])
async def getClusters():
    # TODO add pagination(?)
    clusters = await database.getClusters()
    return jsonify(clusters[0])

# Create a new cluster
@routes.route('/clusters', methods=["POST"])
async def addCluster():
    body = request.get_json()
    cluster, error = await database.createCluster(name=body['name'])
    if error:
        abort(error['code'], error['message'])
    else:
        return '', 204

# Retrieves a cluster by id, including list of stars
@routes.route('/clusters/<int:cluster_id>', methods=['GET'])
async def getCluster(cluster_id: int):
    cluster, _ = await database.getClusterByID(cluster_id)
    return jsonify(cluster), 200

# Update an existing cluster
@routes.route('/clusters/<int:cluster_id>', methods=["PATCH"])
async def updateCluster(cluster_id):
    body = request.get_json()

    success, message = await database.updateClusterByID(cluster_id=cluster_id, properties=body)

    if (success):
        cluster = database.getClusterByID(cluster_id)
        return jsonify(cluster), 200
        #return message, 200
    else:
        return message, 400

"""
{
    "cluster_name": "new name"
}
"""

# Delete a cluster
@routes.route('/clusters/<int:cluster_id>', methods=["DELETE"])
async def deleteCluster(cluster_id):
    deleted, _ = await database.deleteClusterByID(cluster_id)

    if(deleted > 0):
        return '', 200
    else:
        return '', 404

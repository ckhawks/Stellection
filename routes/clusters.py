from flask import Flask, jsonify, request, make_response, send_from_directory
from werkzeug.utils import secure_filename
from db.database import database

from . import routes

@routes.route('/clusters', methods=["GET"])
def getClusters():
    # TODO add pagination(?)
    clusters = database.getClusters()
    return jsonify(clusters)

# Retrieves a cluster by id, including list of stars
@routes.route('/clusters/<int:cluster_id>', methods=['GET'])
def getCluster(cluster_id: int):
    cluster = database.getClusterByID(cluster_id)
    return jsonify(cluster)

# Create a new cluster
@routes.route('/clusters', methods=["POST"])
def addCluster():
    body = request.get_json()
    database.create_cluster(body) # TODO change arguments
    return '', 204

# Update an existing cluster
@routes.route('/clusters/<int:cluster_id>', methods=["PUT"])
def updateCluster(cluster_id):
    cluster = database.get_cluster(cluster_id)
    return jsonify(cluster)

# Delete a cluster
@routes.route('/clusters/<int:cluster_id>', methods=["DELETE"])
def deleteCluster(cluster_id):
    cluster = database.get_cluster(cluster_id)
    return jsonify(cluster)

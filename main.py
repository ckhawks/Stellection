from flask import Flask, jsonify, request, make_response
from werkzeug.utils import secure_filename

from db import db_test as database

API_VERSION = "0.0.1"
FILE_LOCATION = "files/"

"""
file layout reference
-- main.py
-- /libraries
    - /library1/
        - galaxy.db
        - files
    - /library2/
        - galaxy.db
        - files
"""

app = Flask(__name__)

@app.route("/")
def hello_world():
    return f"stellection cataloger v{API_VERSION}"

# Retrieve list of stars
@app.route('/stars', methods=["GET"])
def getStars():
    # TODO add pagination(?)
    stars = database.getStars()
    return jsonify(stars)
    # SQLite objects created in a thread can only be used in that same thread. The object was created in thread id 44332 and this is thread id 45968.

# Create a new star
@app.route('/stars', methods=["POST"])
def addStar():
    # read multipart data
    # write file to filesystem
    # get correct path of file
    # call database.createStar()
    if 'files' not in request.files:
        return '', 403

    files = request.files.getlist("files")
    for f in files:
        f_name = secure_filename(f.filename)
        f.save(FILE_LOCATION + f_name)
        database.createStar(star_properties=[request.form.get('name'), FILE_LOCATION + f_name])

    return '', 204

# Retrieve a star
@app.route('/stars/<int:star_id>', methods=["GET"])
def getStar(star_id: int):
    star = database.getStarByID(star_id)
    return jsonify(star)

# Update an existing star
@app.route('/stars/<int:star_id>', methods=["PUT"])
def updateStar(star_id: int):
    body = request.get_json()
    star = database.getStarByID(star_id)
    return jsonify(star)

# Delete a star
@app.route('/stars/<int:star_id>', methods=["DELETE"])
def deleteStar(star_id: int):
    database.deleteStarByID(star_id)
    return '', 204

# Retrieve a list of clusters
@app.route('/clusters', methods=["GET"])
def getClusters():
    # TODO add pagination(?)
    clusters = database.getClusters()
    return jsonify(clusters)

# Create a new cluster
@app.route('/clusters', methods=["POST"])
def addCluster():
    body = request.get_json()
    database.create_cluster(body) # TODO change arguments
    return '', 204

# Retrieve a cluster
@app.route('/clusters/<int:cluster_id>', methods=["GET"])
def getCluster(cluster_id):
    cluster = database.get_cluster(cluster_id)
    return jsonify(cluster)

# Update an existing cluster
@app.route('/clusters/<int:cluster_id>', methods=["PUT"])
def updateCluster(cluster_id):
    cluster = database.get_cluster(cluster_id)
    return jsonify(cluster)

# Delete a cluster
@app.route('/clusters/<int:cluster_id>', methods=["DELETE"])
def deleteCluster(cluster_id):
    cluster = database.get_cluster(cluster_id)
    return jsonify(cluster)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    database = database.DB()

    app.run(debug=True)
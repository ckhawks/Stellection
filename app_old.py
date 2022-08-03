from flask import Flask, jsonify, request, make_response, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS


# from db import db_test as database
from db import database as Database

API_VERSION = "0.0.1"
FILE_LOCATION = "files/"

APP_PORT = 5000
APP_ADDRESS = "0.0.0.0"
# ENV = "prod"
ENV = "test"


# https://www.reddit.com/r/flask/comments/8g7ruf/comment/dy9q3yx/?utm_source=share&utm_medium=web2x&context=3

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
CORS(app)

# TODO better error-handling when resources don't exist (return HTTP error codes)
### handle error codes on frontend too

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
        # TODO https://www.reddit.com/r/flask/comments/vxxhzv/comment/ifyt6tk/?utm_source=share&utm_medium=web2x&context=3

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
### Add or remove star from cluster
@app.route('/stars/<int:star_id>', methods=["PUT"])
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

# Retrieves a cluster by id, including list of stars
@app.route('/clusters/<int:cluster_id>', methods=['GET'])
def getCluster(cluster_id: int):
    cluster = database.getClusterByID(cluster_id)
    return jsonify(cluster)

# Create a new cluster
@app.route('/clusters', methods=["POST"])
def addCluster():
    body = request.get_json()
    database.create_cluster(body) # TODO change arguments
    return '', 204

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

# # serve a local static resource (file) from the files directory
# @app.route('/file/<path:filepath>', methods=["GET"])
# def serveFile(filepath):
#     return send_from_directory(FILE_LOCATION[:-1], filepath)

# serve a local static resource (file) from the files directory, BASED on the star ID
@app.route('/stars/<int:star_id>/resource', methods=["GET"])
def serveResourceByStarId(star_id):
    filepath = database.getResourcePathByStarId(star_id)
    return send_from_directory(FILE_LOCATION[:-1], filepath)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    database = Database.DB()

    if(ENV == 'test'):
        app.run(debug=True, port=APP_PORT, host=APP_ADDRESS)
    else:
        from waitress import serve
        serve(app, host=APP_ADDRESS, port=APP_PORT)

        # https://flask.palletsprojects.com/en/1.1.x/server/
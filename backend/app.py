from flask import Flask, render_template # These are all we need for our purposes
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# CORS(app, origins=["origin1", "origin2"]) 

"""@app.route("/")
def index():
    return render_template("index.html", **{"greeting": "Hello from Flask!"})"""

@app.route("/greeting")
def greeting():
    return {"greeting": "Hello from Flask!"}
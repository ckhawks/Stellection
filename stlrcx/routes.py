import os
from flask import render_template, url_for, flash, redirect, request, send_from_directory
from stlrcx import app  #, db, bcrypt

@app.route("/")
def home():
    images = os.listdir(imageDir)
    return render_template('home.jinja', images=images, imageDir=imageDir)

imageDir = "/Users/stellaric/Downloads/testing/"

@app.route('/uploads/<path:filename>')
def download_file(filename):
    return send_from_directory(imageDir, filename, as_attachment=True) # as_attachemnt=False
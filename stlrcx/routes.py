import os
import random
from flask import render_template, url_for, flash, redirect, request, send_from_directory
from stlrcx import app  #, db, bcrypt
from stlrcx.models import *

@app.route("/")
def home():
    files = File.query.limit(2)

    tags = Tag.query.all()
    
    return render_template('home.jinja', files=files, imageDir=imageDir, tags=tags)

imageDir = "/Users/stellaric/Downloads/testing/"

@app.route('/uploads/<path:filename>')
def download_file(filename):
    return send_from_directory(imageDir, filename, as_attachment=True) # as_attachemnt=False

# url args source https://stackoverflow.com/a/46321103

@app.route('/tag/<tag_name>')
def view_tag(tag_name):

    order = request.args.get('order', default = 'asc', type = str)

    # tag_name -> tag id -> find matching file_ids from r_tag_file -> return files as list of files

    tag = Tag.query.filter_by(tag_name=tag_name).first()
    
    if not tag:
        print("tag doesn't exist")
        return

    rfiles = RTagFile.query.filter_by(tag_id=tag.id).all()
    if order == "rand":
        random.shuffle(rfiles)

    files = list()
    for rfile in rfiles:
        files.append(File.query.get(rfile.file_id))

    tags = Tag.query.all()

    return render_template('view_tag.jinja', files=files, tags=tags)

@app.route('/img/<id>')
def view_image(id):

    file = File.query.filter_by(id=id).first()

    if not file:
        print("image doesn't exist")
        return
    
    tags = Tag.query.all()

    return render_template('view_image.jinja', file=file, tags=tags)
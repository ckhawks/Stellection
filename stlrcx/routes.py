import os
import random
from flask import render_template, url_for, flash, redirect, request, send_from_directory
from stlrcx import app, db  #, db, bcrypt
from datetime import datetime
from stlrcx.models import File, Tag, RTagFile, User

@app.route("/")
def home():
    files = File.query.all()

    tags = Tag.query.all()

    order = request.args.get('order', default = 'asc', type = str)
    if order == "rand":
        random.shuffle(files)
    
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

@app.route('/img/<id>', methods=['GET', 'POST'])
def view_image(id):


    # check if there's a file for that id
    file = File.query.filter_by(id=id).first()

    if not file:
        print("image doesn't exist")
        return

    tags = Tag.query.all()
    
    # getting all tags associated with image 
    file_with_tags = RTagFile.query.filter_by(file_id=file.id).all()
    filetags = [int(f.tag_id) for f in file_with_tags]

    if request.method == 'GET':
        return render_template('view_image.jinja', file=file, filetags=filetags, tags=tags)


    elif request.method == 'POST':

        bulk = list()
        output_string = []
        for tag in tags:
            tag_id = request.form.get(f'tagid_{tag.id}')
            
            # going through checklist to see if tag is checked
            if tag_id:
                print("PART 1 ")
                tag_id = int(tag_id)
                # making sure that we are not assigning the same tag to file 
                if tag_id not in filetags:
                    output_string.append(f'added to <b>{tag.tag_name}</b>')
                    bulk.append(RTagFile(file_id=file.id, tag_id=tag_id))

            
            # if there is no tag_id but it is associated with file, remove it 
            elif not tag_id and tag.id in filetags:
                output_string.append(f'deleted from <b>{tag.tag_name}</b>')
                rtag = RTagFile.query.filter_by(tag_id=tag.id, file_id=file.id).first()
                if rtag:
                    db.session.delete(rtag)
                    
            
        db.session.bulk_save_objects(bulk)
        db.session.commit()

        # getting all tags associated with image (up-to-date list)
        file_with_tags = RTagFile.query.filter_by(file_id=file.id).all()
        filetags = [int(f.tag_id) for f in file_with_tags]

        if output_string:
            flash(f'Updated! Changes: ' + ', '.join(output_string) + f' <span class="font-weight-light float-right">{datetime.now().strftime("%m/%d/%Y, %H:%M:%S %Z")}</span>', 'success')

        return render_template('view_image.jinja', file=file, filetags=filetags, tags=tags)

# image sorting view to do later, similar to view_image BUT DIFFERNET
@app.route('/sort/<id>', methods=['GET', 'POST'])
def sort_images(id):
    print()
                
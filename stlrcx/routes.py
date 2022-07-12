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
    
    return render_template('home.jinja', files=files, imageDir=imageDir, tags=tags, show_taglist=True)

imageDir = "D:\\Downloads\\stellection_testing"

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

    return render_template('view_tag.jinja', files=files, tags=tags, show_taglist=True)

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
            
@app.route('/sort', methods=['GET', 'POST'])
def sorter():
    id = 1

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
        return render_template('sorter.jinja', file=file, filetags=filetags, tags=tags)

    elif request.method == 'POST':
        return render_template('sorter.jinja', file=file, filetags=filetags, tags=tags)

# image sorting view to do later, similar to view_image BUT DIFFERNET
@app.route('/sort/<id>', methods=['GET', 'POST'])
def sort_images(id=None):

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
        return render_template('sorter.jinja', file=file, filetags=filetags, tags=tags)

    elif request.method == 'POST':
        return render_template('sorter.jinja', file=file, filetags=filetags, tags=tags)

@app.route('/tags', methods=['GET', 'POST'])
def tags():

    tags = Tag.query.all()

    if request.method == 'GET':

        return render_template('tags.jinja', tags=tags, RTagFile=RTagFile)

    elif request.method == 'POST':

        output_string = []

        # TODO move create_tag functionality to this page

        # TODO go through request arguments and check if any one has a value of "Delete" ? instead of going through all tags
        # or if any of them contain tagid in key and Delete in value

        # TODO add confirmation prompt on frontend delete button "Are you sure you want to delete tag 'bruh' ? It has 21031 images currently associated with it. "
        
        # getting new tag to be added to db
        new_tag_name = request.form.get('new_tag_name')
            # checking to make sure tag is not already in db
        if new_tag_name:
            tags_names = [tag.tag_name for tag in tags]
            if new_tag_name not in tags_names:
                db.session.add(Tag(tag_name=new_tag_name))
                db.session.commit()

                output_string.append(f'created tag <b>{new_tag_name}</b>')
                
            
            else:
                output_string.append(f'tag with name <b>{new_tag_name}</b> already exists')

        else:
            for tag in tags:

                delete_tag = request.form.get(f'tagid_{tag.id}')
                
                if delete_tag:
                    tag_to_be_deleted = Tag.query.filter_by(tag_name=tag.tag_name).delete()
                    output_string.append(f'deleted <b>{tag.tag_name}</b>')

                    # deleting relationship with tagid manually (figure out cascade later maybe )
                    tag_relationships = RTagFile.query.filter_by(tag_id=tag.id).all()
                    for tag_relation in tag_relationships:
                        db.session.delete(tag_relation)
                        
                    
            db.session.commit()

        tags = Tag.query.all()

        if output_string:
            flash(f'Updated! Changes: ' + ', '.join(output_string) + f' <span class="font-weight-light float-right">{datetime.now().strftime("%m/%d/%Y, %H:%M:%S %Z")}</span>', 'success')
        return render_template('tags.jinja', tags=tags, RTagFile=RTagFile)

# TODO CRUD tags (missing update (change tag name))
# TODO CRUD images (missing create (upload image to site), delete (delete image from site))

@app.route('/library', methods=["GET"])
def library():
    files = File.query.all()

    tags = Tag.query.all()

    order = request.args.get('order', default = 'asc', type = str)
    if order == "rand":
        random.shuffle(files)
    
    return render_template('library.jinja', files=files, imageDir=imageDir, tags=tags, show_taglist=False)

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    tags = Tag.query.all()

    return render_template('upload.jinja', show_taglist=False)
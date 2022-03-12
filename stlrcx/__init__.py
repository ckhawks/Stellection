import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'pV4HlTJ7IFIk2LZp8EQGuPhvEjpKuunm'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config.from_object(Config())
db = SQLAlchemy(app)

from stlrcx import routes

# setting up db for first time use
from stlrcx import db
if not os.path.exists('database.db'): 
    db.create_all()
    print("made all")

# more setup
# setting up File table
from stlrcx.models import File
rows = File.query.first()
if not rows:
    bulk = list()
    media_files = os.listdir("/Users/stellaric/Downloads/testing/")
    for media_file in media_files:
        bulk.append(File(file_path=media_file))
    db.session.bulk_save_objects(bulk)
    db.session.commit()
    #teams_logo = os.listdir('nflsite/static/team_logo')
    #teams = [team.split('.')[0] for team in teams_logo]
    #for team in teams:
    #    bulk.append(Team(name=team, image_file=team + '.png'))
    #db.session.bulk_save_objects(bulk)
    #db.session.commit()


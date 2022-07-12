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
from stlrcx import models
if not os.path.exists('stlrcx/database.db'): 
    db.create_all()
    print("JUST RECREATED THE DATABASE :smile:")

    """
    # Create a test user
    new_user = models.User('a@a.com', 'aaaaaaaa')
    new_user.display_name = 'Nathan'
    db.session.add(new_user)
    db.session.commit()

    new_user.datetime_subscription_valid_until = datetime.datetime(2019, 1, 1)
    db.session.commit()
    """

rows = models.Tag.query.first()
if not rows:
    # Create tags and add things to do
    bulk = list()
    bulk.append(models.Tag(tag_name="guns"))
    bulk.append(models.Tag(tag_name="mountains"))
    bulk.append(models.Tag(tag_name="cool stuff"))
    db.session.bulk_save_objects(bulk)
    db.session.commit()

    bulk = list()
    bulk.append(models.RTagFile(tag_id=1, file_id=1)) 
    bulk.append(models.RTagFile(tag_id=2, file_id=2))
    db.session.bulk_save_objects(bulk)
    db.session.commit()

# more setup
# setting up File table
from stlrcx.models import File
rows = File.query.first()
if not rows:
    bulk = list()
    media_files = os.listdir("D:\\Downloads\\stellection_testing")
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


from stlrcx import db
import datetime

class File(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    file_path = db.Column(db.String(100), unique=True, nullable=False)

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(20), unique=False, nullable=False)

class RTagFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    file_id = db.Column(db.Integer, db.ForeignKey('file.id'), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), primary_key=True, unique=True)
    display_name = db.Column(db.String(80), default="A Rhymecraft User")
    password_hash = db.Column(db.String(200))
    datetime_subscription_valid_until = db.Column(db.DateTime, default=datetime.datetime.utcnow() - datetime.timedelta(days=1))
    datetime_joined = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    #songs = db.relationship('Song', cascade="all,delete", backref=db.backref('user', lazy='joined'), lazy='dynamic')

    def __init__(self, email, password):
        self.email = email
        self.set_password(password)

    def __repr__(self):
        return '<User %r>' % self.email

    def set_password(self, password):

        """ place at top
        from werkzeug.security import generate_password_hash, \
            check_password_hash
        """

        #self.password_hash = generate_password_hash(password)
        self.password_hash = "h" + password

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_email(self):
        return str(self.email)


"""def init_db():
    db.create_all()

    # Create a test user
    new_user = User('a@a.com', 'aaaaaaaa')
    new_user.display_name = 'Nathan'
    db.session.add(new_user)
    db.session.commit()

    new_user.datetime_subscription_valid_until = datetime.datetime(2019, 1, 1)
    db.session.commit()


if __name__ == '__main__':
    init_db()"""
import sqlalchemy as db
from shortuuid import ShortUUID
from table_operations import getTables


LOCAL = True
CREATE_TABLE_LIST = getTables()
su = ShortUUID()

class DB():

    def __init__(self):
        self.LOCAL = True
        self.conn = self.getConn()


    def getConn(self):
        if LOCAL:
            engine = db.create_engine('sqlite:///local_database.db')
            conn = engine.connect()
            conn.execute('PRAGMA foreign_keys=ON')
        else:
            engine = db.create_engine(
                'mysql+mysqldb://stelemnm_manager:gW5AfSd4+p9Wd#$]@198.54.114.228/stelemnm_stlrcx')
            conn = engine.connect()

        return conn


    def createAllTables(self):
        for table in CREATE_TABLE_LIST:
            t = db.text(table)
            self.conn.execute(t)


    def createUser(self, username, password):
        text = db.text('''
        INSERT INTO user (user_name, user_pass_hash, creation_date)
        VALUES (:username, :password, CURRENT_TIMESTAMP);
        ''')

        self.conn.execute(text, username=username, password=password)


    def createSlug(self, slug, type):
        text = db.text('''
        INSERT INTO slug (slug, type)
        VALUES (:slug, :type);
        ''')

        self.conn.execute(text, slug=slug, type=type)


    def createCollection(self, description, name, slug):
        text = db.text('''
        INSERT INTO collection (collection_desc, collection_name, creation_date, slug_id)
        VALUES (:description, :name, CURRENT_TIMESTAMP, (SELECT slug_id FROM SLUG WHERE slug=:slug));
        ''')

        self.conn.execute(text, description=description, name=name, slug=slug)


    def createUserCollection(self, username, slug, access_level):
        text = db.text('''
        INSERT INTO user_collection (user_id, collection_id, access_level)
        VALUES ((SELECT user_id FROM user WHERE user_name=:username), 
                (SELECT collection_id FROM collection c JOIN 
                    (SELECT slug_id FROM slug WHERE slug=:slug) AS s ON c.slug_id=s.slug_id),
                :access_level);
        ''')

        self.conn.execute(text, username=username, slug=slug, access_level=access_level)


    def createFile(self, file_path, mime_type, file_name):
        text = db.text('''
        INSERT INTO file (file_path, mime_type, file_name)
        VALUES (:file_path, :mime_type, :file_name);        
        ''')

        self.conn.execute(text, file_path=file_path, mime_type=mime_type, file_name=file_name)


    def createMedia(self):
        text = db.text('''
        INSERT INTO media (media_id, uploader_id, slug_id, media_type, file_id, text, link_dest, creation_date)
        VALUES ()
        
        ''')

        self.conn.execute(text)

    def createCollectionMedia(self):
        text = db.text('''
        INSERT INTO collection_media (collection_id, media_id, creation_date)
        VALUES ()

        ''')

        self.conn.execute(text)


    def TEST(self):
        text = db.text('''
        DELETE FROM SLUG WHERE slug_id=1;
        ''')

        self.conn.execute(text)
        

# creates all tables 
def createDB(database):
    database.createAllTables()


# simulates a user creating a new account
# 1. insert into user table given `username` and `password`
def createNewUser(database):

    # user creates username and pass
    username = 'guitars15'
    password = 'pass'
    database.insertUser(username, password)


# simulates a user creating a new collection
# 1. generate new slug for collection given `slug` and `type`
# 2. generate new collection given `description` and `slug`
# 3. make user that owner of collection given `username`, `slug`, `access_level` (access_level is public or private)
def createNewCollection(database):

    # first we have to generate new slug 
    slug = su.random(length=5)
    type = 'Collection'
    database.createSlug(slug, type)

    # then we create our collection 
    collection_name = 'clash'
    collection_desc = 'My new collection!'
    database.createCollection(collection_desc, collection_name, slug)

    # add to user_collection
    username = 'guitars15'
    database.createUserCollection(username, slug, 1)


# simulates uploading a file to a collection
# 1. 
def uploadToCollection(database):
    pass


# simulates adding a file to a collection
# 1. 
def addToCollection(database):
    pass


def steps(database):
    createDB(database)
    createNewUser(database)
    createNewCollection(database)


if __name__ == '__main__':
    database = DB()
    steps(database)
    #database.TEST()

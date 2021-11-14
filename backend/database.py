import sqlalchemy as db
from table_operations import getTables


LOCAL = True
CREATE_TABLE_LIST = getTables()


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

    def createCollection(self, description, name, slug_id):
        text = db.text('''
        INSERT INTO collection (collection_desc, collection_name, creation_date, slug_id)
        VALUES (:description, :name, CURRENT_TIMESTAMP, :slug_id);
        ''')

        self.conn.execute(text, description=description,
                          name=name, slug_id=slug_id)

    def createUserCollection(self, user_id, collection_id, access_level):
        text = db.text('''
        INSERT INTO user_collection (user_id, collection_id, access_level)
        VALUES (:user_id, :collection_id, :access_level);
        ''')

        self.conn.execute(text, user_id=user_id,
                          collection_id=collection_id, access_level=access_level)

    def createFile(self, file_path, mime_type, file_name):
        text = db.text('''
        INSERT INTO file (file_path, mime_type, file_name)
        VALUES (:file_path, :mime_type, :file_name);        
        ''')

        self.conn.execute(text, file_path=file_path,
                          mime_type=mime_type, file_name=file_name)

    def createMedia(self, uploader_id, slug_id, file_id, media_type, text, link_dest):
        t = db.text('''
        INSERT INTO media (uploader_id, slug_id, media_type, file_id, text, link_dest, creation_date)
        VALUES (:uploader_id, :slug_id, :file_id, :media_type, :text, :link_dest, CURRENT_TIMESTAMP);        
        ''')

        self.conn.execute(t, uploader_id=uploader_id, slug_id=slug_id,
                          file_id=file_id, media_type=media_type, text=text, link_dest=link_dest)

    def createCollectionMedia(self, collection_id, media_id):
        text = db.text('''
        INSERT INTO collection_media (collection_id, media_id)
        VALUES (:collection_id, media_id, CURRENT_TIMESTAMP);
        ''')

        self.conn.execute(text, collection_id=collection_id, media_id=media_id)

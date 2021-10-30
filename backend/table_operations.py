media = '''
CREATE TABLE MEDIA (
   media_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   uploader_id INTEGER NOT NULL,
   slug_id INTEGER NOT NULL,
   media_type TEXT NOT NULL,
   file_id INTEGER NOT NULL,
   text TEXT NOT NULL,
   link_dest TEXT NOT NULL,
   creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (uploader_id) REFERENCES USER (user_id),
   FOREIGN KEY (slug_id) REFERENCES SLUG (slug_id),
   FOREIGN KEY (file_id) REFERENCES FILE (fild_id)
);
'''

collection = '''
CREATE TABLE COLLECTION (
   collection_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   collection_desc TEXT NOT NULL,
   create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   slug_id INTEGER NOT NULL,
   FOREIGN KEY (slug_id) REFERENCES SLUG (slug_id)
);
'''

collection_media = '''
CREATE TABLE COLLECTION_MEDIA (
   collection_id INTEGER NOT NULL,
   media_id INTEGER NOT NULL,
   creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (collection_id) REFERENCES COLLECTION (collection_id),
   FOREIGN KEY (media_id) REFERENCES MEDIA (media_id)
);
'''

slug = '''
CREATE TABLE SLUG (
   slug_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   slug TEXT NOT NULL UNIQUE,
   type INTEGER NOT NULL
);
'''

file = '''
CREATE TABLE FILE (
   file_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   file_path TEXT NOT NULL UNIQUE,
   mime_type TEXT NOT NULL,
   file_name TEXT
);
'''

user = '''
CREATE TABLE USER (
   user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   user_name TEXT NOT NULL UNIQUE,
   user_pass_hash TEXT NOT NULL,
   creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
'''

user_collection = '''
CREATE TABLE USER_COLLECTION (
   user_id INTEGER NOT NULL,
   collection_id INTEGER NOT NULL,
   access_level INTEGER NOT NULL,
   FOREIGN KEY (user_id) REFERENCES USER (user_id),
   FOREIGN KEY (collection_id) REFERENCES COLLECTION (collection_id)
)
'''

def getTables():
   return [media, collection, collection_media, slug, file, user, user_collection]

def getTableNames():
   return ['media', 'collection', 'collection_media', 'slug', 'file', 'user', 'user_collection']
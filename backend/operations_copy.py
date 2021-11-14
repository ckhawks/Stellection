create_media = '''
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

create_collection = '''
CREATE TABLE COLLECTION (
   collection_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   collection_name TEXT NOT NULL,
   collection_desc TEXT NOT NULL,
   creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   slug_id INTEGER NOT NULL,
   CONSTRAINT fk_slug
      FOREIGN KEY (slug_id) REFERENCES SLUG (slug_id)
      ON DELETE CASCADE
);
'''

create_collection_media = '''
CREATE TABLE COLLECTION_MEDIA (
   collection_id INTEGER NOT NULL,
   media_id INTEGER NOT NULL,
   creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (collection_id) REFERENCES COLLECTION (collection_id),
   FOREIGN KEY (media_id) REFERENCES MEDIA (media_id)
);
'''

create_slug = '''
CREATE TABLE SLUG (
   slug_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   slug TEXT NOT NULL UNIQUE,
   type INTEGER NOT NULL
);
'''

create_file = '''
CREATE TABLE FILE (
   file_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   file_path TEXT NOT NULL UNIQUE,
   mime_type TEXT NOT NULL,
   file_name TEXT
);
'''

create_user = '''
CREATE TABLE USER (
   user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   user_name TEXT NOT NULL UNIQUE,
   user_pass_hash TEXT NOT NULL,
   creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
'''

create_user_collection = '''
CREATE TABLE USER_COLLECTION (
   user_id INTEGER NOT NULL,
   collection_id INTEGER NOT NULL,
   access_level INTEGER NOT NULL,
   FOREIGN KEY (user_id) REFERENCES USER (user_id),
   CONSTRAINT fk_collection
      FOREIGN KEY (collection_id) 
      REFERENCES COLLECTION (collection_id)
      ON DELETE CASCADE
)
'''


def getTables():
   return [create_media, create_collection, create_collection_media, create_slug, create_file, create_user, create_user_collection]

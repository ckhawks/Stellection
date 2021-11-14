create_media = '''
CREATE TABLE media (
   media_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   uploader_id INTEGER NOT NULL,
   slug_id INTEGER NOT NULL,
   file_id INTEGER NOT NULL,
   media_type TEXT NOT NULL,
   text TEXT NOT NULL,
   link_dest TEXT NOT NULL,
   creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT fk_user
      FOREIGN KEY (uploader_id) REFERENCES user (user_id)
         ON UPDATE NO ACTION
         ON DELETE NO ACTION,
   CONSTRAINT fk_slug
      FOREIGN KEY (slug_id) REFERENCES slug (slug_id)
         ON UPDATE NO ACTION
         ON DELETE CASCADE,
   CONSTRAINT fk_file
      FOREIGN KEY (file_id) REFERENCES file (fild_id)
         ON UPDATE NO ACTION
         ON DELETE CASCADE
);
'''

create_collection = '''
CREATE TABLE collection (
   collection_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   collection_name TEXT NOT NULL,
   collection_desc TEXT NOT NULL,
   creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   slug_id INTEGER NOT NULL,
   CONSTRAINT fk_slug
      FOREIGN KEY (slug_id) REFERENCES slug (slug_id)
      ON UPDATE NO ACTION
      ON DELETE CASCADE
);
'''

create_collection_media = '''
CREATE TABLE collection_media (
   collection_id INTEGER NOT NULL,
   media_id INTEGER NOT NULL,
   creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT fk_collection
      FOREIGN KEY (collection_id) REFERENCES collection (collection_id)
      ON UPDATE NO ACTION
      ON DELETE CASCADE,
   CONSTRAINT fk_references
      FOREIGN KEY (media_id) REFERENCES media (media_id)
         ON UPDATE NO ACTION
         ON DELETE CASCADE
);
'''

create_slug = '''
CREATE TABLE slug (
   slug_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   slug TEXT NOT NULL UNIQUE,
   type INTEGER NOT NULL
);
'''

create_file = '''
CREATE TABLE file (
   file_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   file_path TEXT NOT NULL UNIQUE,
   mime_type TEXT NOT NULL,
   file_name TEXT
);
'''

create_user = '''
CREATE TABLE user (
   user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   user_name TEXT NOT NULL UNIQUE,
   user_pass_hash TEXT NOT NULL,
   creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
'''

create_user_collection = '''
CREATE TABLE user_collection (
   user_id INTEGER NOT NULL,
   collection_id INTEGER NOT NULL,
   access_level INTEGER NOT NULL,
   FOREIGN KEY (user_id) REFERENCES USER (user_id),
   CONSTRAINT fk_collection
      FOREIGN KEY (collection_id) REFERENCES collection (collection_id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION
)
'''


def getTables():
   return [create_media, create_collection, create_collection_media, create_slug, create_file, create_user, create_user_collection]

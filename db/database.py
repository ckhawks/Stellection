import os 
import sqlite3
from db._star_db import Star
from db._cluster_db import Cluster
from db._star_cluster_db import StarCluster
from db._dummy_data import DummyData


DEBUG = True
RECREATE_DB_ON_START = True
DATABASE_PATH = r"catalog.db"

class DB(Cluster, StarCluster, Star, DummyData):
    def __init__(self):
        if RECREATE_DB_ON_START:
            try:
                os.remove(DATABASE_PATH)
                print("Removed existing database.")
            except OSError as e:
                print(f"{e}")
                # raise
                #print(f"No database exists at provided DATABASE_PATH.")

        self.conn = None # https://stackoverflow.com/a/59483095
        try:
            self.conn = sqlite3.connect(DATABASE_PATH, check_same_thread=False)
            self.conn.execute("PRAGMA foreign_keys = ON")
        except sqlite3.Error as e:
            print(e)

        self.setupDB()
        self.addDummyData()


    def setupDB(self):
        self.createAllTables()


    def debugLog(self, output):
        if DEBUG:
            print(output)


    def createAllTables(self):
        create_stars = '''
        create table if not exists stars (
            id integer primary key autoincrement not null,
            name text not null,
            path text not null
        )        
        '''
        self.conn.execute(create_stars)
        self.debugLog(f"Created TABLE `stars`")

        create_clusters = '''
        create table if not exists clusters (
            id integer primary key autoincrement not null,
            name text not null,
            type text not null
        )        
        '''
        self.conn.execute(create_clusters)
        self.debugLog(f"Created TABLE `clusters`")
        
        create_cluster_stars = '''
        create table if not exists cluster_stars (
            cluster_id integer not null,
            star_id integer not null,
            constraint fk_cluster
                foreign key (cluster_id) references clusters (id)
                    on delete cascade,
            constraint fk_star
                foreign key (star_id) references stars (id)
                    on delete cascade
        )
        '''
        self.conn.execute(create_cluster_stars)
        self.debugLog(f"Created TABLE `cluster_stars`")
        
database = DB()
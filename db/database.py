import os 
import sqlite3
from db._star_db import Star
from db._cluster_db import Cluster
from db._star_cluster_db import StarCluster
from db._dummy_data import DummyData
import contextlib
import util.cfg as cfg
from util.logger import log
import aiosqlite


RECREATE_DB_ON_START = False
DATABASE_PATH = r"catalog.db"

class DB(Cluster, StarCluster, Star, DummyData):
    def __init__(self):

        log(f"\n:  Stellection Cataloger v{cfg.API_VERSION}")
        log("\n  LOADING DATABASE  ")

        self.FETCH_NONE = 0
        self.FETCH_ONE = 1
        self.FETCH_MANY = 25
        self.FETCH_ALL = -1

        if RECREATE_DB_ON_START:
            try:
                os.remove(DATABASE_PATH)
                log("Removed existing database.")
            except OSError as e:
                # print(f"{e}")
                # raise
                print(f"No database exists at provided DATABASE_PATH.")

        self.needs_dummy_data = False
        # check if database file exists at this point
        if not os.path.exists(DATABASE_PATH):
            # doesn't exist, create for first time, init values
            self.conn = None # https://stackoverflow.com/a/59483095
            try:
                self.conn = sqlite3.connect(DATABASE_PATH, check_same_thread=False)
                self.conn.execute("PRAGMA foreign_keys = ON")
            except sqlite3.Error as e:
                print(e)
            self.conn.close()
            self.needs_dummy_data = True

        self.setupDB()

        if self.needs_dummy_data:
            self.addDummyData()
        

    # setup DB for operation, no starting data except what is required
    def setupDB(self):
        self.createAllTables()

    def createAllTables(self):
        log(f"\n  CREATING TABLES (If do not exist) ")
        create_stars = '''
        create table if not exists stars (
            id integer primary key autoincrement not null,
            name text not null,
            path text not null
        )        
        '''
        self.query(statement=create_stars, quantity=self.FETCH_NONE, parameters=None)
        log(f"Created TABLE `stars`")

        create_clusters = '''
        create table if not exists clusters (
            id integer primary key autoincrement not null,
            name text not null unique
        )        
        '''
        self.query(statement=create_clusters, quantity=self.FETCH_NONE, parameters=None)
        log(f"Created TABLE `clusters`")
        
        create_cluster_stars = '''
        create table if not exists cluster_stars (
            cluster_id integer not null,
            star_id integer not null,
            unique(cluster_id, star_id),
            constraint fk_cluster
                foreign key (cluster_id) references clusters (id)
                    on delete cascade,
            constraint fk_star
                foreign key (star_id) references stars (id)
                    on delete cascade
        )
        '''
        self.query(statement=create_cluster_stars, quantity=self.FETCH_NONE, parameters=None)
        log(f"Created TABLE `cluster_stars`")
        

    

    def query(self, statement: str, quantity: int, parameters: tuple = None):
        with contextlib.closing(sqlite3.connect(DATABASE_PATH, check_same_thread=False)) as conn: # auto-closes
            with conn: # auto-commits
                with contextlib.closing(conn.cursor()) as cursor: # auto-closes

                    # execute query
                    if parameters:
                        cursor.execute(statement, parameters)
                    else:
                        cursor.execute(statement)
                    
                    # return data
                    if quantity == self.FETCH_ONE: # 1
                        return cursor.fetchone(), cursor.rowcount, cursor.lastrowid
                    elif quantity == self.FETCH_ALL: # -1
                        return cursor.fetchall(), cursor.rowcount, cursor.lastrowid
                    elif quantity > 1: # 2-infinity
                        return cursor.fetchmany(quantity), cursor.rowcount, cursor.lastrowid
                    elif quantity == self.FETCH_NONE: # 0
                        return None, cursor.rowcount, cursor.lastrowid # TODO idk if this is right
                    else:
                        return None, None, None # this probably not good eityher


    async def async_query(self, statement: str, quantity: int, parameters: tuple = None):
        async with aiosqlite.connect(DATABASE_PATH, check_same_thread=False) as db:
            async with db.execute(statement, parameters) as cursor:
                # return data
                if quantity == self.FETCH_ONE: # 1
                    return await cursor.fetchone(), await cursor.rowcount, await cursor.lastrowid
                elif quantity == self.FETCH_ALL: # -1
                    return await cursor.fetchall(), await cursor.rowcount, await cursor.lastrowid
                elif quantity > 1: # 2-infinity
                    return await cursor.fetchmany(quantity), await cursor.rowcount, await cursor.lastrowid
                elif quantity == self.FETCH_NONE: # 0
                    return None, await cursor.rowcount, await cursor.lastrowid # TODO idk if this is right
                else:
                    return None, None, None # this probably not good eityher

    # multiple rows
    # multiple statements
    # single row
    # row count
    # last row id (for dummy data)

    # # multiple statements
    # with x as cursor:
    #     for statement in statements
    #     cursor.execute(stuff)

    
    
database = DB()
import sqlite3
import os

DEBUG = True
RECREATE_DB_ON_START = True
DATABASE_PATH = r"catalog.db"

class DB():
    def __init__(self):
        if RECREATE_DB_ON_START:
            try:
                os.remove(DATABASE_PATH)
                print("Removed existing database.")
            except OSError as e:
                print(f"{e}")
                #print(f"No database exists at provided DATABASE_PATH.")

        self.conn = None
        try:
            self.conn = sqlite3.connect(DATABASE_PATH, check_same_thread=False)
        except sqlite3.Error as e:
            print(e)

        self.setupDB()
        self.addDummyData()

    def setupDB(self):
        # create objects table
        self.createTable(name="stars", fields="id integer PRIMARY KEY, name text, path text")

        # create clusters table
        self.createTable(name="clusters", fields="id integer PRIMARY KEY, name text, type text")

        # create cluster_objects table
        self.createTable(name="cluster_stars", fields="cluster_id integer, star_id integer")

    def addDummyData(self):
        # add starting stars to objects table
        star_1 = self.createStar( star_properties=('cool star', 'main.py'))
        star_2 = self.createStar( star_properties=('bad star', 'reference.py'))

        # add starting clusters
        cluster_funnyfiles = self.createCluster(cluster_properties=('funny images', 'images'))
        cluster_lamefiles = self.createCluster(cluster_properties=('lame files', 'files'))
        cluster_memes = self.createCluster(cluster_properties=('memes', 'multimedia'))

        # add stars to cluster
        self.addStarToCluster(star_id=star_1, cluster_id=cluster_funnyfiles)
        self.addStarToCluster(star_id=star_2, cluster_id=cluster_funnyfiles)

    def debugLog(self, output):
        if DEBUG:
            print(output)

    def createTable(self, name, fields):

        sql = f""" CREATE TABLE IF NOT EXISTS {name} (
        {fields}
        ); """
        try:
            c = self.conn.cursor()
            c.execute(sql)
            self.debugLog(f"Created TABLE `{name}` (`{fields}`)")
        except sqlite3.Error as e:
            print(e)

    def createStar(self, star_properties):
        """
        Create a new star into the stars table
        :param conn:
        :param project:
        :return: project id
        """
        sql = ''' INSERT INTO stars(name,path)
                VALUES(?,?) '''
        try:
            cur = self.conn.cursor()
            cur.execute(sql, star_properties)
            self.conn.commit()
            self.debugLog(f"Created STAR `{star_properties[0]}` @ `{star_properties[1]}`")
            return cur.lastrowid
        except sqlite3.Error as e:
            print(e)       

    def createCluster(self, cluster_properties):
        """
        Create a new cluster
        :param conn:
        :param task:
        :return:
        """

        sql = ''' INSERT INTO clusters(name,type)
                VALUES(?,?) '''
        try:
            cur = self.conn.cursor()
            cur.execute(sql, cluster_properties)
            self.conn.commit()
            self.debugLog(f"Created CLUSTER `{cluster_properties[0]}`")
            return cur.lastrowid
        except sqlite3.Error as e:
            print(e)

    def addStarToCluster(self, star_id, cluster_id):
        sql = ''' INSERT INTO cluster_stars (cluster_id, star_id)
        VALUES(?,?); '''
        try:
            cur = self.conn.cursor()
            cur.execute(sql, (cluster_id, star_id))
            self.conn.commit()
            self.debugLog(f"Added STAR `{star_id}` to CLUSTER `{cluster_id}`")
            return cur.lastrowid
        except sqlite3.Error as e:
            print(e)

    def getStarByID(self, star_id: int):
        sql = '''select * from stars where id=?'''
        try:
            cur = self.conn.cursor()
            cur.execute(sql, (star_id,))
            self.debugLog(f"get STAR `{star_id}`")
            return cur.fetchall()
        except sqlite3.Error as e:
            print(e)
    
    def getStars(self):
        sql = '''select * from stars'''
        try:
            cur = self.conn.cursor()
            cur.execute(sql, ())
            # self.debugLog(f"get STAR `{star_id}`")
            return cur.fetchall()
        except sqlite3.Error as e:
            print(e)

    def getClusterByID(self, cluster_id: int):
        sql = '''select * from clusters where id=?'''
        try:
            cur = self.conn.cursor()
            cur.execute(sql, (cluster_id,))
            self.debugLog(f"get CLUSTER `{cluster_id}`")
            return cur.fetchall()
        except sqlite3.Error as e:
            print(e)

    def deleteStarByID(self, star_id: int):
        sql = 'delete from stars where id=?'
        try:
            cur = self.conn.cursor()
            cur.execute(sql, (star_id,))
            self.conn.commit()
            self.debugLog(f"delete STAR `{star_id}`")
        except sqlite3.Error as e:
            print(e)
            
    def deleteClusterByID(self, cluster_id: int):
        sql = 'delete from stars where id=?'
        try:
            cur = self.conn.cursor()
            cur.execute(sql, (cluster_id,))
            self.con.commit()
            self.debugLog(f"delete CLUSTER `{cluster_id}`")
        except sqlite3.Error as e:
            print(e)
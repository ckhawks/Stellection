import sqlite3
from sqlite3 import Error

import os

RECREATE_DB_ON_START = True
DATABASE_PATH = r"catalog.db"
DEBUG = True

def debugLog(output):
    if DEBUG:
        print(output)

# run once at start of program
def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """

    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)
    
    return conn

def create_table(conn, name, fields):

    sql = f""" CREATE TABLE IF NOT EXISTS {name} (
       {fields}
    ); """
    try:
        c = conn.cursor()
        c.execute(sql)
        debugLog(f"Created TABLE `{name}` (`{fields}`)")
    except Error as e:
        print(e)

def create_star(conn, star_properties):
    """
    Create a new star into the stars table
    :param conn:
    :param project:
    :return: project id
    """
    sql = ''' INSERT INTO stars(name,path)
              VALUES(?,?) '''
    try:
        cur = conn.cursor()
        cur.execute(sql, star_properties)
        conn.commit()
        debugLog(f"Created STAR `{star_properties[0]}` @ `{star_properties[1]}`")
        return cur.lastrowid
    except Error as e:
        print(e)

def create_cluster(conn, cluster_properties):
    """
    Create a new cluster
    :param conn:
    :param task:
    :return:
    """

    sql = ''' INSERT INTO clusters(name,type)
              VALUES(?,?) '''
    try:
        cur = conn.cursor()
        cur.execute(sql, cluster_properties)
        conn.commit()
        debugLog(f"Created CLUSTER `{cluster_properties[0]}`")
        return cur.lastrowid
    except Error as e:
        print(e)

def add_star_to_cluster(conn, star_id, cluster_id):
    sql = ''' INSERT INTO cluster_stars (cluster_id, star_id)
    VALUES(?,?); '''
    try:
        cur = conn.cursor()
        cur.execute(sql, (cluster_id, star_id))
        conn.commit()
        debugLog(f"Added STAR `{star_id}` to CLUSTER `{cluster_id}`")
        return cur.lastrowid
    except Error as e:
        print(e)

def main():
    print(" --- Stellection Cataloger v0.1 --- \n")

    if RECREATE_DB_ON_START:
        try:
            os.remove(DATABASE_PATH)
            print("Removed existing database.")
        except:
            print("No database exists at provided DATABASE_PATH.")

    # create database connection
    conn = create_connection(DATABASE_PATH)

    if conn is not None:
        print("Connected to database @ " + DATABASE_PATH)

        # create objects table
        create_table(conn=conn, name="stars", fields="id integer PRIMARY KEY, name text, path text")

        # create clusters table
        create_table(conn=conn, name="clusters", fields="id integer PRIMARY KEY, name text, type text")

        # create cluster_objects table
        create_table(conn=conn, name="cluster_stars", fields="cluster_id integer, star_id integer")

        # add starting stars to objects table
        star_1 = create_star(conn=conn, star_properties=('cool star', 'main.py'))
        star_2 = create_star(conn=conn, star_properties=('bad star', 'reference.py'))

        # add starting clusters
        cluster_funnyfiles = create_cluster(conn=conn, cluster_properties=('funny images', 'images'))
        cluster_lamefiles = create_cluster(conn=conn, cluster_properties=('lame files', 'files'))
        cluster_memes = create_cluster(conn=conn, cluster_properties=('memes', 'multimedia'))

        # add stars to cluster
        add_star_to_cluster(conn=conn, star_id=star_1, cluster_id=cluster_funnyfiles)
        add_star_to_cluster(conn=conn, star_id=star_2, cluster_id=cluster_funnyfiles)

        print("\nDone!")

    else:
        print("Error! Cannot create the database connection.")

if __name__ == '__main__':
    main()

import sqlite3
import os

DEBUG = True
RECREATE_DB_ON_START = True
DATABASE_PATH = r"catalog.db"

# TODO remove type field from cluster

# TODO abstract some of the database functionality
### dummy data stuff should go in like a test-suite file or something
### star stuff in one file, cluster stuff in one file
class DB():
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

    def addDummyData(self):
        # add starting stars to objects table
        star_1 = self.createStar( star_properties=('cool star', '33wodbxknrm41.jpg'))
        star_2 = self.createStar( star_properties=('bad star', '80ddu3mw7ym51.jpg'))
        star_3 = self.createStar( star_properties=('hellko', '814240acmko41.jpg'))

        # add starting clusters
        cluster_funnyfiles = self.createCluster(cluster_properties=(f'funny images', 'images'))
        cluster_lamefiles = self.createCluster(cluster_properties=(f'lame files', 'files'))
        cluster_memes = self.createCluster(cluster_properties=(f'memes', 'multimedia'))

        # add stars to cluster
        self.addStarToCluster(star_id=star_1, cluster_id=cluster_funnyfiles)
        self.addStarToCluster(star_id=star_1, cluster_id=cluster_memes)
        self.addStarToCluster(star_id=star_2, cluster_id=cluster_funnyfiles)
        self.addStarToCluster(star_id=star_3, cluster_id=cluster_funnyfiles)

        # self.deleteStarByID(star_id=star_1)
        # self.deleteClusterByID(cluster_id=cluster_funnyfiles)

        # get stars by ID
        # self.getStarByID(star_id=star_1)

    def debugLog(self, output):
        if DEBUG:
            print(output)

    # def createTable(self, name, fields):
    #     # TODO
    #     # cascade on delete for cluster_stars
    #     # should be one big function that creates all tables 
    #     sql = f""" CREATE TABLE IF NOT EXISTS {name} (
    #     {fields}
    #     ); """
    #     try:
    #         c = self.conn.cursor()
    #         c.execute(sql)
    #         
    #     except sqlite3.Error as e:
    #         print(e)

    # new method to create all tables 
    def createAllTables(self):
        create_stars = '''
        create table IF NOT EXISTS stars (
            id integer primary key autoincrement not null,
            name text not null,
            path text not null
        )        
        '''
        self.conn.execute(create_stars)
        self.debugLog(f"Created TABLE `stars`")

        create_clusters = '''
        create table IF NOT EXISTS clusters (
            id integer primary key autoincrement not null,
            name text not null,
            type text not null
        )        
        '''
        self.conn.execute(create_clusters)
        self.debugLog(f"Created TABLE `clusters`")
        
        create_cluster_stars = '''
        create table IF NOT EXISTS cluster_stars (
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
        get_stars = 'select * from stars where id=?'
        get_tag_names = '''
            select id, name from clusters
            inner join cluster_stars on cluster_stars.star_id=?
            where id=cluster_stars.cluster_id'''
        try:
            cur = self.conn.cursor()
            cur.execute(get_stars, (star_id,))
            self.debugLog(f"get STAR `{star_id}`")
            star = cur.fetchall()
            print(star)
            data = dict()
            data['star_id'] = star[0][0]
            data["star_name"] = star[0][1]
            data["star_path"] = star[0][2]
            
            cur = self.conn.cursor()
            cur.execute(get_tag_names, (star_id,))
            tags = cur.fetchall()
            print(tags)
            
            tag_list = list()
            for tag in tags:
                temp = dict()
                temp['cluster_id'] = tag[0]
                temp['cluster_name'] = tag[1]
                tag_list.append(temp)
            data['clusters'] = tag_list

            return data
        except sqlite3.Error as e:
            print(e)
    """
    api/stars/1
    {
        star_name: "",
        star_id: 1,
        clusters: [
            {
                cluster_id: 1, 
                cluster_name: "tag1"
            }, 
            {
                cluster_id: 2, 
                cluster_name: "tag2"
            }
        ]
    }
    """

    # do we need this ? 
    def getResourcePathByStarId(self, star_id):
        sql = 'select path from stars where id=?'
        try:
            cur = self.conn.cursor()
            cur.execute(sql, (star_id,))
            rows = cur.fetchall()

            print(rows)
            return rows[0][0]
        except sqlite3.Error as e:
            print(e)


    def getStars(self):
        sql = 'select * from stars'
        try:
            cur = self.conn.cursor()
            cur.execute(sql, ())
            # self.debugLog(f"get STAR `{star_id}`")

            stars = cur.fetchall() # TODO make this return array of dicts instead of array of arrays

            output = dict()
            output["stars"] = list()

            for star in stars:
                star_dict = dict()
                star_dict["star_id"] = star[0]
                star_dict["star_name"] = star[1]
                star_dict["star_path"] = star[2]
                output["stars"].append(star_dict)            

            return output
        except sqlite3.Error as e:
            print(e) #

    """
    api/stars

    {
        stars: [
            {
                star_name: "name1",
                star_id: 1,
                star_path: "path2"
            },
            {
                star_name: "name2",
                star_id: 2,
                star_path: "path2"
            }
        ]
    }
    """

    def getClusters(self):
        sql = '''
        select clusters.id, clusters.name, clusters.type, count(cluster_id) as star_count
        from clusters
        left join cluster_stars on id=cluster_id
        group by id
        order by star_count desc, id
        '''
        try:
            cur = self.conn.cursor()
            cur.execute(sql) 
            clusters = cur.fetchall()

            data = dict()
            cluster_list = list()

            for cluster in clusters:
                cluster_dict = dict()
                cluster_dict['cluster_id'] = cluster[0]
                cluster_dict['cluster_name'] = cluster[1]
                cluster_dict['cluster_type'] = cluster[2]
                cluster_dict['cluster_starcount'] = cluster[3] # number of items in this cluster
                cluster_list.append(cluster_dict)

            data['clusters'] = cluster_list
            return data

        except sqlite3.Error as e:
            print(e)
            

    # returns cluster information and cluster's items
    def getClusterByID(self, cluster_id: int):
        get_cluster = '''
        select clusters.id, clusters.name, count(*) over (partition by cluster_id)
        from clusters
        inner join cluster_stars on clusters.id=cluster_stars.cluster_id
        where clusters.id=?
        '''
        get_stars = '''
        select stars.id, stars.name, stars.path
        from stars
        inner join cluster_stars on cluster_stars.cluster_id=?
        where stars.id=cluster_stars.star_id        
        '''
        
        try:
            cur = self.conn.cursor()
            cur.execute(get_cluster, (cluster_id,))
            self.debugLog(f"get CLUSTER `{cluster_id}`")
            cluster = cur.fetchall()

            data = dict()
            data['cluster_id'] = cluster[0][0]
            data['cluster_name'] = cluster[0][1]
            data['cluster_starcount'] = cluster[0][2]
            
            cur.execute(get_stars, (cluster_id,))
            stars = cur.fetchall()
            star_list = list()
            for star in stars:
                star_dict = dict()
                star_dict['star_id'] = star[0]
                star_dict['star_name'] = star[1]
                star_dict['star_path'] = star[2]
                star_list.append(star_dict)

            data['stars'] = star_list
            return data

        except sqlite3.Error as e:
            print(e)
    
    """
    api/clusters/1
    {
        cluster_name: "",
        cluster_id: 1,
        stars: [
            {
                star_id: 1, 
                star_name: "star1",
                star_path: ""
            }, 
            {
                star_id: 2, 
                star_name: "star2",
                star_path: ""
            }
        ]
    }
    """

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
        sql = 'delete from clusters where id=?'
        try:
            cur = self.conn.cursor()
            cur.execute(sql, (cluster_id,))
            self.conn.commit()
            self.debugLog(f"delete CLUSTER `{cluster_id}`")
        except sqlite3.Error as e:
            print(e)
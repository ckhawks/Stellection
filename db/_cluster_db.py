import sqlite3

class Cluster():

    def createCluster(self, cluster_properties: list):
        '''
        Create a new cluster

        :param cluster_properties: list that includes the name and type 
        :return: the id of the cluster just created
        '''
        sql = 'insert into clusters values (null, ?, ?)'
        try:
            cur = self.conn.cursor()
            cur.execute(sql, cluster_properties)
            self.conn.commit()
            self.debugLog(f"Created CLUSTER `{cluster_properties[0]}`")
            return cur.lastrowid

        except sqlite3.Error as e:
            print(e)


    def getClusters(self):
        '''
        Retrieve all clusters

        :return: dictionary of all clusters in a list with it's corresponding data
        
        api/clusters
        {
            clusters: [
                {
                    cluster_id: 1,
                    cluster_name: "name1",
                    cluster_type: "type1",
                    cluster_starcount: 3
                },
                {
                    cluster_id: 2,
                    cluster_name: "name2",
                    cluster_type: "type2",
                    cluster_starcount: 0
                }
            ]
        }
        '''
        get_clusters = '''
        select clusters.id, clusters.name, clusters.type, count(cluster_id) as star_count
        from clusters
        left join cluster_stars on id=cluster_id
        group by id
        order by star_count desc, id
        '''
        try:
            cur = self.conn.cursor()
            cur.execute(get_clusters) 

            output = dict()
            cluster_list = list()

            for cluster in cur:
                cluster_dict = dict()

                cluster_dict['cluster_id'] = cluster[0]
                cluster_dict['cluster_name'] = cluster[1]
                cluster_dict['cluster_type'] = cluster[2]
                cluster_dict['cluster_starcount'] = cluster[3] # number of items in this cluster

                cluster_list.append(cluster_dict)

            output['clusters'] = cluster_list
            return output

        except sqlite3.Error as e:
            print(e)


    def getClusterByID(self, cluster_id: int):
        '''
        Returns cluster information and cluster's items
        
        :param cluster_id: id of cluster to retrieve
        :return: dictionary of cluster data along with stars that are tagged with this cluster
        
        api/clusters/1
        {
            cluster_id: 1,
            cluster_name: "",
            cluster_starcount: 2,
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
        '''
        get_cluster = '''
        select clusters.id, clusters.name, count(*) over (partition by cluster_id)
        from clusters
        left join cluster_stars on clusters.id=cluster_stars.cluster_id
        where clusters.id=?'''
        
        get_stars = '''
        select stars.id, stars.name, stars.path
        from stars
        inner join cluster_stars on cluster_stars.cluster_id=?
        where stars.id=cluster_stars.star_id'''
        
        try:
            cur = self.conn.cursor()
            cur.execute(get_cluster, (cluster_id,))
            self.debugLog(f"get CLUSTER `{cluster_id}`")
            cluster = cur.fetchone()

            data = dict()
            data['cluster_id'] = cluster[0]
            data['cluster_name'] = cluster[1]
            data['cluster_starcount'] = cluster[2]
            
            cur.execute(get_stars, (cluster_id,))
            star_list = list()

            for star in cur:
                star_dict = dict()

                star_dict['star_id'] = star[0]
                star_dict['star_name'] = star[1]
                star_dict['star_path'] = star[2]

                star_list.append(star_dict)

            data['stars'] = star_list

            return data

        except sqlite3.Error as e:
            print(e)
    

    def deleteClusterByID(self, cluster_id: int):
        '''
        Deletes a cluster based on id

        :param cluster_id: id of the cluster to be deleted
        :return: # maybe should return if cluster is deleted or not 
        '''
        sql = 'delete from clusters where id=?'
        try:
            cur = self.conn.cursor()
            cur.execute(sql, (cluster_id,))
            self.conn.commit()
            self.debugLog(f"delete CLUSTER `{cluster_id}`")

        except sqlite3.Error as e:
            print(e)
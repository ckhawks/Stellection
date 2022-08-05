import sqlite3

from util.logger import log

class Cluster():

    def createCluster(self, name: str):
        '''
        Create a new cluster

        :param name: name of the cluster
        :return: the id of the cluster just created
        '''
        sql = 'insert into clusters values (null, ?)'
        try:
            _, _, lastrowid = self.query(statement=sql, quantity=self.FETCH_ALL, parameters=(name,))

            log(f"Created CLUSTER `{name}`")
            return lastrowid, None

        except sqlite3.Error as e:
            print(e)
            return None,  {'code': 404, 'message': 'Star not found'} # TODO wrong


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
                    cluster_starcount: 3
                },
                {
                    cluster_id: 2,
                    cluster_name: "name2",
                    cluster_starcount: 0
                }
            ]
        }
        '''
        get_clusters = '''
        select clusters.id, clusters.name, count(cluster_id) as star_count
        from clusters
        left join cluster_stars on id=cluster_id
        group by id
        order by star_count desc, id
        '''
        try:

            clusters, rowcount, lastrowid = self.query(statement=get_clusters, quantity=self.FETCH_ALL, parameters=None)

            output = dict()
            cluster_list = list()

            for cluster in clusters:
                cluster_dict = dict()

                cluster_dict['cluster_id'] = cluster[0]
                cluster_dict['cluster_name'] = cluster[1]
                cluster_dict['cluster_starcount'] = cluster[2] # number of items in this cluster

                cluster_list.append(cluster_dict)

            output['clusters'] = cluster_list
            return output, None

        except sqlite3.Error as e:
            print(e)
            return None,  {'code': 404, 'message': 'Star not found'} # TODO wrong


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

            cluster, _, _ = self.query(statement=get_cluster, quantity=self.FETCH_ONE, parameters=(cluster_id,))
            log(f"get CLUSTER `{cluster_id}`")

            data = dict()
            data['cluster_id'] = cluster[0]
            data['cluster_name'] = cluster[1]
            data['cluster_starcount'] = cluster[2]
            
            stars, _, _ = self.query(statement=get_stars, quantity=self.FETCH_ONE, parameters=(cluster_id,))

            star_list = list()
            for star in stars:
                star_dict = dict()

                star_dict['star_id'] = star[0]
                star_dict['star_name'] = star[1]
                star_dict['star_path'] = star[2]

                star_list.append(star_dict)

            data['stars'] = star_list

            return data, None

        except sqlite3.Error as e:
            print(e)
            return None,  {'code': 404, 'message': 'Star not found'} # TODO wrong

    def deleteClusterByID(self, cluster_id: int):
        '''
        Deletes a cluster based on id

        :param cluster_id: id of the cluster to be deleted
        :return: # maybe should return if cluster is deleted or not 
        '''
        sql = 'delete from clusters where id=?'
        try:

            _, rowcount, _ = self.query(statement=sql, quantity=self.FETCH_NONE, parameters=(cluster_id,))
            
            log(f"delete CLUSTER `{cluster_id}`")
            return rowcount, None

        # https://stackoverflow.com/a/28978959

        except sqlite3.Error as e:
            print(e)   
            return None,  {'code': 404, 'message': 'Star not found'} # TODO wrong

    
    def updateClusterByID(self, cluster_id: int, properties: dict):
        '''
        Updates a cluster name based on id
        
        :param cluster_id: id of the cluster to be updated
        :param properties: dictionary of all of the values to change 
        :return: return true if name is unique
        '''
        
        # TODO improvement: if no values are changing (sql_values is none none none), bad request
        # TODO if cluster no exist, 404
        # 

        sql_values = {
            "name": properties.get("cluster_name", None)
            # "value": properties.get("cluster_value", None)
        }
        
        # no valid data was sent to update
        if not any(sql_values.values()):
            log(f"no valid values to change provided")
            return False, "No valid values provided"

        # https://stackoverflow.com/a/61417642
        sql = '''
        update clusters set 
        name=coalesce(?, name)
        where id=?'''
        try:
            data, rowcount, lastrowid = self.query(statement=sql, quantity=self.FETCH_NONE, parameters=(sql_values["name"], cluster_id))

            log(f"update CLUSTER `{cluster_id}` values `{sql_values}`")
            return rowcount, None

        # unique failed :(
        except sqlite3.Error as e:
            print(e) 
            return None,  {'code': 404, 'message': 'Star not found'} # TODO wrong


"""
{
    "cluster_name": "",
    "cluster_property": 213
}
"""
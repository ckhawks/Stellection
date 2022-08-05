import sqlite3
import util.cfg as cfg
from util.logger import log
import aiosqlite

class Star():

    def createStar(self, star_properties: list):
        '''
        Create a new star

        :param star_properties: includes the name and path of the star
        :return: the id of the star just created
        '''
        sql = 'insert into stars values (null, ?, ?)'
        try:
            _, _, lastrowid = self.query(statement=sql, quantity=self.FETCH_NONE, parameters=star_properties)

            log(f"Created STAR `{star_properties[0]}` @ `{star_properties[1]}`")
            return lastrowid, None

        except sqlite3.Error as e:
            log(e)
            return None,  {'code': 404, 'message': 'Star not found'} # TODO wrong


    async def getStars_async(self):
        get_stars = 'select * from stars'
        try:
            output = dict()
            output['stars'] = list()
            stars, _, _ = await self.async_query(statement=get_stars, quantity=self.FETCH_ALL, parameters=None)
            
            for star in stars:
                star_dict = dict()

                star_dict["star_id"] = star[0]
                star_dict["star_name"] = star[1]
                star_dict["star_path"] = star[2]

                output["stars"].append(star_dict) 

            return output, None
            
        except sqlite3.Error as e:
            print(e) 
            return None,  {'code': 404, 'message': 'Star not found'} # TODO wrong

    def getStars(self):
        '''
        Retrieve all stars

        :return: dictionary of all stars in a list with it's corresponding data

        api/stars
        {
            stars: [
                {
                    star_id: 1,
                    star_name: "name1",
                    star_path: "path2"
                },
                {
                    star_id: 2,
                    star_name: "name2",
                    star_path: "path2"
                }
            ]
        }
        '''
        get_stars = 'select * from stars'
        try:

            output = dict()
            output["stars"] = list()

            stars, rowcount, lastrowid = self.query(statement=get_stars, quantity=self.FETCH_ALL, parameters=None)

            for star in stars:
                star_dict = dict()

                star_dict["star_id"] = star[0]
                star_dict["star_name"] = star[1]
                star_dict["star_path"] = star[2]

                output["stars"].append(star_dict)            

            return output, None

        except sqlite3.Error as e:
            print(e) 
            return None,  {'code': 404, 'message': 'Star not found'} # TODO wrong



    def getStarByID(self, star_id: int):
        '''
        Gets a star and its related tags (clusters)

        :param star_id: the star in which to get information
        :return: dictionary of star data along with clusters that are assigned to it

        api/stars/1
        {
            star_id: 1,
            star_name: "",
            star_path: "",
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
        '''
        get_stars = 'select * from stars where id=?'

        get_cluster_names = '''
            select id, name from clusters
            inner join cluster_stars on cluster_stars.star_id=?
            where id=cluster_stars.cluster_id'''

        try:

            star, rowcount, lastrowid = self.query(statement=get_stars, quantity=self.FETCH_ONE, parameters=(star_id,))
            log(f"get STAR `{star_id}`")
            
            print(star)

            data = dict()
            data['star_id'] = star[0]
            data["star_name"] = star[1]
            data["star_path"] = star[2]
            
            # todo change tag-> cluster
            clusters, _, _ = self.query(statement=get_cluster_names, quantity=self.FETCH_ALL, parameters=(star_id,))
            
            cluster_list = list()
            for cluster in clusters:
                temp = dict()
                temp['cluster_id'] = cluster[0]
                temp['cluster_name'] = cluster[1]

                cluster_list.append(temp)

            data['clusters'] = cluster_list

            return data, None

        except sqlite3.Error as e:
            print(e)
            return None,  {'code': 404, 'message': 'Star not found'} # TODO wrong
   

    def deleteStarByID(self, star_id: int):
        '''
        Delete a star based on id 

        :param star_id: id of the star to be deleted
        :return: # maybe should return if star is deleted or not 
        '''
        sql = 'delete from stars where id=?'

        try:
            _, rowcount, _ = self.query(statement=sql, quantity=self.FETCH_NONE, parameters=(star_id,))
            log(f"delete STAR `{star_id}`")
            return rowcount, None

        except sqlite3.Error as e:
            print(e)
            return None, {'code': 404, 'message': 'Star not found'} # TODO wrong


    def getResourcePathByStarId(self, star_id):
        sql = 'select path from stars where id=?'
        try:
            data, _, _ = self.query(statement=sql, quantity=self.FETCH_ONE, parameters=(star_id,))

            return data[0], None
            
        except sqlite3.Error as e:
            print(e)
            return None, {'code': 400, 'message': 'Something wrong with the db'}
        except TypeError as e:
            print(e)
            return None, {'code': 404, 'message': 'Star not found'}

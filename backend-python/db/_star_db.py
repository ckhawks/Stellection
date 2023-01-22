import sqlite3

from attr import attrib
import util.cfg as cfg
from util.logger import log
import aiosqlite

class Star():

    async def createStar(self, star_properties: list, clusters: list = None):
        '''
        Create a new star

        :param star_properties: includes the name and path of the star
        :return: the id of the star just created
        '''
        sql = 'insert into stars values (null, ?, ?, ?, ?, ?)'
        try:
            _, _, lastrowid = await self.async_query(statement=sql, quantity=self.FETCH_NONE, parameters=star_properties)

            if clusters:
                await self.addStarToClusters(star_id=lastrowid, clusters=clusters)

            log(f"Created STAR `{star_properties[0]}` @ `{star_properties[1]}`")

            star = {
                'star_id': lastrowid,
                'star_name': star_properties[0],
                'star_path': star_properties[1],
                'star_attr_name': star_properties[2],
                'star_attr_url': star_properties[3],
                'star_attr_source': star_properties[4]
            }

            return star, None

            

        except aiosqlite.Error as e:
            log(e)
            return None,  {'code': 404, 'message': 'Star not found'} # TODO wrong


    async def getStars(self):
        '''
        Retrieve all stars

        :return: dictionary of all stars in a list with it's corresponding data

        api/stars
        {
            stars: [
                {
                    star_id: 1,
                    star_name: "name1",
                    star_path: "path2",
                    attribution: {
                        attr_name: "John Smith",
                        attr_url: "https://archillect.com/3423342"
                    }
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

            stars, _ , _ = await self.async_query(statement=get_stars, quantity=self.FETCH_ALL, parameters=None)

            for star in stars:
                star_dict = dict()

                star_dict["star_id"] = star[0]
                star_dict["star_name"] = star[1]
                star_dict["star_path"] = star[2]

                attribution = dict()
                if star[3]:
                    attribution["attr_name"] = star[3]
                if star[4]:
                    attribution['attr_url'] = star[4]
                if star[5]:
                    attribution['attr_source'] = star[5]
                star_dict["attribution"] = attribution

                output["stars"].append(star_dict)            

            return output, None

        except aiosqlite.Error as e:
            print(e) 
            return None,  {'code': 404, 'message': 'Star not found'} # TODO wrong



    async def getStarByID(self, star_id: int):
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

            star, _, _ = await self.async_query(statement=get_stars, quantity=self.FETCH_ONE, parameters=(star_id,))
            log(f"get STAR `{star_id}`")
            
            print(star)

            data = dict()
            if star:
                data['star_id'] = star[0]
                data["star_name"] = star[1]
                data["star_path"] = star[2]
                attribution = dict()
                if star[3]:
                    attribution["attr_name"] = star[3]
                if star[4]:
                    attribution['attr_url'] = star[4]
                if star[5]:
                    attribution['attr_source'] = star[5]
                data["attribution"] = attribution
            
            else:
                return None,  {'code': 404, 'message': 'Star ID does not exist'} # TODO wrong
                

            # todo change tag-> cluster
            clusters, _, _ = await self.async_query(statement=get_cluster_names, quantity=self.FETCH_ALL, parameters=(star_id,))
            
            cluster_list = list()
            for cluster in clusters:
                temp = dict()
                temp['cluster_id'] = cluster[0]
                temp['cluster_name'] = cluster[1]
                # temp['cluster_starcount'] = cluster[2]

                cluster_list.append(temp)

            data['clusters'] = cluster_list

            return data, None

        except aiosqlite.Error as e:
            print(e)
            return None,  {'code': 404, 'message': 'Star not found'} # TODO wrong
   

    async def deleteStarByID(self, star_id: int):
        '''
        Delete a star based on id 

        :param star_id: id of the star to be deleted
        :return: # maybe should return if star is deleted or not 
        '''
        sql = 'delete from stars where id=?'

        try:
            _, rowcount, _ = await self.async_query(statement=sql, quantity=self.FETCH_NONE, parameters=(star_id,))
            log(f"delete STAR `{star_id}`")
            return rowcount, None

        except aiosqlite.Error as e:
            print(e)
            return None, {'code': 404, 'message': 'Star not found'} # TODO wrong


    async def getResourcePathByStarId(self, star_id):
        sql = 'select path from stars where id=?'
        try:
            data, _, _ = await self.async_query(statement=sql, quantity=self.FETCH_ONE, parameters=(star_id,))

            return data[0], None
            
        except aiosqlite.Error as e:
            print(e)
            return None, {'code': 400, 'message': 'Something wrong with the db'}
        except TypeError as e:
            print(e)
            return None, {'code': 404, 'message': 'Star not found'}

import sqlite3

class Star():

    def createStar(self, star_properties: list):
        '''
        Create a new star

        :param star_properties: includes the name and path of the star
        :return: the id of the star just created
        '''
        sql = 'insert into stars values (null, ?, ?)'
        try:
            cur = self.conn.cursor()
            cur.execute(sql, star_properties)
            self.conn.commit()
            self.debugLog(f"Created STAR `{star_properties[0]}` @ `{star_properties[1]}`")
            return cur.lastrowid

        except sqlite3.Error as e:
            print(e)


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
            cur = self.conn.cursor()
            cur.execute(get_stars)

            output = dict()
            output["stars"] = list()

            for star in cur:
                star_dict = dict()

                star_dict["star_id"] = star[0]
                star_dict["star_name"] = star[1]
                star_dict["star_path"] = star[2]

                output["stars"].append(star_dict)            

            return output

        except sqlite3.Error as e:
            print(e) 


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

        get_tag_names = '''
            select id, name from clusters
            inner join cluster_stars on cluster_stars.star_id=?
            where id=cluster_stars.cluster_id'''

        try:
            cur = self.conn.cursor()
            cur.execute(get_stars, (star_id,))
            self.debugLog(f"get STAR `{star_id}`")
            star = cur.fetchone()
            print(star)

            data = dict()
            data['star_id'] = star[0]
            data["star_name"] = star[1]
            data["star_path"] = star[2]
            
            cur.execute(get_tag_names, (star_id,))
            
            cluster_list = list()
            for tag in cur:
                temp = dict()
                temp['cluster_id'] = tag[0]
                temp['cluster_name'] = tag[1]

                cluster_list.append(temp)

            data['clusters'] = cluster_list

            return data

        except sqlite3.Error as e:
            print(e)
   

    def deleteStarByID(self, star_id: int):
        '''
        Delete a star based on id 

        :param star_id: id of the star to be deleted
        :return: # maybe should return if star is deleted or not 
        '''
        sql = 'delete from stars where id=?'

        try:
            cur = self.conn.cursor()
            cur.execute(sql, (star_id,))
            self.conn.commit()
            self.debugLog(f"delete STAR `{star_id}`")

        except sqlite3.Error as e:
            print(e)


    def getResourcePathByStarId(self, star_id):
        sql = 'select path from stars where id=?'
        try:
            cur = self.conn.cursor()
            cur.execute(sql, (star_id,))
            rows = cur.fetchone()
            print(rows)

            return rows[0]
            
        except sqlite3.Error as e:
            print(e)
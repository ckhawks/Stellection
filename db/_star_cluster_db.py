import sqlite3

class StarCluster():

    def addStarToCluster(self, star_id, cluster_id):
        sql = 'insert into cluster_stars values (?, ?)'
        try:
            cur = self.conn.cursor()
            cur.execute(sql, (cluster_id, star_id))
            self.conn.commit()
            self.debugLog(f"Added STAR `{star_id}` to CLUSTER `{cluster_id}`")

            return cur.lastrowid

        except sqlite3.Error as e:
            print(e)

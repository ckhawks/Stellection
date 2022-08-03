import sqlite3

import util.cfg as cfg
from util.logger import log

class StarCluster():

    def addStarToClusters(self, star_id: int, clusters: list):
        # TODO handle trying to add stars into clusters that don't exist
        # FOREIGN KEY constraint failed
        # unique key constraint failed 
        
        sql = 'insert into cluster_stars values (?, ?)'

        rows_affected = 0 
        for cluster_id in clusters:
            try:
                _, rowcount, _ = self.query(statement=sql, quantity=self.FETCH_NONE, parameters=(cluster_id, star_id))

                rows_affected += rowcount

                if(rowcount == 0):
                    log(f"Could not add STAR `{star_id}` to CLUSTER `{cluster_id}`, CLUSTER DOESN'T EXIST")
                    # TODO check if this handles case star doesn't exist???
                else:
                    log(f"Added STAR `{star_id}` to CLUSTER `{cluster_id}`")
            
            except sqlite3.Error as e:
                print(e)
        
        return rows_affected

    
    def removeStarFromClusters(self, star_id: int, clusters: list):
        sql = 'delete from cluster_stars where cluster_id=? and star_id=?'

        rows_affected = 0
        try:
            for cluster_id in clusters:

                _, rowcount, _ = self.query(statement=sql, quantity=self.FETCH_NONE, parameters=(cluster_id, star_id))

                rows_affected += rowcount

                if(rowcount == 0):
                    log(f"Could not delete, STAR `{star_id}` not in CLUSTER `{cluster_id}`")
                else:
                    log(f"Deleted STAR `{star_id}` from CLUSTER `{cluster_id}`")

            return rows_affected

        except sqlite3.Error as e:
            print(e)
            
            
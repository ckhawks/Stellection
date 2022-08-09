import sqlite3
import aiosqlite
import util.cfg as cfg
from util.logger import log

class StarCluster():

    async def addStarToClusters(self, star_id: int, clusters: list):
        # TODO handle trying to add stars into clusters that don't exist
        # FOREIGN KEY constraint failed 
        # unique key constraint failed integrity error
        
        sql = 'insert into cluster_stars values (?, ?)'

        print(clusters)
        print('starid', star_id)
        rows_affected = 0 
        for cluster_id in clusters:
            try:
                print('clusterID', cluster_id)
                _, rowcount, _ = await self.async_query(statement=sql, quantity=self.FETCH_NONE, parameters=(cluster_id, star_id))

                rows_affected += rowcount

                if(rowcount == 0):
                    log(f"Could not add STAR `{star_id}` to CLUSTER `{cluster_id}`, CLUSTER DOESN'T EXIST")
                    # TODO check if this handles case star doesn't exist???
                else:
                    log(f"Added STAR `{star_id}` to CLUSTER `{cluster_id}`")
            
            except aiosqlite.IntegrityError as e:
                print(e)
                return None, {'code': 404, 'message': f'Star {star_id} is already a member of cluster {cluster_id}'}

            except aiosqlite.Error as e:
                print(e)


            except sqlite3.Error as e:
                print(e)
        return rows_affected, None

    
    async def removeStarFromClusters(self, star_id: int, clusters: list):
        sql = 'delete from cluster_stars where cluster_id=? and star_id=?'

        rows_affected = 0
        try:
            for cluster_id in clusters:

                _, rowcount, _ = await self.async_query(statement=sql, quantity=self.FETCH_NONE, parameters=(cluster_id, star_id))

                rows_affected += rowcount

                if(rowcount == 0):
                    log(f"Could not delete, STAR `{star_id}` not in CLUSTER `{cluster_id}`")
                else:
                    log(f"Deleted STAR `{star_id}` from CLUSTER `{cluster_id}`")

            return rows_affected

        except aiosqlite.Error as e:
            print(e)
            
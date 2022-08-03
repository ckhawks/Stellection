import sqlite3
from util.logger import log

class DummyData():

    # only add dummy data if it doesn't already exist
    def addDummyData(self):
        
        log("\n  ADDING DUMMY DATA  ")

        # add starting stars to objects table
        star_1, _ = self.createStar( star_properties=('cool star', '33wodbxknrm41.jpg'))
        star_2, _ = self.createStar( star_properties=('bad star', '80ddu3mw7ym51.jpg'))
        star_3, _ = self.createStar( star_properties=('hellko', '814240acmko41.jpg'))

        # add starting clusters
        cluster_funnyfiles = self.createCluster(name=f'funny images')
        cluster_lamefiles = self.createCluster(name=f'lame files')
        cluster_memes = self.createCluster(name=f'memes')

        # add stars to cluster
        self.addStarToClusters(star_id=star_1, clusters=[cluster_funnyfiles])
        self.addStarToClusters(star_id=star_1, clusters=[cluster_memes])
        self.addStarToClusters(star_id=star_2, clusters=[cluster_funnyfiles])
        self.addStarToClusters(star_id=star_3, clusters=[cluster_funnyfiles])
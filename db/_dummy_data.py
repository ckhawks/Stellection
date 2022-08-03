import sqlite3

class DummyData():

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
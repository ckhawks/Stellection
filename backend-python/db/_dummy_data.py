import sqlite3
from util.logger import log
from db.database import database

# class DummyData():

#     # only add dummy data if it doesn't already exist
#     async def addDummyData(self):
        
#         log("\n  ADDING DUMMY DATA  ")

#         # add starting stars to objects table
#         star_1, _ = await self.createStar( star_properties=('cool star', '33wodbxknrm41.jpg'))
#         star_2, _ = await self.createStar( star_properties=('bad star', '80ddu3mw7ym51.jpg'))
#         star_3, _ = await self.createStar( star_properties=('hellko', '814240acmko41.jpg'))

#         # add starting clusters
#         cluster_funnyfiles, _ = await self.createCluster(name=f'funny images')
#         cluster_lamefiles, _ = await self.createCluster(name=f'lame files')
#         cluster_memes, _ = await self.createCluster(name=f'memes')

#         # add stars to cluster
#         await self.addStarToClusters(star_id=star_1["star_id"], clusters=[cluster_funnyfiles])
#         await self.addStarToClusters(star_id=star_1["star_id"], clusters=[cluster_memes])
#         await self.addStarToClusters(star_id=star_2["star_id"], clusters=[cluster_funnyfiles])
#         await self.addStarToClusters(star_id=star_3["star_id"], clusters=[cluster_funnyfiles])


async def addDummy():
    if database.needs_dummy_data:
        log("\n  ADDING DUMMY DATA  ")

        # add starting stars to objects table
        star_1, _ = await database.createStar( star_properties=('cool star', '33wodbxknrm41.jpg'))
        star_2, _ = await database.createStar( star_properties=('bad star', '80ddu3mw7ym51.jpg'))
        star_3, _ = await database.createStar( star_properties=('hellko', '814240acmko41.jpg'))

        # add starting clusters
        cluster_funnyfiles, _ = await database.createCluster(name=f'funny images')
        cluster_lamefiles, _ = await database.createCluster(name=f'lame files')
        cluster_memes, _ = await database.createCluster(name=f'memes')

        # add stars to cluster
        await database.addStarToClusters(star_id=star_1["star_id"], clusters=[cluster_funnyfiles])
        await database.addStarToClusters(star_id=star_1["star_id"], clusters=[cluster_memes])
        await database.addStarToClusters(star_id=star_2["star_id"], clusters=[cluster_funnyfiles])
        await database.addStarToClusters(star_id=star_3["star_id"], clusters=[cluster_funnyfiles])
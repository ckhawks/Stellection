import sqlalchemy as db
from table_operations import getTables, getTableNames


LOCAL = True
CREATE_TABLE_LIST = getTables()
DELETE_TABLE_LIST = getTableNames()


def createTables(conn):
    for table in CREATE_TABLE_LIST:
        t = db.text(table)
        conn.execute(t)


def deleteTables(conn):
    for table in DELETE_TABLE_LIST:
        t = db.text(f'DROP TABLE IF EXISTS {table.upper()}')
        conn.execute(t)


if __name__ == '__main__':
    if LOCAL:
        engine = db.create_engine('sqlite:///local_database.db')
    else:
        engine = db.create_engine(
            'mysql+mysqldb://stelemnm_manager:gW5AfSd4+p9Wd#$]@198.54.114.228/stelemnm_stlrcx')

    conn = engine.connect()

    createTables(conn)
    # deleteTables(conn)

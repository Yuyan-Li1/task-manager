# Note: the module name is psycopg, not psycopg3
import psycopg


def add_task(name, description, due_date):
    with psycopg.connect("dbname=tasks user=postgres") as conn:
        with conn.cursor() as cur:
            cur.execute(""" 
                insert into tasks (name, description, due_date) values (%s, %s, %s)
                """, (name, description, due_date))
            conn.commit()


def get_tasks(sort_by='created_at'):
    pass


def search(name):
    pass


def edit_task(id, name=None, description=None, due_date=None):
    pass


if __name__ == '__main__':
    add_task('test1', 'test1', '2021-07-01')

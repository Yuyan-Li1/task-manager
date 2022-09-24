# Note: the module name is psycopg, not psycopg3
import psycopg


def add_task(name, description, due_date):
    with psycopg.connect("dbname=tasks user=postgres") as conn:
        with conn.cursor() as cur:
            cur.execute(""" 
                insert into tasks (name, description, due_date) values (%s, %s, %s)
                """, (name, description, due_date))
            conn.commit()


def get_tasks(sort_by='created_at', page=1):
    if sort_by not in ['created_at', 'due_date']:
        raise ValueError(f"Invalid sort_by value: {sort_by}")
    elif sort_by == 'created_at':
        sort_by = 'created_at desc'
    elif sort_by == 'due_date':
        sort_by = 'due_date desc'

    with psycopg.connect("dbname=tasks user=postgres") as conn:
        with conn.cursor() as cur:
            cur.execute("""
                select * from tasks order by %s limit 20 offset %s
                """, (sort_by, 20 * (page - 1)))
            data = cur.fetchall()
            tasks = []
            for row in data:
                task = {
                    'id': row[0],
                    'name': row[1],
                    'description': row[2],
                    'due_date': row[3],
                    'created_at': row[4]
                }
                tasks.append(task)
            return tasks


def search(name, page=1):
    with psycopg.connect("dbname=tasks user=postgres") as conn:
        with conn.cursor() as cur:
            cur.execute("""
                select * from tasks where name like %s order by created_at desc limit 20 offset %s 
                """, (f"%{name}%", 20 * (page - 1)))
            data = cur.fetchall()
            tasks = []
            for row in data:
                task = {
                    'id': row[0],
                    'name': row[1],
                    'description': row[2],
                    'due_date': row[3],
                    'created_at': row[4]
                }
                tasks.append(task)
            return tasks


def edit_task(id, name=None, description=None, due_date=None):
    with psycopg.connect("dbname=tasks user=postgres") as conn:
        with conn.cursor() as cur:
            if name:
                cur.execute("""
                    update tasks set name = %s where id = %s
                    """, (name, id))
            if description:
                cur.execute("""
                    update tasks set description = %s where id = %s
                    """, (description, id))
            if due_date:
                cur.execute("""
                    update tasks set due_date = %s where id = %s
                    """, (due_date, id))
            conn.commit()


def delete_task(id):
    with psycopg.connect("dbname=tasks user=postgres") as conn:
        with conn.cursor() as cur:
            cur.execute("""
                delete from tasks where id = %s
                """, (id,))
            conn.commit()

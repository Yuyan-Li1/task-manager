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

    with psycopg.connect("dbname=tasks user=postgres") as conn:
        with conn.cursor() as cur:
            cur.execute("""
                select * from tasks order by %s limit 20 offset %s
                """, (sort_by + ' desc', 20 * (page - 1)))
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
            conn.commit()
            return sorted(tasks, key=lambda x: x[sort_by])


def search(name, sort_by='created_at', page=1):
    print(sort_by)
    with psycopg.connect("dbname=tasks user=postgres") as conn:
        with conn.cursor() as cur:
            cur.execute("""
                select * from tasks where name like %s order by %s desc limit 20 offset %s 
                """, (f"%{name}%", sort_by, 20 * (page - 1)))
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
            conn.commit()
            return sorted(tasks, key=lambda x: x[sort_by])


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
            cur.execute('''
                select * from tasks where id = %s''', (id,))
            edited = cur.fetchone()

            task = {
                'id': edited[0],
                'name': edited[1],
                'description': edited[2],
                'due_date': edited[3],
                'created_at': edited[4]
            }
            print(task)
            return task
            conn.commit()


def delete_task(id):
    with psycopg.connect("dbname=tasks user=postgres") as conn:
        with conn.cursor() as cur:
            cur.execute("""
                delete from tasks where id = %s
                """, (id,))
            conn.commit()

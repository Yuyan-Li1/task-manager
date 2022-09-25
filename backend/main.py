from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import database as db

app = FastAPI()

# unsafe but good enough for this example assignment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post('/add_task/', status_code=201)
async def server_add_task(name: str, description: str, due_date: str):
    db.add_task(name, description, due_date)


@app.get('/get_tasks/', status_code=200)
async def server_get_tasks(sort_by: str = 'created_at', page: int = 1):
    return db.get_tasks(sort_by, page)


@app.get('/search/', status_code=200)
async def server_search(name: str, page: int = 1):
    return db.search(name, page)


@app.put('/edit_task/', status_code=200)
async def server_edit_task(id: str, name: str = None, description: str = None, due_date: str = None):
    return db.edit_task(id, name, description, due_date)


@app.delete('/delete_task/', status_code=200)
async def server_delete_task(id: str):
    db.delete_task(id)

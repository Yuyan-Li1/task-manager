# task-manager
## Usage
Clone the repository with `git clone`, and open 2 terminal sessions.
### Set up the Postgres database
1. Go to the root directory of the project `cd task-manager`.  
2. Create a new database called tasks by `CREATE DATABASE tasks;`.  
3. Enter the database by `psql tasks`.  
4. Create the needed table by `\i backend/init.sql`.
### Set up and run the backend with Terminal 1
1. Go to the root directory of the project `cd task-manager`, and set up virtual environment for Python by `python3 -m venv venv`.  
2. Enter the virtual environment `source venv/bin/activate`.  
3. Install required Python modules `pip install -r requirements.txt`.  
4. Go to the backend folder `cd backend`.  
5. Since `uvicorn` needs the virtual environment to be activated from the path the server is in, `deactivate` then reenter the virtual environment by `source ../venv/bin/activate`.  
6. Run the server by `uvicorn main:app`.
### Set up and run the front end with Terminal 2
1. Go to the frontend directory `cd frontend`.
2. Install needed packages by `npm install`.
3. Run the frontend server by `npm start`.

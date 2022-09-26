# task-manager
## Usage
Clone the repository with `git clone`, after cloning, open 2 terminal sessions.
### Set up the Postgres database
Go to the root directory of the project `cd task-manager`
Create a new database called tasks by `CREATE DATABASE tasks;`.
Enter the database by `psql tasks`.
Created the needed table by `\i backend/init.sql`.
### Set up and run the backend with Terminal 1
Go to the root directory of the project `cd task-manager`, and set up virtual environment for Python by `python3 -m venv venv`.  
Enter the virtual environment `source venv/bin/activate`.
Install required Python modules `pip install -r requirements.txt`.
Go to the backend folder `cd backend`.
Since `uvicorn` needs the virtual environment to be activated from the path the server is in, `deactivate' then reenter the virtual environment by `source ../venv/bin/activate`.
Run the server by `uvicorn main:app`.
### Set up and run the front end with Terminal 2
Go to the frontend directory `cd frontend`.
Install needed packages by `npm install`.
Run the frontend server by `npm start`.

# store-dist-sys
Online file storage application for Distributed Systems 2019


## Backend
Backend was created using pipenv.
### Getting started
- Install pipenv `$ pip install --user pipenv`
- `$ cd backend`
- `$ pipenv shell`
- `$ pipenv install`
- Then to run the app: `$ flask run`
If the backend run is in this matter you may need to have sqlite3 installed on your OS.

## Frontend
Frontend is mainly based on React and other web technologies (i.e., webpack,
babel, etc.).
### Getting started
* `$ cd frontend`
* `$ yarn install`
* `$ yarn start`

## Running the full system with Docker.
- Install Docker and Docker-compose
- `$ cd frontend`
- `$ yarn deploy`
- `$ cd ../backend`
- `$ sudo docker-compose build`
- There is a slight chance that this will fail for a reason unrelated to our configuration.
  In that case just run again. In testing this never failed twice in succession.
- `$ sudo docker-compose up`
- Connect via localhost:5000

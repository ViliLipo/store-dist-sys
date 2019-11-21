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

## Frontend
Frontend is mainly based on React and other web technologies (i.e., webpack,
babel, etc.).
### Getting started
* `$ cd frontend`
* `$ yarn install`
* `$ yarn start`

## Running the full system in Docker.
- Install Docker and Docker-compose
- `$ cd frontend`
- `$ yarn deploy`
- `$ cd ../backend`
- `$ sudo docker-compose build`
- `$ sudo docker-compose up`
- Connect via localhost:5000

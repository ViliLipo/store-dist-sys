FROM python:3.7-buster

WORKDIR /server

COPY ./app ./app
COPY ./config.py ./config.py
COPY ./Pipfile ./Pipfile
COPY ./Pipfile.lock ./Pipfile.lock
COPY ./run.py ./run.py
RUN pip3 install pipenv && pipenv && pipenv install --system --deploy --ignore-pipfile
EXPOSE 5000

CMD flask run


FROM python:3.7-buster

WORKDIR /server

COPY ./Pipfile ./Pipfile
COPY ./Pipfile.lock ./Pipfile.lock
RUN pip3 install pipenv && pipenv && pipenv install --system --deploy --ignore-pipfile

COPY ./app ./app
COPY ./app/dist ./app/dist
COPY ./config.py ./config.py
COPY ./run.py ./run.py
EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]

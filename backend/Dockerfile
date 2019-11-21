FROM python:3.7-buster

WORKDIR /server

COPY ./Pipfile ./Pipfile
COPY ./Pipfile.lock ./Pipfile.lock
RUN pip3 install pipenv && pipenv && pipenv install --system --deploy --ignore-pipfile
COPY ./wait-for-it.sh ./wait-for-it.sh
COPY ./app ./app
COPY ./config.py ./config.py
COPY ./run.py ./run.py
CMD ["./wait-for-it.sh", "db:5432", "--", "flask", "run", "--host=0.0.0.0"]
EXPOSE 5000

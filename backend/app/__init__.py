from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.config.from_object("config")
db = SQLAlchemy(app)

from app import views  # nopep8
from app import models  # nopep8

db.create_all()

# Adds one test object to the database
try:
    userOne = models.Account("teppo.tamminen@junkmail.io", "verysolidpassword")
    db.session.add(userOne)
    db.session.commit()
    db.engine.dispose()
    print(userOne.id)
    fileOne = models.StoredFile(userOne.id, userOne.email, "/", "file.txt", "asdfasr")
    db.session.add(fileOne)
    db.session.commit()
    db.engine.dispose()
except:
    db.session.rollback()
    db.engine.dispose()

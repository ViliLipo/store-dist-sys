from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from logging.config import dictConfig


dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            }
        },
        "handlers": {
            "wsgi": {
                "class": "logging.StreamHandler",
                "stream": "ext://flask.logging.wsgi_errors_stream",
                "formatter": "default",
            },
            "file": {
                "class": "logging.FileHandler",
                "formatter": "default",
                "filename": "spam.log",
            },
        },
        "root": {"level": "INFO", "handlers": ["wsgi", "file"]},
    }
)


app = Flask(__name__)
CORS(
    app,
    supports_credentials=True,
    resources={r"/api/*": {"origins": "http://localhost:9000"}},
)

app.config.from_object("config")
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

from app import views  # nopep8
from app import models  # nopep8

db.create_all()

# Adds one test object to the database
try:
    userOne = models.Account("teppo.tamminen@junkmail.io", "verysolidpassword")
    userTwo = models.Account("jarkko.k@trashpost.co", "verysolidpassword")
    db.session.add(userOne)
    db.session.add(userTwo)
    db.session.commit()
    db.engine.dispose()
    home = models.Folder("home", userTwo.email + "/", userTwo.id)
    userTwo.folders.append(home)
    db.session.add(home)
    db.session.commit()
    db.engine.dispose()
except:
    print("rollback")
    db.session.rollback()
    db.engine.dispose()

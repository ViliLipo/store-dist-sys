from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from logging.config import dictConfig
import os


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
    resources={r"/api/*": {"origins": "http://localhost:5000"}},
)

app.config.from_object("config")
if (os.environ.get('PRODUCTION') == 'true'):
    DEBUG = False
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
    app.config['UPLOAD_FOLDER'] = os.environ.get('UPLOAD_FOLDER')
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
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
    home = models.Folder("home", userTwo.email, userTwo.id)
    userTwo.folders.append(home)
    db.session.add(home)
    db.session.commit()
    db.engine.dispose()
except Exception:
    db.session.rollback()
    db.engine.dispose()

import os
# Enable debug
DEBUG = True
SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/test.db'
UPLOAD_FOLDER = "/tmp/uploads"
SECRET_KEY = "GOD DAMNIT THIS ARGH"
if (os.environ.get('PRODUCTION') == 'true'):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER')
    SECRET_KEY = os.environ.get('SECRET_KEY')

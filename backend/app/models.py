from app import db
from hashlib import sha1


class Folder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    path = db.Column(db.String(1000), unique=True)
    userId = db.Column(db.Integer, db.ForeignKey("account.id"))
    owner = db.relationship("Account", back_populates="folders")
    parentId = db.Column(db.Integer, db.ForeignKey("folder.id"), nullable=True)
    subfolders = db.relationship(
        "Folder", backref=db.backref("parent", remote_side=[id])
    )
    files = db.relationship("StoredFile", back_populates="folder")

    def __init__(self, name, path, userId, parentId=None):
        self.name = name
        self.path = path
        self.userId = userId
        self.parentId = parentId
        self.subfolders = []
        self.files = []


class FileShare(db.Model):
    userId = db.Column(db.Integer, db.ForeignKey(
        "account.id"), primary_key=True)
    fileId = db.Column(db.Integer, db.ForeignKey(
        "stored_file.id"), primary_key=True)
    fileItem = db.relationship("StoredFile", back_populates="shareholders")
    user = db.relationship("Account", back_populates="sharedfiles")

    def __init__(self, userId, fileId):
        self.userId = userId
        self.fileId = fileId


class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(32))
    files = db.relationship(
        "StoredFile", back_populates="owner", cascade="all, delete-orphan"
    )
    sharedfiles = db.relationship("FileShare", back_populates="user")
    folders = db.relationship("Folder", back_populates="owner")

    # Required by flask login
    is_authenticated = True
    is_active = True
    is_anonymous = False

    def __init__(self, email, password):
        self.email = email
        self.password = password
        self.files = []

    def __repr__(self):
        return "<User %r>" % self.email

    # Required by flask login
    def get_id(self):
        return self.id


class StoredFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ownerEmail = db.Column(db.String(120))
    ownerId = db.Column(db.Integer, db.ForeignKey("account.id"))
    owner = db.relationship("Account", back_populates="files")
    folderId = db.Column(db.Integer, db.ForeignKey("folder.id"))
    folder = db.relationship("Folder", back_populates="files")
    path = db.Column(db.String(200), unique=True)
    name = db.Column(db.String(200))
    shareholders = db.relationship("FileShare", back_populates="fileItem")
    created = db.Column(db.DateTime, default=db.func.current_timestamp())
    modified = db.Column(
        db.DateTime,
        default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp(),
    )
    sha1_hash = db.Column(db.Integer)

    def __init__(self, ownerId, ownerEmail, path, name):
        self.ownerId = ownerId
        self.ownerEmail = ownerEmail
        self.path = path
        self.shareholders = []
        self.name = name
        self.sha1_hash = StoredFile.createFileSHA1Hash(self.path)

    def toDict(self):
        return {
            "name": self.name,
            "path": self.path,
            "created": self.created,
            "modified": self.modified,
            "sha1_hash": self.sha1_hash,
            "owner": self.ownerEmail,
            "id": self.id,
        }

    @staticmethod
    def createFileSHA1Hash(path):
        f = open(path, "rb")
        sha = sha1()
        while True:
            data = f.read(65536)
            if not data:
                break
            sha.update(data)
        value = sha.hexdigest()
        f.close()
        print(value)
        return value

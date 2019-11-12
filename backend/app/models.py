from app import db


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

    def __init__(self, email, password):
        self.email = email
        self.password = password
        self.files = []

    def __repr__(self):
        return "<User %r>" % self.email


class StoredFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ownerEmail = db.Column(db.String(120))
    ownerId = db.Column(db.Integer, db.ForeignKey("account.id"))
    owner = db.relationship("Account", back_populates="files")
    path = db.Column(db.String(200), unique=True)
    name = db.Column(db.String(200))
    shareholders = db.relationship("FileShare", back_populates="fileItem")
    created = db.Column(db.DateTime, default=db.func.current_timestamp())
    modified = db.Column(db.DateTime, default=db.func.current_timestamp(),
                         onupdate=db.func.current_timestamp())
    sha1_hash = db.Column(db.Integer)

    def __init__(self, ownerId, ownerEmail, path, name, sha1_hash):
        self.ownerId = ownerId
        self.ownerEmail = ownerEmail
        self.path = path
        self.shareholders = []
        self.name = name
        self.sha1_hash = sha1_hash

    def toDict(self):
        return {
                "name": self.name,
                "path": self.path,
                "created": self.created,
                "modified": self.modified,
                "sha1_hash": self.sha1_hash,
                "owner": self.ownerEmail,
                }









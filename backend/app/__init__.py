import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .extensions import db

def create_app():
    app = Flask(__name__)

    CORS(app)  

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///worknest.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["UPLOAD_FOLDER"] = os.path.join(app.root_path, "..", "uploads")  

    db.init_app(app)
    with app.app_context():
        from . import models
        from .routes.user import api

        # Kreira sve tabele definisane u modelima (ako već ne postoje)
        db.create_all()

        app.register_blueprint(api, url_prefix="/api")

    return app

import os
from flask import Flask
from flask_cors import CORS
from .extensions import db
from .routes import api

def create_app():
    app = Flask(__name__)

    CORS(app)  # ✅ must be here

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///worknest.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["UPLOAD_FOLDER"] = os.path.join(app.root_path, "..", "uploads")   # ✅ REQUIRED

    db.init_app(app)
    app.register_blueprint(api, url_prefix="/api")

    return app

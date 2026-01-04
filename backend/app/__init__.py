from flask import Flask, request, jsonify
from datetime import datetime
import uuid
from flask_cors import CORS
from .routes import api

def create_app():
    app = Flask(__name__)

    CORS(app)  # dozvoljava React-u pristup backendu

    app.register_blueprint(api)

    EVENTS = []  # replace with DB later

    return app

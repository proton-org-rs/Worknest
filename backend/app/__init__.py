from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# SQLAlchemy objekat koji koristimo za rad sa bazom
db = SQLAlchemy()


def create_app():
    """
    Fabrika aplikacije (preporučeni pattern u Flask-u).
    - Kreira i konfiguriše Flask aplikaciju
    - Inicijalizuje CORS i SQLAlchemy
    - Kreira tabele u bazi ako ne postoje
    - Registruje rute iz `routes` modula
    """
    app = Flask(__name__)

    # konfiguracija baze (koristimo lokalni SQLite fajl `data.db`)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Omogućavamo CORS da bi frontend (React) mogao da šalje zahteve
    CORS(app)

    # Povezujemo SQLAlchemy sa aplikacijom
    db.init_app(app)

    # U app_context-u možemo da importujemo modele i kreiramo tabele
    # Ovo radimo ovde da bismo izbegli cirkularne import-e
    with app.app_context():
        from . import models
        from .routes import api
        # Kreira sve tabele definisane u modelima (ako već ne postoje)
        db.create_all()

        # Registrujemo blueprint koji sadrži rute
        app.register_blueprint(api)

    return app

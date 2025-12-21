from flask import Blueprint, jsonify, request
from .models import User
from . import db

api = Blueprint("api", __name__)


@api.route("/hello")
def hello():
    return jsonify({"message": "Pozdrav sa Flask backend-a!"})


@api.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'Email i password su obavezni'}), 400

    existing = User.query.filter_by(email=email).first()
    if existing:
        return jsonify({'error': 'Korisnik sa tim mejlom već postoji'}), 400

    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    # vraćamo email koji frontend može koristiti za prikaz pozdrava
    return jsonify({'email': user.email}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'Email i password su obavezni'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Neispravan mejl ili šifra'}), 401

    return jsonify({'email': user.email}), 200


@api.route('/greet/<string:email>')
def greet(email):
    return jsonify({'message': f'Zdravo {email}'})

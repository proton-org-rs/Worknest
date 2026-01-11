from flask import Blueprint, jsonify, request
from .models import User
from . import db

api = Blueprint("api", __name__)

@api.route("/hello")
def hello():
    return jsonify({"message": "Pozdrav sa Flask backend-a!"})

# user routes

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

# reservation routes

@api.route('/reservations-calendar', methods=['GET'])
def get_reservations():
    reservations = Reservation.query.all()

    return jsonify([
        {
            "id": r.id,
            "start_time": r.start_time.isoformat(),
            "duration": r.duration,
            "creator_email": r.creator.email,
            "room_number": r.room.number
        }
        for r in reservations
    ])

@api.route('/reservations-calendar', methods=['POST'])
def create_reservation():

    data = request.get_json() or {}
    start_time = data.get('start_time')
    duration = data.get('duration')
    creator_email = data.get('creator_email')
    room_number = data.get('room_number')

    if not start_time or not duration:
        return jsonify({'error': 'Vreme pocetka i trajanje su obavezni'}), 400

    user = User.query.filter_by(email=creator_email).first()
    if not user:
        return {"error": "User not found"}, 404

    room = Room.query.filter_by(number=room_number).first()
    if not room:
        return {"error": "Room not found"}, 404


    reservation = Reservation(
        start_time = start_time,
        duration = duration,
        creator = user,
        room = room
    )

    db.session.add(reservation)
    db.session.commit()

    return {
        "id": reservation.id,
        "start_time": reservation.start_time.isoformat(),
        "duration": reservation.duration,
        "room_id": reservation.room_id,
        "creator_id": reservation.user_id,
    }, 201
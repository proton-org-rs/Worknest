from flask import Blueprint, jsonify, request, send_from_directory
from .models import User
from .extensions import db
from flask import current_app
import os
import uuid

api = Blueprint("api", __name__)

@api.route("/user/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get_or_404(user_id)

    return jsonify({
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "image": user.image,
        "projects": [
            {
                "id": p.id,
                "title": p.title,
                "description": p.description,
                "status": p.status
            } for p in user.projects
        ]
    })


@api.route("/user/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json

    user.full_name = data.get("full_name", user.full_name)
    user.email = data.get("email", user.email)

    db.session.commit()
    return jsonify(user.to_dict())

@api.route("/user/<int:user_id>/image", methods=["POST"])
def upload_image(user_id):
    user = User.query.get_or_404(user_id)

    if "image" not in request.files:
        return jsonify({"error": "No image field"}), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filename = f"{uuid.uuid4()}_{image.filename}"

    upload_dir = current_app.config["UPLOAD_FOLDER"]
    os.makedirs(upload_dir, exist_ok=True)

    path = os.path.join(upload_dir, filename)
    image.save(path)

    user.image = filename
    db.session.commit()

    return jsonify({"image": filename}), 200


@api.route("/uploads/<filename>")
def get_image(filename):
    return send_from_directory(
        current_app.config["UPLOAD_FOLDER"], filename
    )

@api.route("/user/<int:user_id>/image", methods=["DELETE"])
def delete_profile_image(user_id):
    user = User.query.get_or_404(user_id)

    if user.image:
        path = os.path.join(
            current_app.config["UPLOAD_FOLDER"],
            user.image
        )

        if os.path.exists(path):
            os.remove(path)

        user.image = None
        db.session.commit()

    return jsonify({"message": "Profile image removed"}), 200


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
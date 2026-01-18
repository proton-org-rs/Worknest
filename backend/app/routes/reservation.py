from flask import Blueprint, jsonify, request, send_from_directory
from ..models import User
from ..extensions import db
from flask import current_app
import os
import uuid

reservation_bp = Blueprint("reservation", __name__)


@reservation_bp.route('/calendar', methods=['GET'])
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

@reservation_bp.route('/calendar', methods=['POST'])
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
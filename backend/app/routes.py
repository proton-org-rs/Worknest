from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
import uuid

api = Blueprint("api", __name__)
RESERVATIONS = []

@api.route("/hello")
def hello():
    return jsonify({"message": "Pozdrav sa Flask backend-a!"})

@api.route('/reservations-calendar', methods=['GET'])
def get_reservations():
    return jsonify(RESERVATIONS)

@api.route('/reservations-calendar', methods=['POST'])
def create_reservation():
    data = request.get_json(silent=True) or {}

    start = data.get("start") or data.get("start_time")
    end = data.get("end")
    duration = data.get("duration")

    if not start:
        return jsonify({"error": "start is required"}), 400

    if not end and duration:
        try:
            start_dt = datetime.fromisoformat(start)
            end = (start_dt + timedelta(minutes=int(duration))).isoformat()
        except Exception:
            return jsonify({"error": "invalid start or duration"}), 400

    if not end:
        return jsonify({"error": "end is required"}), 400

    reservation = {
        "id": str(uuid.uuid4()),
        "title": data.get("title", "No title"),
        "start": start,
        "end": end,
        "room_number": data.get("room_number"),
        "creator_email": data.get("creator_email"),
    }

    RESERVATIONS.append(reservation)
    return jsonify(reservation), 201
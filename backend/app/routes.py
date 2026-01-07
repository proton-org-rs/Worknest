from flask import Blueprint, jsonify, request
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
    data = request.json
    reservation  = {
        "id": str(uuid.uuid4()),
        "title": data.get("title", "No title"),
        "start": data["start"],
        "end": data["end"]
    }
    RESERVATIONS.append(reservation)
    return jsonify(reservation), 201
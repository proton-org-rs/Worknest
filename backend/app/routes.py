from flask import Blueprint, jsonify

api = Blueprint("api", __name__)

@api.route("/hello")
def hello():
    return jsonify({"message": "Pozdrav sa Flask backend-a!"})

@app.route('/api/reservations-calendar', methods=['GET'])
def get_reservations():
    return jsonify(RESERVATIONS)

@app.route('/api/reservations-calendar', methods=['POST'])
def create_reservation():
    data = request.json
    reservation = {
        "id": str(uuid.uuid4()),
        "start": data["start"],
        "end": data["end"]
    }
    RESERVATIONS.append(reservation)
    return jsonify(reservation), 201

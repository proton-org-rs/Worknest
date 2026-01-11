from flask import Blueprint, request, jsonify

api = Blueprint("api", __name__)

@api.route("/hello")
def hello():
    return jsonify({"message": "Pozdrav sa Flask backend-a!"})

@api.route("/rooms/<int:room_id>/reserve", methods=["POST"])
def reserve_room(room_id):
    data = request.get_json() #uzmi JSON iz bodyja

    if not data:
        return jsonify({"error": "Invalid data"}), 400 # moze i druga poruka za error
    
    required_fields = ["date", "start_time", "end_time", "description"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400 #HTTP kod za Bad Request
        
    return jsonify({
        "message": "Reservation request received!",
        "room_id": room_id,
        "data": data
    }), 201 #HTTP kod 2xx za uspesnu realizaciju
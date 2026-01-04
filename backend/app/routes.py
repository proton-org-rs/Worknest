from flask import Blueprint, jsonify,request

api = Blueprint("api", __name__)

@api.route("/hello")
def hello():
    return jsonify({"message": "Pozdrav sa Flask backend-a!"})

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if username == "Proton" and password == "Proton":#ok ovde cu dodati tkd cita iz JSON "baze podataka al ovo je samo za test"
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Invalid credentials"})
    #return jsonify({"uradicu trust"})


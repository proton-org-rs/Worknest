from flask import Blueprint, jsonify, request
import os

api = Blueprint("api", __name__)

# TEMP mock user data
USER = {
    "id": 1,
    "full_name": "Petar Petrovic",
    "email": "petar.petrovic@gmail.com",
    "image": None,
    "active_projects": ["Worknest", "Client Portal"],
    "finished_projects": ["Portfolio Website", "Blog App"]
}

@api.route("/user/<int:user_id>", methods=["GET"])
def get_user(user_id):
    if user_id != 1:
        return jsonify({"error": "User not found"}), 404
    return jsonify(USER)


@api.route("/user/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.json
    USER["full_name"] = data.get("full_name", USER["full_name"])
    USER["email"] = data.get("email", USER["email"])
    return jsonify(USER)

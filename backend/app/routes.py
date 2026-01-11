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


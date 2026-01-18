from .reservation import reservation_bp
from .user import user_bp


def register_blueprints(app):
    app.register_blueprint(reservation_bp)
    app.register_blueprint(user_bp)
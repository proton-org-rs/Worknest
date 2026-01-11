from .. import db


class Reservation(db.Model):
    __tablename__ = "reservations"

    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.DateTime, nullable=False)
    duration = db.Column(db.Integer, nullable=False)  # minutes

    room_id = db.Column(db.Integer, db.ForeignKey("rooms.id"), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    room = db.relationship("Room", back_populates="reservations")
    creator = db.relationship("User", back_populates="reservations")

    def to_dict(self) -> dict:
        start = self.start_time.isoformat() if hasattr(self.start_time, "isoformat") else self.start_time
        return {
            "id": self.id,
            "start_time": start,
            "duration": self.duration,
            "room_id": self.room_id,
            "creator_id": self.creator_id,
        }
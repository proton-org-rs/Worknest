from . import db

class Reservation(db.Model):

    __tablename__ = "reservations"

	id = db.Column(db.Integer, primary_key=True)

    start_time = db.Column(db.DateTime, nullable = False)
    duration = db.Column(db.Integer, nullable = False) # in minutes

    room_id = db.Room(
        db.Integer,
        db.ForeignKey("rooms.id"),
        nullable=False
    )

    creator_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

	def to_dict(self):
		return {"id": self.id, 
                "start_time": self.start_time.isoformat(), 
                "duration": self.duration,
                "room_id": self.room_id,
                "creator_id": self.creator_id}
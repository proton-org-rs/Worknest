from .. import db


class Room(db.Model):
    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key=True)
    
    name = db.Column(db.String(50), nullable=False, unique=True) # naziv prostorije, e.g. "Paviljon 18a"
    reservations = db.relationship("Reservation", back_populates="room", cascade="all, delete-orphan")

    def to_dict(self) -> dict:
        return {"id": self.id, "name": self.name, "floor": self.floor}
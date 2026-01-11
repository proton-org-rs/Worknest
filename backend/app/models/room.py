from .. import db


class Room(db.Model):
    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key=True)
    # TODO: kako se oznacavaju sale u palati? promeniti u odgovarajucu oznaku
    number = db.Column(db.String, nullable=False, unique=True)
    floor = db.Column(db.Integer, nullable=False)
	# Možda je pametnije koristiti samo naziv prostorije umesto broja?
	# npr. "Palata nauke, SC", "Paviljon 18a" itd.

    reservations = db.relationship("Reservation", back_populates="room", cascade="all, delete-orphan")

    def set_number(self, number: str) -> None:
        self.number = number

    def set_floor(self, floor: int) -> None:
        self.floor = floor

    def to_dict(self) -> dict:
        return {"id": self.id, "number": self.number, "floor": self.floor}
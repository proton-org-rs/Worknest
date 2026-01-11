from . import db

class Room(db.Model):

    __tablename__ = "rooms"

	id = db.Column(db.Integer, primary_key=True)

    # TODO: kako se oznacavaju sale u palati? promeniti u odgovarajucu oznaku
    number = db.Column(db.String, nullable=False)
    floor = db.Column(db.Integer, nullable = False)


	def set_number(self, number: Integer):
		self.number = number

	def set_floor(self, floor: int):
		self.floor = floor

	def to_dict(self):
		return {"id": self.id, 
                "number": self.number, 
                "floor": self.floor}
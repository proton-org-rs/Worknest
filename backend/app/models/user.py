from .. import db
from werkzeug.security import generate_password_hash, check_password_hash

# Koristimo SQLAlchemy model, gde svaki atribut klase predstavlja kolonu u tabeli.

# Model koji predstavlja korisnika u bazi podataka.
class User(db.Model):
    __tablename__ = "users"

    # Primarni ključ (jedinstveni identifikator korisnika)
    id = db.Column(db.Integer, primary_key=True)
    # Email polje koje mora biti jedinstveno i ne može biti prazno
    email = db.Column(db.String(120), unique=True, nullable=False)
    # Ovde čuvamo hash lozinke, a ne samu lozinku
    password_hash = db.Column(db.String(128), nullable=False)

    reservations = db.relationship("Reservation", back_populates="creator", cascade="all, delete-orphan")

    def set_password(self, password: str) -> None:
        # Generiše hash od plain-text lozinke i čuva ga
        # Nikada nemojte čuvati običnu lozinku u bazi
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        # Proverava da li plain-text lozinka odgovara hash-u
        return check_password_hash(self.password_hash, password)

    def to_dict(self) -> dict:
        # Pomoćna funkcija koja vraća korisnika kao Python dict
        # Može se koristiti kada treba vratiti JSON (bez lozinke)
        return {"id": self.id, "email": self.email}
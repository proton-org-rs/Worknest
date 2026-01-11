from .. import db


class Project(db.Model):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    estimated_duration = db.Column(db.String)  # npr. "2 meseca"

    def set_description(self, description: str) -> None:
        self.description = description

    def set_estimated_duration(self, duration: str) -> None:
        self.estimated_duration = duration

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "estimated_duration": self.estimated_duration,
        }
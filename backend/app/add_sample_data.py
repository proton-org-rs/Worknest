from app import create_app, db
from app.models import User, Project

app = create_app()
with app.app_context():
    db.create_all()
    u = User(full_name="Alice Example", email="alice@example.com", password_hash="123")
    db.session.add(u)
    db.session.commit()
    p = Project(title="Demo Project", description="seed data", user_id=u.id)
    db.session.add(p)
    db.session.commit()
    print("Inserted user id:", u.id, "project id:", p.id)
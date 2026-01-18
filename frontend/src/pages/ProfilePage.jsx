import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/profile.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/user/1")
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to load user");
        }
        return res.json();
      })
      .then(setUser)
      .catch(err => {
        console.error(err);
        setError("User could not be loaded");
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

const avatarUrl = user.image
  ? `http://127.0.0.1:5000/api/uploads/${user.image}`
  : "Worknest/frontend/public/avatar_default.jpg";

  return (
    <div className="page">
      <div className="avatar">
        <img
          src={avatarUrl}
          alt="User avatar"
          className="profile-avatar"
        />
      </div>

      <p><b>Ime i prezime:</b> {user.full_name}</p>
      <p><b>Email adresa:</b> {user.email}</p>

      <div className="projects">
        <div className="card">
          kontejner za aktivne projekte
        </div>
        <div className="card">
          kontejner za zavrsene projekte
        </div>
      </div>

      <button className="edit-btn" onClick={() => navigate("/edit")}>
        Edit podatke
      </button>
    </div>
  );
}

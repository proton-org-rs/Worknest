import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/profile.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/user/1")
      .then(res => res.json())
      .then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="page">
      <div className="avatar">slika</div>

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

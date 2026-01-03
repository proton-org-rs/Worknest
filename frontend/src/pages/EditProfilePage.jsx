import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/user/1")
      .then(res => res.json())
      .then(data => {
        setName(data.full_name);
        setEmail(data.email);
      });
  }, []);

  function save() {
    fetch("http://localhost:5000/user/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: name,
        email: email
      })
    }).then(() => navigate("/"));
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Edit profile</h2>

      <input value={name} onChange={e => setName(e.target.value)} />
      <br /><br />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <br /><br />

      <button onClick={save}>Save</button>
    </div>
  );
}

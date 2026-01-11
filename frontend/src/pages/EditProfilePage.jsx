import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:5000/api";
const USER_ID = 1; // later comes from auth

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const navigate = useNavigate();

  // -------------------------------
  // Load user data
  // -------------------------------
  useEffect(() => {
    fetch(`${API_BASE}/user/${USER_ID}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load user");
        return res.json();
      })
      .then(data => {
        setName(data.full_name || "");
        setEmail(data.email || "");
        setCurrentImage(data.image || null);
      })
      .catch(err => console.error(err));
  }, []);

  // -------------------------------
  // Avatar URL (preview logic)
  // -------------------------------
 const avatarUrl = selectedImage
  ? URL.createObjectURL(selectedImage)
  : currentImage
    ? `http://127.0.0.1:5000/api/uploads/${currentImage}`
    : "Worknest/frontend/public/avatar_default.jpg";

  // -------------------------------
  // Save name + email
  // -------------------------------
  function saveProfile() {
    fetch(`${API_BASE}/user/${USER_ID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: name,
        email: email
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Save failed");
        navigate("/");
      })
      .catch(err => console.error(err));
  }

  // -------------------------------
  // Upload profile image
  // -------------------------------
  function uploadImage() {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    fetch(`${API_BASE}/user/${USER_ID}/image`, {
      method: "POST",
      body: formData
    })
      .then(res => {
        if (!res.ok) throw new Error("Upload failed");
        navigate("/");
      })
      .catch(err => console.error(err));
  }

  function removeImage() {
  fetch(`${API_BASE}/user/${USER_ID}/image`, {
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) throw new Error("Delete failed");
      setCurrentImage(null);
      setSelectedImage(null);
    })
    .catch(err => console.error(err));
}


  return (
    <div style={{ padding: 40, maxWidth: 500 }}>
      <h2>Edit Profile</h2>

      <img
        src={avatarUrl}
        alt="avatar"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #B0BED3",
          marginBottom: 20
        }}
      />

      <div style={{ marginBottom: 10 }}>
        <label>Full name</label><br />
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Email</label><br />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Profile picture</label><br />
        <input
          type="file"
          accept="image/*"
          onChange={e => setSelectedImage(e.target.files[0])}
        />
      </div>

      <button onClick={saveProfile} style={{ marginRight: 10 }}>
        Save profile
      </button>

      <button onClick={uploadImage}>
        Upload image
      </button>
    <button
      onClick={removeImage}
      style={{ marginLeft: 10 }}
    >
      Remove image
    </button>

    </div>
  );
}

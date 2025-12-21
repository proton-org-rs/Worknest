import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/*
  Komponenta `Register` prikazuje formu za registraciju novog korisnika.
  - Prikuplja email i lozinku iz forme pomoću `useState` hook-a.
  - Na slanje forme (`handleSubmit`) šalje POST zahtev na backend `/register`.
  - Ako je registracija uspešna, čuva email u localStorage i preusmerava
    korisnika na stranicu sa pozdravom.
*/
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // POST zahtev ka backendu sa JSON telom
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (res.ok) {
          // Ako je registracija uspešna, čuvamo mejl i navigiramo
          const data = await res.json();
          try { localStorage.setItem('userEmail', data.email); } catch {}
            // obavesti header i ostale delove aplikacije o promeni auth stanja
            window.dispatchEvent(new Event('auth-change'));
          navigate(`/greet/${encodeURIComponent(data.email)}`);
        } else {
          // Prikaz greške vraćene od servera
          const err = await res.json().catch(() => ({}));
          alert(err.error || 'Greška pri registraciji');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Greška pri konekciji');
      });
  };

  return (
    <div className="center-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Registruj se</h2>
        <div className="form-group">
          <label>Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Šifra</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="submit-btn btn">Registruj se</button>
        <div>
          <Link to="/" className="back-link">Nazad</Link>
        </div>
      </form>
    </div>
  );
}

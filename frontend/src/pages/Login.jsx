import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/*
  Komponenta `Login` prikazuje formu za prijavu korisnika.
  - Koristimo lokalni React state (`useState`) za polja email i password.
  - Kada se forma pošalje (`handleSubmit`), šaljemo POST zahtev na backend
    sa email-om i lozinkom u JSON formatu.
  - Ako je prijava uspešna, čuvamo email u localStorage i preusmeravamo korisnika
    na stranicu sa pozdravom.
  - Ako nije, pokazujemo poruku o grešci.
*/
export default function Login() {
  // Stanje za kontrolisana polja forme
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hook iz react-router-dom koji omogućava programsku navigaciju
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Priprema i slanje POST zahteva na /login endpoint
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (res.ok) {
          // Ako je odgovor uspešan, parsiramo JSON i preusmerimo korisnika
          const data = await res.json();
              try { localStorage.setItem('userEmail', data.email); } catch {};
              // obavesti header i ostale delove aplikacije o promeni auth stanja
              window.dispatchEvent(new Event('auth-change'));
              navigate(`/greet/${encodeURIComponent(data.email)}`);
        } else {
          // Ako server vrati grešku, pokušamo da prikažemo poruku
          const err = await res.json().catch(() => ({}));
          alert(err.error || 'Neuspešna prijava');
        }
      })
      .catch((err) => {
        // Greška pri konekciji (npr. backend nije pokrenut)
        console.error(err);
        alert('Greška pri konekciji');
      });
  };

  return (
    <div className="center-container">
      {/* Forma koristi CSS klase definisane u main.css */}
      <form onSubmit={handleSubmit} className="form">
        <h2>Uloguj se</h2>
        <div className="form-group">
          <label>Email</label>
          {/* input je kontrolisan (value i onChange) */}
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Šifra</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="submit-btn btn">Uloguj se</button>
        <div>
          {/* Link vraća na početnu */}
          <Link to="/" className="back-link">Nazad</Link>
        </div>
      </form>
    </div>
  );
}

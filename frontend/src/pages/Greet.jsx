import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/*
  Komponenta `Greet` prikazuje pozdravnu poruku za prijavljenog korisnika.
  - Čita parametar `email` iz URL-a pomoću `useParams`.
  - Poziva backend endpoint `/greet/:email` da dobije poruku (opciono).
  - Pruža dugme za odjavu koje briše lokalne podatke i vraća korisnika na landing.
*/
export default function Greet() {
  const { email } = useParams();
  // Inicijalna poruka koristi dekodiran email iz URL-a
  const [message, setMessage] = useState(`Zdravo ${decodeURIComponent(email || '')}`);

  // Kada se komponenta mount-uje (ili se promeni email), pozivamo backend
  useEffect(() => {
    if (!email) return;
    fetch(`http://localhost:5000/greet/${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message || `Zdravo ${decodeURIComponent(email)}`))
      .catch(() => {
        // Ako poziv ne uspe (npr. backend stoji), ostajemo sa lokalnom porukom
      });
  }, [email]);

  const navigate = useNavigate();

  // Jednostavan logout: brišemo korisnikov email iz localStorage i vraćamo na landing
  const handleLogout = () => {
    try { localStorage.removeItem('userEmail'); } catch {}
    // obavesti header i ostale delove aplikacije da je korisnik odjavljen
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  return (
    <div className="center-container">
      <div className="center-box">
        <h1>{message}</h1>
        <div style={{ marginTop: 16 }}>
          <button className="btn" onClick={handleLogout}>Odjavi se</button>
        </div>
      </div>
    </div>
  );
}

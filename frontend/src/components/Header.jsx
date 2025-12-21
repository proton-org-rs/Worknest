import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Header koji se prikazuje na svim stranicama.
// Prikazuje linkove za prijavu/registraciju kada korisnik nije ulogovan,
// i prikazuje email + dugme za odjavu kada jeste.
export default function Header() {
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Funkcija koja čita stanje iz localStorage
    const read = () => {
      try {
        const e = localStorage.getItem('userEmail');
        setEmail(e);
      } catch {
        setEmail(null);
      }
    };

    // Pročitaj odmah
    read();

    // Osvežava stanje kada drugi delovi aplikacije emituju 'auth-change'
    const handler = () => read();
    window.addEventListener('auth-change', handler);

    return () => window.removeEventListener('auth-change', handler);
  }, []);

  const handleLogout = () => {
    try { localStorage.removeItem('userEmail'); } catch {}
    // obaveštavamo ostale delove app da se stanje promenilo
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="logo">Worknest</div>
        <nav>
          {!email && (
            <>
              <Link to="/login" className="nav-link">Uloguj se</Link>
              <Link to="/register" className="nav-link">Registruj se</Link>
            </>
          )}

          {email && (
            <>
              <span className="nav-greet">Zdravo {email}</span>
              <button className="nav-logout btn" onClick={handleLogout}>Odjavi se</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

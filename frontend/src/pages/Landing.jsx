import React from 'react';
import { Link } from 'react-router-dom';

// Landing stranica je početna stranica koju vidi korisnik.
// Koristimo `Link` iz react-router-dom da bi navigacija bila bez osvežavanja stranice.
export default function Landing() {

  return (
    <div className="center-container">
      <div className="center-box">
        <h1>Dobrodošli</h1>
        <div>
          {/* Link do stranice za prijavu */}
          <Link to="/login">
            <button className="btn">Uloguj se</button>
          </Link>
          {/* Link do stranice za registraciju */}
          <Link to="/register">
            <button className="btn">Registruj se</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import './style/main.css';

// React Router koristimo za upravljanje stranicama (routama) u SPA aplikaciji.
// `BrowserRouter` obezbeđuje istoriju URL-ova, `Routes` i `Route` definišu mape putanja.
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Greet from './pages/Greet';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  // Ovde definišemo koje komponente (stranice) se prikazuju za koje putanje.
  // Primer: pristupom na `/login` prikazaće se komponenta `Login`.
  return (
    <BrowserRouter>
      <Header />
      <main style={{ maxWidth: 960, margin: '24px auto', padding: '0 16px' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/greet/:email" element={<Greet />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

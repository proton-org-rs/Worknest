import './style/base.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Calendar from './pages/Calendar'
import { useEffect, useState } from "react";


function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/hello")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Greška:", err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/reservations-calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

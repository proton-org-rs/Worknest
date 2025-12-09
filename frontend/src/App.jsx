import './style/base.css';

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
    <div style={{ margin: "40px", fontSize: "20px" }}>
      <h1>React + Flask demo</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;

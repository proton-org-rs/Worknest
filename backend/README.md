# Backend – README

Ovo je minimalni Flask backend koji služi kao API servis i primer integracije sa frontend aplikacijom.

## 📁 Struktura projekta

```
backend/
│
├── app.py           # Glavna Flask aplikacija
├── requirements.txt # Python zavisnosti
└── README.md        # Dokumentacija projekta
```

## 🧩 app.py

Primer minimalnog backend-a:

```python
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/hello")
def hello():
    return jsonify({ "message": "Zdravo iz Flask backend-a!" })

if __name__ == "__main__":
    app.run(debug=True)
```

## 📦 Instalacija zavisnosti

U root direktorijumu backend-a pokrenuti:

```
pip install -r requirements.txt
```

`requirements.txt` treba da sadrži:

```
flask
flask-cors
```

## ▶️ Pokretanje servera

```
python wsgi.py
```

Server će podići lokalni API na:

```
http://127.0.0.1:5000
```

## 🌐 API rute

### **GET /hello**

Vraća JSON pozdrav:

**Primer odgovora:**

```json
{
  "message": "Zdravo iz Flask backend-a!"
}
```

## ⭐ Saveti

- Preporučljivo je koristiti virtualno okruženje:
  ```
  python -m venv venv
  source venv/bin/activate   # macOS / Linux
  venv\Scripts\activate    # Windows
  ```

- Backend možeš integrisati sa React-om putem fetch poziva:
  ```js
  useEffect(() => {
      fetch("http://127.0.0.1:5000/hello")
          .then(res => res.json())
          .then(data => console.log(data.message));
  }, []);
  ```

# 📘 Projekat -- Flask + React aplikacija

Ovaj repozitorijum sadrži kompletan projekat podeljen u **backend**
(Flask) i **frontend** (React).\
Cilj projekta je omogućiti praćenje projekata u Protonu, kao i rezervaciju sala kojima Proton ima pristup.

------------------------------------------------------------------------

## 📂 Struktura projekta

    Root/
    │
    ├── backend/               # Flask API
    │   ├── app/
    │   │   ├── __init__.py    # Inicijalizacija Flask aplikacije
    │   │   ├── routes.py      # Definicije API ruta
    │   │   ├── models.py      # Logika podataka / modeli / ORM baze
    │   │   ├── config.py      # Konfiguracija aplikacije
    │   ├── requirements.txt   # Python zavisnosti
    │   └── wsgi.py            # Ulazna tačka aplikacije
    │
    ├── frontend/              # React aplikacija
    │   ├── src/               # Komponente, logika i UI
    │   ├── public/
    │   ├── package.json       # Node zavisnosti
    │
    └── README.md              # Ovaj fajl

------------------------------------------------------------------------

## ▶️ Pokretanje aplikacije

### 🔧 1. Pokretanje backend-a (Flask)

1.  Uđi u backend direktorijum:

    ``` bash
    cd backend
    ```

2.  Aktiviraj virtualno okruženje:

    -   Linux/Mac:

        ``` bash
        source venv/bin/activate
        ```

    -   Windows:

        ``` bash
        venv\Scripts\activate
        ```

3.  Pokreni development server:

    ``` bash
    python wsgi.py
    ```

Backend će biti dostupan na:

👉 **http://localhost:5000**

------------------------------------------------------------------------

### 🌐 2. Pokretanje frontend-a (React)

1.  Uđi u frontend direktorijum:

    ``` bash
    cd frontend
    ```

2.  Instaliraj zavisnosti:

    ``` bash
    npm install
    ```

3.  Pokreni dev server:

    ``` bash
    npm start
    ```

Frontend će biti dostupan na:

👉 **http://localhost:3000**

------------------------------------------------------------------------

## 📄 Najbitniji fajlovi i čemu služe

### 🔹 backend/app/\_\_init\_\_.py

Inicijalizuje Flask aplikaciju, registruje rute i ekstenzije.

### 🔹 backend/app/routes.py

Sadrži API rute i logiku odgovora.

### 🔹 backend/app/models.py

Modeli i logika za rad sa podacima.

### 🔹 backend/app/config.py

Konfiguracija aplikacije.

### 🔹 backend/wsgi.py

Ulazna tačka backend aplikacije.

### 🔹 frontend/src/

Sav React kod: UI, logika, komponente.

------------------------------------------------------------------------

## 🧭 GitHub kultura i pravila rada

### 🚫 Nikada ne push-uj direktno na `main`

Main je stabilna i zaštićena grana.

### 🌱 Radi u sopstvenim granama

Primeri dobrih imena:

    feature/login-auth
    bugfix/fix-user-fetch
    hotfix/missing-env-check
    refactor/navbar-cleanup

### 🔀 Kada završiš, otvori Pull Request

-   PR mora biti odobren pre merge-a.
-   Opis treba jasno da objasni šta je urađeno.

### 🔍 Ne dupliraj posao

-   Proveri issue-e i PR-ove pre početka rada.

### ♻️ Radi manje i češće commit-e

-   Svaki commit treba da bude smislen i jasan.

### 💬 Jasne commit poruke

    feat: dodata forma za login
    fix: ispravljen CORS error
    refactor: očišćen kod u routes.py

### 🧹 Održavaj kod urednim

-   Uklanjaj kod koji se ne koristi.
-   Poštuj formatter i linter.

### 🧪 Testiraj pre push-a

Backend i frontend moraju raditi bez grešaka.

### 🛑 Nema force push-a

Force push je zabranjen osim u dogovoru sa timom.

------------------------------------------------------------------------

## 🛠️ Dobre prakse

✔ Odvojen backend i frontend\
✔ Koristi `.env` za osetljive podatke\
✔ Ne commit-uj `node_modules` i `venv`\
✔ Dokumentuj kompleksne funkcije i API rute\
✔ Modularan i testabilan kod\
✔ Ažuriranje README-a kako projekat raste\
✔ Otvaraj issue-e za promene

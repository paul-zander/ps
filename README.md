# Secure Coding Basics: Einführung in sichere Softwareentwicklung durch Coding Challenges

## Beschreibung

**Secure Coding Basics** ist ein Universitätsprojekt, das Studierenden eine Einführung in sichere Softwareentwicklung bietet. Das Projekt verdeutlicht, wie der unbedachte Einsatz von Künstlicher Intelligenz (KI) zu unsicherem Code führen kann und vermittelt grundlegende Sicherheitskonzepte durch interaktive Coding Challenges.

### Projektstruktur

1. **Einführung**
   - Verständnis der Risiken durch unsicheren Code bei der Nutzung von KI.
2. **Cross-Site Scripting (XSS)**
   - **Grundlagen:** Einführung in XSS und seine Auswirkungen.
   - **XSS in Aktion:** Praktische Beispiele für XSS-Angriffe.
   - **XSS hinter den Kulissen:** Technische Details und Funktionsweise von XSS.
   - **Wie kann man XSS verhindern:** Strategien und Best Practices zur Vermeidung von XSS.
3. **SQL-Injection (SQLi)**
   - **Grundlagen:** Einführung in SQLi und seine Gefahren.
   - **SQLi in Aktion:** Praktische Beispiele für SQLi-Angriffe.
   - **SQLi hinter den Kulissen:** Technische Details und Funktionsweise von SQLi.
   - **Wie kann man SQLi verhindern:** Strategien und Best Practices zur Vermeidung von SQLi.
4. **Simulierte Banking App**
   - Erklärung der Funktionsweise der App.
   - Anleitung zur Rolle des Angreifers: Versuch, Geld von anderen Nutzern zu stehlen.
5. **Sicherheitsüberprüfung**
   - **XSS:** Auswahlmöglichkeiten zur Behebung von unsicherem Code.
   - **SQLi:** Auswahlmöglichkeiten zur Behebung von unsicherem Code.

Nach Abschluss dieser Module haben die Nutzer ein Bewusstsein für sichere Softwareentwicklung entwickelt und die Vermeidung gängiger Sicherheitslücken wie XSS und SQLi erlernt.

## Inhaltsverzeichnis

- [Beschreibung](#beschreibung)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Features](#features)
- [Technologien](#technologien)

## Installation

### Voraussetzungen

- **Node.js** (Version 14 oder höher)
- **npm** (Version 6 oder höher)
- **Python** (Version 3.8 oder höher)
- **FastAPI**
- **MySQL**

### Frontend einrichten

1. **Repository klonen:**
   ```bash
   git clone https://github.com/paul-zander/ps.git
   ```
2. **In das Frontend-Verzeichnis wechseln:**
   ```bash
   cd bibifi_ps/frontend
   ```
3. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```
4. **Entwicklungsserver starten:**
   ```bash
   npm start dev
   ```

### Backend einrichten

1. **In das Backend-Verzeichnis wechseln:**
   ```bash
   cd bibifi_ps/backend
   ```
2. **Virtuelle Umgebung erstellen (optional aber empfohlen):**
   ```bash
   python -m venv venv
   source .venv/bin/activate  # Für Windows: .venv\Scripts\Activate.ps1
   ```
3. **Abhängigkeiten installieren:**
   ```bash
   pip install -r requirements.txt
   ```
4. **FastAPI-Server starten:**
   ```bash
   uvicorn main:app --reload
   ```

### Datenbank einrichten

1. **MySQL installieren und starten.**  
   Stelle sicher, dass MySQL auf deinem System installiert ist und der MySQL-Dienst läuft.

2. **.env-Datei erstellen:**  
   Erstelle im Backend-Verzeichnis eine Datei namens `.env` und füge den folgenden Inhalt ein (passe die Werte bei Bedarf an):

   ```dotenv
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=1234
   DB_NAME=bibifi
   CONNECTION_TIMEOUT=3600
   ```

### Datenbank und Tabellen erstellen

Verbinde dich mit deinem MySQL-Server (z. B. über die MySQL-Konsole oder ein GUI-Tool wie MySQL Workbench) und führe die folgenden SQL-Befehle aus:

```sql
-- Erstelle die Datenbank, falls sie noch nicht existiert:
CREATE DATABASE IF NOT EXISTS bibifi;

-- Wechsle in die Datenbank:
USE bibifi;

-- Erstelle die Tabelle für Benutzer:
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    balance DECIMAL(10,2) DEFAULT 200.00,
    password VARCHAR(255) NOT NULL
);

-- Erstelle die Tabelle für Transaktionen:
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    description VARCHAR(255),
    amount DECIMAL(10,2),
    date DATETIME,
    purpose VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Verwendung

Nach erfolgreicher Installation und dem Starten der Frontend- und Backend-Server kannst du das Projekt in deinem Browser unter `http://localhost:3000` (oder dem entsprechenden Port) aufrufen. Das Backend wird ausschließlich für die Banking-App benötigt. Es ermöglicht die Registrierung sowie das Tätigen von Überweisungen innerhalb der App.

### Interaktive Module

- **Einführung:** Lerne die Risiken unsicheren Codes kennen.
- **XSS & SQLi:** Durchlaufe die verschiedenen Module zu XSS und SQL-Injection.
- **Simulierte Banking App:** Schlüpfe in die Rolle eines Angreifers und übe das Ausnutzen von Sicherheitslücken.
- **Sicherheitsüberprüfung:** Verbessere unsicheren Code durch gezielte Auswahlmöglichkeiten.

## Features

- **Interaktive Lernmodule:** Schritt-für-Schritt-Anleitungen und Herausforderungen zu gängigen Sicherheitslücken.
- **Praktische Übungen:** Simulierte Angriffe auf eine Banking App zur Vertiefung des Wissens.
- **Code-Sicherheitsprüfungen:** Übungen zur Verbesserung von unsicherem Code.
- **Benutzerfreundliche Oberfläche:** Entwickelt mit React für eine intuitive Nutzererfahrung.

## Technologien

- **Frontend:** [React](https://reactjs.org/)
- **Backend:** [FastAPI](https://fastapi.tiangolo.com/)
- **Datenbank:** [MySQL](https://www.mysql.com/)
- **Weitere Tools:** Node.js, npm

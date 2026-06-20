# 🛡️ VOYASECURE — Secure Every Journey

> A community-driven travel safety platform that empowers Indian travelers to discover safe destinations, report scams and incidents, and connect with fellow travelers in real time.

[![Live on Azure](https://img.shields.io/badge/Deployed%20on-Azure%20App%20Service-0078D4?logo=microsoft-azure&logoColor=white)](https://voyasecure-app-dyfvb9c3dncmerg3.centralindia-01.azurewebsites.net/)
[![Python](https://img.shields.io/badge/Python-3.10-blue?logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-Backend-lightgrey?logo=flask)](https://flask.palletsprojects.com/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)](https://github.com/features/actions)

---

## 📌 What is VoyaSecure?

VoyaSecure is a full-stack web application built to make travel in India safer. Travelers can:

- **Browse tourist destinations** across India with curated safety context
- **Report scams, harassment, theft, and safety risks** pinned to exact map coordinates
- **View all community-reported incidents** on a live feed
- **Chat in location-based communities** with other travelers visiting the same destination
- **Access emergency helplines** for every Indian state at a glance

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🗺️ **Interactive Location Explorer** | Browse 50+ Indian destinations with images and safety info |
| 🚨 **Incident Reporting** | Submit geo-tagged reports with problem type, severity, description, and incident date |
| 📋 **Live Reports Feed** | View all submitted reports from the community in real time |
| 💬 **Travel Communities** | Blockchain-inspired hashed message board per destination — tamper-evident chat history |
| 📞 **Helpline Finder** | Instantly look up state-wise tourist helpline numbers across India |
| 🎥 **Cinematic Landing Page** | Hero video, smooth transitions, and responsive design |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript, Leaflet.js (interactive maps) |
| **Backend** | Python 3.10, Flask, Flask Blueprints |
| **Data Storage** | JSON flat files (reports, messages, locations) |
| **Security** | SHA-256 hash chaining for community message integrity verification |
| **Deployment** | Azure App Service via GitHub Actions CI/CD |
| **Server** | Gunicorn (WSGI) |

---

## 🏗️ Project Structure

```
VOYASECURE/
├── app.py                  # Flask app — routes for pages & reports API
├── communities_backend.py  # Communities API with hash-chain message integrity
├── requirements.txt        # Python dependencies (Flask, Gunicorn)
├── Procfile                # Process config for deployment
│
├── index.html              # Landing page with hero video + location explorer
├── report.html             # Geo-tagged incident report form (Leaflet map)
├── reported.html           # Live feed of all submitted reports
├── communities.html        # Real-time community chat per destination
├── helpline.html           # State-wise emergency helpline finder
├── aboutus.html            # About the project
│
├── assets/
│   ├── reports.json        # Persisted incident reports
│   ├── messages.json       # Community messages
│   └── locations.json      # Destination metadata
│
├── data/
│   ├── locations.js        # Location data (50+ Indian destinations)
│   ├── communities.json    # Community message chains
│   └── reports.js / report.js
│
├── css/                    # Stylesheets (style.css, report.css)
├── js/                     # JavaScript modules (india-map.js)
├── images/                 # 50+ destination photos
└── .github/workflows/      # GitHub Actions CI/CD → Azure deployment
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- pip

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SreenidhiCodes/VOYASECURE.git
cd VOYASECURE

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the development server
python app.py
```

Then open `http://localhost:5000` in your browser.

### Production (Gunicorn)

```bash
gunicorn app:app
```

---

## 🔌 API Reference

### Reports

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/reports` | Fetch all submitted incident reports |
| `POST` | `/api/report` | Submit a new incident report |

**POST `/api/report` — Request Body:**
```json
{
  "place": "Baga Beach",
  "state": "Goa",
  "country": "India",
  "coordinates": { "lat": 15.5538, "lng": 73.7516 },
  "problemType": "Scam / Fraud",
  "description": "Overcharged by taxi driver",
  "incidentDate": "2025-06-15",
  "severity": "High"
}
```

### Communities

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/messages` | Get all messages grouped by community |
| `GET` | `/api/messages/<community>` | Get messages for a specific community |
| `POST` | `/api/messages` | Post a new message to a community |
| `GET` | `/api/messages/<community>/verify` | Verify hash-chain integrity of a community's messages |

**POST `/api/messages` — Request Body:**
```json
{
  "community": "goa",
  "message": "Watch out for beach vendors near Anjuna!",
  "author": "Sreenidhi"
}
```

---

## 🔐 Security Highlight — Hash-Chained Community Messages

Community messages use a **blockchain-inspired hash chain** to ensure message integrity. Each message stores a SHA-256 hash computed from its content, timestamp, community ID, and the previous message's hash. The `/verify` endpoint detects any tampering in the message history — a feature that makes the community forum resistant to data manipulation.

---

## ☁️ Deployment

The app is deployed on **Azure App Service** using a **GitHub Actions CI/CD pipeline**:

1. On every push to `main`, the workflow triggers
2. Python 3.10 environment is set up and dependencies installed
3. The artifact is deployed to Azure App Service (`voyasecure-app`)

Pipeline config: `.github/workflows/main_voyasecure-app.yml`

---

## 📍 Destinations Covered

VoyaSecure includes 50+ locations across India including Goa, Kerala, Rajasthan, Himachal Pradesh, Uttarakhand, Tamil Nadu, Telangana, Maharashtra, and more — with photos and community chat for each.

---

## 👩‍💻 Author

**Sreenidhi** — [GitHub](https://github.com/SreenidhiCodes)


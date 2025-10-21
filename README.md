# AI Content Analytics Platform MVP

A full-stack MVP to register web content, track AI access, view analytics trends, and get Gemini-powered insights for creators. Uses **React + Vite** (frontend) and **FastAPI + SQLite + Pandas + Matplotlib + Gemini API** (backend).

---

## Features

- **Content Registry:** Add, view, or delete your tracked content URLs
- **Access Logging:** See when and how often AI systems access your content
- **Visual Analytics:** Dashboard trends powered by Pandas, Chart.js, and Matplotlib
- **Gemini AI Insights:** One-click content valuation and actionable recommendations

---

## Technologies

- **Frontend:** React, Vite, Axios, Chart.js
- **Backend:** FastAPI, SQLAlchemy, SQLite, Pandas, Matplotlib, Python-Jose, Passlib, Requests
- **AI:** Gemini API (Google Generative Language)

---

## Setup & Usage

### 1. Backend

```

cd backend
python -m venv venv
source venv/bin/activate       \# On Windows: venv\Scripts\activate
pip install -r requirements.txt

```

Set up your `.env` file:
```

SECRET_KEY=your-strong-secret
GEMINI_API_KEY=your-gemini-key

```

Run the API server:
```

uvicorn main:app --reload

```

### 2. Frontend

```

cd frontend
npm install

```

Set your backend API URL in `.env`:
```

VITE_API_URL=http://localhost:8000

```

Start the React app:
```

npm run dev

```

---

## Usage

1. Open your browser at `http://localhost:5173`
2. Register or log in as a creator
3. Add your content URLs to track
4. View dashboard analytics, trends, and actionable AI insights
5. Click "Get Insights" for Gemini-powered valuation

---

## Project Structure

### backend/
```
main.py
models.py
auth.py
database.py
analytics.py
visualization.py
gemini_service.py
routes/
- auth_routes.py
- content_routes.py
- accesslog_routes.py
- analytics_routes.py
```

### frontend/
```
package.json
vite.config.js
.env
index.html
src/
api.js
App.jsx
App.css
main.jsx
pages/
- Login.jsx
- Dashboard.jsx
components/
- ContentTable.jsx
- ChartSection.jsx
- GeminiInsights.jsx

```

---

## Requirements

- Python 3.9+
- Node.js 18+

---

## Notes

- Designed for MVP speed: real analytics, charts, and AI, simple code.
- For production, use a stronger backend secret and switch to PostgreSQL/MySQL for scale.
- Gemini API key required (get it from Google Cloud, Generative Language API).
- If you deploy: update `VITE_API_URL` and backend CORS settings.

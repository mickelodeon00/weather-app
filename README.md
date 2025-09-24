# 🌦️ Weather App

A full-stack weather application with:

- **Frontend**: React + Vite + TypeScript + Tailwind
- **Backend**: FastAPI (Python)
- **Package Managers**: `pnpm` (frontend) and `uv` (backend)
- **Testing**: Jest + React Testing Library (frontend), Pytest (backend)
- **Containerization**: Docker & Docker Compose (production and development modes)

## 📂 Project Structure

```
.
├── backend/
├── frontend/
├── docker-compose.yml
├── docker-compose.dev.yml
├── .github/
└── README.md
```

- `frontend/` → React + Vite app (uses `pnpm`)
- `backend/` → FastAPI app (uses `uv`)
- `docker-compose.yml` → Production builds (optimized)
- `docker-compose.dev.yml` → Development setup (live reload)
- `.github/` → CI/CD workflows

## ⚙️ Environment Variables

You'll need environment files for both backend and frontend. Examples are provided:

### 🔹 Frontend (`frontend/.env.example`)

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

### 🔹 Backend (`backend/.env.example`)

```bash
WEATHER_API_KEY=your_weatherapi_key_here
```

Copy these files to `.env` in their respective folders and fill in your values.

## 🚀 Running Locally

### 🔹 Backend (FastAPI)

```bash
# from backend root directory
cd backend
uv run uvicorn app.main:app --reload
```

- Runs on: `http://localhost:8000`
- Docs: `http://localhost:8000/docs`

### 🔹 Frontend (React + Vite)

```bash
# from frontend root directory
cd frontend
pnpm install
pnpm dev
```

- Runs on: `http://localhost:3000`

## 🐳 Running with Docker

1. **Build and start the containers:**

```bash
docker compose up --build
```

2. **Access services:**

   - **Backend** → `http://localhost:8000`
   - **Frontend** → `http://localhost:3000`

3. **Stop containers:**

```bash
docker compose down
```

## ✅ Testing

### Frontend (Jest + React Testing Library)

```bash
cd frontend
pnpm test
```

### Backend (pytest + respx)

```bash
cd backend
uv run pytest -v
```

## 🚀 CI/CD

- GitHub Actions workflow (`.github/workflows/tests.yml`) runs **unit tests** automatically when pushing to the `master` branch
- Covers both **frontend** and **backend** tests

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind, pnpm
- **Backend**: FastAPI, httpx, uvicorn, uv (package manager)
- **Testing**: Jest, React Testing Library, Pytest, Respx
- **CI/CD**: GitHub Actions
- **Containerization**: Docker & Docker Compose

## 📌 Notes

- Make sure you have **pnpm** and **uv** installed locally if running without Docker
- Get your **WeatherAPI.com API key** and set it in the backend `.env`
- **Access services** (both Docker modes):
  - **Backend** → `http://localhost:8000`
  - **Frontend** → `http://localhost:5173`
- **Stop containers**: `docker compose down` (or `docker compose -f docker-compose.dev.yml down`)

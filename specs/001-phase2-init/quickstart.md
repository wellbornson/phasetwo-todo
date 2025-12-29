# Quickstart Guide

## Prerequisites
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose (optional, for local DB if not using Neon)

## Setup

1. **Clone & Install**
   ```bash
   # Root
   npm install

   # Frontend
   cd frontend
   npm install

   # Backend
   cd backend
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

2. **Environment Variables**
   Create `.env` in root, `frontend/.env.local`, and `backend/.env` with:
   ```env
   DATABASE_URL="postgresql://..."
   BETTER_AUTH_SECRET="<random-string>"
   NEXT_PUBLIC_API_URL="http://localhost:8000"
   ```

3. **Run Development**
   ```bash
   # Terminal 1: Backend
   cd backend
   uvicorn main:app --reload

   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

## Testing
- **Backend Tests**: `pytest`
- **Frontend Tests**: `npm test`

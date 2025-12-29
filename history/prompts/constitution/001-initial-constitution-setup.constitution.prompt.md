---
id: 001
title: Initial Constitution Setup
stage: constitution
date: 2025-12-30
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: wellbornsonAi
command: /sp.constitution
labels: ["setup", "governance"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

/sp.constitution Project Name: phasetwo-todo
Version: 1.0
Phase: Phase II - Todo Full-Stack Web Application (Basic Level Functionality)

Objective: Transform the Phase I console app into a modern multi-user web application with persistent storage using Next.js, FastAPI, SQLModel, Neon DB, and Better Auth. Implement all 5 Basic Level features (Task CRUD: create, read, update, delete, toggle complete) as a web app with RESTful API endpoints, responsive frontend, Neon PostgreSQL storage, and user signup/signin via Better Auth with JWT for securing API.

Development Approach: Use Agentic Dev Stack workflow with Spec-Kit Plus: Write spec → Generate plan → Break into tasks → Implement via Gemini Code. No manual coding. Review process, prompts, and iterations.

Requirements:
- Implement all 5 Basic Level features.
- Create RESTful API endpoints exactly as: GET /api/{user_id}/tasks (list), POST /api/{user_id}/tasks (create), GET /api/{user_id}/tasks/{id} (get), PUT /api/{user_id}/tasks/{id} (update), DELETE /api/{user_id}/tasks/{id} (delete), PATCH /api/{user_id}/tasks/{id}/complete (toggle).
- Build responsive frontend interface.
- Store data in Neon Serverless PostgreSQL.
- Authentication: User signup/signin using Better Auth with JWT tokens for API security (enable JWT plugin, attach to headers, verify in FastAPI middleware, filter by user_id, shared BETTER_AUTH_SECRET).
- API Behavior: All endpoints require JWT, 401 without token, user isolation, stateless auth, token expiry (7 days).

Technology Stack:
- Frontend: Next.js 16+ (App Router), TypeScript, Tailwind CSS.
- Backend: Python FastAPI.
- ORM: SQLModel.
- Database: Neon Serverless PostgreSQL (use connection string: 'postgresql://neondb_owner:npg_i7mtqBkU0hLp@ep-spring-pine-adl3htij-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'; init with npx neonctl@latest init if needed using email wellbornson.home@gmail.com).
- Spec-Driven: Gemini Code + Spec-Kit Plus.
- Authentication: Better Auth.

Monorepo Structure:
hackathon-todo/
├── .spec-kit/                    # Spec-Kit configuration
│   └── config.yaml               # Contents: name: hackathon-todo, version: "1.0", structure: {specs_dir: specs, features_dir: specs/features, api_dir: specs/api, database_dir: specs/database, ui_dir: specs/ui}, phases: [{name: phase2-web, features: [task-crud, authentication]}]
├── specs/                        # Spec-Kit managed specifications
│   ├── overview.md               # Project overview (Purpose: Todo app evolving to AI chatbot; Current Phase: II; Tech Stack as above; Features: Task CRUD, Auth)
│   ├── architecture.md           # System architecture (Frontend-Backend-DB separation)
│   ├── features/                 # Feature specifications
│   │   ├── task-crud.md          # User stories and acceptance criteria as in project
│   │   └── authentication.md     # Better Auth with JWT details
│   ├── api/                      # API specifications
│   │   ├── rest-endpoints.md     # Endpoints, auth, base URL, query params as in project
│   ├── database/                 # Database specifications
│   │   └── schema.md             # Tables: users (Better Auth), tasks (id, user_id, title, description, completed, created_at, updated_at); Indexes as in project
│   └── ui/                       # UI specifications
│       ├── components.md         # Reusable UI (e.g., TaskList, TaskForm)
│       └── pages.md              # Pages: login, signup, tasks
├── GEMINI.md                     # Root Gemini Code instructions (adapt from project: Project Overview, Spec-Kit Structure, How to Use Specs, Project Structure, Development Workflow, Commands)
├── frontend/
│   ├── GEMINI.md                 # Frontend guidelines (Stack: Next.js 16+, TS, Tailwind; Patterns: Server components default; API Client: /lib/api.ts; Styling: Tailwind)
│   └── ... (Next.js app: initialize with npx create-next-app@latest --ts --tailwind --app)
├── backend/
│   ├── GEMINI.md                 # Backend guidelines (Stack: FastAPI, SQLModel, Neon; Structure: main.py, models.py, routes/, db.py; API Conventions; Database: Use env DATABASE_URL)
│   └── ... (FastAPI app: initialize with pip install fastapi sqlmodel uvicorn)
├── docker-compose.yml            # Services for frontend, backend, db
└── README.md                     # Project setup instructions

Instructions for Gemini: Create the entire monorepo structure above. Install all packages automatically (npm for frontend, pip for backend: fastapi, sqlmodel, uvicorn, pydantic, pyjwt). Create .env files in root, frontend, and backend with: BETTER_AUTH_SECRET (generate secure random), DATABASE_URL (use provided Neon string), and any API keys needed (API keys have been removed for security). Agent retrieves from Neon DB. Use monorepo for single context. Reference specs with @specs/features/task-crud.md etc.

## Response snapshot

Updated constitution to v1.0.0 with principles for Spec-Driven Development, Monorepo Architecture, Test-First Implementation, Modern Tech Stack, and API Standards.

## Outcome

- ✅ Impact: Established project governance and technical constraints.
- 🧪 Tests: N/A
- 📁 Files: Updated constitution.md
- 🔁 Next prompts: Initialize project structure
- 🧠 Reflection: Constitution established. Ready for implementation planning.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
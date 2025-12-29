# Tasks: Phase II Initialization

**Input**: Design documents from `/specs/001-phase2-init/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Test tasks included as per Constitution (Test-First).

**Organization**: Tasks are grouped by setup, foundation, and features (Task CRUD).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize monorepo structure with frontend/ and backend/ directories
- [x] T002 [P] Initialize Next.js 16+ app in frontend/ with Tailwind CSS
- [x] T003 [P] Initialize FastAPI app in backend/ with venv and requirements.txt
- [x] T004 Install dependencies: backend (fastapi, uvicorn, sqlmodel, pyjwt, psycopg2) and frontend (better-auth, axios/swr)
- [x] T005 Configure environment variables in .env, backend/.env, and frontend/.env.local (DATABASE_URL, BETTER_AUTH_SECRET)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Setup SQLModel database connection and engine in backend/src/db.py
- [x] T007 Define User (reference) and Task models in backend/src/models.py
- [x] T008 [P] Implement JWT verification middleware in backend/src/auth.py
- [x] T009 [P] Configure Better Auth in frontend/src/lib/auth.ts with JWT plugin
- [x] T010 Setup API client with automatic token attachment in frontend/src/lib/api.ts
- [x] T011 Run initial database migration (schema creation) using SQLModel

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Task CRUD (Priority: P1) 🎯 MVP

**Goal**: Complete Task Management (Create, Read, Update, Delete, Toggle)

**Independent Test**: User can log in, create a task, see it in the list, and update/delete it.

### Tests for User Story 1 (Test-First) ⚠️

- [x] T012 [P] [US1] Create integration tests for Task CRUD endpoints in backend/tests/test_tasks.py

### Implementation for User Story 1

- [x] T013 [US1] Implement Create Task endpoint (POST /api/{user_id}/tasks) in backend/src/routes/tasks.py
- [x] T014 [US1] Implement List Tasks endpoint (GET /api/{user_id}/tasks) with filtering in backend/src/routes/tasks.py
- [x] T015 [US1] Implement Get/Update/Delete Task endpoints in backend/src/routes/tasks.py
- [x] T016 [US1] Register Task router in backend/src/main.py
- [x] T017 [P] [US1] Create TaskCard and TaskForm components in frontend/src/components/
- [x] T018 [P] [US1] Create TaskList component in frontend/src/components/TaskList.tsx
- [x] T019 [US1] Implement Tasks Page (/tasks) in frontend/src/app/tasks/page.tsx using TaskList and TaskForm

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Authentication UI (Priority: P1)

**Goal**: User Interface for Signup and Login

**Independent Test**: User can register and log in via UI.

### Tests for User Story 2 (Test-First) ⚠️

- [x] T020 [P] [US2] Create basic rendering test for Login page in frontend/tests/login.test.tsx

### Implementation for User Story 2

- [x] T021 [P] [US2] Create Login Page in frontend/src/app/login/page.tsx
- [x] T022 [P] [US2] Create Signup Page in frontend/src/app/signup/page.tsx
- [x] T023 [US2] Implement auth route protection (middleware or HOC) in frontend/src/middleware.ts

**Checkpoint**: Full auth flow with UI is complete.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T024 Add docker-compose.yml for orchestration
- [x] T025 [P] Polish UI with Tailwind (responsive design)
- [x] T026 Verify all endpoints against OpenAPI spec

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup
- **User Stories (Phase 3 & 4)**: Depend on Foundational

### User Story Dependencies

- **Task CRUD (US1)**: Depends on Backend Auth Middleware (Foundational)
- **Auth UI (US2)**: Can run parallel to Task CRUD, depends on Frontend Auth Config (Foundational)

## Implementation Strategy

### MVP First (User Story 1 & 2 Combined)

1. Complete Setup & Foundation.
2. Implement Backend Task CRUD (US1 Backend).
3. Implement Auth UI (US2).
4. Implement Task UI (US1 Frontend).
5. Verify End-to-End.
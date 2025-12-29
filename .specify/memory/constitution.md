<!--
SYNC IMPACT REPORT
Version: 1.0.0 (New)
Modified Principles: All (Initial creation)
Added Sections: Principles I-V, Technology & Infrastructure, Development Workflow, Governance.
Templates Updated: N/A (Initial)
Pending Actions:
- Initialize monorepo structure (frontend/, backend/, specs/).
- Create .env files.
-->
# phasetwo-todo Constitution

## Core Principles

### I. Spec-Driven Development
All development MUST begin with a clear specification in the `specs/` directory. The Spec-Kit Plus workflow (Spec → Plan → Tasks → Implement) is mandatory. No code is written without a preceding approved plan and task list.

### II. Monorepo Architecture
The project follows a strict monorepo structure. `frontend/` (Next.js) and `backend/` (FastAPI) are distinct workspaces. The `specs/` directory is the single source of truth for requirements. Shared configuration resides in the root.

### III. Test-First Implementation
Testing is non-negotiable. Tests must be defined and approved before implementation logic. A strict Red-Green-Refactor cycle is enforced. Backend endpoints require integration tests; UI components require rendering tests.

### IV. Modern Tech Stack Mandate
Adherence to the defined stack is required:
- Frontend: Next.js 16+ (App Router), TypeScript, Tailwind CSS.
- Backend: Python FastAPI, SQLModel, Pydantic.
- Database: Neon Serverless PostgreSQL.
- Auth: Better Auth (JWT).

### V. Security & API Standards
API endpoints must follow RESTful conventions as defined in `specs/api/`. Authentication is stateless via JWT. Secrets and database credentials MUST be managed via environment variables (`.env`), never hardcoded.

## Technology & Infrastructure

- **Frontend**: Next.js 16+ (App Router), TypeScript, Tailwind CSS.
- **Backend**: Python FastAPI, SQLModel.
- **Database**: Neon Serverless PostgreSQL.
- **Authentication**: Better Auth with JWT tokens.
- **Environment**: Secrets managed via `.env` files; `BETTER_AUTH_SECRET` and `DATABASE_URL` required.

## Development Workflow

1. **Specify**: Define features in `specs/features/`.
2. **Plan**: Create an architectural plan via `/sp.plan`.
3. **Task**: Break down plan into testable tasks via `/sp.tasks`.
4. **Implement**: Execute tasks using AI agents, following the test-first principle.
5. **Verify**: Run full test suites before completion.

## Governance

This Constitution supersedes all other process documents.
- **Amendments**: Must be documented with a rationale and require a version bump.
- **Compliance**: All Pull Requests and Code Reviews must verify compliance with these principles.
- **Guidance**: Refer to `GEMINI.md` for specific agent instructions and command usage.

**Version**: 1.0.0 | **Ratified**: 2025-12-30 | **Last Amended**: 2025-12-30
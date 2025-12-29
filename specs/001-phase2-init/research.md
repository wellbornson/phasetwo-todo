# Research & Decisions

## Technology Stack Decisions

### Backend Framework
- **Decision**: FastAPI (Python)
- **Rationale**: High performance, easy async support, auto-generated OpenAPI docs, and strong typing with Pydantic. Fits the Python requirement for future AI features.
- **Alternatives**: Flask (less async native), Django (too heavy for this phase).

### Frontend Framework
- **Decision**: Next.js 16+ (App Router)
- **Rationale**: Modern React standard, built-in routing, server components for performance, excellent TypeScript support.
- **Alternatives**: Vite + React (simpler but lacks server-side features needed later).

### Database & ORM
- **Decision**: Neon Serverless PostgreSQL + SQLModel
- **Rationale**: Neon offers serverless scaling and branching (perfect for this workflow). SQLModel combines Pydantic and SQLAlchemy for a modern, type-safe ORM experience.

### Authentication
- **Decision**: Better Auth
- **Rationale**: Framework-agnostic, secure by default, supports JWT which is required for our stateless API architecture.
- **Alternatives**: NextAuth (Auth.js) - Good, but Better Auth offers more flexibility for separate backend.

### Project Structure
- **Decision**: Monorepo
- **Rationale**: Keeps frontend, backend, and specs in sync. Easier to manage end-to-end features.
- **Structure**: `frontend/`, `backend/`, `specs/`.

## Architecture Decisions

### JWT Flow
- **Decision**: Stateless JWT attached to Authorization header.
- **Rationale**: Decouples frontend and backend. Backend doesn't need session state (scalability).
- **Security**: Token must be verified on every request. HTTPS required (Neon default).

### User Isolation
- **Decision**: Filter by `user_id` at the database query level.
- **Rationale**: Critical for multi-tenancy security.

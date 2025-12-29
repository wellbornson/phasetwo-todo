# System Architecture

## Layers

### 1. Frontend Layer (Client)
- **Framework**: Next.js 16+ (App Router).
- **Responsibility**: UI rendering, client-side state management, user interaction.
- **Communication**: HTTP/REST calls to the Backend API.
- **Security**: Stores JWT token (e.g., in memory or secure HTTP-only cookie, though instructions mention "attach to headers", implying client-side handling).

### 2. Backend Layer (API)
- **Framework**: FastAPI (Python).
- **Responsibility**: Business logic, request validation, authentication verification, data orchestration.
- **Communication**: Receives REST requests, queries Database via ORM.
- **Security**: Stateless JWT verification for every protected endpoint.

### 3. Database Layer (Persistence)
- **System**: Neon Serverless PostgreSQL.
- **Responsibility**: Persistent storage of Users and Tasks.
- **ORM**: SQLModel (Python) for schema definition and query abstraction.

## Authentication Flow (JWT)

1. **Signup/Signin**:
   - User submits credentials (email/password) via Frontend to Better Auth endpoints.
   - Upon success, Better Auth returns a session/token.
   - **Requirement**: We specifically need JWT tokens for API security.

2. **Authenticated Requests**:
   - Client includes `Authorization: Bearer <token>` header in requests to `http://localhost:8000`.
   - Backend Middleware intercepts request.
   - Middleware verifies JWT signature and expiration.
   - If valid, extracts `user_id` and injects it into the request context.
   - If invalid, returns `401 Unauthorized`.

3. **User Isolation**:
   - All database queries for Tasks MUST be filtered by the authenticated `user_id`.
   - Users cannot access tasks belonging to other users.

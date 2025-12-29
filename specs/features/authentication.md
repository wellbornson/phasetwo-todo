# Feature: Authentication

## Overview
Secure access to the application using Better Auth conventions, ensuring strictly isolated user data access via JWT tokens.

## Functional Requirements

### 1. Signup
- Users can register with Email and Password.
- On success: Create User record, return authentication token (JWT).

### 2. Signin
- Users can log in with registered Email and Password.
- On success: Return authentication token (JWT).
- On failure: Return appropriate error message.

### 3. Token Management
- **Format**: JSON Web Token (JWT).
- **Transmission**: Included in the `Authorization` HTTP header as `Bearer <token>`.
- **Expiry**: Tokens expire after 7 days.

### 4. Verification & Security
- **Middleware**: Backend MUST verify the token on every request to protected endpoints.
- **Rejection**: Requests with missing, expired, or invalid tokens MUST return `401 Unauthorized`.
- **Isolation**: The `user_id` derived from the valid token is the **only** identifier used to query or modify user-specific data (Tasks).

## Success Criteria

### Measurable Outcomes
- **SC-001**: User signup process completes in under 1 minute.
- **SC-002**: 100% of requests to protected endpoints without a valid token are rejected (401 Unauthorized).
- **SC-003**: Authentication tokens remain valid for the specified duration (7 days) unless revoked.

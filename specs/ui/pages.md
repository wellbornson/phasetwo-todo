# UI Pages

## 1. Login Page (`/login`)
- **Route**: `/login`
- **Content**: Signin form (Email/Password).
- **Action**: On success, redirects to `/tasks`.

## 2. Signup Page (`/signup`)
- **Route**: `/signup`
- **Content**: Signup form (Name, Email, Password).
- **Action**: On success, auto-logs in and redirects to `/tasks`.

## 3. Tasks Dashboard (`/tasks`)
- **Route**: `/tasks`
- **Guard**: Protected (redirects to `/login` if unauthenticated).
- **Content**:
  - Header: App Title, User Profile/Logout.
  - Controls: "Create Task" button, Status Filter (All/Active/Completed).
  - Main View: `TaskList` component.
  - Modals/Drawers: `TaskForm` for creating or editing tasks.

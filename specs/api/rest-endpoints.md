# REST API Endpoints

**Base URL**: `http://localhost:8000` (Development)
**Authentication**: All endpoints require `Authorization: Bearer <token>` header.

## Endpoints

### 1. List Tasks
- **Method**: `GET`
- **Path**: `/api/{user_id}/tasks`
- **Description**: Retrieve a list of tasks for the authenticated user.
- **Query Params**:
  - `status` (optional): Filter by 'completed' or 'pending'.
  - `sort` (optional): 'asc' or 'desc' by creation date.
- **Response**: Array of Task objects.

### 2. Create Task
- **Method**: `POST`
- **Path**: `/api/{user_id}/tasks`
- **Description**: Create a new task.
- **Body**: `{ "title": "string", "description": "string" }`
- **Response**: Created Task object (201 Created).

### 3. Get Task
- **Method**: `GET`
- **Path**: `/api/{user_id}/tasks/{id}`
- **Description**: Retrieve details of a specific task.
- **Response**: Task object or 404 Not Found.

### 4. Update Task
- **Method**: `PUT`
- **Path**: `/api/{user_id}/tasks/{id}`
- **Description**: Full update of task details.
- **Body**: `{ "title": "string", "description": "string" }`
- **Response**: Updated Task object.

### 5. Delete Task
- **Method**: `DELETE`
- **Path**: `/api/{user_id}/tasks/{id}`
- **Description**: Permanently remove a task.
- **Response**: 204 No Content.

### 6. Toggle Complete
- **Method**: `PATCH`
- **Path**: `/api/{user_id}/tasks/{id}/complete`
- **Description**: Toggle the completion status of a task.
- **Body**: (Optional) `{ "completed": boolean }`
- **Response**: Updated Task object.

# Database Schema

**Database**: Neon Serverless PostgreSQL
**ORM**: SQLModel

## Tables

### 1. Users
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | String/UUID | PK | Unique User ID (from Better Auth) |
| `email` | String | Unique, Not Null | User email |
| `name` | String | Nullable | User display name |
| `created_at` | DateTime | Default Now | |

### 2. Tasks
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | Integer/Serial | PK | Unique Task ID |
| `user_id` | String/UUID | FK -> Users.id | Owner of the task |
| `title` | String | Not Null | Task title |
| `description` | Text | Nullable | Task details |
| `completed` | Boolean | Default False | Completion status |
| `created_at` | DateTime | Default Now | |
| `updated_at` | DateTime | Default Now | |

## Indexes
- **Index on `tasks.user_id`**: To optimize retrieval of tasks for a specific user.

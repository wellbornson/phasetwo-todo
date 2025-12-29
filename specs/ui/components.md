# UI Components

## Reusable Components

### 1. TaskCard
- **Props**: `task` (Task object), `onToggle`, `onDelete`, `onEdit`.
- **Behavior**: Displays title, description (truncated if long), status checkbox. Actions for edit/delete.

### 2. TaskForm
- **Props**: `initialData` (optional, for edit mode), `onSubmit`, `onCancel`.
- **Behavior**: Form with Title (input) and Description (textarea). Validates title is present.

### 3. TaskList
- **Props**: `tasks` (Array of Task objects).
- **Behavior**: Renders a list of `TaskCard` components. Handles empty states (e.g., "No tasks found").

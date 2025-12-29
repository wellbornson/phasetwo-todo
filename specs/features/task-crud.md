# Feature: Task CRUD

## User Stories

### 1. Create Task
**As a** logged-in user,
**I want to** create a new task with a title and optional description,
**So that** I can track what I need to do.

### 2. View Task List
**As a** logged-in user,
**I want to** see a list of my tasks,
**So that** I can review my workload.

### 3. View Single Task
**As a** logged-in user,
**I want to** view the details of a specific task,
**So that** I can see the full description or status.

### 4. Update Task
**As a** logged-in user,
**I want to** edit the title or description of a task,
**So that** I can correct mistakes or update information.

### 5. Delete Task
**As a** logged-in user,
**I want to** remove a task,
**So that** I can declutter my list when a task is no longer relevant.

### 6. Toggle Completion
**As a** logged-in user,
**I want to** mark a task as complete or incomplete,
**So that** I can track my progress.

## Acceptance Criteria

### General
- All actions require a valid User session (JWT).
- Operations are strictly scoped to the authenticated user.

### Validation
- **Title**: Required, non-empty.
- **Description**: Optional.
- **Status**: Defaults to 'pending' (completed = false).

### Filtering
- The View Task List feature should support filtering by completion status (e.g., "Show All", "Active", "Completed").

## Success Criteria

### Measurable Outcomes
- **SC-001**: Users can successfully create a task in under 5 seconds.
- **SC-002**: Task list loads in under 1 second for lists with fewer than 100 items.
- **SC-003**: 100% of tasks created by a user are only visible to that user.

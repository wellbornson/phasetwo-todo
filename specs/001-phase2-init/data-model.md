# Data Model

## Entities

### User (Better Auth Managed)
> Note: Better Auth manages the core user table, but we define the schema reference for Foreign Keys.

- **id**: String (PK)
- **email**: String (Unique)
- **name**: String (Optional)
- **created_at**: DateTime

### Task

- **id**: Integer (PK, Auto-increment)
- **user_id**: String (FK -> User.id, Indexed)
- **title**: String (Not Null)
- **description**: String (Optional, Text)
- **completed**: Boolean (Default: False)
- **created_at**: DateTime (Default: Now)
- **updated_at**: DateTime (Default: Now, OnUpdate: Now)

## SQLModel Definitions (Draft)

```python
from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime

class TaskBase(SQLModel):
    title: str
    description: Optional[str] = None
    completed: bool = False

class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TaskCreate(TaskBase):
    pass

class TaskRead(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
```

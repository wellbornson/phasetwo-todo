from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import List, Optional

from src.db import get_session
from src.models import Task, TaskCreate, TaskRead, TaskUpdate
from src.auth import get_current_user_id

router = APIRouter(prefix="/api")

def validate_user(user_id: str, current_user: str):
    if user_id != current_user:
        raise HTTPException(status_code=403, detail="Not authorized to access these tasks")

@router.post("/{user_id}/tasks", response_model=TaskRead, status_code=201)
def create_task(
    user_id: str,
    task: TaskCreate,
    session: Session = Depends(get_session),
    current_user: str = Depends(get_current_user_id)
):
    validate_user(user_id, current_user)
    db_task = Task(**task.model_dump(), user_id=user_id)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.get("/{user_id}/tasks", response_model=List[TaskRead])
def list_tasks(
    user_id: str,
    status: Optional[str] = Query(None, enum=["pending", "completed"]),
    sort: Optional[str] = Query(None, enum=["asc", "desc"]),
    session: Session = Depends(get_session),
    current_user: str = Depends(get_current_user_id)
):
    validate_user(user_id, current_user)
    query = select(Task).where(Task.user_id == user_id)
    
    if status == "pending":
        query = query.where(Task.completed == False)
    elif status == "completed":
        query = query.where(Task.completed == True)
        
    if sort == "asc":
        query = query.order_by(Task.created_at.asc())
    elif sort == "desc":
        query = query.order_by(Task.created_at.desc())
    else:
        # Default sort desc
        query = query.order_by(Task.created_at.desc())
        
    tasks = session.exec(query).all()
    return tasks

@router.get("/{user_id}/tasks/{task_id}", response_model=TaskRead)
def get_task(
    user_id: str,
    task_id: int,
    session: Session = Depends(get_session),
    current_user: str = Depends(get_current_user_id)
):
    validate_user(user_id, current_user)
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{user_id}/tasks/{task_id}", response_model=TaskRead)
def update_task(
    user_id: str,
    task_id: int,
    task_update: TaskUpdate,
    session: Session = Depends(get_session),
    current_user: str = Depends(get_current_user_id)
):
    validate_user(user_id, current_user)
    db_task = session.get(Task, task_id)
    if not db_task or db_task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task_data = task_update.model_dump(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)
        
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.delete("/{user_id}/tasks/{task_id}", status_code=204)
def delete_task(
    user_id: str,
    task_id: int,
    session: Session = Depends(get_session),
    current_user: str = Depends(get_current_user_id)
):
    validate_user(user_id, current_user)
    db_task = session.get(Task, task_id)
    if not db_task or db_task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    
    session.delete(db_task)
    session.commit()

@router.patch("/{user_id}/tasks/{task_id}/complete", response_model=TaskRead)
def toggle_complete(
    user_id: str,
    task_id: int,
    completed_data: dict, # Expect {"completed": bool}
    session: Session = Depends(get_session),
    current_user: str = Depends(get_current_user_id)
):
    validate_user(user_id, current_user)
    db_task = session.get(Task, task_id)
    if not db_task or db_task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    
    completed = completed_data.get("completed")
    if completed is not None:
        db_task.completed = completed
        
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

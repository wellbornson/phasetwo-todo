from fastapi.testclient import TestClient
from src.models import Task

def test_create_task(client: TestClient):
    response = client.post(
        "/api/test-user-id/tasks",
        json={"title": "Test Task", "description": "Test Description"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["user_id"] == "test-user-id"
    assert data["id"] is not None

def test_list_tasks(client: TestClient):
    # Create a task first
    client.post(
        "/api/test-user-id/tasks",
        json={"title": "Task 1"}
    )
    client.post(
        "/api/test-user-id/tasks",
        json={"title": "Task 2"}
    )

    response = client.get("/api/test-user-id/tasks")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2

def test_get_task(client: TestClient):
    create_res = client.post(
        "/api/test-user-id/tasks",
        json={"title": "Task to Get"}
    )
    task_id = create_res.json()["id"]

    response = client.get(f"/api/test-user-id/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["title"] == "Task to Get"

def test_update_task(client: TestClient):
    create_res = client.post(
        "/api/test-user-id/tasks",
        json={"title": "Old Title"}
    )
    task_id = create_res.json()["id"]

    response = client.put(
        f"/api/test-user-id/tasks/{task_id}",
        json={"title": "New Title", "completed": True}
    )
    assert response.status_code == 200
    assert response.json()["title"] == "New Title"
    assert response.json()["completed"] is True

def test_delete_task(client: TestClient):
    create_res = client.post(
        "/api/test-user-id/tasks",
        json={"title": "Task to Delete"}
    )
    task_id = create_res.json()["id"]

    response = client.delete(f"/api/test-user-id/tasks/{task_id}")
    assert response.status_code == 204

    get_res = client.get(f"/api/test-user-id/tasks/{task_id}")
    assert get_res.status_code == 404

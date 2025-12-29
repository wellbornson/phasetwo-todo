from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import tasks, auth
from src.db import engine
from src.models import SQLModel

app = FastAPI(title="Todo App API")

# Create tables on startup
@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

# Configure CORS for Next.js
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

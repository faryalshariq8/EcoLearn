from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from database import engine, Base
import models 
from routers import users, courses, lessons, quizzes, enrollments, auth

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # you can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(courses.router)
app.include_router(lessons.router)
app.include_router(quizzes.router)
app.include_router(enrollments.router)
app.include_router(auth.router)

@app.get("/")
def home():
    return {"message": "EcoLearn Backend Running!"}

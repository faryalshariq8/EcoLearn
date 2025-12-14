from pydantic import BaseModel
from typing import Optional

# USERS
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        from_attributes = True

#COURSES
class CourseCreate(BaseModel):
    title: str
    description: Optional[str] = None
    teacher_id: int

class CourseResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] 
    teacher_id: int

    class Config:
        from_attributes = True

#LESSONS
class LessonCreate(BaseModel):
    title: str
    content: Optional[str] = None
    course_id: int


class LessonResponse(BaseModel):
    id: int
    title: str
    content: Optional[str]
    course_id: int

    class Config:
        from_attributes = True

#QUIZ
class QuizCreate(BaseModel):
    question: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str
    course_id: int


class QuizResponse(BaseModel):
    id: int
    question: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str
    course_id: int

    class Config:
        from_attributes = True

#ENROLLMENT
class EnrollmentCreate(BaseModel):
    user_id: int
    course_id: int


class EnrollmentResponse(BaseModel):
    id: int
    user_id: int
    course_id: int

    class Config:
        from_attributes = True

#LOGINAPI + JWT TOKENS
class LoginRequest(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

#submitting quiz
class QuizSubmission(BaseModel):
    course_id: int
    answers: dict 

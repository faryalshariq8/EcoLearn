from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from deps import get_db

router = APIRouter(
    prefix="/lessons",
    tags=["Lessons"]
)

# Create Lesson
@router.post("/", response_model=schemas.LessonResponse)
def create_lesson(lesson: schemas.LessonCreate, db: Session = Depends(get_db)):

    # Check if course exists
    course = db.query(models.Course).filter(models.Course.id == lesson.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    new_lesson = models.Lesson(
        title=lesson.title,
        content=lesson.content,
        course_id=lesson.course_id
    )

    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)

    return new_lesson


# Get Lessons by Course
@router.get("/course/{course_id}", response_model=list[schemas.LessonResponse])
def get_lessons_by_course(course_id: int, db: Session = Depends(get_db)):

    lessons = db.query(models.Lesson).filter(models.Lesson.course_id == course_id).all()
    return lessons

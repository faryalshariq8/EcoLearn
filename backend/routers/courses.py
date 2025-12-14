from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from deps import get_db
import models, schemas

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)

# Create a Course
@router.post("/", response_model=schemas.CourseResponse)
def create_course(course: schemas.CourseCreate, db: Session = Depends(get_db)):

    # Check if teacher exists
    teacher = db.query(models.User).filter(models.User.id == course.teacher_id).first()
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")

    new_course = models.Course(
        title=course.title,
        description=course.description,
        teacher_id=course.teacher_id
    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course


# Get All Courses
@router.get("/", response_model=list[schemas.CourseResponse])
def get_all_courses(db: Session = Depends(get_db)):
    return db.query(models.Course).all()


# Get Course By ID
@router.get("/{course_id}", response_model=schemas.CourseResponse)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

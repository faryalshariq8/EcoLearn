from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from deps import get_db

router = APIRouter(
    prefix="/enrollments",
    tags=["Enrollments"]
)

# Enroll student in a course
@router.post("/", response_model=schemas.EnrollmentResponse)
def enroll_student(enrollment: schemas.EnrollmentCreate, db: Session = Depends(get_db)):

    # Check user exists
    user = db.query(models.User).filter(models.User.id == enrollment.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check course exists
    course = db.query(models.Course).filter(models.Course.id == enrollment.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Prevent duplicate enrollment
    existing = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == enrollment.user_id,
        models.Enrollment.course_id == enrollment.course_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already enrolled")

    new_enrollment = models.Enrollment(
        user_id=enrollment.user_id,
        course_id=enrollment.course_id
    )

    db.add(new_enrollment)
    db.commit()
    db.refresh(new_enrollment)

    return new_enrollment


# Get all courses of a student
@router.get("/student/{user_id}", response_model=list[schemas.EnrollmentResponse])
def get_student_courses(user_id: int, db: Session = Depends(get_db)):

    enrollments = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == user_id
    ).all()

    return enrollments


# Get all students of a course
@router.get("/course/{course_id}", response_model=list[schemas.EnrollmentResponse])
def get_course_students(course_id: int, db: Session = Depends(get_db)):

    enrollments = db.query(models.Enrollment).filter(
        models.Enrollment.course_id == course_id
    ).all()

    return enrollments

@router.get("/progress/{user_id}")
def get_progress(user_id: int, db: Session = Depends(get_db)):
    enrolls = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == user_id
    ).all()

    progress = []

    for e in enrolls:
        lessons = db.query(models.Lesson).filter(models.Lesson.course_id == e.course_id).count()
        quizzes = db.query(models.Quiz).filter(models.Quiz.course_id == e.course_id).count()

        progress.append({
            "course_id": e.course_id,
            "lessons": lessons,
            "quizzes": quizzes
        })

    return progress

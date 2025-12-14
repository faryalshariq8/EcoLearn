from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from deps import get_db

router = APIRouter(
    prefix="/quizzes",
    tags=["Quizzes"]
)

# Create Quiz
@router.post("/", response_model=schemas.QuizResponse)
def create_quiz(quiz: schemas.QuizCreate, db: Session = Depends(get_db)):

    # Check course exists
    course = db.query(models.Course).filter(models.Course.id == quiz.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    new_quiz = models.Quiz(
        question=quiz.question,
        option_a=quiz.option_a,
        option_b=quiz.option_b,
        option_c=quiz.option_c,
        option_d=quiz.option_d,
        correct_answer=quiz.correct_answer,
        course_id=quiz.course_id
    )

    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz)

    return new_quiz


# Get Quizzes by Course
@router.get("/course/{course_id}", response_model=list[schemas.QuizResponse])
def get_quizzes_by_course(course_id: int, db: Session = Depends(get_db)):

    quizzes = db.query(models.Quiz).filter(models.Quiz.course_id == course_id).all()
    return quizzes

@router.post("/submit", tags=["Quizzes"])
def submit_quiz(data: schemas.QuizSubmission, db: Session = Depends(get_db)):
    quizzes = db.query(models.Quiz).filter(models.Quiz.course_id == data.course_id).all()

    correct = 0
    total = len(quizzes)

    for q in quizzes:
        if data.answers.get(str(q.id)) == q.correct_answer:
            correct += 1

    return {"score": correct, "total": total}

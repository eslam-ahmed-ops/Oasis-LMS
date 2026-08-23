from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class QuestionOptionBase(BaseModel):
    option_text: str
    is_correct: bool
    option_order: int

class QuestionBase(BaseModel):
    question_text: str
    question_type: str
    difficulty: str
    points: int

class QuestionCreate(QuestionBase):
    course_id: int
    options: List[QuestionOptionBase]

class QuestionResponse(QuestionBase):
    id: int
    course_id: int
    created_by: str
    options: List[Dict[str, Any]]
    created_at: datetime

class QuizBase(BaseModel):
    title: str
    time_limit_minutes: int

class QuizCreate(QuizBase):
    course_id: int
    question_ids: List[int]

class QuizResponse(QuizBase):
    id: int
    course_id: int
    total_points: int
    is_published: bool
    questions: List[Dict[str, Any]]
    created_at: datetime

class QuizAttemptCreate(BaseModel):
    quiz_id: int
    answers: Dict[str, Any]

class QuizAttemptResponse(BaseModel):
    id: int
    quiz_id: int
    user_id: str
    score: int
    total_points: int
    started_at: datetime
    completed_at: datetime

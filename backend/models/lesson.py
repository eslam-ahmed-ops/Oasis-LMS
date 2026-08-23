from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LessonBase(BaseModel):
    title: str
    description: str
    lesson_order: int
    duration_minutes: float

class LessonCreate(LessonBase):
    course_id: int

class LessonResponse(LessonBase):
    id: int
    course_id: int
    video_url: Optional[str] = None
    pdf_url: Optional[str] = None
    created_at: datetime

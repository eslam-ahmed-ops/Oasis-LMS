from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CourseBase(BaseModel):
    title: str
    description: str
    category_id: int
    instructor: str
    duration_hours: float
    total_lessons: int
    cover_gradient: str

class CourseCreate(CourseBase):
    instructor_id: str

class CourseResponse(CourseBase):
    id: int
    created_at: datetime

class EnrollmentResponse(BaseModel):
    id: int
    user_id: str
    course_id: int
    progress_percent: float
    current_unit: int
    current_lesson: int
    enrolled_at: datetime
    course: CourseResponse

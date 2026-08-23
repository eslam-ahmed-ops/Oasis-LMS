from pydantic import BaseModel
from datetime import datetime

class DeadlineBase(BaseModel):
    title: str
    due_date: datetime

class DeadlineCreate(DeadlineBase):
    course_id: int

class DeadlineResponse(DeadlineBase):
    id: int
    user_id: str
    course_id: int
    is_completed: bool
    created_at: datetime

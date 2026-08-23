from pydantic import BaseModel
from datetime import datetime

class DashboardStats(BaseModel):
    learning_hours: float
    completed_courses: int
    progress_points: int
    weekly_sessions: int
    points_change_percent: float

class WeeklyTask(BaseModel):
    id: int
    title: str
    is_completed: bool
    week_start: datetime

from fastapi import APIRouter, Depends
from database import supabase
from middleware.auth import get_current_user, CurrentUser
from models.stats import DashboardStats

router = APIRouter(tags=["stats"])

@router.get("/stats/{user_id}", response_model=DashboardStats)
async def get_stats(user_id: str, user: CurrentUser = Depends(get_current_user)):
    return DashboardStats(
        learning_hours=10.0,
        completed_courses=2,
        progress_points=300,
        weekly_sessions=5,
        points_change_percent=12.5
    )

@router.get("/weekly-tasks/{user_id}")
async def get_weekly_tasks(user_id: str, user: CurrentUser = Depends(get_current_user)):
    return supabase.table("weekly_tasks").select("*").eq("user_id", user_id).execute().data

@router.patch("/weekly-tasks/{id}")
async def toggle_task_completion(id: int, is_completed: bool, user: CurrentUser = Depends(get_current_user)):
    return supabase.table("weekly_tasks").update({"is_completed": is_completed}).eq("id", id).execute().data[0]

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from database import supabase
from middleware.auth import get_current_user, CurrentUser

router = APIRouter(tags=["progress"])

class EnrollRequest(BaseModel):
    course_id: int

class ProgressUpdate(BaseModel):
    progress_percent: float

class VideoProgress(BaseModel):
    lesson_id: int
    position_seconds: int

@router.get("/enrollments/{user_id}")
async def get_enrollments(user_id: str, user: CurrentUser = Depends(get_current_user)):
    return supabase.table("enrollments").select("*, course:courses(*)").eq("user_id", user_id).execute().data

@router.post("/enrollments")
async def enroll(req: EnrollRequest, user: CurrentUser = Depends(get_current_user)):
    return supabase.table("enrollments").insert({
        "user_id": user.id, "course_id": req.course_id, 
        "progress_percent": 0.0, "current_unit": 1, "current_lesson": 1
    }).execute().data[0]

@router.patch("/enrollments/{id}/progress")
async def update_progress(id: int, req: ProgressUpdate, user: CurrentUser = Depends(get_current_user)):
    return supabase.table("enrollments").update({"progress_percent": req.progress_percent}).eq("id", id).execute().data[0]

@router.patch("/video-progress")
async def save_video_progress(req: VideoProgress, user: CurrentUser = Depends(get_current_user)):
    supabase.table("video_progress").upsert({"user_id": user.id, "lesson_id": req.lesson_id, "position_seconds": req.position_seconds}).execute()
    return {"success": True}

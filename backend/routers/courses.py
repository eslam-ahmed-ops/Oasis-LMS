from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from database import supabase
from models.course import CourseCreate
from models.lesson import LessonCreate
from middleware.auth import get_current_user, require_role, CurrentUser

router = APIRouter(prefix="/courses", tags=["courses"])

@router.get("/")
async def list_courses(category_id: Optional[int] = Query(None)):
    query = supabase.table("courses").select("*")
    if category_id:
        query = query.eq("category_id", category_id)
    return query.execute().data

@router.get("/{id}")
async def get_course(id: int):
    res = supabase.table("courses").select("*, lessons(*)").eq("id", id).single().execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Course not found")
    return res.data

@router.post("/")
async def create_course(req: CourseCreate, user: CurrentUser = Depends(require_role("teacher"))):
    return supabase.table("courses").insert(req.dict()).execute().data[0]

@router.put("/{id}")
async def update_course(id: int, req: dict, user: CurrentUser = Depends(require_role("teacher"))):
    res = supabase.table("courses").update(req).eq("id", id).execute()
    return res.data[0] if res.data else None

@router.delete("/{id}")
async def delete_course(id: int, user: CurrentUser = Depends(require_role("teacher"))):
    supabase.table("courses").delete().eq("id", id).execute()
    return {"success": True}

@router.get("/{id}/lessons")
async def list_lessons(id: int):
    return supabase.table("lessons").select("*").eq("course_id", id).execute().data

@router.post("/{id}/lessons")
async def add_lesson(id: int, req: LessonCreate, user: CurrentUser = Depends(require_role("teacher"))):
    req.course_id = id
    return supabase.table("lessons").insert(req.dict()).execute().data[0]

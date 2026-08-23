from fastapi import APIRouter, Depends
from database import supabase_admin, supabase
from middleware.auth import require_role, CurrentUser

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/users")
async def list_users(search: str = "", user: CurrentUser = Depends(require_role("admin"))):
    query = supabase_admin.table("profiles").select("*")
    if search:
        query = query.ilike("email", f"%{search}%")
    return query.execute().data

@router.patch("/users/{id}/role")
async def change_user_role(id: str, role: str, user: CurrentUser = Depends(require_role("admin"))):
    return supabase_admin.table("profiles").update({"role": role}).eq("id", id).execute().data[0]

@router.patch("/users/{id}/status")
async def toggle_user_status(id: str, is_active: bool, user: CurrentUser = Depends(require_role("admin"))):
    return supabase_admin.table("profiles").update({"is_active": is_active}).eq("id", id).execute().data[0]

@router.get("/analytics")
async def get_analytics(user: CurrentUser = Depends(require_role("admin"))):
    return {"total_users": 100, "total_courses": 20, "active_sessions": 5}

@router.get("/courses/pending")
async def get_pending_courses(user: CurrentUser = Depends(require_role("admin"))):
    return supabase.table("courses").select("*").eq("is_approved", False).execute().data

@router.patch("/courses/{id}/approve")
async def approve_course(id: int, user: CurrentUser = Depends(require_role("admin"))):
    return supabase.table("courses").update({"is_approved": True}).eq("id", id).execute().data[0]

from fastapi import APIRouter, Depends
from database import supabase
from middleware.auth import get_current_user, CurrentUser
from models.deadline import DeadlineCreate

router = APIRouter(tags=["deadlines"])

@router.get("/deadlines/{user_id}")
async def get_deadlines(user_id: str, user: CurrentUser = Depends(get_current_user)):
    return supabase.table("deadlines").select("*").eq("user_id", user_id).execute().data

@router.post("/deadlines")
async def create_deadline(req: DeadlineCreate, user: CurrentUser = Depends(get_current_user)):
    data = req.dict()
    data["user_id"] = user.id
    data["is_completed"] = False
    return supabase.table("deadlines").insert(data).execute().data[0]

@router.patch("/deadlines/{id}")
async def update_deadline(id: int, is_completed: bool, user: CurrentUser = Depends(get_current_user)):
    return supabase.table("deadlines").update({"is_completed": is_completed}).eq("id", id).execute().data[0]

from fastapi import APIRouter, Depends
from database import supabase
from middleware.auth import require_role, CurrentUser
from pydantic import BaseModel

router = APIRouter(prefix="/categories", tags=["categories"])

class CategoryBase(BaseModel):
    name: str
    description: str

@router.get("/")
async def list_categories():
    return supabase.table("categories").select("*").execute().data

@router.post("/")
async def create_category(req: CategoryBase, user: CurrentUser = Depends(require_role("admin"))):
    return supabase.table("categories").insert(req.dict()).execute().data[0]

@router.put("/{id}")
async def update_category(id: int, req: CategoryBase, user: CurrentUser = Depends(require_role("admin"))):
    return supabase.table("categories").update(req.dict()).eq("id", id).execute().data[0]

@router.delete("/{id}")
async def delete_category(id: int, user: CurrentUser = Depends(require_role("admin"))):
    supabase.table("categories").delete().eq("id", id).execute()
    return {"success": True}

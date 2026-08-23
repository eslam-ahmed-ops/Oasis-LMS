from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from database import supabase, supabase_admin
from models.user import LoginRequest, UserCreate, TokenResponse
from middleware.auth import get_current_user, CurrentUser

router = APIRouter(prefix="/auth", tags=["auth"])

class RefreshRequest(BaseModel):
    refresh_token: str

@router.post("/login", response_model=TokenResponse)
async def login(req: LoginRequest):
    res = supabase.auth.sign_in_with_password({"email": req.email, "password": req.password})
    if not res.session:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return TokenResponse(access_token=res.session.access_token, refresh_token=res.session.refresh_token)

@router.post("/signup", response_model=TokenResponse)
async def signup(req: UserCreate):
    res = supabase.auth.sign_up({"email": req.email, "password": req.password})
    if not res.user:
        raise HTTPException(status_code=400, detail="Signup failed")
    
    supabase_admin.table("profiles").insert({
        "id": res.user.id,
        "full_name": req.full_name,
        "email": req.email,
        "role": req.role
    }).execute()

    if not res.session:
        raise HTTPException(status_code=400, detail="Session not available")

    return TokenResponse(access_token=res.session.access_token, refresh_token=res.session.refresh_token)

@router.post("/refresh", response_model=TokenResponse)
async def refresh(req: RefreshRequest):
    res = supabase.auth.refresh_session(req.refresh_token)
    if not res.session:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    return TokenResponse(access_token=res.session.access_token, refresh_token=res.session.refresh_token)

@router.get("/me")
async def get_me(user: CurrentUser = Depends(get_current_user)):
    res = supabase.table("profiles").select("*").eq("id", user.id).single().execute()
    return res.data

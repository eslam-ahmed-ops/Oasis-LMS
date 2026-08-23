from fastapi import APIRouter, Depends, Query, HTTPException
from typing import Optional
from database import supabase
from middleware.auth import require_role, get_current_user, CurrentUser
from models.question import QuestionCreate, QuizCreate, QuizAttemptCreate

router = APIRouter(tags=["questions"])

@router.get("/questions")
async def list_questions(course_id: Optional[int] = Query(None)):
    query = supabase.table("questions").select("*")
    if course_id:
        query = query.eq("course_id", course_id)
    return query.execute().data

@router.post("/questions")
async def create_question(req: QuestionCreate, user: CurrentUser = Depends(require_role("teacher"))):
    data = req.dict()
    data["created_by"] = user.id
    return supabase.table("questions").insert(data).execute().data[0]

@router.put("/questions/{id}")
async def update_question(id: int, req: dict, user: CurrentUser = Depends(require_role("teacher"))):
    return supabase.table("questions").update(req).eq("id", id).execute().data[0]

@router.delete("/questions/{id}")
async def delete_question(id: int, user: CurrentUser = Depends(require_role("teacher"))):
    supabase.table("questions").delete().eq("id", id).execute()
    return {"success": True}

@router.get("/quizzes")
async def list_quizzes(course_id: Optional[int] = Query(None)):
    query = supabase.table("quizzes").select("*")
    if course_id:
        query = query.eq("course_id", course_id)
    return query.execute().data

@router.post("/quizzes")
async def create_quiz(req: QuizCreate, user: CurrentUser = Depends(require_role("teacher"))):
    return supabase.table("quizzes").insert(req.dict()).execute().data[0]

@router.get("/quizzes/{id}")
async def get_quiz(id: int):
    res = supabase.table("quizzes").select("*, questions(*)").eq("id", id).single().execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return res.data

@router.post("/quizzes/{id}/attempt")
async def submit_quiz_attempt(id: int, req: QuizAttemptCreate, user: CurrentUser = Depends(get_current_user)):
    data = req.dict()
    data["user_id"] = user.id
    data["score"] = 0
    return supabase.table("quiz_attempts").insert(data).execute().data[0]

@router.get("/quizzes/{id}/results")
async def get_quiz_results(id: int, user: CurrentUser = Depends(get_current_user)):
    return supabase.table("quiz_attempts").select("*").eq("quiz_id", id).eq("user_id", user.id).execute().data

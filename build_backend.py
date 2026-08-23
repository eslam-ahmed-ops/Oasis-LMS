import os

BASE_DIR = r"c:\Users\eslam\Eslam\Reno\al-waha-edu\backend"

for d in ["middleware", "models", "routers", "utils"]:
    os.makedirs(os.path.join(BASE_DIR, d), exist_ok=True)
    open(os.path.join(BASE_DIR, d, "__init__.py"), "w", encoding="utf-8").close()

files = {}

files["requirements.txt"] = """fastapi
uvicorn[standard]
supabase
python-dotenv
pydantic
pydantic-settings
python-jose[cryptography]
slowapi
python-multipart
"""

files[".env.example"] = """SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
"""

files["config.py"] = """from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    SUPABASE_SERVICE_KEY: str = ""
    JWT_SECRET: str = ""
    FRONTEND_URL: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"

settings = Settings()
"""

files["database.py"] = """from supabase import create_client, Client
from config import settings

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
supabase_admin: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)
"""

files["utils/arabic.py"] = """def to_arabic_numerals(number: int | str) -> str:
    arabic_numbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
    return ''.join(arabic_numbers[int(digit)] if digit.isdigit() else digit for digit in str(number))
"""

files["main.py"] = """from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.extension import Limiter
from slowapi.util import get_remote_address
from config import settings
from routers import auth, courses, progress, stats, deadlines, questions, upload, admin, categories

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="الواحة التعليمية API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(courses.router, prefix="/api")
app.include_router(progress.router, prefix="/api")
app.include_router(stats.router, prefix="/api")
app.include_router(deadlines.router, prefix="/api")
app.include_router(questions.router, prefix="/api")
app.include_router(upload.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(categories.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "الواحة التعليمية API"}
"""

files["middleware/auth.py"] = """from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from config import settings
from typing import Callable

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

class CurrentUser:
    def __init__(self, id: str, email: str, role: str):
        self.id = id
        self.email = email
        self.role = role

async def get_current_user(token: str = Depends(oauth2_scheme)) -> CurrentUser:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"], options={"verify_aud": False})
        user_id: str = payload.get("sub")
        email: str = payload.get("email")
        role: str = payload.get("user_role", "student")
        if user_id is None:
            raise credentials_exception
        return CurrentUser(id=user_id, email=email, role=role)
    except JWTError:
        raise credentials_exception

def require_role(required_role: str) -> Callable:
    async def role_checker(current_user: CurrentUser = Depends(get_current_user)):
        if current_user.role != "admin" and current_user.role != required_role:
            raise HTTPException(status_code=403, detail="Not enough permissions")
        return current_user
    return role_checker
"""

files["models/user.py"] = """from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    full_name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: str

class UserResponse(UserBase):
    id: str
    role: str
    avatar_url: Optional[str] = None
    learning_hours: float = 0.0
    points: int = 0
    created_at: datetime

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
"""

files["models/course.py"] = """from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CourseBase(BaseModel):
    title: str
    description: str
    category_id: int
    instructor: str
    duration_hours: float
    total_lessons: int
    cover_gradient: str

class CourseCreate(CourseBase):
    instructor_id: str

class CourseResponse(CourseBase):
    id: int
    created_at: datetime

class EnrollmentResponse(BaseModel):
    id: int
    user_id: str
    course_id: int
    progress_percent: float
    current_unit: int
    current_lesson: int
    enrolled_at: datetime
    course: CourseResponse
"""

files["models/lesson.py"] = """from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LessonBase(BaseModel):
    title: str
    description: str
    lesson_order: int
    duration_minutes: float

class LessonCreate(LessonBase):
    course_id: int

class LessonResponse(LessonBase):
    id: int
    course_id: int
    video_url: Optional[str] = None
    pdf_url: Optional[str] = None
    created_at: datetime
"""

files["models/question.py"] = """from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class QuestionOptionBase(BaseModel):
    option_text: str
    is_correct: bool
    option_order: int

class QuestionBase(BaseModel):
    question_text: str
    question_type: str
    difficulty: str
    points: int

class QuestionCreate(QuestionBase):
    course_id: int
    options: List[QuestionOptionBase]

class QuestionResponse(QuestionBase):
    id: int
    course_id: int
    created_by: str
    options: List[Dict[str, Any]]
    created_at: datetime

class QuizBase(BaseModel):
    title: str
    time_limit_minutes: int

class QuizCreate(QuizBase):
    course_id: int
    question_ids: List[int]

class QuizResponse(QuizBase):
    id: int
    course_id: int
    total_points: int
    is_published: bool
    questions: List[Dict[str, Any]]
    created_at: datetime

class QuizAttemptCreate(BaseModel):
    quiz_id: int
    answers: Dict[str, Any]

class QuizAttemptResponse(BaseModel):
    id: int
    quiz_id: int
    user_id: str
    score: int
    total_points: int
    started_at: datetime
    completed_at: datetime
"""

files["models/deadline.py"] = """from pydantic import BaseModel
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
"""

files["models/stats.py"] = """from pydantic import BaseModel
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
"""

files["routers/auth.py"] = """from fastapi import APIRouter, Depends, HTTPException
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
"""

files["routers/courses.py"] = """from fastapi import APIRouter, Depends, HTTPException, Query
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
"""

files["routers/progress.py"] = """from fastapi import APIRouter, Depends
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
"""

files["routers/stats.py"] = """from fastapi import APIRouter, Depends
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
"""

files["routers/deadlines.py"] = """from fastapi import APIRouter, Depends
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
"""

files["routers/questions.py"] = """from fastapi import APIRouter, Depends, Query, HTTPException
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
"""

files["routers/upload.py"] = """from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from database import supabase
from middleware.auth import require_role, CurrentUser
import uuid

router = APIRouter(prefix="/upload", tags=["upload"])

@router.post("/video")
async def upload_video(file: UploadFile = File(...), user: CurrentUser = Depends(require_role("teacher"))):
    ext = file.filename.split(".")[-1]
    name = f"{uuid.uuid4()}.{ext}"
    res = supabase.storage.from_("videos").upload(name, await file.read())
    if res.is_error:
        raise HTTPException(status_code=400, detail="Upload failed")
    return {"url": supabase.storage.from_("videos").get_public_url(name)}

@router.post("/pdf")
async def upload_pdf(file: UploadFile = File(...), user: CurrentUser = Depends(require_role("teacher"))):
    ext = file.filename.split(".")[-1]
    name = f"{uuid.uuid4()}.{ext}"
    res = supabase.storage.from_("pdfs").upload(name, await file.read())
    if res.is_error:
        raise HTTPException(status_code=400, detail="Upload failed")
    return {"url": supabase.storage.from_("pdfs").get_public_url(name)}
"""

files["routers/admin.py"] = """from fastapi import APIRouter, Depends
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
"""

files["routers/categories.py"] = """from fastapi import APIRouter, Depends
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
"""

for filepath, content in files.items():
    path = os.path.join(BASE_DIR, filepath.replace("/", "\\\\"))
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

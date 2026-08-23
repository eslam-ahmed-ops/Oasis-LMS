from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
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

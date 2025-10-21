from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Content
from ..analytics import usage_trends, ai_system_stats

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/analytics/usage/{content_id}")
def get_usage_trend(content_id: int, db: Session = Depends(get_db)):
    return usage_trends(content_id, db)

@router.get("/analytics/aisystems/{content_id}")
def get_ai_system_stats(content_id: int, db: Session = Depends(get_db)):
    return ai_system_stats(content_id, db)

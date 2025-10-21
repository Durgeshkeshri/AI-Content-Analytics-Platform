# backend/routes/accesslog_routes.py
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import AccessLog, Content
from datetime import datetime

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/track")
def log_access(content_id: int, ai_system: str, request: Request, db: Session = Depends(get_db)):
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    ip_addr = request.client.host
    log = AccessLog(content_id=content.id, ai_system=ai_system, timestamp=datetime.utcnow(), ip_address=ip_addr)
    db.add(log)
    db.commit()
    return {"msg": "Log saved"}

@router.get("/track/latest/{content_id}")
def get_latest_access(content_id: int, db: Session = Depends(get_db)):
    logs = db.query(AccessLog).filter(AccessLog.content_id == content_id).order_by(AccessLog.timestamp.desc()).limit(20).all()
    return [{"id": l.id, "ai_system": l.ai_system, "timestamp": l.timestamp, "ip": l.ip_address} for l in logs]

from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Content, User
from ..auth import SECRET_KEY, ALGORITHM
from jose import jwt, JWTError

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Header(...), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=401, detail="Invalid token")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise credentials_exception
    return user

@router.post("/content")
def add_content(title: str, url: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if db.query(Content).filter(Content.url == url).first():
        raise HTTPException(status_code=409, detail="Content already registered")
    content = Content(user_id=user.id, title=title, url=url)
    db.add(content)
    db.commit()
    db.refresh(content)
    return {"msg": "Content registered", "content": {"id": content.id, "title": content.title}}

@router.get("/content")
def list_content(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    contents = db.query(Content).filter(Content.user_id == user.id).all()
    return [{"id": c.id, "title": c.title, "url": c.url, "created_at": c.created_at} for c in contents]

@router.delete("/content/{id}")
def delete_content(id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    content = db.query(Content).filter(Content.user_id == user.id, Content.id == id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    db.delete(content)
    db.commit()
    return {"msg": "Content deleted"}

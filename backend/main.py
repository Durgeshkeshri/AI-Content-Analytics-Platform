from fastapi import Depends
from sqlalchemy.orm import Session
from .database import SessionLocal
from .analytics import usage_trends
from .visualization import generate_chart
from .models import Content
from .gemini_service import valuate_content

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/chart/{content_id}")
def chart(content_id: int, db: Session = Depends(get_db)):
    trends = usage_trends(content_id, db)
    if not trends:
        return {"chart": None}
    dates = [t["date"] for t in trends]
    values = [t["access_count"] for t in trends]
    return {"chart": generate_chart(dates, values)}

@app.post("/gemini/analyze/{content_id}")
def gemini_analyze(content_id: int, db: Session = Depends(get_db)):
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    return valuate_content(content.title, content.url)

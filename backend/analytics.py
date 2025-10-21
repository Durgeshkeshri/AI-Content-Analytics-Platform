import pandas as pd
from sqlalchemy.orm import Session
from .models import AccessLog

def usage_trends(content_id: int, db: Session):
    logs = db.query(AccessLog).filter(AccessLog.content_id == content_id).all()
    if not logs:
        return []
    df = pd.DataFrame([{"timestamp": l.timestamp, "ai_system": l.ai_system} for l in logs])
    df["date"] = pd.to_datetime(df["timestamp"]).dt.date
    trends = df.groupby("date").size().reset_index(name="access_count")
    # Output: [{date: ..., access_count: ...}, ...]
    records = []
    for _, row in trends.iterrows():
        records.append({
            "date": str(row["date"]),
            "access_count": int(row["access_count"])
        })
    return records

def ai_system_stats(content_id: int, db: Session):
    logs = db.query(AccessLog).filter(AccessLog.content_id == content_id).all()
    if not logs:
        return {}
    df = pd.DataFrame([{"ai_system": l.ai_system} for l in logs])
    system_counts = df["ai_system"].value_counts().to_dict()
    return system_counts

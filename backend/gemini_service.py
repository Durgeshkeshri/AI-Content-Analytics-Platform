import requests
import os

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

def valuate_content(content_title, content_url):
    if not GEMINI_API_KEY:
        return {"error": "Gemini API key not configured"}
    body = {
        "contents": [{"parts": [
            {"text": f"Please provide a value score (0-100), and recommendations for this content. Title: {content_title}, URL: {content_url}."}
        ]}]
    }
    params = {"key": GEMINI_API_KEY}
    resp = requests.post(GEMINI_API_URL, json=body, params=params)
    if resp.ok:
        return resp.json()
    return {"error": resp.text}

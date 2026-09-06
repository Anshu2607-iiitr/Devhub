@echo off
echo Starting MPLADS Vigil FastAPI Backend...
call .venv\Scripts\activate
uvicorn api:app --reload --port 8000 --app-dir backend
pause

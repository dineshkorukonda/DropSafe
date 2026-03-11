# llm-services

Gemini-backed Python services for DropSafe.

## Current scope

- risk scoring
- premium multiplier suggestions
- claim triage support

## Stack

- FastAPI
- Google Gen AI SDK (`google-genai`)
- Pydantic / pydantic-settings

## Local setup

```bash
cd llm-services
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Set `GEMINI_API_KEY` in `.env` before starting the server.

## Endpoints

- `GET /health`
- `POST /risk-score`
- `POST /claim-triage`

Example request:

```bash
curl -X POST http://127.0.0.1:8000/risk-score \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user_123",
    "coverage": 50000,
    "platform": "Swiggy",
    "hours_per_week": 40,
    "city": "Bengaluru",
    "accident_history": 1,
    "vehicle_age": 3
  }'
```

## Notes

- Default model: `gemini-2.5-flash`
- The service uses structured JSON outputs from Gemini for easier backend integration.
- If `GEMINI_API_KEY` is missing, inference endpoints return `503`.

from fastapi import FastAPI, HTTPException

from app.config import get_settings
from app.models import (
    ClaimTriageRequest,
    ClaimTriageResponse,
    RiskScoreRequest,
    RiskScoreResponse,
)
from app.services.gemini import triage_claim, score_risk

settings = get_settings()

app = FastAPI(
    title=settings.llm_service_name,
    version="0.1.0",
    description="Gemini-backed AI services for DropSafe underwriting and claims flows.",
)


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {
        "status": "ok",
        "service": settings.llm_service_name,
        "model": settings.gemini_model,
    }


@app.post("/risk-score", response_model=RiskScoreResponse)
def risk_score(payload: RiskScoreRequest) -> RiskScoreResponse:
    try:
        return score_risk(payload)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc


@app.post("/claim-triage", response_model=ClaimTriageResponse)
def claim_triage(payload: ClaimTriageRequest) -> ClaimTriageResponse:
    try:
        return triage_claim(payload)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc

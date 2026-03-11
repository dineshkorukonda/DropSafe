from __future__ import annotations

import json
from functools import lru_cache
from typing import TypeVar

from google import genai
from pydantic import BaseModel

from app.config import get_settings
from app.models import (
    ClaimTriageRequest,
    ClaimTriageResponse,
    RiskScoreRequest,
    RiskScoreResponse,
)

ModelT = TypeVar("ModelT", bound=BaseModel)


@lru_cache
def get_gemini_client() -> genai.Client:
    settings = get_settings()
    if not settings.gemini_api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured.")
    return genai.Client(api_key=settings.gemini_api_key)


def _generate_structured_response(prompt: str, schema: type[ModelT]) -> ModelT:
    settings = get_settings()
    response = get_gemini_client().models.generate_content(
        model=settings.gemini_model,
        contents=prompt,
        config={
            "temperature": 0.2,
            "response_mime_type": "application/json",
            "response_json_schema": schema.model_json_schema(),
        },
    )

    if not response.text:
        raise RuntimeError("Gemini returned an empty response.")

    try:
        return schema.model_validate_json(response.text)
    except Exception as exc:
        raise RuntimeError(
            f"Gemini returned invalid structured output: {response.text}"
        ) from exc


def score_risk(payload: RiskScoreRequest) -> RiskScoreResponse:
    prompt = f"""
You are an insurance risk scoring assistant for DropSafe.
Return a JSON object only.

Assess the worker profile and estimate:
- risk_score between 0.0 and 1.0
- premium_multiplier of at least 1.0
- a concise summary for internal underwriting
- up to 4 factors with label, impact, and rationale

Be conservative, avoid hallucinated facts, and base the output only on this input:
{json.dumps(payload.model_dump(), indent=2)}
""".strip()
    return _generate_structured_response(prompt, RiskScoreResponse)


def triage_claim(payload: ClaimTriageRequest) -> ClaimTriageResponse:
    prompt = f"""
You are a claims triage assistant for DropSafe.
Return a JSON object only.

Choose one disposition:
- auto_approve_review
- manual_review
- escalate_fraud_check

Use the claim details below, be cautious, and recommend the minimum necessary follow-up actions.
{json.dumps(payload.model_dump(), indent=2)}
""".strip()
    return _generate_structured_response(prompt, ClaimTriageResponse)

from typing import Literal

from pydantic import BaseModel, Field


class RiskScoreRequest(BaseModel):
    user_id: str = Field(description="Internal user identifier.")
    coverage: float = Field(gt=0, description="Coverage amount requested by the worker.")
    platform: str = Field(description="Worker platform, for example Swiggy or Zomato.")
    hours_per_week: int = Field(ge=0, le=168)
    city: str = Field(description="Primary work city.")
    accident_history: int = Field(default=0, ge=0, description="Past reported accidents.")
    vehicle_age: int = Field(default=0, ge=0, description="Vehicle age in years.")


class RiskFactor(BaseModel):
    label: str = Field(description="Short risk factor label.")
    impact: Literal["low", "medium", "high"] = Field(description="Relative impact on the score.")
    rationale: str = Field(description="Short explanation for the factor.")


class RiskScoreResponse(BaseModel):
    risk_score: float = Field(ge=0, le=1, description="Normalized risk score between 0 and 1.")
    premium_multiplier: float = Field(ge=1, description="Multiplier to apply to the base premium.")
    summary: str = Field(description="Short underwriter-facing explanation.")
    factors: list[RiskFactor] = Field(default_factory=list)


class ClaimTriageRequest(BaseModel):
    claim_id: str = Field(description="Internal claim identifier.")
    policy_id: str = Field(description="Linked policy identifier.")
    claim_amount: float = Field(gt=0)
    claim_reason: str = Field(description="Claim reason supplied by the worker.")
    incident_description: str = Field(description="Narrative of the incident.")
    prior_claims_count: int = Field(default=0, ge=0)


class ClaimTriageResponse(BaseModel):
    disposition: Literal["auto_approve_review", "manual_review", "escalate_fraud_check"]
    confidence: float = Field(ge=0, le=1)
    summary: str
    recommended_actions: list[str] = Field(default_factory=list)

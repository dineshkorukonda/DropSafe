import "server-only";

type RiskFactor = {
  label: string;
  impact: "low" | "medium" | "high";
  rationale: string;
};

type RiskScoreRequest = {
  user_id: string;
  coverage: number;
  platform: string;
  hours_per_week: number;
  city: string;
  accident_history?: number;
  vehicle_age?: number;
};

export type RiskScoreResult = {
  risk_score: number;
  premium_multiplier: number;
  summary: string;
  factors: RiskFactor[];
  source: "llm" | "fallback";
};

type ClaimTriageRequest = {
  claim_id: string;
  policy_id: string;
  claim_amount: number;
  claim_reason: string;
  incident_description: string;
  prior_claims_count?: number;
};

export type ClaimTriageResult = {
  disposition: "auto_approve_review" | "manual_review" | "escalate_fraud_check";
  confidence: number;
  summary: string;
  recommended_actions: string[];
  source: "llm" | "fallback";
};

const llmServiceUrl = process.env.LLM_SERVICE_URL ?? "http://127.0.0.1:8000";
const llmTimeoutMs = Number(process.env.LLM_TIMEOUT_MS ?? "6000");

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

async function postToLlm<TResponse>(path: string, payload: unknown) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), llmTimeoutMs);

  try {
    const response = await fetch(`${llmServiceUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`LLM service returned ${response.status}`);
    }

    return (await response.json()) as TResponse;
  } finally {
    clearTimeout(timeout);
  }
}

function fallbackRiskScore(payload: RiskScoreRequest): RiskScoreResult {
  const coverageFactor = payload.coverage >= 100000 ? 0.2 : payload.coverage >= 60000 ? 0.12 : 0.06;
  const hoursFactor = payload.hours_per_week > 55 ? 0.18 : payload.hours_per_week > 45 ? 0.1 : 0.04;
  const accidentFactor = clamp((payload.accident_history ?? 0) * 0.08, 0, 0.24);
  const vehicleFactor = (payload.vehicle_age ?? 0) > 6 ? 0.08 : 0.03;
  const cityFactor = ["mumbai", "delhi", "bengaluru", "hyderabad"].includes(payload.city.toLowerCase())
    ? 0.06
    : 0.03;

  const riskScore = clamp(0.08 + coverageFactor + hoursFactor + accidentFactor + vehicleFactor + cityFactor, 0.05, 0.95);
  const premiumMultiplier = Number((1 + riskScore).toFixed(2));

  return {
    risk_score: Number(riskScore.toFixed(2)),
    premium_multiplier: premiumMultiplier,
    summary: "Fallback risk model used because LLM service is unavailable.",
    factors: [
      {
        label: "Workload exposure",
        impact: payload.hours_per_week > 50 ? "high" : "medium",
        rationale: `Worker reports ${payload.hours_per_week} hours per week.`,
      },
      {
        label: "Coverage requested",
        impact: payload.coverage >= 100000 ? "high" : "medium",
        rationale: `Coverage amount requested: INR ${payload.coverage}.`,
      },
    ],
    source: "fallback",
  };
}

function fallbackClaimTriage(payload: ClaimTriageRequest): ClaimTriageResult {
  const claimRatio = payload.claim_amount / 50000;
  const priorClaims = payload.prior_claims_count ?? 0;
  const suspiciousKeywords = ["stolen", "missing", "cash", "unknown", "cannot explain"];
  const reason = `${payload.claim_reason} ${payload.incident_description}`.toLowerCase();
  const hasSuspiciousSignals = suspiciousKeywords.some((keyword) => reason.includes(keyword));

  if (hasSuspiciousSignals || priorClaims >= 3 || claimRatio > 1.2) {
    return {
      disposition: "escalate_fraud_check",
      confidence: 0.67,
      summary: "Fallback triage flagged elevated fraud risk indicators.",
      recommended_actions: ["Collect incident proof", "Validate geolocation and delivery logs"],
      source: "fallback",
    };
  }

  if (claimRatio <= 0.25 && priorClaims === 0) {
    return {
      disposition: "auto_approve_review",
      confidence: 0.74,
      summary: "Fallback triage indicates low complexity and low fraud risk.",
      recommended_actions: ["Run standard policy entitlement check"],
      source: "fallback",
    };
  }

  return {
    disposition: "manual_review",
    confidence: 0.62,
    summary: "Fallback triage requires manual review due to moderate complexity.",
    recommended_actions: ["Verify policy terms", "Request additional incident details"],
    source: "fallback",
  };
}

export async function scoreRiskWithLlm(payload: RiskScoreRequest): Promise<RiskScoreResult> {
  try {
    const response = await postToLlm<Omit<RiskScoreResult, "source">>("/risk-score", payload);
    return { ...response, source: "llm" };
  } catch {
    return fallbackRiskScore(payload);
  }
}

export async function triageClaimWithLlm(payload: ClaimTriageRequest): Promise<ClaimTriageResult> {
  try {
    const response = await postToLlm<Omit<ClaimTriageResult, "source">>("/claim-triage", payload);
    return { ...response, source: "llm" };
  } catch {
    return fallbackClaimTriage(payload);
  }
}

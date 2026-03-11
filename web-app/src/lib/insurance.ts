import "server-only";

import { randomUUID } from "node:crypto";

import { getOnboardingProfile } from "@/lib/auth";
import { sql } from "@/lib/db";
import { scoreRiskWithLlm, triageClaimWithLlm } from "@/lib/llm";

type PolicyRecord = {
  id: string;
  user_id: string;
  coverage: string;
  base_premium: string;
  premium: string;
  risk_score: string | null;
  premium_multiplier: string;
  status: string;
  start_date: string;
  end_date: string;
};

type RiskSnapshotRecord = {
  risk_score: string;
  premium_multiplier: string;
  summary: string;
  factors: unknown;
  llm_source: "llm" | "fallback";
  created_at: string;
};

type ClaimRecord = {
  id: string;
  policy_id: string;
  status: string;
  amount: string;
  reason: string;
  incident_description: string;
  ai_disposition: string | null;
  ai_confidence: string | null;
  ai_summary: string | null;
  llm_source: "llm" | "fallback" | null;
  created_at: string;
  payout_status: string | null;
  payout_amount: string | null;
};

type AdminMetricsRecord = {
  active_users: number;
  active_policies: number;
  open_claims: number;
  escalated_claims: number;
  paid_total: string;
  total_claims: number;
};

let insuranceSchemaReady: Promise<void> | null = null;

function asNumber(value: string | number | null | undefined) {
  if (value === null || value === undefined) {
    return 0;
  }
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseFactors(input: unknown) {
  if (Array.isArray(input)) {
    return input;
  }
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function calculateBasePremium(coverage: number) {
  return Number((coverage * 0.0024).toFixed(2));
}

async function ensureInsuranceSchema() {
  if (!insuranceSchemaReady) {
    insuranceSchemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS policies (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          coverage NUMERIC(12,2) NOT NULL,
          base_premium NUMERIC(12,2) NOT NULL,
          premium NUMERIC(12,2) NOT NULL,
          risk_score NUMERIC(4,3),
          premium_multiplier NUMERIC(6,3) NOT NULL DEFAULT 1.000,
          status TEXT NOT NULL DEFAULT 'active',
          start_date TIMESTAMPTZ NOT NULL,
          end_date TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS policies_user_status_idx
        ON policies (user_id, status)
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS risk_scores (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          policy_id TEXT REFERENCES policies(id) ON DELETE SET NULL,
          risk_score NUMERIC(4,3) NOT NULL,
          premium_multiplier NUMERIC(6,3) NOT NULL,
          summary TEXT NOT NULL,
          factors JSONB NOT NULL DEFAULT '[]'::jsonb,
          llm_source TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS risk_scores_user_created_idx
        ON risk_scores (user_id, created_at DESC)
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS claims (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          policy_id TEXT NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
          status TEXT NOT NULL,
          amount NUMERIC(12,2) NOT NULL,
          reason TEXT NOT NULL,
          incident_description TEXT NOT NULL,
          ai_disposition TEXT,
          ai_confidence NUMERIC(5,4),
          ai_summary TEXT,
          llm_source TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS claims_user_created_idx
        ON claims (user_id, created_at DESC)
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS payouts (
          id TEXT PRIMARY KEY,
          claim_id TEXT NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          amount NUMERIC(12,2) NOT NULL,
          status TEXT NOT NULL,
          payout_method TEXT,
          transaction_reference TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS payouts_claim_idx
        ON payouts (claim_id)
      `;
    })();
  }

  await insuranceSchemaReady;
}

async function getActivePolicy(userId: string) {
  await ensureInsuranceSchema();
  const rows = (await sql`
    SELECT id, user_id, coverage, base_premium, premium, risk_score, premium_multiplier, status, start_date, end_date
    FROM policies
    WHERE user_id = ${userId}
      AND status = 'active'
      AND end_date > NOW()
    ORDER BY created_at DESC
    LIMIT 1
  `) as PolicyRecord[];
  return rows[0] ?? null;
}

async function createInitialPolicy(userId: string) {
  const profile = await getOnboardingProfile(userId);
  const coverage = Math.max(asNumber(profile?.coverage_amount), 25000) || 50000;
  const basePremium = calculateBasePremium(coverage);
  const premiumMultiplier = 1.12;
  const premium = Number((basePremium * premiumMultiplier).toFixed(2));
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 30);

  const rows = (await sql`
    INSERT INTO policies (
      id, user_id, coverage, base_premium, premium, risk_score, premium_multiplier,
      status, start_date, end_date
    )
    VALUES (
      ${randomUUID()},
      ${userId},
      ${coverage},
      ${basePremium},
      ${premium},
      ${0.12},
      ${premiumMultiplier},
      ${"active"},
      ${startDate.toISOString()},
      ${endDate.toISOString()}
    )
    RETURNING id, user_id, coverage, base_premium, premium, risk_score, premium_multiplier, status, start_date, end_date
  `) as PolicyRecord[];

  return rows[0];
}

export async function ensureUserPolicy(userId: string) {
  await ensureInsuranceSchema();
  const existing = await getActivePolicy(userId);
  if (existing) {
    return existing;
  }
  return createInitialPolicy(userId);
}

export async function refreshUserRiskSnapshot(userId: string) {
  await ensureInsuranceSchema();
  const profile = await getOnboardingProfile(userId);
  if (!profile || !profile.platform || !profile.city || !profile.hours_per_week) {
    throw new Error("MISSING_PROFILE");
  }

  const policy = await ensureUserPolicy(userId);
  const risk = await scoreRiskWithLlm({
    user_id: userId,
    coverage: asNumber(policy.coverage),
    platform: profile.platform,
    hours_per_week: profile.hours_per_week,
    city: profile.city,
  });

  const premium = Number((asNumber(policy.base_premium) * risk.premium_multiplier).toFixed(2));
  await sql`
    UPDATE policies
    SET
      risk_score = ${risk.risk_score},
      premium_multiplier = ${risk.premium_multiplier},
      premium = ${premium},
      updated_at = NOW()
    WHERE id = ${policy.id}
  `;

  await sql`
    INSERT INTO risk_scores (id, user_id, policy_id, risk_score, premium_multiplier, summary, factors, llm_source)
    VALUES (
      ${randomUUID()},
      ${userId},
      ${policy.id},
      ${risk.risk_score},
      ${risk.premium_multiplier},
      ${risk.summary},
      ${JSON.stringify(risk.factors)},
      ${risk.source}
    )
  `;

  return risk;
}

export async function createClaimWithTriage(
  userId: string,
  input: { amount: number; reason: string; incidentDescription: string }
) {
  await ensureInsuranceSchema();
  const policy = await ensureUserPolicy(userId);
  const profile = await getOnboardingProfile(userId);
  const priorClaimsRows = (await sql`
    SELECT COUNT(*)::int AS total
    FROM claims
    WHERE user_id = ${userId}
  `) as Array<{ total: number }>;
  const priorClaimsCount = priorClaimsRows[0]?.total ?? 0;

  const claimId = randomUUID();
  await sql`
    INSERT INTO claims (id, user_id, policy_id, status, amount, reason, incident_description)
    VALUES (${claimId}, ${userId}, ${policy.id}, ${"submitted"}, ${input.amount}, ${input.reason}, ${input.incidentDescription})
  `;

  const triage = await triageClaimWithLlm({
    claim_id: claimId,
    policy_id: policy.id,
    claim_amount: input.amount,
    claim_reason: input.reason,
    incident_description: input.incidentDescription,
    prior_claims_count: priorClaimsCount,
  });

  const nextStatus =
    triage.disposition === "auto_approve_review"
      ? "approved_pending_payout"
      : triage.disposition === "escalate_fraud_check"
        ? "fraud_check"
        : "under_review";

  await sql`
    UPDATE claims
    SET
      status = ${nextStatus},
      ai_disposition = ${triage.disposition},
      ai_confidence = ${triage.confidence},
      ai_summary = ${triage.summary},
      llm_source = ${triage.source}
    WHERE id = ${claimId}
  `;

  if (nextStatus === "approved_pending_payout") {
    await sql`
      INSERT INTO payouts (id, claim_id, user_id, amount, status, payout_method, transaction_reference)
      VALUES (
        ${randomUUID()},
        ${claimId},
        ${userId},
        ${input.amount},
        ${"initiated"},
        ${profile?.payout_method ?? "Not set"},
        ${`TXN-${Date.now()}`}
      )
    `;
  }

  return { claimId, triage, status: nextStatus };
}

export async function retriageClaimForAdmin(claimId: string) {
  await ensureInsuranceSchema();
  const rows = (await sql`
    SELECT id, policy_id, amount, reason, incident_description, user_id
    FROM claims
    WHERE id = ${claimId}
    LIMIT 1
  `) as Array<{
    id: string;
    user_id: string;
    policy_id: string;
    amount: string;
    reason: string;
    incident_description: string;
  }>;
  const claim = rows[0];
  if (!claim) {
    throw new Error("CLAIM_NOT_FOUND");
  }

  const priorClaimsRows = (await sql`
    SELECT COUNT(*)::int AS total
    FROM claims
    WHERE user_id = ${claim.user_id}
      AND id <> ${claim.id}
  `) as Array<{ total: number }>;

  const triage = await triageClaimWithLlm({
    claim_id: claim.id,
    policy_id: claim.policy_id,
    claim_amount: asNumber(claim.amount),
    claim_reason: claim.reason,
    incident_description: claim.incident_description,
    prior_claims_count: priorClaimsRows[0]?.total ?? 0,
  });

  const nextStatus =
    triage.disposition === "auto_approve_review"
      ? "approved_pending_payout"
      : triage.disposition === "escalate_fraud_check"
        ? "fraud_check"
        : "under_review";

  await sql`
    UPDATE claims
    SET
      status = ${nextStatus},
      ai_disposition = ${triage.disposition},
      ai_confidence = ${triage.confidence},
      ai_summary = ${triage.summary},
      llm_source = ${triage.source}
    WHERE id = ${claim.id}
  `;

  if (nextStatus === "approved_pending_payout") {
    const payoutRows = (await sql`
      SELECT id
      FROM payouts
      WHERE claim_id = ${claim.id}
      LIMIT 1
    `) as Array<{ id: string }>;

    if (!payoutRows[0]) {
      const profile = await getOnboardingProfile(claim.user_id);
      await sql`
        INSERT INTO payouts (id, claim_id, user_id, amount, status, payout_method, transaction_reference)
        VALUES (
          ${randomUUID()},
          ${claim.id},
          ${claim.user_id},
          ${asNumber(claim.amount)},
          ${"initiated"},
          ${profile?.payout_method ?? "Not set"},
          ${`TXN-${Date.now()}`}
        )
      `;
    }
  }
}

export async function getUserDashboardData(userId: string) {
  await ensureInsuranceSchema();
  let policy = await ensureUserPolicy(userId);
  let latestRiskRows = (await sql`
    SELECT risk_score, premium_multiplier, summary, factors, llm_source, created_at
    FROM risk_scores
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT 1
  `) as RiskSnapshotRecord[];

  if (!latestRiskRows[0]) {
    await refreshUserRiskSnapshot(userId);
    policy = (await getActivePolicy(userId)) ?? policy;
    latestRiskRows = (await sql`
      SELECT risk_score, premium_multiplier, summary, factors, llm_source, created_at
      FROM risk_scores
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 1
    `) as RiskSnapshotRecord[];
  }

  const latestRisk = latestRiskRows[0]
    ? {
        riskScore: asNumber(latestRiskRows[0].risk_score),
        premiumMultiplier: asNumber(latestRiskRows[0].premium_multiplier),
        summary: latestRiskRows[0].summary,
        factors: parseFactors(latestRiskRows[0].factors),
        source: latestRiskRows[0].llm_source,
        createdAt: latestRiskRows[0].created_at,
      }
    : null;

  const claimRows = (await sql`
    SELECT
      claims.id,
      claims.policy_id,
      claims.status,
      claims.amount,
      claims.reason,
      claims.incident_description,
      claims.ai_disposition,
      claims.ai_confidence,
      claims.ai_summary,
      claims.llm_source,
      claims.created_at,
      payouts.status AS payout_status,
      payouts.amount AS payout_amount
    FROM claims
    LEFT JOIN payouts ON payouts.claim_id = claims.id
    WHERE claims.user_id = ${userId}
    ORDER BY claims.created_at DESC
    LIMIT 10
  `) as ClaimRecord[];

  const paidPayoutRows = (await sql`
    SELECT COALESCE(SUM(amount), 0)::numeric AS total
    FROM payouts
    WHERE user_id = ${userId}
      AND status = 'paid'
  `) as Array<{ total: string }>;

  const openClaimRows = (await sql`
    SELECT COUNT(*)::int AS total
    FROM claims
    WHERE user_id = ${userId}
      AND status IN ('submitted', 'under_review', 'fraud_check')
  `) as Array<{ total: number }>;

  return {
    policy: {
      id: policy.id,
      coverage: asNumber(policy.coverage),
      basePremium: asNumber(policy.base_premium),
      premium: asNumber(policy.premium),
      riskScore: asNumber(policy.risk_score),
      premiumMultiplier: asNumber(policy.premium_multiplier),
      status: policy.status,
      startDate: policy.start_date,
      endDate: policy.end_date,
    },
    latestRisk,
    claims: claimRows.map((claim) => ({
      id: claim.id,
      policyId: claim.policy_id,
      status: claim.status,
      amount: asNumber(claim.amount),
      reason: claim.reason,
      incidentDescription: claim.incident_description,
      aiDisposition: claim.ai_disposition,
      aiConfidence: asNumber(claim.ai_confidence),
      aiSummary: claim.ai_summary,
      llmSource: claim.llm_source,
      createdAt: claim.created_at,
      payoutStatus: claim.payout_status,
      payoutAmount: asNumber(claim.payout_amount),
    })),
    totalPaidOut: asNumber(paidPayoutRows[0]?.total),
    openClaims: openClaimRows[0]?.total ?? 0,
  };
}

export async function getAdminDashboardData() {
  await ensureInsuranceSchema();
  const metricsRows = (await sql`
    SELECT
      (SELECT COUNT(*)::int FROM users WHERE onboarding_completed_at IS NOT NULL) AS active_users,
      (SELECT COUNT(*)::int FROM policies WHERE status = 'active' AND end_date > NOW()) AS active_policies,
      (SELECT COUNT(*)::int FROM claims WHERE status IN ('submitted', 'under_review', 'fraud_check')) AS open_claims,
      (SELECT COUNT(*)::int FROM claims WHERE ai_disposition = 'escalate_fraud_check') AS escalated_claims,
      (SELECT COALESCE(SUM(amount), 0)::numeric FROM payouts WHERE status = 'paid') AS paid_total,
      (SELECT COUNT(*)::int FROM claims) AS total_claims
  `) as AdminMetricsRecord[];

  const recentClaims = (await sql`
    SELECT
      claims.id,
      users.full_name,
      users.email,
      claims.status,
      claims.reason,
      claims.amount,
      claims.ai_disposition,
      claims.ai_confidence,
      claims.llm_source,
      claims.created_at
    FROM claims
    INNER JOIN users ON users.id = claims.user_id
    ORDER BY claims.created_at DESC
    LIMIT 12
  `) as Array<{
    id: string;
    full_name: string;
    email: string;
    status: string;
    reason: string;
    amount: string;
    ai_disposition: string | null;
    ai_confidence: string | null;
    llm_source: "llm" | "fallback" | null;
    created_at: string;
  }>;

  const riskByCity = (await sql`
    SELECT
      COALESCE(onboarding_profiles.city, 'Unknown') AS city,
      ROUND(AVG(COALESCE(policies.risk_score, 0))::numeric, 3) AS avg_risk_score,
      COUNT(*)::int AS workers
    FROM policies
    LEFT JOIN onboarding_profiles ON onboarding_profiles.user_id = policies.user_id
    WHERE policies.status = 'active'
      AND policies.end_date > NOW()
    GROUP BY onboarding_profiles.city
    ORDER BY avg_risk_score DESC
    LIMIT 8
  `) as Array<{ city: string; avg_risk_score: string; workers: number }>;

  const metrics = metricsRows[0] ?? {
    active_users: 0,
    active_policies: 0,
    open_claims: 0,
    escalated_claims: 0,
    paid_total: "0",
    total_claims: 0,
  };

  return {
    metrics: {
      activeUsers: metrics.active_users,
      activePolicies: metrics.active_policies,
      openClaims: metrics.open_claims,
      escalatedClaims: metrics.escalated_claims,
      totalPaid: asNumber(metrics.paid_total),
      reviewRate:
        metrics.total_claims === 0
          ? 0
          : Number(((metrics.open_claims / metrics.total_claims) * 100).toFixed(1)),
    },
    recentClaims: recentClaims.map((claim) => ({
      id: claim.id,
      workerName: claim.full_name,
      workerEmail: claim.email,
      status: claim.status,
      reason: claim.reason,
      amount: asNumber(claim.amount),
      aiDisposition: claim.ai_disposition,
      aiConfidence: asNumber(claim.ai_confidence),
      llmSource: claim.llm_source ?? "fallback",
      createdAt: claim.created_at,
    })),
    riskByCity: riskByCity.map((row) => ({
      city: row.city,
      avgRiskScore: asNumber(row.avg_risk_score),
      workers: row.workers,
    })),
  };
}

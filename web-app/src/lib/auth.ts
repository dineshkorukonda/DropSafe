import "server-only";

import { compare, hash } from "bcryptjs";
import { cookies } from "next/headers";
import { createHash, randomBytes, randomUUID } from "node:crypto";

import { sql } from "@/lib/db";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/email";

const SESSION_COOKIE_NAME = "dropsafe_session";
const SESSION_TTL_DAYS = 30;
const TOKEN_TTL_HOURS = 2;

export type UserRecord = {
  id: string;
  email: string;
  full_name: string;
  role: "user" | "admin";
  email_verified_at: string | null;
  onboarding_completed_at: string | null;
};

let schemaReady: Promise<void> | null = null;
const ADMIN_EMAILS = new Set(
  (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => normalizeEmail(email))
    .filter(Boolean)
);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function resolveRole(email: string): UserRecord["role"] {
  return ADMIN_EMAILS.has(normalizeEmail(email)) ? "admin" : "user";
}

function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function generateToken() {
  return randomBytes(32).toString("hex");
}

function getExpiry(hours: number) {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + hours);
  return expiresAt;
}

async function ensureAuthSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          full_name TEXT NOT NULL,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ
      `;

      await sql`
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ
      `;

      await sql`
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user'
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS sessions (
          token_hash TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          expires_at TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS sessions_user_id_idx
        ON sessions (user_id)
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS sessions_expires_at_idx
        ON sessions (expires_at)
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS email_verification_tokens (
          token_hash TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          expires_at TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS password_reset_tokens (
          token_hash TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          expires_at TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS onboarding_profiles (
          user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
          platform TEXT,
          city TEXT,
          vehicle_type TEXT,
          hours_per_week INTEGER,
          weekly_income NUMERIC(12,2),
          coverage_amount NUMERIC(12,2),
          payout_method TEXT,
          alerts_opt_in BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
    })();
  }

  await schemaReady;
}

export async function createUser(input: {
  email: string;
  password: string;
  fullName: string;
}) {
  await ensureAuthSchema();

  const email = normalizeEmail(input.email);
  const passwordHash = await hash(input.password, 12);
  const role = resolveRole(email);

  try {
    const rows = (await sql`
      INSERT INTO users (id, email, full_name, password_hash, role)
      VALUES (${randomUUID()}, ${email}, ${input.fullName.trim()}, ${passwordHash}, ${role})
      RETURNING id, email, full_name, role, email_verified_at, onboarding_completed_at
    `) as UserRecord[];
    return rows[0];
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("duplicate") || message.includes("users_email_key")) {
      throw new Error("EMAIL_IN_USE");
    }
    throw error;
  }
}

export async function verifyUserCredentials(email: string, password: string) {
  await ensureAuthSchema();

  const rows = (await sql`
    SELECT id, email, full_name, role, password_hash, email_verified_at, onboarding_completed_at
    FROM users
    WHERE email = ${normalizeEmail(email)}
    LIMIT 1
  `) as Array<UserRecord & { password_hash: string }>;

  const user = rows[0];
  if (!user) {
    return null;
  }

  const passwordMatches = await compare(password, user.password_hash);
  if (!passwordMatches) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    email_verified_at: user.email_verified_at,
    onboarding_completed_at: user.onboarding_completed_at,
  };
}

export async function createSession(userId: string) {
  await ensureAuthSchema();

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_TTL_DAYS);

  await sql`
    INSERT INTO sessions (token_hash, user_id, expires_at)
    VALUES (${hashSessionToken(token)}, ${userId}, ${expiresAt.toISOString()})
  `;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearSession() {
  await ensureAuthSchema();

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await sql`
      DELETE FROM sessions
      WHERE token_hash = ${hashSessionToken(token)}
    `;
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentUser() {
  await ensureAuthSchema();

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const rows = (await sql`
    SELECT users.id, users.email, users.full_name, users.role, users.email_verified_at, users.onboarding_completed_at
    FROM sessions
    INNER JOIN users ON users.id = sessions.user_id
    WHERE sessions.token_hash = ${hashSessionToken(token)}
      AND sessions.expires_at > NOW()
    LIMIT 1
  `) as UserRecord[];

  return rows[0] ?? null;
}

export async function getUserByEmail(email: string) {
  await ensureAuthSchema();

  const rows = (await sql`
    SELECT id, email, full_name, role, email_verified_at, onboarding_completed_at
    FROM users
    WHERE email = ${normalizeEmail(email)}
    LIMIT 1
  `) as UserRecord[];

  return rows[0] ?? null;
}

export async function createEmailVerificationRequest(userId: string, email: string) {
  await ensureAuthSchema();

  const token = generateToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = getExpiry(TOKEN_TTL_HOURS);

  await sql`
    DELETE FROM email_verification_tokens
    WHERE user_id = ${userId}
  `;

  await sql`
    INSERT INTO email_verification_tokens (token_hash, user_id, expires_at)
    VALUES (${tokenHash}, ${userId}, ${expiresAt.toISOString()})
  `;

  return sendVerificationEmail(email, token);
}

export async function verifyEmailToken(token: string) {
  await ensureAuthSchema();

  const rows = (await sql`
    SELECT users.id, users.email, users.full_name, users.role, users.email_verified_at, users.onboarding_completed_at
    FROM email_verification_tokens
    INNER JOIN users ON users.id = email_verification_tokens.user_id
    WHERE email_verification_tokens.token_hash = ${hashSessionToken(token)}
      AND email_verification_tokens.expires_at > NOW()
    LIMIT 1
  `) as UserRecord[];

  const user = rows[0];
  if (!user) {
    return null;
  }

  await sql`
    UPDATE users
    SET email_verified_at = COALESCE(email_verified_at, NOW())
    WHERE id = ${user.id}
  `;

  await sql`
    DELETE FROM email_verification_tokens
    WHERE user_id = ${user.id}
  `;

  return {
    ...user,
    email_verified_at: new Date().toISOString(),
  };
}

export async function createPasswordResetRequest(email: string) {
  await ensureAuthSchema();

  const user = await getUserByEmail(email);
  if (!user) {
    return { delivered: false, exists: false };
  }

  const token = generateToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = getExpiry(TOKEN_TTL_HOURS);

  await sql`
    DELETE FROM password_reset_tokens
    WHERE user_id = ${user.id}
  `;

  await sql`
    INSERT INTO password_reset_tokens (token_hash, user_id, expires_at)
    VALUES (${tokenHash}, ${user.id}, ${expiresAt.toISOString()})
  `;

  const result = await sendPasswordResetEmail(user.email, token);
  return { ...result, exists: true };
}

export async function isPasswordResetTokenValid(token: string) {
  await ensureAuthSchema();

  const rows = (await sql`
    SELECT user_id
    FROM password_reset_tokens
    WHERE token_hash = ${hashSessionToken(token)}
      AND expires_at > NOW()
    LIMIT 1
  `) as Array<{ user_id: string }>;

  return Boolean(rows[0]);
}

export async function resetPassword(token: string, password: string) {
  await ensureAuthSchema();

  const rows = (await sql`
    SELECT user_id
    FROM password_reset_tokens
    WHERE token_hash = ${hashSessionToken(token)}
      AND expires_at > NOW()
    LIMIT 1
  `) as Array<{ user_id: string }>;

  const match = rows[0];
  if (!match) {
    return false;
  }

  const passwordHash = await hash(password, 12);

  await sql`
    UPDATE users
    SET password_hash = ${passwordHash}
    WHERE id = ${match.user_id}
  `;

  await sql`
    DELETE FROM password_reset_tokens
    WHERE user_id = ${match.user_id}
  `;

  await sql`
    DELETE FROM sessions
    WHERE user_id = ${match.user_id}
  `;

  return true;
}

export type OnboardingProfile = {
  user_id: string;
  platform: string | null;
  city: string | null;
  vehicle_type: string | null;
  hours_per_week: number | null;
  weekly_income: string | null;
  coverage_amount: string | null;
  payout_method: string | null;
  alerts_opt_in: boolean;
};

export async function getOnboardingProfile(userId: string) {
  await ensureAuthSchema();

  const rows = (await sql`
    SELECT user_id, platform, city, vehicle_type, hours_per_week, weekly_income, coverage_amount, payout_method, alerts_opt_in
    FROM onboarding_profiles
    WHERE user_id = ${userId}
    LIMIT 1
  `) as OnboardingProfile[];

  return rows[0] ?? null;
}

export async function upsertOnboardingProfile(
  userId: string,
  data: Partial<Omit<OnboardingProfile, "user_id">>
) {
  await ensureAuthSchema();

  const existing = await getOnboardingProfile(userId);
  const next = {
    platform: data.platform ?? existing?.platform ?? null,
    city: data.city ?? existing?.city ?? null,
    vehicle_type: data.vehicle_type ?? existing?.vehicle_type ?? null,
    hours_per_week: data.hours_per_week ?? existing?.hours_per_week ?? null,
    weekly_income: data.weekly_income ?? existing?.weekly_income ?? null,
    coverage_amount: data.coverage_amount ?? existing?.coverage_amount ?? null,
    payout_method: data.payout_method ?? existing?.payout_method ?? null,
    alerts_opt_in: data.alerts_opt_in ?? existing?.alerts_opt_in ?? true,
  };

  await sql`
    INSERT INTO onboarding_profiles (
      user_id, platform, city, vehicle_type, hours_per_week,
      weekly_income, coverage_amount, payout_method, alerts_opt_in, updated_at
    )
    VALUES (
      ${userId}, ${next.platform}, ${next.city}, ${next.vehicle_type}, ${next.hours_per_week},
      ${next.weekly_income}, ${next.coverage_amount}, ${next.payout_method}, ${next.alerts_opt_in}, NOW()
    )
    ON CONFLICT (user_id) DO UPDATE SET
      platform = EXCLUDED.platform,
      city = EXCLUDED.city,
      vehicle_type = EXCLUDED.vehicle_type,
      hours_per_week = EXCLUDED.hours_per_week,
      weekly_income = EXCLUDED.weekly_income,
      coverage_amount = EXCLUDED.coverage_amount,
      payout_method = EXCLUDED.payout_method,
      alerts_opt_in = EXCLUDED.alerts_opt_in,
      updated_at = NOW()
  `;
}

export async function markOnboardingComplete(userId: string) {
  await ensureAuthSchema();

  await sql`
    UPDATE users
    SET onboarding_completed_at = NOW()
    WHERE id = ${userId}
  `;
}

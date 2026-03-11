"use server";

import { redirect } from "next/navigation";

import {
  clearSession,
  createEmailVerificationRequest,
  createPasswordResetRequest,
  createSession,
  createUser,
  getCurrentUser,
  getOnboardingProfile,
  getUserByEmail,
  isPasswordResetTokenValid,
  markOnboardingComplete,
  resetPassword,
  upsertOnboardingProfile,
  verifyEmailToken,
  verifyUserCredentials,
} from "@/lib/auth";

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function loginAction(formData: FormData) {
  const email = readText(formData, "email");
  const password = readText(formData, "password");

  if (!email || !password) {
    redirect("/auth/login?error=missing_fields");
  }

  const user = await verifyUserCredentials(email, password);
  if (!user) {
    redirect("/auth/login?error=invalid_credentials");
  }

  if (!user.email_verified_at) {
    redirect(`/auth/verify-email?email=${encodeURIComponent(user.email)}`);
  }

  await createSession(user.id);
  if (!user.onboarding_completed_at) {
    redirect("/onboarding");
  }
  redirect("/dashboard");
}

export async function signupAction(formData: FormData) {
  const fullName = readText(formData, "fullName");
  const email = readText(formData, "email");
  const password = readText(formData, "password");
  const confirmPassword = readText(formData, "confirmPassword");

  if (!fullName || !email || !password || !confirmPassword) {
    redirect("/auth/signup?error=missing_fields");
  }

  if (password.length < 8) {
    redirect("/auth/signup?error=weak_password");
  }

  if (password !== confirmPassword) {
    redirect("/auth/signup?error=password_mismatch");
  }

  try {
    const user = await createUser({ email, password, fullName });
    await createEmailVerificationRequest(user.id, user.email);
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_IN_USE") {
      redirect("/auth/signup?error=email_in_use");
    }
    throw error;
  }

  redirect(`/auth/verify-email?email=${encodeURIComponent(email)}&sent=1`);
}

export async function logoutAction() {
  await clearSession();
  redirect("/auth/login");
}

export async function resendVerificationAction(formData: FormData) {
  const email = readText(formData, "email");

  if (!email) {
    redirect("/auth/verify-email?error=missing_email");
  }

  const user = await getUserByEmail(email);
  if (!user) {
    redirect(`/auth/verify-email?email=${encodeURIComponent(email)}&sent=1`);
  }

  if (user.email_verified_at) {
    redirect("/auth/login?message=already_verified");
  }

  await createEmailVerificationRequest(user.id, user.email);
  redirect(`/auth/verify-email?email=${encodeURIComponent(user.email)}&sent=1`);
}

export async function verifyEmailAction(formData: FormData) {
  const token = readText(formData, "token");

  if (!token) {
    redirect("/auth/verify-email?error=invalid_token");
  }

  const user = await verifyEmailToken(token);
  if (!user) {
    redirect("/auth/verify-email?error=invalid_token");
  }

  await createSession(user.id);
  redirect("/onboarding");
}

export async function forgotPasswordAction(formData: FormData) {
  const email = readText(formData, "email");

  if (!email) {
    redirect("/auth/forgot-password?error=missing_email");
  }

  await createPasswordResetRequest(email);
  redirect(`/auth/forgot-password?sent=1&email=${encodeURIComponent(email)}`);
}

export async function resetPasswordAction(formData: FormData) {
  const token = readText(formData, "token");
  const password = readText(formData, "password");
  const confirmPassword = readText(formData, "confirmPassword");

  if (!token || !password || !confirmPassword) {
    redirect("/auth/reset-password?error=missing_fields");
  }

  if (password.length < 8) {
    redirect(`/auth/reset-password?token=${encodeURIComponent(token)}&error=weak_password`);
  }

  if (password !== confirmPassword) {
    redirect(`/auth/reset-password?token=${encodeURIComponent(token)}&error=password_mismatch`);
  }

  const tokenValid = await isPasswordResetTokenValid(token);
  if (!tokenValid) {
    redirect("/auth/reset-password?error=invalid_token");
  }

  const success = await resetPassword(token, password);
  if (!success) {
    redirect("/auth/reset-password?error=invalid_token");
  }

  redirect("/auth/login?message=password_reset");
}

export async function saveOnboardingAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }

  if (!user.email_verified_at) {
    redirect(`/auth/verify-email?email=${encodeURIComponent(user.email)}`);
  }

  const step = readText(formData, "step");

  if (step === "1") {
    const platform = readText(formData, "platform");
    const city = readText(formData, "city");
    const vehicleType = readText(formData, "vehicleType");

    if (!platform || !city || !vehicleType) {
      redirect("/onboarding?step=1&error=missing_fields");
    }

    await upsertOnboardingProfile(user.id, {
      platform,
      city,
      vehicle_type: vehicleType,
    });
    redirect("/onboarding?step=2");
  }

  if (step === "2") {
    const hoursPerWeek = Number(readText(formData, "hoursPerWeek"));
    const weeklyIncome = readText(formData, "weeklyIncome");
    const coverageAmount = readText(formData, "coverageAmount");

    if (!Number.isFinite(hoursPerWeek) || hoursPerWeek <= 0 || !weeklyIncome || !coverageAmount) {
      redirect("/onboarding?step=2&error=missing_fields");
    }

    await upsertOnboardingProfile(user.id, {
      hours_per_week: hoursPerWeek,
      weekly_income: weeklyIncome,
      coverage_amount: coverageAmount,
    });
    redirect("/onboarding?step=3");
  }

  if (step === "3") {
    const payoutMethod = readText(formData, "payoutMethod");
    const alertsOptIn = formData.get("alertsOptIn") === "on";

    if (!payoutMethod) {
      redirect("/onboarding?step=3&error=missing_fields");
    }

    await upsertOnboardingProfile(user.id, {
      payout_method: payoutMethod,
      alerts_opt_in: alertsOptIn,
    });
    await markOnboardingComplete(user.id);
    redirect("/dashboard");
  }

  const profile = await getOnboardingProfile(user.id);
  if (!profile) {
    redirect("/onboarding");
  }

  redirect("/dashboard");
}

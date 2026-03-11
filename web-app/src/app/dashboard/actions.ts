"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { createClaimWithTriage, refreshUserRiskSnapshot } from "@/lib/insurance";

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function requireDashboardUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }
  if (!user.email_verified_at) {
    redirect(`/auth/verify-email?email=${encodeURIComponent(user.email)}`);
  }
  if (!user.onboarding_completed_at) {
    redirect("/onboarding");
  }
  return user;
}

export async function refreshRiskSnapshotAction() {
  const user = await requireDashboardUser();
  await refreshUserRiskSnapshot(user.id);
  revalidatePath("/dashboard");
}

export async function submitClaimAction(formData: FormData) {
  const user = await requireDashboardUser();
  const reason = readText(formData, "reason");
  const incidentDescription = readText(formData, "incidentDescription");
  const amount = Number(readText(formData, "amount"));

  if (!reason || !incidentDescription || !Number.isFinite(amount) || amount <= 0) {
    redirect("/dashboard?error=invalid_claim");
  }

  await createClaimWithTriage(user.id, { amount, reason, incidentDescription });
  revalidatePath("/dashboard");
  redirect("/dashboard?claim=submitted");
}

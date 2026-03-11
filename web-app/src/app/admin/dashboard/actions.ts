"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { retriageClaimForAdmin } from "@/lib/insurance";

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function requireAdminUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }
  if (user.role !== "admin") {
    redirect("/dashboard");
  }
  return user;
}

export async function retriageClaimAction(formData: FormData) {
  await requireAdminUser();
  const claimId = readText(formData, "claimId");
  if (!claimId) {
    redirect("/admin/dashboard?error=missing_claim");
  }

  await retriageClaimForAdmin(claimId);
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard?updated=1");
}

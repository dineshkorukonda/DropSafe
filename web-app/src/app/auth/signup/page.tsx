import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthShell } from "@/app/auth/auth-shell";
import { signupAction } from "@/app/auth/actions";
import { PasswordInput } from "@/components/auth/password-input";
import { SubmitButton } from "@/components/auth/submit-button";
import { getCurrentUser } from "@/lib/auth";

const signupErrors: Record<string, string> = {
  missing_fields: "Fill in all fields before continuing.",
  weak_password: "Use at least 8 characters for the password.",
  password_mismatch: "Passwords do not match.",
  email_in_use: "An account already exists for that email.",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await getCurrentUser();
  if (user) {
    redirect(user.onboarding_completed_at ? "/dashboard" : "/onboarding");
  }

  const params = await searchParams;
  const error = typeof params.error === "string" ? signupErrors[params.error] : null;

  return (
    <AuthShell
      eyebrow="Create account"
      title="Start with DropSafe"
      description="Create a worker account backed by Neon PostgreSQL so policy and claim data can attach to a real user record."
      footerLabel="Already registered?"
      footerHref="/auth/login"
      footerLinkText="Sign in"
    >
      <form action={signupAction} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium text-zinc-700">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white"
            placeholder="Aarav Sharma"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white"
            placeholder="worker@dropsafe.app"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <PasswordInput
            id="password"
            label="Password"
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            minLength={8}
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Repeat password"
            minLength={8}
          />
        </div>
        {error ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {error}
          </p>
        ) : null}
        <SubmitButton idleLabel="Create account" pendingLabel="Creating account..." />
      </form>
      <div className="mt-5 text-sm text-zinc-500">
        Already verified and onboarded?{" "}
        <Link href="/auth/login" className="font-semibold text-zinc-900 underline-offset-4 hover:underline">
          Sign in
        </Link>
      </div>
    </AuthShell>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthShell } from "@/app/auth/auth-shell";
import { loginAction } from "@/app/auth/actions";
import { PasswordInput } from "@/components/auth/password-input";
import { SubmitButton } from "@/components/auth/submit-button";
import { getCurrentUser } from "@/lib/auth";

const loginErrors: Record<string, string> = {
  missing_fields: "Enter both email and password.",
  invalid_credentials: "The email or password is incorrect.",
};

const loginMessages: Record<string, string> = {
  already_verified: "Your email is already verified. You can sign in now.",
  password_reset: "Your password was reset. Sign in with the new password.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await getCurrentUser();
  if (user) {
    redirect(user.onboarding_completed_at ? "/dashboard" : "/onboarding");
  }

  const params = await searchParams;
  const error = typeof params.error === "string" ? loginErrors[params.error] : null;
  const message =
    typeof params.message === "string" ? loginMessages[params.message] : null;

  return (
    <AuthShell
      eyebrow="Sign in"
      title="Welcome back"
      description="Use your DropSafe account to review policies, claims, and payout activity."
      footerLabel="Need an account?"
      footerHref="/auth/signup"
      footerLinkText="Create one"
    >
      <form action={loginAction} className="space-y-5">
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
        <PasswordInput
          id="password"
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
        />
        {message ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {error}
          </p>
        ) : null}
        <SubmitButton idleLabel="Sign in" pendingLabel="Signing in..." />
      </form>
      <div className="mt-5 flex items-center justify-between gap-3 text-sm text-zinc-500">
        <Link href="/auth/forgot-password" className="font-semibold text-zinc-900 underline-offset-4 hover:underline">
          Forgot password?
        </Link>
      </div>
      <div className="mt-3 text-sm text-zinc-500">
        New here?{" "}
        <Link href="/auth/signup" className="font-semibold text-zinc-900 underline-offset-4 hover:underline">
          Create your account
        </Link>
      </div>
    </AuthShell>
  );
}

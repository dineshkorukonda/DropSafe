import Link from "next/link";
import { redirect } from "next/navigation";

import {
  resendVerificationAction,
  verifyEmailAction,
} from "@/app/auth/actions";
import { AuthShell } from "@/app/auth/auth-shell";
import { SubmitButton } from "@/components/auth/submit-button";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const errors: Record<string, string> = {
  invalid_token: "That verification link is invalid or has expired.",
  missing_email: "Enter an email address to resend the verification link.",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await getCurrentUser();
  if (user?.email_verified_at && user.onboarding_completed_at) {
    redirect("/dashboard");
  }
  if (user?.email_verified_at && !user.onboarding_completed_at) {
    redirect("/onboarding");
  }

  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const email = typeof params.email === "string" ? params.email : "";
  const sent = params.sent === "1";
  const error = typeof params.error === "string" ? errors[params.error] : null;

  return (
    <AuthShell
      eyebrow="Verify email"
      title="Check your inbox"
      description="We require email verification before sign-in so password recovery and policy alerts have a trusted destination."
      footerLabel="Already verified?"
      footerHref="/auth/login"
      footerLinkText="Return to login"
    >
      {token ? (
        <form action={verifyEmailAction} className="space-y-5">
          <input type="hidden" name="token" value={token} />
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            Verification link detected. Continue to activate your account and start onboarding.
          </p>
          <SubmitButton idleLabel="Verify email" pendingLabel="Verifying..." />
        </form>
      ) : (
        <form action={resendVerificationAction} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={email}
              autoComplete="email"
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white"
              placeholder="worker@dropsafe.app"
            />
          </div>
          {sent ? (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
              Verification instructions were sent. If SMTP is not configured, check the server log for the fallback link.
            </p>
          ) : null}
          {error ? (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {error}
            </p>
          ) : null}
          <SubmitButton idleLabel="Resend verification" pendingLabel="Sending..." />
        </form>
      )}
      <div className="mt-5 text-sm text-zinc-500">
        Forgot which address you used?{" "}
        <Link href="/auth/signup" className="font-semibold text-zinc-900 underline-offset-4 hover:underline">
          Create another account
        </Link>
      </div>
    </AuthShell>
  );
}

import Link from "next/link";

import { forgotPasswordAction } from "@/app/auth/actions";
import { AuthShell } from "@/app/auth/auth-shell";
import { SubmitButton } from "@/components/auth/submit-button";

const errors: Record<string, string> = {
  missing_email: "Enter your account email to continue.",
};

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const email = typeof params.email === "string" ? params.email : "";
  const sent = params.sent === "1";
  const error = typeof params.error === "string" ? errors[params.error] : null;

  return (
    <AuthShell
      eyebrow="Forgot password"
      title="Reset account access"
      description="We will send a password reset link to the email on file. For privacy, the response stays the same even if the address does not exist."
      footerLabel="Remembered it?"
      footerHref="/auth/login"
      footerLinkText="Back to login"
    >
      <form action={forgotPasswordAction} className="space-y-5">
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
            If an account exists, password reset instructions were sent. If SMTP is not configured, check the server log for the fallback link.
          </p>
        ) : null}
        {error ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {error}
          </p>
        ) : null}
        <SubmitButton idleLabel="Send reset link" pendingLabel="Sending..." />
      </form>
      <div className="mt-5 text-sm text-zinc-500">
        Need a new account?{" "}
        <Link href="/auth/signup" className="font-semibold text-zinc-900 underline-offset-4 hover:underline">
          Sign up
        </Link>
      </div>
    </AuthShell>
  );
}

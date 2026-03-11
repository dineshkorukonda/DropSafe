import Link from "next/link";

import { resetPasswordAction } from "@/app/auth/actions";
import { AuthShell } from "@/app/auth/auth-shell";
import { PasswordInput } from "@/components/auth/password-input";
import { SubmitButton } from "@/components/auth/submit-button";
import { isPasswordResetTokenValid } from "@/lib/auth";

const errors: Record<string, string> = {
  missing_fields: "Fill in the password fields before continuing.",
  weak_password: "Use at least 8 characters for the new password.",
  password_mismatch: "Passwords do not match.",
  invalid_token: "That reset link is invalid or has expired.",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const error = typeof params.error === "string" ? errors[params.error] : null;
  const tokenValid = token ? await isPasswordResetTokenValid(token) : false;

  return (
    <AuthShell
      eyebrow="Reset password"
      title="Choose a new password"
      description="Set a new password for your verified DropSafe account."
      footerLabel="Want to sign in instead?"
      footerHref="/auth/login"
      footerLinkText="Back to login"
    >
      {token && tokenValid ? (
        <form action={resetPasswordAction} className="space-y-5">
          <input type="hidden" name="token" value={token} />
          <PasswordInput
            label="New password"
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            minLength={8}
          />
          <PasswordInput
            label="Confirm new password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Repeat password"
            minLength={8}
          />
          {error ? (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {error}
            </p>
          ) : null}
          <SubmitButton idleLabel="Reset password" pendingLabel="Updating..." />
        </form>
      ) : (
        <div className="space-y-5">
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {error ?? "This password reset link is invalid or has expired."}
          </p>
          <Link
            href="/auth/forgot-password"
            className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Request a new reset link
          </Link>
        </div>
      )}
    </AuthShell>
  );
}

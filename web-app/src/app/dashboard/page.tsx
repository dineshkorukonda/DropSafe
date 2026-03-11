import Link from "next/link";
import { redirect } from "next/navigation";

import { logoutAction } from "@/app/auth/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, getOnboardingProfile } from "@/lib/auth";

export default async function DashboardPage() {
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

  const profile = await getOnboardingProfile(user.id);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_100%)] px-6 py-10 text-zinc-950">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-5 rounded-[2rem] border border-zinc-200/70 bg-white/85 p-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] backdrop-blur md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-800">
              Auth ready
            </Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
              Welcome, {user.full_name}
            </h1>
            <p className="mt-3 max-w-2xl text-zinc-600">
              Your account is now backed by Neon PostgreSQL. This is the base state
              for policies, claims, and payouts to attach to a real signed-in user.
            </p>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="outline" size="lg" className="h-11 rounded-2xl px-5">
              Log out
            </Button>
          </form>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="border border-zinc-200/70 bg-white/80">
            <CardHeader>
              <CardTitle>User profile</CardTitle>
              <CardDescription>Stored across Neon user and onboarding tables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-zinc-600">
              <p className="font-medium text-zinc-900">{user.full_name}</p>
              <p>{user.email}</p>
              <p>{profile?.platform ?? "Platform pending"} in {profile?.city ?? "City pending"}</p>
              <p className="pt-2 text-xs uppercase tracking-[0.18em] text-zinc-400">{user.id}</p>
            </CardContent>
          </Card>

          <Card className="border border-zinc-200/70 bg-white/80">
            <CardHeader>
              <CardTitle>Coverage setup</CardTitle>
              <CardDescription>Captured during multi-step onboarding</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-zinc-600">
              {profile
                ? `Working about ${profile.hours_per_week ?? 0} hours per week with a target coverage of INR ${profile.coverage_amount ?? "0"} and payout method ${profile.payout_method ?? "not set"}.`
                : "Onboarding details have not been captured yet."}
            </CardContent>
          </Card>

          <Card className="border border-zinc-200/70 bg-white/80">
            <CardHeader>
              <CardTitle>Auth model</CardTitle>
              <CardDescription>Verification, recovery, and session gating</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-zinc-600">
              Email verification gates login, password reset is email-token based, and sessions remain DB-backed for server-side access control.
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-sm text-zinc-500">
          Need to test the public entry point again?{" "}
          <Link href="/" className="font-semibold text-zinc-900 underline-offset-4 hover:underline">
            Return to the landing page
          </Link>
          .
        </div>
      </div>
    </main>
  );
}

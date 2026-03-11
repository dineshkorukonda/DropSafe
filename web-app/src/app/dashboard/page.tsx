import Link from "next/link";
import { redirect } from "next/navigation";

import { logoutAction } from "@/app/auth/actions";
import { refreshRiskSnapshotAction, submitClaimAction } from "@/app/dashboard/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCurrentUser, getOnboardingProfile } from "@/lib/auth";
import { getUserDashboardData } from "@/lib/insurance";

export const dynamic = "force-dynamic";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getClaimBadgeVariant(status: string) {
  if (status === "fraud_check") {
    return "destructive";
  }
  if (status === "approved_pending_payout") {
    return "default";
  }
  return "outline";
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
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
  const data = await getUserDashboardData(user.id);
  const params = await searchParams;
  const claimSubmitted = params.claim === "submitted";
  const claimError = params.error === "invalid_claim";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_100%)] px-6 py-10 text-zinc-950">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-5 rounded-[2rem] border border-zinc-200/70 bg-white/85 p-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] backdrop-blur md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-800">
              Worker dashboard
            </Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
              Welcome, {user.full_name}
            </h1>
            <p className="mt-3 max-w-2xl text-zinc-600">
              Live policy, claim, payout, and LLM risk insights for your account.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {user.role === "admin" ? (
              <Button variant="outline" size="lg" className="h-11 rounded-2xl px-5" render={<Link href="/admin/dashboard" />}>
                Admin dashboard
              </Button>
            ) : null}
            <form action={logoutAction}>
              <Button type="submit" variant="outline" size="lg" className="h-11 rounded-2xl px-5">
                Log out
              </Button>
            </form>
          </div>
        </div>

        {claimSubmitted ? (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-900">
            Claim submitted successfully. Triage status is now available below.
          </p>
        ) : null}
        {claimError ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900">
            Enter a valid claim amount and incident details.
          </p>
        ) : null}

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border border-zinc-200/70 bg-white/80">
            <CardHeader>
              <CardDescription>Active coverage</CardDescription>
              <CardTitle>{formatCurrency(data.policy.coverage)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-zinc-600">
              <p>Platform: {profile?.platform ?? "Pending"}</p>
              <p>City: {profile?.city ?? "Pending"}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{data.policy.status}</p>
            </CardContent>
          </Card>

          <Card className="border border-zinc-200/70 bg-white/80">
            <CardHeader>
              <CardDescription>Current premium</CardDescription>
              <CardTitle>{formatCurrency(data.policy.premium)}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-zinc-600">
              Base {formatCurrency(data.policy.basePremium)} × {data.policy.premiumMultiplier.toFixed(2)}
            </CardContent>
          </Card>

          <Card className="border border-zinc-200/70 bg-white/80">
            <CardHeader>
              <CardDescription>Open claims</CardDescription>
              <CardTitle>{data.openClaims}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-zinc-600">
              Coverage period: {new Date(data.policy.startDate).toLocaleDateString()} -{" "}
              {new Date(data.policy.endDate).toLocaleDateString()}
            </CardContent>
          </Card>

          <Card className="border border-zinc-200/70 bg-white/80">
            <CardHeader>
              <CardDescription>Total payouts received</CardDescription>
              <CardTitle>{formatCurrency(data.totalPaidOut)}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-zinc-600">
              Payout method: {profile?.payout_method ?? "Not configured"}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
          <Card className="border border-zinc-200/70 bg-white/80">
            <CardHeader>
              <CardTitle>LLM risk snapshot</CardTitle>
              <CardDescription>
                Latest AI underwriting recommendation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Risk score {data.policy.riskScore.toFixed(2)}</Badge>
                <Badge variant="outline">{data.latestRisk?.source ?? "pending"}</Badge>
              </div>
              <p className="text-sm text-zinc-600">
                {data.latestRisk?.summary ?? "Run risk refresh to generate your first snapshot."}
              </p>
              <div className="space-y-2">
                {data.latestRisk?.factors?.slice(0, 4).map((factor, index) => {
                  const current = factor as { label?: string; impact?: string; rationale?: string };
                  return (
                    <div key={`${current.label ?? "factor"}-${index}`} className="rounded-xl border bg-zinc-50 p-3">
                      <p className="text-sm font-medium">{current.label ?? "Risk factor"}</p>
                      <p className="text-xs text-zinc-500">{current.impact ?? "medium"}</p>
                      <p className="mt-1 text-sm text-zinc-600">{current.rationale ?? ""}</p>
                    </div>
                  );
                })}
              </div>
              <form action={refreshRiskSnapshotAction}>
                <Button type="submit" className="w-full">
                  Refresh risk with LLM
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border border-zinc-200/70 bg-white/80">
            <CardHeader>
              <CardTitle>Submit claim</CardTitle>
              <CardDescription>
                Claims are triaged automatically by LLM and routed to payout or review.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={submitClaimAction} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-zinc-700">Claim amount (INR)</span>
                    <input
                      name="amount"
                      type="number"
                      min="500"
                      step="100"
                      required
                      className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm outline-none transition focus:border-zinc-900 focus:bg-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-zinc-700">Claim reason</span>
                    <input
                      name="reason"
                      type="text"
                      required
                      placeholder="Rain disruption"
                      className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm outline-none transition focus:border-zinc-900 focus:bg-white"
                    />
                  </label>
                </div>
                <label className="space-y-2 text-sm">
                  <span className="font-medium text-zinc-700">Incident details</span>
                  <textarea
                    name="incidentDescription"
                    required
                    rows={4}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm outline-none transition focus:border-zinc-900 focus:bg-white"
                    placeholder="Describe what happened, where, and estimated work loss."
                  />
                </label>
                <Button type="submit" className="w-full">
                  Submit and triage claim
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-zinc-200/70 bg-white/80">
          <CardHeader>
            <CardTitle>Recent claim history</CardTitle>
            <CardDescription>Track AI disposition and payout status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>AI summary</TableHead>
                  <TableHead>Payout</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.claims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell>
                      <div className="font-medium">{claim.reason}</div>
                      <div className="text-xs text-zinc-500">{formatCurrency(claim.amount)}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getClaimBadgeVariant(claim.status)}>{claim.status}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[280px]">
                      <p className="truncate text-sm text-zinc-700">{claim.aiSummary ?? "Pending triage"}</p>
                      <p className="text-xs text-zinc-500">
                        {(claim.aiConfidence * 100).toFixed(0)}% confidence · {claim.llmSource ?? "pending"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{claim.payoutStatus ?? "—"}</div>
                      <div className="text-xs text-zinc-500">
                        {claim.payoutAmount ? formatCurrency(claim.payoutAmount) : ""}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-zinc-500">
                      {new Date(claim.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {data.claims.length === 0 ? (
              <>
                <Separator />
                <p className="text-sm text-zinc-500">No claims yet. Submit your first claim above.</p>
              </>
            ) : null}
          </CardContent>
        </Card>

        <div className="text-sm text-zinc-500">
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

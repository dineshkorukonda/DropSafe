import Link from "next/link";
import { redirect } from "next/navigation";

import { logoutAction } from "@/app/auth/actions";
import { retriageClaimAction } from "@/app/admin/dashboard/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCurrentUser } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/insurance";

export const dynamic = "force-dynamic";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusVariant(status: string) {
  if (status === "fraud_check") {
    return "destructive";
  }
  if (status === "approved_pending_payout") {
    return "default";
  }
  return "outline";
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }
  if (!user.email_verified_at || !user.onboarding_completed_at) {
    redirect("/dashboard");
  }
  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const updated = params.updated === "1";
  const error = params.error === "missing_claim";
  const data = await getAdminDashboardData();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f0f9ff_100%)] px-6 py-10 text-zinc-950">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <Badge variant="outline">Admin operations</Badge>
            <h1 className="text-3xl font-semibold tracking-tight">DropSafe admin dashboard</h1>
            <p className="text-sm text-zinc-600">
              Unified view of active workers, claims triage, and payout movement.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" render={<Link href="/dashboard" />}>
              User view
            </Button>
            <form action={logoutAction}>
              <Button variant="outline" type="submit">
                Log out
              </Button>
            </form>
          </div>
        </section>

        {updated ? (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-900">
            Claim triage refreshed successfully.
          </p>
        ) : null}
        {error ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900">
            Claim id is missing for retriage.
          </p>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <Card>
            <CardHeader>
              <CardDescription>Active workers</CardDescription>
              <CardTitle>{data.metrics.activeUsers}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Active policies</CardDescription>
              <CardTitle>{data.metrics.activePolicies}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Open claims</CardDescription>
              <CardTitle>{data.metrics.openClaims}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Fraud escalations</CardDescription>
              <CardTitle>{data.metrics.escalatedClaims}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total paid out</CardDescription>
              <CardTitle>{formatCurrency(data.metrics.totalPaid)}</CardTitle>
            </CardHeader>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.2fr_2fr]">
          <Card>
            <CardHeader>
              <CardTitle>Risk by city</CardTitle>
              <CardDescription>Average active policy risk score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.riskByCity.length === 0 ? (
                <p className="text-sm text-zinc-500">No risk snapshots available yet.</p>
              ) : (
                data.riskByCity.map((row) => (
                  <div key={row.city} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{row.city}</span>
                      <span className="text-zinc-500">
                        Score {row.avgRiskScore.toFixed(2)} · {row.workers} workers
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-100">
                      <div
                        className="h-2 rounded-full bg-zinc-900"
                        style={{ width: `${Math.min(100, row.avgRiskScore * 100)}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent claims queue</CardTitle>
              <CardDescription>
                Review rate: {data.metrics.reviewRate}% of claims currently open
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Worker</TableHead>
                    <TableHead>Claim</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>AI triage</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recentClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell>
                        <div className="font-medium">{claim.workerName}</div>
                        <div className="text-xs text-zinc-500">{claim.workerEmail}</div>
                      </TableCell>
                      <TableCell>
                        <div>{claim.reason}</div>
                        <div className="text-xs text-zinc-500">{formatCurrency(claim.amount)}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(claim.status)}>{claim.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{claim.aiDisposition ?? "Pending triage"}</div>
                        <div className="text-xs text-zinc-500">
                          Confidence {(claim.aiConfidence * 100).toFixed(0)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{claim.llmSource}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <form action={retriageClaimAction}>
                          <input type="hidden" name="claimId" value={claim.id} />
                          <Button type="submit" size="sm" variant="outline">
                            Re-run triage
                          </Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {data.recentClaims.length === 0 ? (
                <>
                  <Separator />
                  <p className="text-sm text-zinc-500">No claims available yet.</p>
                </>
              ) : null}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

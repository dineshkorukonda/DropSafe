import { redirect } from "next/navigation";

import { saveOnboardingAction } from "@/app/auth/actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser, getOnboardingProfile } from "@/lib/auth";

const errors: Record<string, string> = {
  missing_fields: "Complete all fields in this step before continuing.",
};

const stepMeta = [
  { id: 1, title: "Work profile", copy: "Set the operating context for pricing and policy eligibility." },
  { id: 2, title: "Coverage fit", copy: "Capture weekly volume and target protection amount." },
  { id: 3, title: "Payout setup", copy: "Choose how claims and alerts should be handled." },
];

export default async function OnboardingPage({
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
  if (user.onboarding_completed_at) {
    redirect("/dashboard");
  }

  const profile = await getOnboardingProfile(user.id);
  const params = await searchParams;
  const requestedStep = Number(typeof params.step === "string" ? params.step : "1");
  const step = [1, 2, 3].includes(requestedStep) ? requestedStep : 1;
  const error = typeof params.error === "string" ? errors[params.error] : null;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eef7f2_0%,#f7fafc_45%,#eef2ff_100%)] px-6 py-10 text-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-6">
          <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-800">
            Worker onboarding
          </Badge>
          <div>
            <h1 className="text-5xl font-semibold tracking-[-0.05em]">Complete your DropSafe profile.</h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600">
              This onboarding sequence follows the product spec: worker setup, coverage preferences, then payout and notification readiness.
            </p>
          </div>
          <div className="space-y-4">
            {stepMeta.map((item) => (
              <div
                key={item.id}
                className={`rounded-3xl border p-5 ${step === item.id ? "border-zinc-950 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)]" : "border-white/70 bg-white/60"}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex size-9 items-center justify-center rounded-full text-sm font-semibold ${step === item.id ? "bg-zinc-950 text-white" : "bg-zinc-200 text-zinc-700"}`}>
                    {item.id}
                  </div>
                  <p className="text-base font-semibold">{item.title}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <Card className="border border-white/80 bg-white/88 py-0 shadow-[0_30px_80px_-32px_rgba(15,23,42,0.45)] backdrop-blur">
          <CardContent className="p-8 sm:p-10">
            {error ? (
              <p className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {error}
              </p>
            ) : null}

            {step === 1 ? (
              <form action={saveOnboardingAction} className="space-y-5">
                <input type="hidden" name="step" value="1" />
                <div className="space-y-2">
                  <label htmlFor="platform" className="text-sm font-medium text-zinc-700">Delivery platform</label>
                  <select id="platform" name="platform" defaultValue={profile?.platform ?? ""} className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white">
                    <option value="" disabled>Select a platform</option>
                    <option value="Swiggy">Swiggy</option>
                    <option value="Zomato">Zomato</option>
                    <option value="Blinkit">Blinkit</option>
                    <option value="Zepto">Zepto</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium text-zinc-700">Primary city</label>
                  <input id="city" name="city" type="text" required defaultValue={profile?.city ?? ""} className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white" placeholder="Bengaluru" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="vehicleType" className="text-sm font-medium text-zinc-700">Vehicle type</label>
                  <select id="vehicleType" name="vehicleType" defaultValue={profile?.vehicle_type ?? ""} className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white">
                    <option value="" disabled>Select a vehicle type</option>
                    <option value="Bike">Bike</option>
                    <option value="Scooter">Scooter</option>
                    <option value="EV Scooter">EV Scooter</option>
                    <option value="Cycle">Cycle</option>
                  </select>
                </div>
                <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800">
                  Continue to coverage
                </button>
              </form>
            ) : null}

            {step === 2 ? (
              <form action={saveOnboardingAction} className="space-y-5">
                <input type="hidden" name="step" value="2" />
                <div className="space-y-2">
                  <label htmlFor="hoursPerWeek" className="text-sm font-medium text-zinc-700">Hours worked per week</label>
                  <input id="hoursPerWeek" name="hoursPerWeek" type="number" min="1" max="168" required defaultValue={profile?.hours_per_week ?? ""} className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white" placeholder="40" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="weeklyIncome" className="text-sm font-medium text-zinc-700">Weekly income (INR)</label>
                    <input id="weeklyIncome" name="weeklyIncome" type="number" min="1000" step="100" required defaultValue={profile?.weekly_income ?? ""} className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white" placeholder="5000" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="coverageAmount" className="text-sm font-medium text-zinc-700">Target coverage (INR)</label>
                    <input id="coverageAmount" name="coverageAmount" type="number" min="5000" step="500" required defaultValue={profile?.coverage_amount ?? ""} className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white" placeholder="50000" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <a href="/onboarding?step=1" className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl border border-zinc-200 px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-900">
                    Back
                  </a>
                  <button type="submit" className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800">
                    Continue to payout
                  </button>
                </div>
              </form>
            ) : null}

            {step === 3 ? (
              <form action={saveOnboardingAction} className="space-y-5">
                <input type="hidden" name="step" value="3" />
                <div className="space-y-2">
                  <label htmlFor="payoutMethod" className="text-sm font-medium text-zinc-700">Preferred payout method</label>
                  <select id="payoutMethod" name="payoutMethod" defaultValue={profile?.payout_method ?? ""} className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white">
                    <option value="" disabled>Select a payout method</option>
                    <option value="UPI">UPI</option>
                    <option value="Bank transfer">Bank transfer</option>
                    <option value="Platform wallet">Platform wallet</option>
                  </select>
                </div>
                <label className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    name="alertsOptIn"
                    defaultChecked={profile?.alerts_opt_in ?? true}
                    className="mt-1 size-4 rounded border-zinc-300 text-zinc-950"
                  />
                  <span>
                    Send weather risk, claim decision, and payout status updates to this account.
                  </span>
                </label>
                <div className="flex gap-3">
                  <a href="/onboarding?step=2" className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl border border-zinc-200 px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-900">
                    Back
                  </a>
                  <button type="submit" className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500">
                    Finish onboarding
                  </button>
                </div>
              </form>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

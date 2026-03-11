import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  footerLabel: string;
  footerHref: string;
  footerLinkText: string;
  children: ReactNode;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  footerLabel,
  footerHref,
  footerLinkText,
  children,
}: AuthShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#f6f4ee_0%,#e4efe6_45%,#d8e6fb_100%)] px-6 py-10 text-zinc-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(7,89,133,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(22,101,52,0.15),transparent_28%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="max-w-2xl">
          <Badge variant="outline" className="border-zinc-900/10 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-zinc-700">
            {eyebrow}
          </Badge>
          <h1 className="mt-5 max-w-xl text-5xl font-semibold tracking-[-0.06em] text-balance md:text-7xl">
            Protect earnings before the weather turns.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-zinc-700">
            DropSafe gives delivery workers a direct path into parametric coverage,
            instant account access, and faster claim decisions.
          </p>
          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
            {[
              ["Fast onboarding", "Create an account in under a minute."],
              ["Neon-backed auth", "Users and sessions live in PostgreSQL."],
              ["Built for expansion", "Ready for policy and claims flows next."],
            ].map(([label, copy]) => (
              <div key={label} className="rounded-3xl border border-white/70 bg-white/65 p-4 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.6)] backdrop-blur">
                <p className="text-sm font-semibold">{label}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <Card className="border border-white/80 bg-white/88 py-0 shadow-[0_30px_80px_-32px_rgba(15,23,42,0.45)] backdrop-blur">
          <CardContent className="p-8 sm:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{description}</p>
            <div className="mt-8">{children}</div>
            <p className="mt-6 text-sm text-zinc-600">
              {footerLabel}{" "}
              <Link href={footerHref} className="font-semibold text-zinc-950 underline-offset-4 hover:underline">
                {footerLinkText}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

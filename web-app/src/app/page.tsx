"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CloudRain, ThermometerSun, AlertTriangle, ShieldCheck,
  Banknote, CloudLightning, Activity, Server, Sparkles, Filter, Clock, Zap, Target, ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { BrowserMockup } from "@/components/ui/browser-mockup";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

// --- Data ---
const marketData = [
  { year: '2020', workers: 8 },
  { year: '2022', workers: 11 },
  { year: '2024', workers: 15 },
  { year: '2026', workers: 18 },
  { year: '2028', workers: 20 },
  { year: '2030', workers: 23 },
];

const incomeLossData = [
  { daysLost: '0 Days', income: 5000 },
  { daysLost: '1 Day', income: 4200 },
  { daysLost: '2 Days', income: 3400 },
  { daysLost: '3 Days', income: 2600 },
  { daysLost: '4 Days', income: 1800 },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-zinc-200">

      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:24px_24px] z-0"
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-950 mt-12"
          >
            DropSafe.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-3xl text-zinc-500 max-w-2xl font-medium"
          >
            AI-powered parametric income protection for India's 15M+ delivery partners.
          </motion.p>
        </div>
      </section>

      {/* 2. PROBLEM STATEMENT */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">The Hidden Crisis in the Gig Economy.</h2>
            <p className="text-lg text-zinc-600 leading-relaxed mb-6">
              India's gig economy is scaling rapidly, powering platforms like Swiggy, Zomato, and Blinkit. These workers depend entirely on daily deliveries for their income.
            </p>
            <p className="text-lg text-zinc-600 leading-relaxed mb-6">
              When heavy rainfall, extreme heat, or floods strike, deliveries slow down or stop completely. Unlike salaried employees, gig workers do not have a safety net,
              resulting in a <strong className="text-zinc-950">20–30% drop in weekly earnings</strong> from just a few disrupted days.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="border-none shadow-xl shadow-zinc-100 bg-zinc-50/50">
              <CardHeader className="pb-2">
                <CloudRain className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle className="text-2xl">Monsoons</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-500">Severe rain halts deliveries entirely, wiping out daily wages.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-zinc-100 bg-zinc-50/50 mt-12">
              <CardHeader className="pb-2">
                <ThermometerSun className="w-8 h-8 text-orange-500 mb-2" />
                <CardTitle className="text-2xl">Heatwaves</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-500">Hazardous heat severely impacts active working hours safely.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto opacity-50" />

      {/* 3. OUR SOLUTION */}
      <section className="py-32 px-6 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Automated Protection without the Paperwork.</h2>
            <p className="text-lg text-zinc-600">
              DropSafe uses real-time AI and location APIs to monitor disruptions. No manual claims. Just proactive, data-driven financial safety.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center relative">
            <div className="hidden md:block absolute top-[40%] left-[20%] right-[20%] h-[2px] bg-zinc-200 z-0" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border border-zinc-100 flex items-center justify-center mb-6">
                <Activity className="w-10 h-10 text-zinc-900" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Constant Monitoring</h3>
              <p className="text-zinc-600">We analyze live weather and hazard data within the worker's delivery zone.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border border-zinc-100 flex items-center justify-center mb-6">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Threshold Detection</h3>
              <p className="text-zinc-600">When conditions become hazardous, the AI risk engine flags an event.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-zinc-950 rounded-2xl shadow-lg border border-zinc-900 flex items-center justify-center mb-6">
                <Banknote className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Automated Payout</h3>
              <p className="text-zinc-600">Claims are auto-triggered to compensate the worker for the estimated lost income block.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UNIQUE FEATURES (NEW) */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why DropSafe is Different.</h2>
            <p className="text-lg text-zinc-600">
              Traditional insurance models fail gig workers. We reimagined income protection from the ground up for the modern delivery partner.
            </p>
          </div>
          <div className="md:w-2/3 grid gap-6">
            <Card className="border border-zinc-100 shadow-md">
              <CardContent className="p-6 flex gap-4">
                <div className="mt-1 bg-zinc-100 p-2 rounded-lg h-fit">
                  <Clock className="w-6 h-6 text-zinc-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Micro-Duration Coverage</h3>
                  <p className="text-zinc-600">Instead of locking workers into annual contracts, DropSafe offers weekly, opt-in premiums. A delivery partner can buy protection exclusively for the monsoon season or peak heatwave weeks.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-zinc-100 shadow-md">
              <CardContent className="p-6 flex gap-4">
                <div className="mt-1 bg-zinc-100 p-2 rounded-lg h-fit">
                  <Filter className="w-6 h-6 text-zinc-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Dynamic Risk Profiling</h3>
                  <p className="text-zinc-600">Premiums aren't flat. Our AI evaluates hyper-local weather risk and historical data for a specific delivery zone to generate a fair, personalized weekly premium for each worker.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-zinc-100 shadow-md bg-zinc-950 text-white">
              <CardContent className="p-6 flex gap-4">
                <div className="mt-1 bg-zinc-800 p-2 rounded-lg h-fit">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Zero-Touch Resolution</h3>
                  <p className="text-zinc-400">No damage photos. No adjuster calls. If a defined disruption threshold (e.g., 50mm rainfall in 2 hours) is breached in their zone, the policy pays out automatically to their wallet.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="max-w-6xl mx-auto opacity-50" />

      {/* 5. BUSINESS PLAN (NEW) */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">Our Business Model.</h2>
        <div className="grid md:grid-cols-2 gap-12 text-zinc-700">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-zinc-900" />
              <h3 className="text-2xl font-bold text-zinc-900">B2B2C Platform Integration</h3>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              Acquiring workers individually is expensive. DropSafe operates on a B2B2C model, offering our API seamlessly into the worker-side apps of major platforms (Swiggy, Zomato, Zepto).
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                <span><strong className="text-zinc-900">For the Platform:</strong> Improved worker retention and welfare with zero balance sheet risk to the platform itself.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                <span><strong className="text-zinc-900">For the Worker:</strong> One-tap weekly enrolment directly using their existing wallet balance or earnings.</span>
              </li>
            </ul>
          </div>
          <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
            <h3 className="text-2xl font-bold text-zinc-900 mb-6">Unit Economics & Revenue</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-semibold text-zinc-900">Platform Fee</span>
                  <span className="font-mono text-zinc-500">10-15%</span>
                </div>
                <p className="text-sm">We take a platform fee out of the weekly premium collected for risk modeling and API facilitation before passing the remainder to the underwriting capital provider.</p>
              </div>
              <Separator />
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-semibold text-zinc-900">Average Weekly Premium</span>
                  <span className="font-mono text-zinc-500">₹30–₹50</span>
                </div>
                <p className="text-sm">Highly affordable chunked payments make adoption frictionless compared to lumpsum policies.</p>
              </div>
              <Separator />
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-semibold text-zinc-900">Scale Potential</span>
                  <span className="font-mono text-zinc-500">1M+ users</span>
                </div>
                <p className="text-sm">At just 10% market penetration of India's delivery workforce, DropSafe processes over ₹150Cr in micro-premiums annually.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MARKET OPPORTUNITY */}
      <section className="py-32 px-6 max-w-6xl mx-auto bg-zinc-50 rounded-[3rem] my-12 hidden md:block">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">A Massive Addressable Market.</h2>

        <div className="grid lg:grid-cols-2 gap-16 px-12">
          <Card className="border-none shadow-2xl shadow-zinc-200/50 bg-white">
            <CardHeader>
              <CardTitle>Gig Economy Workforce (Millions)</CardTitle>
              <CardDescription>Projected growth of gig workers in India by 2030</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWorkers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#18181b" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip wrapperClassName="rounded-lg shadow-xl border-none" />
                  <Area type="monotone" dataKey="workers" stroke="#18181b" strokeWidth={3} fillOpacity={1} fill="url(#colorWorkers)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-2xl shadow-zinc-200/50 bg-white">
            <CardHeader>
              <CardTitle>Impact of Disruption (₹)</CardTitle>
              <CardDescription>Income curve based on days lost to weather</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeLossData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                  <XAxis dataKey="daysLost" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                  <Bar dataKey="income" fill="#18181b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 7. PERSONA SECTION */}
      <section className="py-24 px-6 bg-zinc-950 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <Badge className="bg-white/10 text-white hover:bg-white/20 mb-6">Persona</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Meet Ravi Kumar.</h2>
            <p className="text-xl text-zinc-400 mb-6 font-light leading-relaxed">
              26-year-old food delivery partner in Hyderabad. Drives 9–10 hours daily. Earns ~₹5,000 per week.
            </p>
            <p className="text-zinc-500 mb-8 leading-relaxed">
              During the monsoon, extreme conditions cause him to lose two full working days. Without a safety net, he cannot pay rent, fuel, or daily food expenses. DropSafe bridges the gap when the city stops moving.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-red-400 mb-1">Income Drop</p>
                <p className="text-3xl font-bold line-through text-zinc-500">₹3,400</p>
              </div>
              <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-400 mb-1">Protected Earnings</p>
                <p className="text-3xl font-bold text-white">₹5,000</p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-sm">
            {/* Phone Illustration for Persona */}
            <PhoneMockup className="scale-90 opacity-90 border-zinc-800">
              <div className="flex flex-col h-full">
                <div className="bg-zinc-950 p-6 pt-12 pb-6 flex-shrink-0">
                  <h3 className="text-white text-2xl font-bold">Active Coverage</h3>
                  <p className="text-zinc-400 text-sm">Zone: Hyderabad Metro</p>
                </div>
                <div className="p-4 flex-1 flex flex-col gap-4 bg-zinc-100">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-200">
                    <div className="flex justify-between items-center mb-4">
                      <CloudLightning className="text-red-500 w-8 h-8" />
                      <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-none">ALERT DETECTED</Badge>
                    </div>
                    <h4 className="font-bold text-zinc-950 text-lg">Heavy Rainfall</h4>
                    <p className="text-sm text-zinc-600 mb-4">You are advised to stay safe. Deliveries are disrupted.</p>
                    <Separator className="mb-4" />
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-zinc-500">Claim Auto-Triggered</span>
                      <span className="text-green-600 font-bold">+ ₹800</span>
                    </div>
                  </div>
                </div>
              </div>
            </PhoneMockup>
          </div>
        </div>
      </section>

      {/* 8. TECHNOLOGY STACK */}
      <section className="py-32 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-6">Powered by the Modern Web.</h2>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-16">
          Cloud-native, highly available microservices working seamlessly to process risk events natively.
        </p>

        <BrowserMockup className="max-w-4xl text-left shadow-2xl shadow-zinc-200/60 border-zinc-200">
          <div className="flex items-center gap-6 p-6 border-b border-zinc-100 bg-zinc-50/50">
            <ShieldCheck className="w-8 h-8 text-zinc-900" />
            <div>
              <h3 className="font-bold text-xl text-zinc-900">Admin Intelligence Dashboard</h3>
              <p className="text-sm text-zinc-500">Real-time mapping of disruption signals and policy evaluation</p>
            </div>
          </div>
          <div className="p-8 pb-12 flex gap-12 bg-white flex-col md:flex-row">
            <div className="md:w-1/3 flex flex-col gap-6">
              <div className="bg-zinc-100 h-24 rounded-xl flex items-center justify-center p-4 text-zinc-500 font-mono text-xs text-center border border-zinc-200">
                [ Mapbox GeoGrid Matrix Loading ]
              </div>
              <div className="bg-zinc-100 h-32 rounded-xl p-4 border border-zinc-200 flex flex-col justify-center">
                <div className="h-4 w-3/4 bg-zinc-300 rounded-full mb-3" />
                <div className="h-4 w-1/2 bg-zinc-300 rounded-full mb-3" />
                <div className="h-4 w-full bg-zinc-300 rounded-full" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h4 className="font-bold mb-4 flex items-center gap-2"><Server className="w-5 h-5 text-zinc-400" /> Core Infrastructure Stack</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Next.js 16", desc: "Edge functions & APIs" },
                  { name: "Neon PostgreSQL", desc: "Serverless Database" },
                  { name: "Google Gemini", desc: "AI Risk Prediction" },
                  { name: "React Native", desc: "Worker App" }
                ].map((t) => (
                  <div key={t.name} className="border border-zinc-200 p-4 rounded-xl bg-zinc-50 flex flex-col gap-1">
                    <span className="font-bold text-zinc-900 leading-none">{t.name}</span>
                    <span className="text-xs text-zinc-500">{t.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BrowserMockup>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-100 py-12 text-center text-zinc-500 text-sm">
        <p className="font-medium text-zinc-950">DropSafe.</p>
        <p className="mt-2 text-zinc-500">Designed by Team ZeroOne | KLEF (Deemed to be University) | DEVTrails 2026</p>
      </footer>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  CloudRain, ThermometerSun, AlertTriangle, ShieldCheck,
  Banknote, CloudLightning, Activity, Server, Filter, Clock, Zap, Target, ArrowRight,
  ShieldAlert, Car, HeartPulse, Wrench, CheckCircle2, XCircle, Play, Database, Smartphone, Cpu, Globe
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
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

  const [simulationLog, setSimulationLog] = useState<
    { time: string; message: string; type: "info" | "success" | "warning" }[]
  >([]);

  const runSimulation = (eventType: string) => {
    setSimulationLog([]); // Clear previous logs
    
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const steps = async () => {
      setSimulationLog(prev => [...prev, { time: new Date().toLocaleTimeString(), message: `Simulating ${eventType} trigger API...`, type: "info" }]);
      await delay(800);
      setSimulationLog(prev => [...prev, { time: new Date().toLocaleTimeString(), message: `Event Detected! Querying Gemini Risk Engine for severity.`, type: "warning" }]);
      await delay(1200);
      setSimulationLog(prev => [...prev, { time: new Date().toLocaleTimeString(), message: `Threshold Breached. Identifying affected delivery zones.`, type: "info" }]);
      await delay(900);
      setSimulationLog(prev => [...prev, { time: new Date().toLocaleTimeString(), message: `Verifying worker coverages in zone: Active (14,203 users).`, type: "success" }]);
      await delay(1000);
      setSimulationLog(prev => [...prev, { time: new Date().toLocaleTimeString(), message: `Calculating hourly income loss block.`, type: "info" }]);
      await delay(700);
      setSimulationLog(prev => [...prev, { time: new Date().toLocaleTimeString(), message: `Claim Engine: 14,203 claims generated autonomously. Payouts processed.`, type: "success" }]);
    };
    
    steps();
  };

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
            AI-powered parametric income protection for India&apos;s 15M+ delivery partners.
          </motion.p>
        </div>
      </section>

      {/* 2. PROBLEM STATEMENT */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">The Hidden Crisis in the Gig Economy.</h2>
            <p className="text-lg text-zinc-600 leading-relaxed mb-6">
              India&apos;s gig economy is scaling rapidly, powering platforms like Swiggy, Zomato, and Blinkit. These workers depend entirely on daily deliveries for their income.
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
              <p className="text-zinc-600">We analyze live weather and hazard data within the worker&apos;s delivery zone.</p>
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

      {/* 3.1 HOW IT WORKS (Merged from Phase-1) */}
      <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">The Autonomous Workflow.</h2>
          <div className="relative">
            <div className="absolute left-[28px] top-6 bottom-6 w-0.5 bg-zinc-200 md:left-1/2 md:-ml-px" />
            <div className="space-y-12 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/2 md:text-right pr-6 md:pr-12 hidden md:block">
                  <h4 className="text-xl font-bold">1. Worker Onboarding</h4>
                  <p className="text-zinc-600 mt-2">Workers register with Name, City, Platform & Avg. Earnings.</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold shrink-0 shadow-[0_0_0_8px_white] relative ml-0 md:ml-auto md:mr-auto z-10">1</div>
                <div className="md:w-1/2 pl-6 md:pl-12 flex-1 md:hidden">
                  <h4 className="text-xl font-bold">1. Worker Onboarding</h4>
                  <p className="text-zinc-600 mt-2">Workers register with Name, City, Platform & Avg. Earnings.</p>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block text-zinc-400 text-sm font-mono">`POST /api/workers`<br/>`{'{ city, role, income }'}`</div>
              </div>
              <div className="flex flex-col items-start md:flex-row md:items-center gap-6">
                <div className="md:w-1/2 md:text-right md:pr-12 hidden md:block text-zinc-400 text-sm font-mono">`GET /api/risk/premium`</div>
                <div className="w-14 h-14 rounded-full bg-white border border-zinc-300 text-zinc-900 flex items-center justify-center font-bold shadow-[0_0_0_8px_white] shrink-0 relative z-10 ml-0 md:ml-auto md:mr-auto">2</div>
                <div className="md:w-1/2 pl-6 md:pl-12 flex-1">
                  <h4 className="text-xl font-bold">2. Risk Engine Rating</h4>
                  <p className="text-zinc-600 mt-2">Calculates micro-duration premium based on history and location.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/2 md:text-right pr-6 md:pr-12 md:block">
                  <h4 className="text-xl font-bold">3. Parametric Trigger</h4>
                  <p className="text-zinc-600 mt-2">System polls external APIs. e.g. Rainfall &gt; 50mm hooks event.</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center font-bold shadow-[0_0_0_8px_white] shrink-0 relative z-10 ml-0 md:ml-auto md:mr-auto">3</div>
                <div className="md:w-1/2 pl-6 md:pl-12 hidden md:block text-zinc-400 text-sm font-mono">`Webhook: Weather API`</div>
              </div>
              <div className="flex flex-col items-start md:flex-row md:items-center gap-6">
                <div className="md:w-1/2 md:text-right md:pr-12 hidden md:block text-zinc-400 text-sm font-mono">`Verification Checksum`</div>
                <div className="w-14 h-14 rounded-full bg-white border border-zinc-300 text-zinc-900 flex items-center justify-center font-bold shadow-[0_0_0_8px_white] shrink-0 relative z-10 ml-0 md:ml-auto md:mr-auto">4</div>
                <div className="md:w-1/2 pl-6 md:pl-12 flex-1">
                  <h4 className="text-xl font-bold">4. Fraud Detection</h4>
                  <p className="text-zinc-600 mt-2">Verifies user location vs actual weather footprint.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/2 md:text-right pr-6 md:pr-12 md:block">
                  <h4 className="text-xl font-bold">5. Automated Claim Engine</h4>
                  <p className="text-zinc-600 mt-2">Estimates income block lost, pays out directly. Cycle complete.</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-[0_0_0_8px_white] shrink-0 relative z-10 ml-0 md:ml-auto md:mr-auto"><CheckCircle2 className="w-6 h-6" /></div>
                <div className="md:w-1/2 pl-6 md:pl-12 hidden md:block text-zinc-400 text-sm font-mono">`POST /api/claims/execute`</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.2 DISRUPTION TYPES (Merged from Phase-1) */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-b border-zinc-200">
        <h3 className="text-4xl font-bold tracking-tight mb-16 text-center">What is Covered?</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-green-200 bg-green-50/30 shadow-none">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-700"><CheckCircle2 className="w-5 h-5" /></div>
                <CardTitle className="text-green-900">Covered: External Disruptions</CardTitle>
              </div>
              <CardDescription className="text-green-800/80">Events outside the worker&apos;s control affecting entire geographic zones.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 font-medium text-green-900">
                <li className="flex items-center gap-3"><CloudRain className="w-5 h-5 opacity-70" /> Heavy Rain & Flooding</li>
                <li className="flex items-center gap-3"><ThermometerSun className="w-5 h-5 opacity-70" /> Extreme Heatwaves</li>
                <li className="flex items-center gap-3"><AlertTriangle className="w-5 h-5 opacity-70" /> Severe Air Pollution (AQI)</li>
                <li className="flex items-center gap-3"><ShieldAlert className="w-5 h-5 opacity-70" /> Curfews & Strikes</li>
                <li className="flex items-center gap-3"><Globe className="w-5 h-5 opacity-70" /> Structural Delivery Zone Closure</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-red-200 bg-red-50/30 shadow-none">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full text-red-700"><XCircle className="w-5 h-5" /></div>
                <CardTitle className="text-red-900">Not Covered: Individual Incidents</CardTitle>
              </div>
              <CardDescription className="text-red-800/80">Traditional insurance models already handle single-person incidents.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 font-medium text-red-900">
                <li className="flex items-center gap-3"><Car className="w-5 h-5 opacity-70" /> Road Accidents</li>
                <li className="flex items-center gap-3"><HeartPulse className="w-5 h-5 opacity-70" /> Medical Claims & Hospitalization</li>
                <li className="flex items-center gap-3"><HeartPulse className="w-5 h-5 opacity-70" /> Personal Health Insurance</li>
                <li className="flex items-center gap-3"><Wrench className="w-5 h-5 opacity-70" /> Vehicle Damage or Breakdowns</li>
              </ul>
            </CardContent>
          </Card>
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
                  <p className="text-zinc-600">Premiums aren&apos;t flat. Our AI evaluates hyper-local weather risk and historical data for a specific delivery zone to generate a fair, personalized weekly premium for each worker.</p>
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
                <p className="text-sm">At just 10% market penetration of India&apos;s delivery workforce, DropSafe processes over ₹150Cr in micro-premiums annually.</p>
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

      {/* 8. ARCHITECTURE & TECH */}
      <section className="py-24 px-6 bg-zinc-900 text-zinc-50 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 item-start">
            <div className="md:w-1/2">
               <h3 className="text-4xl font-bold tracking-tight mb-8">Data Flow Framework</h3>
               <div className="space-y-3">
                 <div className="bg-zinc-950 p-5 rounded-[1.5rem] flex items-center gap-4 border border-zinc-800">
                   <div className="bg-zinc-800 p-3 rounded-xl"><Smartphone className="w-6 h-6 text-zinc-300" /></div>
                   <div>
                     <p className="font-bold text-white text-lg">React Native / Next.js</p>
                     <p className="text-zinc-400">Worker Interface & Admin Dashboards</p>
                   </div>
                 </div>
                 <div className="flex justify-center text-zinc-600 py-1"><ArrowRight className="rotate-90 md:rotate-0 w-6 h-6" /></div>
                 <div className="bg-zinc-950 p-5 rounded-[1.5rem] flex items-center gap-4 border border-zinc-800">
                   <div className="bg-zinc-800 p-3 rounded-xl"><Server className="w-6 h-6 text-zinc-300" /></div>
                   <div>
                     <p className="font-bold text-white text-lg">Next.js 16 APIs (Node)</p>
                     <p className="text-zinc-400">Claims & Parametric Trigger Logic Engine</p>
                   </div>
                 </div>
                 <div className="flex gap-4 py-1">
                   <div className="flex-1 flex justify-center text-zinc-600 pl-8"><ArrowRight className="rotate-90 md:rotate-135 w-6 h-6" /></div>
                   <div className="flex-1 flex justify-center text-zinc-600 pr-8"><ArrowRight className="rotate-90 md:rotate-45 w-6 h-6" /></div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-[1.5rem] text-center">
                     <div className="bg-blue-950/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"><Cpu className="w-6 h-6 text-blue-400" /></div>
                     <p className="font-bold text-white">Gemini AI</p>
                     <p className="text-sm text-zinc-400 mt-1">Fraud / Severity Checks</p>
                   </div>
                   <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-[1.5rem] text-center">
                     <div className="bg-green-950/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"><Database className="w-6 h-6 text-green-400" /></div>
                     <p className="font-bold text-white">Neon PostgreSQL</p>
                     <p className="text-sm text-zinc-400 mt-1">Geospatial Validating</p>
                   </div>
                 </div>
               </div>
            </div>
            
            <div className="md:w-1/2">
              <h3 className="text-4xl font-bold tracking-tight mb-8 mt-12 md:mt-0 pt-4">External Data Oracles</h3>
              <div className="grid gap-4">
                <div className="bg-zinc-800/50 border border-zinc-800 rounded-[1.5rem] p-6 flex gap-6 items-center">
                    <div className="bg-zinc-700/50 p-4 rounded-2xl"><CloudRain className="w-8 h-8 text-blue-400" /></div>
                    <div>
                      <span className="font-bold text-xl text-white block mb-1">OpenWeatherMap API</span>
                      <p className="text-zinc-400">Automated rainfall thresholds & live meteorological monitoring streams.</p>
                    </div>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-800 rounded-[1.5rem] p-6 flex gap-6 items-center">
                    <div className="bg-zinc-700/50 p-4 rounded-2xl"><ThermometerSun className="w-8 h-8 text-orange-400" /></div>
                    <div>
                      <span className="font-bold text-xl text-white block mb-1">Meteostat API</span>
                      <p className="text-zinc-400">Historical heat indexing integration for accurate micro-durational risk pricing.</p>
                    </div>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-800 rounded-[1.5rem] p-6 flex gap-6 items-center">
                    <div className="bg-zinc-700/50 p-4 rounded-2xl"><ShieldAlert className="w-8 h-8 text-red-400" /></div>
                    <div>
                      <span className="font-bold text-xl text-white block mb-1">Mapbox GeoJSON</span>
                      <p className="text-zinc-400">Curfew validations, urban boundary detection, and delivery zone footprinting.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DEMO CTA / INTERACTIVE SIMULATION */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-4 px-4 py-1">Interactive Simulation</Badge>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Admin Trigger Engine.</h3>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">Click an environmental event to simulate pushing a webhook into DropSafe&apos;s core engine, triggering the automated claims pipeline.</p>
        </div>

        <BrowserMockup className="shadow-2xl shadow-zinc-200/50 border-zinc-300 text-left bg-white">
          <div className="flex bg-zinc-950 text-white p-4 items-center justify-between border-b border-zinc-800">
            <div className="font-mono text-sm flex items-center gap-2"><Play className="w-4 h-4 text-green-400" /> dropsafe-admin - bash</div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
            </div>
          </div>
          
          <div className="bg-zinc-50 p-6 md:p-10 flex flex-col md:flex-row gap-8">
            {/* Control Panel */}
            <div className="md:w-1/3 bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm flex flex-col pt-8">
               <h4 className="font-bold text-xl mb-6 flex items-center gap-2"><Target className="w-6 h-6 text-zinc-400"/> Trigger Center</h4>
               <div className="space-y-3 flex-1">
                 <Button variant="outline" size="lg" className="w-full justify-start hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors" onClick={() => runSimulation("Rainstorm")}>
                   <CloudRain className="w-5 h-5 mr-3" /> Execute Rainstorm
                 </Button>
                 <Button variant="outline" size="lg" className="w-full justify-start hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 transition-colors" onClick={() => runSimulation("Heatwave")}>
                   <ThermometerSun className="w-5 h-5 mr-3" /> Execute Heatwave
                 </Button>
                 <Button variant="outline" size="lg" className="w-full justify-start hover:bg-zinc-100 hover:border-zinc-300 transition-colors" onClick={() => runSimulation("Pollution")}>
                   <AlertTriangle className="w-5 h-5 mr-3" /> Simulate Pollution Spike
                 </Button>
                 <Button variant="outline" size="lg" className="w-full justify-start hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors" onClick={() => runSimulation("Curfew")}>
                   <ShieldAlert className="w-5 h-5 mr-3" /> Trigger Civilian Curfew
                 </Button>
               </div>
            </div>

            {/* Terminal Log Output */}
            <div className="md:w-2/3 bg-zinc-950 rounded-[2rem] border border-zinc-800 p-8 font-mono text-sm text-zinc-300 overflow-y-auto h-[400px] shadow-inner">
              <div className="mb-6 text-zinc-500 border-b border-zinc-800 pb-4">
                -----------------------------------------------------<br/>
                DropSafe Live Event Stream [System Listening...]<br/>
                -----------------------------------------------------
              </div>
              
              <div className="space-y-4">
                <AnimatePresence>
                  {simulationLog.map((log, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0 }}
                      key={i} 
                      className="flex gap-4 items-start"
                    >
                      <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                      <span className={`leading-relaxed ${log.type === "success" ? "text-green-400 font-semibold" : log.type === "warning" ? "text-yellow-400" : "text-blue-300"}`}>
                        {`>`} {log.message}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {simulationLog.length === 0 && (
                  <div className="flex animate-pulse items-center gap-2 text-zinc-600 mt-4">
                    <div className="w-2 h-4 bg-zinc-500" />
                    <span>Waiting for external payload...</span>
                  </div>
                )}
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

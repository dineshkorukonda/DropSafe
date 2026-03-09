"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CloudRain,
  ThermometerSun,
  AlertTriangle,
  Banknote,
  Activity,
  Server,
  Filter,
  Clock,
  Zap,
  ArrowRight,
  ShieldAlert,
  Car,
  HeartPulse,
  Wrench,
  CheckCircle2,
  XCircle,
  Play,
  Database,
  Smartphone,
  Cpu,
  Globe
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { BrowserMockup } from "@/components/ui/browser-mockup";
import {
  AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// --- Market Data ---
const marketData = [
  { year: '2020', workers: 8 },
  { year: '2022', workers: 11 },
  { year: '2024', workers: 15 },
  { year: '2026', workers: 18 },
  { year: '2028', workers: 20 },
  { year: '2030', workers: 23 },
];

export default function Phase1Page() {
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
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 py-24 text-center bg-zinc-50 border-b border-zinc-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6 mt-12">
          <Badge className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-4 py-1.5 mb-2">Phase-1 Implementation</Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-950">
            DropSafe Overview.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 max-w-2xl font-medium">
            Building the safety net for the unseen workforce. Discover our approach to AI-powered parametric insurance.
          </p>
        </div>
      </section>

      {/* 2. PROBLEM STATEMENT */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-3">01 / The Problem</h2>
            <h3 className="text-4xl font-bold tracking-tight mb-6">The Gig Economy is Extremely Fragile.</h3>
            <p className="text-lg text-zinc-600 leading-relaxed mb-6">
              When extreme weather hits, salaried workers stay indoors comfortably. For gig workers, a rainstorm or heatwave doesn&apos;t just mean a bad day—it means <strong className="text-zinc-900">immediate financial loss</strong>. 
            </p>
            <p className="text-lg text-zinc-600 leading-relaxed">
              They lose 20-30% of their weekly earnings due to unworkable environmental disruptions, and traditional insurance models offer absolutely zero income protection for this scenario.
            </p>
          </div>
          <div className="flex-1 grid gap-4 w-full">
            <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-2xl shadow-sm">
              <CloudRain className="w-8 h-8 text-blue-500 mb-3" />
              <h4 className="font-bold text-lg mb-1">Heavy Monsoons</h4>
              <p className="text-zinc-500 text-sm">Completely halts deliveries in major metros.</p>
            </div>
            <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-2xl shadow-sm">
              <ThermometerSun className="w-8 h-8 text-orange-500 mb-3" />
              <h4 className="font-bold text-lg mb-1">Extreme Heatwaves</h4>
              <p className="text-zinc-500 text-sm">Hazardous working conditions deplete stamina and safety.</p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto opacity-50" />

      {/* 3. SOLUTION */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-3">02 / The Solution</h2>
          <h3 className="text-4xl font-bold tracking-tight mb-4">Zero-Touch Parametric Income Protection.</h3>
          <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
            DropSafe uses real-time AI and location APIs to monitor urban disruptions. When hazardous conditions block work, the policy triggers automatically. No adjusting. No paper forms.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-zinc-200 shadow-none">
            <CardHeader>
              <Activity className="w-8 h-8 text-zinc-900 mb-2" />
              <CardTitle>Continuous Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600">We analyze live weather thresholds in the worker&apos;s operational delivery zone exclusively.</p>
            </CardContent>
          </Card>
          <Card className="border-zinc-200 bg-zinc-900 text-white border-none">
            <CardHeader>
              <AlertTriangle className="w-8 h-8 text-red-400 mb-2" />
              <CardTitle className="text-white">Threshold AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400">Gemini validates the severity. Once the mathematical trigger is hit, the event goes live.</p>
            </CardContent>
          </Card>
          <Card className="border-zinc-200 shadow-none">
            <CardHeader>
              <Banknote className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Autonomous Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600">Cash is instantly credited to the worker&apos;s wallet for the precise hours they could not work.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-24 px-6 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-3 text-center">03 / How It Works</h2>
          <h3 className="text-4xl font-bold tracking-tight mb-16 text-center">The Autonomous Workflow.</h3>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[28px] top-6 bottom-6 w-0.5 bg-zinc-200 md:left-1/2 md:-ml-[1px]" />

            <div className="space-y-12 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/2 md:text-right pr-6 md:pr-12 hidden md:block">
                  <h4 className="text-xl font-bold">1. Worker Onboarding</h4>
                  <p className="text-zinc-600 mt-2">Workers register with Name, City, Platform & Avg. Earnings.</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold shrink-0 shadow-[0_0_0_8px_white] relative ml-0 md:ml-auto md:mr-auto z-10">
                  1
                </div>
                <div className="md:w-1/2 pl-6 md:pl-12 flex-1 md:hidden">
                  <h4 className="text-xl font-bold">1. Worker Onboarding</h4>
                  <p className="text-zinc-600 mt-2">Workers register with Name, City, Platform & Avg. Earnings.</p>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block text-zinc-400 text-sm font-mono">
                  `POST /api/workers` <br/>`{'{ city, role, income }'}`
                </div>
              </div>

               {/* Step 2 */}
              <div className="flex flex-col items-start md:flex-row md:items-center gap-6">
                <div className="md:w-1/2 md:text-right md:pr-12 hidden md:block text-zinc-400 text-sm font-mono">
                 `GET /api/risk/premium`
                </div>
                <div className="w-14 h-14 rounded-full bg-white border border-zinc-300 text-zinc-900 flex items-center justify-center font-bold shadow-[0_0_0_8px_white] shrink-0 relative z-10 ml-0 md:ml-auto md:mr-auto">
                  2
                </div>
                <div className="md:w-1/2 pl-6 md:pl-12 flex-1">
                  <h4 className="text-xl font-bold">2. Risk Engine Rating</h4>
                  <p className="text-zinc-600 mt-2">Calculates micro-duration premium based on history and location.</p>
                </div>
              </div>

               {/* Step 3 */}
               <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/2 md:text-right pr-6 md:pr-12 md:block">
                  <h4 className="text-xl font-bold">3. Parametric Trigger</h4>
                  <p className="text-zinc-600 mt-2">System polls external APIs. e.g. Rainfall &gt; 50mm hooks event.</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center font-bold shadow-[0_0_0_8px_white] shrink-0 relative z-10 ml-0 md:ml-auto md:mr-auto">
                  3
                </div>
                <div className="md:w-1/2 pl-6 md:pl-12 hidden md:block text-zinc-400 text-sm font-mono">
                  `Webhook: Weather API`
                </div>
              </div>

               {/* Step 4 */}
               <div className="flex flex-col items-start md:flex-row md:items-center gap-6">
                <div className="md:w-1/2 md:text-right md:pr-12 hidden md:block text-zinc-400 text-sm font-mono">
                  `Verification Checksum`
                </div>
                <div className="w-14 h-14 rounded-full bg-white border border-zinc-300 text-zinc-900 flex items-center justify-center font-bold shadow-[0_0_0_8px_white] shrink-0 relative z-10 ml-0 md:ml-auto md:mr-auto">
                  4
                </div>
                <div className="md:w-1/2 pl-6 md:pl-12 flex-1">
                  <h4 className="text-xl font-bold">4. Fraud Detection</h4>
                  <p className="text-zinc-600 mt-2">Verifies user location vs actual weather footprint.</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/2 md:text-right pr-6 md:pr-12 md:block">
                  <h4 className="text-xl font-bold">5. Automated Claim Engine</h4>
                  <p className="text-zinc-600 mt-2">Estimates income block lost, pays out directly. Cycle complete.</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-[0_0_0_8px_white] shrink-0 relative z-10 ml-0 md:ml-auto md:mr-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="md:w-1/2 pl-6 md:pl-12 hidden md:block text-zinc-400 text-sm font-mono">
                  `POST /api/claims/execute`
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. DISRUPTION TYPES */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-3 text-center">04 / Disruption Scope</h2>
        <h3 className="text-4xl font-bold tracking-tight mb-16 text-center">What is Covered?</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Allowed */}
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

          {/* Not Allowed */}
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

      {/* 6. FEATURES */}
      <section className="py-24 px-6 bg-zinc-950 text-white border-t border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-zinc-500 uppercase mb-3">05 / Key Features</h2>
          <h3 className="text-4xl font-bold tracking-tight mb-16">Designed for Gig Resilience.</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem]">
              <Clock className="w-8 h-8 text-blue-400 mb-4" />
              <h4 className="font-bold text-xl mb-2">Micro-Duration</h4>
              <p className="text-zinc-400">Workers can buy opt-in protection exclusively for the monsoon season or peak heatwave weeks, rather than annual lock-ins.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem]">
              <Filter className="w-8 h-8 text-purple-400 mb-4" />
              <h4 className="font-bold text-xl mb-2">Dynamic Risk Profiling</h4>
              <p className="text-zinc-400">Our AI assigns hyper-local premiums. A worker in a flood-prone sector pays slightly differently than one in a stable zone.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem]">
              <Zap className="w-8 h-8 text-yellow-400 mb-4" />
              <h4 className="font-bold text-xl mb-2">Zero-Touch Resolution</h4>
              <p className="text-zinc-400">Absolutely no adjuster interventions. When the environmental math is breached, wallets get funded automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MARKET OPPORTUNITY */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-3 text-center">06 / Market Opportunity</h2>
        <h3 className="text-4xl font-bold tracking-tight mb-16 text-center">A Massive Uninsured Base.</h3>
        
        <div className="grid md:grid-cols-5 gap-8 items-center bg-zinc-50 rounded-[3rem] p-8 md:p-12 border border-zinc-200">
           <div className="md:col-span-2 space-y-4">
             <h4 className="font-bold text-3xl">Gig workers in India are surging.</h4>
             <p className="text-lg text-zinc-600 leading-relaxed">
               Projected to reach 23 Million by 2030, this workforce powers urban mobility and logistics completely without financial shock absorbers.
             </p>
             <p className="text-sm font-bold tracking-tight text-white bg-zinc-900 p-4 rounded-xl w-fit shadow-lg shadow-zinc-300">
               $150M+ ARR Potential via APIs
             </p>
           </div>
           <div className="md:col-span-3 h-[250px] w-full mt-8 md:mt-0 bg-white rounded-2xl p-4 shadow-sm border border-zinc-100">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={marketData}>
                <defs>
                   <linearGradient id="colorWorkers" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#18181b" stopOpacity={0.1} />
                     <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                 <XAxis dataKey="year" axisLine={false} tickLine={false} />
                 <Tooltip wrapperClassName="rounded-xl shadow-xl border-none" />
                 <Area type="monotone" dataKey="workers" stroke="#18181b" strokeWidth={3} fillOpacity={1} fill="url(#colorWorkers)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
      </section>

      {/* 8. PERSONA */}
      <section className="py-24 px-6 max-w-5xl mx-auto border-t border-zinc-200">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-3 text-center">07 / Target Persona</h2>
          <h3 className="text-4xl font-bold tracking-tight text-center">Meet Ravi Kumar.</h3>
        </div>
        
        <div className="flex flex-col md:flex-row gap-16 items-center">
           <div className="md:w-1/3">
             <PhoneMockup className="mx-auto transform -rotate-1 shadow-2xl border-zinc-800">
               <div className="bg-zinc-950 p-6 pt-10 flex flex-col items-center justify-center text-center pb-8 sticky top-0">
                 <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-zinc-700 mb-4" />
                 <h4 className="text-white font-bold text-xl">Ravi Kumar</h4>
                 <p className="text-zinc-400 text-sm">Zomato Partner • Hyderabad</p>
               </div>
               <div className="p-4 bg-zinc-50 flex-1 space-y-4">
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-200 flex justify-between items-center">
                   <span className="font-semibold text-zinc-700">DropSafe Premium (Wk)</span>
                   <span className="font-mono font-bold text-zinc-900">₹45</span>
                 </div>
                 <div className="bg-zinc-900 p-4 rounded-xl shadow-md text-white border border-zinc-800">
                   <div className="flex justify-between items-center mb-2">
                     <span className="font-medium text-white">Monsoon Trigger Active</span>
                     <CheckCircle2 className="text-green-400 w-5 h-5"/>
                   </div>
                   <p className="text-sm text-zinc-400">Coverage locked through Aug 24.</p>
                 </div>
               </div>
             </PhoneMockup>
           </div>
           
           <div className="md:w-2/3 space-y-6">
             <div className="bg-zinc-50 border border-zinc-200 p-8 rounded-[2rem]">
               <h4 className="font-bold text-xl mb-3 text-zinc-900">The Pre-DropSafe Reality</h4>
               <p className="text-zinc-600 leading-relaxed text-lg">Ravi drives 10 hours daily, earning ~₹5,000/week. When Hyderabad flooded, he couldn&apos;t work for 3 days. He lost ₹2,500 instantly. Rent was due, forcing him to take a high-interest microloan.</p>
             </div>
             
             <div className="bg-white border text-left border-zinc-200 shadow-xl shadow-zinc-200/50 p-8 rounded-[2rem]">
               <h4 className="font-bold text-xl mb-3 text-green-700">The DropSafe Shift</h4>
               <p className="text-zinc-600 leading-relaxed text-lg mb-6">For ₹45/week directly deducted from his wallet via our Platform API, Ravi opts into Monsoon protection securely.</p>
               <div className="flex gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                 <div className="bg-green-100 p-2 rounded-full h-fit mt-1"><CheckCircle2 className="w-5 h-5 text-green-700"/></div>
                 <div>
                   <p className="font-medium text-green-900">The next heavy flood hits. He stays home safely.</p>
                   <p className="text-green-800/80 mt-1">By 9 PM, the system verifies the rainfall threshold and his GPS zone, auto-crediting <strong>₹1,800</strong> to offset the lost delivery block.</p>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 9 & 10. ARCHITECTURE & TECH */}
      <section className="py-24 px-6 bg-zinc-900 text-zinc-50 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 item-start">
            <div className="md:w-1/2">
               <h2 className="text-sm font-bold tracking-widest text-zinc-500 uppercase mb-3">08 / Architecture & Stack</h2>
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
                   <div className="flex-1 flex justify-center text-zinc-600 pl-8"><ArrowRight className="rotate-90 md:rotate-[135deg] w-6 h-6" /></div>
                   <div className="flex-1 flex justify-center text-zinc-600 pr-8"><ArrowRight className="rotate-90 md:rotate-[45deg] w-6 h-6" /></div>
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
              <h3 className="text-4xl font-bold tracking-tight mb-8 mt-12 md:mt-0 pt-4 md:pt-14">External Data Oracles</h3>
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

      {/* 11. DEMO CTA / INTERACTIVE SIMULATION */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-4 px-4 py-1">09 / Interactive Simulation</Badge>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Admin Trigger Engine.</h3>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">Click an environmental event to simulate pushing a webhook into DropSafe&apos;s core engine, triggering the automated claims pipeline.</p>
        </div>

        <BrowserMockup className="shadow-2xl shadow-zinc-200/50 border-zinc-300 text-left">
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
               <h4 className="font-bold text-xl mb-6 flex items-center gap-2"><SettingsIcon className="w-6 h-6 text-zinc-400"/> Trigger Center</h4>
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
                {simulationLog.map((log, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    key={i} 
                    className="flex gap-4 items-start"
                  >
                    <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                    <span className={`leading-relaxed ${log.type === "success" ? "text-green-400 font-semibold" : log.type === "warning" ? "text-yellow-400" : "text-blue-300"}`}>
                      {`>`} {log.message}
                    </span>
                  </motion.div>
                ))}
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
      <footer className="border-t border-zinc-200 py-16 text-center text-zinc-500 text-sm bg-white">
        <h2 className="text-2xl font-bold text-zinc-950 tracking-tighter mb-4">DropSafe.</h2>
        <p className="font-medium text-zinc-600">Built for the unseen workforce.</p>
        <p className="mt-8 text-zinc-400">© 2026 Phase-1 Design Overview</p>
      </footer>
    </div>
  );
}

// Icon helper
function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

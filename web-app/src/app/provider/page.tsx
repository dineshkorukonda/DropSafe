"use client";

import React, { useState } from "react";
import { 
  Building2, 
  TrendingUp, 
  Activity, 
  PieChart as PieChartIcon, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Globe,
  Wallet
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell
} from 'recharts';

// Mock Data
const LOSS_RATIO_DATA = [
  { month: 'Jan', collected: 4000, paid: 1200 },
  { month: 'Feb', collected: 4500, paid: 1800 },
  { month: 'Mar', collected: 5200, paid: 2100 },
  { month: 'Apr', collected: 5800, paid: 4000 },
  { month: 'May', collected: 6100, paid: 2300 },
  { month: 'Jun', collected: 7000, paid: 3800 },
];

const EXPOSURE_DATA = [
  { city: 'Hyderabad', risk: 'Monsoon', exposure: 85 },
  { city: 'Delhi', risk: 'Pollution', exposure: 92 },
  { city: 'Chennai', risk: 'Heatwave', exposure: 65 },
  { city: 'Mumbai', risk: 'Monsoon', exposure: 78 },
  { city: 'Bangalore', risk: 'Flooding', exposure: 42 },
];

export default function ProviderDashboard() {
  const [timeframe, setTimeframe] = useState("ytd");

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 flex flex-col selection:bg-zinc-800">
      
      {/* HEADER */}
      <header className="px-8 py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900/30 p-2 rounded-lg border border-blue-800/50">
            <Building2 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight leading-none text-white">Capital Provider Portal</h1>
            <p className="text-zinc-400 text-xs mt-1">Global DropSafe Risk Monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="bg-zinc-900 border border-zinc-800 p-1.5 rounded-lg flex gap-1">
             <Button variant="ghost" size="sm" className={`h-8 text-xs font-semibold px-4 ${timeframe === 'mtd' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`} onClick={() => setTimeframe("mtd")}>MTD</Button>
             <Button variant="ghost" size="sm" className={`h-8 text-xs font-semibold px-4 ${timeframe === 'ytd' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`} onClick={() => setTimeframe("ytd")}>YTD</Button>
           </div>
           <Button className="bg-white text-zinc-950 hover:bg-zinc-200 font-bold shadow-md shadow-white/10 hidden md:flex">Download Actuarial Report</Button>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="flex-1 p-6 md:p-8 max-w-[1600px] mx-auto w-full space-y-6">
        
        {/* Top KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardDescription className="text-zinc-400 font-semibold tracking-wide uppercase text-xs">Total Premiums Collected</CardDescription>
              <Wallet className="w-4 h-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
               <div className="flex items-end justify-between">
                 <div className="text-3xl font-bold text-white">₹32.6L</div>
                 <div className="flex items-center text-green-400 text-sm font-bold bg-green-400/10 px-2 py-0.5 rounded-md">
                   <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 18.2%
                 </div>
               </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardDescription className="text-zinc-400 font-semibold tracking-wide uppercase text-xs">Total Automated Payouts</CardDescription>
              <Activity className="w-4 h-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
               <div className="flex items-end justify-between">
                 <div className="text-3xl font-bold text-white">₹15.2L</div>
                 <div className="flex items-center text-red-400 text-sm font-bold bg-red-400/10 px-2 py-0.5 rounded-md">
                   <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 4.1%
                 </div>
               </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
            <CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
              <CardDescription className="text-zinc-400 font-semibold tracking-wide uppercase text-xs">Current Loss Ratio</CardDescription>
              <PieChartIcon className="w-4 h-4 text-blue-400" />
            </CardHeader>
            <CardContent className="relative z-10">
               <div className="flex items-end justify-between">
                 <div className="text-3xl font-bold text-white">46.6%</div>
                 <p className="text-xs text-zinc-500 font-medium tracking-tight">Healthy (&lt; 65% target)</p>
               </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardDescription className="text-zinc-400 font-semibold tracking-wide uppercase text-xs">Total Capital Pool</CardDescription>
              <ShieldCheck className="w-4 h-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
               <div className="flex items-end justify-between">
                 <div className="text-3xl font-bold text-white">₹2.5Cr</div>
                 <div className="flex items-center text-green-400 text-sm font-bold bg-green-400/10 px-2 py-0.5 rounded-md">
                   Stable
                 </div>
               </div>
               <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-4 overflow-hidden">
                 <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '82%' }}></div>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Primary Financial Chart */}
           <Card className="bg-zinc-900 border-zinc-800 lg:col-span-2 shadow-2xl">
             <CardHeader>
               <CardTitle className="text-xl text-white">Capital Pool Performance (vs Parametric Triggers)</CardTitle>
               <CardDescription className="text-zinc-400">Comparing micro-premiums collected autonomously against system-triggered payouts by the Gemini Risk Engine.</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="h-[350px] w-full mt-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={LOSS_RATIO_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <defs>
                       <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa'}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#a1a1aa'}} />
                     <Tooltip 
                       contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                       itemStyle={{ color: '#fff' }}
                     />
                     <Legend verticalAlign="top" height={36} iconType="circle" />
                     <Area type="monotone" name="Premiums Collected (₹)" dataKey="collected" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCollected)" />
                     <Area type="monotone" name="Triggered Payouts (₹)" dataKey="paid" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorPaid)" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
             </CardContent>
           </Card>

           {/* Risk Exposure Map */}
           <Card className="bg-zinc-900 border-zinc-800 shadow-2xl flex flex-col">
             <CardHeader>
               <div className="flex items-center justify-between">
                 <CardTitle className="text-xl text-white">Geographic Exposure</CardTitle>
                 <Globe className="w-5 h-5 text-zinc-500" />
               </div>
               <CardDescription className="text-zinc-400">Real-time capital risk concentrated by city algorithms.</CardDescription>
             </CardHeader>
             <CardContent className="flex-1 flex flex-col justify-end">
               <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={EXPOSURE_DATA} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#27272a" />
                     <XAxis type="number" hide />
                     <YAxis dataKey="city" type="category" axisLine={false} tickLine={false} tick={{fill: '#fff', fontSize: 13, fontWeight: 500}} width={80} />
                     <Tooltip 
                       cursor={{fill: '#27272a', opacity: 0.5}}
                       contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                     />
                     <Bar dataKey="exposure" name="Risk Exposure Level" radius={[0, 4, 4, 0]}>
                       {
                         EXPOSURE_DATA.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.exposure > 80 ? '#ef4444' : entry.exposure > 60 ? '#f59e0b' : '#3b82f6'} />
                         ))
                       }
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
               </div>
             </CardContent>
           </Card>
           
        </div>

        {/* AI Insight Row */}
        <Card className="bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border-indigo-900/50 shadow-2xl relative overflow-hidden">
           <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500"></div>
           <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="w-16 h-16 bg-blue-900/30 border-2 border-blue-500/30 rounded-2xl flex items-center justify-center shrink-0 mx-auto md:mx-0">
                <AlertTriangle className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 justify-center md:justify-start">
                   Gemini Actuarial Insight 
                   <Badge className="bg-blue-500/20 text-blue-300 border-none font-bold uppercase text-[10px] px-2 py-0">Live Note</Badge>
                </h3>
                <p className="text-zinc-300 text-lg mt-2 leading-relaxed">
                   "Historical meteorological models suggest a 30% increased likelihood of extreme heatwave blockages in the Delhi NCR region over the next 14 days. Current micro-premiums for new gig sign-ups in this zone have been programmatically adjusted by <span className="text-white font-bold bg-zinc-800/80 px-2 py-1 rounded-md mx-1">+4.2%</span> to safely hedge capital pool loss ratios."
                </p>
              </div>
           </CardContent>
        </Card>

      </main>
    </div>
  );
}

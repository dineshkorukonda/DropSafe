"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CloudRain, 
  ThermometerSun, 
  AlertTriangle, 
  Wallet,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  Menu,
  Bell,
  CheckCircle2,
  Phone
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function WorkerDashboard() {
  const [isProtected, setIsProtected] = useState(false);
  const [balance, setBalance] = useState(1250);
  
  // Dummy worker context
  const worker = {
    name: "Ravi K.",
    city: "Hyderabad",
    zone: "Zone 4 - Gachibowli",
    platform: "Zomato",
  };

  const handleOptIn = () => {
    setIsProtected(true);
    setBalance(prev => prev - 45); // Deduct premium
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4 selection:bg-zinc-300">
      
      {/* 
        Instead of a standard web layout, we use a forced mobile container 
        to accurately represent the worker's native app experience.
      */}
      <div className="w-full max-w-[400px] bg-white rounded-[3rem] shadow-2xl relative overflow-hidden border-[8px] border-zinc-900 h-[850px] flex flex-col">
        
        {/* Mobile Status Bar Simulation */}
        <div className="bg-zinc-950 text-white px-6 pt-4 pb-2 flex justify-between items-center text-xs font-bold z-10">
          <span>9:41</span>
          <div className="flex gap-1">
             <div className="w-4 h-3 bg-white rounded-sm"></div>
             <div className="w-4 h-3 bg-white rounded-sm"></div>
          </div>
        </div>

        {/* Header */}
        <header className="bg-zinc-950 text-white px-6 py-4 flex items-center justify-between z-10 shadow-md">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold border-2 border-zinc-700">RK</div>
             <div>
               <h1 className="font-bold leading-none">{worker.name}</h1>
               <p className="text-zinc-400 text-xs mt-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> {worker.city}</p>
             </div>
           </div>
           <Button variant="ghost" size="icon" className="text-zinc-300 hover:text-white rounded-full"><Bell className="w-5 h-5" /></Button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-zinc-50 pb-24">
          
          {/* Top Info Strip */}
          <div className="bg-zinc-950 text-white px-6 pb-8 pt-4 rounded-b-[2rem] shadow-sm">
             <div className="flex justify-between items-end mb-6">
                <div>
                   <p className="text-zinc-400 text-sm mb-1">Wallet Balance</p>
                   <h2 className="text-4xl font-bold tracking-tight">₹{balance.toLocaleString()}</h2>
                </div>
                <Button size="sm" className="bg-white text-zinc-950 hover:bg-zinc-200 font-bold rounded-xl h-9">Withdraw</Button>
             </div>
             
             {/* Coverage Status Card */}
             <div className={`p-4 rounded-2xl border ${isProtected ? 'bg-green-950/50 border-green-800' : 'bg-red-950/50 border-red-800'} backdrop-blur-sm`}>
               <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center gap-2">
                   {isProtected ? <ShieldCheck className="w-5 h-5 text-green-400" /> : <ShieldAlert className="w-5 h-5 text-red-400" />}
                   <span className="font-bold text-sm tracking-wide text-white">Coverage Status</span>
                 </div>
                 {isProtected ? 
                    <Badge className="bg-green-500/20 text-green-300 border-none font-bold hover:bg-green-500/20">Active</Badge> 
                    : 
                    <Badge className="bg-red-500/20 text-red-300 border-none font-bold hover:bg-red-500/20">Uninsured</Badge>
                 }
               </div>
               <p className="text-sm text-zinc-400">
                 {isProtected ? "You are protected against imminent monsoon blocks until Aug 24." : "Your income is exposed to environmental blocks this week."}
               </p>
             </div>
          </div>

          <div className="px-5 -mt-4 relative z-10 space-y-4">
            
            {/* Action Needed (if uninsured) */}
            <AnimatePresence>
              {!isProtected && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Card className="border-orange-200 border-2 shadow-lg shadow-orange-100/50">
                    <CardHeader className="pb-3 bg-orange-50 rounded-t-xl">
                      <div className="flex items-center gap-2 text-orange-800 mb-1">
                        <AlertTriangle className="w-5 h-5" />
                        <CardTitle className="text-lg">Risk Alert: Monsoon</CardTitle>
                      </div>
                      <CardDescription className="text-orange-900/70 font-medium">Heavy rainfall (80mm/h) predicted in {worker.zone} over the next 48 hours.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 bg-white">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-left">
                          <p className="text-xs text-zinc-500 font-bold tracking-wider uppercase mb-1">Weekly Premium</p>
                          <p className="text-2xl font-bold tracking-tight text-zinc-900">₹45</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-zinc-500 font-bold tracking-wider uppercase mb-1">Max Payout</p>
                          <p className="text-2xl font-bold tracking-tight text-green-600">₹1,800</p>
                        </div>
                      </div>
                      <Button onClick={handleOptIn} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-lg rounded-xl shadow-md cursor-pointer">
                        Opt-in Now (₹45)
                      </Button>
                      <p className="text-center text-xs text-zinc-400 mt-3 font-medium">Auto-deducted from wallet. Zero paperwork.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Live Weather Widget */}
            <h3 className="font-bold text-zinc-900 px-1 pt-2">Live Zone Oracle</h3>
            <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex gap-4 overflow-x-auto snap-x hide-scrollbar">
               <div className="min-w-[140px] bg-blue-50 border border-blue-100 p-4 rounded-xl snap-start">
                 <CloudRain className="w-6 h-6 text-blue-500 mb-2" />
                 <p className="font-bold text-zinc-900">Rainfall</p>
                 <p className="text-2xl font-black text-blue-700 tracking-tighter mt-1">12<span className="text-sm font-bold text-blue-500">mm/h</span></p>
                 <p className="text-xs text-blue-600 mt-1 font-medium">Threshold: 50mm</p>
               </div>
               <div className="min-w-[140px] bg-red-50 border border-red-100 p-4 rounded-xl snap-start">
                 <ThermometerSun className="w-6 h-6 text-red-500 mb-2" />
                 <p className="font-bold text-zinc-900">Heat Index</p>
                 <p className="text-2xl font-black text-red-700 tracking-tighter mt-1">38<span className="text-sm font-bold text-red-500">°C</span></p>
                 <p className="text-xs text-red-600 mt-1 font-medium">Threshold: 45°C</p>
               </div>
            </div>

            {/* Payout Ledger */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-3 px-1">
                <h3 className="font-bold text-zinc-900">Payout History</h3>
                <Button variant="link" className="text-xs text-blue-600 h-auto p-0">View All</Button>
              </div>
              <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm divide-y divide-zinc-100">
                 <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="bg-green-100 p-2 rounded-full"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                       <div>
                         <p className="font-bold text-sm">Zone Strike Closure</p>
                         <p className="text-xs text-zinc-500 mt-0.5">Aug 12 • Automated Payout</p>
                       </div>
                    </div>
                    <span className="font-bold text-green-600">+₹850</span>
                 </div>
                 <div className="p-4 flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-3">
                       <div className="bg-zinc-100 p-2 rounded-full"><ShieldCheck className="w-5 h-5 text-zinc-600" /></div>
                       <div>
                         <p className="font-bold text-sm">Premium Deduction</p>
                         <p className="text-xs text-zinc-500 mt-0.5">Aug 10 • Monsoon Cover</p>
                       </div>
                    </div>
                    <span className="font-bold text-zinc-900">-₹45</span>
                 </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-zinc-200 px-6 py-4 pb-8 flex justify-between items-center z-20">
           <div className="flex flex-col items-center text-blue-600">
             <ShieldCheck className="w-6 h-6 mb-1" />
             <span className="text-[10px] font-bold">Coverage</span>
           </div>
           <div className="flex flex-col items-center text-zinc-400 hover:text-zinc-900 transition-colors">
             <Wallet className="w-6 h-6 mb-1" />
             <span className="text-[10px] font-bold">Wallet</span>
           </div>
           <div className="flex flex-col items-center text-zinc-400 hover:text-zinc-900 transition-colors">
             <Phone className="w-6 h-6 mb-1" />
             <span className="text-[10px] font-bold">Support</span>
           </div>
           <div className="flex flex-col items-center text-zinc-400 hover:text-zinc-900 transition-colors">
             <Menu className="w-6 h-6 mb-1" />
             <span className="text-[10px] font-bold">More</span>
           </div>
        </nav>
        
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { 
  CloudRain, 
  ThermometerSun, 
  AlertTriangle, 
  Activity, 
  ShieldCheck, 
  Users, 
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  MapPin
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- Mock Data ---

const MOCK_WORKERS = [
  { id: "W-8472", name: "Ravi Kumar", city: "Hyderabad", platform: "Zomato", avgIncome: 5000, activeCoverage: "Monsoon", premium: 45, status: "Protected", riskScore: 82 },
  { id: "W-9102", name: "Suresh Menon", city: "Chennai", platform: "Swiggy", avgIncome: 4200, activeCoverage: "Heatwave", premium: 38, status: "Protected", riskScore: 76 },
  { id: "W-3391", name: "Amit Singh", city: "Delhi", platform: "Blinkit", avgIncome: 6100, activeCoverage: "Pollution", premium: 55, status: "Protected", riskScore: 94 },
  { id: "W-1044", name: "Priya Das", city: "Mumbai", platform: "Zepto", avgIncome: 3800, activeCoverage: "None", premium: 0, status: "Uninsured", riskScore: 45 },
  { id: "W-7729", name: "Karthik R.", city: "Bangalore", platform: "Swiggy", avgIncome: 7000, activeCoverage: "Monsoon", premium: 50, status: "Protected", riskScore: 68 },
];

const MOCK_EVENTS = [
  { id: "EV-HYD-01", type: "Rainstorm", city: "Hyderabad", severity: "High (65mm/hr)", status: "Active", time: "14 mins ago", affected: 4102 },
  { id: "EV-DEL-44", type: "Pollution", city: "Delhi", severity: "Critical (AQI 450)", status: "Active", time: "2 hrs ago", affected: 12050 },
  { id: "EV-CHE-12", type: "Heatwave", city: "Chennai", severity: "Warning (42°C)", status: "Monitoring", time: "5 hrs ago", affected: 0 },
];

const MOCK_FRAUD_LOGS = [
  { id: "CLM-9921", worker: "W-8472", type: "Location Mismatch", details: "Pinged from Vijayawada during Hyderabad flood event.", confidence: "98%", action: "Flagged & Blocked" },
  { id: "CLM-3100", worker: "W-1120", type: "Duplicate IP", details: "3 claims filed from identical device node in 10 mins.", confidence: "85%", action: "Requires Manual Review" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950 flex flex-col md:flex-row pb-20 md:pb-0 selection:bg-zinc-200">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-zinc-950 text-white flex flex-col md:min-h-screen sticky top-0 md:static z-20">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-lg tracking-tight">DropSafe Admin</span>
          </div>
        </div>
        
        <nav className="p-4 flex-1 space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800 ${activeTab === "overview" && "bg-zinc-800 text-white"}`}
            onClick={() => setActiveTab("overview")}
          >
            <Activity className="w-4 h-4 mr-3" /> Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800 ${activeTab === "registry" && "bg-zinc-800 text-white"}`}
            onClick={() => setActiveTab("registry")}
          >
            <Users className="w-4 h-4 mr-3" /> Worker Registry
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800 ${activeTab === "fraud" && "bg-zinc-800 text-white"}`}
            onClick={() => setActiveTab("fraud")}
          >
            <ShieldCheck className="w-4 h-4 mr-3" /> Fraud Engine
          </Button>
        </nav>
        
        <div className="p-4 border-t border-zinc-800 hidden md:block">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold ring-2 ring-zinc-700">A</div>
            <div>
              <p className="text-sm font-medium leading-none">Admin User</p>
              <p className="text-xs text-zinc-500 mt-1">System Controller</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto w-full">
        <header className="bg-white border-b border-zinc-200 px-6 md:px-8 py-4 flex items-center justify-between sticky top-0 z-10 w-full">
          <h1 className="text-2xl font-bold tracking-tight capitalize">{activeTab === "overview" ? "System Dashboard" : activeTab.replace("-", " ")}</h1>
          <div className="flex items-center gap-4">
             <div className="relative hidden md:block">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
               <input 
                 type="text" 
                 placeholder="Search workers, IDs, claims..." 
                 className="pl-9 pr-4 py-2 bg-zinc-100 border-none rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
               />
             </div>
             <Button variant="outline" size="icon" className="rounded-full bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100"><Activity className="w-4 h-4" /></Button>
          </div>
        </header>

        <div className="p-6 md:p-8 pb-32">
          
          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              
              {/* Analytics Top Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-sm border-zinc-200">
                  <CardHeader className="pb-2">
                    <CardDescription className="font-medium text-zinc-500">Total Protected Workers</CardDescription>
                    <CardTitle className="text-3xl font-bold tracking-tight">42,891</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs font-bold text-green-600 flex items-center gap-1"><Activity className="w-3 h-3"/> +12% this month</p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-zinc-200">
                  <CardHeader className="pb-2">
                    <CardDescription className="font-medium text-zinc-500">Active Disruption Events</CardDescription>
                    <CardTitle className="text-3xl font-bold tracking-tight">2</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-xs text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full w-fit">Hyderabad, Delhi</p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-zinc-200">
                  <CardHeader className="pb-2">
                    <CardDescription className="font-medium text-zinc-500">Total Payouts (YTD)</CardDescription>
                    <CardTitle className="text-3xl font-bold tracking-tight">₹1.4Cr</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-zinc-500 font-medium">Across 18,200 automated claims</p>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-950 text-white border-zinc-800 shadow-md">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-zinc-400 font-medium">System Health (Gemini)</CardDescription>
                    <CardTitle className="text-3xl font-bold tracking-tight text-green-400">99.9%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-zinc-500 font-medium">Oracles responding normally.</p>
                  </CardContent>
                </Card>
              </div>

              {/* Layout splits */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Col (2/3) */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Active Triggers */}
                  <Card className="shadow-sm border-zinc-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                      <div>
                        <CardTitle className="text-xl">Live Event Triggers</CardTitle>
                        <CardDescription className="mt-1">External API boundaries currently breached and processing payouts.</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 shadow-sm font-bold px-3 py-1">2 Active</Badge>
                    </CardHeader>
                    <CardContent className="p-0 border-t border-zinc-100">
                      {MOCK_EVENTS.map((event, i) => (
                        <div key={event.id} className={`p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 ${i !== 0 ? 'border-t border-zinc-100' : ''} hover:bg-zinc-50/50 transition-colors`}>
                          <div className="flex items-start md:items-center gap-4">
                            <div className={`p-3 rounded-2xl shrink-0 border ${
                               event.type === 'Rainstorm' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                               event.type === 'Pollution' ? 'bg-zinc-100 text-zinc-700 border-zinc-200' : 
                               'bg-orange-50 text-orange-600 border-orange-100'
                             }`}>
                              {event.type === 'Rainstorm' && <CloudRain className="w-6 h-6"/>}
                              {event.type === 'Pollution' && <AlertTriangle className="w-6 h-6"/>}
                              {event.type === 'Heatwave' && <ThermometerSun className="w-6 h-6"/>}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-lg text-zinc-900 leading-none">{event.city}</h4>
                                <Badge variant="secondary" className="text-xs px-2 py-0.5 items-center justify-center bg-zinc-100 font-mono text-zinc-600 border-none">{event.id}</Badge>
                              </div>
                              <p className="text-sm text-zinc-600 font-medium flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {event.type} • {event.severity}</p>
                            </div>
                          </div>
                          
                          <div className="bg-white border border-zinc-100 p-3 rounded-xl md:text-right flex-1 md:flex-none flex flex-row md:flex-col items-center md:items-end justify-between shadow-sm">
                             <div className="font-bold text-sm flex items-center gap-2 md:justify-end">
                               {event.status === "Active" ? <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span></span> : <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"/>} 
                               {event.status}
                             </div>
                             <p className="text-xs font-medium text-zinc-500 mt-1">{event.affected.toLocaleString()} payouts queued</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                </div>

                {/* Right Col (1/3) */}
                <div className="space-y-8">
                  
                  {/* Fraud Engine Mini Log */}
                  <Card className="border-red-100 shadow-md overflow-hidden">
                    <CardHeader className="bg-red-50 border-b border-red-100 pb-4">
                      <div className="flex items-center gap-2">
                         <ShieldCheck className="w-5 h-5 text-red-600"/>
                         <CardTitle className="text-red-900 text-lg">Fraud Anomalies</CardTitle>
                      </div>
                      <CardDescription className="text-red-800/70 mt-1">AI-flagged claims requiring manual review prior to processing.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 bg-white">
                      {MOCK_FRAUD_LOGS.map((log, i) => (
                        <div key={log.id} className={`p-5 ${i !== 0 ? 'border-t border-zinc-100' : ''}`}>
                          <div className="flex justify-between items-start mb-3">
                             <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider bg-red-50 text-red-700 border-red-200">{log.type}</Badge>
                             <span className="text-xs font-mono font-bold text-zinc-400">{log.worker}</span>
                          </div>
                          <p className="text-sm text-zinc-700 mb-4 leading-relaxed font-medium">{log.details}</p>
                          <div className="flex items-center justify-between text-xs bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
                            <span className="text-zinc-600 font-bold">Conf: {log.confidence}</span>
                            <span className="text-red-600 font-bold">{log.action}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                </div>

              </div>
            </div>
          )}

          {/* TAB: WORKER REGISTRY */}
          {activeTab === "registry" && (
            <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-1">Worker Registry Database</h2>
                  <p className="text-zinc-500 font-medium">Complete record of onboarded partners mapped to Dynamic Premium Risk logic.</p>
                </div>
                <div className="flex gap-2">
                   <Button variant="outline" className="font-semibold text-zinc-700 bg-white shadow-sm border-zinc-200 hover:bg-zinc-50"><Filter className="w-4 h-4 mr-2"/> Filters</Button>
                   <Button className="bg-zinc-900 text-white hover:bg-zinc-800 font-bold shadow-md">Export Payload (CSV)</Button>
                </div>
              </div>

              <div className="bg-white border text-left border-zinc-200 rounded-2xl shadow-sm overflow-hidden mt-8">
                <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-zinc-50/80 border-b border-zinc-200 text-zinc-500 uppercase text-xs font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-5">Partner Profile</th>
                      <th className="px-6 py-5">Zone / City</th>
                      <th className="px-6 py-5">Verified Coverage</th>
                      <th className="px-6 py-5">AI Risk Rating</th>
                      <th className="px-6 py-5">Active Wk. Premium</th>
                      <th className="px-6 py-5 text-right">Ledger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {MOCK_WORKERS.map((worker) => (
                      <tr key={worker.id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-zinc-950 text-base">{worker.name}</div>
                          <div className="text-xs text-zinc-500 font-mono mt-1 tracking-tight">{worker.id} • {worker.platform}</div>
                        </td>
                        <td className="px-6 py-4 text-zinc-900 font-semibold">{worker.city}</td>
                        <td className="px-6 py-4">
                          {worker.status === "Protected" ? (
                            <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 px-2.5 py-1 rounded-lg shadow-sm font-bold shadow-green-100">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5"/> {worker.activeCoverage}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-zinc-500 border-zinc-200 bg-zinc-50 px-2.5 py-1 rounded-lg font-bold shadow-sm">
                              <XCircle className="w-3.5 h-3.5 mr-1.5"/> Uninsured
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3 w-32">
                             <div className="w-full bg-zinc-100 rounded-full h-2.5 overflow-hidden">
                               <div className={`h-2.5 rounded-full ${worker.riskScore > 80 ? 'bg-red-500' : worker.riskScore > 60 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${worker.riskScore}%` }}></div>
                             </div>
                             <span className="text-xs font-mono font-bold text-zinc-600">{worker.riskScore}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                          {worker.premium > 0 ? (
                             <span className="font-mono font-bold text-zinc-900 bg-zinc-100 px-2 py-1 rounded-md border border-zinc-200">₹{worker.premium}</span>
                          ) : (
                             <span className="font-mono text-zinc-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="text-blue-600 font-bold hover:text-blue-800 hover:bg-blue-50">View &rarr;</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: FRAUD */}
          {activeTab === "fraud" && (
             <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in zoom-in-95 duration-500">
               <div className="w-20 h-20 bg-zinc-100 border-2 border-dashed border-zinc-300 rounded-full flex items-center justify-center mb-6">
                 <ShieldCheck className="w-8 h-8 text-zinc-400" />
               </div>
               <h2 className="text-2xl font-bold mb-2">Fraud Analysis Engine</h2>
               <p className="text-zinc-500 max-w-md">Gemini is currently monitoring real-time claim executions. High confidence anomalies will populate the registry overview tab.</p>
             </div>
          )}

        </div>
      </main>

    </div>
  );
}

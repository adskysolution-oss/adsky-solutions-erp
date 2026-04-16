'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  IndianRupee, 
  Zap, 
  Activity, 
  TrendingUp, 
  ArrowUpRight, 
  ShieldCheck,
  Globe,
  Database,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({
    users: 1280,
    partners: 84,
    employees: 156,
    submissions: 2450,
    totalRevenue: 154200,
    todayRevenue: 4200,
    health: 'Optimal'
  });

  const cards = [
    { title: 'Total Userbase', value: stats.users, icon: Users, color: 'text-sky-600', bg: 'bg-sky-50' },
    { title: 'Certified Partners', value: stats.partners, icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Field Force', value: stats.employees, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Mission Queue', value: stats.submissions, icon: Activity, color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-10 pb-32">
      {/* Global Command Header */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 blur-[120px] -mr-48 -mt-48 transition-all group-hover:bg-sky-500/10" />
         
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl">
               <ShieldCheck size={40} />
            </div>
            <div>
               <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">Command <span className="text-sky-600">Cockpit</span></h1>
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Super Admin Priority Access</span>
                  <div className="h-1 w-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> System {stats.health}</span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3 relative z-10">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl flex items-center gap-4">
               <div>
                  <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">Node Status</p>
                  <p className="text-sm font-black text-slate-900 uppercase italic">Mumbai_DC_1</p>
               </div>
               <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                  <Globe size={20} />
               </div>
            </div>
         </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {cards.map((card, idx) => (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: idx * 0.1 }}
             key={card.title}
             className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-sky-500/5 transition-all group"
           >
              <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                 <card.icon size={28} />
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 italic">{card.title}</p>
              <div className="flex items-baseline justify-between">
                 <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">{card.value.toLocaleString()}</h3>
                 <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">+12%</span>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Financial Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 p-12 bg-slate-900 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-600/10 blur-[150px] -mr-44 -mb-44" />
            <div className="relative z-10 flex flex-col h-full justify-between">
               <div className="flex justify-between items-start mb-20">
                  <div>
                     <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400 mb-4">Financial Liquidity Pulse</h4>
                     <p className="text-7xl font-black italic tracking-tighter">₹{stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-2">Today's Inflow</p>
                     <div className="bg-sky-500/10 border border-sky-500/20 px-4 py-2 rounded-2xl flex items-center gap-3">
                        <IndianRupee size={18} className="text-sky-400" />
                        <span className="text-xl font-black italic">₹{stats.todayRevenue.toLocaleString()}</span>
                     </div>
                  </div>
               </div>
               
               <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5">
                  <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase text-slate-500">Waitlist Flow</p>
                     <p className="text-xl font-black">2.4k <span className="text-[10px] text-emerald-500 ml-1 font-black">ACTIVE</span></p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase text-slate-500">Node Settlements</p>
                     <p className="text-xl font-black text-sky-400">Verified</p>
                  </div>
                  <div className="flex justify-end">
                     <button className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-sky-600/20 transition-all active:scale-[0.98]">
                        View Treasury
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <div className="p-10 bg-white border border-slate-100 rounded-[3.5rem] flex flex-col justify-between">
            <div>
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 italic">System Orchestration</h4>
               <div className="space-y-6">
                  {[
                    { label: 'Database Health', status: 'Optimal', icon: Database, color: 'text-emerald-500' },
                    { label: 'API Gateway', status: 'Stable', icon: Activity, color: 'text-sky-500' },
                    { label: 'Fraud Sensor', status: 'Active', icon: ShieldCheck, color: 'text-indigo-500' }
                  ].map(stat => (
                    <div key={stat.label} className="flex items-center justify-between group cursor-help">
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                             <stat.icon size={20} />
                          </div>
                          <span className="text-xs font-black text-slate-900 italic">{stat.label}</span>
                       </div>
                       <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{stat.status}</span>
                    </div>
                  ))}
               </div>
            </div>
            
            <button className="w-full py-5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all flex items-center justify-center gap-3">
               Full System Audit <ArrowUpRight size={16} />
            </button>
         </div>
      </div>

      {/* Live Activity Feed */}
      <div className="p-12 bg-white border border-slate-100 rounded-[4rem] shadow-sm">
         <div className="flex items-center justify-between mb-12">
            <div>
               <h3 className="text-xl font-black text-slate-900 tracking-tighter italic">Intelligence <span className="text-sky-600">Stream</span></h3>
               <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mt-1">Real-time System Logs</p>
            </div>
            <div className="flex gap-4">
               <div className="h-4 w-4 bg-sky-600 rounded-full animate-pulse" />
            </div>
         </div>

         <div className="space-y-6">
            {[
              { id: 'LOG-492', action: 'Certified Partner Payout Settled', time: '2 mins ago', actor: 'SYSTEM_CRON', type: 'financial' },
              { id: 'LOG-491', action: 'New Employee Node Generated: ADS-E-294', time: '14 mins ago', actor: 'Partner_ADS029', type: 'ops' },
              { id: 'LOG-490', action: 'Waitlist Submission Approved', time: '28 mins ago', actor: 'Admin_Super', type: 'leads' }
            ].map(log => (
              <div key={log.id} className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 hover:bg-white border border-slate-50 hover:border-slate-100 transition-all group">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-sky-600 shadow-sm transition-colors">
                       <Clock size={20} />
                    </div>
                    <div>
                       <p className="text-sm font-black text-slate-900 tracking-tight italic">{log.action}</p>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{log.time} • Actor: <span className="text-sky-600">{log.actor}</span></p>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-300 font-mono italic">{log.id}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}

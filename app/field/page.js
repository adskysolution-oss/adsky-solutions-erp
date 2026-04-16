'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Zap, 
  IndianRupee, 
  Activity, 
  TrendingUp, 
  ArrowUpRight, 
  MapPin,
  Globe,
  Database,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  Share2,
  Wallet,
  UserPlus,
  Compass,
  LayoutGrid,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EmployeeFieldDashboard() {
  const [stats, setStats] = useState({
    leads: 154,
    conversion: 82,
    earnings: 6200,
    dailyTarget: 5,
    todayLeads: 3,
    status: 'Mission Active'
  });

  const cards = [
    { title: 'Total Leads', value: stats.leads, icon: Users, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Conversion', value: `${stats.conversion}%`, icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8 pb-32">
      {/* Field Command Header */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] -mr-32 -mt-32 transition-all group-hover:bg-amber-500/10" />
         
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
               <UserPlus size={28} />
            </div>
            <div>
               <h1 className="text-2xl font-black text-slate-900 tracking-tighter italic leading-none mb-1.5">Agent <span className="text-amber-500">Node</span></h1>
               <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase text-amber-500 tracking-[0.2em] flex items-center gap-1.5"><div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-glow shadow-amber-200" /> {stats.status}</span>
               </div>
            </div>
         </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-2 gap-4">
         {cards.map((card, idx) => (
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: idx * 0.1 }}
             key={card.title}
             className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm relative overflow-hidden group"
           >
              <div className={`w-10 h-10 ${card.bg} ${card.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                 <card.icon size={20} />
              </div>
              <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">{card.title}</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter italic">{card.value}</h3>
           </motion.div>
         ))}
      </div>

      {/* Target Orchestration */}
      <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
         <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] -mr-32 -mb-32 transition-all group-hover:bg-amber-500/20" />
         <div className="relative z-10 space-y-8">
            <div className="flex justify-between items-start">
               <div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-400 mb-2 italic">Daily Lead Target</h4>
                  <p className="text-4xl font-black italic tracking-tighter">{stats.todayLeads} / {stats.dailyTarget}</p>
               </div>
               <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-400">
                  <TrendingUp size={28} />
               </div>
            </div>

            <div className="space-y-3">
               <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
                  <span>Daily Progress</span>
                  <span className="text-amber-400">{(stats.todayLeads / stats.dailyTarget) * 100}%</span>
               </div>
               <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.todayLeads / stats.dailyTarget) * 100}%` }}
                    className="h-full bg-amber-500 shadow-glow shadow-amber-500/40"
                  />
               </div>
            </div>

            <Link href="/field/onboard" className="w-full flex items-center justify-between p-4 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-amber-500/20 transition-all active:scale-[0.98]">
               Onboard New Farmer <ArrowUpRight size={18} />
            </Link>
         </div>
      </div>

      {/* Earnings Pulse */}
      <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -mr-16 -mt-16" />
         <div className="flex items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
               <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-inner">
                  <IndianRupee size={28} />
               </div>
               <div>
                  <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Total Commission</p>
                  <p className="text-3xl font-black italic tracking-tighter text-slate-900 italic">₹{stats.earnings.toLocaleString()}</p>
               </div>
            </div>
            <Link href="/field/history" className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
               <TrendingUp size={20} />
            </Link>
         </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 gap-4">
         <Link href="/field/history" className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-amber-500/30 transition-all group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-amber-600 mb-4 shadow-sm">
               <Database size={20} />
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-900 italic">Mission History</p>
         </Link>
         <button className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-emerald-500/30 transition-all group text-left">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 mb-4 shadow-sm">
               <Smartphone size={20} />
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-900 italic">Saved Drafts</p>
         </button>
      </div>

      {/* Sentinel Security Node */}
      <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-[2rem]">
         <div className="flex items-start gap-4">
            <ShieldCheck size={24} className="text-indigo-600 shrink-0" />
            <p className="text-[9px] text-indigo-900 font-black italic uppercase leading-relaxed tracking-tight">
              Location DNA active. All missions are geospatially verified. Maintain mission honesty for optimal commission payouts.
            </p>
         </div>
      </div>
    </div>
  );
}

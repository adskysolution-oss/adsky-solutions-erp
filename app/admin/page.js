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
  BarChart3,
  Monitor,
  ArrowRight,
  Flame,
  Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    { 
        title: 'Total Userbase', 
        value: stats.users, 
        icon: Users, 
        color: 'text-vibrant-indigo', 
        bg: 'bg-indigo-50', 
        glow: 'glow-indigo',
        gradient: 'from-indigo-500/20 to-sky-500/10'
    },
    { 
        title: 'Certified Partners', 
        value: stats.partners, 
        icon: Briefcase, 
        color: 'text-vibrant-emerald', 
        bg: 'bg-emerald-50', 
        glow: 'glow-emerald',
        gradient: 'from-emerald-500/20 to-teal-500/10'
    },
    { 
        title: 'Field Force', 
        value: stats.employees, 
        icon: Zap, 
        color: 'text-vibrant-amber', 
        bg: 'bg-amber-50', 
        glow: 'glow-amber',
        gradient: 'from-amber-500/20 to-orange-500/10'
    },
    { 
        title: 'Mission Queue', 
        value: stats.submissions, 
        icon: Activity, 
        color: 'text-vibrant-rose', 
        bg: 'bg-rose-50', 
        glow: 'glow-rose',
        gradient: 'from-rose-500/20 to-pink-500/10'
    },
  ];

  return (
    <div className="space-y-12 pb-32 mesh-gradient-vibrant min-h-screen pt-4 px-4">
      {/* Dynamic Command Hub */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 rounded-[4rem] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 group shadow-2xl shadow-indigo-500/5"
      >
         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-rose-500/5 to-amber-500/5 opacity-50" />
         
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl glow-indigo group-hover:rotate-6 transition-transform duration-500">
               <ShieldCheck size={48} />
            </div>
            <div>
               <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic leading-none mb-3">
                  Command <span className="text-gradient-vibrant">Cockpit</span>
               </h1>
               <div className="flex items-center gap-4">
                  <span className="text-[11px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full tracking-[0.2em] italic shadow-sm">Super Admin Priority Access</span>
                  <div className="h-1.5 w-1.5 bg-slate-300 rounded-full" />
                  <span className="text-[11px] font-black uppercase text-emerald-600 tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" /> 
                    System {stats.health}
                  </span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3 relative z-10">
            <div className="glass-card bg-white/40 p-5 rounded-[2.5rem] flex items-center gap-6 shadow-inner tracking-tight">
               <div className="text-right">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.3em] mb-1">Active Intelligence</p>
                  <p className="text-lg font-black text-slate-900 uppercase italic">Mumbai_DC_1</p>
               </div>
               <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg glow-rose">
                  <Globe size={24} />
               </div>
            </div>
         </div>
      </motion.div>

      {/* High-Contrast KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
         {cards.map((card, idx) => (
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: idx * 0.1 }}
             key={card.title}
             className={`p-10 glass-card rounded-[3.5rem] shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden border-white/50`}
           >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />
              
              <div className={`w-16 h-16 ${card.bg} ${card.color} rounded-3xl flex items-center justify-center mb-8 shadow-inner ${card.glow} group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                 <card.icon size={32} />
              </div>
              
              <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.25em] mb-2 italic relative z-10">{card.title}</p>
              
              <div className="flex items-baseline justify-between relative z-10">
                 <h3 className="text-5xl font-black text-slate-900 tracking-tighter italic">{card.value.toLocaleString()}</h3>
                 <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl shadow-sm border border-emerald-100">
                    <TrendingUp size={12} className="font-bold" />
                    <span className="text-xs font-black">+12%</span>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Financial Pulse & Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 p-14 bg-slate-900 text-white rounded-[4rem] shadow-[0_20px_80px_rgba(30,41,59,0.4)] relative overflow-hidden group border-4 border-slate-800"
         >
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-500/20 via-rose-500/20 to-transparent blur-[120px] -mr-40 -mt-40 transition-all duration-1000 group-hover:opacity-80" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
               <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-24">
                  <div>
                     <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-6 bg-white/5 w-fit px-4 py-1.5 rounded-full border border-white/10">
                        <Flame size={14} className="text-rose-500 animate-bounce" />
                        Enterprise Liquidity Stream
                     </span>
                     <p className="text-8xl font-black italic tracking-tighter leading-none mb-2">₹{stats.totalRevenue.toLocaleString()}</p>
                     <p className="text-slate-400 font-bold ml-2">Verified Blockchain Settlements</p>
                  </div>
                  <div className="text-right glass-card border-white/10 bg-white/5 p-6 rounded-[2.5rem] min-w-[200px] hover:bg-white/10 transition-all">
                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mb-4">Today's Inflow</p>
                     <div className="flex items-center justify-end gap-3 text-emerald-400">
                        <IndianRupee size={28} className="glow-emerald" />
                        <span className="text-4xl font-black italic">₹{stats.todayRevenue.toLocaleString()}</span>
                     </div>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 pt-12 border-t border-white/10">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Growth Velocity</p>
                     <p className="text-3xl font-black text-gradient-vibrant bg-gradient-to-r from-emerald-400 to-sky-400 italic">2.4x</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Active Channels</p>
                     <p className="text-3xl font-black text-rose-400 italic">294 <span className="text-xs text-slate-500 font-black">GLOBAL</span></p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">System Health</p>
                     <p className="text-3xl font-black text-sky-400 italic">SECURE</p>
                  </div>
                  <div className="flex items-center justify-end">
                     <button className="h-16 w-16 bg-white hover:bg-indigo-400 text-slate-900 hover:text-white rounded-[1.5rem] flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110">
                        <ArrowUpRight size={24} />
                     </button>
                  </div>
               </div>
            </div>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-12 glass-card rounded-[4rem] flex flex-col justify-between shadow-2xl border-white/60"
         >
            <div>
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Activity size={24} />
                  </div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-950 italic">System Vitality</h4>
               </div>

               <div className="space-y-8">
                  {[
                    { label: 'Database Mesh', status: 'Optimal', icon: Database, color: 'text-vibrant-emerald', bg: 'bg-emerald-50' },
                    { label: 'API Orchestrator', status: 'Verifying', icon: Zap, color: 'text-vibrant-sky', bg: 'bg-sky-50' },
                    { label: 'Security Firewall', status: 'Defending', icon: ShieldCheck, color: 'text-vibrant-indigo', bg: 'bg-indigo-50' },
                    { label: 'Lead Capture Engine', status: 'Flowing', icon: Flame, color: 'text-vibrant-rose', bg: 'bg-rose-50' }
                  ].map(stat => (
                    <div key={stat.label} className="flex items-center justify-between group">
                       <div className="flex items-center gap-6">
                          <div className={`w-14 h-14 ${stat.bg} rounded-[1.25rem] flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                             <stat.icon size={24} />
                          </div>
                          <div>
                            <span className="text-sm font-black text-slate-900 italic block">{stat.label}</span>
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{stat.status}</span>
                          </div>
                       </div>
                       <div className="w-10 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${stat.bg.replace('-50', '-500')} w-3/4`} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            
            <button className="group mt-12 w-full py-6 bg-slate-900 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all overflow-hidden relative shadow-2xl shadow-indigo-500/20 active:scale-95">
               <span className="relative z-10 flex items-center justify-center gap-4">
                  Full Diagnostic Sync <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
               </span>
               <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
         </motion.div>
      </div>

      {/* Intelligence Stream Activity */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-14 glass-card rounded-[5rem] shadow-2xl border-white/50 relative overflow-hidden"
      >
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-emerald-500 to-rose-500" />
         
         <div className="flex items-center justify-between mb-16 px-4">
            <div>
               <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic">Intelligence <span className="text-gradient-vibrant">Pulse</span></h3>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] mt-2">Real-time Enterprise Signal Stream</p>
            </div>
            <div className="flex items-center gap-6 glass-card p-4 rounded-3xl bg-slate-50/50">
               <div className="text-right">
                  <p className="text-[8px] font-black uppercase text-slate-400">Stream Status</p>
                  <p className="text-xs font-black text-emerald-600 italic">CONNECTED</p>
               </div>
               <div className="h-6 w-6 bg-emerald-500 rounded-full animate-ping opacity-20" />
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 'ADS-SEC-492', action: 'Identity Verification Completed', time: '2m ago', color: 'bg-indigo-500' },
              { id: 'ADS-FIN-491', action: 'Revenue Settlement Dispatched', time: '14m ago', color: 'bg-emerald-500' },
              { id: 'ADS-CMS-490', action: 'New Virtual Node Deployed', time: '28m ago', color: 'bg-rose-500' }
            ].map((log, idx) => (
              <div key={log.id} className="p-8 rounded-[3rem] bg-white border border-slate-50 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group flex flex-col justify-between h-56 relative overflow-hidden">
                 <div className={`absolute top-0 right-0 w-2 h-full ${log.color} opacity-10 group-hover:opacity-100 transition-opacity`} />
                 <div>
                    <div className="flex items-center justify-between mb-6">
                        <div className="text-[10px] font-black text-slate-300 font-mono tracking-tighter uppercase italic">{log.id}</div>
                        <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-900 group-hover:text-white transition-all">
                           <Layout size={18} />
                        </div>
                    </div>
                    <p className="text-xl font-black text-slate-900 tracking-tight italic leading-tight group-hover:text-indigo-600 transition-colors">{log.action}</p>
                 </div>
                 <div className="flex items-center justify-between pt-6 mt-auto border-t border-slate-50">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                       <Clock size={12} /> {log.time}
                    </span>
                    <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                       <ArrowRight size={14} />
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </motion.div>
    </div>
  );
}

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
  ArrowRight,
  Flame,
  Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PartnerHubDashboard() {
  const [stats, setStats] = useState({
    employees: 12,
    farmers: 450,
    leads: 450,
    earnings: 125000,
    pendingCommission: 4500,
    activeMissions: 24,
    status: 'Operational'
  });

  const cards = [
    { 
        title: 'Field Force', 
        value: stats.employees, 
        icon: Users, 
        color: 'text-vibrant-indigo', 
        bg: 'bg-indigo-50', 
        glow: 'glow-indigo',
        gradient: 'from-indigo-500/20 to-sky-500/10'
    },
    { 
        title: 'Total Farmers', 
        value: stats.farmers, 
        icon: Globe, 
        color: 'text-vibrant-emerald', 
        bg: 'bg-emerald-50', 
        glow: 'glow-emerald',
        gradient: 'from-emerald-500/20 to-teal-500/10'
    },
    { 
        title: 'Regional Leads', 
        value: stats.leads, 
        icon: Activity, 
        color: 'text-vibrant-rose', 
        bg: 'bg-rose-50', 
        glow: 'glow-rose',
        gradient: 'from-rose-500/20 to-pink-500/10'
    },
    { 
        title: 'Active Missions', 
        value: stats.activeMissions, 
        icon: Zap, 
        color: 'text-vibrant-amber', 
        bg: 'bg-amber-50', 
        glow: 'glow-amber',
        gradient: 'from-amber-500/20 to-orange-500/10'
    },
  ];

  return (
    <div className="space-y-12 pb-32 mesh-gradient-vibrant min-h-screen pt-4 px-4">
      {/* Dynamic Partner Hub Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 rounded-[4rem] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 group shadow-2xl shadow-indigo-500/5 border-white/60"
      >
         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-rose-500/5 to-emerald-500/5 opacity-50" />
         
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 via-indigo-900 to-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl glow-indigo group-hover:rotate-6 transition-transform duration-500">
               <Globe size={48} />
            </div>
            <div>
               <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic leading-none mb-3">
                  Partner <span className="text-gradient-vibrant">Hub</span>
               </h1>
               <div className="flex items-center gap-4">
                  <span className="text-[11px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full tracking-[0.2em] italic shadow-sm">Maharashtra Operations Center</span>
                  <div className="h-1.5 w-1.5 bg-slate-300 rounded-full" />
                  <span className="text-[11px] font-black uppercase text-emerald-600 tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" /> 
                    Hub {stats.status}
                  </span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3 relative z-10">
            <div className="glass-card bg-white/40 p-5 rounded-[2.5rem] flex items-center gap-6 shadow-inner tracking-tight border-white/40">
               <div className="text-right">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.3em] mb-1">Identity Node</p>
                  <p className="text-lg font-black text-slate-900 uppercase italic">ADS-MH-001</p>
               </div>
               <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg glow-rose">
                  <Activity size={24} />
               </div>
            </div>
         </div>
      </motion.div>

      {/* Vibrant High-Level Metrics */}
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
                    <span className="text-xs font-black">+8%</span>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Vibrant Earnings & Wallet Control */}
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
                        Regional Earnings Pulse
                     </span>
                     <p className="text-8xl font-black italic tracking-tighter leading-none mb-2">₹{stats.earnings.toLocaleString()}</p>
                     <p className="text-slate-400 font-bold ml-2 italic">Accumulated Regional Settlements</p>
                  </div>
                  <div className="text-right glass-card border-white/10 bg-white/5 p-6 rounded-[2.5rem] min-w-[200px] hover:bg-white/10 transition-all">
                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mb-4">Pending Payout</p>
                     <div className="flex items-center justify-end gap-3 text-emerald-400">
                        <IndianRupee size={28} className="glow-emerald" />
                        <span className="text-4xl font-black italic">₹{stats.pendingCommission.toLocaleString()}</span>
                     </div>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 pt-12 border-t border-white/10">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-relaxed italic">Active Withdrawal Requests</p>
                     <p className="text-3xl font-black text-gradient-vibrant bg-gradient-to-r from-emerald-400 to-sky-400 italic">None</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-relaxed italic">Settlement Status</p>
                     <p className="text-3xl font-black text-rose-400 italic font-mono">SYNCED</p>
                  </div>
                  <div className="lg:col-span-2 flex items-center justify-end">
                     <button className="group px-12 py-6 bg-indigo-600 hover:bg-white text-white hover:text-indigo-600 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl shadow-indigo-500/30 active:scale-95 flex items-center gap-4">
                        Request Payout Cycle <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                     </button>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* Growth & Referrals - Vibrant Variant */}
         <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-12 glass-card rounded-[4rem] flex flex-col justify-between shadow-2xl border-white/60 relative overflow-hidden group"
         >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-transparent blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-all duration-1000" />
            
            <div className="relative z-10">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Share2 size={24} />
                  </div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-950 italic">Quick Expansion</h4>
               </div>

               <div className="space-y-6">
                  <button className="w-full p-8 glass-card bg-slate-50/50 border-white/60 rounded-[2.5rem] flex items-center justify-between group/action hover:bg-slate-900 hover:text-white transition-all duration-500 active:scale-95">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 group-hover/action:text-white group-hover/action:bg-white/10 shadow-inner">
                           <Layout size={24} />
                        </div>
                        <div className="text-left">
                           <p className="text-sm font-black italic">Referral Engine</p>
                           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/action:text-indigo-400">Copy Native Tracker</p>
                        </div>
                     </div>
                     <ArrowUpRight size={20} className="opacity-20 group-hover/action:opacity-100 transition-opacity" />
                  </button>

                  <button className="w-full p-8 glass-card bg-slate-50/50 border-white/60 rounded-[2.5rem] flex items-center justify-between group/action hover:bg-indigo-600 hover:text-white transition-all duration-500 active:scale-95">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-rose-500 group-hover/action:text-white group-hover/action:bg-white/10 shadow-inner">
                           <BarChart3 size={24} />
                        </div>
                        <div className="text-left">
                           <p className="text-sm font-black italic">Regional Insights</p>
                           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/action:text-indigo-100">Live Mission Stats</p>
                        </div>
                     </div>
                     <ArrowUpRight size={20} className="opacity-20 group-hover/action:opacity-100 transition-opacity" />
                  </button>
               </div>
            </div>
            
            <div className="mt-12 p-8 bg-gradient-to-r from-indigo-50 to-indigo-100/50 border border-indigo-200/50 rounded-[2.5rem] relative group/tip overflow-hidden">
               <div className="absolute inset-0 bg-white opacity-0 group-hover/tip:opacity-10 transition-opacity duration-500" />
               <div className="flex items-center gap-5 relative z-10">
                  <Flame size={28} className="text-rose-500 glow-rose animate-bounce" />
                  <p className="text-[11px] text-indigo-950 font-black italic leading-relaxed uppercase tracking-tight">
                    Next cycle starts in 48h. Boost regional lead density to maximize payout volume.
                  </p>
               </div>
            </div>
         </motion.div>
      </div>

      {/* Operation Intelligence Stream */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-14 glass-card rounded-[5rem] shadow-2xl border-white/50 relative overflow-hidden"
      >
         <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-rose-500 to-emerald-500" />
         
         <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 px-4">
            <div>
               <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic">Regional <span className="text-gradient-vibrant">Operations</span></h3>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] mt-2">Real-time Lead Intelligence Stream</p>
            </div>
            <div className="flex items-center gap-8 glass-card p-5 rounded-[2.5rem] bg-white/40 border-white/60">
               <div className="text-right">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Hub Flow Status</p>
                  <p className="text-xs font-black text-emerald-600 italic">SECURE & OPTIMIZED</p>
               </div>
               <div className="h-4 w-4 bg-emerald-500 rounded-full animate-ping shadow-[0_0_15px_#10b981]" />
            </div>
         </div>

         <div className="space-y-6">
            {[
              { id: 'ADS-MH-8042', action: 'New Farmer Onboarded', emp: 'EMP-001', location: 'Rewa, MP', time: '4m ago', status: 'verified', glow: 'glow-emerald' },
              { id: 'ADS-MP-8041', action: 'Lead Verification Complete', emp: 'EMP-042', location: 'Satna, MP', time: '18m ago', status: 'approved', glow: 'glow-indigo' },
              { id: 'ADS-GJ-8040', action: 'Identity Sequence Triggered', emp: 'EMP-007', location: 'Indore, MP', time: '32m ago', status: 'pending', glow: 'glow-amber' }
            ].map((log, idx) => (
              <div key={log.id} className="group p-8 rounded-[3.5rem] glass-card bg-white/60 border-white/60 hover:bg-slate-900 transition-all duration-700 cursor-pointer shadow-xl hover:shadow-indigo-500/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                 <div className="flex items-center gap-8 relative z-10">
                    <div className={`w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-white/10 group-hover:text-indigo-400 shadow-inner group-hover:shadow-none transition-all duration-500`}>
                       <Clock size={28} />
                    </div>
                    <div>
                       <p className="text-xl font-black text-slate-900 group-hover:text-white tracking-tight italic transition-colors duration-500">{log.action}</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 italic group-hover:text-slate-500 transition-colors"> 
                          Node: <span className="text-indigo-600 group-hover:text-indigo-400 transition-colors uppercase font-mono">{log.emp}</span> • {log.location} • {log.time}
                       </p>
                    </div>
                 </div>
                 <div className="flex items-center gap-8 relative z-10 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/10 pt-6 md:pt-0">
                    <span className="text-[11px] font-mono text-slate-300 font-bold italic tracking-tighter uppercase">{log.id}</span>
                    <span className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] italic border transition-colors duration-500 ${log.status === 'verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500' : 'bg-slate-50 text-slate-400 border-slate-100 group-hover:bg-white/10 group-hover:text-slate-100 group-hover:border-white/20'}`}>
                       {log.status}
                    </span>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}

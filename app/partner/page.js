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
  Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';

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
    { title: 'Field Force', value: stats.employees, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Total Farmers', value: stats.farmers, icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Regional Leads', value: stats.leads, icon: Activity, color: 'text-rose-500', bg: 'bg-rose-50' },
    { title: 'Active Missions', value: stats.activeMissions, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-10 pb-32">
      {/* Partner Hub Header */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] -mr-48 -mt-48 transition-all group-hover:bg-indigo-500/10" />
         
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
               <Globe size={40} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">Hub <span className="text-indigo-600">Dashboard</span></h1>
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Maharashtra Operations Center</span>
                  <div className="h-1 w-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest italic flex items-center gap-1"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" /> Hub {stats.status}</span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-4 relative z-10">
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-3xl flex items-center gap-4 group/box cursor-pointer hover:bg-white transition-all">
               <div>
                  <p className="text-[8px] font-black uppercase text-indigo-400 tracking-widest mb-1 italic">Identity Node</p>
                  <p className="text-sm font-black text-indigo-900 uppercase italic">ADS-001</p>
               </div>
               <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:rotate-12 transition-transform">
                  <Activity size={20} />
               </div>
            </div>
         </div>
      </div>

      {/* High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {cards.map((card, idx) => (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: idx * 0.1 }}
             key={card.title}
             className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group"
           >
              <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                 <card.icon size={28} />
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 italic">{card.title}</p>
              <div className="flex items-baseline justify-between">
                 <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">{card.value.toLocaleString()}</h3>
                 <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">+8%</span>
              </div>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Earnings & Wallet Control */}
         <div className="lg:col-span-2 p-12 bg-slate-900 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] -mr-44 -mb-44 transition-all group-hover:bg-indigo-600/20" />
            <div className="relative z-10 flex flex-col h-full justify-between">
               <div className="flex justify-between items-start mb-16">
                  <div>
                     <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-4 italic">Accumulated Regional Earnings</h4>
                     <p className="text-7xl font-black italic tracking-tighter">₹{stats.earnings.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-2 italic">Pending Payout</p>
                     <div className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-2xl flex items-center gap-3">
                        <IndianRupee size={18} className="text-indigo-400" />
                        <span className="text-xl font-black italic">₹{stats.pendingCommission.toLocaleString()}</span>
                     </div>
                  </div>
               </div>
               
               <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5">
                  <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase text-slate-500 italic tracking-widest">Active Requests</p>
                     <p className="text-xl font-black">₹0 <span className="text-[9px] text-slate-600 ml-1 font-black uppercase">COMMITTED</span></p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase text-slate-500 italic tracking-widest">Settlement Node</p>
                     <p className="text-xl font-black text-indigo-400 italic">Sync Ready</p>
                  </div>
                  <div className="flex justify-end">
                     <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/20 transition-all active:scale-[0.98]">
                        Request Withdrawal
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Growth & Referrals */}
         <div className="p-10 bg-white border border-slate-100 rounded-[3.5rem] flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-all duration-700" />
            <div>
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 italic">Quick Actions</h4>
               <div className="space-y-6">
                  <button className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between group/action hover:bg-indigo-600 hover:text-white transition-all duration-500">
                     <div className="flex items-center gap-4">
                        <Share2 size={24} className="text-indigo-600 group-hover/action:text-white transition-colors" />
                        <div className="text-left">
                           <p className="text-xs font-black italic">Copy Referral Link</p>
                           <p className="text-[8px] font-black uppercase tracking-widest opacity-60">ADS-001 Native Tracker</p>
                        </div>
                     </div>
                     <ArrowUpRight size={18} className="opacity-20 group-hover/action:opacity-100" />
                  </button>
                  <button className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between group/action hover:bg-slate-900 hover:text-white transition-all duration-500">
                     <div className="flex items-center gap-4">
                        <BarChart3 size={24} className="text-slate-400 group-hover/action:text-white transition-colors" />
                        <div className="text-left">
                           <p className="text-xs font-black italic font-sans">View Performance Analytics</p>
                           <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Regional Statistics</p>
                        </div>
                     </div>
                     <ArrowUpRight size={18} className="opacity-20 group-hover/action:opacity-100" />
                  </button>
               </div>
            </div>
            
            <div className="mt-8 p-6 bg-indigo-50 border border-indigo-100 rounded-[2rem]">
               <div className="flex items-center gap-4">
                  <Zap size={24} className="text-indigo-600 animate-pulse" />
                  <p className="text-[10px] text-indigo-900 leading-relaxed font-black italic uppercase tracking-tight">
                    Next settlement cycle begins in 48 hours. Maximize regional lead approvals to increase payout.
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* Regional Operation Stream */}
      <div className="p-12 bg-white border border-slate-100 rounded-[4rem] shadow-sm relative overflow-hidden">
         <div className="flex items-center justify-between mb-12">
            <div>
               <h3 className="text-xl font-black text-slate-900 tracking-tighter italic">Regional <span className="text-indigo-600">Operations</span></h3>
               <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mt-1 italic">Real-time Lead Activity</p>
            </div>
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse shadow-glow shadow-indigo-200" />
         </div>

         <div className="space-y-5">
            {[
              { id: 'LD-8042', action: 'New Farmer Onboarded', emp: 'EMP-001', location: 'Rewa, MP', time: '4 mins ago', status: 'submitted' },
              { id: 'LD-8041', action: 'Lead Verification Complete', emp: 'EMP-042', location: 'Satna, MP', time: '18 mins ago', status: 'approved' },
              { id: 'LD-8040', action: 'Payment Re-triggered', emp: 'EMP-007', location: 'Indore, MP', time: '32 mins ago', status: 'pending' }
            ].map(log => (
              <div key={log.id} className="flex items-center justify-between p-6 rounded-[2.5rem] bg-slate-50 hover:bg-white border border-slate-50 hover:border-slate-100 transition-all group cursor-pointer shadow-sm hover:shadow-xl">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-200 group-hover:text-indigo-600 shadow-sm transition-colors border border-slate-50">
                       <Clock size={24} />
                    </div>
                    <div>
                       <p className="text-sm font-black text-slate-900 tracking-tight italic">{log.action}</p>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 italic"> 
                          Agent: <span className="text-indigo-600">{log.emp}</span> • {log.location} • {log.time}
                       </p>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-[8px] font-black uppercase tracking-widest italic text-slate-400 group-hover:text-indigo-600 transition-colors">
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

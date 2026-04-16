'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  ArrowRight, 
  IndianRupee, 
  TrendingUp, 
  Clock, 
  Loader2,
  PieChart,
  LayoutDashboard,
  Zap,
  Target,
  QrCode,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmployeeDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    conversionRate: 0,
    earnings: 0,
    pendingVerification: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo data for Agent
    setTimeout(() => {
      setStats({
        totalLeads: 24,
        conversionRate: 85,
        earnings: 1200,
        pendingVerification: 6
      });
      setLoading(false);
    }, 1000);
  }, []);

  const cards = [
    { title: 'My Leads', value: stats.totalLeads, icon: Target, color: 'text-sky-600', bg: 'bg-sky-50' },
    { title: 'Success Rate', value: `${stats.conversionRate}%`, icon: PieChart, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'My Total Earnings', value: `₹${stats.earnings}`, icon: IndianRupee, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Under Process', value: stats.pendingVerification, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] -mr-32 -mt-32" />
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-sky-200">
               <Zap size={32} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">Field <span className="text-sky-600">Performance</span></h1>
               <p className="text-slate-500 font-medium text-sm mt-1">Live reward tracking for field agents.</p>
            </div>
         </div>
         <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 relative z-10">
            <p className="text-[10px] font-black uppercase text-emerald-700 tracking-widest mb-1 text-center">Your Status</p>
            <div className="flex items-center gap-2">
               <Sparkles size={16} className="text-emerald-500" />
               <span className="text-xl font-black text-emerald-900 uppercase italic">Top Performer</span>
            </div>
         </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={card.title}
            className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 transition-all group"
          >
            <div className="flex flex-col gap-6">
              <div className={`w-14 h-14 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <card.icon size={28} />
              </div>
              <div>
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">{card.title}</p>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{card.value}</h3>
                  <span className="text-emerald-600 text-[10px] font-black bg-emerald-50 px-2 py-1 rounded-lg">High</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* QR Onboarding Card */}
         <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-48 h-48 bg-slate-900 p-6 rounded-[2.5rem] mb-8 shadow-2xl relative group">
               <div className="absolute inset-0 bg-sky-600/20 blur-[50px] group-hover:scale-150 transition-transform duration-1000" />
               <QrCode size={160} className="text-white relative z-10" />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2 italic">Instant <span className="text-sky-600">Farmer Onboarding</span></h3>
            <p className="text-slate-500 text-sm max-w-xs mb-8">Scan this code to launch the registration form instantly with your agent ID prepopulated.</p>
            <button className="w-full py-5 bg-sky-600 text-white hover:bg-sky-700 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-sky-200 flex items-center justify-center gap-3 active:scale-[0.98]">
               Register Now
               <ArrowRight size={22} />
            </button>
         </div>

         {/* Earnings Ledger (Compact) */}
         <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-emerald-500 pl-4 mb-10 italic">Reward Milestone</h3>
            <div className="space-y-6">
               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress to ₹5,000 Payout</p>
                     <p className="text-xs font-black text-slate-900">₹1,200 / ₹5,000</p>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                     <div className="w-[24%] h-full bg-emerald-500 rounded-full" />
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-100 flex flex-col items-center text-center">
                     <p className="text-[8px] font-black text-indigo-400 uppercase mb-1">Rank</p>
                     <p className="text-xl font-black text-indigo-900 italic">#4</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-orange-50 border border-orange-100 flex flex-col items-center text-center">
                     <p className="text-[8px] font-black text-orange-400 uppercase mb-1">Zone</p>
                     <p className="text-xl font-black text-orange-900 italic">West</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

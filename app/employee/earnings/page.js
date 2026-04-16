'use client';

import React, { useState, useEffect } from 'react';
import { IndianRupee, PieChart, TrendingUp, Calendar, ArrowDownLeft, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmployeeEarningsPage() {
  const [stats, setStats] = useState({ total: 3600, pending: 450, onboards: 24 });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHistory([
        { id: 1, amount: 50, source: 'Lead: Rahul S.', date: '2026-04-15' },
        { id: 2, amount: 50, source: 'Lead: Vijay K.', date: '2026-04-14' },
        { id: 3, amount: 50, source: 'Lead: Sanjay M.', date: '2026-04-12' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-8 pb-32 font-sans">
      {/* Visual Summary */}
      <div className="relative p-12 rounded-[3.5rem] bg-[#0F172A] border border-white/5 overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] -mr-40 -mt-40" />
         
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div>
               <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                 <Sparkles size={14} /> My Performance
               </p>
               <h1 className="text-5xl font-black text-white italic tracking-tighter mb-2">₹{stats.total.toLocaleString()}.00</h1>
               <p className="text-slate-500 text-sm font-medium">Accumulated rewards for this quarter.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                  <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Onboards</p>
                  <p className="text-xl font-black text-white italic">{stats.onboards}</p>
               </div>
               <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                  <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Success Rate</p>
                  <p className="text-xl font-black text-emerald-400 italic">92%</p>
               </div>
            </div>
         </div>
      </div>

      {/* Reward History */}
      <div className="space-y-6">
         <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
           <PieChart size={16} /> Individual Reward Logs
         </h3>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {loading ? (
             <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-blue-500" /></div>
           ) : (
             history.map((item) => (
               <div key={item.id} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-between group hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <ArrowDownLeft size={18} />
                     </div>
                     <div>
                        <p className="text-white font-bold text-xs tracking-tight">{item.source}</p>
                        <p className="text-slate-500 text-[8px] font-black uppercase">{item.date}</p>
                     </div>
                  </div>
                  <span className="text-emerald-400 font-black italic text-sm">+₹{item.amount}</span>
               </div>
             ))
           )}
         </div>
      </div>

      {/* Promotion Banner */}
      <div className="p-8 rounded-[2.5rem] bg-gradient-to-r from-emerald-600/10 to-blue-600/10 border border-white/5 text-center">
         <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">Leaderboard Bonus</p>
         <p className="text-white text-sm font-medium">Onboard <span className="text-blue-400 font-bold">10 more farmers</span> this week to unlock an extra ₹500 bonus!</p>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Zap, Search, Filter, ArrowRight, MapPin, Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MissionQueue() {
  const submissions = [
    { id: 'SUB-9021', name: 'Raj Kumar', phone: '9876543210', location: 'Satna, MP', partner: 'ADS-101', status: 'review', date: '2m ago' },
    { id: 'SUB-9020', name: 'Suresh Patel', phone: '9123456789', location: 'Surat, GJ', partner: 'ADS-102', status: 'approved', date: '15m ago' },
    { id: 'SUB-9019', name: 'Amit Singh', phone: '9000000000', location: 'Mumbai, MH', partner: 'ADS-101', status: 'rejected', date: '1h ago' },
  ];

  const getStatusStyle = (status) => {
    switch(status) {
      case 'approved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'rejected': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  return (
    <div className="space-y-8 pb-32 pt-4 px-4 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">
              Mission <span className="text-vibrant-rose">Queue</span>
           </h1>
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Real-time Registration & Lead Stream</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-3 px-6 py-4 glass-card bg-white border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-all">
              <Calendar size={16} /> Export Reports
           </button>
        </div>
      </div>

      <div className="p-8 glass-card rounded-[3.5rem] shadow-xl border-white/60">
         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
            <div className="relative group max-w-md w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={18} />
               <input 
                 type="text" 
                 placeholder="Search Mission ID, Name, or Phone..." 
                 className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-rose-500/5 focus:bg-white text-sm font-bold transition-all"
               />
            </div>
            <div className="flex items-center gap-3">
               <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
                  <Filter size={14} /> Filters
               </button>
               <div className="h-6 w-1 border-l border-slate-200" />
               <div className="flex gap-2">
                  {['all', 'review', 'approved', 'rejected'].map((s) => (
                    <button key={s} className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest italic border transition-all ${s === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-400 border-slate-100'}`}>
                      {s}
                    </button>
                  ))}
               </div>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-4">
               <thead>
                  <tr className="text-left text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">
                     <th className="px-8 pb-2">Mission ID</th>
                     <th className="px-8 pb-2">Farmer Identity</th>
                     <th className="px-8 pb-2">Origin (Partner)</th>
                     <th className="px-8 pb-2">Location</th>
                     <th className="px-8 pb-2 text-right">Status Control</th>
                  </tr>
               </thead>
               <tbody>
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="group bg-white/40 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-2xl">
                       <td className="px-8 py-5 rounded-l-3xl border-y border-l border-white/60 text-[10px] font-black font-mono tracking-tighter italic">
                          {sub.id}
                       </td>
                       <td className="px-8 py-5 border-y border-white/60">
                          <div>
                             <p className="text-[13px] font-black italic">{sub.name}</p>
                             <p className="text-[10px] font-bold text-slate-400 group-hover:text-slate-500">{sub.phone}</p>
                          </div>
                       </td>
                       <td className="px-8 py-5 border-y border-white/60 text-[11px] font-black tracking-widest uppercase">
                          {sub.partner}
                       </td>
                       <td className="px-8 py-5 border-y border-white/60">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 group-hover:text-white/60">
                             <MapPin size={14} /> {sub.location}
                          </div>
                       </td>
                       <td className="px-8 py-5 rounded-r-3xl border-y border-r border-white/60 text-right">
                          <div className="flex items-center justify-end gap-4">
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest italic border ${getStatusStyle(sub.status)} group-hover:bg-white group-hover:text-slate-900`}>
                                {sub.status}
                             </span>
                             <button className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-white/10 flex items-center justify-center text-slate-300 group-hover:text-white transition-all">
                                <ArrowRight size={16} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

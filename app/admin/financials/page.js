'use client';

import React from 'react';
import { IndianRupee, Search, Filter, ArrowUpRight, ArrowDownLeft, Wallet, CreditCard, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FinancialTransactions() {
  const transactions = [
    { id: 'TXN-8802', type: 'credit', amount: 4200, status: 'success', method: 'Cashfree', date: '5m ago', note: 'Partner ADS-101 Settlement' },
    { id: 'TXN-8801', type: 'debit', amount: 1500, status: 'pending', method: 'Bank Transfer', date: '22m ago', note: 'Agent EMP-900 Commission' },
    { id: 'TXN-8800', type: 'credit', amount: 249, status: 'success', method: 'Razorpay', date: '1h ago', note: 'Farmer Application Fee' },
  ];

  return (
    <div className="space-y-8 pb-32 pt-4 px-4 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">
              Financial <span className="text-vibrant-emerald">Ledger</span>
           </h1>
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Corporate Treasury & Settlement Flow</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl shadow-xl shadow-indigo-500/10 active:scale-95 transition-all">
              <Wallet size={18} />
              <span className="text-xs font-black uppercase tracking-widest italic">Process Payout Cycle</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { title: 'Total Inflow', value: '₹1.54M', icon: ArrowUpRight, color: 'text-emerald-500', bg: 'bg-emerald-50' },
           { title: 'Total Outflow', value: '₹42,500', icon: ArrowDownLeft, color: 'text-rose-500', bg: 'bg-rose-50' },
           { title: 'System Balance', value: '₹1.12M', icon: IndianRupee, color: 'text-indigo-500', bg: 'bg-indigo-50' },
           { title: 'Pending Settlement', value: '₹12,400', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
         ].map((card, idx) => (
           <div key={idx} className="p-6 glass-card rounded-[2rem] shadow-lg border-white/60 group hover:shadow-xl transition-all">
              <div className={`w-10 h-10 ${card.bg} ${card.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                 <card.icon size={20} />
              </div>
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">{card.title}</p>
              <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter">{card.value}</h3>
           </div>
         ))}
      </div>

      <div className="p-8 glass-card rounded-[3.5rem] shadow-xl border-white/60">
         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
            <div className="relative group max-w-md w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
               <input 
                 type="text" 
                 placeholder="Search Transaction ID or Note..." 
                 className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:bg-white text-sm font-bold transition-all"
               />
            </div>
            <div className="flex gap-2">
               {['all', 'credit', 'debit'].map((t) => (
                 <button key={t} className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest italic border transition-all ${t === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-400 border-slate-100'}`}>
                   {t}
                 </button>
               ))}
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-4">
               <thead>
                  <tr className="text-left text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">
                     <th className="px-8 pb-2">Reference</th>
                     <th className="px-8 pb-2">Description</th>
                     <th className="px-8 pb-2">Amount</th>
                     <th className="px-8 pb-2">Gateway</th>
                     <th className="px-8 pb-2 text-right">Status</th>
                  </tr>
               </thead>
               <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="group bg-white/40 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-2xl">
                       <td className="px-8 py-5 rounded-l-3xl border-y border-l border-white/60 text-[10px] font-black font-mono tracking-tighter italic">
                          {txn.id}
                       </td>
                       <td className="px-8 py-5 border-y border-white/60">
                          <p className="text-[13px] font-black italic">{txn.note}</p>
                          <p className="text-[9px] font-bold text-slate-400 group-hover:text-slate-500">{txn.date}</p>
                       </td>
                       <td className="px-8 py-5 border-y border-white/60">
                          <span className={`text-sm font-black italic ${txn.type === 'credit' ? 'text-emerald-600' : 'text-rose-500 group-hover:text-rose-400'}`}>
                             {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                          </span>
                       </td>
                       <td className="px-8 py-5 border-y border-white/60">
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/60">
                             <CreditCard size={14} /> {txn.method}
                          </div>
                       </td>
                       <td className="px-8 py-5 rounded-r-3xl border-y border-r border-white/60 text-right">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest italic border ${txn.status === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'} group-hover:bg-white group-hover:text-slate-900`}>
                             {txn.status}
                          </span>
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

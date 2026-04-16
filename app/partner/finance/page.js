'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  IndianRupee, 
  TrendingUp, 
  Calendar, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft,
  Loader2,
  PieChart,
  Wallet,
  ArrowRight,
  History,
  FileText,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PartnerFinance() {
  const [balance, setBalance] = useState({ total: 10400, pending: 1200, withdrawn: 45000 });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHistory([
        { id: 1, type: 'credit', amount: 450, source: 'Team Lead: Mahesh D.', date: '2026-04-15', status: 'completed' },
        { id: 2, type: 'credit', amount: 300, source: 'Team Lead: Suresh P.', date: '2026-04-14', status: 'completed' },
        { id: 3, type: 'debit', amount: 15000, source: 'Bank Payout', date: '2026-04-05', status: 'pending' },
        { id: 4, type: 'credit', amount: 900, source: 'Bulk Registration Bonus', date: '2026-04-01', status: 'completed' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32" />
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-200">
               <Wallet size={32} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">Treasury <span className="text-emerald-600">& Wallets</span></h1>
               <p className="text-slate-500 font-medium text-sm mt-1 text-slate-400 uppercase tracking-widest text-[9px] font-black">Partner Financial Node</p>
            </div>
         </div>
         <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <ShieldCheck size={18} className="text-emerald-600" />
            <span className="text-xs font-black text-emerald-800 uppercase tracking-widest">Verified Merchant</span>
         </div>
      </div>

      {/* Wallet Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Balance Card */}
         <div className="lg:col-span-2 p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/10 blur-[120px] -mr-44 -mb-44 group-hover:bg-emerald-600/20 transition-all duration-1000" />
            <div className="relative z-10 space-y-12">
               <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500 mb-2 italic">Available Balance</h2>
                    <p className="text-6xl font-black italic tracking-tighter">₹{balance.total.toLocaleString()}</p>
                  </div>
                  <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-md">
                     <IndianRupee size={28} className="text-emerald-400" />
                  </div>
               </div>

               <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                  <div className="flex flex-col md:flex-row gap-8 justify-between">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">In Process</p>
                        <p className="text-xl font-black">₹{balance.pending.toLocaleString()}</p>
                     </div>
                     <div className="w-px h-10 bg-white/10 hidden md:block" />
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Lifetime Earnings</p>
                        <p className="text-xl font-black text-emerald-400">₹{balance.withdrawn.toLocaleString()}</p>
                     </div>
                     <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98] flex items-center gap-2">
                        Withdraw Funds <ArrowUpRight size={18} />
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Mini Performance */}
         <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-sky-600 pl-4 mb-10 italic">Monthly Growth</h3>
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600">
                     <TrendingUp size={24} />
                  </div>
                  <div>
                     <p className="text-2xl font-black text-slate-900 tracking-tighter">+₹4,200</p>
                     <p className="text-[9px] font-black text-emerald-600 uppercase">vs last month (+18%)</p>
                  </div>
               </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
               <div className="flex items-center gap-4">
                  <PieChart size={24} className="text-indigo-400" />
                  <p className="text-[10px] font-bold text-slate-500 leading-relaxed italic">
                    Your branch is in the <span className="text-slate-900">Top 5%</span> of earners this quarter!
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* History Table */}
      <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-emerald-500 pl-4 italic">Transaction Ledger</h3>
            <button className="text-emerald-600 text-[10px] font-black uppercase tracking-widest hover:text-emerald-800 transition-colors flex items-center gap-2">
               Download Report <FileText size={14} />
            </button>
         </div>

         <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group flex items-center justify-between">
                 <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                       {item.type === 'credit' ? <ArrowDownLeft size={22} /> : <ArrowUpRight size={22} />}
                    </div>
                    <div>
                       <p className="text-sm font-black text-slate-900 italic tracking-tight uppercase group-hover:text-emerald-600 transition-colors">{item.source}</p>
                       <div className="flex items-center gap-3 mt-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</span>
                          <div className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span className={`text-[9px] font-black uppercase ${item.status === 'completed' ? 'text-emerald-500' : 'text-orange-400'}`}>
                             {item.status}
                          </span>
                       </div>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className={`text-xl font-black italic tracking-tighter ${item.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                       {item.type === 'credit' ? '+' : '-'}₹{item.amount.toLocaleString()}
                    </p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">TXN_{10024 + item.id}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}

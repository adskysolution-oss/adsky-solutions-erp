'use client';

import React, { useState } from 'react';
import { 
  IndianRupee, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Settings, 
  ShieldCheck, 
  TrendingUp, 
  Activity,
  Zap,
  Globe,
  RefreshCw,
  Plus,
  ArrowRight,
  PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_WALLETS = [
  { id: 'W-9042', type: 'commission', amount: 4500, status: 'available', date: '2026-04-16' },
  { id: 'W-9041', type: 'bonus', amount: 500, status: 'pending', date: '2026-04-15' },
];

const MOCK_WITHDRAWALS = [
  { id: 'WD-102', amount: 15000, status: 'completed', date: '2026-04-10' },
  { id: 'WD-101', amount: 5000, status: 'pending', date: '2026-04-16' },
];

export default function PartnerEarnings() {
  const [showWithdraw, setShowWithdraw] = useState(false);

  const statusColors = {
    completed: 'text-emerald-500 bg-emerald-50 border-emerald-100',
    pending: 'text-orange-500 bg-orange-50 border-orange-100',
    failed: 'text-rose-500 bg-rose-50 border-rose-100',
  };

  return (
    <div className="space-y-10 pb-32 font-sans text-slate-900">
      {/* Treasury Header */}
      <div className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] -mr-64 -mt-64 transition-all group-hover:bg-indigo-600/20" />
         
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 relative z-10">
            <div className="flex items-center gap-8">
               <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center text-indigo-400 shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <IndianRupee size={48} className="drop-shadow-glow-indigo" />
               </div>
               <div>
                  <h1 className="text-4xl font-black tracking-tighter italic leading-none mb-3 italic">Earnings <span className="text-indigo-400">Vault</span></h1>
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] italic">Franchise Liquidity Node</span>
                     <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-glow" />
                     <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Commission Optimized</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-10">
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1 italic">Withdrawal Reserve</p>
                  <p className="text-5xl font-black italic tracking-tighter">₹1,25,000 <span className="text-xs text-indigo-400 font-bold ml-1">↑8%</span></p>
               </div>
               <div className="h-12 w-px bg-white/10 mx-4" />
               <button 
                 onClick={() => setShowWithdraw(true)}
                 className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/20 transition-all active:scale-[0.98]"
               >
                  Withdraw Capital
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Ledger Area */}
         <div className="lg:col-span-2 space-y-10">
            <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-black tracking-tighter italic text-slate-900">Withdrawal <span className="text-indigo-600">History</span></h3>
                  <Download size={20} className="text-slate-300" />
               </div>
               
               <div className="space-y-4">
                  {MOCK_WITHDRAWALS.map((wd) => (
                    <div key={wd.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-50 flex items-center justify-between group hover:border-slate-100 hover:bg-white transition-all">
                       <div className="flex items-center gap-6">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm text-slate-300 border border-slate-100 group-hover:text-indigo-600 transition-colors`}>
                             <ArrowDownLeft size={20} />
                          </div>
                          <div>
                             <p className="text-xs font-black text-slate-900 italic tracking-tight uppercase">Withdrawal ID: {wd.id}</p>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{wd.date} • Regional Node</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-xl font-black text-slate-900 italic tracking-tighter mb-1">₹{wd.amount.toLocaleString()}</p>
                          <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${statusColors[wd.status]}`}>{wd.status}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-10 bg-indigo-50 border border-indigo-100 rounded-[3rem] flex items-center justify-between group overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl -mr-16 -mt-16" />
               <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-100">
                     <PieChart size={32} />
                  </div>
                  <div>
                     <h4 className="text-xl font-black text-indigo-900 tracking-tighter italic">Regional Performance Breakdown</h4>
                     <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mt-1 italic">Audit Node Synchronized</p>
                  </div>
               </div>
               <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-200 relative z-10">Analyze</button>
            </div>
         </div>

         {/* Selection Sidebar (Wallet View) */}
         <div className="space-y-8">
            <div className="p-10 bg-white border border-slate-100 rounded-[4rem] shadow-sm">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 italic">Active Wallets</h4>
               <div className="space-y-6">
                  {MOCK_WALLETS.map(wallet => (
                    <div key={wallet.id} className="p-6 bg-slate-50 border border-slate-50 rounded-[2.5rem] group hover:bg-white hover:border-slate-100 transition-all cursor-default">
                       <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-indigo-400 shadow-sm">
                                <Wallet size={20} />
                             </div>
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 italic">{wallet.type}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase border ${wallet.status === 'available' ? 'text-emerald-500 border-emerald-100' : 'text-orange-400 border-orange-100'}`}>{wallet.status}</span>
                       </div>
                       <p className="text-3xl font-black text-slate-900 tracking-tighter italic">₹{wallet.amount.toLocaleString()}</p>
                    </div>
                  ))}
               </div>
               
               <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                     <ShieldCheck size={24} className="text-emerald-500" />
                     <p className="text-[9px] text-slate-500 leading-relaxed font-black uppercase italic tracking-tight">
                       Your funds are protected by 256-bit AES encryption. Node settlements occur every 48 hours.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>

       {/* Withdraw Overlay Mock */}
       <AnimatePresence>
         {showWithdraw && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="w-full max-w-2xl bg-white rounded-[4rem] p-16 shadow-2xl relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] -mr-48 -mt-48" />
                  <button onClick={() => setShowWithdraw(false)} className="absolute top-12 right-12 text-slate-300 hover:text-slate-900"><XCircle size={32} /></button>
                  
                  <div className="text-center mb-16">
                     <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl mx-auto mb-8">
                        <ArrowUpRight size={32} />
                     </div>
                     <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic mb-3 leading-none uppercase italic">Withdraw <span className="text-indigo-600 underline underline-offset-8 decoration-4 decoration-indigo-200">Capital</span></h2>
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic mt-4">Authorized Regional Liquidity Settlement</p>
                  </div>

                  <div className="space-y-8">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-10 italic">Withdrawal Amount (INR)</label>
                        <div className="relative">
                           <IndianRupee className="absolute left-10 top-1/2 -translate-y-1/2 text-indigo-600" size={32} />
                           <input placeholder="0.00" className="w-full bg-slate-50 border-2 border-slate-100 rounded-[3rem] py-8 pl-24 pr-10 text-4xl font-black outline-none focus:border-indigo-500/30 transition-all italic text-slate-900" />
                        </div>
                        <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest mt-4">Max Available: ₹{stats.earnings.toLocaleString()}</p>
                     </div>
                     <button className="w-full py-7 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl shadow-indigo-300 transition-all active:scale-[0.98] hover:bg-slate-900 mt-4">
                        Initialize Financial Settlement
                     </button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}

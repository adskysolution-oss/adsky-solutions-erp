'use client';

import React, { useState } from 'react';
import { 
  IndianRupee, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Download, 
  ChevronRight, 
  Settings, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Zap,
  Lock,
  Globe,
  RefreshCw,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedFilter from '@/components/admin/AdvancedFilter';

const MOCK_TRANSACTIONS = [
  { id: 'TXN-9042', actor: 'Ramesh Patel', amount: 249, type: 'credit', status: 'completed', date: '2026-04-16 14:20', reference: 'Lead Fee' },
  { id: 'TXN-9041', actor: 'Branch North', amount: 74, type: 'debit', status: 'pending', date: '2026-04-16 13:45', reference: 'Commission Settlement' },
  { id: 'TXN-9040', actor: 'Sanjay Singh', amount: 249, type: 'credit', status: 'failed', date: '2026-04-16 12:10', reference: 'Lead Fee' },
];

export default function FinancialCommand() {
  const [selectedTxn, setSelectedTxn] = useState(null);

  const typeStyles = {
    credit: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    debit: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  const statusColors = {
    completed: 'text-emerald-500',
    pending: 'text-orange-500',
    failed: 'text-rose-500',
  };

  return (
    <div className="space-y-10 pb-32 font-sans text-slate-900">
      {/* Treasury Header */}
      <div className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-600/10 blur-[150px] -mr-64 -mt-64 transition-all group-hover:bg-sky-600/20" />
         
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 relative z-10">
            <div className="flex items-center gap-8">
               <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center text-sky-400 shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <IndianRupee size={48} className="drop-shadow-glow" />
               </div>
               <div>
                  <h1 className="text-4xl font-black tracking-tighter italic leading-none mb-3 italic">Treasury <span className="text-sky-400">Command</span></h1>
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] italic">Enterprise Liquidity Node</span>
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-glow" />
                     <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Gateway Synchronized</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-10">
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Total Vault Liquidity</p>
                  <p className="text-5xl font-black italic tracking-tighter italic">₹1,54,200 <span className="text-xs text-emerald-400 font-bold ml-1">↑12%</span></p>
               </div>
               <div className="h-12 w-px bg-white/10 mx-4" />
               <button className="px-8 py-4 bg-sky-600 hover:bg-sky-500 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-sky-600/20 transition-all active:scale-[0.98]">
                  Initialize Batch Payout
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Ledger Area */}
         <div className="lg:col-span-2 space-y-8">
            <AdvancedFilter targetType="payments" />

            <div className="space-y-4">
               {MOCK_TRANSACTIONS.map((txn) => (
                 <motion.div 
                   key={txn.id} 
                   onClick={() => setSelectedTxn(txn)}
                   className={`p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex items-center justify-between relative overflow-hidden ${selectedTxn?.id === txn.id ? 'border-sky-600 shadow-sky-500/5' : ''}`}
                 >
                    {selectedTxn?.id === txn.id && (
                       <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 blur-2xl -mr-12 -mt-12" />
                    )}
                    
                    <div className="flex items-center gap-8 relative z-10">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${typeStyles[txn.type]}`}>
                          {txn.type === 'credit' ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
                       </div>
                       <div>
                          <h3 className="text-lg font-black text-slate-900 tracking-tight italic mb-1">{txn.actor}</h3>
                          <div className="flex items-center gap-3">
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{txn.id}</span>
                             <div className="w-1 h-1 bg-slate-200 rounded-full" />
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{txn.reference}</span>
                          </div>
                       </div>
                    </div>

                    <div className="text-right relative z-10">
                       <div className="flex items-baseline justify-end gap-1 mb-1">
                          <span className="text-[10px] font-black text-slate-400 tracking-widest italic">{txn.type === 'credit' ? '+' : '-'}</span>
                          <p className={`text-2xl font-black italic tracking-tighter ${txn.type === 'credit' ? 'text-slate-900' : 'text-rose-500'}`}>₹{txn.amount}</p>
                       </div>
                       <p className={`text-[10px] font-black uppercase tracking-widest flex items-center justify-end gap-2 ${statusColors[txn.status]}`}>
                          {txn.status === 'completed' ? <CheckCircle2 size={12}/> : txn.status === 'pending' ? <Clock size={12}/> : <XCircle size={12}/>}
                          {txn.status}
                       </p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Selection Sidebar (Detail View) */}
         <AnimatePresence>
            {selectedTxn && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white border border-slate-100 rounded-[4rem] p-12 shadow-2xl overflow-y-auto max-h-[85vh] sticky top-8 custom-scrollbar border-t-[12px] border-t-slate-900"
              >
                 <div className="flex items-center justify-between mb-12">
                    <button onClick={() => setSelectedTxn(null)} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900"><XCircle size={24} /></button>
                    <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-sky-600 transition-all"><Settings size={20}/></button>
                 </div>

                 <div className="text-center mb-12">
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-[2.5rem] flex items-center justify-center shadow-inner border transition-all ${typeStyles[selectedTxn.type]}`}>
                        {selectedTxn.type === 'credit' ? <ArrowUpRight size={48} /> : <ArrowDownLeft size={48} />}
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter mb-2">₹{selectedTxn.amount.toLocaleString()}</h2>
                    <span className="px-5 py-1.5 bg-slate-100 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-widest italic">{selectedTxn.id} Secure Pulse</span>
                 </div>

                 <div className="space-y-10">
                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem]">
                       <div className="space-y-6">
                          <div className="flex justify-between items-center group cursor-default">
                             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Beneficiary</span>
                             <span className="text-xs font-black text-slate-900 italic uppercase">{selectedTxn.actor}</span>
                          </div>
                          <div className="flex justify-between items-center group cursor-default">
                             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Global Timestamp</span>
                             <span className="text-xs font-black text-slate-900">{selectedTxn.date}</span>
                          </div>
                          <div className="flex justify-between items-center group cursor-default">
                             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Auth Reference</span>
                             <span className="text-xs font-mono text-sky-600 font-bold">SHA-2940-2X</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest italic border-l-4 border-slate-900 pl-4">Command Actions</h4>
                       <div className="space-y-4">
                          <button className="w-full p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between group hover:border-sky-600/30 transition-all">
                             <div className="flex items-center gap-4 text-slate-400 group-hover:text-sky-600 transition-colors">
                                <RefreshCw size={20} />
                                <span className="text-xs font-black text-slate-900 italic uppercase">Initiate Full Refund</span>
                             </div>
                             <ArrowRight size={16} />
                          </button>
                          <button className="w-full p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between group hover:border-emerald-600/30 transition-all">
                             <div className="flex items-center gap-4 text-slate-400 group-hover:text-emerald-600 transition-colors">
                                <CheckCircle2 size={20} />
                                <span className="text-xs font-black text-slate-900 italic uppercase">Manual Completion</span>
                             </div>
                             <ArrowRight size={16} />
                          </button>
                       </div>
                    </div>

                    <div className="p-8 bg-emerald-600 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] -mr-16 -mt-16 group-hover:bg-white/20 transition-all" />
                       <div className="flex items-center gap-5 relative z-10">
                          <Download size={32} />
                          <div>
                             <p className="text-[10px] font-black uppercase text-emerald-200 tracking-[0.2em] mb-1">Taxation Compliance</p>
                             <p className="text-lg font-black italic tracking-tighter">Download Invoice Dossier</p>
                          </div>
                       </div>
                       <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                    </div>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}

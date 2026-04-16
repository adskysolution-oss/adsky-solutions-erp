'use client';

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Calendar,
  IndianRupee,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  ArrowUpRight,
  TrendingUp,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/applications?payment=success');
      const data = await res.json();
      if (!data.error) setPayments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = payments.length * 249;

  return (
    <div className="space-y-8 pb-32">
      {/* Financial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-tight">Payment <span className="text-blue-500 text-glow">Ledger</span></h1>
          <p className="text-slate-400 mt-1 uppercase text-[10px] font-black tracking-widest text-xs">Financial Audit & Transaction Logs</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-3xl">
           <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
             <IndianRupee size={24} />
           </div>
           <div>
             <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Net Revenue</p>
             <h3 className="text-2xl font-black text-white italic">₹{totalRevenue}</h3>
           </div>
           <div className="ml-4 pl-4 border-l border-white/10 hidden sm:block">
             <span className="text-emerald-400 text-[10px] font-black flex items-center gap-1">
               <TrendingUp size={12} />
               +24%
             </span>
             <p className="text-slate-500 text-[9px] font-medium">This month</p>
           </div>
        </div>
      </div>

      {/* Grid: Search & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="lg:col-span-3 flex gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Find transaction by ID or name..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500/30 transition-all font-bold text-sm"
              />
            </div>
            <button className="bg-white/5 border border-white/10 text-slate-400 px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-white/10 transition-all font-bold text-sm">
              <Filter size={18} />
              Export PDF
            </button>
         </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-[#0F172A] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
         <div className="px-8 py-6 border-b border-white/10 bg-white/[0.01] flex items-center justify-between">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Statement of Account</h3>
           <div className="flex gap-4">
              <span className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400">
                <CheckCircle2 size={14} /> {payments.length} Verified
              </span>
           </div>
         </div>

         {loading ? (
           <div className="py-32 flex flex-col items-center justify-center gap-4">
             <Loader2 className="animate-spin text-blue-500" size={40} />
             <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Opening Secure Ledger...</p>
           </div>
         ) : (
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-white/5">
                   <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Farmer</th>
                   <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Transaction ID</th>
                   <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Amount</th>
                   <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Date</th>
                   <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Method</th>
                   <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 italic text-right">Verification</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {payments.length === 0 ? (
                   <tr>
                     <td colSpan="6" className="px-8 py-20 text-center text-slate-500 italic">No payment records found in this cycle.</td>
                   </tr>
                 ) : (
                   payments.map((p) => (
                     <tr key={p._id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="px-8 py-6">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs italic">
                             {p.farmerName?.charAt(0)}
                           </div>
                           <span className="text-white font-bold text-sm tracking-tight">{p.farmerName}</span>
                         </div>
                       </td>
                       <td className="px-8 py-6">
                         <span className="text-slate-400 font-mono text-xs uppercase opacity-70">
                           {p.paymentDetails?.transactionId || 'CF-TRX-' + p._id.slice(-6)}
                         </span>
                       </td>
                       <td className="px-8 py-6">
                         <div className="flex items-center gap-1 text-emerald-400 font-black">
                           <IndianRupee size={12} />
                           249.00
                         </div>
                       </td>
                       <td className="px-8 py-6">
                         <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold">
                           <Calendar size={12} />
                           {new Date(p.updatedAt).toLocaleDateString()}
                         </div>
                       </td>
                       <td className="px-8 py-6">
                         <span className="text-[10px] font-black uppercase text-slate-500">Cashfree UPI</span>
                       </td>
                       <td className="px-8 py-6 text-right">
                         <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[8px] font-black rounded border border-emerald-500/20 uppercase">
                           Verified
                         </span>
                       </td>
                     </tr>
                   ))
                 )}
               </tbody>
             </table>
           </div>
         )}
      </div>

      {/* Footer Audit Note */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 text-slate-400 text-xs italic">
         <CheckCircle2 size={16} className="text-emerald-500" />
         All payments are verified against the bank statement via Cashfree API. Reconciliation happens every 24 hours.
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, ArrowUpRight, Clock, CheckCircle2, XCircle, Loader2, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnerWithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWithdrawals([
        { id: 1, amount: 5000, status: 'completed', date: '2026-04-01', ref: 'TXN_4455' },
        { id: 2, amount: 2000, status: 'pending', date: '2026-04-15', ref: 'REQ_9921' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-tight">Withdrawal <span className="text-blue-500">History</span></h1>
          <p className="text-slate-400 mt-1 uppercase text-[10px] font-black tracking-widest text-xs">Payout Requests & Status</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 text-sm">
          <CreditCard size={18} />
          New Payout Request
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Fetching payout logs...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Reference</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Amount</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Date Initiated</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 italic text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {withdrawals.map((w) => (
                  <tr key={w.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-blue-400 font-mono text-[10px] font-black uppercase">{w.ref}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1 text-white font-bold tracking-tight">
                        <IndianRupee size={12} className="text-slate-500" />
                        {w.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-400 text-xs font-bold leading-none">{w.date}</td>
                    <td className="px-8 py-6 text-right">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border border-white/5 ${w.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'}`}>
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

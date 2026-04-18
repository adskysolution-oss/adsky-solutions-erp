'use client';

import React from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  IndianRupee,
  Activity,
  Zap,
  History
} from 'lucide-react';

const walletData = [
  { user: 'Ravi Kumar', balance: '₹1,240', lastTxn: '₹249 (Cr)', status: 'Active', type: 'Farmer' },
  { user: 'Anita Singh', balance: '₹42,800', lastTxn: '₹14,200 (Cr)', status: 'Active', type: 'Partner' },
  { user: 'Sanjay Verma', balance: '₹8,500', lastTxn: '₹2,000 (Dr)', status: 'On Hold', type: 'Employee' },
];

const columns = [
  { key: 'user', label: 'MEMBER NAME' },
  { key: 'type', label: 'ENTITY ROLE' },
  { key: 'balance', label: 'AVAILABLE BALANCE' },
  { key: 'lastTxn', label: 'LAST ACTIVITY' },
  { key: 'status', label: 'STATUS' },
];

export default function WalletManagement() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1]">
              <Wallet size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6366f1] italic">Treasury Control</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Wallet Ledger.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Manage virtual funds, member balances, and withdrawal requests.</p>
        </div>
      </motion.div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: 'TOTAL TREASURY', value: '₹48.2L', icon: IndianRupee, color: 'text-[#38bdf8]' },
           { label: 'WITHDRAWAL REQ.', value: '12', icon: Activity, color: 'text-[#f59e0b]' },
           { label: 'PENDING PAYOUTS', value: '₹2.4L', icon: IndianRupee, color: 'text-[#ef4444]' },
         ].map((stat, idx) => (
           <div key={idx} className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3rem] relative group hover:border-[#6366f1]/20 transition-all shadow-2xl overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#6366f1]/5 rounded-full blur-[40px]"></div>
              <stat.icon size={32} className={`${stat.color} mb-6`} />
              <p className="text-[11px] font-black uppercase text-[#6b7280] tracking-widest italic mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black text-[#f3f4f6] italic tracking-tight">{stat.value}</h3>
           </div>
         ))}
      </div>

      {/* Table Section */}
      <DataTable 
        title="Member Wallet States" 
        columns={columns} 
        data={walletData} 
      />

      {/* Quick Actions Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] group">
            <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-8">Withdrawal Queue</h3>
            <div className="space-y-6">
               {[1, 2].map(i => (
                 <div key={i} className="flex items-center justify-between p-5 bg-[#0b1220]/50 rounded-2xl border border-[#1f2937] hover:border-[#f59e0b]/30 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-[#f59e0b]/10 rounded-xl flex items-center justify-center text-[#f59e0b]">
                          <ArrowDownLeft size={18} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-[#f3f4f6] italic">Withdrawal Request #{i*120}</p>
                          <p className="text-[9px] uppercase font-black text-[#6b7280]">User: Sanjay Verma</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-[#ef4444] italic">₹2,000</p>
                       <button className="text-[10px] uppercase font-black text-[#38bdf8] hover:underline">Approve</button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="p-10 bg-gradient-to-br from-[#111827] to-[#0b1220] border border-[#1f2937] rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-[#22c55e]/10 rounded-3xl flex items-center justify-center text-[#22c55e]">
               <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-black text-[#f3f4f6] italic leading-tight">Sync <br /> Protocol</h3>
            <p className="text-slate-400 text-sm font-medium italic max-w-xs">Virtual wallet balances are automatically reconciled every 4 hours with the central bank gateway.</p>
            <button className="px-8 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest italic hover:scale-105 transition-all">MANUAL SYNC</button>
         </div>
      </div>
    </div>
  );
}

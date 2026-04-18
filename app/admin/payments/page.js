'use client';

import React from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Filter,
  IndianRupee,
  Wallet
} from 'lucide-react';

const paymentData = [
  { txnId: 'TXN-0921B', user: 'Ravi Kumar', amount: '₹249', method: 'UPI', status: 'Success', date: '18 Apr 10:42 PM' },
  { txnId: 'TXN-0922C', user: 'Anita Singh', amount: '₹14,200', method: 'Net Banking', status: 'Success', date: '18 Apr 09:12 PM' },
  { txnId: 'TXN-0923D', user: 'Sanjay Verma', amount: '₹8,500', method: 'Card', status: 'Processing', date: '18 Apr 08:34 PM' },
  { txnId: 'TXN-0924E', user: 'Megha Gupta', amount: '₹1,200', method: 'UPI', status: 'Failed', date: '18 Apr 07:15 PM' },
  { txnId: 'TXN-0925F', user: 'Vikram Das', amount: '₹3,500', method: 'Wallet', status: 'Success', date: '18 Apr 06:45 PM' },
];

const columns = [
  { key: 'txnId', label: 'TRANSACTION ID' },
  { key: 'user', label: 'USER / ENTITY' },
  { key: 'amount', label: 'AMOUNT' },
  { key: 'method', label: 'GATEWAY' },
  { key: 'status', label: 'PAYMENT STATUS' },
  { key: 'date', label: 'TIMESTAMP' },
];

export default function PaymentsManagement() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
              <CreditCard size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#38bdf8] italic">Financial Ledger</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Payments.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Real-time monitoring of all financial transactions and gateway settlements.</p>
        </div>

        <div className="flex gap-4">
           <button className="flex items-center gap-3 px-8 py-4 bg-[#111827] border border-[#1f2937] text-white rounded-2xl font-black italic shadow-xl hover:border-[#38bdf8]/50 transition-all">
              <Download size={20} /> EXPORT RECONCILIATION
           </button>
        </div>
      </motion.div>

      {/* Finance Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'TODAY REVENUE', value: '₹42,850', icon: IndianRupee, color: 'text-[#22c55e]' },
          { label: 'TOTAL SETTLEMENTS', value: '₹1.2Cr', icon: CheckCircle2, color: 'text-[#38bdf8]' },
          { label: 'PROCESSING FLOW', value: '₹8.4L', icon: Clock, color: 'text-[#f59e0b]' },
          { label: 'FAILED ATTEMPTS', value: '14', icon: AlertCircle, color: 'text-[#ef4444]' },
        ].map((stat, idx) => (
          <div key={idx} className="p-8 bg-[#111827] border border-[#1f2937] rounded-[2.5rem] flex flex-col items-center text-center group hover:border-[#38bdf8]/20 transition-all">
             <div className={`w-14 h-14 rounded-2xl bg-[#0b1220] flex items-center justify-center ${stat.color} mb-6 shadow-2xl group-hover:scale-110 transition-transform`}>
                <stat.icon size={26} />
             </div>
             <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic mb-1">{stat.label}</p>
             <p className="text-3xl font-black text-[#f3f4f6] italic">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <DataTable 
        title="Live Transactions Feed" 
        columns={columns} 
        data={paymentData} 
      />

      {/* Gateway Status Mini View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
         <div className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] relative overflow-hidden group">
            <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-8">Settlement Status</h3>
            <div className="space-y-6">
               {[
                 { gateway: 'Razorpay', status: 'Healthy', latency: '42ms', uptime: '99.9%' },
                 { gateway: 'Cashfree', status: 'Healthy', latency: '68ms', uptime: '99.8%' },
                 { gateway: 'UPI Direct', status: 'Congested', latency: '120ms', uptime: '98.5%' },
               ].map((g, idx) => (
                 <div key={idx} className="flex items-center justify-between p-5 bg-[#0b1220]/50 rounded-2xl border border-[#1f2937]">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-[#38bdf8]/10 rounded-xl flex items-center justify-center text-[#38bdf8]">
                          <CreditCard size={18} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-[#f3f4f6] italic">{g.gateway}</p>
                          <div className="flex items-center gap-2">
                             <span className={`w-1.5 h-1.5 rounded-full ${g.status === 'Healthy' ? 'bg-[#22c55e]' : 'bg-[#f59e0b]'} animate-pulse`}></span>
                             <p className="text-[10px] uppercase font-black text-[#6b7280] tracking-widest">{g.status}</p>
                          </div>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-[#f3f4f6] italic">{g.uptime}</p>
                       <p className="text-[9px] uppercase font-black text-[#6b7280]">{g.latency}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="p-10 bg-gradient-to-br from-[#111827] to-[#0b1220] border border-[#1f2937] rounded-[3.5rem] relative overflow-hidden group flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-[#38bdf8]/10 rounded-3xl flex items-center justify-center text-[#38bdf8] mb-2">
               <Wallet size={40} />
            </div>
            <h3 className="text-3xl font-black text-[#f3f4f6] italic">Wallet <br /> Reconciliation</h3>
            <p className="text-slate-400 text-sm font-medium italic max-w-xs">All individual member wallets are successfully synced with the treasury ledger.</p>
            <div className="flex gap-4">
               <button className="px-8 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest italic hover:scale-105 transition-all">Verify All</button>
               <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest italic text-white hover:bg-white/10 transition-all">Audit Logs</button>
            </div>
         </div>
      </div>
    </div>
  );
}

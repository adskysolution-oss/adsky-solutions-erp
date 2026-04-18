'use client';

import React from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Coins, 
  Percent, 
  TrendingUp, 
  Settings, 
  Users,
  Target,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';

const commissionData = [
  { role: 'Partner (Gold)', rate: '28%', totalPayout: '₹1.2L', count: '12 Hubs' },
  { role: 'Vendor (IT)', rate: '15%', totalPayout: '₹45K', count: '8 Entities' },
  { role: 'Sub-Agent', rate: '8%', totalPayout: '₹12K', count: '124 Agents' },
  { role: 'Referral', rate: '2%', totalPayout: '₹2.4K', count: '482 Users' },
];

const columns = [
  { key: 'role', label: 'COMMISSION TIER / ROLE' },
  { key: 'rate', label: 'PERCENTAGE RATE' },
  { key: 'count', label: 'ACTIVE ENTITIES' },
  { key: 'totalPayout', label: 'LIFETIME PAYOUT' },
];

export default function CommissionsManagement() {
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
            <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center text-[#f59e0b]">
              <Coins size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f59e0b] italic">Revenue Share Engine</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Commissions.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Configure global commission rates, tiers, and payout thresholds.</p>
        </div>
        
        <button className="flex items-center gap-3 px-8 py-4 bg-[#f59e0b] text-[#0b1220] rounded-2xl font-black italic shadow-xl hover:scale-105 transition-all">
          <Settings size={20} /> POLICY ENGINE
        </button>
      </motion.div>

      {/* Global Tier Config Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'GLOBAL AVG RATE', value: '18.4%', icon: Percent, color: 'text-[#38bdf8]' },
          { label: 'TOTAL EARNINGS', value: '₹18.5L', icon: TrendingUp, color: 'text-[#22c55e]' },
          { label: 'ACTIVE EARNERS', value: '1.4K', icon: Users, color: 'text-[#6366f1]' },
          { label: 'GOAL VELOCITY', value: '92%', icon: Target, color: 'text-[#f59e0b]' },
        ].map((item, idx) => (
          <div key={idx} className="p-8 bg-[#111827] border border-[#1f2937] rounded-[2.5rem] flex flex-col items-start group hover:border-[#f59e0b]/20 transition-all">
             <item.icon size={26} className={`${item.color} mb-6`} />
             <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic mb-1">{item.label}</p>
             <p className="text-3xl font-black text-[#f3f4f6] italic">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <DataTable 
        title="Commission Tiers & Performance" 
        columns={columns} 
        data={commissionData} 
      />

      {/* Settings Grid Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
         <div className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] relative group">
            <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-8">Payout Controls</h3>
            <div className="space-y-6 text-[#9ca3af] font-medium italic">
               <div className="flex items-center justify-between p-4 border border-[#1f2937] rounded-2xl">
                  <span>Minimum Payout Threshold</span>
                  <span className="text-[#f3f4f6] font-black">₹500</span>
               </div>
               <div className="flex items-center justify-between p-4 border border-[#1f2937] rounded-2xl">
                  <span>Standard Settlement Cycle</span>
                  <span className="text-[#f3f4f6] font-black">T+3 Days</span>
               </div>
               <div className="flex items-center justify-between p-4 border border-[#1f2937] rounded-2xl">
                  <span>Manual Approval Required Above</span>
                  <span className="text-[#f3f4f6] font-black">₹50,000</span>
               </div>
            </div>
         </div>

         <div className="p-10 bg-gradient-to-br from-[#111827] to-[#0b1220] border border-[#1f2937] rounded-[3.5rem] group flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-[#f59e0b]/10 rounded-3xl flex items-center justify-center text-[#f59e0b] mb-2 group-hover:scale-110 transition-transform">
               <TrendingUp size={40} />
            </div>
            <h3 className="text-3xl font-black text-[#f3f4f6] italic">Revenue <br /> Optimization</h3>
            <p className="text-slate-400 text-sm font-medium italic max-w-xs">Our algorithm suggests increasing Partner commissions to 30% for improved regional penetration.</p>
            <button className="px-10 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest italic flex items-center gap-3 hover:scale-105 transition-all">RUN SIMULATION <ArrowRight size={16} /></button>
         </div>
      </div>
    </div>
  );
}

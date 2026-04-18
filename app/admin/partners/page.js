'use client';

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Handshake, 
  MapPin, 
  TrendingUp, 
  Plus, 
  Briefcase,
  Search,
  Users,
  ShieldCheck
} from 'lucide-react';

const columns = [
  { key: 'partnerCode', label: 'HUB CODE' },
  { key: 'name', label: 'PARTNER NAME' },
  { key: 'region', label: 'OPERATIONAL REGION' },
  { key: 'revenue', label: 'REVENUE SHARE' },
  { key: 'commission', label: 'COMMISSION %' },
  { key: 'status', label: 'HUB STATUS' },
];

export default function PartnersManagement() {
  const [activeRegion, setActiveRegion] = useState('All');

  const partnerData = [
    { partnerCode: 'HUB-921', name: 'Elite Synergy Group', region: 'North India', revenue: '₹4.2L', commission: '28%', status: 'Active' },
    { partnerCode: 'HUB-845', name: 'Apex Logistics', region: 'South India', revenue: '₹1.8L', commission: '25%', status: 'Active' },
    { partnerCode: 'HUB-712', name: 'Visionary Partners', region: 'East India', revenue: '₹2.1L', commission: '22%', status: 'Pending' },
    { partnerCode: 'HUB-634', name: 'Quantum Solns', region: 'West India', revenue: '₹3.9L', commission: '30%', status: 'Active' },
  ];

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
            <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1]">
              <Handshake size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6366f1] italic">Relationship Management</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Partners Hub.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Monitor regional franchisees, hub performance, and commission settlements.</p>
        </div>

        <button className="flex items-center gap-3 px-8 py-4 bg-[#6366f1] text-white rounded-2xl font-black italic shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:scale-105 transition-all">
          <Plus size={20} /> PROVISION NEW HUB
        </button>
      </motion.div>

      {/* Analytics Mini Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'ACTIVE NODES', value: '184', icon: ShieldCheck, color: 'text-[#22c55e]' },
          { label: 'AVG. REVENUE', value: '₹12.4L', icon: TrendingUp, color: 'text-[#38bdf8]' },
          { label: 'TOTAL SUB-AGENTS', value: '1,248', icon: Users, color: 'text-[#6366f1]' },
        ].map((stat, idx) => (
          <div key={idx} className="p-8 bg-[#111827] border border-[#1f2937] rounded-[2.5rem] flex items-center gap-6 group hover:border-[#6366f1]/20 transition-all">
             <div className="w-14 h-14 rounded-2xl bg-[#0b1220] flex items-center justify-center text-[#6366f1] group-hover:bg-[#6366f1] group-hover:text-white transition-all shadow-xl">
                <stat.icon size={28} />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic">{stat.label}</p>
                <p className="text-3xl font-black text-[#f3f4f6] italic leading-tight">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Region Selection Tab */}
      <div className="flex bg-[#111827] p-1.5 rounded-2xl border border-[#1f2937] max-w-xl shadow-2xl overflow-hidden">
        {['All', 'North', 'South', 'East', 'West'].map((region) => (
          <button 
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all ${activeRegion === region ? 'bg-[#6366f1] text-white' : 'text-[#6b7280] hover:text-[#f3f4f6]'}`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Main Table */}
      <DataTable 
        title={`${activeRegion} Regional Hubs`} 
        columns={columns} 
        data={partnerData} 
      />

      {/* Regional Focus Mini View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
         <div className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] overflow-hidden group">
            <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-8">Performance Leaderboard</h3>
            <div className="space-y-6">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center justify-between p-4 bg-[#0b1220]/50 rounded-2xl border border-[#1f2937] hover:border-[#6366f1]/30 transition-all">
                    <div className="flex items-center gap-4">
                       <span className="text-xl font-black text-[#6b7280] italic">0{i}</span>
                       <div>
                          <p className="text-sm font-black text-[#f3f4f6] italic">Hub Alpha-{i*10}</p>
                          <p className="text-[10px] uppercase font-black text-[#6b7280]">Maharashtra</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-[#22c55e] italic">₹{12-i}.4L</p>
                       <p className="text-[9px] uppercase font-black text-[#22c55e]/50">+12%</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="p-10 bg-gradient-to-br from-[#111827] to-[#0b1220] border border-[#1f2937] rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-6 group">
            <div className="w-20 h-20 bg-[#6366f1]/10 rounded-3xl flex items-center justify-center text-[#6366f1] mb-2 group-hover:scale-110 transition-transform">
               <MapPin size={40} />
            </div>
            <h3 className="text-3xl font-black text-[#f3f4f6] italic leading-tight">Expansion <br /> Radar</h3>
            <p className="text-slate-400 text-sm font-medium italic max-w-xs">We are currently targeting expansion in North Eastern regions. Provisioning is now open.</p>
            <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest italic text-white hover:bg-white/10 transition-all">View Heatmap</button>
         </div>
      </div>
    </div>
  );
}

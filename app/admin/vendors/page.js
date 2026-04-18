'use client';

import React from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Store, 
  Users, 
  Target, 
  BarChart, 
  Plus,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

const vendorData = [
  { name: 'Shiv Shakti Vendors', category: 'Manpower', leads: '124', assigned: '110', commission: '₹42,000', status: 'Active' },
  { name: 'Gopal Agencies', category: 'FMCG', leads: '86', assigned: '45', commission: '₹12,400', status: 'Inactive' },
  { name: 'Modern Systems', category: 'IT Hardware', leads: '240', assigned: '200', commission: '₹1.1L', status: 'Active' },
];

const columns = [
  { key: 'name', label: 'VENDOR ENTITY' },
  { key: 'category', label: 'INDUSTRIAL SECTOR' },
  { key: 'leads', label: 'TOTAL LEADS' },
  { key: 'assigned', label: 'ASSIGNED' },
  { key: 'commission', label: 'TOTAL PAYOUT' },
  { key: 'status', label: 'STATUS' },
];

export default function VendorsManagement() {
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
              <Store size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#38bdf8] italic">Supply Chain Control</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Vendors Panel.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Manage external vendors, sub-agents, and lead assignment systems.</p>
        </div>

        <button className="flex items-center gap-3 px-8 py-4 bg-[#38bdf8] text-[#0b1220] rounded-2xl font-black italic shadow-xl hover:scale-105 transition-all">
          <Plus size={20} /> REGISTER NEW VENDOR
        </button>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'TOTAL VENDORS', value: '86', icon: Store, color: 'text-[#38bdf8]' },
          { label: 'ACTIVE LEADS', value: '2.4K', icon: Target, color: 'text-[#22c55e]' },
          { label: 'ASSIGNMENT RATE', value: '92%', icon: BarChart, color: 'text-[#6366f1]' },
        ].map((stat, idx) => (
          <div key={idx} className="p-8 bg-[#111827] border border-[#1f2937] rounded-[2.5rem] flex items-center justify-between group hover:border-[#38bdf8]/20 transition-all">
             <div>
                <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-[#f3f4f6] italic">{stat.value}</p>
             </div>
             <div className={`w-14 h-14 rounded-2xl bg-[#0b1220] flex items-center justify-center ${stat.color} shadow-2xl group-hover:rotate-12 transition-transform`}>
                <stat.icon size={28} />
             </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <DataTable 
        title="Vendor Performance Matrix" 
        columns={columns} 
        data={vendorData} 
      />

      {/* Sub-Agent Creation Placeholder */}
      <div className="mt-12 p-12 bg-gradient-to-br from-[#111827] to-[#0b1220] border border-[#1f2937] rounded-[4rem] text-center relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-full h-full bg-[#38bdf8]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h3 className="text-3xl font-black text-[#f3f4f6] italic leading-tight">Advanced Lead <br /> Assignment System</h3>
            <p className="text-slate-400 font-medium italic text-sm">Assign leads based on regional capacity, vendor rating, and historical conversion metrics.</p>
            <div className="flex justify-center gap-4">
               <button className="px-10 py-4 bg-white text-black font-black italic rounded-2xl hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
                  INITIATE AUTO-ASSIGN <ArrowRight size={18} />
               </button>
               <button className="px-10 py-4 bg-[#1f2937] text-white font-black italic rounded-2xl hover:bg-[#38bdf8] hover:text-[#0b1220] transition-all border border-white/5">
                  RULES ENGINE
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

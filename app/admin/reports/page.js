'use client';

import React from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar, 
  Download, 
  PieChart, 
  Zap,
  Globe
} from 'lucide-react';

const reportData = [
  { name: 'Monthly Revenue Report', type: 'Financial', generation: 'Automatic', schedule: '1st of Month', format: 'PDF/XLS' },
  { name: 'Field Agent Performance', type: 'Operations', generation: 'Manual', schedule: 'On Demand', format: 'CSV' },
  { name: 'Lead Conversion Audit', type: 'Sales', generation: 'Automatic', schedule: 'Daily', format: 'PDF' },
];

const columns = [
  { key: 'name', label: 'REPORT IDENTITY' },
  { key: 'type', label: 'CLASSIFICATION' },
  { key: 'generation', label: 'LOGIC TYPE' },
  { key: 'schedule', label: 'INTERVAL' },
  { key: 'format', label: 'OUTPUT' },
];

export default function ReportsManagement() {
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
              <BarChart3 size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#38bdf8] italic">Intelligence Bureau</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Reports Hub.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Generate deep analytics, financial audits, and operational performance dossiers.</p>
        </div>

        <button className="flex items-center gap-3 px-8 py-4 bg-[#38bdf8] text-[#0b1220] rounded-2xl font-black italic shadow-xl hover:scale-105 transition-all">
          <Download size={20} /> GLOBAL RECONCILIATION
        </button>
      </motion.div>

      {/* Analytics Tier */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: 'AVG CONVERSION', value: '28.4%', icon: TrendingUp, color: 'text-[#22c55e]' },
           { label: 'TOP REGION', value: 'North India', icon: Globe, color: 'text-[#38bdf8]' },
           { label: 'REVENUE VELOCITY', value: '+12.5%', icon: Zap, color: 'text-[#f59e0b]' },
         ].map((stat, idx) => (
           <div key={idx} className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3rem] relative overflow-hidden group hover:border-[#38bdf8]/30 transition-all shadow-2xl">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#38bdf8]/5 rounded-full blur-[40px]"></div>
              <stat.icon size={32} className={`${stat.color} mb-6`} />
              <p className="text-[11px] font-black uppercase text-[#6b7280] tracking-widest italic mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black text-[#f3f4f6] italic tracking-tight">{stat.value}</h3>
           </div>
         ))}
      </div>

      {/* Table Section */}
      <DataTable 
        title="Scheduled Data Dossiers" 
        columns={columns} 
        data={reportData} 
      />

      {/* Visual Analytics Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] group">
            <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-8">Revenue Distribution</h3>
            <div className="flex items-center justify-center p-10">
               <div className="w-48 h-48 rounded-full border-[10px] border-[#38bdf8]/20 border-t-[#38bdf8] border-l-[#6366f1] animate-spin-slow relative flex items-center justify-center">
                  <div className="text-center">
                     <p className="text-2xl font-black text-[#f3f4f6] italic">₹1.2Cr</p>
                     <p className="text-[8px] uppercase font-black text-[#6b7280]">Total Volume</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="p-10 bg-gradient-to-br from-[#111827] to-[#0b1220] border border-[#1f2937] rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-[#38bdf8]/10 rounded-3xl flex items-center justify-center text-[#38bdf8] mb-2 group-hover:scale-110 transition-transform">
               <Calendar size={40} />
            </div>
            <h3 className="text-3xl font-black text-[#f3f4f6] italic leading-tight">Automated <br /> Archiving</h3>
            <p className="text-slate-400 text-sm font-medium italic max-w-xs">Reports are automatically encrypted and emailed to stakeholders every Monday at 08:00 UTC.</p>
            <button className="px-8 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest italic hover:scale-105 transition-all">CONFIGURE CRON</button>
         </div>
      </div>
    </div>
  );
}

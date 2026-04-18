'use client';

import React from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  Target, 
  ShieldCheck, 
  TrendingUp, 
  Plus,
  Search,
  MapPin,
  ExternalLink
} from 'lucide-react';

const employeeData = [
  { name: 'Sanya Gupta', code: 'EMP-900', partner: 'Elite Hub', leads: '124', earnings: '₹4,500', status: 'Active' },
  { name: 'Rohan Mehta', code: 'EMP-901', partner: 'Apex Logistics', leads: '86', earnings: '₹2,800', status: 'Active' },
  { name: 'Isha Sharma', code: 'EMP-902', partner: 'Elite Hub', leads: '210', earnings: '₹8,200', status: 'Active' },
];

const columns = [
  { key: 'name', label: 'AGENT IDENTITY' },
  { key: 'code', label: 'EMPLOYEE CODE' },
  { key: 'partner', label: 'ASSOCIATED HUB' },
  { key: 'leads', label: 'LEAD VOLUME' },
  { key: 'earnings', label: 'NET EARNINGS' },
  { key: 'status', label: 'OPERATIONAL STATUS' },
];

export default function EmployeesPage() {
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
              <Briefcase size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6366f1] italic">Field Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Field Agents.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Monitor all ground-level onboarding employees across the partner network.</p>
        </div>

        <button className="flex items-center gap-3 px-8 py-4 bg-[#6366f1] text-white rounded-2xl font-black italic shadow-xl hover:scale-105 transition-all">
          <Plus size={20} /> ONBOARD NEW AGENT
        </button>
      </motion.div>

      {/* Analytics Mini Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'TOTAL AGENTS', value: '1,248', icon: Users, color: 'text-[#38bdf8]' },
          { label: 'ACTIVE TODAY', value: '842', icon: ShieldCheck, color: 'text-[#22c55e]' },
          { label: 'TOTAL LEADS', value: '14.2K', icon: Target, color: 'text-[#f59e0b]' },
          { label: 'AVG. EARNINGS', value: '₹5.4K', icon: TrendingUp, color: 'text-[#6366f1]' },
        ].map((item, idx) => (
          <div key={idx} className="p-8 bg-[#111827] border border-[#1f2937] rounded-[2.5rem] flex flex-col items-center text-center group hover:border-[#6366f1]/20 transition-all">
             <div className={`w-12 h-12 rounded-2xl bg-[#0b1220] flex items-center justify-center ${item.color} mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                <item.icon size={22} />
             </div>
             <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic mb-1">{item.label}</p>
             <p className="text-2xl font-black text-[#f3f4f6] italic">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <DataTable 
        title="Agent Force Matrix" 
        columns={columns} 
        data={employeeData} 
      />

      {/* Performance Grid Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
         <div className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] relative overflow-hidden group">
            <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-8">Top Performers</h3>
            <div className="space-y-6">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center justify-between p-4 bg-[#0b1220]/50 rounded-2xl border border-[#1f2937] hover:border-[#6366f1]/30 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1] font-black italic">#{i}</div>
                       <div>
                          <p className="text-sm font-black text-[#f3f4f6] italic">Agent Zero-{i}</p>
                          <p className="text-[10px] uppercase font-black text-[#6b7280]">Elite Hub • {150-i*10} Leads</p>
                       </div>
                    </div>
                    <ExternalLink size={16} className="text-[#6b7280]" />
                 </div>
               ))}
            </div>
         </div>

         <div className="p-10 bg-gradient-to-br from-[#111827] to-[#0b1220] border border-[#1f2937] rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-[#6366f1]/10 rounded-3xl flex items-center justify-center text-[#6366f1] mb-2 group-hover:scale-110 transition-transform">
               <MapPin size={40} />
            </div>
            <h3 className="text-3xl font-black text-[#f3f4f6] italic">Live Tracking <br /> Protcol</h3>
            <p className="text-slate-400 text-sm font-medium italic max-w-xs">Field agents are tracked in real-time. This ensures mission integrity and distribution accuracy.</p>
            <button className="px-10 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest italic hover:scale-105 transition-all">Enable GPS Feed</button>
         </div>
      </div>
    </div>
  );
}

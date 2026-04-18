'use client';

import React from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Zap, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle,
  FileSearch,
  Users,
  TrendingUp
} from 'lucide-react';

const leadData = [
  { id: 'SUB-9021', name: 'Raj Kumar', phone: '9876543210', location: 'Satna, MP', partner: 'ADS-101', status: 'In Review', date: '2m ago' },
  { id: 'SUB-9020', name: 'Suresh Patel', phone: '9123456789', location: 'Surat, GJ', partner: 'ADS-102', status: 'Approved', date: '15m ago' },
  { id: 'SUB-9019', name: 'Amit Singh', phone: '9000000000', location: 'Mumbai, MH', partner: 'ADS-101', status: 'Rejected', date: '1h ago' },
];

const columns = [
  { key: 'id', label: 'LEAD ID' },
  { key: 'name', label: 'FARMER IDENTITY' },
  { key: 'location', label: 'LOCATION' },
  { key: 'partner', label: 'SOURCE HUB' },
  { key: 'status', label: 'MISSION STATUS' },
  { key: 'date', label: 'TIMESTAMP' },
];

export default function MissionQueue() {
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
            <div className="w-8 h-8 rounded-lg bg-[#ef4444]/10 flex items-center justify-center text-[#ef4444]">
              <Zap size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ef4444] italic">Mission Control</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Mission Queue.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Real-time surveillance of global registration streams and lead distribution.</p>
        </div>
      </motion.div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'TOTAL SUBMISSIONS', value: '4.2K', icon: FileSearch, color: 'text-[#38bdf8]' },
          { label: 'ACTIVE QUEUE', value: '142', icon: Clock, color: 'text-[#f59e0b]' },
          { label: 'CONVERSION RATE', value: '24%', icon: TrendingUp, color: 'text-[#22c55e]' },
        ].map((item, idx) => (
          <div key={idx} className="p-8 bg-[#111827] border border-[#1f2937] rounded-[2.5rem] flex items-center justify-between group hover:border-[#ef4444]/20 transition-all shadow-2xl">
             <div>
                <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic mb-1">{item.label}</p>
                <p className="text-3xl font-black text-[#f3f4f6] italic">{item.value}</p>
             </div>
             <div className={`w-14 h-14 rounded-2xl bg-[#0b1220] flex items-center justify-center ${item.color} shadow-xl group-hover:scale-110 transition-transform`}>
                <item.icon size={26} />
             </div>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <DataTable 
        title="Real-Time Lead Stream" 
        columns={columns} 
        data={leadData} 
      />

      {/* Quick Visualizer */}
      <div className="mt-12 p-10 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-8">
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-[#ef4444] rounded-full animate-pulse"></span>
               <span className="text-[10px] font-black uppercase text-[#ef4444] tracking-widest italic">Live Feed</span>
            </div>
         </div>
         <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-6">Mission Velocity</h3>
         <div className="flex items-end gap-2 h-20">
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${Math.random() * 80 + 20}%` }}
                transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse', delay: i * 0.1 }}
                className="flex-grow bg-[#ef4444]/20 rounded-t-sm border-t border-[#ef4444]/40"
              />
            ))}
         </div>
      </div>
    </div>
  );
}

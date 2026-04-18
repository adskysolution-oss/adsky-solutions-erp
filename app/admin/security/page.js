'use client';

import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Database, 
  Search, 
  Terminal, 
  Cpu,
  Activity,
  Zap,
  CheckCircle2,
  XCircle,
  MoreVertical,
  AlertTriangle
} from 'lucide-react';

const auditData = [
  { id: 'LOG-492', actor: 'Super_Admin', action: 'Modified Rate', target: 'Partner ADS-029', time: '16:20:11', status: 'Verified' },
  { id: 'LOG-491', actor: 'Branch_North', action: 'Bulk Export', target: 'Submissions', time: '15:45:22', status: 'Flagged' },
  { id: 'LOG-490', actor: 'SENTINEL', action: 'Auto-Block IP', target: '45.1.2.3', time: '15:10:05', status: 'Blocked' },
];

const columns = [
  { key: 'id', label: 'LOG ID' },
  { key: 'actor', label: 'ACTOR IDENTITY' },
  { key: 'action', label: 'SYSTEM ACTION' },
  { key: 'target', label: 'TARGET RESOURCE' },
  { key: 'status', label: 'SENTINEL STATE' },
  { key: 'time', label: 'TIMESTAMP' },
];

export default function SecurityManagement() {
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
            <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 flex items-center justify-center text-[#22c55e]">
              <ShieldCheck size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#22c55e] italic">Global Defense Node</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Security Sentinel.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Surveillance of all administrative actions, threat assessment, and fraud scanning.</p>
        </div>

        <div className="flex items-center gap-6">
           <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest mb-1">Threat Assessment</p>
              <p className="text-2xl font-black text-[#22c55e] italic tracking-tight">Stable Node</p>
           </div>
           <button className="px-8 py-4 bg-[#22c55e] text-[#0b1220] rounded-2xl font-black italic shadow-xl hover:scale-105 transition-all">
              RUN FULL SCAN
           </button>
        </div>
      </motion.div>

      {/* Security Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'NODES ACTIVE', value: '142', icon: Cpu, color: 'text-[#38bdf8]' },
          { label: 'THREATS BLOCKED', value: '2.8K', icon: ShieldAlert, color: 'text-[#ef4444]' },
          { label: 'AUDIT RATE', value: '100%', icon: Activity, color: 'text-[#22c55e]' },
          { label: 'ENCRYPTION', value: 'AES-256', icon: Lock, color: 'text-[#6366f1]' },
        ].map((item, idx) => (
          <div key={idx} className="p-8 bg-[#111827] border border-[#1f2937] rounded-[2.5rem] flex flex-col items-center group hover:border-[#22c55e]/20 transition-all">
             <div className={`w-14 h-14 rounded-2xl bg-[#0b1220] flex items-center justify-center ${item.color} mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                <item.icon size={26} />
             </div>
             <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic mb-1">{item.label}</p>
             <p className="text-2xl font-black text-[#f3f4f6] italic">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <DataTable 
        title="Administrative Audit Logs" 
        columns={columns} 
        data={auditData} 
      />

      {/* Threat Level Viz */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
         <div className="lg:col-span-2 p-10 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase text-[#22c55e] tracking-widest italic">Monitoring</span>
               </div>
            </div>
            <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-8 flex items-center gap-3">
               <Terminal size={24} className="text-[#38bdf8]" /> Kernel Stream
            </h3>
            <div className="font-mono text-[11px] space-y-3">
               <p className="text-emerald-500/80">[10:42:11] AUTH_SUCCESS: admin_22X logged into regional hub Satna</p>
               <p className="text-blue-500/80">[10:44:05] DATA_READ: 142 records queried from Farmers collection</p>
               <p className="text-rose-500/80">[10:45:22] THREAT_DENIED: Brute force attempt from 45.1.x.x blocked</p>
               <p className="text-[#6b7280]">[10:46:00] SYSTEM_HEARTBEAT: All encryption nodes operational</p>
            </div>
         </div>

         <div className="p-10 bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-6 group">
            <div className="w-20 h-20 bg-[#ef4444]/10 rounded-3xl flex items-center justify-center text-[#ef4444] mb-2 group-hover:scale-110 transition-all">
               <AlertTriangle size={40} />
            </div>
            <h3 className="text-3xl font-black text-[#f3f4f6] italic leading-tight">Fraud <br /> Radar.</h3>
            <p className="text-slate-400 text-sm font-medium italic max-w-xs">Scan the current lead pool for suspicious duplicate metadata or rapid-fire registration attempts.</p>
            <button className="px-10 py-3 rounded-xl bg-[#ef4444] text-white text-[10px] font-black uppercase tracking-widest italic hover:scale-105 transition-all shadow-2xl">TRIGGER RADAR</button>
         </div>
      </div>
    </div>
  );
}

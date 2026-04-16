'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Database, 
  Search, 
  Filter, 
  Eye, 
  Key, 
  Globe, 
  Info, 
  Clock, 
  Activity, 
  UserCheck, 
  AlertTriangle,
  Zap,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ArrowRight,
  Terminal,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedFilter from '@/components/admin/AdvancedFilter';

const MOCK_AUDIT_LOGS = [
  { id: 'LOG-492', actor: 'Super_Admin', action: 'Modified Commission Rate', target: 'Partner ADS-029', time: '2026-04-16 16:20:11', ip: '1.1.1.1', status: 'verified' },
  { id: 'LOG-491', actor: 'Branch_North_P', action: 'Bulk Export Data', target: 'Submissions (All)', time: '2026-04-16 15:45:22', ip: '102.32.11.9', status: 'flagged' },
  { id: 'LOG-490', actor: 'SYSTEM_SENTINEL', action: 'Auto-Blocked Suspicious IP', target: '45.1.2.3', time: '2026-04-16 15:10:05', ip: 'INTERNAL', status: 'blocked' },
];

const MOCK_FRAUD_FLAGS = [
  { id: 'F-102', reason: 'Multiple Failed Payments', actor: 'User U-2041', threat: 'High', time: '5 mins ago' },
  { id: 'F-101', reason: 'Rapid Data Extraction', actor: 'Partner ADS-007', threat: 'Medium', time: '14 mins ago' },
];

export default function SecurityNode() {
  const [selectedLog, setSelectedLog] = useState(null);

  const statusStyles = {
    verified: 'text-emerald-500 bg-emerald-50 border-emerald-100',
    flagged: 'text-orange-500 bg-orange-50 border-orange-100',
    blocked: 'text-rose-500 bg-rose-50 border-rose-100',
  };

  return (
    <div className="space-y-10 pb-32 font-sans">
      {/* Security Header */}
      <div className="bg-slate-900 border-b-4 border-emerald-500 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] -mr-48 -mt-48 transition-all group-hover:bg-emerald-500/20" />
         
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 relative z-10">
            <div className="flex items-center gap-8">
               <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <ShieldCheck size={48} className="drop-shadow-glow" />
               </div>
               <div>
                  <h1 className="text-4xl font-black tracking-tighter italic leading-none mb-3 italic">Security <span className="text-emerald-400">Sentinel</span></h1>
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] italic">Audit Log Node v2.0</span>
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-glow" />
                     <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Active Fraud Scanning</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-10">
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Threat Assessment</p>
                  <p className="text-4xl font-black italic tracking-tighter italic text-emerald-400">Stable Node</p>
               </div>
               <div className="h-12 w-px bg-white/10 mx-4" />
               <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-emerald-500/20 transition-all active:scale-[0.98]">
                  Run Node Scan
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Audit Record Area */}
         <div className="lg:col-span-2 space-y-8">
            <AdvancedFilter targetType="audits" />

            <div className="space-y-4">
               {MOCK_AUDIT_LOGS.map((log) => (
                 <motion.div 
                   key={log.id} 
                   onClick={() => setSelectedLog(log)}
                   className={`p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex items-center justify-between relative overflow-hidden ${selectedLog?.id === log.id ? 'border-emerald-600' : ''}`}
                 >
                    <div className="flex items-center gap-8 relative z-10">
                       <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-emerald-600 transition-colors">
                          <Terminal size={24} />
                       </div>
                       <div>
                          <h3 className="text-lg font-black text-slate-900 tracking-tight italic mb-1">{log.action}</h3>
                          <div className="flex items-center gap-3">
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{log.actor}</span>
                             <div className="w-1 h-1 bg-slate-200 rounded-full" />
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{log.target}</span>
                          </div>
                       </div>
                    </div>

                    <div className="text-right relative z-10">
                       <p className="text-sm font-black text-slate-900 italic mb-1">{log.ip}</p>
                       <p className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border w-fit ml-auto ${statusStyles[log.status]}`}>
                          {log.status}
                       </p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Fraud Radar & Alerts */}
         <div className="space-y-8">
            <div className="p-10 bg-rose-600 text-white rounded-[4rem] shadow-2xl relative overflow-hidden group animate-pulse-subtle">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16" />
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] italic flex items-center gap-2">
                     <AlertTriangle size={16} /> Threat Radar
                  </h3>
                  <span className="text-[9px] font-black bg-white/10 px-2 py-0.5 rounded-lg">High Sensitivity</span>
               </div>
               
               <div className="space-y-6">
                  {MOCK_FRAUD_FLAGS.map(flag => (
                    <div key={flag.id} className="p-6 bg-white/10 border border-white/20 rounded-3xl hover:bg-white/20 transition-all cursor-crosshair">
                       <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-rose-200">{flag.reason}</span>
                          <span className="text-[9px] font-black text-white bg-rose-800 px-2 py-0.5 rounded-lg">{flag.threat}</span>
                       </div>
                       <p className="text-xl font-black italic tracking-tighter mb-1">{flag.actor}</p>
                       <p className="text-[9px] font-black text-rose-200 uppercase tracking-widest">{flag.time}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-10 bg-white border border-slate-100 rounded-[3.5rem] shadow-sm">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 italic flex items-center gap-2">
                  <Cpu size={16} /> Sentinel Nodes
               </h3>
               <div className="space-y-6">
                  {[
                    { node: 'AUTH_SHIELD', label: 'OAuth 2.1 Tunnel', status: 'Optimal', active: true },
                    { node: 'GEO_STIFF', label: 'Regional Blacklist', status: 'Active', active: true },
                    { node: 'BRUTE_NODE', label: 'Rate Limiter V2', status: 'Stable', active: true }
                  ].map(item => (
                    <div key={item.node} className="flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                          <div>
                             <p className="text-[11px] font-black text-slate-900 italic leading-none mb-1">{item.node}</p>
                             <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                          </div>
                       </div>
                       <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{item.status}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Audit Detail Overlay Mock */}
      <AnimatePresence>
         {selectedLog && (
           <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-white rounded-[4rem] p-16 shadow-2xl relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32" />
                 <button onClick={() => setSelectedLog(null)} className="absolute top-10 right-10 text-slate-400 hover:text-slate-900"><XCircle size={32} /></button>
                 
                 <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl mx-auto mb-6">
                       <Database size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic mb-2">Audit <span className="text-emerald-600">Dossier</span></h2>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Record Hash: {selectedLog.id}</p>
                 </div>

                 <div className="space-y-8">
                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem]">
                       <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-4">
                             <div>
                                <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Actor Identity</p>
                                <p className="text-sm font-black text-slate-900 italic">{selectedLog.actor}</p>
                             </div>
                             <div>
                                <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Target Resource</p>
                                <p className="text-sm font-black text-slate-900 italic">{selectedLog.target}</p>
                             </div>
                          </div>
                          <div className="space-y-4">
                             <div>
                                <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Access Location</p>
                                <p className="text-sm font-black text-slate-900 italic">{selectedLog.ip}</p>
                             </div>
                             <div>
                                <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Global UTC</p>
                                <p className="text-sm font-black text-slate-900 italic">{selectedLog.time}</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-4">
                       <button className="flex-1 py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all active:scale-[0.98]">
                          Flag Record for Review
                       </button>
                       <button className="flex-1 py-5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:bg-white">
                          Verify Signature
                       </button>
                    </div>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}

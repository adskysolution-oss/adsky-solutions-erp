'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  ShieldCheck, 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  ChevronRight,
  MoreHorizontal,
  Mail,
  Phone,
  ArrowRight,
  UserPlus,
  Zap,
  CheckCircle2,
  XCircle,
  Copy,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_EMPLOYEES = [
  { id: 'E-401', name: 'Rahul Verma', code: 'ADS-001-E10', status: 'active', leads: 124, earnings: 6200, joined: '2026-04-01' },
  { id: 'E-402', name: 'Priya Singh', code: 'ADS-002-E11', status: 'active', leads: 86, earnings: 4300, joined: '2026-04-05' },
  { id: 'E-403', name: 'Vikram Rao', code: 'ADS-003-E12', status: 'blocked', leads: 10, earnings: 500, joined: '2026-04-10' },
];

export default function EmployeeManagement() {
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [showAddEmp, setShowAddEmp] = useState(false);

  const copyRefLink = (code) => {
    const link = `${window.location.origin}/lead?partner=ADS-001&employee=${code}`;
    navigator.clipboard.writeText(link);
    alert('Referral Link Copied to Clipboard!');
  };

  return (
    <div className="space-y-10 pb-32 font-sans">
      {/* Header */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -mr-32 -mt-32" />
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
               <Users size={40} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">Field <span className="text-indigo-600">Force</span></h1>
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Regional Agent Management Node</span>
                  <div className="h-1 w-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">{MOCK_EMPLOYEES.length} Active Agents</span>
               </div>
            </div>
         </div>
         <button 
           onClick={() => setShowAddEmp(true)}
           className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-3 transition-all active:scale-[0.98] relative z-10"
         >
            <UserPlus size={18} /> Recruit New Agent
         </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
         {/* Main List Area */}
         <div className="flex-grow space-y-6">
            <div className="relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
               <input 
                 placeholder="Search agents by Name or EMP ID..." 
                 className="w-full bg-white border border-slate-100 rounded-[2rem] py-5 pl-16 pr-8 text-sm font-bold shadow-sm outline-none focus:border-indigo-500/30 transition-all font-sans"
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {MOCK_EMPLOYEES.map((emp) => (
                 <motion.div 
                   key={emp.id} 
                   onClick={() => setSelectedEmp(emp)}
                   className={`p-8 bg-white border rounded-[3rem] shadow-sm hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden ${selectedEmp?.id === emp.id ? 'border-indigo-600 shadow-indigo-500/5' : 'border-slate-100'}`}
                 >
                    <div className="flex items-center justify-between mb-8 relative z-10">
                       <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-indigo-600 transition-colors">
                          <Zap size={28} />
                       </div>
                       <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); copyRefLink(emp.code); }}
                            className="p-3 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                          >
                             <Share2 size={16} />
                          </button>
                       </div>
                    </div>

                    <div className="relative z-10 mb-8">
                       <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter mb-1">{emp.name} <span className="text-[10px] text-slate-300 ml-2 not-italic">{emp.code}</span></h3>
                       <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${emp.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                          <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] italic">{emp.status} Agent Node</span>
                       </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50 relative z-10">
                       <div className="flex gap-8">
                          <div>
                             <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Missions</p>
                             <p className="text-xl font-black text-slate-900 italic leading-none">{emp.leads}</p>
                          </div>
                          <div>
                             <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Earnt</p>
                             <p className="text-xl font-black text-indigo-600 italic leading-none">₹{emp.earnings}</p>
                          </div>
                       </div>
                       <ChevronRight size={20} className="text-slate-200 group-hover:translate-x-1 group-hover:text-indigo-600 transition-all" />
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Selection Sidebar (Detail View) */}
         <AnimatePresence>
            {selectedEmp && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full lg:w-[480px] bg-white border border-slate-100 rounded-[4rem] p-12 shadow-2xl overflow-y-auto max-h-[85vh] sticky top-8 custom-scrollbar border-t-[12px] border-t-indigo-600"
              >
                 <div className="flex items-center justify-between mb-12">
                    <button onClick={() => setSelectedEmp(null)} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900"><XCircleIcon size={24} /></button>
                    <div className="flex gap-2 text-[9px] font-black uppercase italic text-slate-400 tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                       Agent Dossier
                    </div>
                 </div>

                 <div className="text-center mb-12">
                    <div className="w-28 h-28 bg-indigo-50 rounded-[3rem] flex items-center justify-center text-indigo-600 mx-auto mb-6 shadow-inner ring-4 ring-white relative">
                       <Users size={56} />
                       <div className="absolute bottom-2 right-2 w-8 h-8 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                          <Activity size={16} />
                       </div>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter mb-2">{selectedEmp.name}</h2>
                    <p className="text-slate-300 text-[9px] font-black uppercase tracking-[0.3em] italic">Identity Key: {selectedEmp.id}</p>
                 </div>

                 <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden group/card">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 blur-3xl -mr-12 -mt-12" />
                          <p className="text-[9px] font-black uppercase text-indigo-400 mb-2 relative z-10">Missions Extracted</p>
                          <p className="text-4xl font-black italic tracking-tighter relative z-10">{selectedEmp.leads}</p>
                       </div>
                       <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                          <p className="text-[9px] font-black uppercase text-slate-400 mb-2 italic">Node Status</p>
                          <div className="flex items-center gap-2">
                             <p className="text-2xl font-black text-slate-900 italic uppercase">{selectedEmp.status}</p>
                          </div>
                          <p className="text-[8px] font-black text-slate-300 mt-2 italic tracking-widest uppercase">Since {selectedEmp.joined}</p>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] italic border-l-4 border-indigo-600 pl-4">Operational Pulse</h4>
                       <div className="space-y-4">
                          <button 
                            onClick={() => copyRefLink(selectedEmp.code)}
                            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between group hover:border-indigo-600 transition-all cursor-copy"
                          >
                             <div className="flex items-center gap-4">
                                <Share2 size={24} className="text-indigo-600" />
                                <div className="text-left">
                                   <p className="text-xs font-black italic">Copy Native Referral Link</p>
                                   <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Tracking Code: {selectedEmp.code}</p>
                                </div>
                             </div>
                             <ArrowRight size={16} className="text-slate-200" />
                          </button>
                          <button className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between group hover:border-indigo-600 transition-all">
                             <div className="flex items-center gap-4 text-slate-400 group-hover:text-indigo-600 transition-colors">
                                <TrendingUp size={24} />
                                <span className="text-xs font-black text-slate-900 italic uppercase">View Revenue Analytics</span>
                             </div>
                             <ArrowRight size={16} />
                          </button>
                       </div>
                    </div>

                    <div className="flex gap-4 pt-10 border-t border-slate-50">
                       <button className="flex-1 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all">Revoke Access</button>
                       <button className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-indigo-200 hover:scale-105 transition-all active:scale-95">Edit Identity</button>
                    </div>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

       {/* Add Employee Overlay Mock */}
       <AnimatePresence>
         {showAddEmp && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="w-full max-w-2xl bg-white rounded-[4rem] p-16 shadow-2xl relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] -mr-48 -mt-48" />
                  <button onClick={() => setShowAddEmp(false)} className="absolute top-12 right-12 text-slate-300 hover:text-slate-900"><XCircle size={32} /></button>
                  
                  <div className="text-center mb-16">
                     <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl mx-auto mb-8">
                        <UserPlus size={32} />
                     </div>
                     <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic mb-3 leading-none uppercase italic">Recruit <span className="text-indigo-600 underline underline-offset-8 decoration-4 decoration-indigo-200">Agent</span></h2>
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic mt-4">Generating Identity Node ADS-001-E13</p>
                  </div>

                  <div className="space-y-8">
                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-6 italic">Full Legal Identity</label>
                           <input placeholder="e.g. Suman Sharma" className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] py-5 px-8 text-sm font-bold outline-none focus:border-indigo-500/30 transition-all italic" />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-6 italic">Secure Email</label>
                           <input placeholder="e.g. suman@field.com" className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] py-5 px-8 text-sm font-bold outline-none focus:border-indigo-500/30 transition-all italic" />
                        </div>
                     </div>
                     <button className="w-full py-7 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl shadow-indigo-300 transition-all active:scale-[0.98] hover:bg-slate-900 mt-4">
                        Provision Agent lifecycle
                     </button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}

function XCircleIcon({ size, className }) {
  return <XCircle size={size} className={className} />;
}

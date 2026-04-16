'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  TrendingUp, 
  Plus, 
  ChevronRight, 
  Users, 
  IndianRupee, 
  Target, 
  Settings, 
  ShieldCheck, 
  Globe, 
  MoreVertical,
  ArrowRight,
  Database,
  BarChart3,
  PieChart as PieIcon,
  Activity,
  Zap,
  CheckCircle2,
  Lock,
  XCircle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedFilter from '@/components/admin/AdvancedFilter';

const MOCK_PARTNERS = [
  { id: 'P-101', name: 'Branch West Operations', code: 'ADS-001', region: 'Maharashtra', agents: 12, leads: 450, revenue: 125000, commission: 30 },
  { id: 'P-102', name: 'Punjab Agri Node', code: 'ADS-002', region: 'Punjab', agents: 45, leads: 1240, revenue: 450000, commission: 35 },
  { id: 'P-103', name: 'Karnataka Hub', code: 'ADS-003', region: 'Karnataka', agents: 28, leads: 820, revenue: 210000, commission: 30 },
];

export default function PartnerManagement() {
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showAddPartner, setShowAddPartner] = useState(false);

  return (
    <div className="space-y-10 pb-32 font-sans">
      {/* Header */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -mr-32 -mt-32" />
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
               <Briefcase size={40} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">Partner <span className="text-indigo-600">Ecosystem</span></h1>
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Network Orchestration Node</span>
                  <div className="h-1 w-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">{MOCK_PARTNERS.length} Regional Hubs</span>
               </div>
            </div>
         </div>
         <button 
           onClick={() => setShowAddPartner(true)}
           className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-3 transition-all active:scale-[0.98] relative z-10"
         >
            <Plus size={18} /> Onboard New Hub
         </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
         {/* Main List Area */}
         <div className="flex-grow space-y-8">
            <AdvancedFilter targetType="partners" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {MOCK_PARTNERS.map((partner) => (
                 <motion.div 
                   key={partner.id} 
                   onClick={() => setSelectedPartner(partner)}
                   className={`p-8 bg-white border rounded-[3rem] shadow-sm hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden ${selectedPartner?.id === partner.id ? 'border-indigo-600 shadow-indigo-500/5' : 'border-slate-100'}`}
                 >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-all duration-700" />
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                       <div className="w-14 h-14 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                          <Globe size={28} />
                       </div>
                       <span className="text-[10px] font-black uppercase text-slate-900 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full italic tracking-widest">
                          {partner.code}
                       </span>
                    </div>

                    <div className="relative z-10 mb-8">
                       <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter mb-1">{partner.name}</h3>
                       <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          <MapPin size={12} className="text-rose-500" /> {partner.region}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 relative z-10">
                       <div className="p-4 bg-slate-50 rounded-2xl border border-slate-50 group-hover:bg-white group-hover:border-slate-100 transition-all">
                          <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Active Agents</p>
                          <p className="text-xl font-black text-slate-900 italic">{partner.agents}</p>
                       </div>
                       <div className="p-4 bg-slate-50 rounded-2xl border border-slate-50 group-hover:bg-white group-hover:border-slate-100 transition-all">
                          <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Commission</p>
                          <p className="text-xl font-black text-indigo-600 italic">{partner.commission}%</p>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Selection Sidebar (Detail View) */}
         <AnimatePresence>
            {selectedPartner && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full lg:w-[500px] bg-white border border-slate-100 rounded-[4rem] p-12 shadow-2xl overflow-y-auto max-h-[85vh] sticky top-8 custom-scrollbar border-t-[12px] border-t-indigo-600"
              >
                 <div className="flex items-center justify-between mb-12">
                    <button onClick={() => setSelectedPartner(null)} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-inner"><XCircleIcon size={24} /></button>
                    <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-slate-900 transition-all"><Settings size={20}/></button>
                 </div>

                 <div className="text-center mb-12">
                    <div className="w-28 h-28 bg-indigo-50 rounded-[3rem] flex items-center justify-center text-indigo-600 mx-auto mb-6 shadow-inner ring-4 ring-white relative">
                       <Briefcase size={56} />
                       <div className="absolute bottom-2 right-2 w-8 h-8 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                          <CheckCircle2 size={16} />
                       </div>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter mb-2">{selectedPartner.name}</h2>
                    <span className="px-5 py-1.5 bg-indigo-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest italic">{selectedPartner.code} Regional Hub</span>
                 </div>

                 <div className="space-y-10">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden group/card shadow-2xl">
                          <div className="absolute bottom-0 right-0 w-20 h-20 bg-indigo-500/20 blur-2xl -mr-10 -mb-10" />
                          <p className="text-[9px] font-black uppercase text-indigo-400 mb-2 relative z-10">Total Revenue</p>
                          <p className="text-3xl font-black italic tracking-tighter relative z-10">₹{selectedPartner.revenue.toLocaleString()}</p>
                       </div>
                       <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
                          <p className="text-[9px] font-black uppercase text-slate-400 mb-2 italic">Performance</p>
                          <div className="flex items-center gap-2">
                             <p className="text-3xl font-black text-slate-900 italic">4.8</p>
                             <TrendingUp size={24} className="text-emerald-500" />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] italic border-l-4 border-indigo-600 pl-4">Network Control</h4>
                       <div className="space-y-4">
                          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                <Users size={20} className="text-indigo-600" />
                                <span className="text-xs font-black text-slate-900 italic uppercase">Field Force Management</span>
                             </div>
                             <button className="px-4 py-2 bg-white rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-200 shadow-sm hover:bg-slate-900 hover:text-white transition-all">Manage {selectedPartner.agents}</button>
                          </div>
                          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                <Target size={20} className="text-rose-500" />
                                <span className="text-xs font-black text-slate-900 italic uppercase">Commission Settlement</span>
                             </div>
                             <button className="px-4 py-2 bg-white rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-200 shadow-sm hover:bg-slate-900 hover:text-white transition-all">Edit {selectedPartner.commission}%</button>
                          </div>
                       </div>
                    </div>

                    <div className="p-8 bg-indigo-600 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-all">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] -mr-16 -mt-16 group-hover:bg-white/20 transition-all" />
                       <div className="flex items-center gap-5 relative z-10">
                          <Database size={32} />
                          <div>
                             <p className="text-[10px] font-black uppercase text-indigo-200 tracking-[0.2em] mb-1">Financial Intelligence</p>
                             <p className="text-lg font-black italic tracking-tighter">View Payout History</p>
                          </div>
                       </div>
                       <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                    </div>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Add Partner Overlay Mock */}
      <AnimatePresence>
         {showAddPartner && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="w-full max-w-2xl bg-white rounded-[4rem] p-16 shadow-2xl relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -mr-32 -mt-32" />
                  <button onClick={() => setShowAddPartner(false)} className="absolute top-10 right-10 text-slate-400 hover:text-slate-900"><XCircle size={32} /></button>
                  
                  <div className="text-center mb-12">
                     <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl mx-auto mb-6">
                        <UserPlusIcon size={32} />
                     </div>
                     <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic mb-2">Onboard <span className="text-indigo-600">Hub</span></h2>
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Provisioning ADS-004 Node</p>
                  </div>

                  <div className="space-y-8">
                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Hub Designation</label>
                           <input placeholder="e.g. Branch North" className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-4 px-6 text-sm font-bold outline-none focus:border-indigo-500/30" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Regional Nexus</label>
                           <input placeholder="e.g. Punjab" className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-4 px-6 text-sm font-bold outline-none focus:border-indigo-500/30" />
                        </div>
                     </div>
                     <button className="w-full py-6 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-indigo-200 transition-all active:scale-[0.98]">
                        Initialize Partner Lifecycle
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

function UserPlusIcon({ size, className }) {
   return <Plus size={size} className={className} />;
}

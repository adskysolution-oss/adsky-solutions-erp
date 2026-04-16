'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  MapPin, 
  TrendingUp, 
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
  Activity,
  CheckCircle2,
  Lock,
  XCircle,
  Clock,
  Filter,
  Download,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedFilter from '@/components/admin/AdvancedFilter';

const MOCK_LEADS = [
  { id: 'LD-9042', farmer: 'Subhash Chandra', phone: '+91 94032 11022', location: 'Rewa, MP', status: 'submitted', date: '2026-04-16', emp: 'EMP-001', revenue: 74 },
  { id: 'LD-9041', farmer: 'Pooja Devi', phone: '+91 98223 99311', location: 'Satna, MP', status: 'approved', date: '2026-04-15', emp: 'EMP-042', revenue: 74 },
  { id: 'LD-9040', farmer: 'Vikram Singh', phone: '+91 77232 21221', location: 'Bhopal, MP', status: 'rejected', date: '2026-04-14', emp: 'EMP-007', revenue: 0 },
];

export default function PartnerLeadQueue() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const statusColors = {
    submitted: 'bg-sky-50 text-sky-600 border-sky-100',
    review: 'bg-orange-50 text-orange-600 border-orange-100',
    approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    rejected: 'bg-rose-50 text-rose-600 border-rose-100'
  };

  return (
    <div className="space-y-10 pb-32 font-sans">
      {/* Header */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -mr-32 -mt-32" />
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
               <Zap size={40} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">Regional <span className="text-indigo-600">Leads</span></h1>
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Mission Tracking Node</span>
                  <div className="h-1 w-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest italic">{MOCK_LEADS.length} Submissions Active</span>
               </div>
            </div>
         </div>
         <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 relative z-10">
            {['all', 'submitted', 'approved', 'rejected'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white shadow-lg text-indigo-600 border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
         {/* Main List Area */}
         <div className="flex-grow space-y-8">
            <AdvancedFilter targetType="missions" />

            <div className="space-y-4">
               {MOCK_LEADS.filter(l => activeTab === 'all' || l.status === activeTab).map((lead) => (
                 <motion.div 
                   key={lead.id} 
                   onClick={() => setSelectedLead(lead)}
                   className={`p-6 bg-white border rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex items-center justify-between relative overflow-hidden ${selectedLead?.id === lead.id ? 'border-indigo-600 shadow-indigo-500/5' : 'border-slate-100'}`}
                 >
                    <div className="flex items-center gap-8 relative z-10">
                       <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 group-hover:text-indigo-600 shadow-sm transition-colors">
                          <Database size={28} />
                       </div>
                       <div>
                          <h3 className="text-xl font-black text-slate-900 tracking-tighter italic mb-1 uppercase italic underline underline-offset-4 decoration-slate-100 group-hover:decoration-indigo-200">{lead.farmer}</h3>
                          <div className="flex items-center gap-3">
                             <div className="flex items-center gap-1 text-[9px] font-black uppercase text-slate-400 border border-slate-100 px-2 py-0.5 rounded-md italic">
                                <Users size={10} className="text-indigo-600" /> {lead.emp}
                             </div>
                             <div className="w-1 h-1 bg-slate-200 rounded-full" />
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{lead.location}</span>
                          </div>
                       </div>
                    </div>

                    <div className="text-right relative z-10 flex items-center gap-10">
                       <div className="invisible md:visible">
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Submission Key</p>
                          <p className="text-xs font-black text-slate-900 uppercase font-mono">{lead.id}</p>
                       </div>
                       <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${statusColors[lead.status]}`}>
                          {lead.status}
                       </div>
                       <ChevronRight size={18} className="text-slate-200 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Selection Sidebar (Detail View) */}
         <AnimatePresence>
            {selectedLead && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full lg:w-[480px] bg-white border border-slate-100 rounded-[4rem] p-12 shadow-2xl overflow-y-auto max-h-[85vh] sticky top-8 custom-scrollbar border-t-[12px] border-t-indigo-500"
              >
                 <div className="flex items-center justify-between mb-12">
                    <button onClick={() => setSelectedLead(null)} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-inner"><XCircle size={24} /></button>
                    <div className="flex items-center gap-3">
                        <button className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all"><Globe size={20}/></button>
                    </div>
                 </div>

                 <div className="text-center mb-12">
                    <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300 mx-auto mb-6 shadow-inner ring-4 ring-white relative">
                       <Users size={40} />
                       <div className="absolute bottom-1 right-1 w-8 h-8 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                          <Activity size={16} />
                       </div>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter mb-2">{selectedLead.farmer}</h2>
                    <p className="text-slate-300 text-[9px] font-black uppercase tracking-[0.3em] italic">Dossier: {selectedLead.id}</p>
                 </div>

                 <div className="space-y-8">
                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] space-y-6">
                       <div className="flex justify-between items-center group cursor-default">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Node Status</span>
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${statusColors[selectedLead.status]}`}>{selectedLead.status}</span>
                       </div>
                       <div className="flex justify-between items-center group cursor-default">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Attribution</span>
                          <span className="text-xs font-black text-slate-900 italic uppercase">Agent {selectedLead.emp}</span>
                       </div>
                       <div className="flex justify-between items-center group cursor-default">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Geosynchronous Code</span>
                          <span className="text-xs font-black text-slate-900 italic uppercase">{selectedLead.location}</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-6 bg-slate-900 text-white rounded-[2rem] shadow-xl relative overflow-hidden group/card">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/20 blur-2xl -mr-8 -mt-8" />
                          <p className="text-[8px] font-black uppercase text-slate-500 mb-2 italic">Hub Revenue</p>
                          <p className="text-2xl font-black italic tracking-tighter">₹{selectedLead.revenue}</p>
                       </div>
                       <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-[2rem] flex flex-col justify-center items-center text-indigo-600">
                          <p className="text-[8px] font-black uppercase tracking-widest mb-1 italic">Verified Node</p>
                          <CheckCircle2 size={32} />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <button className="w-full py-5 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-indigo-600/30 hover:text-indigo-600 transition-all flex items-center justify-center gap-3">
                          <Activity size={16} /> View Full Submission Data
                       </button>
                    </div>

                    <div className="p-6 bg-indigo-600 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all text-center">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] -mr-16 -mt-16 group-hover:bg-white/20 transition-all" />
                       <div className="flex items-center justify-center gap-4 relative z-10">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Open WhatsApp Communication</span>
                          <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}

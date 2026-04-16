'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  User, 
  Phone, 
  MapPin, 
  ArrowRight,
  MoreVertical,
  Download,
  AlertCircle,
  Briefcase,
  FileText,
  Mail,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import AdvancedFilter from '@/components/admin/AdvancedFilter';

const MOCK_LEADS = [
  { id: 'L-102', name: 'Ramesh Patel', phone: '+91 94002 11022', location: 'Punjab', status: 'pending', date: '2026-04-16', partner: 'Branch North', employee: 'Agent 42', email: 'ramesh@example.com' },
  { id: 'L-101', name: 'Sanjay Singh', phone: '+91 98223 99311', location: 'Maharashtra', status: 'approved', date: '2026-04-15', partner: 'Branch West', employee: 'Agent 07', email: 'sanjay@example.com' },
  { id: 'L-100', name: 'Anita Rao', phone: '+91 77332 21221', location: 'Karnataka', status: 'rejected', date: '2026-04-14', partner: 'Branch South', employee: 'Agent 12', email: 'anita@example.com' },
];

export default function LeadManagement() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [filterQuery, setFilterQuery] = useState(null);

  const handleFilter = (filters, logic) => {
    console.log('Applying Filters:', filters, logic);
    setFilterQuery({ filters, logic });
    // In production, this would trigger a fetch with the new query
  };

  const handleExport = () => {
    alert('Exporting Filtered Dossier to CSV/Excel...');
  };

  const statusColors = {
    pending: 'bg-orange-50 text-orange-600 border-orange-100',
    approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    rejected: 'bg-rose-50 text-rose-600 border-rose-100'
  };

  const statusIcons = {
    pending: Clock,
    approved: CheckCircle2,
    rejected: XCircle
  };

  return (
    <div className="space-y-10 pb-20 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] -mr-32 -mt-32" />
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-sky-200">
               <Briefcase size={32} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">Mission <span className="text-sky-600">Control</span></h1>
               <p className="text-slate-500 font-medium text-sm mt-1 text-slate-400 uppercase tracking-widest text-[9px] font-black">Lead Distribution Engine</p>
            </div>
         </div>
         <div className="flex items-center gap-3 bg-white border border-slate-100 p-2 rounded-2xl shadow-sm relative z-10">
            <button className="px-6 py-2 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20">Active Queue</button>
            <button className="px-6 py-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600">Archived</button>
         </div>
      </div>

      <div className="flex flex-col gap-8">
         {/* Advanced Filter Engine */}
         <AdvancedFilter onFilter={handleFilter} onExport={handleExport} targetType="missions" />

         <div className="flex flex-col lg:flex-row gap-8">
            {/* Main List Area */}

            <div className="space-y-4">
               {MOCK_LEADS.filter(l => activeTab === 'all' || l.status === activeTab).map((lead) => (
                 <motion.div 
                   layoutId={lead.id}
                   key={lead.id}
                   onClick={() => setSelectedLead(lead)}
                   className={`p-6 bg-white border rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all cursor-pointer group ${selectedLead?.id === lead.id ? 'border-sky-600 shadow-sky-500/10' : 'border-slate-100'}`}
                 >
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${statusColors[lead.status]} relative`}>
                             <User size={28} />
                             {lead.status === 'pending' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-ping" />}
                          </div>
                          <div>
                             <h3 className="text-xl font-black text-slate-900 italic tracking-tight">{lead.name}</h3>
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 mt-1">
                                <MapPin size={12} className="text-sky-400" /> {lead.location}
                                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                {lead.id}
                             </p>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-12 text-right">
                          <div className="hidden md:block">
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Assigned Context</p>
                             <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-slate-900 border border-slate-100 px-2 py-1 rounded-lg uppercase italic">{lead.partner}</span>
                                <ArrowRight size={14} className="text-slate-300" />
                                <span className="text-[10px] font-black text-sky-600 border border-sky-100 px-2 py-1 rounded-lg uppercase italic">{lead.employee}</span>
                             </div>
                          </div>
                          <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${statusColors[lead.status]} flex items-center gap-2`}>
                             {React.createElement(statusIcons[lead.status], { size: 14 })}
                             {lead.status}
                          </div>
                       </div>
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
                className="w-full lg:w-[450px] bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl overflow-y-auto max-h-[85vh] sticky top-8 custom-scrollbar"
              >
                 <div className="flex items-center justify-between mb-10">
                    <button onClick={() => setSelectedLead(null)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"><XCircle size={20} /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-900"><MoreVertical size={20} /></button>
                 </div>

                 <div className="text-center mb-10">
                    <div className="w-24 h-24 bg-sky-50 rounded-[2.5rem] flex items-center justify-center text-sky-600 mx-auto mb-6 shadow-inner ring-4 ring-white">
                       <User size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter mb-2">{selectedLead.name}</h2>
                    <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest italic">{selectedLead.id} Profile</span>
                 </div>

                 <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                          <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Direct Reach</p>
                          <p className="text-[11px] font-black text-slate-900 flex items-center gap-2"><Phone size={14} className="text-sky-500" /> {selectedLead.phone}</p>
                       </div>
                       <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                          <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Identity</p>
                          <p className="text-[11px] font-black text-slate-900 flex items-center gap-2 truncate"><Mail size={14} className="text-sky-500" /> {selectedLead.email}</p>
                       </div>
                    </div>

                    <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-inner space-y-6">
                       <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic underline decoration-sky-500 decoration-2 underline-offset-8">Field Intelligence</h4>
                       <div className="space-y-4">
                          <div className="flex items-center justify-between">
                             <span className="text-[11px] font-bold text-slate-500 italic">Submission Date</span>
                             <span className="text-[11px] font-black text-slate-900">{selectedLead.date}</span>
                          </div>
                          <div className="flex items-center justify-between">
                             <span className="text-[11px] font-bold text-slate-500 italic">Agent Network</span>
                             <span className="text-[11px] font-black text-sky-600">{selectedLead.employee}</span>
                          </div>
                          <div className="flex items-center justify-between">
                             <span className="text-[11px] font-bold text-slate-500 italic">Regional Hub</span>
                             <span className="text-[11px] font-black text-slate-900">{selectedLead.partner}</span>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <button className="py-5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all border border-rose-100 active:scale-[0.98]">
                          Reject
                       </button>
                       <button className="py-5 bg-sky-600 hover:bg-sky-700 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-sky-200 transition-all active:scale-[0.98]">
                          Approve
                       </button>
                    </div>
                    
                    <button className="w-full py-4 text-slate-400 hover:text-slate-600 font-black text-[9px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                       <Download size={14} /> Download Dossier
                    </button>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}

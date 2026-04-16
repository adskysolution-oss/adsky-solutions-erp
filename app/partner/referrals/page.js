'use client';

import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Users, 
  Globe, 
  ArrowRight, 
  Zap, 
  Target, 
  ShieldCheck, 
  QrCode, 
  ExternalLink,
  CheckCircle2,
  Activity,
  UserCheck,
  TrendingUp,
  MapPin,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_LINKS = [
  { id: 'RL-102', emp: 'EMP-001 - Rahul Verma', path: '/lead?partner=ADS-001&employee=EMP-001', clicks: 450, conversions: 124 },
  { id: 'RL-101', emp: 'EMP-042 - Priya Singh', path: '/lead?partner=ADS-001&employee=EMP-042', clicks: 280, conversions: 86 },
  { id: 'RL-100', emp: 'Direct Hub Link', path: '/lead?partner=ADS-001', clicks: 1200, conversions: 240 },
];

export default function ReferralEngine() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, path) => {
    const fullLink = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullLink);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-10 pb-32 font-sans">
      {/* Referral Header */}
      <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] -mr-48 -mt-48 transition-all group-hover:bg-indigo-500/10" />
         
         <div className="flex items-center gap-10 relative z-10">
            <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200 group-hover:rotate-12 transition-transform duration-500">
               <Share2 size={48} />
            </div>
            <div>
               <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none mb-3 italic">Referral <span className="text-indigo-600 font-black">Orchestrator</span></h1>
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic">Dynamic Attribution Engine</span>
                  <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full shadow-glow" />
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest italic">Hub ADS-001 Primary Nexus</span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-6 relative z-10">
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-3xl flex items-center gap-4">
               <div className="text-right">
                  <p className="text-[8px] font-black uppercase text-indigo-400 tracking-widest mb-1 italic">Network Reach</p>
                  <p className="text-lg font-black text-indigo-900 tracking-tighter uppercase italic">1.8k Nodes</p>
               </div>
               <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm hover:scale-110 transition-transform">
                  <Activity size={20} />
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Link Generator Area */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-indigo-600 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -mr-32 -mt-32 transition-all group-hover:scale-110" />
               <div className="relative z-10">
                  <h3 className="text-2xl font-black italic tracking-tighter mb-8 flex items-center gap-4">
                     Generate <span className="underline decoration-indigo-300 decoration-4 underline-offset-8">Tracking Pipeline</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-indigo-200 tracking-[0.2em] ml-4 italic">Assigned Agent Node</label>
                        <select className="w-full bg-white/10 border border-white/20 rounded-[2rem] py-5 px-8 text-sm font-black outline-none focus:border-white/40 transition-all text-white appearance-none cursor-pointer">
                           <option>EMP-001 - Rahul Verma</option>
                           <option>EMP-042 - Priya Singh</option>
                           <option>Direct Regional Flow</option>
                        </select>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-indigo-200 tracking-[0.2em] ml-4 italic">Campaign Target</label>
                        <input placeholder="Lead Generation Form" disabled className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 px-8 text-sm font-black outline-none italic text-indigo-300" />
                     </div>
                  </div>
                  
                  <button className="w-full py-6 bg-white text-indigo-900 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4">
                     Provision Unique Nexus Link <ArrowRight size={18} />
                  </button>
               </div>
            </div>

            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic border-l-4 border-indigo-600 pl-4">Active Distribution Threads</h4>
               {MOCK_LINKS.map((link) => (
                 <motion.div 
                   layout
                   key={link.id} 
                   className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all group flex items-center justify-between group overflow-hidden relative"
                 >
                    <div className="flex items-center gap-8 relative z-10">
                       <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300 group-hover:text-indigo-600 transition-colors shadow-inner">
                          <ExternalLink size={28} />
                       </div>
                       <div>
                          <h3 className="text-xl font-black text-slate-900 tracking-tighter italic mb-1">{link.emp}</h3>
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest font-mono group-hover:text-indigo-400 transition-colors italic">{link.path}</p>
                       </div>
                    </div>

                    <div className="flex items-center gap-12 text-right relative z-10">
                       <div className="hidden md:block">
                          <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Conversions</p>
                          <div className="flex items-center justify-end gap-2">
                             <p className="text-2xl font-black text-slate-900 italic tracking-tighter">{link.conversions}</p>
                             <TrendingUp size={16} className="text-emerald-500" />
                          </div>
                       </div>
                       <button 
                         onClick={() => handleCopy(link.id, link.path)}
                         className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-3 ${copiedId === link.id ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-slate-900 text-white shadow-xl shadow-slate-200'}`}
                       >
                          {copiedId === link.id ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                          {copiedId === link.id ? 'Copied' : 'Nexus Link'}
                       </button>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Selection Sidebar (Analytics/QR) */}
         <div className="space-y-8">
            <div className="p-12 bg-white border border-slate-100 rounded-[4rem] shadow-sm text-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-all duration-700" />
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10 italic">Hub QR DNA</h4>
               <div className="w-48 h-48 bg-slate-50 border-8 border-white p-6 rounded-[3rem] mx-auto mb-10 shadow-inner flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-indigo-600/5 rounded-[3rem] animate-pulse" />
                  <QrCode size={96} className="text-slate-900 opacity-80" />
               </div>
               <p className="text-[11px] font-black text-slate-900 italic leading-relaxed mb-10 px-6">
                 Share this regional QR code for instant farmer onboarding at the Maharashtra hub.
               </p>
               <button className="w-full py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 hover:bg-slate-900 hover:text-white transition-all">
                  Download QR Dossier
               </button>
            </div>

            <div className="p-10 bg-indigo-50 border border-indigo-100 rounded-[3.5rem] relative overflow-hidden group">
               <div className="flex items-start gap-4 mb-4 relative z-10">
                  <ShieldCheck size={28} className="text-indigo-600" />
                  <div>
                     <p className="text-[11px] font-black text-indigo-900 italic leading-tight mb-2 uppercase">Attribution Guard</p>
                     <p className="text-[10px] text-indigo-700 leading-relaxed font-black opacity-60 italic tracking-tight">
                       Our engine ensures 100% accurate commission attribution using encrypted tracking nodes. No lost credit.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

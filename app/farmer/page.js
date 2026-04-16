'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Download, 
  HelpCircle, 
  ChevronRight, 
  ArrowUpRight, 
  Zap, 
  Globe, 
  Phone,
  MessageCircle,
  FileText,
  Activity,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';
import { farmerTranslations } from '@/lib/i18n/farmer_i18n';
import Link from 'next/link';

export default function FarmerStatusHub() {
  const [lang, setLang] = useState('en');
  const t = farmerTranslations[lang];

  const currentStatus = 'review'; // submitted, review, approved, rejected

  const steps = [
    { key: 'submitted', label: t.status_submitted, icon: CheckCircle2 },
    { key: 'review', label: t.status_review, icon: Clock },
    { key: 'approved', label: t.status_approved, icon: Zap },
  ];

  const getStepIndex = (status) => steps.findIndex(s => s.key === status);

  return (
    <div className="space-y-10 pb-32">
      {/* Welcome Header */}
      <div className="text-center">
         <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-inner">
            <User size={32} />
         </div>
         <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase italic leading-none">{t.welcome}</h2>
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic mt-2">Farmer ID: ADS-294-X</p>
      </div>

      {/* Main Status Tracker */}
      <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32" />
         
         <div className="mb-12 relative z-10 flex justify-between items-end">
            <div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 italic">{t.status_hub}</h3>
               <p className="text-4xl font-black italic tracking-tighter text-slate-900 italic uppercase underline decoration-emerald-200 decoration-8 underline-offset-8">
                  {currentStatus === 'review' ? t.status_review : currentStatus === 'approved' ? t.status_approved : t.status_submitted}
               </p>
            </div>
            <div className={`p-4 rounded-2xl border ${currentStatus === 'approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
               <Zap size={24} fill={currentStatus === 'approved' ? 'currentColor' : 'none'} fillOpacity={0.2} />
            </div>
         </div>

         <div className="flex justify-between items-center relative z-10 px-2 lg:px-8 mb-4">
            {steps.map((step, idx) => (
              <React.Fragment key={step.key}>
                 <div className="flex flex-col items-center gap-3 group">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all ${getStepIndex(currentStatus) >= idx ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-200 scale-110' : 'bg-white border-slate-100 text-slate-300'}`}>
                       <step.icon size={24} />
                    </div>
                    <span className={`text-[8px] font-black uppercase tracking-widest ${getStepIndex(currentStatus) >= idx ? 'text-emerald-600' : 'text-slate-300'}`}>{step.label}</span>
                 </div>
                 {idx < steps.length - 1 && (
                    <div className={`flex-grow h-1 mx-4 rounded-full transition-all duration-700 ${getStepIndex(currentStatus) > idx ? 'bg-emerald-500 shadow-glow shadow-emerald-200' : 'bg-slate-100'}`} />
                 )}
              </React.Fragment>
            ))}
         </div>
      </div>

      {/* Primary Action Shards */}
      <div className="grid grid-cols-1 gap-6">
         {currentStatus === 'approved' ? (
            <button className="w-full flex items-center justify-between p-8 bg-emerald-600 text-white rounded-[2.5rem] shadow-2xl shadow-emerald-500/30 group active:scale-[0.98] transition-all">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                     <Download size={28} />
                  </div>
                  <div className="text-left">
                     <p className="text-[10px] font-black uppercase text-emerald-200 tracking-[0.2em] mb-1">{t.download_receipt}</p>
                     <p className="text-2xl font-black italic tracking-tighter">Mission Pass V1</p>
                  </div>
               </div>
               <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
         ) : (
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex items-center gap-6 shadow-sm">
               <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100">
                  <Clock size={28} className="animate-spin-slow" />
               </div>
               <div>
                  <h4 className="text-lg font-black text-slate-900 tracking-tighter italic uppercase leading-tight italic">Waiting for Audit</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Status updates every 24 hours</p>
               </div>
            </div>
         )}

         <div className="grid grid-cols-2 gap-4">
            <Link href="/farmer/apply" className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex flex-col items-center justify-center text-center gap-4 hover:border-emerald-500/30 transition-all group">
               <div className="w-12 h-12 bg-slate-50 text-slate-300 group-hover:text-emerald-600 rounded-xl flex items-center justify-center transition-colors">
                  <FileText size={24} />
               </div>
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest group-hover:text-emerald-600 transition-colors uppercase italic">{t.new_apply}</span>
            </Link>
            <Link href="/farmer/support" className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex flex-col items-center justify-center text-center gap-4 hover:border-emerald-500/30 transition-all group">
               <div className="w-12 h-12 bg-slate-50 text-slate-300 group-hover:text-emerald-600 rounded-xl flex items-center justify-center transition-colors">
                  <HelpCircle size={24} />
               </div>
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest group-hover:text-emerald-600 transition-colors uppercase italic">{t.support}</span>
            </Link>
         </div>
      </div>

      {/* Regional Support Node */}
      <div className="p-8 bg-slate-900 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[100px] -mr-24 -mt-24 transition-all group-hover:bg-emerald-500/20" />
         <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-110 transition-transform">
               <Activity size={32} />
            </div>
            <div>
               <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-3 italic">Regional Verification Desk</h4>
               <p className="text-xl font-black italic tracking-tighter leading-tight italic px-6 uppercase underline decoration-white/20 underline-offset-4">Satna Regional Office - 485001</p>
            </div>
            <div className="flex gap-4 w-full">
               <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95">
                  <Phone size={18} className="text-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Call</span>
               </button>
               <button className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20 active:scale-95 transition-all">
                  <MessageCircle size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Chat</span>
               </button>
            </div>
         </div>
      </div>

      <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[2rem] flex items-start gap-4 shadow-sm">
         <ShieldCheck size={24} className="text-emerald-600 shrink-0" />
         <p className="text-[9px] text-emerald-900 font-black italic uppercase italic leading-relaxed tracking-tight">
           Your data is cryptographically secured by AdSky Sentinel. No mission data is shared outside regional verification node.
         </p>
      </div>
    </div>
  );
}

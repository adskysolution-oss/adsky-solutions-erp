'use client';

import React, { useState, useEffect } from 'react';
import { UserPlus, Copy, CheckCircle2, QrCode, Share2, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmployeeOnboardPage() {
  const [employee, setEmployee] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo data for field agent
    setTimeout(() => {
      setEmployee({
        name: 'Rahul Agent',
        employeeCode: 'EMP1001',
        partnerCode: 'ADSKY001'
      });
      setLoading(false);
    }, 800);
  }, []);

  const referralLink = typeof window !== 'undefined' ? `${window.location.origin}/apply?partner=${employee?.partnerCode}&agent=${employee?.employeeCode}` : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;

  return (
    <div className="space-y-8 pb-32">
      {/* Premium Header */}
      <div className="relative p-12 rounded-[3rem] bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden shadow-2xl shadow-blue-600/20">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -mr-32 -mt-32" />
         <div className="relative z-10">
            <h1 className="text-4xl font-black text-white italic tracking-tighter mb-2">Field <span className="text-blue-200">Onboarding</span></h1>
            <p className="text-blue-100 text-sm max-w-md font-medium opacity-80">Generate your unique link or scan QR code to start an application for a farmer on the spot.</p>
         </div>
         <Sparkles className="absolute bottom-6 right-10 text-white/20" size={120} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Link Generation Card */}
        <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-8">
           <h3 className="text-xl font-black text-white italic">Your Unique <span className="text-blue-500">Share Link</span></h3>
           <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 relative group overflow-hidden">
              <code className="text-blue-400 font-mono text-xs block mb-4 uppercase font-black opacity-60">Referral URL:</code>
              <p className="text-white font-mono text-sm break-all mb-8 opacity-80">{referralLink}</p>
              
              <button 
                onClick={copyToClipboard}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${copied ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                {copied ? <CheckCircle2 size={22} /> : <Copy size={22} />}
                {copied ? 'Link Copied!' : 'Copy Link To Share'}
              </button>
           </div>
           <div className="flex gap-4">
              <button className="flex-grow py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-2 border border-white/5 transition-all">
                <Share2 size={18} /> WhatsApp
              </button>
              <button className="flex-grow py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-2 border border-white/5 transition-all">
                <Mail size={18} /> SMS
              </button>
           </div>
        </div>

        {/* In-Person Onboarding Card */}
        <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col items-center text-center">
           <div className="w-48 h-48 bg-white p-4 rounded-3xl mb-8 shadow-2xl">
              <QrCode size={160} className="text-slate-900" />
           </div>
           <h3 className="text-xl font-black text-white italic mb-2 tracking-tight">On-The-Spot <span className="text-emerald-500">QR Code</span></h3>
           <p className="text-slate-400 text-sm max-w-xs mb-8">Let the farmer scan this code directly from your phone to open the secure landing page.</p>
           
           <button 
             onClick={() => window.open(referralLink, '_blank')}
             className="w-full py-5 bg-white text-slate-900 hover:bg-slate-200 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3"
           >
             Open Form Now
             <ArrowRight size={22} />
           </button>
        </div>

      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const partnerCode = searchParams.get('partner') || '';
  const agentCode = searchParams.get('agent') || '';

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    farmerName: '',
    phone: '',
    email: '',
    state: '',
    district: '',
    customData: {}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/public/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          partnerCode,
          employeeCode: agentCode
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setStep(3); // Success/Payment state
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -ml-44 -mt-44 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[120px] -mr-44 -mb-44 pointer-events-none" />

      <div className="w-full max-w-xl z-10">
        {/* Header */}
        <div className="text-center mb-10">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
             <ShieldCheck size={14} className="text-emerald-400" />
             Official Onboarding Portal
           </div>
           <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4">
             Farmer <span className="text-blue-500 text-glow">Registration</span>
           </h1>
           <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
             Join the AdSky Solution network. Fill in your details below to get started with your application.
           </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input 
                      required
                      type="text" 
                      value={formData.farmerName}
                      onChange={e => setFormData({...formData, farmerName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600 font-bold"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600 font-bold"
                        placeholder="Primary number"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Email (Optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600 font-bold"
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    Next Information
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.form 
                onSubmit={handleSubmit}
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">State</label>
                    <input 
                      required
                      type="text" 
                      value={formData.state}
                      onChange={e => setFormData({...formData, state: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white focus:border-blue-500/50 outline-none transition-all font-bold"
                      placeholder="e.g. Maharashtra"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">District</label>
                    <input 
                      required
                      type="text" 
                      value={formData.district}
                      onChange={e => setFormData({...formData, district: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white focus:border-blue-500/50 outline-none transition-all font-bold"
                      placeholder="e.g. Pune"
                    />
                  </div>
                </div>

                {/* Document Uploads Area */}
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Required Documents (.jpg / .pdf)</p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="relative group">
                        <input 
                          type="file" 
                          onChange={async (e) => {
                             const file = e.target.files[0];
                             const body = new FormData();
                             body.append('file', file);
                             const res = await fetch('/api/public/upload', { method: 'POST', body });
                             const data = await res.json();
                             setFormData({...formData, customData: {...formData.customData, aadhar: data.url}});
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        />
                        <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/10 text-center group-hover:bg-white/10 transition-all">
                           <FileText size={20} className="mx-auto mb-2 text-blue-500" />
                           <p className="text-[9px] font-bold text-slate-400">UPLOAD AADHAR</p>
                           {formData.customData.aadhar && <p className="text-[8px] text-emerald-500 mt-1 uppercase font-black">Attached ✅</p>}
                        </div>
                     </div>
                     <div className="relative group">
                        <input 
                          type="file" 
                          onChange={async (e) => {
                             const file = e.target.files[0];
                             const body = new FormData();
                             body.append('file', file);
                             const res = await fetch('/api/public/upload', { method: 'POST', body });
                             const data = await res.json();
                             setFormData({...formData, customData: {...formData.customData, pan: data.url}});
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        />
                        <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/10 text-center group-hover:bg-white/10 transition-all">
                           <FileText size={20} className="mx-auto mb-2 text-blue-500" />
                           <p className="text-[9px] font-bold text-slate-400">UPLOAD PAN CARD</p>
                           {formData.customData.pan && <p className="text-[8px] text-emerald-500 mt-1 uppercase font-black">Attached ✅</p>}
                        </div>
                     </div>
                   </div>
                </div>

                <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                   <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2 flex items-center gap-2">
                     <AlertCircle size={14} />
                     Referral Tracking
                   </p>
                   <div className="flex gap-4">
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase font-black">Partner Source</p>
                        <p className="text-white font-mono text-xs font-bold">{partnerCode || 'Direct Entry'}</p>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase font-black">Agent ID</p>
                        <p className="text-white font-mono text-xs font-bold">{agentCode || 'None'}</p>
                      </div>
                   </div>
                </div>

                <div className="pt-8 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-grow py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all"
                  >
                    Back
                  </button>
                  <button 
                    disabled={loading}
                    type="submit"
                    className="flex-[2] py-5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-emerald-600/20 active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
                    Submit & Pay
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CreditCard size={48} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black text-white italic mb-2">Lead <span className="text-emerald-400">Captured!</span></h3>
                <p className="text-slate-400 text-sm mb-10 leading-relaxed px-4">
                  Your application has been registered. Please pay the one-time processing fee of **₹249** to complete the onboarding process.
                </p>
                <button 
                  onClick={async () => {
                    setLoading(true);
                    const res = await fetch('/api/public/payment/verify', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ applicationId: 'MOCK_ID', paymentId: 'PAY' + Date.now(), status: 'SUCCESS' })
                    });
                    const data = await res.json();
                    if(data.success) alert('Payment Successful! Commission credited.');
                    setLoading(false);
                  }}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} />}
                  Pay ₹249 Securely
                </button>
                <p className="text-slate-500 text-[10px] mt-6 flex items-center justify-center gap-2">
                  <ShieldCheck size={14} />
                  Safe & Encrypted Payments by Cashfree
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Info */}
        <div className="mt-10 text-center text-slate-500 text-xs font-medium space-y-2 opacity-60">
           <p>© 2026 AdSky Solution. All Rights Reserved.</p>
           <p>Contact: +91 99999 99999 | support@adsky.com</p>
        </div>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617] flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={40} /></div>}>
      <ApplyFormContent />
    </Suspense>
  );
}

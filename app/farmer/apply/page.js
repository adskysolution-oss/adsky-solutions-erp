'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Camera, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  CloudUpload,
  User,
  Smartphone,
  Info,
  Zap,
  Loader2,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { farmerTranslations } from '@/lib/i18n/farmer_i18n';
import Link from 'next/link';

export default function FarmerApplication() {
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState('en'); // Defaults to en, layout parent handles toggle
  const t = farmerTranslations[lang];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    village: '',
    district: '',
    aadhar: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <div className="flex gap-2 mb-10">
         {[1, 2, 3].map(s => (
           <div key={s} className={`h-2 flex-grow rounded-full transition-all duration-500 ${step >= s ? 'bg-emerald-500 shadow-glow shadow-emerald-200' : 'bg-slate-100'}`} />
         ))}
      </div>

      <AnimatePresence mode="wait">
         {step === 1 && (
           <motion.div 
             key="step1"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="space-y-10"
           >
              <div className="text-center">
                 <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-white">
                    <User size={40} />
                 </div>
                 <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase underline underline-offset-8 decoration-emerald-200 leading-none">{t.step1}</h2>
              </div>

              <div className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-4">{t.name_label}</label>
                    <input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Subhash Chandra" 
                      className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-6 px-10 text-lg font-black outline-none focus:border-emerald-500/30 transition-all italic text-slate-900 shadow-sm" 
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-4">{t.phone_label}</label>
                    <input 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91" 
                      className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-6 px-10 text-lg font-black outline-none focus:border-emerald-500/30 transition-all italic text-slate-900 shadow-sm" 
                    />
                 </div>
              </div>

              <button 
                onClick={nextStep}
                disabled={!formData.name || !formData.phone}
                className="w-full py-7 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-sm shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                 {t.next_button} <ChevronRight size={20} />
              </button>
           </motion.div>
         )}

         {step === 2 && (
           <motion.div 
             key="step2"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="space-y-10"
           >
              <div className="text-center">
                 <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-white">
                    <MapPin size={40} />
                 </div>
                 <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase underline underline-offset-8 decoration-emerald-200 leading-none">Location Node</h2>
              </div>

              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                       <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-4">{t.district_label}</label>
                       <input 
                         value={formData.district}
                         onChange={(e) => setFormData({...formData, district: e.target.value})}
                         placeholder="District" className="w-full bg-white border border-slate-100 rounded-3xl py-5 px-8 text-sm font-bold shadow-sm outline-none focus:border-emerald-500/30 font-sans" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-4">{t.village_label}</label>
                       <input 
                         value={formData.village}
                         onChange={(e) => setFormData({...formData, village: e.target.value})}
                         placeholder="Village" className="w-full bg-white border border-slate-100 rounded-3xl py-5 px-8 text-sm font-bold shadow-sm outline-none focus:border-emerald-500/30 font-sans" />
                    </div>
                 </div>

                 <div className="p-8 bg-white border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-center group cursor-pointer hover:border-emerald-500/30 transition-all shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-emerald-600 transition-colors mb-4 border border-slate-50">
                       <Camera size={32} />
                    </div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic mb-1">Upload Aadhaar Photo</p>
                    <p className="text-[8px] font-bold text-slate-300 uppercase italic">Large buttons for easy click</p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button onClick={prevStep} className="flex-1 py-6 bg-slate-100 text-slate-400 rounded-[2rem] font-black uppercase tracking-widest text-xs active:scale-95 transition-all outline-none">{t.back_button}</button>
                 <button onClick={nextStep} className="flex-[2] py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl active:scale-[0.98] transition-all">{t.next_button}</button>
              </div>
           </motion.div>
         )}

         {step === 3 && (
           <motion.div 
             key="step3"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="space-y-10"
           >
              <div className="text-center">
                 <div className="w-24 h-24 bg-emerald-600 text-white rounded-[3rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/30">
                    <Zap size={48} />
                 </div>
                 <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase underline underline-offset-8 decoration-emerald-200 leading-none">{t.step3}</h2>
              </div>

              <div className="p-10 bg-slate-900 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group text-center space-y-6">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/30 transition-all" />
                 <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.4em] mb-3 italic">{t.payment_title}</p>
                    <p className="text-6xl font-black italic tracking-tighter">₹249</p>
                 </div>
                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-relaxed opacity-80 px-4">
                    {t.payment_desc}
                 </p>
              </div>

              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[2rem] flex items-start gap-4 shadow-sm">
                 <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
                 <p className="text-[10px] text-emerald-900 font-black italic uppercase italic leading-relaxed tracking-tight">
                    Secure checkout powered by Razorpay. Your mission data is encrypted and ready for verification node.
                 </p>
              </div>

              <div className="flex gap-4">
                 <button onClick={prevStep} className="flex-1 py-6 bg-slate-100 text-slate-400 rounded-[2rem] font-black uppercase tracking-widest text-xs active:scale-95 transition-all outline-none">{t.back_button}</button>
                 <Link href="/farmer" className="flex-[2] py-7 bg-emerald-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-sm shadow-2xl shadow-emerald-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-4">
                    {t.submit_button} <ChevronRight size={20} />
                 </Link>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}

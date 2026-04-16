'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  ArrowLeft, 
  Camera, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  CheckCircle2, 
  CloudUpload,
  Database,
  Smartphone,
  Info,
  Zap,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DraftService } from '@/lib/services/drafts';
import { captureMissionCoordinates } from '@/lib/utils/geo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FarmerOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [geoData, setGeoData] = useState(null);
  const [isCapturingGeo, setIsCapturingGeo] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    village: '',
    district: '',
    aadharNumber: '',
    panNumber: '',
    docs: {
      aadhar: null,
      pan: null,
      land: null
    }
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const captureGeo = async () => {
    setIsCapturingGeo(true);
    try {
      const coords = await captureMissionCoordinates();
      setGeoData(coords);
    } catch (err) {
      console.error('Geo Capture Failed:', err);
    } finally {
      setIsCapturingGeo(false);
    }
  };

  const handleSaveDraft = () => {
    DraftService.saveDraft(formData);
    alert('Progress saved to local draft node.');
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API Mission Submission
    setTimeout(() => {
      setLoading(false);
      setStep(4); // Success Step
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-32 max-w-lg mx-auto overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-2">
         <Link href="/field" className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm">
            <ArrowLeft size={20} />
         </Link>
         <h2 className="text-xl font-black text-slate-900 tracking-tighter italic uppercase italic leading-none">New <span className="text-amber-500">Mission</span></h2>
         <button onClick={handleSaveDraft} className="text-[9px] font-black uppercase text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg active:bg-slate-900 active:text-white transition-all">Save Draft</button>
      </div>

      {/* Progress Line */}
      <div className="flex gap-2 mb-10 px-2">
         {[1, 2, 3].map(s => (
           <div key={s} className={`h-1.5 flex-grow rounded-full transition-all duration-500 ${step >= s ? 'bg-amber-500 shadow-glow shadow-amber-200' : 'bg-slate-100'}`} />
         ))}
      </div>

      <AnimatePresence mode="wait">
         {step === 1 && (
           <motion.div 
             key="step1"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             className="space-y-8 px-2"
           >
              <div>
                 <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter mb-2 italic uppercase">Identity <span className="text-amber-500">Nodes</span></h3>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Core personal credentials</p>
              </div>

              <div className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-6 italic">Farmer's Full Legal Name</label>
                    <input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Subhash Chandra" 
                      className="w-full bg-white border border-slate-100 rounded-[2rem] py-5 px-8 text-sm font-bold shadow-sm outline-none focus:border-amber-500/30 transition-all italic" 
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-6 italic">Primary Mobile Node</label>
                    <input 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91" 
                      className="w-full bg-white border border-slate-100 rounded-[2rem] py-5 px-8 text-sm font-bold shadow-sm outline-none focus:border-amber-500/30 transition-all italic" 
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-6 italic">District</label>
                       <input 
                         value={formData.district}
                         onChange={(e) => setFormData({...formData, district: e.target.value})}
                         placeholder="e.g. Satna" className="w-full bg-white border border-slate-100 rounded-[2rem] py-5 px-8 text-sm font-bold shadow-sm outline-none focus:border-amber-500/30 transition-all italic" 
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-6 italic">Village</label>
                       <input 
                         value={formData.village}
                         onChange={(e) => setFormData({...formData, village: e.target.value})}
                         placeholder="e.g. Rewa" className="w-full bg-white border border-slate-100 rounded-[2rem] py-5 px-8 text-sm font-bold shadow-sm outline-none focus:border-amber-500/30 transition-all italic" 
                       />
                    </div>
                 </div>
              </div>

              <button 
                onClick={nextStep}
                disabled={!formData.name || !formData.phone}
                className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50"
              >
                 Next Protocol <ChevronRight size={18} />
              </button>
           </motion.div>
         )}

         {step === 2 && (
           <motion.div 
             key="step2"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             className="space-y-8 px-2"
           >
              <div>
                 <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter mb-2 italic uppercase underline decoration-amber-200 underline-offset-8">Auth <span className="text-amber-500 italic">Dossier</span></h3>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Government ID verification</p>
              </div>

              <div className="space-y-8">
                 {[
                   { label: 'Aadhaar Card (Front)', key: 'aadhar' },
                   { label: 'PAN Card (Front)', key: 'pan' },
                   { label: 'Land Record (B1/P1)', key: 'land' }
                 ].map(item => (
                   <div key={item.key} className="p-8 bg-white border border-slate-100 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center text-center group cursor-pointer hover:border-amber-500/30 transition-all shadow-sm">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-amber-600 transition-colors mb-4 border border-slate-50">
                         <Camera size={32} />
                      </div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic mb-1">{item.label}</p>
                      <p className="text-[8px] font-bold text-slate-300 uppercase italic">Max size: 5MB • JPG/PNG</p>
                   </div>
                 ))}
                 
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-6 italic">Aadhaar Identity Number</label>
                    <input 
                      value={formData.aadharNumber}
                      onChange={(e) => setFormData({...formData, aadharNumber: e.target.value})}
                      placeholder="12-digit UID" 
                      className="w-full bg-white border border-slate-100 rounded-[2rem] py-5 px-8 text-sm font-bold shadow-sm outline-none focus:border-amber-500/30 transition-all italic" 
                    />
                 </div>
              </div>

              <div className="flex gap-4">
                 <button onClick={prevStep} className="flex-1 py-6 bg-slate-50 text-slate-400 rounded-[2rem] font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all">Back</button>
                 <button onClick={nextStep} className="flex-[2] py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl active:scale-[0.98] transition-all">Final Review</button>
              </div>
           </motion.div>
         )}

         {step === 3 && (
           <motion.div 
             key="step3"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             className="space-y-8 px-2"
           >
              <div>
                 <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter mb-2 italic uppercase">Mission <span className="text-amber-500">Confirm</span></h3>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Geospatial pulse & summary</p>
              </div>

              <div className="space-y-6">
                 {/* Geo Verification Card */}
                 <div className={`p-8 border rounded-[3rem] transition-all relative overflow-hidden group ${geoData ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex items-center justify-between relative z-10">
                       <div className="flex items-center gap-5">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner transition-colors ${geoData ? 'bg-white text-emerald-600 border-emerald-100 shadow-emerald-100' : 'bg-white text-slate-300 border-slate-100 shadow-slate-100'}`}>
                             {isCapturingGeo ? <Loader2 size={24} className="animate-spin" /> : <MapPin size={24} />}
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Spatial Node</p>
                             <h4 className="text-lg font-black text-slate-900 tracking-tighter italic uppercase">{geoData ? 'Authenticated' : 'Offline'}</h4>
                          </div>
                       </div>
                       {!geoData && (
                          <button 
                            onClick={captureGeo}
                            disabled={isCapturingGeo}
                            className="px-6 py-2.5 bg-amber-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-amber-200 active:scale-95 transition-all"
                          >
                             Capture GPS
                          </button>
                       )}
                    </div>
                    {geoData && (
                       <div className="mt-6 p-4 bg-white/50 rounded-2xl flex items-center justify-between text-[9px] font-black text-emerald-700 uppercase italic">
                          <span>Lat: {geoData.latitude.toFixed(4)}</span>
                          <span>Long: {geoData.longitude.toFixed(4)}</span>
                       </div>
                    )}
                 </div>

                 {/* Summary Card */}
                 <div className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm space-y-4">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic flex items-center gap-2 underline underline-offset-4 decoration-slate-100"><Zap size={14} className="text-amber-500" /> Lead Preview</p>
                    <div className="space-y-2">
                       <p className="text-xl font-black text-slate-900 italic tracking-tighter uppercase">{formData.name}</p>
                       <p className="text-xs font-bold text-slate-400 uppercase italic">Phone: {formData.phone}</p>
                       <p className="text-xs font-bold text-slate-400 uppercase italic">{formData.village}, {formData.district}</p>
                    </div>
                 </div>

                 <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-[2rem]">
                    <div className="flex items-start gap-4">
                       <ShieldCheck size={24} className="text-indigo-600 shrink-0" />
                       <p className="text-[9px] text-indigo-900 font-black italic uppercase leading-relaxed tracking-tight">
                         Mission finalized. Fee ₹249 payment required for full activation. Ensure farmer identity matches政府 records.
                       </p>
                    </div>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button onClick={prevStep} className="flex-1 py-6 bg-slate-50 text-slate-400 rounded-[2rem] font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all">Back</button>
                 <button 
                   onClick={handleSubmit} 
                   disabled={loading || !geoData}
                   className="flex-[2] py-6 bg-amber-500 text-slate-900 rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                 >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : 'Settle Mission'}
                 </button>
              </div>
           </motion.div>
         )}

         {step === 4 && (
           <motion.div 
             key="success"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-center py-10 space-y-10 px-2"
           >
              <div className="w-32 h-32 bg-emerald-50 text-emerald-500 rounded-[3.5rem] flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50/50">
                 <CheckCircle2 size={72} />
              </div>
              <div>
                 <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase mb-4">Mission <span className="text-emerald-500">Secured</span></h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] italic max-w-xs mx-auto">
                    Farmer {formData.name} has been successfully onboarded. Proceed to mission history for payment tracking.
                 </p>
              </div>

              <div className="p-8 bg-slate-900 text-white rounded-[3rem] shadow-2xl space-y-6">
                 <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mb-2 italic">Activation Fee</p>
                    <p className="text-5xl font-black italic tracking-tighter">₹249</p>
                 </div>
                 <button className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
                    Show Payment QR
                 </button>
              </div>

              <Link href="/field" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-all italic">Return to Field Hub</Link>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}

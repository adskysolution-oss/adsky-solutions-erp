'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  ChevronRight, 
  ChevronLeft,
  Send,
  Sparkles
} from 'lucide-react';

export default function PublicForm({ params }) {
  const { slug } = params;
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`/api/forms/public/${slug}`);
        if (!res.ok) throw new Error("Form not found");
        const data = await res.json();
        setForm(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [slug]);

  const handleInputChange = (stepIdx, fieldIdx, value) => {
    const key = `${stepIdx}-${fieldIdx}`;
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < form.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/forms/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, ...formData })
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      alert("Error submitting form: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
        <p className="font-black italic tracking-widest animate-pulse uppercase">Initializing Form Engine...</p>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white p-6">
         <div className="max-w-md w-full p-12 rounded-[3rem] bg-white/5 border border-white/10 text-center">
            <h1 className="text-4xl font-black text-white italic mb-4">404</h1>
            <p className="text-slate-400 italic mb-8">This link has expired or doesn't exist.</p>
            <a href="/" className="px-8 py-4 bg-white text-black font-black rounded-2xl italic uppercase text-xs">Back to AdSky</a>
         </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white p-6">
         <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full p-12 rounded-[4rem] bg-white text-center shadow-4xl">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
               <CheckCircle2 size={48} className="text-white" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 italic mb-4 tracking-tighter">Success!</h2>
            <p className="text-slate-500 italic font-medium mb-8">Your response has been recorded securely. Our team will get back to you shortly.</p>
            <button onClick={() => window.location.reload()} className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl italic uppercase text-xs hover:scale-105 transition-all">Submit Another</button>
         </motion.div>
      </div>
    );
  }

  const currentStepData = form.steps[currentStep];
  const progress = ((currentStep + 1) / form.steps.length) * 100;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
       {/* Top Progress Bar */}
       <div className="fixed top-0 left-0 w-full h-1.5 bg-white/5 z-50">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          />
       </div>

       <main className="flex-grow flex items-center justify-center p-6 py-20 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-[10%] -left-[5%] w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full" />

          <div className="max-w-3xl w-full relative z-10">
             <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest italic">Step {currentStep + 1} of {form.steps.length}</span>
                  <div className="h-px grow bg-white/10" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none mb-4">{form.formName}</h1>
                <p className="text-slate-400 italic font-medium">{form.description}</p>
             </div>

             <div className="rounded-[3rem] bg-white/5 border border-white/10 p-8 md:p-16 backdrop-blur-xl shadow-4xl">
                <div className="mb-12">
                   <h2 className="text-2xl font-black text-white italic tracking-tight flex items-center gap-4">
                      <Sparkles size={24} className="text-blue-400" />
                      {currentStepData.title}
                   </h2>
                </div>

                <div className="space-y-8">
                   {currentStepData.fields.map((field, fIdx) => (
                      <div key={fIdx} className="space-y-3">
                         <label className="block text-sm font-black text-slate-300 italic uppercase tracking-widest">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                         </label>
                         
                         {field.type === 'textarea' ? (
                           <textarea 
                             placeholder={field.placeholder}
                             className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500 focus:bg-white/10 transition-all outline-none italic font-medium min-h-[150px]"
                             onChange={(e) => handleInputChange(currentStep, fIdx, e.target.value)}
                             value={formData[`${currentStep}-${fIdx}`] || ''}
                           />
                         ) : field.type === 'select' ? (
                            <select 
                               className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:bg-white/10 transition-all outline-none italic font-medium appearance-none"
                               onChange={(e) => handleInputChange(currentStep, fIdx, e.target.value)}
                               value={formData[`${currentStep}-${fIdx}`] || ''}
                            >
                               <option value="" className="bg-[#020617]">Select Option...</option>
                               {field.options?.map((opt, oIdx) => (
                                 <option key={oIdx} value={opt} className="bg-[#020617]">{opt}</option>
                               ))}
                            </select>
                         ) : field.type === 'radio' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               {field.options?.map((opt, oIdx) => (
                                 <label key={oIdx} className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${formData[`${currentStep}-${fIdx}`] === opt ? 'bg-blue-500/20 border-blue-500' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                                    <input 
                                      type="radio" 
                                      name={`radio-${currentStep}-${fIdx}`}
                                      className="hidden"
                                      onChange={() => handleInputChange(currentStep, fIdx, opt)}
                                      checked={formData[`${currentStep}-${fIdx}`] === opt}
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData[`${currentStep}-${fIdx}`] === opt ? 'border-blue-500' : 'border-slate-600'}`}>
                                       {formData[`${currentStep}-${fIdx}`] === opt && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                                    </div>
                                    <span className="font-bold italic text-sm">{opt}</span>
                                 </label>
                               ))}
                            </div>
                         ) : field.type === 'checkbox' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               {field.options?.map((opt, oIdx) => {
                                 const currentValues = formData[`${currentStep}-${fIdx}`] || [];
                                 const isChecked = currentValues.includes(opt);
                                 return (
                                   <label key={oIdx} className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${isChecked ? 'bg-emerald-500/20 border-emerald-500' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                                      <input 
                                        type="checkbox" 
                                        className="hidden"
                                        onChange={() => {
                                           const newVal = isChecked ? currentValues.filter(v => v !== opt) : [...currentValues, opt];
                                           handleInputChange(currentStep, fIdx, newVal);
                                        }}
                                        checked={isChecked}
                                      />
                                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${isChecked ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600'}`}>
                                         {isChecked && <CheckCircle2 size={12} className="text-white" />}
                                      </div>
                                      <span className="font-bold italic text-sm">{opt}</span>
                                   </label>
                                 );
                               })}
                            </div>
                         ) : field.type === 'rating' ? (
                            <div className="flex items-center gap-4 bg-white/5 p-8 rounded-3xl border border-white/10">
                               {[1,2,3,4,5].map(star => (
                                  <button 
                                    key={star} 
                                    onClick={() => handleInputChange(currentStep, fIdx, star)}
                                    className={`text-4xl transition-all hover:scale-125 ${formData[`${currentStep}-${fIdx}`] >= star ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'text-slate-700'}`}
                                  >
                                    ★
                                  </button>
                               ))}
                               <span className="ml-4 font-black italic text-slate-500">{formData[`${currentStep}-${fIdx}`] || 0} / 5</span>
                            </div>
                         ) : (
                           <input 
                             type={field.type}
                             placeholder={field.placeholder}
                             className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500 focus:bg-white/10 transition-all outline-none italic font-medium"
                             onChange={(e) => handleInputChange(currentStep, fIdx, e.target.value)}
                             value={formData[`${currentStep}-${fIdx}`] || ''}
                           />
                         )}
                         {field.helpText && <p className="text-[10px] text-slate-500 italic font-bold tracking-wider">{field.helpText}</p>}
                      </div>
                   ))}
                </div>

                <div className="mt-16 flex items-center justify-between gap-6">
                   <button 
                     disabled={currentStep === 0}
                     onClick={() => setCurrentStep(prev => prev - 1)}
                     className={`flex items-center gap-2 px-8 py-5 rounded-2xl font-black italic uppercase text-xs transition-all ${currentStep === 0 ? 'opacity-20 grayscale' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                   >
                     <ChevronLeft size={18} /> Back
                   </button>
                   
                   <button 
                     onClick={handleNext}
                     disabled={submitting}
                     className="grow flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 transition-all italic uppercase tracking-widest text-xs"
                   >
                     {submitting ? <Loader2 className="animate-spin" /> : currentStep === form.steps.length - 1 ? <><Send size={18} /> Submit Build</> : <><ChevronRight size={18} /> Continue</>}
                   </button>
                </div>
             </div>
          </div>
       </main>
       
       <footer className="p-8 text-center border-t border-white/5">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] italic">Powered by AD Sky Dynamic Form Engine</p>
       </footer>
    </div>
  );
}

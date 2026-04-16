'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, ShieldCheck, Key, RefreshCw, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen mesh-gradient-vibrant flex items-center justify-center p-6 sm:p-12 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg overflow-hidden rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-white/60 bg-white/40 glass-card p-12 sm:p-20 relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-16 -mt-16" />
        
        <div className="text-center mb-12">
           <Link href="/login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest hover:text-indigo-600 transition-colors mb-8 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Login Node
           </Link>
           <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl glow-indigo">
              <Key size={36} />
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none mb-3">
              Identity <span className="text-indigo-600">Recovery</span>
           </h1>
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">AdSky Secure Keyphrase Reset</p>
        </div>

        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.form 
              key="request-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit} 
              className="space-y-8"
            >
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 italic">Node Email Address</label>
                 <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="node@adskysolution.com"
                      className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[1.75rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white text-sm font-bold transition-all shadow-inner"
                    />
                 </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[11px] tracking-[0.3em] italic flex items-center justify-center gap-3 shadow-2xl hover:bg-black transition-all group disabled:opacity-50"
              >
                {isLoading ? <RefreshCw size={20} className="animate-spin" /> : (
                  <>Send Recovery Signal <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div 
               key="success-message"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center py-10"
            >
               <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} />
               </div>
               <h3 className="text-xl font-black italic text-slate-900 mb-4">Transmission Sent</h3>
               <p className="text-sm font-bold text-slate-500 mb-8 leading-relaxed italic">
                 If that node exists in our network, a secure recovery sequence has been dispatched to <br/>
                 <span className="text-slate-900 font-black">{email}</span>
               </p>
               <button 
                  onClick={() => setIsSent(false)}
                  className="text-[10px] font-black uppercase text-indigo-600 tracking-widest hover:underline"
               >
                  Wrong email? Try again
               </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-center gap-2">
           <ShieldCheck size={14} className="text-slate-300" />
           <span className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em]">AdSky Security Protocol Active</span>
        </div>
      </motion.div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, ArrowRight, ShieldCheck, Mail, Lock, Phone, User, Briefcase, Zap, Globe, Shield } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [role, setRole] = useState('farmer'); // farmer, partner, agent
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });

  const roles = [
    { id: 'farmer', title: 'Farmer Node', icon: Globe, desc: 'Digital asset management for agriculture.' },
    { id: 'partner', title: 'Partner Hub', icon: Briefcase, desc: 'Enterprise regional management & revenue share.' },
    { id: 'agent', title: 'Field Agent', icon: Zap, desc: 'Mobile operations and lead registration.' },
  ];

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Registration initiated for ${role} role. Backend logic connecting...`);
  };

  return (
    <div className="min-h-screen mesh-gradient-vibrant flex items-center justify-center p-6 sm:p-12 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-white/60 bg-white/40 glass-card"
      >
        {/* Left Aspect - Identity Context */}
        <div className="p-12 lg:p-20 bg-slate-900 text-white relative flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 blur-[100px] -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 mb-12 group">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                <ShieldCheck size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white italic tracking-tighter leading-none">AdSky</h1>
                <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mt-1">25X NETWORK</p>
              </div>
            </Link>

            <h2 className="text-5xl font-black italic tracking-tighter leading-tight mb-8">
               Secure <br/>
               <span className="text-gradient-vibrant">Protocol</span> Access.
            </h2>
            <p className="text-slate-400 text-lg font-bold italic tracking-tight opacity-80 leading-relaxed max-w-sm mb-12">
               Connect your node to the AdSky 25X Digital Mesh and begin high-yield operations.
            </p>

            <div className="space-y-6">
               {[
                 { label: 'Verified Network', value: '4.2k Active Nodes' },
                 { label: 'Security Level', value: 'AES-256 AES_X' },
                 { label: 'Uptime', value: '99.9% Real-time' },
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-emerald-400">
                       <Shield size={14} />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-500"><span className="text-white">{item.label}:</span> {item.value}</p>
                 </div>
               ))}
            </div>
          </div>

          <p className="text-[10px] font-black uppercase text-indigo-600 tracking-[0.4em] relative z-10 mt-12 italic">Identity verification required</p>
        </div>

        {/* Right Aspect - Dynamic Signup Form */}
        <div className="p-12 lg:p-20 bg-white/60 relative">
          <div className="flex justify-between items-center mb-12">
             <h3 className="text-xl font-black text-slate-900 tracking-tighter italic">Initialize <span className="text-indigo-600">Access</span></h3>
             <Link href="/login" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">Existing Node? Login</Link>
          </div>

          <form onSubmit={handleSignup} className="space-y-8">
             <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div 
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic ml-1 mb-4">Select Operations Role</p>
                    <div className="space-y-4">
                       {roles.map((r) => (
                         <button 
                           key={r.id}
                           type="button"
                           onClick={() => setRole(r.id)}
                           className={`w-full flex items-center gap-6 p-6 rounded-3xl border-2 transition-all text-left ${role === r.id ? 'border-indigo-600 bg-indigo-50/50 shadow-xl shadow-indigo-500/5' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                         >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${role === r.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                               <r.icon size={24} />
                            </div>
                            <div>
                               <p className={`text-sm font-black italic tracking-tight ${role === r.id ? 'text-indigo-900' : 'text-slate-900'}`}>{r.title}</p>
                               <p className="text-[10px] font-bold text-slate-400 tracking-tight">{r.desc}</p>
                            </div>
                         </button>
                       ))}
                    </div>
                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[11px] tracking-[0.3em] italic flex items-center justify-center gap-3 shadow-2xl hover:bg-black transition-all group"
                    >
                      Configure Identity <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 italic">Full Name</label>
                          <div className="relative group">
                             <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
                             <input 
                               type="text" 
                               required
                               placeholder="Identity Name"
                               className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white text-sm font-bold transition-all"
                             />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 italic">Phone Number</label>
                          <div className="relative group">
                             <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
                             <input 
                               type="tel" 
                               required
                               placeholder="91+ 0000 000 000"
                               className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white text-sm font-bold transition-all"
                             />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 italic">Secure Email</label>
                       <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
                          <input 
                            type="email" 
                            required
                            placeholder="node@adskysolution.com"
                            className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white text-sm font-bold transition-all"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 italic">Keyphrase (Password)</label>
                       <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
                          <input 
                            type="password" 
                            required
                            placeholder="••••••••"
                            className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white text-sm font-bold transition-all"
                          />
                       </div>
                    </div>

                    <div className="pt-6 flex gap-4">
                       <button 
                         type="button"
                         onClick={() => setStep(1)}
                         className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 transition-all border border-slate-100"
                       >
                         Back
                       </button>
                       <button 
                         type="submit"
                         className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] italic flex items-center justify-center gap-3 shadow-xl hover:bg-black transition-all"
                       >
                         Initialize Node <UserPlus size={18} />
                       </button>
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

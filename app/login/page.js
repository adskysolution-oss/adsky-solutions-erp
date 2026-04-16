'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  Zap,
  Globe,
  LayoutDashboard,
  Shield,
  Fingerprint
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        document.cookie = `token=${data.token}; path=/`;
        router.push(data.redirectUrl || '/admin');
      } else {
        alert(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-gradient-vibrant flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 via-rose-500/10 to-amber-500/10 rounded-full blur-[120px] opacity-60 animate-pulse" />

      <div className="w-full max-w-lg z-10">
        {/* Modern Brand Identity */}
        <div className="text-center mb-12">
           <motion.div 
             initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
             animate={{ scale: 1, rotate: 0, opacity: 1 }}
             transition={{ type: 'spring', stiffness: 200, damping: 20 }}
             className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl glow-indigo mx-auto mb-8 relative group"
           >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-rose-500 opacity-20 group-hover:opacity-40 transition-opacity rounded-[2.5rem]" />
              <ShieldCheck size={44} className="relative z-10" />
           </motion.div>
           
           <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic mb-3 leading-none">
              AdSky <span className="text-gradient-vibrant">25X</span>
           </h1>
           <p className="text-[11px] font-black uppercase text-indigo-600 tracking-[0.4em] bg-indigo-50/50 w-fit mx-auto px-6 py-1.5 rounded-full border border-indigo-100 italic">
              Production Access Gateway
           </p>
        </div>

        {/* Crystalline Access Card */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card bg-white/70 rounded-[4rem] p-12 shadow-[0_40px_100px_rgba(30,41,59,0.1)] border-white/60 relative overflow-hidden"
        >
           <form onSubmit={handleLogin} className="space-y-10">
              <div className="space-y-3">
                 <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] ml-4 italic flex items-center gap-2">
                    <Fingerprint size={12} className="text-indigo-400" /> Secure Identity
                 </label>
                 <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={22} />
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter Access Email"
                      className="w-full py-6 pl-16 pr-8 bg-white/50 border border-white/40 rounded-[2rem] outline-none focus:border-indigo-500/50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-900 font-black text-lg shadow-inner"
                    />
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] ml-4 italic flex items-center gap-2">
                    <Shield size={12} className="text-rose-400" /> Access Key
                 </label>
                 <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors" size={22} />
                    <input 
                      required
                      type="password" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full py-6 pl-16 pr-8 bg-white/50 border border-white/40 rounded-[2rem] outline-none focus:border-rose-500/50 focus:bg-white focus:ring-4 focus:ring-rose-500/5 transition-all text-slate-900 font-black text-lg shadow-inner"
                    />
                 </div>
              </div>

              <button 
                disabled={loading}
                type="submit"
                className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest rounded-[2rem] transition-all shadow-2xl shadow-indigo-500/20 flex items-center justify-center gap-4 active:scale-[0.97] relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-4">
                    {loading ? <Loader2 className="animate-spin" size={24} /> : (
                      <>
                        Initialize Pulse Session
                        <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                </span>
              </button>
           </form>

           <div className="mt-12 pt-10 border-t border-white/40 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <span className="flex items-center gap-3"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" /> SECURE TUNNEL</span>
              <span className="flex items-center gap-3"><Zap size={14} className="text-indigo-400" /> NODE_v22.4</span>
           </div>
        </motion.div>

        {/* Security Notice */}
        <div className="mt-12 text-center">
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] italic opacity-50 flex items-center justify-center gap-4">
             <div className="h-px w-8 bg-slate-300" /> 
             Enterprise Encryption Active
             <div className="h-px w-8 bg-slate-300" />
           </p>
        </div>
      </div>
    </div>
  );
}

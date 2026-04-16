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
  LayoutDashboard
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
        // Simple cookie set for demo (middleware should handle real logic)
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-600/5 rounded-full blur-[100px] -ml-44 -mt-44" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px] -mr-44 -mb-44" />

      <div className="w-full max-w-md z-10">
        {/* Brand Header */}
        <div className="text-center mb-10">
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="w-20 h-20 bg-sky-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black italic shadow-2xl shadow-sky-200 mx-auto mb-6"
           >
             AS
           </motion.div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic mb-2">AdSky <span className="text-sky-600">ERP</span></h1>
           <p className="text-slate-500 text-sm font-medium">Production Access Gateway</p>
        </div>

        {/* Login Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50"
        >
           <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Secure Identity</label>
                 <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={20} />
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Access Email"
                      className="w-full py-5 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-sky-500/50 focus:bg-white transition-all text-slate-900 font-bold"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Access Key</label>
                 <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={20} />
                    <input 
                      required
                      type="password" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full py-5 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-sky-500/50 focus:bg-white transition-all text-slate-900 font-bold"
                    />
                 </div>
              </div>

              <button 
                disabled={loading}
                type="submit"
                className="w-full py-5 bg-sky-600 hover:bg-sky-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-sky-200 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : (
                  <>
                    Initialize Session
                    <ArrowRight size={22} className="opacity-70" />
                  </>
                )}
              </button>
           </form>

           <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500" /> SSL Active</span>
              <span className="flex items-center gap-2"><Zap size={14} className="text-sky-500" /> Node JS 20+</span>
           </div>
        </motion.div>

        {/* Support Section */}
        <div className="mt-10 text-center space-y-4">
           <p className="text-slate-400 text-xs font-medium italic opacity-60 leading-relaxed">
             Authorized personnel only. All access is monitored and encrypted.<br/>
             Contact: IT Support for credential recovery.
           </p>
        </div>
      </div>
    </div>
  );
}

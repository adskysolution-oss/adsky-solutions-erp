'use client';

import React, { useState } from 'react';
import { Shield, Key, Save, RefreshCw, AlertCircle, CheckCircle2, Globe, Database, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CashfreeSettings() {
  const [config, setConfig] = useState({
    cashfreeAppId: '',
    cashfreeSecretKey: '',
    isLive: false,
    status: 'connecting'
  });

  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/admin/config');
      const data = await res.json();
      setConfig({
        cashfreeAppId: data.cashfreeAppId || '',
        cashfreeSecretKey: data.cashfreeSecretKey || '',
        isLive: data.isLive || false,
        status: 'connected'
      });
    } catch (err) {
      console.error('Config fetch error:', err);
      setConfig(prev => ({ ...prev, status: 'error' }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
       await fetch('/api/admin/config', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            cashfreeAppId: config.cashfreeAppId,
            cashfreeSecretKey: config.cashfreeSecretKey,
            isLive: config.isLive
         })
       });
       alert('Cashfree Protocols Synchronized.');
       fetchConfig();
    } catch (err) {
       console.error('Save error:', err);
    } finally {
       setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-32 pt-4 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">
              Payment Hub <span className="text-vibrant-indigo">Gateway</span>
           </h1>
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Cashfree API & Environment Configuration</p>
        </div>
        <div className={`flex items-center gap-2 px-6 py-2 rounded-full border ${config.status === 'connected' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
           <div className={`w-2 h-2 rounded-full ${config.status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
           <span className="text-[10px] font-black uppercase tracking-widest italic">{config.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="p-10 glass-card rounded-[3.5rem] shadow-xl border-white/60 space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-16 -mt-16" />
               
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                     <Key size={22} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 italic tracking-tight">API Credentials</h3>
               </div>

               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 italic">App ID (Client ID)</label>
                     <input 
                        type="text" 
                        value={config.cashfreeAppId}
                        onChange={(e) => setConfig({...config, cashfreeAppId: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white text-sm font-mono font-bold transition-all"
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 italic">Secret Key</label>
                     <input 
                        type="password" 
                        value={config.cashfreeSecretKey}
                        onChange={(e) => setConfig({...config, cashfreeSecretKey: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white text-sm font-mono font-bold transition-all"
                     />
                     <p className="text-[9px] text-slate-400 font-bold mt-2 ml-1">Do not share your secret key. Keys are encrypted at rest.</p>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 italic">Environment</label>
                     <div className="flex gap-4">
                        {[
                          { id: false, label: 'sandbox' },
                          { id: true, label: 'production' }
                        ].map((env) => (
                          <button 
                            key={env.label}
                            onClick={() => setConfig({...config, isLive: env.id})}
                            className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest italic border transition-all ${config.isLive === env.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-200'}`}
                          >
                             {env.label}
                          </button>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="pt-8 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-3 px-10 py-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50"
                  >
                     {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                     <span className="text-xs font-black uppercase tracking-widest italic">Sync Credentials</span>
                  </button>
               </div>
            </div>

            <div className="p-10 bg-slate-900 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-all duration-1000" />
               <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
                     <Globe size={28} className="text-indigo-400" />
                  </div>
                  <div>
                     <h4 className="text-lg font-black italic tracking-tight mb-1">Webhook Configuration</h4>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">https://api.adskysolution.com/api/webhooks/cashfree</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="p-8 glass-card rounded-[3rem] shadow-lg border-white/60">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Payment Status</h4>
               <div className="space-y-5">
                  {[
                    { label: 'Active Settlements', value: 'Live', icon: CheckCircle2, color: 'text-emerald-500' },
                    { label: 'Gateway Latency', value: '42ms', icon: CreditCard, color: 'text-indigo-500' },
                    { label: 'Pending Refunds', value: '0', icon: AlertCircle, color: 'text-slate-400' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <item.icon size={16} className={item.color} />
                          <span className="text-[11px] font-black italic text-slate-900">{item.label}</span>
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{item.value}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-8 glass-card rounded-[3rem] shadow-lg border-white/60 bg-gradient-to-br from-indigo-50 to-transparent">
               <div className="flex items-center gap-4 mb-6">
                  <Shield className="text-indigo-600" size={24} />
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-950">Security Protocol</h4>
               </div>
               <p className="text-[10px] text-indigo-950/60 font-medium leading-relaxed italic">
                  Credentials are stored using AES-256 encryption. Changing keys will invalidate existing session signatures for active checkouts. 
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}

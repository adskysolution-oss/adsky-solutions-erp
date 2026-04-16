'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  IndianRupee, 
  Percent, 
  ShieldCheck, 
  CreditCard, 
  Briefcase,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Zap,
  Lock,
  Globe,
  Palette,
  LayoutDashboard,
  Monitor,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeArchitect from './ThemeArchitect';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('branding'); // branding, commission, gateway
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [config, setConfig] = useState({
    applicationFee: 249,
    partnerCommission: 30,
    employeeCommission: 50,
    cashfreeAppId: '',
    cashfreeSecretKey: '',
    logo: '',
    isLive: false
  });

  useEffect(() => {
    fetch('/api/admin/config')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setConfig(data);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10 pb-32 font-sans">
      {/* Dynamic Header */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] -mr-32 -mt-32" />
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-sky-200">
             <Settings size={32} />
           </div>
           <div>
             <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">System <span className="text-sky-600">Architect</span></h1>
             <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest text-[9px] font-black">25X Enterprise Configuration</p>
           </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex bg-slate-50 p-2 rounded-2xl border border-slate-100 relative z-10">
           {[
             { id: 'branding', label: 'Theme & Brand', icon: Palette },
             { id: 'commission', label: 'Commissions', icon: Percent },
             { id: 'gateway', label: 'Payments', icon: CreditCard }
           ].map(tab => (
             <button 
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-white shadow-lg text-sky-600 border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
             >
                <tab.icon size={14} /> {tab.label}
             </button>
           ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'branding' && (
           <motion.div 
             key="branding" 
             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
             className="space-y-10"
           >
              <ThemeArchitect />
              
              {/* Logo Upload Section */}
              <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm relative overflow-hidden">
                 <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-sky-600 pl-4 mb-10 italic">Assets & Media</h3>
                 <div className="flex items-center gap-10">
                    <div className="w-40 h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex items-center justify-center relative group overflow-hidden">
                       {config.logo ? (
                         <img src={config.logo} alt="Logo" className="w-full h-full object-contain p-6" />
                       ) : (
                         <div className="text-slate-300 text-[10px] font-black uppercase text-center flex flex-col items-center gap-2 italic">
                            <Monitor size={32} className="opacity-20" /> Brand Identity
                         </div>
                       )}
                       <input 
                         type="file" 
                         className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                       />
                    </div>
                    <div className="max-w-md">
                       <p className="text-slate-900 font-black text-lg mb-2 italic">Primary Platform Logo</p>
                       <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest leading-relaxed">
                         This logo will appear on the global login page, partner portals, and generated invoices.
                       </p>
                       <button className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em]">Upload Replacement</button>
                    </div>
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'commission' && (
           <motion.div 
             key="commission"
             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           >
              <div className="lg:col-span-2 p-12 rounded-[3.5rem] bg-white border border-slate-100 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32" />
                 <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-emerald-500 pl-4 mb-12 italic relative z-10">Financial Distribution Engine</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {[
                      { key: 'partnerCommission', label: 'Master Partner Share', desc: 'Default % for regional hubs' },
                      { key: 'employeeCommission', label: 'Field Agent Share', desc: 'Commission per successful lead' },
                    ].map(item => (
                      <div key={item.key} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 italic">{item.label}</p>
                        <div className="flex items-center justify-between">
                           <div className="relative">
                              <span className="absolute left-0 bottom-0 text-3xl font-black text-slate-300">%</span>
                              <input 
                                type="number" 
                                value={config[item.key]}
                                onChange={e => setConfig({...config, [item.key]: e.target.value})}
                                className="bg-transparent text-5xl font-black text-slate-900 w-full pl-6 outline-none italic tracking-tighter"
                              />
                           </div>
                           <Percent size={32} className="text-emerald-500 opacity-20" />
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 mt-4 uppercase italic">{item.desc}</p>
                      </div>
                    ))}
                 </div>
                 
                 <div className="mt-12 flex justify-end">
                    <button onClick={handleSave} className="flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all active:scale-[0.98]">
                       Commit Rules <ArrowRight size={18} />
                    </button>
                 </div>
              </div>

              <div className="p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl h-fit">
                 <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-8 italic flex items-center gap-2">
                   <Zap size={14} /> Settlement AI
                 </h3>
                 <p className="text-xs font-medium text-slate-400 leading-relaxed mb-8">
                   Commissions are calculated in real-time. When a farmer makes a payment of <span className="text-white">₹{config.applicationFee}</span>, the platform automates the split instantly.
                 </p>
                 <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex justify-between text-[10px] uppercase font-black">
                       <span className="text-slate-500">Partner Calc</span>
                       <span>₹{(config.applicationFee * (config.partnerCommission/100)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase font-black">
                       <span className="text-slate-500">Agent Calc</span>
                       <span>₹{config.employeeCommission}</span>
                    </div>
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'gateway' && (
           <motion.div 
             key="gateway"
             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
             className="max-w-4xl"
           >
              <div className="p-12 rounded-[3.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-[120px] -mr-40 -mt-40" />
                 <h3 className="text-xl font-black italic tracking-tighter mb-12 flex items-center gap-4">
                    Cashfree <span className="text-sky-400 underline decoration-sky-500 decoration-2 underline-offset-8">Liquidity Node</span>
                 </h3>
                 
                 <div className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 italic">Environment Key (App ID)</label>
                          <div className="relative">
                             <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={20} />
                             <input 
                               type="text" 
                               value={config.cashfreeAppId}
                               onChange={e => setConfig({...config, cashfreeAppId: e.target.value})}
                               className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-16 pr-8 text-sm font-mono outline-none focus:border-sky-500/50 transition-all"
                               placeholder="cf_app_prod_..."
                             />
                          </div>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 italic">Security Secret</label>
                          <div className="relative">
                             <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={20} />
                             <input 
                               type="password" 
                               value={config.cashfreeSecretKey}
                               onChange={e => setConfig({...config, cashfreeSecretKey: e.target.value})}
                               className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-16 pr-8 text-sm outline-none focus:border-sky-500/50 transition-all font-mono"
                               placeholder="••••••••••••••••"
                             />
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center justify-between p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                       <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${config.isLive ? 'bg-emerald-500 shadow-glow text-white' : 'bg-slate-700 text-slate-400'}`}>
                             <Globe size={24} />
                          </div>
                          <div>
                             <p className="text-xs font-black italic">Live Production Protocol</p>
                             <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mt-0.5">Automated Settlements Enabled</p>
                          </div>
                       </div>
                       <button 
                         onClick={() => setConfig({...config, isLive: !config.isLive})}
                         className={`w-16 h-8 rounded-full transition-all relative ${config.isLive ? 'bg-emerald-500 shadow-glow' : 'bg-slate-700'}`}
                       >
                          <motion.div 
                            layout
                            className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-xl ${config.isLive ? 'right-1' : 'left-1'}`} 
                          />
                       </button>
                    </div>
                 </div>
                 
                 <div className="mt-12 pt-10 border-t border-white/5 flex justify-end">
                    <button onClick={handleSave} className="px-12 py-5 bg-sky-600 hover:bg-sky-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-sky-500/20 transition-all active:scale-[0.98]">
                       Lock Production Keys
                    </button>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}

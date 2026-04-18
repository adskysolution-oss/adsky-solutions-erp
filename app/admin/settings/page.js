'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('branding');
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
    <div className="space-y-12">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
              <SettingsIcon size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#38bdf8] italic">System Configuration</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Settings Hub.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Configure global parameters, commission structures, and deployment state.</p>
        </div>

        <div className="flex bg-[#111827] p-1.5 rounded-2xl border border-[#1f2937]">
          {[
            { id: 'branding', icon: Palette, label: 'Identity' },
            { id: 'commission', icon: Percent, label: 'Finance' },
            { id: 'gateway', icon: CreditCard, label: 'Gateways' },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all ${activeTab === tab.id ? 'bg-[#38bdf8] text-[#0b1220] shadow-lg shadow-[#38bdf8]/20' : 'text-[#6b7280] hover:text-[#f3f4f6]'}`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === 'branding' && (
          <motion.div 
            key="branding" 
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-10"
          >
            <div className="p-12 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-80 h-80 bg-[#38bdf8]/5 rounded-full blur-[100px]"></div>
               <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-10 flex items-center gap-4">
                  <Palette size={24} className="text-[#38bdf8]" /> Visual Identity
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                     <p className="text-slate-400 font-medium italic">Upload your platform logo. This will be visible on all administrative and public portals.</p>
                     <div className="w-full aspect-video bg-[#0b1220] border-2 border-dashed border-[#1f2937] rounded-[2.5rem] flex flex-col items-center justify-center relative group cursor-pointer hover:border-[#38bdf8]/50 transition-all">
                        {config.logo ? (
                          <img src={config.logo} alt="Logo" className="max-h-24 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <div className="text-center space-y-3">
                             <Monitor size={48} className="mx-auto text-[#1f2937] group-hover:text-[#38bdf8]/20" />
                             <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic">Drop logo here</p>
                          </div>
                        )}
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div>
                        <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest mb-3 block italic pl-1">Site Title</label>
                        <input type="text" className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl p-4 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all" value="ADSKY Solution" />
                     </div>
                     <div>
                        <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest mb-3 block italic pl-1">Primary Accents</label>
                        <div className="flex gap-4">
                           {['#38bdf8', '#6366f1', '#ef4444', '#22c55e'].map(c => (
                             <div key={c} className="w-12 h-12 rounded-xl border border-[#1f2937] cursor-pointer hover:scale-110 transition-transform shadow-lg" style={{ backgroundColor: c }}></div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'commission' && (
          <motion.div 
            key="commission"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
             <div className="p-12 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] relative overflow-hidden">
                <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-10 flex items-center gap-4">
                  <Percent size={24} className="text-[#22c55e]" /> Commission Engine
                </h3>
                <div className="space-y-8">
                   {[
                     { key: 'applicationFee', label: 'PLATFORM ACCESS FEE', icon: IndianRupee },
                     { key: 'partnerCommission', label: 'PARTNER REVENUE SHARE (%)', icon: Percent },
                     { key: 'employeeCommission', label: 'AGENT COMMISSION (₹)', icon: Briefcase },
                   ].map(item => (
                     <div key={item.key} className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic pl-1">{item.label}</label>
                        <div className="relative group">
                           <item.icon size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6b7280] group-focus-within:text-[#38bdf8] transition-colors" />
                           <input 
                              type="number"
                              value={config[item.key]}
                              onChange={e => setConfig({...config, [item.key]: e.target.value})}
                              className="w-full bg-[#0b1220] border border-[#1f2937] rounded-3xl py-5 pl-14 pr-6 text-2xl font-black text-[#f3f4f6] italic outline-none focus:border-[#38bdf8] transition-all"
                           />
                        </div>
                     </div>
                   ))}
                </div>
                <button onClick={handleSave} className="mt-10 w-full py-5 bg-[#38bdf8] text-[#0b1220] rounded-[2.5rem] font-black italic shadow-2xl hover:scale-[1.02] transition-all">
                  SAVE FINANCIAL PROTOCOLS
                </button>
             </div>

             <div className="p-12 bg-gradient-to-br from-[#111827] to-[#0b1220] border border-[#1f2937] rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-8 group">
                <div className="w-24 h-24 bg-[#38bdf8]/10 rounded-3xl flex items-center justify-center text-[#38bdf8] mb-2 group-hover:scale-110 transition-transform">
                   <Zap size={48} />
                </div>
                <h3 className="text-4xl font-black text-[#f3f4f6] italic leading-tight">Simulation <br /> Engine.</h3>
                <p className="text-[#9ca3af] font-medium italic max-w-xs">Run a stress-test simulation against current commission rates to predict quarterly platform growth.</p>
                <button className="px-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] italic text-[#f3f4f6] hover:bg-white/10 transition-all">Initialize Test</button>
             </div>
          </motion.div>
        )}

        {activeTab === 'gateway' && (
          <motion.div 
            key="gateway"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-8"
          >
             <div className="p-12 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#38bdf8]/5 rounded-full blur-[120px]"></div>
                <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-12 flex items-center gap-4">
                  <CreditCard size={28} className="text-[#38bdf8]" /> Payment Gateway Node
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic pl-1">Cashfree App ID</label>
                      <div className="relative group">
                         <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1f2937] group-focus-within:text-[#38bdf8] transition-colors" />
                         <input 
                           type="text" 
                           value={config.cashfreeAppId}
                           onChange={e => setConfig({...config, cashfreeAppId: e.target.value})}
                           className="w-full bg-[#0b1220] border border-[#1f2937] rounded-3xl py-5 pl-14 pr-6 text-[13px] font-mono text-[#f3f4f6] outline-none focus:border-[#38bdf8] transition-all"
                         />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic pl-1">Secret Key</label>
                      <div className="relative group">
                         <ShieldCheck size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1f2937] group-focus-within:text-[#38bdf8] transition-colors" />
                         <input 
                           type="password" 
                           value={config.cashfreeSecretKey}
                           onChange={e => setConfig({...config, cashfreeSecretKey: e.target.value})}
                           className="w-full bg-[#0b1220] border border-[#1f2937] rounded-3xl py-5 pl-14 pr-6 text-[13px] font-mono text-[#f3f4f6] outline-none focus:border-[#38bdf8] transition-all"
                         />
                      </div>
                   </div>
                </div>

                <div className="mt-12 p-8 bg-[#0b1220] border border-[#1f2937] rounded-[2.5rem] flex items-center justify-between group-hover:border-[#38bdf8]/20 transition-all">
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${config.isLive ? 'bg-[#22c55e] text-[#0b1220] shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-[#1f2937] text-[#6b7280]'}`}>
                         <Globe size={24} />
                      </div>
                      <div>
                         <p className="text-[13px] font-black text-[#f3f4f6] italic">Live Production Node</p>
                         <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest mt-0.5">{config.isLive ? 'SYSTEM IS LIVE' : 'SYSTEM IS IN SANDBOX'}</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => setConfig({...config, isLive: !config.isLive})}
                     className={`w-14 h-8 rounded-full transition-all relative ${config.isLive ? 'bg-[#22c55e]' : 'bg-[#1f2937]'}`}
                   >
                      <motion.div 
                        layout
                        className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-xl ${config.isLive ? 'right-1' : 'left-1'}`} 
                      />
                   </button>
                </div>

                <button onClick={handleSave} className="mt-12 w-full py-5 bg-[#38bdf8] text-[#0b1220] rounded-[2.5rem] font-black italic shadow-2xl hover:scale-[1.02] transition-all">
                  COMMIT GATEWAY CONFIGURATION
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      {success && (
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-10 right-10 bg-[#22c55e] text-[#0b1220] px-8 py-4 rounded-2xl font-black italic shadow-2xl flex items-center gap-3 z-[100]"
        >
          <CheckCircle2 size={24} /> CONFIGURATION UPDATED SUCCESSFULLY
        </motion.div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { 
  Palette, 
  Save, 
  RefreshCw, 
  ShieldCheck, 
  Zap, 
  Monitor, 
  Layout, 
  CheckCircle2,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeArchitect() {
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState({
    primary: '#2563EB',
    secondary: '#F97316',
    success: '#22C55E',
    danger: '#EF4444',
    warning: '#FACC15',
    dark: '#0F172A',
    light: '#F8FAFC',
    radius: 1.5
  });

  const handleUpdate = (key, value) => {
    setTheme({ ...theme, [key]: value });
    // In a real implementation, this would inject variables into the :root dynamically for preview
    const root = document.documentElement;
    if (key !== 'radius') {
       // Mock HEX to RGB for preview
       root.style.setProperty(`--${key}`, '37 99 235'); // Simplified for now
    } else {
       root.style.setProperty('--radius', `${value}rem`);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    // Mock API call to PostgreSQL WebsiteConfig -> themeConfig
    setTimeout(() => {
      setSaving(false);
      alert('Global Branding Tokens Committed to PostgreSQL');
    }, 1200);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-black text-slate-900 italic tracking-tighter">Global <span className="text-sky-600">Architect</span></h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1 italic">White-Label Branding Engine</p>
         </div>
         <button 
           onClick={handleSave}
           className="px-8 py-3 bg-sky-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-sky-200 flex items-center gap-2 transition-all active:scale-[0.98]"
         >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Commit Configuration
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Main Palette Control */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-xl shadow-slate-200/20">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-sky-600 pl-4 italic">Core Identity</h3>
                     <div className="space-y-4">
                        {[
                          { id: 'primary', label: 'Primary Brand Color', value: theme.primary },
                          { id: 'secondary', label: 'Secondary Accent', value: theme.secondary },
                        ].map(item => (
                          <div key={item.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group">
                             <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{item.label}</p>
                                <p className="text-xs font-mono text-slate-900 font-bold">{item.value}</p>
                             </div>
                             <input 
                               type="color" 
                               value={item.value}
                               onChange={(e) => handleUpdate(item.id, e.target.value)}
                               className="w-12 h-12 rounded-xl border-none cursor-pointer bg-transparent"
                             />
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-6">
                     <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-emerald-500 pl-4 italic">Semantic Feedback</h3>
                     <div className="space-y-4">
                        {[
                          { id: 'success', label: 'Success State', value: theme.success },
                          { id: 'danger', label: 'Critical / Error', value: theme.danger },
                        ].map(item => (
                          <div key={item.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group">
                             <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{item.label}</p>
                                <p className="text-xs font-mono text-slate-900 font-bold">{item.value}</p>
                             </div>
                             <input 
                               type="color" 
                               value={item.value}
                               onChange={(e) => handleUpdate(item.id, e.target.value)}
                               className="w-12 h-12 rounded-xl border-none cursor-pointer bg-transparent"
                             />
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="mt-10 pt-10 border-t border-slate-50">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 italic">Structural Aesthetics</h3>
                  <div className="space-y-6">
                     <div className="flex items-center justify-between px-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Corner Radius (px)</label>
                        <span className="text-xs font-black text-sky-600">{theme.radius}rem</span>
                     </div>
                     <input 
                       type="range" min="0" max="3" step="0.1" 
                       value={theme.radius}
                       onChange={(e) => handleUpdate('radius', e.target.value)}
                       className="w-full accent-sky-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer" 
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* Preview / Compliance */}
         <div className="space-y-8">
            <div className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl -mr-16 -mt-16" />
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8 flex items-center gap-2">
                 <Monitor size={14} className="text-sky-400" /> Preview Artifact
               </h3>
               
               <div className="space-y-6">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center">
                           <Zap size={20} />
                        </div>
                        <div>
                           <p className="text-xs font-black italic">Platform Core</p>
                           <p className="text-[9px] text-slate-500 uppercase tracking-widest">v2.0 Handover</p>
                        </div>
                     </div>
                     <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all">
                        Active CTA Component
                     </button>
                  </div>

                  <div className="flex gap-2">
                     <div className="flex-1 h-12 bg-emerald-500 rounded-xl flex items-center justify-center"><CheckCircle2 size={18} /></div>
                     <div className="flex-1 h-12 bg-rose-500 rounded-xl flex items-center justify-center"><ShieldCheck size={18} /></div>
                     <div className="flex-1 h-12 bg-orange-500 rounded-xl flex items-center justify-center"><RefreshCw size={18} /></div>
                  </div>
               </div>
            </div>

            <div className="p-8 bg-sky-50 border border-sky-100 rounded-[2.5rem]">
               <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-sky-600 shadow-sm">
                     <Layout size={20} />
                  </div>
                  <div>
                     <p className="text-[11px] font-black text-sky-900 italic tracking-tight mb-1">Architecture Note</p>
                     <p className="text-[10px] text-sky-700 leading-relaxed font-medium">
                       CSS Variables are synced across all panels (Admin/Partner/Agent) instantly after commit.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

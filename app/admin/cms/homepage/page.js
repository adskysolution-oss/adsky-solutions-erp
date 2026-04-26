'use client';

import React, { useState, useEffect } from 'react';
import { Save, Layout, Trophy, MapPin, Globe, Sparkles, Image as ImageIcon, Plus, Trash2, Rocket, Briefcase, MessageSquare, BookOpen, Layers, Upload, Check } from 'lucide-react';

export default function HomepageManager() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/public/config').then(res => res.json()).then(data => {
      setConfig(data || { homepage: { hero: { slides: [] }, stats: [], offerings: { items: [] }, strategy: {}, jobs: { categories: [] }, howItWorks: [], testimonials: [], blogs: [], cta: {} } });
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      alert('WEBSITE UPDATED & LIVE! 🚀');
    } catch (err) { alert('Save Failed'); }
    setSaving(false);
  };

  const handleUpload = async (file, path) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        // Deep update helper
        const newConfig = { ...config };
        let current = newConfig;
        const keys = path.split('.');
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = data.url;
        setConfig(newConfig);
      }
    } catch (err) { alert('Upload failed'); }
  };

  if (loading) return <div className="p-20 text-white font-black italic">Synchronizing...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-16 pb-60">
      {/* PERSISTENT HEADER WITH SAVE BUTTON */}
      <div className="flex justify-between items-center bg-[#1e293b] p-10 rounded-[3rem] border border-white/5 backdrop-blur-3xl shadow-2xl sticky top-8 z-[100]">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center"><Globe className="text-white" /></div>
           <div>
              <h1 className="text-4xl font-black text-white italic tracking-tighter">Master Architect</h1>
              <p className="text-slate-400 mt-1 font-medium italic">Manage Content & Visuals</p>
           </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 px-14 py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-[2rem] transition-all shadow-2xl shadow-emerald-600/40 transform hover:-translate-y-1 animate-pulse"
        >
          {saving ? 'Syncing...' : <><Save size={28} /> SAVE & GO LIVE</>}
        </button>
      </div>

      <div className="space-y-20">
        
        {/* HERO SECTION */}
        <SectionWrapper title="Hero Slider (Visuals & Text)" icon={Layout} color="blue">
           <div className="space-y-12">
              {config.homepage.hero.slides.map((slide, i) => (
                <div key={i} className="p-10 bg-[#0f172a] rounded-[4rem] border border-white/5 space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 ml-4">Slide Heading</label>
                            <textarea value={slide.title} onChange={e => {
                              const s = [...config.homepage.hero.slides]; s[i].title = e.target.value;
                              setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, slides: s}}});
                            }} className="w-full bg-[#1e293b] border border-white/10 rounded-3xl p-6 text-white text-3xl font-black italic outline-none" />
                         </div>
                         <ImageUploader 
                           label="Slide Background Image" 
                           currentUrl={slide.image} 
                           onUpload={(file) => handleUpload(file, `homepage.hero.slides.${i}.image`)} 
                         />
                      </div>
                      <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                         <img src={slide.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </SectionWrapper>

        {/* STRATEGY SECTION */}
        <SectionWrapper title="Strategy Section (Earth Visual)" icon={Rocket} color="purple">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-10 bg-[#0f172a] rounded-[4rem] items-center">
              <div className="space-y-6">
                 <textarea value={config.homepage.strategy.title} onChange={e => setConfig({...config, homepage: {...config.homepage, strategy: {...config.homepage.strategy, title: e.target.value}}})} className="w-full bg-[#1e293b] border border-white/10 rounded-3xl p-8 text-white text-4xl font-black italic outline-none" />
                 <ImageUploader 
                   label="Strategy Visual Image" 
                   currentUrl={config.homepage.strategy.image} 
                   onUpload={(file) => handleUpload(file, `homepage.strategy.image`)} 
                 />
              </div>
              <img src={config.homepage.strategy.image} className="w-full aspect-[4/5] rounded-[4rem] object-cover border-8 border-white/5 shadow-2xl" />
           </div>
        </SectionWrapper>

      </div>
    </div>
  );
}

function ImageUploader({ label, currentUrl, onUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    await onUpload(file);
    setUploading(false);
  };

  return (
    <div className="space-y-4">
       <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">{label}</label>
       <div className="flex flex-col gap-4 p-6 bg-[#1e293b] rounded-3xl border border-white/10 border-dashed hover:border-blue-500/50 transition-all group">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                   {uploading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Upload size={24} />}
                </div>
                <div>
                   <p className="text-white font-black italic text-sm">{uploading ? 'Uploading Image...' : 'Select File'}</p>
                   <p className="text-white/30 text-[10px] font-medium italic">JPG, PNG or WEBP (Max 5MB)</p>
                </div>
             </div>
             <input 
               type="file" 
               onChange={handleFileChange} 
               className="absolute inset-0 opacity-0 cursor-pointer z-10" 
               accept="image/*"
             />
          </div>
          {currentUrl && (
            <div className="flex items-center gap-2 bg-emerald-500/10 p-2 px-4 rounded-xl border border-emerald-500/20">
               <Check size={14} className="text-emerald-400" />
               <span className="text-[10px] text-emerald-400 font-bold italic truncate max-w-[200px]">{currentUrl}</span>
            </div>
          )}
       </div>
    </div>
  );
}

function SectionWrapper({ title, icon: Icon, color, children }) {
  const colors = {
    blue: 'text-blue-400 bg-blue-400/10',
    purple: 'text-purple-400 bg-purple-400/10'
  };

  return (
    <div className="bg-[#1e293b] p-12 rounded-[5rem] border border-white/5 space-y-12 shadow-2xl relative">
      <div className="flex items-center gap-6 border-b border-white/5 pb-10">
         <div className={`p-5 rounded-3xl ${colors[color]}`}>
            <Icon size={36} />
         </div>
         <h2 className="text-5xl font-black text-white italic tracking-tighter">{title}</h2>
      </div>
      {children}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Image as ImageIcon, Layout, Type, Plus, Trash2 } from 'lucide-react';

export default function HomepageManager() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/public/config')
      .then(res => res.json())
      .then(data => {
        setConfig(data || { homepage: { hero: {}, stats: [] } });
        setLoading(false);
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
      if (res.ok) alert('Homepage Updated Successfully!');
    } catch (err) {
      alert('Failed to save changes');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-10 text-white">Loading Live Content...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <div className="flex justify-between items-center bg-[#1e293b] p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
        <div>
          <h1 className="text-3xl font-black text-white italic">Homepage Architect</h1>
          <p className="text-slate-400 mt-2 font-medium italic">Manage live sections and premium content</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-600/20"
        >
          {saving ? 'Saving...' : <><Save size={20} /> Update Website</>}
        </button>
      </div>

      {/* --- HERO SECTION MANAGER --- */}
      <div className="bg-[#1e293b] p-10 rounded-[3rem] border border-white/5 space-y-8">
        <div className="flex items-center gap-4 text-blue-400 border-b border-white/5 pb-6">
          <Layout size={24} />
          <h2 className="text-2xl font-black italic">Hero Section (Live Preview Data)</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Main Title</label>
              <textarea 
                value={config.homepage?.hero?.title}
                onChange={e => setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, title: e.target.value}}})}
                className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-5 text-white font-bold italic focus:border-blue-500 outline-none min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Sub-headline</label>
              <textarea 
                value={config.homepage?.hero?.subtitle}
                onChange={e => setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, subtitle: e.target.value}}})}
                className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-5 text-white/70 italic focus:border-blue-500 outline-none min-h-[100px]"
              />
            </div>
          </div>
          
          <div className="space-y-6">
             <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Hero Image URL</label>
                <input 
                  type="text"
                  value={config.homepage?.hero?.image}
                  onChange={e => setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, image: e.target.value}}})}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-5 text-white italic focus:border-blue-500 outline-none"
                />
             </div>
             <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10">
                <img src={config.homepage?.hero?.image} alt="Hero Preview" className="object-cover w-full h-full brightness-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <p className="text-white font-black italic text-xl drop-shadow-2xl">{config.homepage?.hero?.title}</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* --- STATS MANAGER --- */}
      <div className="bg-[#1e293b] p-10 rounded-[3rem] border border-white/5 space-y-8">
        <div className="flex items-center gap-4 text-orange-400 border-b border-white/5 pb-6">
          <Plus size={24} />
          <h2 className="text-2xl font-black italic">Key Performance Metrics</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.homepage?.stats?.map((stat, i) => (
            <div key={i} className="bg-[#0f172a] p-6 rounded-3xl border border-white/5 relative group">
              <input 
                type="text"
                value={stat.value}
                onChange={e => {
                  const newStats = [...config.homepage.stats];
                  newStats[i].value = e.target.value;
                  setConfig({...config, homepage: {...config.homepage, stats: newStats}});
                }}
                className="w-full bg-transparent text-3xl font-black text-white italic outline-none mb-2"
                placeholder="Value (e.g. 10k+)"
              />
              <input 
                type="text"
                value={stat.label}
                onChange={e => {
                  const newStats = [...config.homepage.stats];
                  newStats[i].label = e.target.value;
                  setConfig({...config, homepage: {...config.homepage, stats: newStats}});
                }}
                className="w-full bg-transparent text-[10px] font-black uppercase text-slate-500 tracking-widest outline-none"
                placeholder="Label"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

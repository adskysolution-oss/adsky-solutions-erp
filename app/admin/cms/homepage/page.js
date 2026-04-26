'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Image as ImageIcon, Layout, Type, Plus, Trash2, Briefcase, MessageSquare, MapPin, Globe } from 'lucide-react';

export default function HomepageManager() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/public/config')
      .then(res => res.json())
      .then(data => {
        setConfig(data || { 
          homepage: { 
            hero: {}, 
            stats: [], 
            offerings: { items: [] }, 
            strategy: {},
            testimonials: [] 
          },
          footer: {} 
        });
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
      if (res.ok) alert('Website Updated Successfully!');
    } catch (err) {
      alert('Failed to save changes');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-10 text-white font-black italic">Syncing Live Website Content...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-40">
      {/* HEADER CONTROL */}
      <div className="flex justify-between items-center bg-[#1e293b] p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Globe className="text-white" size={32} />
           </div>
           <div>
              <h1 className="text-4xl font-black text-white italic tracking-tighter">Homepage Architect</h1>
              <p className="text-slate-400 mt-1 font-medium italic">Master control for adskysolution.com</p>
           </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-3xl transition-all shadow-xl shadow-blue-600/40 transform hover:-translate-y-1"
        >
          {saving ? 'Publishing...' : <><Save size={24} /> Publish Changes</>}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-12">
          
          {/* --- HERO SECTION --- */}
          <section className="bg-[#1e293b] p-10 rounded-[4rem] border border-white/5 space-y-8 shadow-xl">
            <div className="flex items-center gap-4 text-blue-400 border-b border-white/5 pb-6">
              <Layout size={28} />
              <h2 className="text-3xl font-black italic">Hero Section</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-4">Hero Heading</label>
                <textarea 
                  value={config.homepage?.hero?.title}
                  onChange={e => setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, title: e.target.value}}})}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-3xl p-6 text-white text-2xl font-black italic focus:border-blue-500 outline-none min-h-[150px] shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-4">Hero Subtitle</label>
                <textarea 
                  value={config.homepage?.hero?.subtitle}
                  onChange={e => setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, subtitle: e.target.value}}})}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-3xl p-6 text-white/60 font-medium italic focus:border-blue-500 outline-none min-h-[100px]"
                />
              </div>
            </div>
          </section>

          {/* --- OFFERINGS SECTION --- */}
          <section className="bg-[#1e293b] p-10 rounded-[4rem] border border-white/5 space-y-8 shadow-xl">
            <div className="flex items-center gap-4 text-emerald-400 border-b border-white/5 pb-6">
              <Briefcase size={28} />
              <h2 className="text-3xl font-black italic">Core Offerings</h2>
            </div>
            
            <div className="space-y-6">
               {config.homepage?.offerings?.items?.map((item, i) => (
                 <div key={i} className="p-8 bg-[#0f172a] rounded-[2.5rem] border border-white/5 space-y-4">
                    <input 
                      value={item.title}
                      onChange={e => {
                        const newItems = [...config.homepage.offerings.items];
                        newItems[i].title = e.target.value;
                        setConfig({...config, homepage: {...config.homepage, offerings: {...config.homepage.offerings, items: newItems}}});
                      }}
                      className="w-full bg-transparent text-2xl font-black text-white italic outline-none"
                      placeholder="Offering Title"
                    />
                    <textarea 
                      value={item.description}
                      onChange={e => {
                        const newItems = [...config.homepage.offerings.items];
                        newItems[i].description = e.target.value;
                        setConfig({...config, homepage: {...config.homepage, offerings: {...config.homepage.offerings, items: newItems}}});
                      }}
                      className="w-full bg-transparent text-white/50 font-medium italic outline-none min-h-[80px]"
                      placeholder="Description"
                    />
                 </div>
               ))}
            </div>
          </section>

        </div>

        {/* SIDEBAR: FOOTER & STATS */}
        <div className="space-y-12">
          {/* STATS */}
          <section className="bg-[#1e293b] p-10 rounded-[4rem] border border-white/5 space-y-8 shadow-xl">
            <div className="flex items-center gap-4 text-orange-400 border-b border-white/5 pb-6">
              <Trophy size={28} />
              <h2 className="text-2xl font-black italic">Live Stats</h2>
            </div>
            <div className="space-y-6">
              {config.homepage?.stats?.map((stat, i) => (
                <div key={i} className="p-6 bg-[#0f172a] rounded-3xl border border-white/5">
                   <input value={stat.value} className="bg-transparent text-3xl font-black text-white italic outline-none w-full" />
                   <input value={stat.label} className="bg-transparent text-[10px] font-black uppercase text-slate-500 tracking-widest outline-none w-full mt-1" />
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER SETTINGS */}
          <section className="bg-[#1e293b] p-10 rounded-[4rem] border border-white/5 space-y-8 shadow-xl">
            <div className="flex items-center gap-4 text-purple-400 border-b border-white/5 pb-6">
              <MapPin size={28} />
              <h2 className="text-2xl font-black italic">Footer Details</h2>
            </div>
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-4">Office Address</label>
                  <textarea className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-4 text-white italic outline-none" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-4">Contact Phone</label>
                  <input className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-4 text-white italic outline-none" />
               </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Save, Layout, Briefcase, Trophy, MapPin, Globe, Sparkles, MessageSquare, Rocket, BookOpen, Layers } from 'lucide-react';

export default function HomepageManager() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/public/config')
      .then(res => res.json())
      .then(data => {
        // FULL DATA MAPPING FROM LIVE SITE
        setConfig({
          homepage: {
            hero: data?.homepage?.hero || { title: "", subtitle: "", badge: "" },
            stats: data?.homepage?.stats || [{}, {}, {}, {}],
            offerings: data?.homepage?.offerings || { items: [{}, {}, {}] },
            strategy: data?.homepage?.strategy || { title: "", description: "", price: "" },
            testimonials: data?.homepage?.testimonials || [{}],
            howItWorks: data?.homepage?.howItWorks || [{}, {}, {}]
          },
          address: data?.address || "",
          contactPhone: data?.contactPhone || ""
        });
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
      alert('Website fully updated! 🚀');
    } catch (err) { alert('Update failed'); }
    setSaving(false);
  };

  if (loading) return <div className="p-20 text-white font-black italic animate-pulse">Establishing Full CMS Link...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-40">
      <div className="flex justify-between items-center bg-[#1e293b] p-10 rounded-[3rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
        <div className="flex items-center gap-6">
           <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-600/30">
              <Globe className="text-white" size={40} />
           </div>
           <div>
              <h1 className="text-5xl font-black text-white italic tracking-tighter">Homepage Architect</h1>
              <p className="text-slate-400 mt-1 font-medium italic">Master Control – Live Website Sync</p>
           </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-[2rem] transition-all shadow-2xl shadow-blue-600/40 transform hover:-translate-y-1"
        >
          {saving ? 'Syncing...' : <><Save size={28} /> Update Website</>}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        
        {/* HERO */}
        <section className="bg-[#1e293b] p-10 rounded-[3.5rem] border border-white/5 space-y-8">
          <div className="flex items-center gap-4 text-blue-400 border-b border-white/5 pb-6">
            <Layout size={32} />
            <h2 className="text-3xl font-black italic">Hero Section</h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-4">Main Heading</label>
              <textarea 
                value={config.homepage.hero.title}
                onChange={e => setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, title: e.target.value}}})}
                className="w-full bg-[#0f172a] border border-white/10 rounded-3xl p-6 text-white text-2xl font-black italic outline-none min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-4">Sub-headline</label>
              <textarea 
                value={config.homepage.hero.subtitle}
                onChange={e => setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, subtitle: e.target.value}}})}
                className="w-full bg-[#0f172a] border border-white/10 rounded-3xl p-6 text-white/60 font-medium italic outline-none min-h-[100px]"
              />
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-[#1e293b] p-10 rounded-[3.5rem] border border-white/5 space-y-8">
          <div className="flex items-center gap-4 text-orange-400 border-b border-white/5 pb-6">
            <Trophy size={32} />
            <h2 className="text-3xl font-black italic">Performance Stats</h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {config.homepage.stats.map((stat, i) => (
              <div key={i} className="p-6 bg-[#0f172a] rounded-[2rem] border border-white/5">
                <input 
                  value={stat.value}
                  onChange={e => {
                    const s = [...config.homepage.stats]; s[i].value = e.target.value;
                    setConfig({...config, homepage: {...config.homepage, stats: s}});
                  }}
                  className="bg-transparent text-3xl font-black text-white italic outline-none w-full"
                />
                <input 
                  value={stat.label}
                  onChange={e => {
                    const s = [...config.homepage.stats]; s[i].label = e.target.value;
                    setConfig({...config, homepage: {...config.homepage, stats: s}});
                  }}
                  className="bg-transparent text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] outline-none w-full mt-2"
                />
              </div>
            ))}
          </div>
        </section>

        {/* OFFERINGS */}
        <section className="bg-[#1e293b] p-10 rounded-[3.5rem] border border-white/5 space-y-8 xl:col-span-2">
          <div className="flex items-center gap-4 text-emerald-400 border-b border-white/5 pb-6">
            <Layers size={32} />
            <h2 className="text-3xl font-black italic">Core Offerings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.homepage.offerings.items.map((item, i) => (
              <div key={i} className="p-8 bg-[#0f172a] rounded-[2.5rem] border border-white/5 space-y-4">
                <input 
                  value={item.title}
                  onChange={e => {
                    const items = [...config.homepage.offerings.items]; items[i].title = e.target.value;
                    setConfig({...config, homepage: {...config.homepage, offerings: {...config.homepage.offerings, items}}});
                  }}
                  className="bg-transparent text-xl font-black text-white italic outline-none w-full"
                  placeholder="Offering Title"
                />
                <textarea 
                  value={item.description}
                  onChange={e => {
                    const items = [...config.homepage.offerings.items]; items[i].description = e.target.value;
                    setConfig({...config, homepage: {...config.homepage, offerings: {...config.homepage.offerings, items}}});
                  }}
                  className="bg-transparent text-white/50 text-sm font-medium italic outline-none w-full min-h-[80px]"
                  placeholder="Description"
                />
              </div>
            ))}
          </div>
        </section>

        {/* STRATEGY */}
        <section className="bg-[#1e293b] p-10 rounded-[3.5rem] border border-white/5 space-y-8">
          <div className="flex items-center gap-4 text-purple-400 border-b border-white/5 pb-6">
            <Rocket size={32} />
            <h2 className="text-3xl font-black italic">Strategy Section</h2>
          </div>
          <div className="space-y-6">
             <input 
               value={config.homepage.strategy.title}
               onChange={e => setConfig({...config, homepage: {...config.homepage, strategy: {...config.homepage.strategy, title: e.target.value}}})}
               className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-4 text-white font-black italic outline-none"
               placeholder="Strategy Heading"
             />
             <textarea 
               value={config.homepage.strategy.description}
               onChange={e => setConfig({...config, homepage: {...config.homepage, strategy: {...config.homepage.strategy, description: e.target.value}}})}
               className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-4 text-white/60 font-medium italic outline-none min-h-[100px]"
               placeholder="Description"
             />
             <div className="flex gap-4">
                <input 
                  value={config.homepage.strategy.price}
                  onChange={e => setConfig({...config, homepage: {...config.homepage, strategy: {...config.homepage.strategy, price: e.target.value}}})}
                  className="w-1/2 bg-[#0f172a] border border-white/10 rounded-2xl p-4 text-blue-400 font-black italic outline-none"
                  placeholder="Price (e.g. ₹999)"
                />
             </div>
          </div>
        </section>

        {/* CONTACT INFO */}
        <section className="bg-[#1e293b] p-10 rounded-[3.5rem] border border-white/5 space-y-8">
          <div className="flex items-center gap-4 text-rose-400 border-b border-white/5 pb-6">
            <MapPin size={32} />
            <h2 className="text-3xl font-black italic">Contact & Footer</h2>
          </div>
          <div className="space-y-6">
             <textarea 
               value={config.address}
               onChange={e => setConfig({...config, address: e.target.value})}
               className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-4 text-white italic outline-none min-h-[100px]"
               placeholder="Office Address"
             />
             <input 
               value={config.contactPhone}
               onChange={e => setConfig({...config, contactPhone: e.target.value})}
               className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-4 text-white italic outline-none"
               placeholder="Phone Number"
             />
          </div>
        </section>

      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Layout, Briefcase, Trophy, MapPin, Globe, Sparkles } from 'lucide-react';

export default function HomepageManager() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/public/config')
      .then(res => res.json())
      .then(data => {
        // ROBUST DATA INITIALIZATION
        const safeData = {
          homepage: {
            hero: data?.homepage?.hero || { 
              title: "EMPOWERING FUTURE WORKFORCE", 
              subtitle: "Join India's leading AI-first strategic consultancy",
              image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670",
              badge: "Operational Efficiency & Strategic Growth"
            },
            stats: data?.homepage?.stats || [
              { label: "Tasks Completed", value: "10k+" },
              { label: "Strong Workforce", value: "500+" }
            ],
            offerings: data?.homepage?.offerings || { items: [] },
            strategy: data?.homepage?.strategy || {},
            testimonials: data?.homepage?.testimonials || []
          },
          address: data?.address || "H-161, BSI Business Park, Sector 63, Noida, UP",
          contactPhone: data?.contactPhone || "+91 91190 55151"
        };
        setConfig(safeData);
        setLoading(false);
      })
      .catch(() => {
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
      if (res.ok) alert('Homepage Architect: Website Updated Successfully! 🚀');
    } catch (err) {
      alert('Sync Failed. Check connection.');
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white font-black italic animate-pulse">Establishing Secure CMS Link...</p>
    </div>
  );

  if (!config) return <div className="p-10 text-red-400">Failed to connect to Architect API.</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-40">
      <div className="flex justify-between items-center bg-[#1e293b] p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center">
              <Globe className="text-white" size={32} />
           </div>
           <div>
              <h1 className="text-4xl font-black text-white italic tracking-tighter">Homepage Architect</h1>
              <p className="text-slate-400 mt-1 font-medium italic">Master control for live sections</p>
           </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-3xl transition-all shadow-xl shadow-blue-600/40 transform hover:-translate-y-1"
        >
          {saving ? 'Syncing...' : <><Save size={24} /> Update Website</>}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-12">
          
          {/* HERO */}
          <section className="bg-[#1e293b] p-10 rounded-[4rem] border border-white/5 space-y-8 shadow-xl">
            <div className="flex items-center gap-4 text-blue-400 border-b border-white/5 pb-6">
              <Layout size={28} />
              <h2 className="text-3xl font-black italic">Hero Section</h2>
            </div>
            <div className="space-y-6">
              <textarea 
                value={config.homepage.hero.title}
                onChange={e => setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, title: e.target.value}}})}
                className="w-full bg-[#0f172a] border border-white/10 rounded-3xl p-6 text-white text-2xl font-black italic outline-none min-h-[120px]"
              />
              <textarea 
                value={config.homepage.hero.subtitle}
                onChange={e => setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, subtitle: e.target.value}}})}
                className="w-full bg-[#0f172a] border border-white/10 rounded-3xl p-6 text-white/60 font-medium italic outline-none min-h-[80px]"
              />
            </div>
          </section>

          {/* STATS */}
          <section className="bg-[#1e293b] p-10 rounded-[4rem] border border-white/5 space-y-8 shadow-xl">
            <div className="flex items-center gap-4 text-orange-400 border-b border-white/5 pb-6">
              <Trophy size={28} />
              <h2 className="text-3xl font-black italic">Performance Stats</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {config.homepage.stats.map((stat, i) => (
                <div key={i} className="p-6 bg-[#0f172a] rounded-3xl border border-white/5">
                   <input 
                     value={stat.value} 
                     onChange={e => {
                       const newStats = [...config.homepage.stats];
                       newStats[i].value = e.target.value;
                       setConfig({...config, homepage: {...config.homepage, stats: newStats}});
                     }}
                     className="bg-transparent text-3xl font-black text-white italic outline-none w-full" 
                   />
                   <input 
                     value={stat.label} 
                     onChange={e => {
                       const newStats = [...config.homepage.stats];
                       newStats[i].label = e.target.value;
                       setConfig({...config, homepage: {...config.homepage, stats: newStats}});
                     }}
                     className="bg-transparent text-[10px] font-black uppercase text-slate-500 tracking-[0.4em] outline-none w-full mt-2" 
                   />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-12">
           {/* FOOTER */}
           <section className="bg-[#1e293b] p-10 rounded-[4rem] border border-white/5 space-y-8 shadow-xl">
            <div className="flex items-center gap-4 text-purple-400 border-b border-white/5 pb-6">
              <MapPin size={28} />
              <h2 className="text-2xl font-black italic">Contact Info</h2>
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
    </div>
  );
}

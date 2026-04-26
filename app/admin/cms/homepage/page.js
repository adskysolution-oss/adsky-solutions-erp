'use client';

import React, { useState, useEffect } from 'react';
import { Save, Layout, Trophy, MapPin, Globe, Sparkles, Image as ImageIcon, Plus, Trash2, Rocket, Briefcase, MessageSquare, BookOpen } from 'lucide-react';

export default function HomepageManager() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/public/config')
      .then(res => res.json())
      .then(data => {
        const safeData = {
          logo: data?.logo || "/logo(2).jpeg",
          contactPhone: data?.contactPhone || "8076611842",
          address: data?.address || "AD Sky Solution, 126 Satyam Enclave Sahibabad, Ghaziabad UP",
          homepage: {
            hero: {
              slides: data?.homepage?.hero?.slides?.length > 0 ? data.homepage.hero.slides : [{
                title: "Integrated IT Solutions & Workforce Consulting",
                subtitle: "Delivering expert IT consulting, software development, and professional staffing solutions.",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670",
                badge: "Strategic Growth"
              }]
            },
            stats: data?.homepage?.stats?.length > 0 ? data.homepage.stats : [
              { label: "TASKS COMPLETED", value: "10k+" },
              { label: "STRONG WORKFORCE", value: "500+" },
              { label: "CITIES COVERED", value: "50+" },
              { label: "PIN CODES", value: "1000+" }
            ],
            strategy: data?.homepage?.strategy || {
              title: "Fuel Your Future With Expert Strategy.",
              description: "Website & App Strategy Consultation, CRM/HRMS Setup...",
              image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672",
              price: "₹999"
            },
            testimonials: data?.homepage?.testimonials?.length > 0 ? data.homepage.testimonials : [{
              name: "Ashwin Malani", role: "Gig Partner", content: "", image: ""
            }]
          }
        };
        setConfig(safeData);
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
      alert('Super-CMS: Website Synchronized! 🚀');
    } catch (err) { alert('Sync Failed'); }
    setSaving(false);
  };

  if (loading) return <div className="p-20 text-white font-black italic">Synchronizing with Live Website...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-40">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-[#1e293b] p-10 rounded-[3rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
        <div className="flex items-center gap-6">
           <img src={config.logo} className="w-16 h-16 rounded-2xl object-cover" alt="Logo" />
           <div>
              <h1 className="text-4xl font-black text-white italic tracking-tighter">Super-CMS Architect</h1>
              <p className="text-slate-400 mt-1 font-medium italic">Master Visual Control Center</p>
           </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-3xl transition-all shadow-2xl shadow-blue-600/40 transform hover:-translate-y-1"
        >
          {saving ? 'Syncing...' : <><Save size={24} /> Sync Everything</>}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        
        {/* HERO SLIDER MANAGER */}
        <section className="xl:col-span-2 bg-[#1e293b] p-10 rounded-[4rem] border border-white/5 space-y-8 shadow-xl">
          <div className="flex justify-between items-center border-b border-white/5 pb-6">
             <div className="flex items-center gap-4 text-blue-400">
                <Layout size={32} />
                <h2 className="text-3xl font-black italic">Hero Slider (Dynamic Slides)</h2>
             </div>
             <button 
               onClick={() => {
                 const slides = [...config.homepage.hero.slides, { title: "New Slide", subtitle: "", image: "", badge: "" }];
                 setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, slides}}});
               }}
               className="p-3 bg-blue-600/20 text-blue-400 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"
             >
                <Plus size={24} />
             </button>
          </div>
          
          <div className="space-y-10">
             {config.homepage.hero.slides.map((slide, i) => (
               <div key={i} className="p-8 bg-[#0f172a] rounded-[3rem] border border-white/5 relative group">
                  <button 
                    onClick={() => {
                       const slides = config.homepage.hero.slides.filter((_, idx) => idx !== i);
                       setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, slides}}});
                    }}
                    className="absolute top-6 right-6 p-2 bg-red-500/10 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                     <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <input value={slide.title} onChange={e => {
                          const s = [...config.homepage.hero.slides]; s[i].title = e.target.value;
                          setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, slides: s}}});
                        }} className="w-full bg-transparent text-2xl font-black text-white italic outline-none" placeholder="Slide Heading" />
                        <textarea value={slide.subtitle} onChange={e => {
                          const s = [...config.homepage.hero.slides]; s[i].subtitle = e.target.value;
                          setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, slides: s}}});
                        }} className="w-full bg-transparent text-white/50 font-medium italic outline-none min-h-[60px]" placeholder="Subtitle" />
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 bg-[#1e293b] p-4 rounded-2xl border border-white/5">
                           <ImageIcon size={20} className="text-slate-500" />
                           <input value={slide.image} onChange={e => {
                             const s = [...config.homepage.hero.slides]; s[i].image = e.target.value;
                             setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, slides: s}}});
                           }} className="bg-transparent text-xs text-blue-400 font-bold outline-none flex-grow" placeholder="Background Image URL" />
                        </div>
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                           <img src={slide.image || "https://placehold.co/800x450/0f172a/white?text=No+Image"} className="object-cover w-full h-full" />
                        </div>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </section>

        {/* STRATEGY & VISUALS */}
        <section className="bg-[#1e293b] p-10 rounded-[4rem] border border-white/5 space-y-8">
          <div className="flex items-center gap-4 text-purple-400 border-b border-white/5 pb-6">
            <Rocket size={32} />
            <h2 className="text-3xl font-black italic">Strategy Visuals</h2>
          </div>
          <div className="space-y-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-4">Main Strategy Image</label>
                <input value={config.homepage.strategy.image} onChange={e => setConfig({...config, homepage: {...config.homepage, strategy: {...config.homepage.strategy, image: e.target.value}}})} className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-4 text-blue-400 text-xs font-bold outline-none" />
                <img src={config.homepage.strategy.image} className="w-full aspect-video rounded-3xl object-cover mt-2 border border-white/10 shadow-2xl" />
             </div>
             <input value={config.homepage.strategy.title} onChange={e => setConfig({...config, homepage: {...config.homepage, strategy: {...config.homepage.strategy, title: e.target.value}}})} className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-4 text-white font-black italic outline-none" placeholder="Heading" />
          </div>
        </section>

        {/* PERFORMANCE STATS */}
        <section className="bg-[#1e293b] p-10 rounded-[4rem] border border-white/5 space-y-8 shadow-xl">
          <div className="flex items-center gap-4 text-orange-400 border-b border-white/5 pb-6">
            <Trophy size={32} />
            <h2 className="text-3xl font-black italic">Live Statistics</h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {config.homepage.stats.map((stat, i) => (
              <div key={i} className="p-8 bg-[#0f172a] rounded-[2.5rem] border border-white/5">
                <input value={stat.value} onChange={e => {
                  const s = [...config.homepage.stats]; s[i].value = e.target.value;
                  setConfig({...config, homepage: {...config.homepage, stats: s}});
                }} className="bg-transparent text-4xl font-black text-white italic outline-none w-full" />
                <input value={stat.label} onChange={e => {
                  const s = [...config.homepage.stats]; s[i].label = e.target.value;
                  setConfig({...config, homepage: {...config.homepage, stats: s}});
                }} className="bg-transparent text-[10px] font-black uppercase text-slate-500 tracking-[0.4em] outline-none w-full mt-2" />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

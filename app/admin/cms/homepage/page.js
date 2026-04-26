'use client';

import React, { useState, useEffect } from 'react';
import { Save, Layout, Trophy, MapPin, Globe, Sparkles, Image as ImageIcon, Plus, Trash2, Rocket, Briefcase, MessageSquare, BookOpen, Layers, MousePointer2, Star } from 'lucide-react';

export default function HomepageManager() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/public/config')
      .then(res => res.json())
      .then(data => {
        // --- MASTER DATA SYNC (ALL SECTIONS) ---
        const masterData = {
          logo: data?.logo || "/logo(2).jpeg",
          contactPhone: data?.contactPhone || "8076611842",
          address: data?.address || "AD Sky Solution, 126 Satyam Enclave Sahibabad, Ghaziabad UP",
          homepage: {
            hero: data?.homepage?.hero || { slides: [{ title: "Integrated IT Solutions...", subtitle: "", image: "" }] },
            stats: data?.homepage?.stats || [{}, {}, {}, {}],
            offerings: data?.homepage?.offerings || { items: [{}, {}, {}] },
            strategy: data?.homepage?.strategy || { title: "", description: "", image: "" },
            jobs: data?.homepage?.jobs || { mainImage: "", categories: [{}, {}, {}] },
            howItWorks: data?.homepage?.howItWorks || [{}, {}, {}],
            testimonials: data?.homepage?.testimonials || [{}],
            blogs: data?.homepage?.blogs || [{}, {}, {}],
            cta: data?.homepage?.cta || { title: "Ready to transform?", subtitle: "" }
          }
        };
        setConfig(masterData);
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
      alert('MASTER ARCHITECT: Full Website Synchronized! 🚀');
    } catch (err) { alert('Sync Failed'); }
    setSaving(false);
  };

  if (loading) return <div className="p-20 text-white font-black italic">Synchronizing All Sections...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-16 pb-60">
      {/* HEADER CONTROL */}
      <div className="flex justify-between items-center bg-[#1e293b] p-10 rounded-[3rem] border border-white/5 backdrop-blur-3xl shadow-2xl sticky top-8 z-50">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg"><Globe className="text-white" /></div>
           <div>
              <h1 className="text-4xl font-black text-white italic tracking-tighter">Master Architect</h1>
              <p className="text-slate-400 mt-1 font-medium italic">Complete Control of adskysolution.com</p>
           </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-[2rem] transition-all shadow-2xl shadow-blue-600/40 transform hover:-translate-y-1"
        >
          {saving ? 'Saving...' : <><Save size={24} /> Publish Everything</>}
        </button>
      </div>

      <div className="space-y-16">
        
        {/* 1. HERO SLIDER */}
        <SectionWrapper title="Hero Slider" icon={Layout} color="blue">
           <div className="space-y-10">
              {config.homepage.hero.slides.map((slide, i) => (
                <div key={i} className="p-10 bg-[#0f172a] rounded-[3.5rem] border border-white/5 space-y-8 relative group">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 ml-4">Slide Heading</label>
                            <textarea value={slide.title} className="w-full bg-[#1e293b] border border-white/10 rounded-3xl p-6 text-white text-2xl font-black italic outline-none" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 ml-4">Background Image URL</label>
                            <input value={slide.image} className="w-full bg-[#1e293b] border border-white/10 rounded-2xl p-4 text-blue-400 text-xs font-bold outline-none" />
                         </div>
                      </div>
                      <img src={slide.image} className="w-full aspect-video rounded-[2.5rem] object-cover border border-white/10 shadow-2xl" />
                   </div>
                </div>
              ))}
           </div>
        </SectionWrapper>

        {/* 2. CORE OFFERINGS */}
        <SectionWrapper title="Our Offerings (Collar Sections)" icon={Layers} color="emerald">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {config.homepage.offerings.items.map((item, i) => (
                <div key={i} className="p-8 bg-[#0f172a] rounded-[3rem] border border-white/5 space-y-4">
                   <input value={item.title} className="bg-transparent text-xl font-black text-white italic outline-none w-full" />
                   <textarea value={item.description} className="bg-transparent text-white/50 text-sm font-medium italic outline-none w-full min-h-[100px]" />
                </div>
              ))}
           </div>
        </SectionWrapper>

        {/* 3. STRATEGY SECTION */}
        <SectionWrapper title="Expert Strategy Section" icon={Rocket} color="purple">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-10 bg-[#0f172a] rounded-[4rem]">
              <div className="space-y-6">
                 <textarea value={config.homepage.strategy.title} className="w-full bg-[#1e293b] border border-white/10 rounded-3xl p-6 text-white text-3xl font-black italic outline-none" />
                 <textarea value={config.homepage.strategy.description} className="w-full bg-[#1e293b] border border-white/10 rounded-3xl p-6 text-white/60 font-medium italic outline-none min-h-[120px]" />
                 <div className="flex items-center gap-4 bg-blue-600/10 p-4 rounded-2xl border border-blue-500/20">
                    <span className="text-blue-400 font-black italic">Pricing:</span>
                    <input value={config.homepage.strategy.price} className="bg-transparent text-white font-black italic outline-none" />
                 </div>
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-slate-500 ml-4">Section Visual URL</label>
                 <input value={config.homepage.strategy.image} className="w-full bg-[#1e293b] border border-white/10 rounded-2xl p-4 text-blue-400 text-xs font-bold outline-none" />
                 <img src={config.homepage.strategy.image} className="w-full aspect-[4/5] rounded-[3rem] object-cover border border-white/10 shadow-2xl" />
              </div>
           </div>
        </SectionWrapper>

        {/* 4. JOB CATEGORIES */}
        <SectionWrapper title="Job Categories (Field/WFH)" icon={Briefcase} color="orange">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {config.homepage.jobs.categories.map((cat, i) => (
                <div key={i} className="p-8 bg-[#0f172a] rounded-[2.5rem] border border-white/5 space-y-4">
                   <input value={cat.title} className="bg-transparent text-xl font-black text-white italic outline-none w-full" />
                   <input value={cat.tag} className="bg-transparent text-[10px] font-black uppercase text-blue-400 tracking-widest outline-none w-full" />
                   <input value={cat.image} className="bg-[#1e293b] border border-white/10 rounded-xl p-3 text-[10px] text-white/40 outline-none w-full" placeholder="Thumbnail URL" />
                </div>
              ))}
           </div>
        </SectionWrapper>

        {/* 5. TESTIMONIALS */}
        <SectionWrapper title="User Feedback" icon={MessageSquare} color="rose">
           {config.homepage.testimonials.map((t, i) => (
             <div key={i} className="p-10 bg-[#0f172a] rounded-[4rem] border border-white/5 flex flex-col md:flex-row gap-10">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shrink-0">
                   <img src={t.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow space-y-4">
                   <input value={t.name} className="bg-transparent text-3xl font-black text-white italic outline-none w-full" />
                   <textarea value={t.content} className="bg-transparent text-white/60 text-lg font-medium italic outline-none w-full min-h-[120px]" />
                </div>
             </div>
           ))}
        </SectionWrapper>

        {/* 6. BLOGS */}
        <SectionWrapper title="Latest Blogs" icon={BookOpen} color="cyan">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {config.homepage.blogs.map((blog, i) => (
                <div key={i} className="p-6 bg-[#0f172a] rounded-[2.5rem] border border-white/5 space-y-4">
                   <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4"><img src={blog.image} className="w-full h-full object-cover" /></div>
                   <textarea value={blog.title} className="bg-transparent text-white font-black italic outline-none w-full min-h-[60px]" />
                   <input value={blog.date} className="bg-transparent text-[10px] font-bold text-slate-500 uppercase outline-none w-full" />
                </div>
              ))}
           </div>
        </SectionWrapper>

        {/* 7. FINAL CTA */}
        <SectionWrapper title="Final Banner (Ready to Transform?)" icon={Sparkles} color="amber">
           <div className="p-16 bg-blue-600 rounded-[4rem] text-center space-y-8">
              <textarea value={config.homepage.cta.title} className="bg-transparent text-5xl font-black text-white italic outline-none w-full text-center" />
              <textarea value={config.homepage.cta.subtitle} className="bg-transparent text-white/80 text-xl font-medium italic outline-none w-full text-center" />
           </div>
        </SectionWrapper>

      </div>
    </div>
  );
}

function SectionWrapper({ title, icon: Icon, color, children }) {
  const colors = {
    blue: 'text-blue-400 bg-blue-400/10',
    emerald: 'text-emerald-400 bg-emerald-400/10',
    purple: 'text-purple-400 bg-purple-400/10',
    orange: 'text-orange-400 bg-orange-400/10',
    rose: 'text-rose-400 bg-rose-400/10',
    cyan: 'text-cyan-400 bg-cyan-400/10',
    amber: 'text-amber-400 bg-amber-400/10'
  };

  return (
    <div className="bg-[#1e293b] p-12 rounded-[4.5rem] border border-white/5 space-y-10 shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-6 border-b border-white/5 pb-8 relative z-10">
         <div className={`p-4 rounded-3xl ${colors[color]}`}>
            <Icon size={32} />
         </div>
         <h2 className="text-4xl font-black text-white italic tracking-tighter">{title}</h2>
      </div>
      <div className="relative z-10">
         {children}
      </div>
    </div>
  );
}

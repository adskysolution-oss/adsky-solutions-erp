'use client';

import React, { useState, useEffect } from 'react';
import { Save, Layout, Trophy, MapPin, Globe, Sparkles, Image as ImageIcon, Plus, Trash2, Rocket, Briefcase, MessageSquare, BookOpen, Layers, Upload, Check, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';

export default function HomepageManager() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    fetch('/api/public/config').then(res => res.json()).then(data => {
      // MASTER INITIALIZATION (ENFORCING ALL SECTIONS)
      const master = {
        logo: data?.logo || "/logo(2).jpeg",
        homepage: {
          hero: data?.homepage?.hero || { hidden: false, slides: [{ title: "Heading", subtitle: "", image: "" }] },
          stats: data?.homepage?.stats || [{ label: "", value: "" }],
          offerings: data?.homepage?.offerings || { hidden: false, items: [{ title: "", description: "" }] },
          strategy: data?.homepage?.strategy || { hidden: false, title: "", description: "", image: "", price: "" },
          jobs: data?.homepage?.jobs || { hidden: false, mainImage: "", categories: [{ title: "", tag: "", image: "" }] },
          howItWorks: data?.homepage?.howItWorks || { hidden: false, steps: [{ title: "", desc: "" }] },
          testimonials: data?.homepage?.testimonials || { hidden: false, items: [{ name: "", content: "", image: "" }] },
          blogs: data?.homepage?.blogs || { hidden: false, items: [{ title: "", date: "", image: "" }] },
          cta: data?.homepage?.cta || { hidden: false, title: "", subtitle: "" }
        }
      };
      setConfig(master);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config) });
      alert('HOMEPAGE FULLY UPDATED & LIVE! ✅');
    } catch (err) { alert('Save Error'); }
    setSaving(false);
  };

  const handleUpload = async (file, path) => {
    const formData = new FormData(); formData.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        const newConfig = { ...config };
        let current = newConfig;
        const keys = path.split('.');
        for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
        current[keys[keys.length - 1]] = data.url;
        setConfig(newConfig);
      }
    } catch (err) { alert('Upload failed'); }
  };

  if (loading) return <div className="p-20 text-white font-black italic animate-pulse">Master Architect Initializing...</div>;

  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      {/* SIDEBAR NAVIGATION */}
      <div className="w-80 bg-[#1e293b] border-r border-white/5 p-8 space-y-4 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-4 mb-10">
           <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl"><Globe className="text-white" /></div>
           <h1 className="text-2xl font-black text-white italic">Architect</h1>
        </div>
        <nav className="space-y-2">
           <NavItem active={activeTab === 'hero'} onClick={() => setActiveTab('hero')} icon={Layout} label="Hero Slider" />
           <NavItem active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={Trophy} label="Performance Stats" />
           <NavItem active={activeTab === 'offerings'} onClick={() => setActiveTab('offerings')} icon={Layers} label="Core Offerings" />
           <NavItem active={activeTab === 'strategy'} onClick={() => setActiveTab('strategy')} icon={Rocket} label="Strategy Section" />
           <NavItem active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} icon={Briefcase} label="Job Categories" />
           <NavItem active={activeTab === 'testimonials'} onClick={() => setActiveTab('testimonials')} icon={MessageSquare} label="Testimonials" />
           <NavItem active={activeTab === 'blogs'} onClick={() => setActiveTab('blogs')} icon={BookOpen} label="Latest Blogs" />
           <NavItem active={activeTab === 'cta'} onClick={() => setActiveTab('cta')} icon={Sparkles} label="Final CTA" />
        </nav>
        <div className="pt-20">
           <button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center gap-2 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-3xl transition-all shadow-2xl shadow-emerald-600/30 transform hover:-translate-y-1">
             {saving ? 'Syncing...' : <><Save size={20} /> PUBLISH LIVE</>}
           </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-12 overflow-y-auto max-h-screen">
        
        {/* --- HERO SECTION --- */}
        {activeTab === 'hero' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
            <SectionHeader title="Hero Slider" subtitle="Manage carousel slides and background visuals" />
            <div className="space-y-8">
               {config.homepage.hero.slides.map((slide, i) => (
                 <div key={i} className="p-10 bg-[#1e293b] rounded-[4rem] border border-white/5 space-y-8 relative group">
                    <button 
                      onClick={() => {
                         const s = config.homepage.hero.slides.filter((_, idx) => idx !== i);
                         setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, slides: s}}});
                      }}
                      className="absolute top-8 right-8 p-3 bg-red-500/10 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                    >
                       <Trash2 size={20} />
                    </button>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
                       <div className="space-y-6">
                          <Input label="Slide Heading" value={slide.title} onChange={v => {
                             const s = [...config.homepage.hero.slides]; s[i].title = v;
                             setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, slides: s}}});
                          }} textarea />
                          <Uploader label="Slide Image" url={slide.image} onUpload={f => handleUpload(f, `homepage.hero.slides.${i}.image`)} />
                       </div>
                       <Preview img={slide.image} />
                    </div>
                 </div>
               ))}
               <AddBtn onClick={() => {
                 const slides = [...config.homepage.hero.slides, { title: "", subtitle: "", image: "" }];
                 setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, slides}}});
               }} label="Add New Slide" />
            </div>
          </div>
        )}

        {/* --- STATS SECTION --- */}
        {activeTab === 'stats' && (
           <div className="space-y-10">
              <SectionHeader title="Performance Stats" subtitle="Update the numbers on your homepage" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {config.homepage.stats.map((stat, i) => (
                    <div key={i} className="p-8 bg-[#1e293b] rounded-[3rem] border border-white/5 relative group">
                       <button onClick={() => {
                          const s = config.homepage.stats.filter((_, idx) => idx !== i);
                          setConfig({...config, homepage: {...config.homepage, stats: s}});
                       }} className="absolute top-6 right-6 p-2 bg-red-500/10 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                       <div className="space-y-4">
                          <input value={stat.value} onChange={e => {
                             const s = [...config.homepage.stats]; s[i].value = e.target.value;
                             setConfig({...config, homepage: {...config.homepage, stats: s}});
                          }} className="bg-transparent text-5xl font-black text-white italic outline-none w-full" placeholder="Value (e.g. 10k+)" />
                          <input value={stat.label} onChange={e => {
                             const s = [...config.homepage.stats]; s[i].label = e.target.value;
                             setConfig({...config, homepage: {...config.homepage, stats: s}});
                          }} className="bg-transparent text-[10px] font-black uppercase text-slate-500 tracking-[0.4em] outline-none w-full" placeholder="Label" />
                       </div>
                    </div>
                 ))}
                 <AddBtn onClick={() => {
                    const s = [...config.homepage.stats, { label: "", value: "" }];
                    setConfig({...config, homepage: {...config.homepage, stats: s}});
                 }} label="Add Stat" />
              </div>
           </div>
        )}

        {/* --- STRATEGY SECTION --- */}
        {activeTab === 'strategy' && (
           <div className="space-y-10">
              <SectionHeader title="Strategy Section" subtitle="Manage the expert strategy visual and text" />
              <div className="p-12 bg-[#1e293b] rounded-[4.5rem] border border-white/5 grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
                 <div className="space-y-8">
                    <Input label="Main Heading" value={config.homepage.strategy.title} onChange={v => setConfig({...config, homepage: {...config.homepage, strategy: {...config.homepage.strategy, title: v}}})} textarea />
                    <Input label="Description" value={config.homepage.strategy.description} onChange={v => setConfig({...config, homepage: {...config.homepage, strategy: {...config.homepage.strategy, description: v}}})} textarea />
                    <Uploader label="Strategy Image" url={config.homepage.strategy.image} onUpload={f => handleUpload(f, `homepage.strategy.image`)} />
                 </div>
                 <Preview img={config.homepage.strategy.image} ratio="aspect-[4/5]" />
              </div>
           </div>
        )}

        {/* --- TESTIMONIALS SECTION --- */}
        {activeTab === 'testimonials' && (
           <div className="space-y-10">
              <SectionHeader title="Testimonials" subtitle="Manage user feedback and portraits" />
              <div className="space-y-8">
                 {config.homepage.testimonials.items.map((item, i) => (
                    <div key={i} className="p-10 bg-[#1e293b] rounded-[4rem] border border-white/5 relative group">
                       <button onClick={() => {
                          const items = config.homepage.testimonials.items.filter((_, idx) => idx !== i);
                          setConfig({...config, homepage: {...config.homepage, testimonials: {...config.homepage.testimonials, items}}});
                       }} className="absolute top-8 right-8 p-3 bg-red-500/10 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={20} /></button>
                       <div className="flex flex-col md:flex-row gap-12 items-center">
                          <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-white/5 shrink-0"><img src={item.image} className="w-full h-full object-cover" /></div>
                          <div className="flex-grow space-y-6">
                             <input value={item.name} onChange={e => {
                               const items = [...config.homepage.testimonials.items]; items[i].name = e.target.value;
                               setConfig({...config, homepage: {...config.homepage, testimonials: {...config.homepage.testimonials, items}}});
                             }} className="bg-transparent text-4xl font-black text-white italic outline-none w-full" placeholder="User Name" />
                             <textarea value={item.content} onChange={e => {
                               const items = [...config.homepage.testimonials.items]; items[i].content = e.target.value;
                               setConfig({...config, homepage: {...config.homepage, testimonials: {...config.homepage.testimonials, items}}});
                             }} className="bg-transparent text-white/60 text-xl font-medium italic outline-none w-full min-h-[100px]" placeholder="Review Content" />
                             <Uploader label="Portrait Image" url={item.image} onUpload={f => handleUpload(f, `homepage.testimonials.items.${i}.image`)} />
                          </div>
                       </div>
                    </div>
                 ))}
                 <AddBtn onClick={() => {
                    const items = [...config.homepage.testimonials.items, { name: "", content: "", image: "" }];
                    setConfig({...config, homepage: {...config.homepage, testimonials: {...config.homepage.testimonials, items}}});
                 }} label="Add Testimonial" />
              </div>
           </div>
        )}

      </div>
    </div>
  );
}

// UI COMPONENTS
function NavItem({ active, onClick, icon: Icon, label }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all font-bold italic text-sm ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
       <Icon size={18} /> {label}
    </button>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-12">
       <h2 className="text-6xl font-black text-white italic tracking-tighter mb-2">{title}</h2>
       <p className="text-slate-500 font-medium italic text-lg">{subtitle}</p>
    </div>
  );
}

function Input({ label, value, onChange, textarea }) {
  return (
    <div className="space-y-2">
       <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">{label}</label>
       {textarea ? (
         <textarea value={value} onChange={e => onChange(e.target.value)} className="w-full bg-[#0f172a] border border-white/10 rounded-3xl p-6 text-white text-xl font-bold italic outline-none min-h-[120px] focus:border-blue-500 transition-all" />
       ) : (
         <input value={value} onChange={e => onChange(e.target.value)} className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-6 text-white text-xl font-bold italic outline-none focus:border-blue-500 transition-all" />
       )}
    </div>
  );
}

function Uploader({ label, url, onUpload }) {
  const [up, setUp] = useState(false);
  return (
    <div className="space-y-3">
       <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">{label}</label>
       <div className="relative group">
          <div className="flex items-center gap-4 p-5 bg-[#0f172a] rounded-2xl border border-white/5 hover:border-blue-500/50 transition-all cursor-pointer">
             <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                {up ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Upload size={20} />}
             </div>
             <div>
                <p className="text-white font-black italic text-sm">{up ? 'Uploading...' : 'Select New Image'}</p>
                <p className="text-white/30 text-[10px] truncate max-w-[200px] italic">{url || 'No file selected'}</p>
             </div>
             <input type="file" onChange={async e => { setUp(true); await onUpload(e.target.files[0]); setUp(false); }} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
          </div>
       </div>
    </div>
  );
}

function Preview({ img, ratio = "aspect-video" }) {
  return (
    <div className={`relative ${ratio} rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl bg-[#0f172a]`}>
       <img src={img || "https://placehold.co/800x450/0f172a/white?text=Preview"} className="w-full h-full object-cover" />
       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
    </div>
  );
}

function AddBtn({ onClick, label }) {
  return (
    <button onClick={onClick} className="w-full py-10 rounded-[3rem] border-4 border-dashed border-white/5 text-slate-500 hover:border-blue-500/30 hover:text-blue-500 transition-all flex items-center justify-center gap-4 font-black italic text-xl group">
       <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all"><Plus size={24} /></div>
       {label}
    </button>
  );
}

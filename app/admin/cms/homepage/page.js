'use client';

import React, { useState, useEffect } from 'react';
import { Save, Layout, Trophy, MapPin, Globe, Sparkles, Image as ImageIcon, Plus, Trash2, Rocket, Briefcase, MessageSquare, BookOpen, Layers, Upload, Check, Eye, EyeOff, ChevronRight } from 'lucide-react';

export default function HomepageManager() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    fetch('/api/public/config').then(res => res.json()).then(data => {
      const master = {
        logo: data?.logo || "/logo(2).jpeg",
        homepage: {
          hero: data?.homepage?.hero || { slides: [{ title: "Integrated IT Solutions...", subtitle: "", image: "" }] },
          stats: data?.homepage?.stats || [{ label: "Tasks Completed", value: "10k+" }, { label: "Strong Workforce", value: "500+" }],
          offerings: data?.homepage?.offerings || { items: [{ title: "Egocentric Video", description: "High-Quality human POV..." }] },
          strategy: data?.homepage?.strategy || { title: "Fuel Your Future", description: "", image: "", price: "₹999" },
          jobs: data?.homepage?.jobs || { categories: [{ title: "Delivery Partner", tag: "Field Work", image: "" }] },
          howItWorks: data?.homepage?.howItWorks || { steps: [{ title: "Project Config", desc: "" }] },
          testimonials: data?.homepage?.testimonials || { items: [{ name: "Ashwin Malani", content: "", image: "" }] },
          blogs: data?.homepage?.blogs || { items: [{ title: "Interview Tips", date: "", image: "" }] },
          cta: data?.homepage?.cta || { title: "Ready to transform?", subtitle: "" }
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
      alert('WEBSITE FULLY UPDATED! ✅');
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

  if (loading) return <div className="p-20 text-white font-black italic text-center animate-pulse">Master Architect Loading...</div>;

  return (
    <div className="flex min-h-screen bg-[#020617]">
      {/* SIDEBAR */}
      <div className="w-80 bg-[#0f172a] border-r border-white/5 p-8 space-y-4 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-4 mb-12">
           <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl"><Globe className="text-white" /></div>
           <h1 className="text-2xl font-black text-white italic tracking-tighter">Architect</h1>
        </div>
        <nav className="space-y-1">
           <NavItem active={activeTab === 'hero'} onClick={() => setActiveTab('hero')} icon={Layout} label="Hero Slider" />
           <NavItem active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={Trophy} label="Performance Stats" />
           <NavItem active={activeTab === 'offerings'} onClick={() => setActiveTab('offerings')} icon={Layers} label="Core Offerings" />
           <NavItem active={activeTab === 'strategy'} onClick={() => setActiveTab('strategy')} icon={Rocket} label="Strategy Section" />
           <NavItem active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} icon={Briefcase} label="Job Categories" />
           <NavItem active={activeTab === 'howItWorks'} onClick={() => setActiveTab('howItWorks')} icon={Check} label="How It Works" />
           <NavItem active={activeTab === 'testimonials'} onClick={() => setActiveTab('testimonials')} icon={MessageSquare} label="Testimonials" />
           <NavItem active={activeTab === 'blogs'} onClick={() => setActiveTab('blogs')} icon={BookOpen} label="Latest Blogs" />
           <NavItem active={activeTab === 'cta'} onClick={() => setActiveTab('cta')} icon={Sparkles} label="Final CTA" />
        </nav>
        <div className="pt-20">
           <button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center gap-2 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-[2rem] transition-all shadow-2xl shadow-emerald-600/30">
             {saving ? 'Syncing...' : <><Save size={20} /> PUBLISH LIVE</>}
           </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-16 overflow-y-auto max-h-screen custom-scrollbar">
        
        {/* HERO */}
        {activeTab === 'hero' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
            <Header title="Hero Slider" subtitle="Manage your homepage carousel" />
            {config.homepage.hero.slides.map((s, i) => (
              <Card key={i} onDelete={() => {
                const slides = config.homepage.hero.slides.filter((_, idx) => idx !== i);
                setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, slides}}});
              }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <Input label="Main Heading" value={s.title} onChange={v => {
                      const slides = [...config.homepage.hero.slides]; slides[i].title = v;
                      setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, slides}}});
                    }} textarea />
                    <Uploader label="Slide Image" url={s.image} onUpload={f => handleUpload(f, `homepage.hero.slides.${i}.image`)} />
                  </div>
                  <Preview img={s.image} />
                </div>
              </Card>
            ))}
            <AddBtn label="Add Slide" onClick={() => {
              const slides = [...config.homepage.hero.slides, { title: "", subtitle: "", image: "" }];
              setConfig({...config, homepage: {...config.homepage, hero: {...config.homepage.hero, slides}}});
            }} />
          </div>
        )}

        {/* STATS */}
        {activeTab === 'stats' && (
          <div className="space-y-12">
            <Header title="Performance Stats" subtitle="Edit the metrics on your site" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {config.homepage.stats.map((s, i) => (
                <Card key={i} onDelete={() => {
                  const stats = config.homepage.stats.filter((_, idx) => idx !== i);
                  setConfig({...config, homepage: {...config.homepage, stats}});
                }}>
                  <input value={s.value} onChange={e => {
                    const stats = [...config.homepage.stats]; stats[i].value = e.target.value;
                    setConfig({...config, homepage: {...config.homepage, stats}});
                  }} className="bg-transparent text-5xl font-black text-white italic outline-none w-full mb-2" placeholder="Value" />
                  <input value={s.label} onChange={e => {
                    const stats = [...config.homepage.stats]; stats[i].label = e.target.value;
                    setConfig({...config, homepage: {...config.homepage, stats}});
                  }} className="bg-transparent text-[10px] font-black uppercase text-slate-500 tracking-[0.4em] outline-none w-full" placeholder="Label" />
                </Card>
              ))}
            </div>
            <AddBtn label="Add Stat" onClick={() => {
              const stats = [...config.homepage.stats, { label: "", value: "" }];
              setConfig({...config, homepage: {...config.homepage, stats}});
            }} />
          </div>
        )}

        {/* OFFERINGS */}
        {activeTab === 'offerings' && (
          <div className="space-y-12">
            <Header title="Core Offerings" subtitle="Manage your collar sections" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {config.homepage.offerings.items.map((s, i) => (
                <Card key={i} onDelete={() => {
                  const items = config.homepage.offerings.items.filter((_, idx) => idx !== i);
                  setConfig({...config, homepage: {...config.homepage, offerings: {...config.homepage.offerings, items}}});
                }}>
                  <input value={s.title} onChange={e => {
                    const items = [...config.homepage.offerings.items]; items[i].title = e.target.value;
                    setConfig({...config, homepage: {...config.homepage, offerings: {...config.homepage.offerings, items}}});
                  }} className="bg-transparent text-2xl font-black text-white italic outline-none w-full mb-4" />
                  <textarea value={s.description} onChange={e => {
                    const items = [...config.homepage.offerings.items]; items[i].description = e.target.value;
                    setConfig({...config, homepage: {...config.homepage, offerings: {...config.homepage.offerings, items}}});
                  }} className="bg-transparent text-white/50 text-sm font-medium italic outline-none w-full min-h-[80px]" />
                </Card>
              ))}
            </div>
            <AddBtn label="Add Offering" onClick={() => {
              const items = [...config.homepage.offerings.items, { title: "", description: "" }];
              setConfig({...config, homepage: {...config.homepage, offerings: {...config.homepage.offerings, items}}});
            }} />
          </div>
        )}

        {/* STRATEGY */}
        {activeTab === 'strategy' && (
          <div className="space-y-12">
            <Header title="Strategy Section" subtitle="Edit the earth visual section" />
            <Card>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <Input label="Title" value={config.homepage.strategy.title} onChange={v => setConfig({...config, homepage: {...config.homepage, strategy: {...config.homepage.strategy, title: v}}})} textarea />
                  <Input label="Price Tag" value={config.homepage.strategy.price} onChange={v => setConfig({...config, homepage: {...config.homepage, strategy: {...config.homepage.strategy, price: v}}})} />
                  <Uploader label="Strategy Visual" url={config.homepage.strategy.image} onUpload={f => handleUpload(f, 'homepage.strategy.image')} />
                </div>
                <Preview img={config.homepage.strategy.image} ratio="aspect-[4/5]" />
              </div>
            </Card>
          </div>
        )}

        {/* JOBS */}
        {activeTab === 'jobs' && (
          <div className="space-y-12">
            <Header title="Job Categories" subtitle="Manage your recruitment categories" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {config.homepage.jobs.categories.map((s, i) => (
                <Card key={i} onDelete={() => {
                  const categories = config.homepage.jobs.categories.filter((_, idx) => idx !== i);
                  setConfig({...config, homepage: {...config.homepage, jobs: {...config.homepage.jobs, categories}}});
                }}>
                  <input value={s.title} onChange={e => {
                    const categories = [...config.homepage.jobs.categories]; categories[i].title = e.target.value;
                    setConfig({...config, homepage: {...config.homepage, jobs: {...config.homepage.jobs, categories}}});
                  }} className="bg-transparent text-xl font-black text-white italic outline-none w-full" />
                  <Uploader label="Thumbnail" url={s.image} onUpload={f => handleUpload(f, `homepage.jobs.categories.${i}.image`)} />
                </Card>
              ))}
            </div>
            <AddBtn label="Add Category" onClick={() => {
              const categories = [...config.homepage.jobs.categories, { title: "", tag: "", image: "" }];
              setConfig({...config, homepage: {...config.homepage, jobs: {...config.homepage.jobs, categories}}});
            }} />
          </div>
        )}

        {/* TESTIMONIALS */}
        {activeTab === 'testimonials' && (
           <div className="space-y-12">
              <Header title="Testimonials" subtitle="Manage Ashwin Malani & others" />
              {config.homepage.testimonials.items.map((s, i) => (
                <Card key={i} onDelete={() => {
                   const items = config.homepage.testimonials.items.filter((_, idx) => idx !== i);
                   setConfig({...config, homepage: {...config.homepage, testimonials: {...config.homepage.testimonials, items}}});
                }}>
                   <div className="flex flex-col md:flex-row gap-12 items-center">
                      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/10 shrink-0"><img src={s.image} className="w-full h-full object-cover" /></div>
                      <div className="flex-grow space-y-6">
                         <input value={s.name} onChange={e => {
                           const items = [...config.homepage.testimonials.items]; items[i].name = e.target.value;
                           setConfig({...config, homepage: {...config.homepage, testimonials: {...config.homepage.testimonials, items}}});
                         }} className="bg-transparent text-3xl font-black text-white italic outline-none w-full" />
                         <textarea value={s.content} onChange={e => {
                           const items = [...config.homepage.testimonials.items]; items[i].content = e.target.value;
                           setConfig({...config, homepage: {...config.homepage, testimonials: {...config.homepage.testimonials, items}}});
                         }} className="bg-transparent text-white/60 text-lg font-medium italic outline-none w-full min-h-[100px]" />
                         <Uploader label="Profile Photo" url={s.image} onUpload={f => handleUpload(f, `homepage.testimonials.items.${i}.image`)} />
                      </div>
                   </div>
                </Card>
              ))}
              <AddBtn label="Add Testimonial" onClick={() => {
                 const items = [...config.homepage.testimonials.items, { name: "", content: "", image: "" }];
                 setConfig({...config, homepage: {...config.homepage, testimonials: {...config.homepage.testimonials, items}}});
              }} />
           </div>
        )}

        {/* BLOGS */}
        {activeTab === 'blogs' && (
           <div className="space-y-12">
              <Header title="Latest Blogs" subtitle="Manage your blog cards" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {config.homepage.blogs.items.map((s, i) => (
                    <Card key={i} onDelete={() => {
                       const items = config.homepage.blogs.items.filter((_, idx) => idx !== i);
                       setConfig({...config, homepage: {...config.homepage, blogs: {...config.homepage.blogs, items}}});
                    }}>
                       <input value={s.title} onChange={e => {
                          const items = [...config.homepage.blogs.items]; items[i].title = e.target.value;
                          setConfig({...config, homepage: {...config.homepage, blogs: {...config.homepage.blogs, items}}});
                       }} className="bg-transparent text-xl font-black text-white italic outline-none w-full mb-4" />
                       <Uploader label="Blog Thumbnail" url={s.image} onUpload={f => handleUpload(f, `homepage.blogs.items.${i}.image`)} />
                    </Card>
                 ))}
              </div>
              <AddBtn label="Add Blog" onClick={() => {
                 const items = [...config.homepage.blogs.items, { title: "", date: "", image: "" }];
                 setConfig({...config, homepage: {...config.homepage, blogs: {...config.homepage.blogs, items}}});
              }} />
           </div>
        )}

      </div>
    </div>
  );
}

// UI HELPERS
function NavItem({ active, onClick, icon: Icon, label }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold italic text-sm ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
       <Icon size={18} /> {label}
    </button>
  );
}

function Header({ title, subtitle }) {
  return (
    <div className="mb-12">
       <h2 className="text-7xl font-black text-white italic tracking-tighter mb-2">{title}</h2>
       <p className="text-slate-500 font-medium italic text-xl tracking-wide">{subtitle}</p>
    </div>
  );
}

function Card({ children, onDelete }) {
  return (
    <div className="p-12 bg-[#0f172a] rounded-[4rem] border border-white/5 relative group hover:border-blue-500/20 transition-all shadow-2xl">
       {onDelete && (
         <button onClick={onDelete} className="absolute top-10 right-10 p-3 bg-red-500/10 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white">
           <Trash2 size={20} />
         </button>
       )}
       {children}
    </div>
  );
}

function Input({ label, value, onChange, textarea }) {
  return (
    <div className="space-y-3">
       <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-[0.2em]">{label}</label>
       {textarea ? (
         <textarea value={value} onChange={e => onChange(e.target.value)} className="w-full bg-[#1e293b] border border-white/10 rounded-[2.5rem] p-8 text-white text-2xl font-bold italic outline-none focus:border-blue-500/50 min-h-[150px]" />
       ) : (
         <input value={value} onChange={e => onChange(e.target.value)} className="w-full bg-[#1e293b] border border-white/10 rounded-[2rem] p-6 text-white text-xl font-bold italic outline-none focus:border-blue-500/50" />
       )}
    </div>
  );
}

function Uploader({ label, url, onUpload }) {
  const [u, setU] = useState(false);
  return (
    <div className="space-y-4">
       <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-[0.2em]">{label}</label>
       <div className="relative group/up">
          <div className="flex items-center gap-5 p-6 bg-[#1e293b] rounded-3xl border border-white/5 group-hover/up:border-blue-500/30 transition-all cursor-pointer">
             <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                {u ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Upload size={24} />}
             </div>
             <div>
                <p className="text-white font-black italic text-base">{u ? 'Uploading...' : 'Select New Image'}</p>
                <p className="text-white/20 text-[10px] truncate max-w-[250px] italic">{url || 'No visual selected'}</p>
             </div>
             <input type="file" onChange={async e => { setU(true); await onUpload(e.target.files[0]); setU(false); }} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
          </div>
       </div>
    </div>
  );
}

function Preview({ img, ratio = "aspect-video" }) {
  return (
    <div className={`relative ${ratio} rounded-[3.5rem] overflow-hidden border-8 border-white/5 shadow-2xl bg-[#020617]`}>
       <img src={img || "https://placehold.co/800x450/020617/white?text=Visual+Preview"} className="w-full h-full object-cover" />
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
    </div>
  );
}

function AddBtn({ label, onClick }) {
  return (
    <button onClick={onClick} className="w-full py-16 rounded-[4rem] border-4 border-dashed border-white/5 text-slate-600 hover:border-blue-600/30 hover:text-blue-600 transition-all flex items-center justify-center gap-6 font-black italic text-2xl group">
       <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl"><Plus size={32} /></div>
       {label}
    </button>
  );
}

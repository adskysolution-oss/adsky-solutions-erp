'use client';
import { useState, useEffect } from 'react';
import { 
  Globe, Layout, Settings, Image as ImageIcon, 
  Target, Layers, Palette, Loader2, FileText, 
  CheckCircle2, AlertCircle, X, ShieldCheck
} from 'lucide-react';
import IdentityEditor from '@/components/admin/cms/IdentityEditor';
import PageManager from '@/components/admin/cms/PageManager';

export default function WebsiteCMS() {
  const [activeTab, setActiveTab] = useState('pages');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState({ 
    siteName: '', siteTitle: '', siteDescription: '', 
    contact: { email: '', phone: '', address: '', whatsapp: '' }, 
    logoRoot: '', favicon: '', socialLinks: [], footer: { copyright: '' } 
  });
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showSuccess, setShowSuccess] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cfgRes, pagesRes] = await Promise.all([
        fetch('/api/admin/cms/config'),
        fetch('/api/admin/cms/pages')
      ]);
      const cfg = await cfgRes.json();
      const pgs = await pagesRes.json();
      if (cfg && !cfg.error) setConfig(cfg);
      setPages(Array.isArray(pgs) ? pgs : []);
      if (pgs.length > 0) setSelectedPage(pgs.find(p => p.slug === 'home') || pgs[0]);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const saveConfig = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/cms/config', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(config) 
      });
      setShowSuccess('Global Branding & Contact updated successfully!');
      setTimeout(() => setShowSuccess(''), 3000);
    } catch (e) {} finally { setSaving(false); }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[500px] gap-6 animate-pulse">
      <Loader2 className="animate-spin text-blue-500" size={64} strokeWidth={1} />
      <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">Initializing High-Fidelity CMS Engine...</p>
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto pb-20 px-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-600/20">V2.0 ALPHA</span>
            <h1 className="text-4xl font-black text-white tracking-tighter">Website CMS</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium tracking-tight">AdSky Enterprise ERP • Content & Identity Management Hub</p>
        </div>
        <div className="flex items-center gap-4">
           <a href="/" target="_blank" className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
              View Live Site <Globe size={16} />
           </a>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white rounded-3xl shadow-2xl font-black text-sm animate-in fade-in slide-in-from-top-8 duration-500">
           <CheckCircle2 size={20} /> {showSuccess}
        </div>
      )}

      {/* Tab Management */}
      <div className="flex flex-wrap gap-2 mb-10 p-2 bg-white/2 border border-white/5 rounded-[2rem] w-fit backdrop-blur-3xl shadow-2xl">
        {[
          { id: 'pages', label: 'Pages & Sections', icon: Layout },
          { id: 'branding', label: 'Identity & Brand', icon: Palette },
          { id: 'contact', label: 'Global Contact Sync', icon: Target },
          { id: 'socials', label: 'Social Networks', icon: ShieldCheck },
        ].map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            className={`px-8 py-3.5 rounded-3xl transition-all duration-300 text-xs font-black uppercase tracking-widest flex items-center gap-3 ${
              activeTab === tab.id 
              ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
              : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Main Tab Content Wrapper */}
      <div className="min-h-[600px]">
        {activeTab === 'pages' && (
          <PageManager 
            pages={pages} 
            setPages={setPages} 
            selectedPage={selectedPage} 
            setSelectedPage={setSelectedPage} 
            onSaveSuccess={setShowSuccess}
          />
        )}

        {/* Brand & Identity & Contact Sync (Unified View) */}
        {(activeTab === 'branding' || activeTab === 'contact') && (
          <IdentityEditor 
            config={config} 
            setConfig={setConfig} 
            onSave={saveConfig} 
            saving={saving} 
          />
        )}

        {activeTab === 'socials' && (
           <div className="max-w-xl mx-auto py-20 text-center">
              <ShieldCheck size={64} className="mx-auto text-slate-800 mb-6" />
              <h3 className="text-xl font-black text-slate-500 italic">Advanced Social Integration Coming Soon</h3>
              <p className="text-slate-600 text-sm mt-2">Currently being optimized for Enterprise Scale</p>
           </div>
        )}
      </div>

      {/* Global Bottom Stats Banner (High-Fidelity Touch) */}
      <div className="mt-20 p-8 rounded-[3rem] bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-white/5 flex flex-wrap justify-between items-center gap-8 backdrop-blur-3xl shadow-2xl">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/40">
               <ShieldCheck size={32} />
            </div>
            <div>
               <h4 className="text-xl font-black text-white italic">Enterprise Security Active</h4>
               <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">All changes are versioned and secure</p>
            </div>
         </div>
         <div className="flex gap-12 text-center items-center">
            <div>
               <div className="text-2xl font-black text-white tracking-tighter">{pages.length}</div>
               <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Active Pages</div>
            </div>
            <div className="w-[1px] h-10 bg-white/10"></div>
            <div>
               <div className="text-2xl font-black text-white tracking-tighter">CLOUD</div>
               <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Storage Stack</div>
            </div>
         </div>
      </div>
    </div>
  );
}


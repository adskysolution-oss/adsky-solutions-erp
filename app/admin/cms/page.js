'use client';

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Layers, Plus, FileText, Eye, Edit3, 
  Sparkles, ArrowRight, Database, X, Save, Loader2
} from 'lucide-react';

export default function CMSManagement() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPath, setNewPath] = useState({ title: '', slug: '' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/admin/cms/pages');
      const data = await res.json();
      setPages(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch('/api/admin/cms/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPath)
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchPages();
        setNewPath({ title: '', slug: '' });
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const columns = [
    { key: 'title', label: 'PAGE IDENTITY' },
    { key: 'slug', label: 'URL ENDPOINT' },
    { key: 'isActive', label: 'STATUS', render: (val) => (
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${val ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
        {val ? 'Live' : 'Draft'}
      </span>
    )},
    { key: 'updatedAt', label: 'LAST REVISION', render: (val) => new Date(val).toLocaleDateString() },
  ];

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Globe size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 italic">Content Architecture</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic">CMS Builder.</h1>
          <p className="text-slate-400 font-medium italic mt-1">Manage public pages, dynamic sections, and site-wide branding assets.</p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 px-8 py-4 bg-blue-500 text-white rounded-2xl font-black italic shadow-xl hover:scale-105 transition-all active:scale-95"
        >
          <Plus size={20} /> SPAWN NEW PAGE
        </button>
      </motion.div>

      {/* Stats Tier */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'TOTAL PAGES', value: pages.length, icon: Layers, color: 'text-blue-400' },
          { label: 'LIVE ASSETS', value: pages.filter(p => p.isActive).length, icon: Sparkles, color: 'text-green-400' },
          { label: 'DB CONNECTED', value: 'Synced', icon: Database, color: 'text-purple-400' },
          { label: 'PENDING FORMS', value: '0', icon: FileText, color: 'text-orange-400' },
        ].map((item, idx) => (
          <div key={idx} className="p-8 bg-[#111827] border border-[#1f2937] rounded-[2.5rem] flex flex-col items-center group hover:border-blue-500/20 transition-all">
             <div className={`w-12 h-12 rounded-2xl bg-[#0b1220] flex items-center justify-center ${item.color} mb-6 shadow-xl`}>
                <item.icon size={22} />
             </div>
             <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic mb-1">{item.label}</p>
             <p className="text-2xl font-black text-white italic">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 bg-[#111827] rounded-[3.5rem] border border-[#1f2937]">
          <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
          <p className="text-slate-400 font-black italic uppercase tracking-widest">Hydrating Page Matrix...</p>
        </div>
      ) : (
        <DataTable 
          title="Web Page Inventory" 
          columns={columns} 
          data={pages} 
        />
      )}

      {/* Create Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#111827] w-full max-w-xl rounded-[3rem] border border-[#1f2937] overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-[#1f2937] flex items-center justify-between">
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">Spawn New Page</h3>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white"><X size={20} /></button>
              </div>
              <form onSubmit={handleCreate} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Page Title</label>
                  <input required value={newPath.title} onChange={e => setNewPath({...newPath, title: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl px-6 py-4 text-white font-black italic outline-none focus:border-blue-500 transition-all" placeholder="e.g. Services Overview" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">URL Endpoint (Slug)</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-black italic">/</span>
                    <input required value={newPath.slug} onChange={e => setNewPath({...newPath, slug: e.target.value.replace(/\s+/g, '-').toLowerCase()})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl pl-10 pr-6 py-4 text-white font-black italic outline-none focus:border-blue-500 transition-all" placeholder="services" />
                  </div>
                </div>
                <button disabled={creating} className="w-full bg-blue-500 py-5 rounded-2xl text-white font-black italic uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:bg-blue-600 transition-all disabled:opacity-50 mt-4">
                  {creating ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                  {creating ? 'Spawning...' : 'Initialize New Page'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

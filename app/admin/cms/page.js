'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Settings, 
  Eye, 
  ExternalLink, 
  Edit, 
  Trash2, 
  Layout, 
  ChevronRight,
  Globe,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CMSPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPage, setNewPage] = useState({ title: '', slug: '', description: '' });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/cms/pages');
      const data = await res.json();
      if (!data.error) setPages(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/cms/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPage)
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchPages();
        setNewPage({ title: '', slug: '', description: '' });
      }
    } catch (err) {
      console.error('Create error:', err);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white italic">Website <span className="text-blue-500">CMS</span></h1>
          <p className="text-slate-400 mt-1">Manage your website pages and sections dynamically.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Plus size={20} />
          Add New Page
        </button>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="text-slate-400">Loading website structure...</p>
          </div>
        ) : (
          pages.map((page, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={page._id}
              className="group bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                    <Layout size={24} />
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${page.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {page.isActive ? 'Live' : 'Draft'}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{page.title}</h3>
                <p className="text-slate-500 text-xs font-mono mb-4 italic">/{page.slug}</p>
                <p className="text-slate-400 text-sm line-clamp-2">{page.seo?.description || 'No description provided.'}</p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-all">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-all">
                    <Settings size={16} />
                  </button>
                </div>
                <Link 
                  href={`/admin/cms/edit/${page._id}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase rounded-lg transition-all flex items-center gap-2"
                >
                  Edit Sections
                  <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Create Page Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0F172A] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5">
                <h3 className="text-2xl font-black text-white italic">Create <span className="text-blue-500">Page</span></h3>
                <p className="text-slate-400 text-sm mt-1">Add a new dynamic page to your website.</p>
              </div>

              <form onSubmit={handleCreate} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Page Title</label>
                  <input required value={newPage.title} onChange={e => setNewPage({...newPage, title: e.target.value})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-blue-500/50 outline-none transition-all" placeholder="e.g. About Us" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Slug (URL Path)</label>
                  <input value={newPage.slug} onChange={e => setNewPage({...newPage, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-mono focus:border-blue-500/50 outline-none transition-all" placeholder="e.g. about-us" />
                </div>
                
                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-grow py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all outline-none">Cancel</button>
                  <button type="submit" className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 outline-none font-black uppercase tracking-widest">Create Page</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

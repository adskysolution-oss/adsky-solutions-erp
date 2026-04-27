'use client';

import React, { useState, useEffect, use } from 'react';
import { 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Save, 
  Eye, 
  ArrowLeft,
  Layout,
  Type,
  Image as ImageIcon,
  Layers,
  CheckCircle2,
  Loader2,
  Settings,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function SectionEditor({ params }) {
  const resolvedParams = use(params);
  const pageId = resolvedParams.id;
  
  const [page, setPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  useEffect(() => {
    fetchPageAndSections();
  }, [pageId]);

  const fetchPageAndSections = async () => {
    setLoading(true);
    try {
      const pRes = await fetch(`/api/admin/cms/pages`);
      const allPages = await pRes.json();
      const currentPage = allPages.find(p => p._id === pageId);
      setPage(currentPage);

      const sRes = await fetch(`/api/admin/cms/sections?pageId=${pageId}`);
      const sData = await sRes.json();
      setSections(sData.sort((a, b) => a.order - b.order));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSection = async (type) => {
    setSaving(true);
    const initialData = {
      sectionType: type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      description: 'Enter your content description here...',
      isActive: true,
      order: sections.length
    };

    try {
      const res = await fetch('/api/admin/cms/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId, sectionData: initialData })
      });
      const data = await res.json();
      if (data.success) {
        setSections([...sections, data.section]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateSection = async (sectionData) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/cms/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId, sectionData })
      });
      const data = await res.json();
      if (data.success) {
        setSections(sections.map(s => s._id === data.section._id ? data.section : s).sort((a,b) => a.order - b.order));
        setEditingSection(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSection = async (sId) => {
    if (!confirm('Are you sure you want to delete this section?')) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/cms/sections?id=${sId}`, { method: 'DELETE' });
      if (res.ok) {
        setSections(sections.filter(s => s._id !== sId));
        if (editingSection?._id === sId) setEditingSection(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const moveSection = async (index, direction) => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    // Swap locally
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    
    // Update order locally
    const updatedSections = newSections.map((s, i) => ({ ...s, order: i }));
    setSections(updatedSections);

    // Save all orders to backend
    try {
      await Promise.all(updatedSections.map(s => 
        fetch('/api/admin/cms/sections', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageId, sectionData: { _id: s._id, order: s.order } })
        })
      ));
    } catch (err) {
      console.error('Order save error:', err);
    }
  };

  if (loading) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <Loader2 className="animate-spin text-blue-500" size={48} />
    <p className="text-blue-500 font-black italic tracking-widest animate-pulse">SYNCING ARCHITECTURE...</p>
  </div>;

  return (
    <div className="space-y-8 pb-32">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/admin/cms" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all font-bold text-sm italic uppercase tracking-widest group">
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all group-hover:text-white">
            <ArrowLeft size={18} />
          </div>
          Back to Inventory
        </Link>
        <div className="flex gap-4">
          <Link href={`/${page?.slug === 'home' ? '' : page?.slug}`} target="_blank" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all text-xs italic uppercase tracking-widest">
            <Eye size={18} />
            Live Preview
          </Link>
        </div>
      </div>

      {/* Page Info */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">Edit <span className="text-blue-500">{page?.title}.</span></h1>
        <p className="text-slate-400 mt-2 uppercase text-[10px] font-black tracking-[0.4em] italic opacity-50">Architectural Content Orchestration</p>
      </motion.div>

      {/* Editor Main */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left: Section List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#111827] border border-[#1f2937] rounded-[3rem] p-10 shadow-3xl">
            <div className="flex items-center justify-between mb-12">
               <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] italic">Section Hierarchy</h3>
               <span className="px-4 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black italic border border-blue-500/20">{sections.length} BLOCKS ACTIVE</span>
            </div>
            
            <div className="space-y-6">
              {sections.length === 0 ? (
                <div className="text-center py-24 border-2 border-dashed border-[#1f2937] rounded-[3rem] group hover:border-blue-500/20 transition-all cursor-pointer">
                  <Layers size={48} className="mx-auto text-slate-800 group-hover:text-blue-500 transition-colors mb-6" />
                  <p className="text-white font-black italic uppercase tracking-widest text-sm">ARCHIVE IS EMPTY</p>
                  <p className="text-slate-600 text-xs mt-2 italic font-medium">Click a block below to initialize structural deployment.</p>
                </div>
              ) : (
                sections.map((section, index) => (
                  <motion.div 
                    layout
                    key={section._id}
                    className={`p-8 rounded-[2rem] bg-[#0b1220] border transition-all flex items-center justify-between group ${editingSection?._id === section._id ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-2xl scale-[1.02]' : 'border-[#1f2937] hover:border-white/10'}`}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 font-black italic text-xl border border-white/5 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-white font-black italic text-lg tracking-tight mb-1">{section.title}</h4>
                        <div className="flex items-center gap-3">
                           <span className="text-[9px] font-black uppercase text-blue-500 tracking-widest italic px-2 py-0.5 bg-blue-500/10 rounded-md">{section.sectionType}</span>
                           <span className="text-[9px] font-black uppercase text-slate-600 tracking-widest italic">{section.isActive ? 'Active' : 'Disabled'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-all">
                       <button onClick={() => setEditingSection(section)} className="p-3 bg-white/5 hover:bg-blue-500 text-slate-400 hover:text-white rounded-xl transition-all shadow-xl"><Settings size={18} /></button>
                       <div className="flex flex-col gap-1 mx-2">
                         <button onClick={() => moveSection(index, 'up')} className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-600 hover:text-white rounded-lg transition-all"><ChevronUp size={16} /></button>
                         <button onClick={() => moveSection(index, 'down')} className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-600 hover:text-white rounded-lg transition-all"><ChevronDown size={16} /></button>
                       </div>
                       <button onClick={() => handleDeleteSection(section._id)} className="p-3 bg-white/5 hover:bg-red-500 text-slate-400 hover:text-white rounded-xl transition-all shadow-xl"><Trash2 size={18} /></button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-[#1f2937]">
              {['hero', 'services', 'stats', 'cta', 'latest-blogs', 'testimonials'].map(type => (
                <button 
                  key={type}
                  onClick={() => handleAddSection(type)}
                  disabled={saving}
                  className="py-4 px-4 bg-[#0b1220] border border-[#1f2937] text-slate-500 hover:border-blue-500 hover:text-white hover:bg-blue-600/10 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all italic flex flex-col items-center gap-2 group"
                >
                  <Plus size={16} className="group-hover:scale-125 transition-transform" />
                  ADD {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Section Editor Control */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {editingSection ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#111827] border border-blue-500/30 rounded-[3rem] p-10 h-fit sticky top-8 shadow-4xl"
              >
                <div className="flex items-center justify-between mb-10 pb-8 border-b border-[#1f2937]">
                   <div>
                      <h3 className="text-xl font-black text-white italic tracking-tight">Modify <span className="text-blue-500">Block.</span></h3>
                      <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest italic mt-1">Refining Content Metadata</p>
                   </div>
                   <button onClick={() => setEditingSection(null)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-red-500/10 transition-all"><X size={20} /></button>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2 italic">Main Headline</label>
                    <input 
                      type="text" 
                      value={editingSection.title} 
                      onChange={e => setEditingSection({...editingSection, title: e.target.value})}
                      className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-5 px-6 text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700 font-black italic text-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2 italic">Sub-Description</label>
                    <textarea 
                      rows={6}
                      value={editingSection.description} 
                      onChange={e => setEditingSection({...editingSection, description: e.target.value})}
                      className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-5 px-6 text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700 font-medium italic leading-relaxed text-sm"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2 italic">Media/Image URL</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                      <input 
                        type="text" 
                        value={editingSection.image || ''} 
                        onChange={e => setEditingSection({...editingSection, image: e.target.value})}
                        className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-5 pl-14 pr-6 text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700 font-mono text-xs"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => handleUpdateSection(editingSection)}
                    disabled={saving}
                    className="w-full py-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black uppercase tracking-[0.3em] rounded-3xl transition-all shadow-3xl shadow-blue-600/20 flex items-center justify-center gap-4 mt-8 italic text-xs"
                  >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Authorize Changes
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-[#111827] border border-[#1f2937] border-dashed rounded-[3rem] p-16 text-center flex flex-col items-center justify-center gap-6 opacity-30 h-[500px]">
                <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center text-slate-800">
                  <Layout size={48} />
                </div>
                <div>
                  <p className="text-white font-black italic uppercase tracking-widest text-xs mb-2">Editor Dormant</p>
                  <p className="text-slate-600 font-medium italic text-[11px] leading-relaxed max-w-[200px] mx-auto">Select a section block from the hierarchy to initiate customization.</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

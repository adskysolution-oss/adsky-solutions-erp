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
  Settings
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
      // Get Page
      const pRes = await fetch(`/api/admin/cms/pages`);
      const allPages = await pRes.json();
      const currentPage = allPages.find(p => p._id === pageId);
      setPage(currentPage);

      // Get Sections
      const sRes = await fetch(`/api/admin/cms/sections?pageId=${pageId}`);
      const sData = await sRes.json();
      setSections(sData);
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
      isActive: true
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
        setSections(sections.map(s => s._id === data.section._id ? data.section : s));
        setEditingSection(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;

  return (
    <div className="space-y-8 pb-32">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/admin/cms" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all font-bold text-sm">
          <ArrowLeft size={18} />
          Back to Pages
        </Link>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all text-sm">
            <Eye size={18} />
            Preview Page
          </button>
        </div>
      </div>

      {/* Page Info */}
      <div>
        <h1 className="text-3xl font-black text-white italic">Editing <span className="text-blue-500">{page?.title}</span></h1>
        <p className="text-slate-400 mt-1 uppercase text-[10px] font-black tracking-widest">Customizing Content Blocks</p>
      </div>

      {/* Editor Main */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left: Section List (Reorderable) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-8">Page Structure</h3>
            
            <div className="space-y-4">
              {sections.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl group hover:border-blue-500/20 transition-all cursor-pointer">
                  <Layers size={40} className="mx-auto text-slate-600 group-hover:text-blue-500 transition-colors mb-4" />
                  <p className="text-slate-500 font-bold">No sections added to this page.</p>
                  <p className="text-slate-600 text-xs mt-1 italic">Click "Add Section" to start building.</p>
                </div>
              ) : (
                sections.map((section, index) => (
                  <motion.div 
                    layout
                    key={section._id}
                    className={`p-6 rounded-2xl bg-[#0F172A] border transition-all flex items-center justify-between ${editingSection?._id === section._id ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-white/10'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm tracking-tight">{section.title}</h4>
                        <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">{section.sectionType}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <button onClick={() => setEditingSection(section)} className="p-2 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-all"><Settings size={18} /></button>
                       <div className="flex flex-col gap-1 mx-2">
                         <button className="p-1 hover:bg-white/10 text-slate-600 hover:text-white rounded transition-all"><ChevronUp size={14} /></button>
                         <button className="p-1 hover:bg-white/10 text-slate-600 hover:text-white rounded transition-all"><ChevronDown size={14} /></button>
                       </div>
                       <button className="p-2 hover:bg-red-500/10 text-slate-600 hover:text-red-400 rounded-lg transition-all"><Trash2 size={18} /></button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['hero', 'features', 'stats', 'cta'].map(type => (
                <button 
                  key={type}
                  onClick={() => handleAddSection(type)}
                  className="py-3 px-4 bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  + Add {type}
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 h-fit sticky top-8"
              >
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                  <h3 className="text-lg font-black text-white italic">Edit <span className="text-blue-500">Block</span></h3>
                  <button onClick={() => setEditingSection(null)} className="text-slate-500 hover:text-white transition-all"><XCircle size={18} /></button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Section Heading</label>
                    <input 
                      type="text" 
                      value={editingSection.title} 
                      onChange={e => setEditingSection({...editingSection, title: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Description / Text</label>
                    <textarea 
                      rows={4}
                      value={editingSection.description} 
                      onChange={e => setEditingSection({...editingSection, description: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600 text-sm leading-relaxed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Image URL</label>
                    <input 
                      type="text" 
                      value={editingSection.image || ''} 
                      onChange={e => setEditingSection({...editingSection, image: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600 text-xs font-mono"
                      placeholder="https://..."
                    />
                  </div>

                  <button 
                    onClick={() => handleUpdateSection(editingSection)}
                    disabled={saving}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-3 mt-8 active:scale-95"
                  >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Save Changes
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/5 border border-white/10 border-dashed rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center gap-4 opacity-50">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <Type size={32} className="text-slate-600" />
                </div>
                <p className="text-slate-500 font-bold text-sm tracking-tight italic">Select a section block to begin editing its content.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

function XCircle({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

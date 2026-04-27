'use client';

import React, { useState, useEffect, use, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Save, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Layout,
  Type,
  Image as ImageIcon,
  Layers,
  CheckCircle2,
  Loader2,
  Settings,
  X,
  Upload,
  Sparkles,
  List as ListIcon,
  PlusCircle
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
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

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
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Block`,
      description: 'Enter your content description here...',
      isActive: true,
      order: sections.length,
      items: []
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
        setEditingSection(data.section);
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

  const toggleVisibility = async (section) => {
    const updated = { ...section, isActive: !section.isActive };
    setSections(sections.map(s => s._id === section._id ? updated : s));
    try {
      await fetch('/api/admin/cms/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId, sectionData: { _id: section._id, isActive: !section.isActive } })
      });
    } catch (err) {
      console.error(err);
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

  const handleFileUpload = async (e, itemIndex = null) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        if (itemIndex !== null) {
          const newItems = [...editingSection.items];
          newItems[itemIndex].image = data.url;
          setEditingSection({ ...editingSection, items: newItems });
        } else {
          setEditingSection({ ...editingSection, image: data.url });
        }
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleAddItem = () => {
    const newItem = { title: 'New Item', subtitle: 'Subtitle', description: 'Description', count: '', image: '' };
    setEditingSection({ ...editingSection, items: [...(editingSection.items || []), newItem] });
  };

  const handleUpdateItem = (index, field, value) => {
    const newItems = [...editingSection.items];
    newItems[index][field] = value;
    setEditingSection({ ...editingSection, items: newItems });
  };

  const handleRemoveItem = (index) => {
    const newItems = editingSection.items.filter((_, i) => i !== index);
    setEditingSection({ ...editingSection, items: newItems });
  };

  const moveSection = async (index, direction) => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    const updatedSections = newSections.map((s, i) => ({ ...s, order: i }));
    setSections(updatedSections);

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
    <p className="text-blue-500 font-black italic tracking-widest animate-pulse">SYNCHRONIZING REPOSITORY...</p>
  </div>;

  return (
    <div className="space-y-8 pb-32">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/admin/cms" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all font-bold text-sm italic uppercase tracking-widest group">
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all group-hover:text-white">
            <ArrowLeft size={18} />
          </div>
          Return to Inventory
        </Link>
        <div className="flex gap-4">
          <Link href={`/${page?.slug === 'home' ? '' : page?.slug}`} target="_blank" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all text-xs italic uppercase tracking-widest">
            <Eye size={18} />
            View Live Site
          </Link>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">Edit <span className="text-blue-500">{page?.title}</span></h1>
        <p className="text-slate-400 mt-2 uppercase text-[10px] font-black tracking-[0.4em] italic opacity-50">Content Block Management & Orchestration</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left: Section List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[#111827] border border-[#1f2937] rounded-[3rem] p-8 shadow-3xl">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] italic">Section Hierarchy</h3>
            </div>
            
            <div className="space-y-4">
              {sections.map((section, index) => (
                <motion.div 
                  layout
                  key={section._id}
                  onClick={() => setEditingSection(section)}
                  className={`p-6 rounded-[2rem] bg-[#0b1220] border transition-all flex items-center justify-between group cursor-pointer ${editingSection?._id === section._id ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-2xl scale-[1.02]' : 'border-[#1f2937] hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 font-black italic text-sm border border-white/5 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-black italic text-sm tracking-tight group-hover:text-blue-400 transition-colors">{section.title}</h4>
                      <div className="flex items-center gap-2">
                         <span className="text-[8px] font-black uppercase text-blue-500 tracking-widest italic px-2 py-0.5 bg-blue-500/10 rounded-md">{section.sectionType}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                     <button onClick={(e) => { e.stopPropagation(); toggleVisibility(section); }} className={`p-2 rounded-lg transition-all ${section.isActive ? 'text-slate-400 hover:text-white' : 'text-red-500'}`}>
                        {section.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                     </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 pt-8 border-t border-[#1f2937]">
              {['hero', 'stats', 'services', 'job-grid', 'steps', 'strategy', 'cta'].map(type => (
                <button 
                  key={type}
                  onClick={() => handleAddSection(type)}
                  className="py-3 bg-[#0b1220] border border-[#1f2937] text-slate-500 hover:border-blue-500 hover:text-white hover:bg-blue-600/10 rounded-xl text-[7px] font-black uppercase tracking-widest transition-all italic flex flex-col items-center gap-1 group"
                >
                  <Plus size={12} />
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle/Right: Section Editor Control */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {editingSection ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-[#111827] border border-blue-500/30 rounded-[3rem] p-10 shadow-4xl"
              >
                <div className="flex items-center justify-between mb-10 pb-8 border-b border-[#1f2937]">
                   <div>
                      <h3 className="text-xl font-black text-white italic tracking-tight">Configuration Hub <span className="text-blue-500">({editingSection.sectionType}).</span></h3>
                   </div>
                   <div className="flex gap-3">
                      <button onClick={() => handleDeleteSection(editingSection._id)} className="px-5 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase italic">Delete Node</button>
                      <button onClick={() => setEditingSection(null)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all"><X size={20} /></button>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-2 italic">Main Header</label>
                      <input 
                        type="text" 
                        value={editingSection.title} 
                        onChange={e => setEditingSection({...editingSection, title: e.target.value})}
                        className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all font-black italic"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-2 italic">Detailed Narrative</label>
                      <textarea 
                        rows={4}
                        value={editingSection.description} 
                        onChange={e => setEditingSection({...editingSection, description: e.target.value})}
                        className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all font-medium italic text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-2 italic">Global Media Asset</label>
                      <div className="flex gap-4">
                         <button onClick={() => fileInputRef.current.click()} className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black italic uppercase text-[9px] flex items-center gap-2 hover:bg-blue-500 transition-all flex-grow">
                           <Upload size={14} /> Upload Image
                         </button>
                      </div>
                      <input type="file" ref={fileInputRef} onChange={(e) => handleFileUpload(e)} className="hidden" />
                      <input 
                        type="text" 
                        placeholder="Or direct asset URL..."
                        value={editingSection.image || ''} 
                        onChange={e => setEditingSection({...editingSection, image: e.target.value})}
                        className="w-full bg-[#0b1220] border border-[#1f2937] rounded-xl py-3 px-6 text-white text-[10px] font-mono mt-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-center justify-between">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-2 italic">Node Items (Lists)</label>
                        <button onClick={handleAddItem} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-[9px] font-black uppercase italic flex items-center gap-2"><PlusCircle size={14} /> Add Item</button>
                     </div>
                     
                     <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                        {editingSection.items?.map((item, idx) => (
                          <div key={idx} className="p-6 rounded-2xl bg-[#0b1220] border border-[#1f2937] space-y-4 relative group">
                             <button onClick={() => handleRemoveItem(idx)} className="absolute top-4 right-4 text-slate-700 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
                             <input 
                               type="text" 
                               value={item.title} 
                               placeholder="Item Title"
                               onChange={e => handleUpdateItem(idx, 'title', e.target.value)}
                               className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white font-black italic text-xs"
                             />
                             <textarea 
                               placeholder="Item Description"
                               value={item.description} 
                               onChange={e => handleUpdateItem(idx, 'description', e.target.value)}
                               className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white italic text-xs"
                             />
                             <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  placeholder="Tag/Count"
                                  value={item.subtitle || item.count || ''} 
                                  onChange={e => handleUpdateItem(idx, 'subtitle', e.target.value)}
                                  className="w-1/2 bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white text-[10px] font-black italic"
                                />
                                <button onClick={() => {
                                  const inp = document.createElement('input');
                                  inp.type = 'file';
                                  inp.onchange = (e) => handleFileUpload(e, idx);
                                  inp.click();
                                }} className="w-1/2 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all text-[9px] font-black uppercase italic flex items-center justify-center gap-2"><Upload size={12} /> Asset</button>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleUpdateSection(editingSection)}
                  disabled={saving}
                  className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.3em] rounded-3xl transition-all shadow-3xl shadow-blue-600/20 flex items-center justify-center gap-4 mt-12 italic text-xs"
                >
                  {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  Commit Changes to Ledger
                </button>
              </motion.div>
            ) : (
              <div className="bg-[#111827] border border-[#1f2937] border-dashed rounded-[3rem] p-16 text-center flex flex-col items-center justify-center gap-6 opacity-30 h-full">
                <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center text-slate-800">
                  <Sparkles size={48} />
                </div>
                <p className="text-white font-black italic uppercase tracking-widest text-xs">Select a segment to initiate reconfiguration.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

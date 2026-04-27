'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, Loader2, Plus, Trash2, ArrowUp, ArrowDown, 
  Edit, Layout, Globe, Search, Type, Image as ImageIcon,
  MousePointer2, Layers, ChevronRight, CheckCircle, AlertCircle
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function PageEditor() {
  const { id } = useParams();
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPage();
  }, [id]);

  const fetchPage = async () => {
    try {
      const res = await fetch(`/api/admin/cms/pages/${id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPage(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      router.push('/admin/cms');
    }
  };

  const handleUpdateSection = async (sectionId, sectionData) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/cms/pages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', sectionId, sectionData })
      });
      const data = await res.json();
      if (data.success) {
        fetchPage();
        setMessage('Section updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSection = async (sectionType) => {
    setSaving(true);
    const sectionData = {
      sectionType,
      title: 'New ' + sectionType + ' Section',
      subtitle: 'Change this subtitle in the editor',
      description: 'Add your content here...',
      styling: { backgroundColor: '#ffffff', textColor: '#000000' }
    };

    try {
      const res = await fetch(`/api/admin/cms/pages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', sectionData })
      });
      const data = await res.json();
      if (data.success) {
        setShowAddSection(false);
        fetchPage();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!confirm('Are you sure you want to delete this section?')) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/cms/pages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', sectionId })
      });
      const data = await res.json();
      if (data.success) fetchPage();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-[#0b1220]"><Loader2 className="animate-spin text-blue-500" size={48} /></div>;

  return (
    <div className="min-h-screen bg-[#0b1220] flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar: Section List */}
      <aside className="w-full md:w-80 bg-[#111827] border-r border-[#1f2937] flex flex-col h-screen">
        <div className="p-6 border-b border-[#1f2937] bg-[#0b1220]/50">
          <button onClick={() => router.push('/admin/cms')} className="text-slate-500 hover:text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-4">
            <Globe size={14} /> Back to Inventory
          </button>
          <h2 className="text-2xl font-black text-white italic truncate">{page.title}</h2>
          <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest">{page.slug}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-4">Page Sections</p>
          {page.sections?.map((section, idx) => (
            <motion.div 
              key={section._id}
              onClick={() => setActiveSection(section)}
              className={`p-4 rounded-2xl cursor-pointer border transition-all flex items-center justify-between group ${
                activeSection?._id === section._id 
                ? 'bg-blue-500 border-blue-400 shadow-xl shadow-blue-500/20' 
                : 'bg-[#1f2937] border-[#1f2937] hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeSection?._id === section._id ? 'bg-white/20' : 'bg-[#0b1220]'}`}>
                  <Layers size={14} className={activeSection?._id === section._id ? 'text-white' : 'text-blue-400'} />
                </div>
                <div>
                  <p className={`text-xs font-black uppercase tracking-tight ${activeSection?._id === section._id ? 'text-white' : 'text-slate-300'}`}>
                    {section.sectionType}
                  </p>
                  <p className={`text-[9px] font-medium truncate w-32 ${activeSection?._id === section._id ? 'text-blue-100' : 'text-slate-500'}`}>
                    {section.title || 'Untitled'}
                  </p>
                </div>
              </div>
              <ChevronRight size={14} className={activeSection?._id === section._id ? 'text-white' : 'text-slate-600'} />
            </motion.div>
          ))}

          <button 
            onClick={() => setShowAddSection(true)}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-[#1f2937] text-slate-500 flex items-center justify-center gap-2 hover:bg-white/5 hover:border-slate-700 transition-all font-black text-xs uppercase tracking-widest"
          >
            <Plus size={16} /> Add New Section
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#0b1220] p-6 md:p-12 relative">
        <AnimatePresence>
          {activeSection ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
              <header className="flex items-center justify-between mb-10 pb-6 border-b border-[#1f2937]">
                <div>
                  <h3 className="text-3xl font-black text-white italic">Edit {activeSection.sectionType} Section</h3>
                  <p className="text-slate-500 text-xs font-medium italic mt-1">Section ID: {activeSection._id}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleDeleteSection(activeSection._id)} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl">
                    <Trash2 size={20} />
                  </button>
                  <button onClick={() => handleUpdateSection(activeSection._id, activeSection)} disabled={saving} className="flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-2xl font-black italic shadow-2xl hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50">
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {saving ? 'UPDATING...' : 'COMMIT CHANGES'}
                  </button>
                </div>
              </header>

              {message && (
                <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-400 font-black italic text-sm">
                  <CheckCircle size={18} /> {message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Text Fields */}
                <div className="space-y-6">
                  <InputGroup label="Main Title" value={activeSection.title} onChange={v => setActiveSection({...activeSection, title: v})} />
                  <InputGroup label="Subtitle / Badge" value={activeSection.subtitle} onChange={v => setActiveSection({...activeSection, subtitle: v})} />
                  <TextAreaGroup label="Description Content" value={activeSection.description} onChange={v => setActiveSection({...activeSection, description: v})} />
                </div>

                {/* Media & Style Fields */}
                <div className="space-y-6">
                  <InputGroup label="Section Image URL" icon={ImageIcon} value={activeSection.image} onChange={v => setActiveSection({...activeSection, image: v})} />
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Background Color" type="color" value={activeSection.styling?.backgroundColor} onChange={v => setActiveSection({...activeSection, styling: {...activeSection.styling, backgroundColor: v}})} />
                    <InputGroup label="Text Color" type="color" value={activeSection.styling?.textColor} onChange={v => setActiveSection({...activeSection, styling: {...activeSection.styling, textColor: v}})} />
                  </div>
                  <div className="p-6 bg-[#111827] rounded-3xl border border-[#1f2937]">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Preview Info</p>
                    <p className="text-white font-medium text-xs">This section will use the <span className="text-blue-500 font-black">{activeSection.sectionType}</span> renderer component on the frontend.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-slate-700">
                <MousePointer2 size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white italic">SELECT A SECTION TO EDIT</h3>
                <p className="text-slate-500 font-medium italic mt-2">Choose a section from the left sidebar to start modifying content.</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Add Section Modal */}
      <AnimatePresence>
        {showAddSection && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#111827] w-full max-w-2xl rounded-[3rem] border border-[#1f2937] overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-[#1f2937] flex items-center justify-between bg-[#0b1220]/50">
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">Add Content Section</h3>
                <button onClick={() => setShowAddSection(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[60vh]">
                {['hero', 'about', 'services', 'stats', 'banner', 'features', 'cta', 'gallery'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => handleAddSection(type)}
                    className="flex flex-col items-center justify-center p-6 bg-[#1f2937] border border-transparent rounded-3xl hover:border-blue-500 hover:bg-blue-500/10 transition-all group"
                  >
                    <div className="w-12 h-12 bg-[#0b1220] rounded-2xl flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                      <Layout size={20} />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{type}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InputGroup({ label, value, onChange, icon: Icon, type = "text" }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic flex items-center gap-2">
        {Icon && <Icon size={12} />} {label}
      </label>
      <input 
        type={type}
        className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl px-6 py-4 text-white font-black italic outline-none focus:border-blue-500 transition-all"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TextAreaGroup({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{label}</label>
      <textarea 
        className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl px-6 py-4 text-white font-black italic outline-none focus:border-blue-500 transition-all min-h-[150px]"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

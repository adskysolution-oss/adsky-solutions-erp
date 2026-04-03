'use client';
import { useState, useEffect } from 'react';
import { 
  Layout, Plus, Trash2, Edit3, Eye, ArrowUp, ArrowDown, 
  Save, Loader2, X, Layers, CheckCircle2, AlertCircle 
} from 'lucide-react';
import ImageUpload from './ImageUpload';

const SECTION_TYPES = [
  { type: 'hero', label: 'Hero / Banner', icon: '🚀', desc: 'Main banner with title, subtitle, and CTA' },
  { type: 'stats', label: 'Stats Counter', icon: '📊', desc: 'Animated counter metrics section' },
  { type: 'features', label: 'Feature Grid', icon: '✨', desc: 'Grid of features with icons' },
  { type: 'services', label: 'Services Grid', icon: '🔧', desc: 'Service offerings card layout' },
  { type: 'about', label: 'About Section', icon: '👥', desc: 'Company story with image and text' },
  { type: 'gallery', label: 'Photo Gallery', icon: '🖼️', desc: 'Masonry/grid photo gallery' },
  { type: 'cta', label: 'Call to Action', icon: '🎯', desc: 'Bold CTA with button' },
];

export default function PageManager({ pages, setPages, selectedPage, setSelectedPage, onSaveSuccess }) {
  const [sections, setSections] = useState([]);
  const [editingSection, setEditingSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showAddPage, setShowAddPage] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [newPage, setNewPage] = useState({ title: '', slug: '' });

  useEffect(() => {
    if (selectedPage) fetchSections(selectedPage.slug);
  }, [selectedPage?._id]);

  const fetchSections = async (slug) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/cms/pages?slug=${slug}`);
      const data = await res.json();
      setSections(data?.sections || []);
    } catch (e) { setSections([]); } finally { setLoading(false); }
  };

  const createPage = async () => {
    if (!newPage.title || !newPage.slug) return alert('Title and Slug are required');
    try {
      const res = await fetch('/api/admin/cms/pages', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(newPage) 
      });
      const created = await res.json();
      setPages([...pages, created]);
      setShowAddPage(false);
      setNewPage({ title: '', slug: '' });
      onSaveSuccess('Page created successfully!');
    } catch (e) { alert('Failed to create page'); }
  };

  const deletePage = async (id) => {
    if (!confirm('Delete this page permanently?')) return;
    await fetch(`/api/admin/cms/pages?id=${id}`, { method: 'DELETE' });
    setPages(pages.filter(p => p._id !== id));
    if (selectedPage?._id === id) { setSelectedPage(null); setSections([]); }
  };

  const addSection = async (type) => {
    const defaultData = {
      sectionType: type,
      sectionId: `${type}-${Date.now()}`,
      title: `New ${type.toUpperCase()} Section`,
      description: 'Edit this description...',
      items: [],
      metadata: { isPublished: true, order: sections.length }
    };
    try {
      const secRes = await fetch('/api/admin/cms/sections', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(defaultData) });
      const newSec = await secRes.json();
      const updatedSections = [...sections.map(s => s._id || s), newSec._id];
      await fetch('/api/admin/cms/pages', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: selectedPage._id, sections: updatedSections }) });
      setSections([...sections, newSec]);
      setShowAddSection(false);
      setEditingSection(newSec);
    } catch (e) { alert('Failed to add section'); }
  };

  const saveSection = async (sec) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/cms/sections', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: sec._id, ...sec }) });
      const updated = await res.json();
      setSections(sections.map(s => s._id === updated._id ? updated : s));
      setEditingSection(updated);
      onSaveSuccess('Section saved!');
    } catch (e) { alert('Save failed'); } finally { setSaving(false); }
  };

  const deleteSection = async (id) => {
    if (!confirm('Delete this section?')) return;
    await fetch(`/api/admin/cms/sections?id=${id}`, { method: 'DELETE' });
    setSections(sections.filter(s => s._id !== id));
    if (editingSection?._id === id) setEditingSection(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_400px] gap-8 h-[calc(100vh-280px)] min-h-[600px] animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Left: Page List */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-4 overflow-hidden">
        <h4 className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest px-2">
          <Layout size={14} /> Active Pages
        </h4>
        <div className="flex-1 overflow-y-auto pr-2 space-y-2">
          {pages.map(page => (
            <button 
              key={page._id}
              onClick={() => setSelectedPage(page)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                selectedPage?._id === page._id 
                ? 'bg-blue-600 border-blue-400 shadow-xl shadow-blue-600/20 scale-[1.02]' 
                : 'bg-white/2 border-white/5 hover:bg-white/5'
              }`}
            >
              <div className={`text-sm font-bold ${selectedPage?._id === page._id ? 'text-white' : 'text-slate-200'}`}>{page.title}</div>
              <div className={`text-[10px] mt-1 ${selectedPage?._id === page._id ? 'text-blue-100/60' : 'text-slate-500'}`}>/{page.slug}</div>
            </button>
          ))}
        </div>
        <button 
          onClick={() => setShowAddPage(true)}
          className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={16} /> New Page
        </button>
      </div>

      {/* Middle: Section Builder */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-6 overflow-hidden relative">
        {!selectedPage ? (
          <EmptyState icon={Layers} text="Select a page to build content" />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-white">{selectedPage.title}</h3>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Page Structure • {sections.length} Sections</p>
              </div>
              <button 
                onClick={() => setShowAddSection(true)}
                className="px-6 py-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-600/20 text-xs font-bold uppercase tracking-widest hover:bg-blue-600/20 transition-all flex items-center gap-2 shadow-2xl"
              >
                <Plus size={14} /> Add Section
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 space-y-3">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2 className="animate-spin text-blue-600" size={32} />
                </div>
              ) : sections.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2.5rem] text-slate-500 gap-4">
                   <Plus size={48} className="opacity-10" />
                   <p className="font-bold text-sm">Create your first section</p>
                </div>
              ) : (
                sections.map((sec, i) => (
                  <div 
                    key={sec._id || i}
                    onClick={() => setEditingSection(sec)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                      editingSection?._id === sec._id 
                      ? 'bg-indigo-600/10 border-indigo-500/30' 
                      : 'bg-white/2 border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                       <span className="text-xs font-black text-slate-600 w-6">{i+1}</span>
                       <div>
                          <div className="text-sm font-bold text-white group-hover:translate-x-1 transition-transform">{sec.title || 'Untitled Section'}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-black">{sec.sectionType}</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500"><ArrowUp size={14} /></button>
                       <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500"><ArrowDown size={14} /></button>
                       <button 
                        onClick={(e) => { e.stopPropagation(); deleteSection(sec._id); }}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-red-500"
                       >
                        <Trash2 size={14} />
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Right: Section Editor */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-8 overflow-y-auto">
        {editingSection ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
             <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Editor</h3>
                <span className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 text-[10px] font-black uppercase tracking-widest">{editingSection.sectionType}</span>
             </div>

             <div className="space-y-6">
                <Field label="SECTION TITLE" value={editingSection.title} onChange={(v) => setEditingSection({...editingSection, title: v})} />
                <Field label="SUBTITLE" value={editingSection.subtitle} onChange={(v) => setEditingSection({...editingSection, subtitle: v})} />
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">BODY CONTENT</label>
                  <textarea 
                    rows={6}
                    value={editingSection.description || ''}
                    onChange={(e) => setEditingSection({...editingSection, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none leading-relaxed"
                  />
                </div>
                {['hero', 'about', 'cta'].includes(editingSection.sectionType) && (
                   <ImageUpload label="BACKGROUND / MAIN IMAGE" value={editingSection.image} onChange={(v) => setEditingSection({...editingSection, image: v})} />
                )}
             </div>

             <button 
                onClick={() => saveSection(editingSection)}
                disabled={saving}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                SAVE SECTION
              </button>
          </div>
        ) : (
          <EmptyState icon={Edit3} text="Select a section to edit its content" />
        )}
      </div>

      {/* Add Page Modal */}
      {showAddPage && (
        <div className="fixed inset-0 bg-[#020617]/95 z-[100] backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-300">
           <div className="bg-[#0f172a] border border-white/10 rounded-[3rem] p-10 w-full max-w-lg shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>
              <button 
                onClick={() => setShowAddPage(false)}
                className="absolute top-6 right-6 p-3 hover:bg-white/5 rounded-2xl text-slate-500"
              ><X size={24} /></button>
              
              <h2 className="text-3xl font-black text-white mb-2">New Page</h2>
              <p className="text-slate-500 text-sm mb-10">Create a new dynamic page for your website.</p>

              <div className="space-y-6">
                <Field label="PAGE TITLE" value={newPage.title} onChange={(v) => setNewPage({...newPage, title: v, slug: v.toLowerCase().replace(/\s+/g, '-')})} />
                <Field label="SLUG (URL)" value={newPage.slug} onChange={(v) => setNewPage({...newPage, slug: v})} />
                <button 
                  onClick={createPage}
                  className="w-full py-5 rounded-[2rem] bg-white text-black font-black text-lg shadow-2xl hover:bg-blue-300 transition-all mt-4"
                >BUILD PAGE</button>
              </div>
           </div>
        </div>
      )}

      {/* Section Picker Modal */}
      {showAddSection && (
        <div className="fixed inset-0 bg-[#020617]/98 z-[100] backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-300">
           <div className="bg-[#0f172a] border border-white/5 rounded-[4rem] p-12 w-full max-w-4xl shadow-[0_0_100px_rgba(0,0,0,0.5)] max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-12">
                <div>
                   <h2 className="text-4xl font-black text-white tracking-tight">Add Section</h2>
                   <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Pick a professional component</p>
                </div>
                <button onClick={() => setShowAddSection(false)} className="p-4 bg-white/5 rounded-3xl text-slate-400 hover:text-white transition-all"><X size={32} /></button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SECTION_TYPES.map(s => (
                  <button 
                    key={s.type} 
                    onClick={() => addSection(s.type)}
                    className="p-8 rounded-[2.5rem] bg-white/2 border border-white/5 text-left group hover:bg-blue-600 hover:border-blue-400 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                  >
                    <div className="text-4xl mb-6 transform group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500">{s.icon}</div>
                    <div className="text-lg font-black text-white mb-2">{s.label}</div>
                    <p className="text-xs text-slate-500 group-hover:text-blue-100/70 leading-relaxed font-medium">{s.desc}</p>
                  </button>
                ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">{label}</label>
      <input 
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
      />
    </div>
  );
}

function EmptyState({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center p-20 text-slate-600 gap-4 text-center h-full">
      <Icon size={80} strokeWidth={0.5} className="opacity-10 mb-2" />
      <p className="text-lg font-black italic">{text}</p>
      <p className="text-[10px] uppercase tracking-widest font-black opacity-40">AdSky Enterprise ERP Module</p>
    </div>
  );
}

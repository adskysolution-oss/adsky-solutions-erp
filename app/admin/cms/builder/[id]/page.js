'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Plus, 
  MoreVertical, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ChevronRight, 
  Settings, 
  Layers, 
  Search, 
  Globe, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  X, 
  Trash2, 
  GripVertical
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { getAllTemplates } from '@/lib/cms/templates';
import Link from 'next/link';

export default function VisualWorkbench({ params }) {
  const [sections, setSections] = useState([
    { id: '1', type: 'hero_v1', props: { headline: 'Default Hero' }, styles: { background: '#2563EB' } },
    { id: '2', type: 'text_block', props: { title: 'Purpose', content: 'Demo' }, styles: { background: '#FFFFFF' } }
  ]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [showLibrary, setShowLibrary] = useState(false);

  const templates = getAllTemplates();

  const addSection = (template) => {
    const newSection = {
      ...template,
      id: `SEC-${Date.now()}`
    };
    setSections([...sections, newSection]);
    setShowLibrary(false);
  };

  const removeSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
    if (selectedSectionId === id) setSelectedSectionId(null);
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Builder Sidebar (Left) - Structure & Library */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col z-50">
         <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <Link href="/admin/cms/builder" className="text-slate-400 hover:text-sky-600 transition-colors">
               <ArrowLeft size={20} />
            </Link>
            <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic leading-none">Architect Hub</h2>
            <button className="p-2 text-slate-300 hover:text-sky-600"><Settings size={18} /></button>
         </div>

         <div className="flex-grow overflow-y-auto p-6 scroll-none">
            <div className="flex items-center justify-between mb-8 px-2">
               <h3 className="text-[11px] font-black uppercase text-slate-900 tracking-tight italic">Page Stack</h3>
               <button onClick={() => setShowLibrary(true)} className="p-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-600 hover:text-white transition-all shadow-sm">
                  <Plus size={16} />
               </button>
            </div>

            <Reorder.Group axis="y" values={sections} onReorder={setSections} className="space-y-4">
               {sections.map((section) => (
                 <Reorder.Item 
                   key={section.id} 
                   value={section}
                   onClick={() => setSelectedSectionId(section.id)}
                   className={`p-5 rounded-3xl border cursor-pointer transition-all flex items-center justify-between group ${selectedSectionId === section.id ? 'bg-sky-50 border-sky-600 shadow-lg shadow-sky-500/5' : 'bg-white border-slate-100 hover:border-sky-300'}`}
                 >
                    <div className="flex items-center gap-4">
                       <GripVertical size={16} className="text-slate-200 group-hover:text-slate-400 cursor-grab" />
                       <div>
                          <p className="text-[10px] font-black text-slate-900 tracking-tight italic leading-none uppercase">{section.type.replace('_', ' ')}</p>
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">ID: {section.id.slice(-4)}</span>
                       </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
                      className="p-1.5 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all"
                    >
                       <X size={14} />
                    </button>
                 </Reorder.Item>
               ))}
            </Reorder.Group>
         </div>
      </div>

      {/* Main Preview Loop (Middle) */}
      <div className="flex-grow flex flex-col">
         {/* Builder Top Bar */}
         <div className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between">
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-100">
               {[
                 { id: 'mobile', icon: Smartphone },
                 { id: 'tablet', icon: Tablet },
                 { id: 'desktop', icon: Monitor }
               ].map(device => (
                 <button 
                   key={device.id}
                   onClick={() => setActiveDevice(device.id)}
                   className={`p-2.5 rounded-xl transition-all ${activeDevice === device.id ? 'bg-white text-sky-600 shadow-lg border border-slate-50' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                    <device.icon size={18} />
                 </button>
               ))}
            </div>

            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-white transiton-all">
                  <Eye size={16} /> Live Preview
               </button>
               <button className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
                  <Save size={16} /> Commit Changes
               </button>
            </div>
         </div>

         {/* Canvas Area */}
         <div className="flex-grow overflow-y-auto bg-slate-200/50 p-16 custom-scrollbar scroll-smooth">
            <div 
              className={`bg-white shadow-2xl mx-auto transition-all duration-700 min-h-screen relative overflow-hidden ${activeDevice === 'mobile' ? 'w-[375px]' : activeDevice === 'tablet' ? 'w-[768px]' : 'w-full max-w-6xl rounded-[3rem]'}`}
            >
               {sections.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center p-20 text-center opacity-40">
                    <Layers size={80} className="text-slate-300 mb-8" />
                    <h4 className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase italic px-10 leading-tight underline decoration-sky-100 underline-offset-8">Canvas Optimized & Clear</h4>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mt-8">Provision your first Mission Section from the library</p>
                 </div>
               ) : (
                 <div className="divide-y-0 divide-slate-50">
                   {sections.map(section => (
                     <div 
                       key={section.id} 
                       className={`relative group/sec transition-all ${selectedSectionId === section.id ? 'ring-4 ring-sky-500 ring-inset ring-offset-0' : 'hover:ring-2 hover:ring-sky-200'}`}
                       onClick={(e) => { e.stopPropagation(); setSelectedSectionId(section.id); }}
                     >
                        {/* Section Mockup Rendering */}
                        <div style={{ background: section.styles.background }} className="p-20 text-center min-h-[300px] flex items-center justify-center">
                           <div>
                              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 italic leading-none opacity-40">Section Prototype: {section.type}</p>
                              <h3 style={{ color: section.styles.headlineColor }} className="text-4xl font-black italic tracking-tighter uppercase px-12 italic leading-tight">
                                {section.props.headline || section.props.title || 'Dynamic Content Node'}
                              </h3>
                           </div>
                        </div>

                        {/* Section Overlay Controls */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/sec:opacity-100 transition-all">
                           <button className="p-2.5 bg-white shadow-xl rounded-xl text-slate-400 hover:text-sky-600"><Layers size={16}/></button>
                           <button className="p-2.5 bg-white shadow-xl rounded-xl text-slate-400 hover:text-rose-500"><Trash2 size={16}/></button>
                        </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
         </div>
      </div>

      {/* Property Inspector (Right) */}
      <div className="w-80 bg-white border-l border-slate-200 flex flex-col z-50">
         <div className="p-8 border-b border-slate-100">
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic leading-none">Style Sentinel</h3>
         </div>
         
         <div className="flex-grow overflow-y-auto p-8 scroll-none">
            {selectedSectionId ? (
              <div className="space-y-10">
                 <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-4 block italic leading-none">Core Background</label>
                    <div className="flex items-center gap-4">
                       <input type="color" className="w-12 h-12 rounded-xl border-none cursor-pointer shadow-inner" />
                       <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-400 font-mono">#FFFFFF</div>
                    </div>
                 </div>

                 <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-4 block italic leading-none">Content Alignment</label>
                    <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                       {['Left', 'Center', 'Right'].map(align => (
                         <button key={align} className="flex-1 py-2 text-[9px] font-black uppercase tracking-wider text-slate-500 hover:bg-white hover:text-sky-600 rounded-xl transition-all shadow-sm">
                            {align}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="pt-10 border-t border-slate-50">
                   <h4 className="text-[9px] font-black uppercase text-sky-600 tracking-widest mb-6 italic leading-none">Blueprint Data</h4>
                   <div className="space-y-4">
                      <div className="space-y-2">
                         <p className="text-[8px] font-black uppercase text-slate-400 italic leading-none ml-2">Title Content</p>
                         <textarea className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-bold outline-none focus:border-sky-500/30 transition-all font-sans h-32" />
                      </div>
                   </div>
                 </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                 <Sparkles size={48} className="text-slate-300 mb-6" />
                 <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] px-8 leading-relaxed italic">Select any mission node on the canvas to override its aesthetic soul.</p>
              </div>
            )}
         </div>
      </div>

      {/* Library Overlay */}
      <AnimatePresence>
         {showLibrary && (
           <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[200] flex items-center justify-center p-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-5xl bg-white rounded-[4rem] p-16 shadow-2xl relative overflow-hidden flex flex-col h-[80vh]"
              >
                 <div className="flex items-center justify-between mb-16 relative z-10">
                    <div>
                       <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase underline underline-offset-8 decoration-sky-100 leading-none">Module <span className="text-sky-600 italic">Vault</span></h2>
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] italic mt-6">Provision premium section nodes</p>
                    </div>
                    <button onClick={() => setShowLibrary(false)} className="text-slate-300 hover:text-slate-900 transition-colors"><X size={40} /></button>
                 </div>

                 <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {templates.map(template => (
                         <div 
                           key={template.type}
                           onClick={() => addSection(template)}
                           className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] hover:bg-white hover:border-sky-600/30 hover:shadow-2xl transition-all group cursor-pointer text-center"
                         >
                            <div className="w-16 h-16 bg-white rounded-[2rem] flex items-center justify-center text-slate-300 group-hover:text-sky-600 transition-colors mx-auto mb-8 shadow-sm">
                               <Plus size={32} />
                            </div>
                            <h4 className="text-lg font-black text-slate-900 italic tracking-tighter mb-1 uppercase italic leading-none">{template.name}</h4>
                            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic">{template.category} Node</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}

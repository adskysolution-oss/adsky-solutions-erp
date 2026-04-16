'use client';

import React, { useState } from 'react';
import { Layers, Plus, Move, Trash2, Globe, Sparkles, Layout, Type, Image as ImageIcon, CreditCard, ChevronDown } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';

export default function CMSPageBuilder() {
  const [sections, setSections] = useState([
    { id: 'sec-1', type: 'Hero', content: 'Modern Farming Solutions' },
    { id: 'sec-2', type: 'Features', content: '25X Growth Network' },
    { id: 'sec-3', type: 'Payments', content: 'Cashfree Integration' },
  ]);

  const addSection = (type) => {
    setSections([...sections, { id: `sec-${Date.now()}`, type, content: `New ${type} Content` }]);
  };

  return (
    <div className="space-y-8 pb-32 pt-4 px-4 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">
              Website <span className="text-vibrant-indigo">Builder</span>
           </h1>
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Google Forms Style Drag & Drop Orchestrator</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-3 px-6 py-4 glass-card bg-white border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-all">
              <Globe size={16} /> Preview Live
           </button>
           <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl shadow-xl shadow-indigo-500/10 active:scale-95 transition-all">
              <Sparkles size={18} />
              <span className="text-xs font-black uppercase tracking-widest italic">Publish Changes</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Component Library */}
         <div className="lg:col-span-1 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 italic">Component Library</h4>
            <div className="space-y-3">
               {[
                 { label: 'Hero Section', icon: Layout, type: 'Hero' },
                 { label: 'Feature Grid', icon: Layers, type: 'Features' },
                 { label: 'Text Block', icon: Type, type: 'Text' },
                 { label: 'Media Node', icon: ImageIcon, type: 'Image' },
                 { label: 'Payment Button', icon: CreditCard, type: 'Payments' },
               ].map((comp) => (
                 <button 
                    key={comp.type}
                    onClick={() => addSection(comp.type)}
                    className="w-full flex items-center gap-4 p-5 glass-card bg-white border-slate-50 rounded-2xl hover:bg-slate-900 hover:text-white group transition-all"
                 >
                    <div className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-white/10 flex items-center justify-center text-slate-400 group-hover:text-white">
                       <comp.icon size={18} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wide italic">{comp.label}</span>
                 </button>
               ))}
            </div>
         </div>

         {/* Visual Builder Canvas */}
         <div className="lg:col-span-3 space-y-6">
            <div className="p-8 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[3.5rem] min-h-[600px] flex flex-col gap-6">
               <Reorder.Group axis="y" values={sections} onReorder={setSections} className="space-y-6">
                  {sections.map((section) => (
                    <Reorder.Item 
                       key={section.id} 
                       value={section}
                       className="group relative cursor-grab active:cursor-grabbing"
                    >
                       <div className="p-10 glass-card bg-white rounded-3xl shadow-lg border-white transition-all hover:ring-4 hover:ring-indigo-500/5 group">
                          <div className="flex items-center justify-between mb-6">
                             <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                   <Move size={14} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Section Type: <span className="text-slate-900 italic font-mono">{section.type}</span></span>
                             </div>
                             <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><ChevronDown size={18} /></button>
                                <button className="p-2 text-rose-300 hover:text-rose-500 transition-colors"><Trash2 size={18} /></button>
                             </div>
                          </div>
                          
                          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 font-black italic uppercase tracking-tighter text-2xl">
                             [ Visual Node Content Placeholder ]
                          </div>
                       </div>
                    </Reorder.Item>
                  ))}
               </Reorder.Group>

               <div className="flex-grow flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Drag Components here to expand your interface</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Layers, 
  Settings, 
  MoreVertical, 
  ChevronRight, 
  Globe, 
  Eye, 
  Edit3, 
  Trash2, 
  ExternalLink,
  CheckCircle2,
  Clock,
  Layout,
  Sparkles,
  Zap,
  ShieldCheck,
  SearchIcon,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const MOCK_PAGES = [
  { id: 'PAGE-1', title: 'Home Engine', slug: 'home', status: 'published', lastEdited: '2h ago', sections: 8 },
  { id: 'PAGE-2', title: 'Recruitment Hub', slug: 'careers', status: 'draft', lastEdited: '14h ago', sections: 5 },
  { id: 'PAGE-3', title: 'Partner Node', slug: 'partner-onboarding', status: 'published', lastEdited: '2 days ago', sections: 12 },
];

export default function CMSPageManager() {
  const [selectedPage, setSelectedPage] = useState(null);
  const [showNewPageModal, setShowNewPageModal] = useState(false);

  return (
    <div className="space-y-10 pb-32">
      {/* CMS Hub Header */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 blur-[120px] -mr-48 -mt-48 transition-all group-hover:bg-sky-500/10" />
         
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl">
               <Layers size={40} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2 italic uppercase">Content <span className="text-sky-600">Architect</span></h1>
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic">No-Code Page Orchestration Node</span>
                  <div className="h-1 w-1 bg-slate-200 rounded-full" />
                  <span className="text-[10px] font-black uppercase text-sky-600 tracking-widest">{MOCK_PAGES.length} Unified Pages</span>
               </div>
            </div>
         </div>

         <button 
           onClick={() => setShowNewPageModal(true)}
           className="px-8 py-4 bg-sky-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-sky-600/20 flex items-center gap-3 transition-all active:scale-[0.98] relative z-10"
         >
            <Plus size={18} /> Provision New Page
         </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
         {/* Page List Area */}
         <div className="flex-grow space-y-6">
            <div className="relative group">
               <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-600 transition-colors" size={20} />
               <input 
                 placeholder="Search by mission slug or title..." 
                 className="w-full bg-white border border-slate-100 rounded-[2.5rem] py-5 pl-16 pr-8 text-sm font-bold shadow-sm outline-none focus:border-sky-500/30 transition-all italic font-sans"
               />
            </div>

            <div className="space-y-4">
               {MOCK_PAGES.map((page) => (
                 <motion.div 
                   key={page.id} 
                   onClick={() => setSelectedPage(page)}
                   className={`p-8 bg-white border rounded-[3rem] shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex items-center justify-between relative overflow-hidden ${selectedPage?.id === page.id ? 'border-sky-600 shadow-sky-500/5' : 'border-slate-100'}`}
                 >
                    <div className="flex items-center gap-8 relative z-10">
                       <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-sky-600 transition-colors">
                          <Globe size={28} />
                       </div>
                       <div>
                          <h3 className="text-xl font-black text-slate-900 italic tracking-tighter mb-1 uppercase italic underline underline-offset-4 decoration-slate-100 group-hover:decoration-sky-200">{page.title}</h3>
                          <div className="flex items-center gap-3">
                             <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic leading-none mt-1">/{page.slug}</span>
                             <div className="w-1 h-1 bg-slate-200 rounded-full" />
                             <span className="text-[9px] font-black text-slate-400 italic">Last Sync: {page.lastEdited}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-12 text-right relative z-10">
                       <div className="hidden md:block">
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Structural Nodes</p>
                          <p className="text-xl font-black text-slate-900 italic">{page.sections}</p>
                       </div>
                       <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${page.status === 'published' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                          {page.status}
                       </div>
                       <Link href={`/admin/cms/builder/${page.id}`} className="p-3 bg-slate-50 hover:bg-sky-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm">
                          <Edit3 size={18} />
                       </Link>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Selection Sidebar (Detail View) */}
         <AnimatePresence>
            {selectedPage && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full lg:w-[480px] bg-white border border-slate-100 rounded-[4rem] p-12 shadow-2xl overflow-y-auto max-h-[85vh] sticky top-8 custom-scrollbar border-t-[12px] border-t-sky-600"
              >
                 <div className="flex items-center justify-between mb-12">
                    <button onClick={() => setSelectedPage(null)} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-inner"><Trash2 size={24} /></button>
                    <div className="flex gap-2 text-[9px] font-black uppercase italic text-slate-400 tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                       Blueprint Dossier
                    </div>
                 </div>

                 <div className="text-center mb-12">
                    <div className="w-28 h-28 bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-300 mx-auto mb-6 shadow-inner ring-4 ring-white relative group">
                       <Layout size={56} className="group-hover:rotate-12 transition-transform duration-500" />
                       <div className="absolute bottom-2 right-2 w-8 h-8 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                          <Activity size={16} />
                       </div>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter mb-2 italic uppercase">{selectedPage.title}</h2>
                    <p className="text-slate-300 text-[9px] font-black uppercase tracking-[0.3em] italic">Public Key: /{selectedPage.slug}</p>
                 </div>

                 <div className="space-y-10">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden group/card shadow-2xl">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-600/20 blur-3xl -mr-12 -mt-12 group-hover/card:scale-110" />
                          <p className="text-[9px] font-black uppercase text-sky-400 mb-2 relative z-10 italic">Performance</p>
                          <p className="text-2xl font-black italic tracking-tighter relative z-10 italic">OPTIMAL</p>
                       </div>
                       <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                          <p className="text-[9px] font-black uppercase text-slate-400 mb-2 italic">Status Node</p>
                          <div className="flex items-center gap-2">
                             <p className="text-xl font-black text-slate-900 italic uppercase italic">{selectedPage.status}</p>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] italic border-l-4 border-sky-600 pl-4">Command Actions</h4>
                       <div className="space-y-4">
                          <Link href={`/admin/cms/builder/${selectedPage.id}`} className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between group hover:border-sky-600 transition-all">
                             <div className="flex items-center gap-4 text-slate-400 group-hover:text-sky-600 transition-colors">
                                <Sparkles size={24} />
                                <span className="text-xs font-black text-slate-900 italic uppercase italic">Visual Workbench Hub</span>
                             </div>
                             <ChevronRight size={18} />
                          </Link>
                          <button className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between group hover:border-sky-600 transition-all">
                             <div className="flex items-center gap-4 text-slate-400 group-hover:text-sky-600 transition-colors">
                                <Settings size={24} />
                                <span className="text-xs font-black text-slate-900 italic uppercase italic">SEO & Metadata Node</span>
                             </div>
                             <ChevronRight size={18} />
                          </button>
                       </div>
                    </div>

                    <button className="w-full py-6 bg-sky-600 text-white rounded-[2.5rem] shadow-2xl shadow-sky-600/30 font-black uppercase tracking-[0.4em] text-[10px] active:scale-[0.98] transition-all flex items-center justify-center gap-4">
                       Commit to Production <Zap size={18} />
                    </button>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

       {/* Provision New Page Overlay */}
       <AnimatePresence>
         {showNewPageModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="w-full max-w-2xl bg-white rounded-[4rem] p-16 shadow-2xl relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 blur-[120px] -mr-48 -mt-48 transition-all" />
                  <button onClick={() => setShowNewPageModal(false)} className="absolute top-12 right-12 text-slate-300 hover:text-slate-900 transition-colors">
                     <Trash2 size={32} />
                  </button>
                  
                  <div className="text-center mb-16 px-6">
                     <div className="w-20 h-20 bg-sky-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-sky-200 mx-auto mb-8">
                        <Plus size={32} />
                     </div>
                     <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic mb-3 leading-none uppercase italic underline underline-offset-8 decoration-sky-100">Provision <span className="text-sky-600">Page</span></h2>
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] italic mt-6">Initializing Content Registry Node</p>
                  </div>

                  <div className="space-y-10">
                     <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-8 italic">Mission Designation (Title)</label>
                           <input placeholder="e.g. Services Overview" className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] py-5 px-10 text-sm font-black outline-none focus:border-sky-500/30 transition-all italic font-sans" />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-8 italic">Public Nexus Slug</label>
                           <input placeholder="e.g. services-node" className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] py-5 px-10 text-sm font-black outline-none focus:border-sky-500/30 transition-all italic font-sans" />
                        </div>
                     </div>
                     <button className="w-full py-8 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl transition-all active:scale-[0.98] hover:bg-sky-600 mt-4">
                        Initialize Page lifecycle
                     </button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { 
  Filter, 
  Plus, 
  Trash2, 
  Search, 
  Download, 
  Bookmark, 
  ChevronDown, 
  Calendar,
  X,
  Settings,
  ArrowRight,
  Database,
  Globe,
  MoreVertical,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdvancedFilter({ onFilter, onExport, targetType = 'submissions' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [logic, setLogic] = useState('AND');
  const [activeFilters, setActiveFilters] = useState([
    { id: '1', field: 'status', operator: 'equals', value: 'pending' }
  ]);
  const [savedViews] = useState([
    { name: 'Pending Approvals', count: 12 },
    { name: 'MP Region Leads', count: 48 },
    { name: 'Failed Payments', count: 5 }
  ]);

  const fields = [
    { id: 'status', name: 'Status', type: 'select', options: ['pending', 'approved', 'rejected'] },
    { id: 'state', name: 'State', type: 'text' },
    { id: 'district', name: 'District', type: 'text' },
    { id: 'createdAt', name: 'Date Range', type: 'date' },
    { id: 'partnerCode', name: 'Partner Code', type: 'text' },
    { id: 'amount', name: 'Amount', type: 'number' },
  ];

  const operators = [
    { id: 'equals', name: 'Is exactly' },
    { id: 'contains', name: 'Includes' },
    { id: 'after', name: 'After date' },
    { id: 'before', name: 'Before date' },
    { id: 'gt', name: 'Greater than' },
  ];

  const addFilterRow = () => {
    setActiveFilters([...activeFilters, { id: Date.now().toString(), field: 'state', operator: 'equals', value: '' }]);
  };

  const removeFilterRow = (id) => {
    setActiveFilters(activeFilters.filter(f => f.id !== id));
  };

  const updateFilter = (id, key, value) => {
    setActiveFilters(activeFilters.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  return (
    <div className="relative z-40 font-sans">
      <div className="flex items-center gap-4 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
         <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              placeholder={`Search ${targetType}...`} 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-6 text-sm font-bold outline-none focus:border-sky-500/30"
            />
         </div>
         
         <button 
           onClick={() => setIsOpen(!isOpen)}
           className={`px-6 py-3 rounded-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all ${isOpen ? 'bg-slate-900 text-white shadow-xl' : 'bg-white border border-slate-100 text-slate-500 hover:border-sky-200 hover:text-sky-600'}`}
         >
            <Filter size={16} /> Advanced Filters
            <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
         </button>

         <div className="h-8 w-px bg-slate-100" />

         <button 
           onClick={onExport}
           className="px-6 py-3 bg-white border border-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 transition-all flex items-center gap-2"
         >
            <Download size={16} /> Export Dossier
         </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white border border-slate-100 rounded-[3rem] shadow-2xl p-10 z-50 overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] -mr-32 -mt-32" />
             
             <div className="flex items-center justify-between mb-10 relative z-10">
                <div>
                   <h3 className="text-xl font-black tracking-tighter italic text-slate-900">Advanced <span className="text-sky-600">Query Orchestrator</span></h3>
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1 italic">PostgreSQL Managed Search</p>
                </div>
                <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                   <button 
                     onClick={() => setLogic('AND')}
                     className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${logic === 'AND' ? 'bg-white shadow-md text-sky-600' : 'text-slate-400'}`}
                   >
                     Match All (AND)
                   </button>
                   <button 
                    onClick={() => setLogic('OR')}
                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${logic === 'OR' ? 'bg-white shadow-md text-sky-600' : 'text-slate-400'}`}
                   >
                     Match Any (OR)
                   </button>
                </div>
             </div>

             <div className="space-y-4 mb-10 relative z-10">
                {activeFilters.map((row) => (
                  <motion.div 
                    layout
                    key={row.id} 
                    className="flex items-center gap-4 group"
                  >
                     <select 
                       value={row.field}
                       onChange={(e) => updateFilter(row.id, 'field', e.target.value)}
                       className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-black outline-none w-48 transition-all hover:bg-white focus:border-sky-500/30"
                     >
                        {fields.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                     </select>
                     
                     <select 
                       value={row.operator}
                       onChange={(e) => updateFilter(row.id, 'operator', e.target.value)}
                       className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-black outline-none w-48 transition-all hover:bg-white focus:border-sky-500/30 text-sky-600"
                     >
                        {operators.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                     </select>

                     <input 
                       value={row.value}
                       onChange={(e) => updateFilter(row.id, 'value', e.target.value)}
                       placeholder="Enter value..."
                       className="flex-grow bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold outline-none transition-all hover:bg-white focus:border-sky-500/30"
                     />

                     <button 
                       onClick={() => removeFilterRow(row.id)}
                       className="w-12 h-12 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all border border-slate-100"
                     >
                        <X size={18} />
                     </button>
                  </motion.div>
                ))}
                
                <button 
                  onClick={addFilterRow}
                  className="w-full py-4 border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-400 hover:border-sky-200 hover:text-sky-600 hover:bg-sky-50 transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                >
                   <Plus size={16} /> Add Logic Branch
                </button>
             </div>

             <div className="flex items-center justify-between pt-10 border-t border-slate-50 relative z-10">
                <div className="flex items-center gap-2">
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mr-4">Saved Views:</p>
                   {savedViews.map(view => (
                     <button key={view.name} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-sky-600 hover:border-sky-100 transition-all">
                        <Bookmark size={12} /> {view.name} <span className="opacity-40">{view.count}</span>
                     </button>
                   ))}
                </div>
                
                <div className="flex gap-4">
                   <button className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Clear All</button>
                   <button 
                     onClick={() => { onFilter(activeFilters, logic); setIsOpen(false); }}
                     className="px-10 py-4 bg-sky-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-sky-200 flex items-center gap-3 transition-all active:scale-[0.98]"
                   >
                     Apply Intelligence <ArrowRight size={16} />
                   </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

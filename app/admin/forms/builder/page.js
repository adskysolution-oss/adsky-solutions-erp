'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Settings, 
  Save, 
  Eye, 
  GripVertical, 
  Type, 
  Hash, 
  Mail, 
  CheckSquare, 
  FileUp, 
  ChevronRight, 
  Layout, 
  Smartphone, 
  Monitor, 
  Sparkles, 
  Zap, 
  ArrowLeft,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const FIELD_TYPES = [
  { type: 'text', label: 'Short Text', icon: Type },
  { type: 'number', label: 'Number Hub', icon: Hash },
  { type: 'email', label: 'Email Node', icon: Mail },
  { type: 'tel', label: 'Mobile Link', icon: Smartphone },
  { type: 'file', label: 'Document Node', icon: FileUp },
  { type: 'select', label: 'Dropdown Node', icon: ChevronDown },
  { type: 'date', label: 'Temporal Node', icon: Calendar },
];

export default function FormArchitect() {
  const [fields, setFields] = useState([
    { id: '1', type: 'text', label: 'Farmer Full Name', placeholder: 'Enter legal name', required: true },
    { id: '2', type: 'tel', label: 'Primary Contact', placeholder: '+91 00000 00000', required: true }
  ]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  const addField = (preset) => {
    const newField = {
      id: `FIELD-${Date.now()}`,
      type: preset.type,
      label: preset.label,
      placeholder: `Enter ${preset.label}`,
      required: false
    };
    setFields([...fields, newField]);
  };

  const removeField = (id) => {
    setFields(fields.filter(f => f.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const selectedField = fields.find(f => f.id === selectedFieldId);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Field Registry (Left) */}
      <div className="w-80 bg-white border-r border-slate-100 flex flex-col z-50">
         <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <Link href="/admin/forms" className="text-slate-300 hover:text-sky-600 px-4 py-2 bg-slate-50 rounded-xl transition-all"><ArrowLeft size={18} /></Link>
            <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic leading-none">Form Registry</h2>
         </div>
         
         <div className="flex-grow overflow-y-auto p-6 space-y-3">
            <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest ml-4 mb-4 italic">Available Nodes</p>
            {FIELD_TYPES.map(preset => (
              <button 
                key={preset.type}
                onClick={() => addField(preset)}
                className="w-full flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:border-sky-500/30 hover:shadow-xl hover:shadow-sky-500/5 transition-all text-left group"
              >
                 <div className="w-10 h-10 bg-slate-50 text-slate-300 group-hover:text-sky-600 rounded-xl flex items-center justify-center border border-slate-50 transition-colors">
                    <preset.icon size={20} />
                 </div>
                 <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest">{preset.label}</span>
              </button>
            ))}
         </div>
      </div>

      {/* Builder Canvas (Middle) */}
      <div className="flex-grow flex flex-col">
         {/* Canvas Header */}
         <div className="h-20 bg-white border-b border-slate-100 px-10 flex items-center justify-between z-40">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-sky-200">
                  <Layout size={20} />
               </div>
               <div>
                  <h1 className="text-lg font-black text-slate-900 tracking-tighter italic leading-none">Form Architect</h1>
                  <p className="text-[8px] font-black uppercase text-sky-600 tracking-widest mt-1">Status: Active Design Node</p>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-white transiton-all">
                  <Eye size={16} /> Live Test
               </button>
               <button className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all outline-none">
                  <Save size={16} /> Deploy Schema
               </button>
            </div>
         </div>

         {/* Canvas Area */}
         <div className="flex-grow overflow-y-auto p-16 custom-scrollbar bg-slate-100/30">
            <div className="max-w-2xl mx-auto space-y-6">
               <Reorder.Group axis="y" values={fields} onReorder={setFields} className="space-y-4">
                  {fields.map((field) => (
                    <Reorder.Item 
                      key={field.id} 
                      value={field}
                      onClick={() => setSelectedFieldId(field.id)}
                      className={`p-10 rounded-[2.5rem] bg-white border transition-all cursor-pointer relative group ${selectedFieldId === field.id ? 'border-sky-600 shadow-2xl shadow-sky-500/5 ring-2 ring-sky-500/10' : 'border-slate-50 hover:border-sky-300'}`}
                    >
                       <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-6">
                             <GripVertical size={20} className="text-slate-200 cursor-grab active:cursor-grabbing group-hover:text-slate-400" />
                             <span className="text-[9px] font-black uppercase text-slate-300 tracking-[0.3em] font-mono italic">Node: {field.id}</span>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeField(field.id); }}
                            className="p-2 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                          >
                             <Trash2 size={18} />
                          </button>
                       </div>

                       <div className="space-y-3">
                          <p className="text-[10px] font-black uppercase text-slate-900 tracking-widest ml-4 mb-2 italic">{field.label} {field.required && <span className="text-rose-500">*</span>}</p>
                          <div className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-5 px-8 text-sm font-bold text-slate-300 italic">
                             {field.placeholder || 'No placeholder registry...'}
                          </div>
                       </div>
                    </Reorder.Item>
                  ))}
               </Reorder.Group>

               {fields.length === 0 && (
                 <div className="py-32 bg-white border-2 border-dashed border-slate-200 rounded-[3rem] text-center opacity-40">
                    <Sparkles size={64} className="mx-auto text-slate-300 mb-8" />
                    <h4 className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase italic px-12 leading-tight underline decoration-sky-100 underline-offset-8">Data Capture Canvas Clear</h4>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mt-8">Drag or click mission nodes from the registry to begin.</p>
                 </div>
               )}
            </div>
         </div>
      </div>

      {/* Property Sentinel (Right) */}
      <div className="w-96 bg-white border-l border-slate-100 flex flex-col z-50">
         <div className="p-8 border-b border-slate-50">
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic leading-none">Property Sentinel</h3>
         </div>

         <div className="flex-grow overflow-y-auto p-10 scroll-none">
            {selectedField ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                 <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-4 italic block leading-none">Field Designation</label>
                    <input 
                      value={selectedField.label}
                      onChange={(e) => {
                        const updated = fields.map(f => f.id === selectedFieldId ? {...f, label: e.target.value} : f);
                        setFields(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-8 text-sm font-black outline-none focus:border-sky-500/30 transition-all italic" 
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-4 italic block leading-none">Placeholder Prompt</label>
                    <input 
                      value={selectedField.placeholder}
                      onChange={(e) => {
                        const updated = fields.map(f => f.id === selectedFieldId ? {...f, placeholder: e.target.value} : f);
                        setFields(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-8 text-sm font-bold outline-none focus:border-sky-500/30 transition-all italic text-slate-500" 
                    />
                 </div>

                 <div className="pt-10 border-t border-slate-50 flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-black uppercase text-slate-900 tracking-widest italic leading-none">Status: Mandatory</p>
                       <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-2">Requirement Protocol</p>
                    </div>
                    <button 
                      onClick={() => {
                        const updated = fields.map(f => f.id === selectedFieldId ? {...f, required: !f.required} : f);
                        setFields(updated);
                      }}
                      className={`w-14 h-8 rounded-full transition-all flex items-center p-1 ${selectedField.required ? 'bg-sky-600 justify-end shadow-lg shadow-sky-200' : 'bg-slate-200 justify-start'}`}
                    >
                       <div className="w-6 h-6 bg-white rounded-full shadow-md" />
                    </button>
                 </div>

                 <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group/card mt-12 cursor-pointer transition-all active:scale-[0.98]">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/20 blur-3xl -mr-12 -mt-12 transition-all group-hover/card:scale-110" />
                    <div className="flex items-center gap-4 relative z-10">
                       <Zap size={24} className="text-sky-400" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Commit Schema Node</span>
                    </div>
                 </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-center px-10">
                 <Settings size={48} className="text-slate-200 mb-8 animate-spin-slow" />
                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] leading-relaxed italic">Select a data node from the canvas to calibrate its operational logic.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Layout, 
  CheckCircle2, 
  Loader2, 
  ListTodo,
  ArrowLeft,
  Settings,
  ShieldCheck,
  Type,
  Hash,
  FileUp,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function FormBuilderPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingForm, setEditingForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/cms/forms');
      const data = await res.json();
      if (!data.error) setForms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewForm = () => {
    const newForm = {
      name: 'Untitled Form',
      description: 'Describe what this form captures...',
      fields: [
        { label: 'Farmer Name', type: 'text', required: true },
        { label: 'Mobile Number', type: 'number', required: true }
      ],
      isActive: true
    };
    setEditingForm(newForm);
  };

  const addField = () => {
    setEditingForm({
      ...editingForm,
      fields: [...editingForm.fields, { label: 'New Field', type: 'text', required: false }]
    });
  };

  const removeField = (index) => {
    const updatedFields = [...editingForm.fields];
    updatedFields.splice(index, 1);
    setEditingForm({ ...editingForm, fields: updatedFields });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/cms/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingForm)
      });
      const data = await res.json();
      if (data.success) {
        setEditingForm(null);
        fetchForms();
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white italic">Form <span className="text-blue-500">Builder</span></h1>
          <p className="text-slate-400 mt-1 uppercase text-[10px] font-black tracking-widest text-xs">Design Custom Lead Capture Forms</p>
        </div>
        {!editingForm && (
          <button 
            onClick={handleCreateNewForm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Plus size={20} />
            Create New Form
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {editingForm ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Editor Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                <h3 className="text-lg font-black text-white italic mb-6">Form <span className="text-blue-500">Identity</span></h3>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Internal Name</label>
                  <input 
                    type="text" 
                    value={editingForm.name} 
                    onChange={e => setEditingForm({...editingForm, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-blue-500/50 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Purpose/Description</label>
                  <textarea 
                    rows={4}
                    value={editingForm.description} 
                    onChange={e => setEditingForm({...editingForm, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-blue-500/50 outline-none transition-all text-sm leading-relaxed"
                  />
                </div>
                <div className="pt-8 flex gap-3">
                  <button onClick={() => setEditingForm(null)} className="flex-grow py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all">Cancel</button>
                  <button onClick={handleSave} disabled={saving} className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                    {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                    Save Form
                  </button>
                </div>
              </div>
            </div>

            {/* Field Builder Canvas */}
            <div className="lg:col-span-2 space-y-6">
               <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border-2 border-dashed border-white/10">
                 <div className="flex items-center justify-between mb-10">
                   <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Farmer Fields Configuration</h3>
                   <button onClick={addField} className="text-blue-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                     <Plus size={16} />
                     Add New Field
                   </button>
                 </div>

                 <div className="space-y-4">
                   {editingForm.fields.map((field, idx) => (
                     <motion.div 
                       layout
                       key={idx}
                       className="p-6 bg-[#0F172A] border border-white/10 rounded-2xl flex flex-wrap items-center gap-6 group"
                     >
                       <div className="flex items-center gap-4 flex-grow min-w-[300px]">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 font-bold">
                           {idx + 1}
                         </div>
                         <div className="flex-grow">
                           <input 
                             value={field.label} 
                             onChange={e => {
                               const updated = [...editingForm.fields];
                               updated[idx].label = e.target.value;
                               setEditingForm({...editingForm, fields: updated});
                             }}
                             className="bg-transparent text-white font-bold focus:outline-none w-full border-b border-transparent focus:border-blue-500 transition-all py-1" 
                           />
                           <div className="flex gap-4 mt-1">
                             <span className="text-[9px] uppercase font-black text-blue-500 tracking-wider flex items-center gap-1">
                               <Settings size={10} />
                               Type: {field.type}
                             </span>
                             <label className="flex items-center gap-1 cursor-pointer">
                               <input 
                                 type="checkbox" 
                                 checked={field.required}
                                 onChange={e => {
                                   const updated = [...editingForm.fields];
                                   updated[idx].required = e.target.checked;
                                   setEditingForm({...editingForm, fields: updated});
                                 }}
                                 className="w-3 h-3 rounded"
                               />
                               <span className="text-[9px] uppercase font-black text-slate-500">Required</span>
                             </label>
                           </div>
                         </div>
                       </div>

                       <div className="flex items-center gap-3">
                         <select 
                           value={field.type}
                           onChange={e => {
                             const updated = [...editingForm.fields];
                             updated[idx].type = e.target.value;
                             setEditingForm({...editingForm, fields: updated});
                           }}
                           className="bg-white/5 border border-white/10 text-white text-[10px] px-3 py-2 rounded-lg outline-none font-black uppercase tracking-widest"
                         >
                           <option value="text">Text Entry</option>
                           <option value="number">Numeric</option>
                           <option value="file">Doc Upload</option>
                           <option value="date">Date picker</option>
                         </select>
                         <button onClick={() => removeField(idx)} className="p-2 hover:bg-red-500/10 text-slate-600 hover:text-red-400 transition-all rounded-lg opacity-0 group-hover:opacity-100">
                           <Trash2 size={18} />
                         </button>
                       </div>
                     </motion.div>
                   ))}
                 </div>
               </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={form._id}
                className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400">
                     <ListTodo size={24} />
                   </div>
                   <button onClick={() => setEditingForm(form)} className="text-blue-400 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">Edit Build</button>
                </div>
                <h3 className="text-white font-black text-lg italic">{form.name}</h3>
                <p className="text-slate-500 text-xs mt-1 mb-6 line-clamp-2">{form.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                   <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{form.fields?.length || 0} Dynamic Fields</span>
                   <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded italic">Ready to Capture</span>
                </div>
              </motion.div>
            ))}

            {forms.length === 0 && (
              <div className="col-span-full py-24 bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-center">
                 <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                    <Layout size={32} className="text-slate-600" />
                 </div>
                 <div>
                   <p className="text-slate-500 font-bold">No dynamic forms found.</p>
                   <p className="text-slate-600 text-xs mt-1 italic">Forms allow you to capture unique Farmer details like Aadhar or Land Records.</p>
                 </div>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

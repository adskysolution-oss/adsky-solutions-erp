'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Save, Layout, CheckCircle2, Loader2, ListTodo,
  ArrowLeft, Settings, ShieldCheck, Type, Hash, FileUp,
  ChevronDown, X, MoveUp, MoveDown, Eye, FileSpreadsheet, Download, Edit3, Link2 as LinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function FormBuilderPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingForm, setEditingForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

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
      formName: 'Untitled Form',
      description: 'Capture lead details efficiently',
      steps: [{
        title: 'Basic Information',
        fields: [{ label: 'Full Name', type: 'text', required: true }]
      }],
      isActive: true
    };
    setEditingForm(newForm);
    setActiveStepIdx(0);
  };

  const addStep = () => {
    setEditingForm({
      ...editingForm,
      steps: [...editingForm.steps, { title: 'New Step', fields: [] }]
    });
    setActiveStepIdx(editingForm.steps.length);
  };

  const addField = () => {
    const updatedSteps = [...editingForm.steps];
    updatedSteps[activeStepIdx].fields.push({ label: 'New Field', type: 'text', required: false });
    setEditingForm({ ...editingForm, steps: updatedSteps });
  };

  const removeField = (fieldIdx) => {
    const updatedSteps = [...editingForm.steps];
    updatedSteps[activeStepIdx].fields.splice(fieldIdx, 1);
    setEditingForm({ ...editingForm, steps: updatedSteps });
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

  if (loading) return <div className="flex items-center justify-center min-h-[60vh] bg-[#0b1220]"><Loader2 className="animate-spin text-blue-500" size={48} /></div>;

  return (
    <div className="space-y-8 pb-32 min-h-screen bg-[#0b1220] p-6 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white italic">Form <span className="text-blue-500">Builder Pro.</span></h1>
          <p className="text-slate-500 mt-1 uppercase text-[10px] font-black tracking-widest italic">Multi-step Lead Capture Engine</p>
        </div>
        {!editingForm && (
          <button 
            onClick={handleCreateNewForm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-10 rounded-[2rem] flex items-center justify-center gap-3 transition-all shadow-2xl shadow-blue-600/20 active:scale-95 italic uppercase tracking-widest text-xs"
          >
            <Plus size={20} /> SPAWN NEW FORM
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {editingForm ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Steps & Config Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-8 rounded-[3rem] bg-[#111827] border border-[#1f2937] space-y-8">
                 <button onClick={() => setEditingForm(null)} className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest italic">
                    <ArrowLeft size={14} /> DISCARD CHANGES
                 </button>
                
                <div className="space-y-6">
                   <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 italic">Form Core</h3>
                   <div className="space-y-4">
                     <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">Title</label>
                       <input type="text" value={editingForm.formName} onChange={e => setEditingForm({...editingForm, formName: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white font-black italic outline-none focus:border-blue-500 transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">URL Slug</label>
                        <div className="relative">
                           <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 font-bold italic text-xs">/</div>
                           <input 
                              type="text" 
                              value={editingForm.slug || ''} 
                              placeholder="e.g. survey-2024"
                              onChange={e => setEditingForm({...editingForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} 
                              className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 pl-10 pr-6 text-blue-500 font-black italic outline-none focus:border-blue-500 transition-all text-xs uppercase tracking-widest" 
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">Description</label>
                        <textarea rows={3} value={editingForm.description} onChange={e => setEditingForm({...editingForm, description: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white font-medium italic outline-none focus:border-blue-500 transition-all text-sm" />
                     </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center justify-between mb-2">
                     <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 italic">Form Steps</h3>
                     <button onClick={addStep} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Plus size={14} /></button>
                   </div>
                   <div className="space-y-2">
                      {editingForm.steps.map((step, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setActiveStepIdx(idx)}
                          className={`p-4 rounded-2xl cursor-pointer border flex items-center justify-between group transition-all ${activeStepIdx === idx ? 'bg-blue-500 border-blue-400' : 'bg-[#0b1220] border-[#1f2937] hover:border-slate-700'}`}
                        >
                          <span className={`text-[10px] font-black uppercase tracking-widest ${activeStepIdx === idx ? 'text-white' : 'text-slate-400'}`}>STEP {idx + 1}</span>
                          <span className={`text-xs font-bold italic truncate w-32 text-right ${activeStepIdx === idx ? 'text-blue-100' : 'text-slate-500'}`}>{step.title}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <button onClick={handleSave} disabled={saving} className="w-full py-5 bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3 hover:bg-emerald-600 disabled:opacity-50 italic">
                  {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                  {saving ? 'COMMITTING...' : 'SAVE BUILD'}
                </button>
              </div>
            </div>

            {/* Step Builder Canvas */}
            <div className="lg:col-span-3 space-y-8">
               <div className="p-12 rounded-[3.5rem] bg-[#111827] border border-[#1f2937] relative">
                  <div className="flex items-center justify-between mb-12 border-b border-[#1f2937] pb-8">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center text-blue-500">
                          <Layout size={24} />
                       </div>
                       <div>
                          <input 
                            value={editingForm.steps[activeStepIdx].title} 
                            onChange={e => {
                              const updated = [...editingForm.steps];
                              updated[activeStepIdx].title = e.target.value;
                              setEditingForm({...editingForm, steps: updated});
                            }}
                            className="bg-transparent text-3xl font-black text-white italic outline-none border-b border-transparent focus:border-blue-500 transition-all w-full max-w-lg" 
                          />
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Configuring Fields for Step {activeStepIdx + 1}</p>
                       </div>
                    </div>
                    <button onClick={addField} className="flex items-center gap-3 px-8 py-4 bg-[#0b1220] border border-[#1f2937] text-white rounded-2xl font-black italic text-[10px] uppercase tracking-[0.2em] hover:border-blue-500 transition-all shadow-xl">
                      <Plus size={18} /> ATTACH FIELD
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {editingForm.steps[activeStepIdx].fields.map((field, fIdx) => (
                      <motion.div layout key={fIdx} className="p-8 bg-[#0b1220] border border-[#1f2937] rounded-[2.5rem] group hover:border-blue-500/20 transition-all">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                           <div className="flex-1 space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-slate-500 italic">{fIdx + 1}</div>
                                <input 
                                  value={field.label} 
                                  onChange={e => {
                                    const updated = [...editingForm.steps];
                                    updated[activeStepIdx].fields[fIdx].label = e.target.value;
                                    setEditingForm({...editingForm, steps: updated});
                                  }}
                                  className="bg-transparent text-xl font-black text-white italic outline-none border-b border-transparent focus:border-blue-500 transition-all w-full"
                                  placeholder="Field Label (e.g. Aadhar Number)"
                                />
                              </div>
                              <div className="flex gap-6 ml-12">
                                <label className="flex items-center gap-3 cursor-pointer group/check">
                                  <input 
                                    type="checkbox" 
                                    checked={field.required}
                                    onChange={e => {
                                      const updated = [...editingForm.steps];
                                      updated[activeStepIdx].fields[fIdx].required = e.target.checked;
                                      setEditingForm({...editingForm, steps: updated});
                                    }}
                                    className="w-4 h-4 rounded-lg bg-[#111827] border-[#1f2937] checked:bg-blue-500 transition-all"
                                  />
                                  <span className="text-[10px] font-black uppercase text-slate-500 italic group-hover/check:text-slate-300">Mandatory</span>
                                </label>
                                <div className="h-4 w-[1px] bg-[#1f2937]"></div>
                                <div className="flex items-center gap-3">
                                   <Settings size={14} className="text-slate-600" />
                                   <select 
                                      value={field.type}
                                      onChange={e => {
                                        const updated = [...editingForm.steps];
                                        updated[activeStepIdx].fields[fIdx].type = e.target.value;
                                        setEditingForm({...editingForm, steps: updated});
                                      }}
                                      className="bg-transparent text-[10px] font-black text-blue-500 uppercase tracking-widest outline-none cursor-pointer"
                                   >
                                      <option value="text">Text Entry</option>
                                      <option value="number">Numeric</option>
                                      <option value="email">Email Addr</option>
                                      <option value="file">File Upload</option>
                                      <option value="textarea">Multi-line</option>
                                      <option value="date">Date Picker</option>
                                      <option value="select">Dropdown</option>
                                   </select>
                                </div>
                              </div>
                           </div>

                           {['select', 'radio', 'checkbox'].includes(field.type) && (
                             <div className="space-y-4 ml-12 p-6 rounded-2xl bg-[#0b1220] border border-blue-500/10">
                                <p className="text-[10px] font-black uppercase text-blue-500 italic mb-2">Manage Options</p>
                                <div className="flex flex-wrap gap-2">
                                   {field.options?.map((opt, oIdx) => (
                                     <div key={oIdx} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 group/opt">
                                        <span className="text-xs text-white font-medium italic">{opt}</span>
                                        <button onClick={() => {
                                           const updated = [...editingForm.steps];
                                           updated[activeStepIdx].fields[fIdx].options.splice(oIdx, 1);
                                           setEditingForm({...editingForm, steps: updated});
                                        }} className="text-red-500 opacity-0 group-hover/opt:opacity-100 transition-opacity"><X size={12} /></button>
                                     </div>
                                   ))}
                                   <button 
                                     onClick={() => {
                                       const val = prompt("Enter option name:");
                                       if (val) {
                                         const updated = [...editingForm.steps];
                                         if (!updated[activeStepIdx].fields[fIdx].options) updated[activeStepIdx].fields[fIdx].options = [];
                                         updated[activeStepIdx].fields[fIdx].options.push(val);
                                         setEditingForm({...editingForm, steps: updated});
                                       }
                                     }}
                                     className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-xl border border-blue-500/20 text-xs font-black italic hover:bg-blue-500 hover:text-white transition-all"
                                   >
                                     + ADD OPTION
                                   </button>
                                </div>
                             </div>
                           )}

                           <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                              <button onClick={() => removeField(fIdx)} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg"><Trash2 size={18} /></button>
                           </div>
                        </div>
                      </motion.div>
                    ))}

                    {editingForm.steps[activeStepIdx].fields.length === 0 && (
                      <div className="py-20 text-center space-y-4">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-700"><Type size={32} /></div>
                        <p className="text-slate-500 font-black italic uppercase tracking-widest text-sm">NO FIELDS ATTACHED TO THIS STEP</p>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {forms.map((form, i) => (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={form._id} className="group relative">
                <div className="p-10 rounded-[3.5rem] bg-[#111827] border border-[#1f2937] hover:border-blue-500/30 transition-all flex flex-col h-full shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                     <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                       <ListTodo size={28} />
                     </div>
                    <div className="flex items-center gap-2">
                        <button 
                           onClick={() => window.open(`/${form.slug}`, '_blank')}
                           className="p-3 bg-white/5 text-slate-400 rounded-xl hover:bg-white/10 hover:text-white transition-all shadow-lg"
                           title="Preview Live"
                        >
                           <Eye size={18} />
                        </button>
                        <button 
                           onClick={() => {
                              const url = `${window.location.origin}/${form.slug}`;
                              navigator.clipboard.writeText(url);
                              alert("Link Copied: " + url);
                           }} 
                           className="p-3 bg-white/5 text-slate-400 rounded-xl hover:bg-white/10 hover:text-white transition-all shadow-lg"
                           title="Copy Public Link"
                        >
                           <LinkIcon size={18} />
                        </button>
                        <button onClick={() => setEditingForm(form)} className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all"><Edit size={18} /></button>
                        <Link href={`/admin/reports/forms/${form._id}`} className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"><FileSpreadsheet size={18} /></Link>
                     </div>
                  </div>
                  <h3 className="text-2xl font-black text-white italic mb-1">{form.formName}</h3>
                  <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest italic mb-4">/{form.slug}</p>
                  <p className="text-slate-500 text-sm font-medium italic mb-10 line-clamp-2">{form.description}</p>
                  
                  <div className="mt-auto pt-8 border-t border-[#1f2937] flex items-center justify-between">
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Total Steps</p>
                        <p className="text-xl font-black text-white italic">{form.steps?.length || 1}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Inventory</p>
                        <p className="text-xl font-black text-blue-500 italic">{form.steps?.reduce((acc, s) => acc + (s.fields?.length || 0), 0)} Fields</p>
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {forms.length === 0 && (
              <div className="col-span-full py-40 bg-white/[0.01] border-2 border-dashed border-[#1f2937] rounded-[4rem] flex flex-col items-center justify-center gap-6 text-center">
                 <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center text-slate-700"><Layout size={48} /></div>
                 <div>
                   <p className="text-xl font-black text-white italic">NO DYNAMIC FORMS DETECTED</p>
                   <p className="text-slate-500 font-medium italic mt-2 max-w-sm">Launch your first form to start capturing user data with multi-step logic and dynamic validations.</p>
                 </div>
                 <button onClick={handleCreateNewForm} className="px-10 py-5 bg-blue-500 text-white font-black italic rounded-2xl shadow-2xl uppercase tracking-widest text-xs hover:bg-blue-600 transition-all">INITIALIZE BUILD</button>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Edit({ size, ...props }) { return <Edit3 size={size} {...props} />; }

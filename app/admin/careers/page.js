'use client';

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Plus, Save, Trash2, MapPin, Clock, 
  IndianRupee, Loader2, Search, Edit3, X, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CareersAdmin() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState({ title: '', description: '', location: '', type: 'Full-time', salary: '', experience: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/admin/careers');
      const data = await res.json();
      if (!data.error) setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingJob)
      });
      if (res.ok) {
        setShowModal(false);
        fetchJobs();
        setEditingJob({ title: '', description: '', location: '', type: 'Full-time', salary: '', experience: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh] bg-[#0b1220]"><Loader2 className="animate-spin text-purple-500" size={48} /></div>;

  return (
    <div className="space-y-12 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">Careers <span className="text-purple-500">Hub.</span></h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1 italic">Deploy & Manage Job Vacancies</p>
        </div>
        <button 
          onClick={() => { setEditingJob({ title: '', description: '', location: '', type: 'Full-time', salary: '', experience: '' }); setShowModal(true); }}
          className="px-10 py-5 bg-purple-600 text-white rounded-[2rem] font-black italic shadow-2xl shadow-purple-600/20 hover:scale-105 transition-all uppercase tracking-widest text-xs"
        >
          <Plus size={20} className="inline mr-2" /> CREATE VACANCY
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <motion.div layout key={job._id} className="p-8 bg-[#111827] border border-[#1f2937] rounded-[3rem] group hover:border-purple-500/30 transition-all relative">
             <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                   <Briefcase size={28} />
                </div>
                <div className="flex gap-2">
                   <button onClick={() => { setEditingJob(job); setShowModal(true); }} className="p-3 bg-white/5 text-slate-400 rounded-xl hover:text-white transition-all"><Edit3 size={18} /></button>
                </div>
             </div>
             <h3 className="text-2xl font-black text-white italic mb-2">{job.title}</h3>
             <p className="text-slate-500 text-sm font-medium italic mb-8 line-clamp-2">{job.description}</p>
             
             <div className="space-y-3 pt-6 border-t border-[#1f2937]">
                <div className="flex items-center gap-3 text-slate-400">
                   <MapPin size={14} className="text-purple-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest">{job.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                   <Clock size={14} className="text-purple-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest">{job.type}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center gap-3 text-slate-400">
                     <IndianRupee size={14} className="text-purple-500" />
                     <span className="text-[10px] font-black uppercase tracking-widest">{job.salary}</span>
                  </div>
                )}
             </div>
          </motion.div>
        ))}

        {jobs.length === 0 && (
          <div className="col-span-full py-32 text-center bg-white/[0.01] border-2 border-dashed border-[#1f2937] rounded-[4rem]">
             <Briefcase size={48} className="mx-auto text-slate-700 mb-4" />
             <p className="text-white font-black italic uppercase tracking-widest text-sm">NO ACTIVE VACANCIES</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0b1220]/90 backdrop-blur-xl">
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-2xl bg-[#111827] border border-[#1f2937] rounded-[4rem] p-12 shadow-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-12">
                   <h2 className="text-3xl font-black text-white italic">Design <span className="text-purple-500">Vacancy.</span></h2>
                   <button onClick={() => setShowModal(false)} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white"><X size={24} /></button>
                </div>
                <form onSubmit={handleSave} className="space-y-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 italic">Job Title</label>
                      <input required type="text" value={editingJob.title} onChange={e => setEditingJob({...editingJob, title: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white font-black italic outline-none focus:border-purple-500 transition-all" />
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 italic">Location</label>
                        <input required type="text" value={editingJob.location} onChange={e => setEditingJob({...editingJob, location: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white font-black italic outline-none focus:border-purple-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 italic">Job Type</label>
                        <select value={editingJob.type} onChange={e => setEditingJob({...editingJob, type: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white font-black italic outline-none focus:border-purple-500 transition-all">
                           <option value="Full-time">Full-time</option>
                           <option value="Part-time">Part-time</option>
                           <option value="Contract">Contract</option>
                           <option value="Remote">Remote</option>
                        </select>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 italic">Job Description</label>
                      <textarea rows={4} value={editingJob.description} onChange={e => setEditingJob({...editingJob, description: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white font-medium italic outline-none focus:border-purple-500 transition-all" />
                   </div>
                   <button disabled={saving} className="w-full py-6 bg-purple-600 text-white font-black uppercase tracking-widest rounded-3xl transition-all shadow-2xl shadow-purple-600/20 hover:bg-purple-700 disabled:opacity-50 italic">
                      {saving ? <Loader2 size={24} className="animate-spin mx-auto" /> : 'AUTHORIZE VACANCY'}
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, ArrowLeft, Search, Filter, 
  Download, Calendar, User, Mail, Phone, ExternalLink, Trash2, Loader2, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function FormLeadsPage() {
  const params = useParams();
  const id = params?.id;
  const [form, setForm] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        console.log(`[DASHBOARD] Fetching data for ID: ${id}`);
        const [formRes, leadsRes] = await Promise.all([
          fetch(`/api/admin/cms/forms/${id}`),
          fetch(`/api/admin/cms/forms/${id}/responses`)
        ]);
        
        if (!formRes.ok || !leadsRes.ok) {
           throw new Error(`API Error: ${formRes.status} / ${leadsRes.status}`);
        }

        const formData = await formRes.json();
        const leadsData = await leadsRes.json();
        
        console.log(`[DASHBOARD] Form: ${formData?.formName}, Leads: ${leadsData?.length}`);
        
        setForm(formData);
        setLeads(Array.isArray(leadsData) ? leadsData : []);
      } catch (err) {
        console.error("[DASHBOARD ERROR]", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const exportToCSV = () => {
    if (!leads.length) return;
    
    // Headers
    const headers = ["Submitted At"];
    form.steps.forEach(step => {
      step.fields.forEach(field => {
        headers.push(field.label);
      });
    });

    // Rows
    const rows = leads.map(lead => {
      const row = [new Date(lead.createdAt).toLocaleString()];
      form.steps.forEach((step, sIdx) => {
        step.fields.forEach((field, fIdx) => {
          const val = lead.data?.[`${sIdx}-${fIdx}`] || "";
          row.push(Array.isArray(val) ? `"${val.join(", ")}"` : `"${val}"`);
        });
      });
      return row.join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${form.formName}_Leads_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={48} /></div>;

  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6">
         <div className="max-w-md w-full p-12 rounded-[3rem] bg-white/5 border border-white/10 text-center">
            <h1 className="text-4xl font-black text-white italic mb-4">ERROR</h1>
            <p className="text-slate-400 italic mb-8">{error}</p>
            <Link href="/admin/cms/forms" className="px-8 py-4 bg-white text-black font-black rounded-2xl italic uppercase text-xs inline-block">Back to Forms</Link>
         </div>
      </div>
    );
  }

  const filteredLeads = leads.filter(lead => {
    const searchStr = JSON.stringify(lead.data || {}).toLowerCase();
    return searchStr.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <Link href="/admin/cms/forms" className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] italic transition-all group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Forms
            </Link>
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none">
                {form?.formName} <span className="text-blue-500">Intelligence.</span>
              </h1>
              <p className="text-slate-500 mt-4 italic font-medium max-w-2xl">{form?.description}</p>
            </div>
          </div>
          <button 
            onClick={exportToCSV}
            className="flex items-center justify-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black italic rounded-2xl shadow-2xl shadow-emerald-500/20 transition-all uppercase tracking-widest text-xs"
          >
            <Download size={18} /> Export to Excel
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Total Leads', value: leads.length, color: 'blue' },
             { label: 'Today', value: leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length, color: 'emerald' },
             { label: 'Completion Rate', value: '100%', color: 'purple' },
             { label: 'Growth', value: '+12%', color: 'amber' }
           ].map((stat, i) => (
             <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic mb-2">{stat.label}</p>
                <p className={`text-4xl font-black italic text-${stat.color}-500`}>{stat.value}</p>
             </div>
           ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Search leads, names, emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white font-medium italic outline-none focus:border-blue-500 transition-all shadow-xl"
            />
          </div>
          <button className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"><Filter size={24} /></button>
        </div>

        {/* Leads Table */}
        <div className="rounded-[3rem] border border-white/10 bg-white/5 overflow-hidden backdrop-blur-xl shadow-4xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Submitted At</th>
                  {form?.steps?.[0]?.fields?.slice(0, 3).map((f, i) => (
                    <th key={i} className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{f.label}</th>
                  ))}
                  <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-widest italic text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, idx) => (
                  <tr key={lead._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                    <td className="p-8">
                       <p className="font-black italic text-white text-sm">{new Date(lead.createdAt).toLocaleDateString()}</p>
                       <p className="text-[10px] font-black text-slate-600 italic">{new Date(lead.createdAt).toLocaleTimeString()}</p>
                    </td>
                    {form?.steps?.[0]?.fields?.slice(0, 3).map((f, i) => {
                      const val = lead.data?.[`0-${i}`];
                      return (
                        <td key={i} className="p-8">
                           <p className="font-bold italic text-slate-300 text-sm">{Array.isArray(val) ? val.join(", ") : val || "—"}</p>
                        </td>
                      );
                    })}
                    <td className="p-8 text-right">
                       <button onClick={() => setSelectedLead(lead)} className="p-3 bg-white/5 text-slate-400 rounded-xl hover:text-white hover:bg-blue-500 transition-all"><ExternalLink size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredLeads.length === 0 && (
            <div className="p-32 text-center">
               <p className="text-xl font-black text-slate-700 italic uppercase tracking-widest">No Intelligence Data Found</p>
               <p className="text-slate-500 text-xs mt-2 italic">Captured leads will appear here automatically.</p>
            </div>
          )}
        </div>

        {/* Lead Details Modal */}
        <AnimatePresence>
          {selectedLead && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }} 
                className="w-full max-w-2xl max-h-[85vh] bg-[#0f172a] border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
              >
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <h2 className="text-xl font-black italic uppercase tracking-widest text-white">Lead Intelligence Report</h2>
                  <button onClick={() => setSelectedLead(null)} className="p-2 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-xl"><X size={20} /></button>
                </div>
                <div className="p-8 overflow-y-auto space-y-8">
                  {form?.steps?.map((step, sIdx) => (
                    <div key={sIdx} className="space-y-4">
                      <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest italic border-b border-white/5 pb-2">{step.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {step.fields.map((field, fIdx) => {
                          const val = selectedLead.data?.[`${sIdx}-${fIdx}`];
                          return (
                            <div key={fIdx} className="space-y-1 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{field.label}</p>
                              <div className="font-medium text-slate-200 break-words text-sm">
                                {Array.isArray(val) ? val.join(", ") : 
                                 (typeof val === 'string' && (val.startsWith('http') || val.startsWith('data:'))) ? 
                                 <a href={val} download={`attachment_${fIdx}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-2 mt-1"><Download size={14}/> Download Attached File</a> : 
                                 (val || "—")}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
                     <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Submission Timestamp</p>
                     <p className="text-sm font-bold text-emerald-400">{new Date(selectedLead.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

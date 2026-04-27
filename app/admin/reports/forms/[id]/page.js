'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, Loader2, ArrowLeft, Search, 
  Filter, Download, CheckCircle, XCircle, Clock,
  MoreVertical, Eye, Trash2, Calendar, User, Phone,
  ChevronRight, ExternalLink
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';

export default function SubmissionDashboard() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, [id]);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch(`/api/admin/reports/forms/${id}`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (submissionId, status) => {
    setUpdatingId(submissionId);
    try {
      const res = await fetch(`/api/admin/reports/forms/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionId, status })
      });
      if (res.ok) fetchSubmissions();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const exportToExcel = () => {
    if (!data?.submissions.length) return;
    
    // Flatten data for Excel
    const excelData = data.submissions.map(sub => {
      const flat = {
        'Submission ID': sub._id,
        'Status': sub.status,
        'Date': new Date(sub.createdAt).toLocaleString(),
        ...sub.data // Dynamic fields
      };
      return flat;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
    XLSX.writeFile(workbook, `${data.form.formName}_Submissions.xlsx`);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-[#0b1220]"><Loader2 className="animate-spin text-blue-500" size={48} /></div>;

  const filteredSubmissions = data.submissions.filter(sub => {
    const matchesSearch = JSON.stringify(sub.data).toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#0b1220] p-6 md:p-12 space-y-10">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
           <button onClick={() => router.push('/admin/cms/forms')} className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest italic mb-4 hover:text-white transition-all">
              <ArrowLeft size={14} /> Back to Forms
           </button>
           <h1 className="text-4xl md:text-5xl font-black text-white italic">{data.form.formName}</h1>
           <p className="text-slate-500 text-sm font-medium italic mt-2 uppercase tracking-tight">Audit & Control Dashboard • {data.submissions.length} Total Submissions</p>
        </div>

        <div className="flex flex-wrap gap-4">
           <button 
             onClick={exportToExcel}
             className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black italic shadow-2xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all uppercase tracking-widest text-[10px]"
           >
              <FileSpreadsheet size={18} /> EXCEL EXPORT
           </button>
           <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-1 flex">
              {['All', 'New', 'Accepted', 'Rejected'].map((status) => (
                <button 
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === status ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                >
                  {status}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Submissions Table/List */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-[3.5rem] overflow-hidden shadow-2xl">
         <div className="p-8 border-b border-[#1f2937] bg-[#0b1220]/30 flex items-center gap-4">
            <Search className="text-slate-600" size={20} />
            <input 
              type="text" 
              placeholder="Search across all fields..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-white font-medium italic w-full"
            />
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-[#0b1220]/50 border-b border-[#1f2937]">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Entry Date</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Submission Data</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Attachments</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Lifecycle</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[#1f2937]">
                  {filteredSubmissions.map((sub) => (
                    <tr key={sub._id} className="group hover:bg-white/[0.02] transition-colors">
                       <td className="px-8 py-8">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400">
                                <Calendar size={18} />
                             </div>
                             <div>
                                <p className="text-white font-black italic text-sm">{new Date(sub.createdAt).toLocaleDateString()}</p>
                                <p className="text-[10px] font-bold text-slate-600 uppercase">{new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-8 max-w-md">
                          <div className="space-y-2">
                             {Object.entries(sub.data || {}).slice(0, 3).map(([key, val]) => (
                               <div key={key} className="flex items-center gap-2 overflow-hidden">
                                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest shrink-0 italic">{key}:</span>
                                  <span className="text-xs font-bold text-slate-300 truncate italic">{val}</span>
                               </div>
                             ))}
                             {Object.keys(sub.data || {}).length > 3 && (
                               <p className="text-[9px] font-black text-blue-500 uppercase italic">+{Object.keys(sub.data).length - 3} more fields</p>
                             )}
                          </div>
                       </td>
                       <td className="px-8 py-8 text-center">
                          {sub.files?.length > 0 ? (
                            <div className="flex items-center justify-center -space-x-2">
                               {sub.files.map((file, i) => (
                                 <a key={i} href={file.url} target="_blank" className="w-8 h-8 rounded-lg bg-blue-500 border-2 border-[#111827] flex items-center justify-center text-white hover:z-10 transition-all hover:scale-110">
                                    <Eye size={14} />
                                 </a>
                               ))}
                            </div>
                          ) : (
                            <span className="text-[10px] font-black text-slate-700 uppercase italic">None</span>
                          )}
                       </td>
                       <td className="px-8 py-8">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic ${
                             sub.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-500' :
                             sub.status === 'Rejected' ? 'bg-red-500/10 text-red-500' :
                             'bg-blue-500/10 text-blue-400'
                          }`}>
                             {sub.status || 'New'}
                          </span>
                       </td>
                       <td className="px-8 py-8 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                             <button 
                               onClick={() => updateStatus(sub._id, 'Accepted')}
                               className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg"
                             >
                                <CheckCircle size={18} />
                             </button>
                             <button 
                               onClick={() => updateStatus(sub._id, 'Rejected')}
                               className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                             >
                                <XCircle size={18} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {filteredSubmissions.length === 0 && (
           <div className="py-32 text-center space-y-4">
              <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto text-slate-700">
                 <Filter size={40} />
              </div>
              <h3 className="text-xl font-black text-white italic uppercase tracking-widest">Zero Entries Found</h3>
              <p className="text-slate-500 font-medium italic">Adjust your search or filters to see more results.</p>
           </div>
         )}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Download, 
  CheckCircle, XCircle, Clock, MoreVertical,
  Eye, DownloadCloud, CheckCircle2, AlertCircle,
  TrendingUp, MapPin, Building2, User, ShieldCheck, CreditCard, Calendar,
  Globe, Briefcase, Heart, Info, FileText, Hash, Edit3, ArrowRight, Phone, Mail, Landmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';

export default function SakhiHubAdmin() {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ 
    status: '', state: '', search: '', startDate: '', endDate: ''
  });
  const [updating, setUpdating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [manualPartnerId, setManualPartnerId] = useState('');

  useEffect(() => {
    fetchApplications();
  }, [filter.status, filter.state]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.status) params.append('status', filter.status);
      if (filter.state) params.append('state', filter.state);
      if (filter.search) params.append('search', filter.search);
      if (filter.startDate) params.append('startDate', filter.startDate);
      if (filter.endDate) params.append('endDate', filter.endDate);

      const res = await fetch(`/api/sakhihub/admin?${params.toString()}`);
      const data = await res.json();
      setApplications(data.applications || []);
      setStats(data.stats || { total: 0, pending: 0, approved: 0, rejected: 0 });
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleExport = () => {
    if (applications.length === 0) { alert("No data to export"); return; }
    const dataToExport = applications.map(app => ({
      'App ID': app.applicationId, 'Partner ID': app.partnerId || 'N/A', 'Date': new Date(app.createdAt).toLocaleDateString(),
      'Status': app.status, 'Type': app.applicantType, 'Org': app.organizationName, 'Contact': app.contactPersonName,
      'Mobile': app.mobileNumber, 'Alt': app.alternateMobileNumber, 'Email': app.emailId, 'Aadhaar': app.aadhaarNumber, 'PAN': app.panNumber,
      'State': app.state, 'District': app.district, 'Bank': app.bankName, 'AC': app.accountNumber, 'IFSC': app.ifscCode
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, `SakhiHub_Master_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleStatusUpdate = async (id, status, pId) => {
    let finalPartnerId = pId;
    let adminRemarks = '';

    if (status === 'Approved' && !finalPartnerId) {
      alert("Please enter a Partner ID first");
      return;
    }

    if (status === 'Rejected') {
      adminRemarks = window.prompt("Rejection Reason:");
      if (adminRemarks === null) return;
    }

    setUpdating(true);
    try {
      const res = await fetch('/api/sakhihub/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, adminRemarks, partnerId: finalPartnerId })
      });
      if (res.ok) {
        fetchApplications();
        alert(`Updated to ${status}`);
      }
    } catch (err) { alert('Failed'); }
    finally { setUpdating(false); }
  };

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">SakhiHub Command Center</h1>
          <p className="text-slate-400 font-bold italic tracking-widest mt-2 flex items-center gap-2">
            <span className="w-8 h-1 bg-[#B32D2D]"></span> REAL-TIME PARTNER ONBOARDING
          </p>
        </motion.div>
        <button onClick={handleExport} className="px-10 py-5 bg-[#B32D2D] hover:bg-red-800 text-white font-black rounded-[2rem] flex items-center gap-4 transition-all shadow-[0_10px_40px_rgba(179,45,45,0.3)] active:scale-95 text-xs uppercase italic tracking-widest">
          <Download size={24} /> Export All Data
        </button>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Leads" value={stats.total} icon={Users} color="indigo" />
        <StatCard title="Pending" value={stats.pending} icon={Clock} color="amber" />
        <StatCard title="Active Partners" value={stats.approved} icon={CheckCircle} color="green" />
        <StatCard title="Rejected" value={stats.rejected} icon={XCircle} color="red" />
      </div>

      {/* Advanced Control Bar */}
      <div className="bg-[#1e293b]/50 backdrop-blur-3xl border-4 border-slate-800 p-10 rounded-[4rem] shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
            <input 
              type="text" 
              placeholder="Search anything (ID, Name, Mobile, Email)..." 
              className="w-full pl-16 pr-10 py-6 bg-[#0f172a] border-2 border-slate-800 rounded-[2rem] text-white font-bold focus:border-[#B32D2D] outline-none transition-all shadow-inner placeholder:italic"
              value={filter.search}
              onChange={(e) => setFilter(p => ({ ...p, search: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && fetchApplications()}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
             <input type="date" className="px-8 py-6 bg-[#0f172a] border-2 border-slate-800 rounded-[2rem] text-white font-bold text-xs outline-none focus:border-[#B32D2D]" value={filter.startDate} onChange={(e) => setFilter(p => ({ ...p, startDate: e.target.value }))} />
             <input type="date" className="px-8 py-6 bg-[#0f172a] border-2 border-slate-800 rounded-[2rem] text-white font-bold text-xs outline-none focus:border-[#B32D2D]" value={filter.endDate} onChange={(e) => setFilter(p => ({ ...p, endDate: e.target.value }))} />
             <select className="px-10 py-6 bg-[#0f172a] border-2 border-slate-800 rounded-[2rem] text-white font-black text-xs outline-none focus:border-[#B32D2D] appearance-none cursor-pointer" value={filter.status} onChange={(e) => setFilter(p => ({ ...p, status: e.target.value }))}>
                <option value="">ALL STATUS</option>
                <option value="New">NEW</option>
                <option value="Approved">APPROVED</option>
                <option value="Rejected">REJECTED</option>
              </select>
          </div>
          <button onClick={fetchApplications} className="px-14 py-6 bg-[#B32D2D] text-white font-black rounded-[2rem] hover:bg-red-800 transition-all shadow-xl active:scale-95 text-xs uppercase italic tracking-widest">Execute Search</button>
        </div>
      </div>

      {/* Main Content Area - Full Data Cards */}
      <div className="space-y-10">
        {loading ? (
          <div className="py-40 text-center"><Loader2 className="animate-spin text-[#B32D2D] mx-auto mb-8" size={64} /><p className="text-slate-500 font-black italic text-xl uppercase tracking-widest">Accessing Secure Records...</p></div>
        ) : applications.length === 0 ? (
          <div className="py-40 text-center bg-[#1e293b]/30 rounded-[4rem] border-4 border-dashed border-slate-800"><p className="text-slate-600 font-black italic text-3xl uppercase opacity-20">No Applications Found</p></div>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {applications.map((app) => (
              <motion.div 
                key={app._id} 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0f172a] border-4 border-slate-800 rounded-[4rem] overflow-hidden shadow-2xl relative group"
              >
                {/* Card Header */}
                <div className="p-10 border-b-2 border-slate-800 bg-[#1e293b]/50 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-[#B32D2D] rounded-[2rem] flex items-center justify-center text-white shadow-2xl rotate-[-3deg] border-4 border-[#DEB887]/20 group-hover:rotate-0 transition-transform duration-500"><Building2 size={40} /></div>
                    <div>
                      <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">{app.organizationName}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-[10px] font-black text-[#DEB887] uppercase tracking-[0.4em]">{app.applicationId}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                        <span className="text-[11px] font-black text-slate-500 uppercase">{app.applicantType}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-[9px] font-black text-slate-600 uppercase italic">Submitted On</p>
                      <p className="text-xs font-bold text-slate-400">{new Date(app.createdAt).toLocaleString()}</p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                </div>

                {/* Card Content - Full Data Visualization */}
                <div className="p-12 grid grid-cols-1 lg:grid-cols-4 gap-12 bg-[#0f172a]">
                  {/* Column 1: Contact */}
                  <div className="space-y-8">
                    <SectionTitle icon={User} title="Contact Info" />
                    <div className="space-y-4">
                      <DataItem label="Contact Person" value={app.contactPersonName} />
                      <DataItem label="Primary Mobile" value={app.mobileNumber} icon={Phone} />
                      <DataItem label="Alternate Mobile" value={app.alternateMobileNumber} />
                      <DataItem label="WhatsApp" value={app.whatsappNumber} />
                      <DataItem label="Email ID" value={app.emailId} icon={Mail} color="text-indigo-400" />
                    </div>
                  </div>

                  {/* Column 2: Legal & Identity */}
                  <div className="space-y-8">
                    <SectionTitle icon={ShieldCheck} title="Legal & Identity" />
                    <div className="space-y-4">
                      <DataItem label="Aadhaar" value={app.aadhaarNumber} />
                      <DataItem label="PAN Number" value={app.panNumber} />
                      <DataItem label="GST Number" value={app.gstNumber} />
                      <DataItem label="Reg Number" value={app.ngoRegistrationNumber || app.firmRegistrationNumber || app.udyamMsmeNumber} />
                    </div>
                  </div>

                  {/* Column 3: Address & Work */}
                  <div className="space-y-8">
                    <SectionTitle icon={MapPin} title="Address & Work" />
                    <div className="space-y-4">
                      <DataItem label="Location" value={`${app.district}, ${app.state}`} />
                      <DataItem label="PIN Code" value={app.pincode} />
                      <DataItem label="Work Type" value={app.workAreaType} />
                      <DataItem label="Interests" value={app.interestedWorkCategories?.join(', ')} />
                    </div>
                  </div>

                  {/* Column 4: Bank Details & Actions */}
                  <div className="space-y-8">
                    <SectionTitle icon={CreditCard} title="Bank & Status" />
                    <div className="space-y-4">
                      <DataItem label="Bank Name" value={app.bankName} icon={Landmark} />
                      <DataItem label="A/C Holder" value={app.accountHolderName} />
                      <DataItem label="A/C Number" value={app.accountNumber} />
                      <DataItem label="IFSC Code" value={app.ifscCode} />
                    </div>
                  </div>
                </div>

                {/* Card Footer: Action Bar */}
                <div className="px-12 py-10 bg-[#1e293b]/30 border-t-2 border-slate-800 flex flex-col lg:flex-row justify-between items-center gap-8">
                   <div className="flex-1 w-full flex flex-col md:flex-row items-center gap-6">
                      <div className="relative flex-1 w-full">
                         <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B32D2D]" size={20} />
                         <input 
                           type="text" 
                           placeholder="Assign Partner ID (e.g. SH-NGO-MP-01)" 
                           className="w-full pl-12 pr-6 py-4 bg-[#0f172a] border-2 border-slate-700 rounded-2xl text-sm font-black text-white outline-none focus:border-[#B32D2D] transition-all uppercase italic"
                           defaultValue={app.partnerId}
                           id={`pid-${app._id}`}
                         />
                      </div>
                      <button 
                        onClick={() => handleStatusUpdate(app._id, 'Approved', document.getElementById(`pid-${app._id}`).value)}
                        className="w-full md:w-auto px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-green-900/20 active:scale-95 italic uppercase text-xs"
                      >
                        <CheckCircle2 size={20} /> Approve & Send Mail
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(app._id, 'Rejected')}
                        className="w-full md:w-auto px-10 py-4 bg-red-600/10 text-red-500 border-2 border-red-500/20 font-black rounded-2xl hover:bg-red-600 hover:text-white transition-all text-xs italic uppercase"
                      >
                        <XCircle size={20} /> Reject
                      </button>
                   </div>
                   
                   <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        {Object.entries(app.documents || {}).map(([key, url]) => (
                          url && (
                            <a key={key} href={url} target="_blank" rel="noreferrer" title={key} className="w-12 h-12 bg-[#0f172a] border-2 border-slate-800 rounded-xl flex items-center justify-center text-[#B32D2D] hover:bg-[#B32D2D] hover:text-white transition-all shadow-lg">
                               <FileText size={20} />
                            </a>
                          )
                        ))}
                      </div>
                      <div className="w-px h-10 bg-slate-800"></div>
                      <button className="p-4 bg-[#B32D2D] text-white rounded-2xl shadow-xl hover:bg-red-800 transition-all"><Eye size={24} /></button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const colors = { indigo: 'from-indigo-600/30 to-slate-900 border-indigo-500/30', amber: 'from-amber-600/30 to-slate-900 border-amber-500/30', green: 'from-green-600/30 to-slate-900 border-green-500/30', red: 'from-red-600/30 to-slate-900 border-red-500/30' };
  return (<div className={`p-10 bg-gradient-to-br ${colors[color]} border-4 rounded-[3.5rem] shadow-2xl relative overflow-hidden group hover:scale-[1.05] transition-all duration-500`}><div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity"><Icon size={100} /></div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 italic">{title}</p><p className="text-6xl font-black text-white tracking-tighter">{value}</p></div>);
}

function StatusBadge({ status }) {
  const colors = { 'New': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30', 'Approved': 'bg-green-500/20 text-green-400 border-green-500/30 shadow-lg shadow-green-900/20', 'Rejected': 'bg-red-500/10 text-red-400 border-red-500/30', 'Under Review': 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
  return (<span className={`px-10 py-3 rounded-full border-2 text-[11px] font-black uppercase tracking-widest italic ${colors[status] || colors['New']}`}>{status}</span>);
}

function SectionTitle({ icon: Icon, title }) {
  return (<div className="flex items-center gap-3 pb-3 border-b-2 border-slate-800 mb-4"><div className="p-2 bg-[#B32D2D]/10 rounded-lg text-[#B32D2D]"><Icon size={16} /></div><h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">{title}</h4></div>);
}

function DataItem({ label, value, icon: Icon, color="text-slate-300" }) {
  return (
    <div className="group/item">
      <p className="text-[9px] font-black text-slate-600 uppercase tracking-tighter mb-1 italic group-hover/item:text-[#B32D2D] transition-colors">{label}</p>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={12} className="text-[#B32D2D]" />}
        <p className={`text-xs font-bold ${color} break-all`}>{value || '---'}</p>
      </div>
    </div>
  );
}

function Loader2(props) { return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>); }

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Download, 
  CheckCircle, XCircle, Clock, MoreVertical,
  Eye, DownloadCloud, CheckCircle2, AlertCircle,
  TrendingUp, MapPin, Building2, User, ShieldCheck, CreditCard, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';

export default function SakhiHubAdmin() {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ 
    status: '', 
    state: '', 
    search: '',
    startDate: '',
    endDate: ''
  });
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (applications.length === 0) {
      alert("No data to export");
      return;
    }

    const dataToExport = applications.map(app => ({
      'Application ID': app.applicationId,
      'Date': new Date(app.createdAt).toLocaleDateString(),
      'Status': app.status,
      'Organization Name': app.organizationName,
      'Contact Person': app.contactPersonName,
      'Mobile': app.mobileNumber,
      'Email': app.emailId,
      'WhatsApp': app.whatsappNumber,
      'Aadhaar': app.aadhaarNumber,
      'PAN': app.panNumber,
      'State': app.state,
      'District': app.district,
      'Address': app.address,
      'Work Type': app.workAreaType,
      'Bank Name': app.bankName,
      'Account Number': app.accountNumber,
      'IFSC': app.ifscCode
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, `SakhiHub_Applications_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleStatusUpdate = async (id, status, remarks) => {
    const confirmation = window.confirm(`Are you sure you want to mark this as ${status}?`);
    if (!confirmation) return;

    try {
      let partnerId = '';
      if (status === 'Approved') {
        const app = applications.find(a => a._id === id);
        const stateCode = (app.state || 'IN').substring(0, 2).toUpperCase();
        const typeCode = (app.applicantType || 'IND').substring(0, 3).toUpperCase();
        partnerId = `SH-${typeCode}-${stateCode}-${Math.floor(100 + Math.random() * 899)}`;
      }

      const res = await fetch('/api/sakhihub/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, adminRemarks: remarks, partnerId })
      });
      if (res.ok) {
        fetchApplications();
        setIsModalOpen(false);
        alert(`Application marked as ${status}`);
      }
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight italic uppercase">SakhiHub Applications</h1>
          <p className="text-slate-400 font-medium italic">Advanced Management Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="px-6 py-4 bg-[#B32D2D] hover:bg-red-800 text-white font-black rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-red-900/20 active:scale-95"
          >
            <Download size={20} /> EXPORT TO EXCEL
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Apps" value={stats.total} icon={Users} color="indigo" />
        <StatCard title="Pending" value={stats.pending} icon={Clock} color="amber" />
        <StatCard title="Approved" value={stats.approved} icon={CheckCircle} color="green" />
        <StatCard title="Rejected" value={stats.rejected} icon={XCircle} color="red" />
      </div>

      {/* Advanced Filters */}
      <div className="bg-[#1e293b]/50 backdrop-blur-xl border-2 border-slate-800 p-8 rounded-[3rem] space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by Mobile, ID, Name or Email..." 
              className="w-full pl-12 pr-6 py-4 bg-[#0f172a] border-2 border-slate-800 rounded-2xl text-white font-bold focus:border-[#B32D2D] outline-none transition-all"
              value={filter.search}
              onChange={(e) => setFilter(p => ({ ...p, search: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && fetchApplications()}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:w-auto">
             <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="date" 
                  className="w-full pl-10 pr-3 py-4 bg-[#0f172a] border-2 border-slate-800 rounded-2xl text-white font-bold text-xs outline-none focus:border-[#B32D2D]"
                  value={filter.startDate}
                  onChange={(e) => setFilter(p => ({ ...p, startDate: e.target.value }))}
                />
             </div>
             <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="date" 
                  className="w-full pl-10 pr-3 py-4 bg-[#0f172a] border-2 border-slate-800 rounded-2xl text-white font-bold text-xs outline-none focus:border-[#B32D2D]"
                  value={filter.endDate}
                  onChange={(e) => setFilter(p => ({ ...p, endDate: e.target.value }))}
                />
             </div>
             <select 
                className="px-6 py-4 bg-[#0f172a] border-2 border-slate-800 rounded-2xl text-white font-black text-xs outline-none focus:border-[#B32D2D] appearance-none cursor-pointer"
                value={filter.status}
                onChange={(e) => setFilter(p => ({ ...p, status: e.target.value }))}
              >
                <option value="">ALL STATUS</option>
                <option value="New">NEW</option>
                <option value="Under Review">REVIEW</option>
                <option value="Approved">APPROVED</option>
                <option value="Rejected">REJECTED</option>
              </select>
          </div>
          <button onClick={fetchApplications} className="px-10 py-4 bg-[#B32D2D] text-white font-black rounded-2xl hover:bg-red-800 transition-all shadow-lg active:scale-95 text-xs italic uppercase">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1e293b]/50 backdrop-blur-xl border-2 border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-slate-800 bg-[#0f172a]/50">
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Application & Date</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Partner & Contact</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Location</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest italic text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-800">
              {loading ? (
                <tr><td colSpan="5" className="px-8 py-20 text-center"><Loader2 className="animate-spin text-[#B32D2D] mx-auto mb-4" size={40} /><p className="text-slate-500 font-bold italic">Loading Records...</p></td></tr>
              ) : applications.length === 0 ? (
                <tr><td colSpan="5" className="px-8 py-20 text-center text-slate-500 font-black italic">NO RECORDS FOUND</td></tr>
              ) : applications.map((app) => (
                <tr key={app._id} className="hover:bg-[#B32D2D]/5 transition-colors group">
                  <td className="px-10 py-6">
                    <div>
                      <p className="text-sm font-black text-white italic">{app.organizationName}</p>
                      <p className="text-[9px] text-[#B32D2D] font-black uppercase tracking-widest mt-1">{app.applicationId}</p>
                      <p className="text-[8px] text-slate-500 mt-0.5">{new Date(app.createdAt).toLocaleString()}</p>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <p className="text-xs font-black text-slate-300">{app.applicantType}</p>
                    <p className="text-[10px] text-slate-500 font-bold">{app.contactPersonName}</p>
                    <p className="text-[9px] text-indigo-400 font-medium">{app.emailId}</p>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-300 uppercase italic">
                      <MapPin size={14} className="text-[#B32D2D]" /> {app.district}, {app.state}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-10 py-6 text-center">
                    <button 
                      onClick={() => { setSelectedApp(app); setIsModalOpen(true); }}
                      className="p-4 bg-slate-800 text-slate-400 rounded-2xl hover:bg-[#B32D2D] hover:text-white transition-all shadow-lg active:scale-90"
                    >
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedApp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/70">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-[#0f172a] border-4 border-slate-800 w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[4rem] shadow-[0_0_100px_rgba(179,45,45,0.2)] flex flex-col"
            >
              <div className="p-10 border-b-4 border-slate-800 flex justify-between items-center bg-[#1e293b]/50">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#B32D2D] rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl rotate-[-3deg]">
                    <Building2 size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white italic uppercase tracking-tight">{selectedApp.organizationName}</h2>
                    <p className="text-xs font-black text-[#B32D2D] uppercase tracking-[0.3em]">{selectedApp.applicationId}</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-4 bg-slate-800 text-slate-400 rounded-full hover:bg-red-600 hover:text-white transition-all">
                  <XCircle size={32} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-12 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="md:col-span-2 space-y-12">
                    <DetailSection title="Basic Details" icon={User}>
                      <DetailItem label="Applicant Type" value={selectedApp.applicantType} />
                      <DetailItem label="Contact Person" value={selectedApp.contactPersonName} />
                      <DetailItem label="Mobile" value={selectedApp.mobileNumber} />
                      <DetailItem label="Email" value={selectedApp.emailId} />
                      <DetailItem label="WhatsApp" value={selectedApp.whatsappNumber} />
                      <DetailItem label="Website" value={selectedApp.websiteSocialLink} />
                    </DetailSection>

                    <DetailSection title="Legal Documents" icon={ShieldCheck}>
                      <DetailItem label="Aadhaar" value={selectedApp.aadhaarNumber ? `XXXX XXXX ${selectedApp.aadhaarNumber.slice(-4)}` : 'N/A'} />
                      <DetailItem label="PAN" value={selectedApp.panNumber} />
                      <DetailItem label="GST #" value={selectedApp.gstNumber} />
                      <DetailItem label="NGO/Firm #" value={selectedApp.ngoRegistrationNumber || selectedApp.firmRegistrationNumber} />
                    </DetailSection>

                    <DetailSection title="Area of Operation" icon={MapPin}>
                      <DetailItem label="Full Address" value={selectedApp.address} />
                      <DetailItem label="District/State" value={`${selectedApp.district}, ${selectedApp.state}`} />
                      <DetailItem label="Work Type" value={selectedApp.workAreaType} />
                      <DetailItem label="Manual Entry" value={selectedApp.manualWorkArea} />
                    </DetailSection>

                    <DetailSection title="Interests & Capacity" icon={Heart}>
                      <div className="md:col-span-2">
                         <p className="text-[10px] font-black text-slate-600 uppercase mb-2 italic">Work Categories</p>
                         <div className="flex flex-wrap gap-2">
                            {selectedApp.interestedWorkCategories?.map(c => (
                              <span key={c} className="px-4 py-2 bg-[#B32D2D]/10 text-[#B32D2D] rounded-xl text-[10px] font-black border border-[#B32D2D]/20 uppercase">{c}</span>
                            ))}
                         </div>
                      </div>
                      <DetailItem label="Monthly Capacity" value={selectedApp.monthlyCapacity} />
                      <DetailItem label="Team Size" value={selectedApp.teamSize} />
                    </DetailSection>

                    <DetailSection title="Banking" icon={CreditCard}>
                      <DetailItem label="Bank Name" value={selectedApp.bankName} />
                      <DetailItem label="A/C Holder" value={selectedApp.accountHolderName} />
                      <DetailItem label="A/C Number" value={selectedApp.accountNumber ? `XXXX XXXX ${selectedApp.accountNumber.slice(-4)}` : 'N/A'} />
                      <DetailItem label="IFSC" value={selectedApp.ifscCode} />
                    </DetailSection>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-[#1e293b] p-8 rounded-[3rem] border-2 border-slate-800 space-y-6">
                      <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 italic underline decoration-[#B32D2D] decoration-2">Status Actions</h4>
                      <StatusBadge status={selectedApp.status} />
                      
                      <div className="space-y-4 pt-4 border-t-2 border-slate-800">
                        <button onClick={() => handleStatusUpdate(selectedApp._id, 'Approved')} className="w-full py-5 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-3 active:scale-95 italic">
                          <CheckCircle2 size={20} /> APPROVE
                        </button>
                        <button onClick={() => handleStatusUpdate(selectedApp._id, 'Rejected')} className="w-full py-5 bg-red-600/10 text-red-500 border-2 border-red-500/20 font-black rounded-2xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 italic">
                          <XCircle size={20} /> REJECT
                        </button>
                        <button onClick={() => handleStatusUpdate(selectedApp._id, 'Hold')} className="w-full py-5 bg-amber-600/10 text-amber-500 border-2 border-amber-500/20 font-black rounded-2xl hover:bg-amber-600 hover:text-white transition-all italic active:scale-95">
                          PUT ON HOLD
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#1e293b] p-8 rounded-[3rem] border-2 border-slate-800">
                      <h4 className="text-xs font-black text-white uppercase tracking-widest mb-6 italic underline decoration-[#B32D2D] decoration-2">Document Proofs</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(selectedApp.documents || {}).map(([key, url]) => (
                          url && (
                            <a key={key} href={url} target="_blank" rel="noreferrer" className="p-4 bg-[#0f172a] border-2 border-slate-800 rounded-2xl flex flex-col items-center gap-3 hover:border-[#B32D2D] transition-all group shadow-sm">
                              <div className="w-12 h-12 bg-[#B32D2D]/10 rounded-xl flex items-center justify-center text-[#B32D2D] group-hover:bg-[#B32D2D] group-hover:text-white transition-all shadow-inner">
                                <DownloadCloud size={24} />
                              </div>
                              <span className="text-[8px] font-black text-slate-500 uppercase text-center truncate w-full group-hover:text-slate-300">{key}</span>
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const colors = {
    indigo: 'from-indigo-600/20 to-indigo-600/5 text-indigo-400 border-indigo-500/20',
    amber: 'from-amber-600/20 to-amber-600/5 text-amber-400 border-amber-500/20',
    green: 'from-green-600/20 to-green-600/5 text-green-400 border-green-500/20',
    red: 'from-red-600/20 to-red-600/5 text-red-400 border-red-500/20',
  };

  return (
    <div className={`p-10 bg-gradient-to-br ${colors[color]} border-2 rounded-[3rem] shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-all`}>
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={100} />
      </div>
      <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3 italic">{title}</p>
      <p className="text-5xl font-black text-white">{value}</p>
      <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase italic">
        <TrendingUp size={14} className="text-[#B32D2D]" /> +12% growth
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    'New': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    'Approved': 'bg-green-500/10 text-green-400 border-green-500/20',
    'Rejected': 'bg-red-500/10 text-red-400 border-red-500/20',
    'Hold': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Under Review': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  return (
    <span className={`px-6 py-2 rounded-full border-2 text-[10px] font-black uppercase tracking-widest italic ${colors[status] || colors['New']}`}>
      {status}
    </span>
  );
}

function DetailSection({ title, icon: Icon, children }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b-2 border-slate-800">
        <Icon size={20} className="text-[#B32D2D]" />
        <h3 className="text-sm font-black text-white uppercase tracking-widest italic">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {children}
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="group">
      <p className="text-[9px] font-black text-slate-600 uppercase tracking-tighter mb-1.5 italic group-hover:text-[#B32D2D] transition-colors">{label}</p>
      <p className="text-[13px] font-bold text-slate-300 break-all">{value || 'NOT PROVIDED'}</p>
    </div>
  );
}

function Loader2(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Download, 
  CheckCircle, XCircle, Clock, MoreVertical,
  Eye, DownloadCloud, CheckCircle2, AlertCircle,
  TrendingUp, MapPin, Building2, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SakhiHubAdmin() {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', state: '', search: '' });
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [filter.status, filter.state]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filter).toString();
      const res = await fetch(`/api/sakhihub/admin?${query}`);
      const data = await res.json();
      setApplications(data.applications || []);
      setStats(data.stats || { total: 0, pending: 0, approved: 0, rejected: 0 });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status, remarks) => {
    try {
      // Logic for Partner ID generation if approved
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
          <h1 className="text-3xl font-black text-white tracking-tight">SakhiHub Applications</h1>
          <p className="text-slate-400 font-medium">Manage and review partner onboarding requests</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20">
            <Download size={20} /> Export to Excel
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

      {/* Filters & Search */}
      <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by Mobile, ID, or Organization..." 
            className="w-full pl-12 pr-6 py-4 bg-[#0f172a] border border-slate-800 rounded-2xl text-white font-bold focus:border-indigo-500 outline-none transition-all"
            value={filter.search}
            onChange={(e) => setFilter(p => ({ ...p, search: e.target.value }))}
            onKeyDown={(e) => e.key === 'Enter' && fetchApplications()}
          />
        </div>
        <select 
          className="px-6 py-4 bg-[#0f172a] border border-slate-800 rounded-2xl text-white font-bold focus:border-indigo-500 outline-none"
          value={filter.status}
          onChange={(e) => setFilter(p => ({ ...p, status: e.target.value }))}
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Under Review">Under Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button onClick={fetchApplications} className="px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all">
          Apply Filters
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#0f172a]/50">
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Application</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Partner Type</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Location</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr><td colSpan="5" className="px-8 py-20 text-center text-slate-500 font-bold">Loading applications...</td></tr>
              ) : applications.length === 0 ? (
                <tr><td colSpan="5" className="px-8 py-20 text-center text-slate-500 font-bold">No applications found</td></tr>
              ) : applications.map((app) => (
                <tr key={app._id} className="hover:bg-indigo-500/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 font-bold">
                        {app.organizationName?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-white">{app.organizationName}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{app.applicationId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-300">{app.applicantType}</span>
                    <p className="text-[10px] text-slate-500">{app.contactPersonName}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                      <MapPin size={14} className="text-indigo-500" /> {app.district}, {app.state}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => { setSelectedApp(app); setIsModalOpen(true); }}
                      className="p-3 bg-slate-800 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                    >
                      <Eye size={18} />
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0f172a] border border-slate-800 w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-[#1e293b]/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">{selectedApp.organizationName}</h2>
                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-[0.2em]">{selectedApp.applicationId}</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-800 text-slate-400 rounded-full hover:bg-red-500 hover:text-white transition-all">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-10 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {/* Left Column: Details */}
                  <div className="md:col-span-2 space-y-10">
                    <DetailSection title="Basic Information" icon={User}>
                      <DetailItem label="Applicant Type" value={selectedApp.applicantType} />
                      <DetailItem label="Contact Person" value={selectedApp.contactPersonName} />
                      <DetailItem label="Mobile" value={selectedApp.mobileNumber} />
                      <DetailItem label="Alternate Mobile" value={selectedApp.alternateMobileNumber} />
                      <DetailItem label="Email" value={selectedApp.emailId} />
                      <DetailItem label="WhatsApp" value={selectedApp.whatsappNumber} />
                    </DetailSection>

                    <DetailSection title="Identity & Legal" icon={ShieldCheck}>
                      <DetailItem label="Aadhaar" value={selectedApp.aadhaarNumber ? `XXXX XXXX ${selectedApp.aadhaarNumber.slice(-4)}` : 'N/A'} />
                      <DetailItem label="PAN" value={selectedApp.panNumber} />
                      <DetailItem label="GST" value={selectedApp.gstNumber} />
                      <DetailItem label="NGO Reg #" value={selectedApp.ngoRegistrationNumber} />
                    </DetailSection>

                    <DetailSection title="Location & Work Area" icon={MapPin}>
                      <DetailItem label="Full Address" value={selectedApp.address} />
                      <DetailItem label="District/State" value={`${selectedApp.district}, ${selectedApp.state}`} />
                      <DetailItem label="Work Type" value={selectedApp.workAreaType} />
                      <DetailItem label="States" value={selectedApp.selectedStates?.join(', ')} />
                    </DetailSection>

                    <DetailSection title="Bank Details" icon={CreditCard}>
                      <DetailItem label="Bank Name" value={selectedApp.bankName} />
                      <DetailItem label="A/C Holder" value={selectedApp.accountHolderName} />
                      <DetailItem label="A/C Number" value={selectedApp.accountNumber ? `XXXX XXXX ${selectedApp.accountNumber.slice(-4)}` : 'N/A'} />
                      <DetailItem label="IFSC" value={selectedApp.ifscCode} />
                    </DetailSection>
                  </div>

                  {/* Right Column: Actions & Documents */}
                  <div className="space-y-8">
                    <div className="bg-slate-800/50 p-6 rounded-[2rem] border border-slate-700 space-y-6">
                      <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Application Status</h4>
                      <StatusBadge status={selectedApp.status} />
                      
                      <div className="space-y-4 pt-4 border-t border-slate-700">
                        <button 
                          onClick={() => handleStatusUpdate(selectedApp._id, 'Approved')}
                          className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 size={18} /> Approve Application
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(selectedApp._id, 'Rejected')}
                          className="w-full py-4 bg-red-600/10 text-red-500 border border-red-500/20 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <XCircle size={18} /> Reject
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(selectedApp._id, 'Hold')}
                          className="w-full py-4 bg-amber-600/10 text-amber-500 border border-amber-500/20 font-bold rounded-2xl hover:bg-amber-600 hover:text-white transition-all"
                        >
                          Put on Hold
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 p-6 rounded-[2rem] border border-slate-700">
                      <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Documents</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(selectedApp.documents || {}).map(([key, url]) => (
                          url && (
                            <a 
                              key={key} 
                              href={url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="p-3 bg-[#0f172a] border border-slate-700 rounded-xl flex flex-col items-center gap-2 hover:border-indigo-500 transition-all"
                            >
                              <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400">
                                <DownloadCloud size={18} />
                              </div>
                              <span className="text-[8px] font-bold text-slate-400 uppercase text-center truncate w-full">{key}</span>
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
    <div className={`p-8 bg-gradient-to-br ${colors[color]} border rounded-[2rem] shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-all`}>
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={80} />
      </div>
      <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{title}</p>
      <p className="text-4xl font-black text-white">{value}</p>
      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400">
        <TrendingUp size={12} className="text-indigo-500" /> +12% from last week
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
    <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${colors[status] || colors['New']}`}>
      {status}
    </span>
  );
}

function DetailSection({ title, icon: Icon, children }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
        <Icon size={16} className="text-indigo-500" />
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-[9px] font-black text-slate-600 uppercase tracking-tighter mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-300 break-all">{value || 'Not Provided'}</p>
    </div>
  );
}

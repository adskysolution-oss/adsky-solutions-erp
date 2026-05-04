'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Download, 
  CheckCircle, XCircle, Clock, MoreVertical,
  Eye, DownloadCloud, CheckCircle2, AlertCircle,
  TrendingUp, MapPin, Building2, User, ShieldCheck, CreditCard, Calendar,
  Globe, Briefcase, Heart, Info, FileText, Hash, Edit3, Loader2, ArrowRight
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
  const [updating, setUpdating] = useState(false);
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (app) => {
    setSelectedApp(app);
    setManualPartnerId(app.partnerId || '');
    setIsModalOpen(true);
  };

  const handleExport = () => {
    if (applications.length === 0) { alert("No data to export"); return; }
    const dataToExport = applications.map(app => ({
      'Application ID': app.applicationId, 'Partner ID': app.partnerId || 'N/A', 'Date': new Date(app.createdAt).toLocaleDateString(),
      'Status': app.status, 'Applicant Type': app.applicantType, 'Organization Name': app.organizationName, 'Contact Person': app.contactPersonName,
      'Mobile': app.mobileNumber, 'Alt Mobile': app.alternateMobileNumber, 'Email': app.emailId, 'Aadhaar': app.aadhaarNumber, 'PAN': app.panNumber,
      'State': app.state, 'District': app.district, 'Work Type': app.workAreaType, 'Bank Name': app.bankName, 'Account Number': app.accountNumber, 'IFSC': app.ifscCode
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, `SakhiHub_Applications_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleStatusUpdate = async (id, status) => {
    let finalPartnerId = manualPartnerId;
    let adminRemarks = '';

    if (status === 'Approved' && !finalPartnerId) {
      const app = applications.find(a => a._id === id);
      const stateCode = (app.state || 'IN').substring(0, 2).toUpperCase();
      const typeCode = (app.applicantType || 'IND').substring(0, 3).toUpperCase();
      finalPartnerId = `SH-${typeCode}-${stateCode}-${Math.floor(100 + Math.random() * 899)}`;
    }

    if (status === 'Rejected') {
      adminRemarks = window.prompt("Enter rejection reason:");
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
        setIsModalOpen(false);
        alert(`Status updated to ${status}. Notification sent.`);
      }
    } catch (err) {
      alert('Update failed');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h1 className="text-3xl font-black text-white tracking-tight italic uppercase">SakhiHub Applications</h1><p className="text-slate-400 font-medium italic underline decoration-[#B32D2D] decoration-2">Advanced Management Dashboard</p></div>
        <button onClick={handleExport} className="px-8 py-5 bg-[#B32D2D] hover:bg-red-800 text-white font-black rounded-3xl flex items-center gap-3 transition-all shadow-2xl shadow-red-900/30 active:scale-95 text-sm uppercase italic"><Download size={20} /> Export Master List</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Apps" value={stats.total} icon={Users} color="indigo" />
        <StatCard title="New Leads" value={stats.pending} icon={Clock} color="amber" />
        <StatCard title="Active Partners" value={stats.approved} icon={CheckCircle} color="green" />
        <StatCard title="Rejected" value={stats.rejected} icon={XCircle} color="red" />
      </div>

      <div className="bg-[#1e293b]/50 backdrop-blur-3xl border-2 border-slate-800 p-8 rounded-[4rem] space-y-6 shadow-2xl shadow-black/20">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative"><Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} /><input type="text" placeholder="Search by ID, Name, Email, or Mobile..." className="w-full pl-14 pr-8 py-5 bg-[#0f172a] border-2 border-slate-800 rounded-3xl text-white font-bold focus:border-[#B32D2D] outline-none transition-all shadow-inner" value={filter.search} onChange={(e) => setFilter(p => ({ ...p, search: e.target.value }))} onKeyDown={(e) => e.key === 'Enter' && fetchApplications()} /></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4"><input type="date" className="px-6 py-5 bg-[#0f172a] border-2 border-slate-800 rounded-3xl text-white font-bold text-xs outline-none focus:border-[#B32D2D]" value={filter.startDate} onChange={(e) => setFilter(p => ({ ...p, startDate: e.target.value }))} /><input type="date" className="px-6 py-5 bg-[#0f172a] border-2 border-slate-800 rounded-3xl text-white font-bold text-xs outline-none focus:border-[#B32D2D]" value={filter.endDate} onChange={(e) => setFilter(p => ({ ...p, endDate: e.target.value }))} /><select className="px-8 py-5 bg-[#0f172a] border-2 border-slate-800 rounded-3xl text-white font-black text-xs outline-none focus:border-[#B32D2D] appearance-none cursor-pointer" value={filter.status} onChange={(e) => setFilter(p => ({ ...p, status: e.target.value }))}><option value="">ALL STATUS</option><option value="New">NEW</option><option value="Approved">APPROVED</option><option value="Rejected">REJECTED</option></select></div>
          <button onClick={fetchApplications} className="px-12 py-5 bg-[#B32D2D] text-white font-black rounded-3xl hover:bg-red-800 transition-all shadow-xl active:scale-95 text-xs uppercase italic tracking-widest">Search</button>
        </div>
      </div>

      <div className="bg-[#1e293b]/50 backdrop-blur-3xl border-2 border-slate-800 rounded-[4rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="border-b-2 border-slate-800 bg-[#0f172a]/80"><th className="px-12 py-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Partner Details</th><th className="px-12 py-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Location</th><th className="px-12 py-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Status</th><th className="px-12 py-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] italic text-center">Action</th></tr></thead>
            <tbody className="divide-y-2 divide-slate-800">
              {loading ? (<tr><td colSpan="4" className="px-12 py-32 text-center"><Loader2 className="animate-spin text-[#B32D2D] mx-auto mb-6" size={48} /><p className="text-slate-500 font-black italic uppercase tracking-widest">Loading Applications...</p></td></tr>) : applications.length === 0 ? (<tr><td colSpan="4" className="px-12 py-32 text-center text-slate-500 font-black italic text-lg uppercase opacity-30">No Applications Found</td></tr>) : applications.map((app) => (
                <tr key={app._id} className="hover:bg-[#B32D2D]/10 transition-all group cursor-pointer" onClick={() => openDetails(app)}>
                  <td className="px-12 py-8"><div><p className="text-lg font-black text-white italic group-hover:text-[#B32D2D] transition-colors">{app.organizationName}</p><div className="flex items-center gap-3 mt-2"><span className="text-[10px] bg-slate-800 text-slate-400 px-3 py-1 rounded-full font-black uppercase tracking-widest">{app.applicationId}</span><span className="text-[10px] text-[#B32D2D] font-black uppercase italic">{app.applicantType}</span></div><p className="text-[11px] text-slate-500 font-bold mt-2">{app.contactPersonName} • {app.mobileNumber}</p></div></td>
                  <td className="px-12 py-8"><div className="flex items-center gap-2 text-xs font-black text-slate-300 uppercase italic"><MapPin size={16} className="text-[#B32D2D]" /> {app.district}, {app.state}</div><p className="text-[10px] text-slate-500 mt-1">{new Date(app.createdAt).toLocaleDateString()}</p></td>
                  <td className="px-12 py-8"><StatusBadge status={app.status} /></td>
                  <td className="px-12 py-8 text-center"><button className="p-5 bg-slate-800/50 text-slate-400 rounded-3xl hover:bg-[#B32D2D] hover:text-white transition-all shadow-xl group-hover:scale-110 active:scale-90"><Eye size={24} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedApp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/80">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }} className="bg-[#0f172a] border-4 border-slate-800 w-full max-w-7xl max-h-[92vh] overflow-hidden rounded-[5rem] shadow-[0_0_150px_rgba(179,45,45,0.3)] flex flex-col relative">
              <div className="p-12 border-b-4 border-slate-800 flex justify-between items-center bg-[#1e293b]/50">
                <div className="flex items-center gap-8"><div className="w-20 h-20 bg-[#B32D2D] rounded-[2rem] flex items-center justify-center text-white shadow-2xl rotate-[-3deg] border-4 border-[#DEB887]/20"><Building2 size={40} /></div><div><h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">{selectedApp.organizationName}</h2><div className="flex items-center gap-4 mt-2"><p className="text-[11px] font-black text-[#DEB887] uppercase tracking-[0.4em] italic">{selectedApp.applicationId}</p><span className="w-2 h-2 rounded-full bg-[#B32D2D]"></span><p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{selectedApp.applicantType}</p></div></div></div>
                <button onClick={() => setIsModalOpen(false)} className="p-5 bg-slate-800 text-slate-400 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-xl"><XCircle size={36} /></button>
              </div>

              <div className="flex-grow overflow-y-auto p-12 custom-scrollbar bg-[#0f172a]">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                  <div className="lg:col-span-3 space-y-16">
                    <DetailSection title="Primary Contact & Organization" icon={User}><DetailItem label="Applicant Type" value={selectedApp.applicantType} /><DetailItem label="Firm / NGO Name" value={selectedApp.organizationName} /><DetailItem label="Contact Person" value={selectedApp.contactPersonName} /><DetailItem label="Mobile Number" value={selectedApp.mobileNumber} /><DetailItem label="WhatsApp Number" value={selectedApp.whatsappNumber} /><DetailItem label="Alternate Mobile" value={selectedApp.alternateMobileNumber} /><DetailItem label="Official Email ID" value={selectedApp.emailId} /><DetailItem label="Website / Social" value={selectedApp.websiteSocialLink} /></DetailSection>
                    <DetailSection title="Legal & Identity Numbers" icon={ShieldCheck}><DetailItem label="Aadhaar Number" value={selectedApp.aadhaarNumber} /><DetailItem label="PAN Number" value={selectedApp.panNumber} /><DetailItem label="GST Number" value={selectedApp.gstNumber} /><DetailItem label="NGO Registration" value={selectedApp.ngoRegistrationNumber} /><DetailItem label="Firm Registration" value={selectedApp.firmRegistrationNumber} /><DetailItem label="Udyam / MSME" value={selectedApp.udyamMsmeNumber} /></DetailSection>
                    <DetailSection title="Location & Address" icon={MapPin}><div className="md:col-span-2"><DetailItem label="Full Postal Address" value={selectedApp.address} /></div><DetailItem label="State" value={selectedApp.state} /><DetailItem label="District" value={selectedApp.district} /><DetailItem label="Tehsil / Block" value={selectedApp.block} /><DetailItem label="City / Village" value={selectedApp.cityVillage} /><DetailItem label="PIN Code" value={selectedApp.pincode} /></DetailSection>
                    <DetailSection title="Work Areas & Capacity" icon={Globe}><DetailItem label="Work Type Selection" value={selectedApp.workAreaType} /><DetailItem label="Manual Work Area Entry" value={selectedApp.manualWorkArea} /><DetailItem label="Monthly Awareness Capacity" value={selectedApp.monthlyCapacity} /><DetailItem label="Current Team Size" value={selectedApp.teamSize} /><div className="md:col-span-2"><p className="text-[10px] font-black text-slate-600 uppercase mb-3 italic">Work Interests</p><div className="flex flex-wrap gap-3">{selectedApp.interestedWorkCategories?.map(c => (<span key={c} className="px-5 py-3 bg-[#B32D2D]/10 text-[#B32D2D] rounded-2xl text-[11px] font-black border-2 border-[#B32D2D]/20 uppercase italic">{c}</span>))}</div></div></DetailSection>
                    <DetailSection title="Bank Settlement Details" icon={CreditCard}><DetailItem label="Bank Name" value={selectedApp.bankName} /><DetailItem label="Account Holder Name" value={selectedApp.accountHolderName} /><DetailItem label="Account Number" value={selectedApp.accountNumber} /><DetailItem label="IFSC Code" value={selectedApp.ifscCode} /><DetailItem label="Bank Branch" value={selectedApp.bankBranch} /></DetailSection>
                    <div className="space-y-6"><div className="flex items-center gap-3 pb-3 border-b-2 border-slate-800"><FileText size={20} className="text-[#B32D2D]" /><h3 className="text-sm font-black text-white uppercase tracking-widest italic">Document Verifications</h3></div><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{Object.entries(selectedApp.documents || {}).map(([key, url]) => (url && (<a key={key} href={url} target="_blank" rel="noreferrer" className="bg-[#1e293b] border-2 border-slate-800 rounded-[2rem] p-6 hover:border-[#B32D2D] transition-all group flex flex-col items-center"><div className="w-16 h-16 bg-[#0f172a] rounded-2xl flex items-center justify-center text-[#B32D2D] mb-4 group-hover:bg-[#B32D2D] group-hover:text-white transition-all shadow-inner"><DownloadCloud size={32} /></div><span className="text-[9px] font-black text-slate-500 uppercase text-center group-hover:text-slate-300">{key.replace(/([A-Z])/g, ' $1')}</span></a>)))}</div></div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-[#1e293b] p-10 rounded-[4rem] border-2 border-slate-800 sticky top-0 space-y-8 shadow-2xl">
                      <h4 className="text-xs font-black text-[#DEB887] uppercase tracking-widest italic text-center underline decoration-[#B32D2D] decoration-2">Partner Actions</h4>
                      <div className="space-y-6">
                        <div className="bg-slate-900/50 p-6 rounded-3xl border-2 border-slate-800 space-y-4">
                           <div className="flex items-center gap-2 text-[9px] font-black text-[#B32D2D] uppercase italic"><Edit3 size={14} /> Assign Partner ID</div>
                           <input type="text" placeholder="Enter Custom ID (e.g. SH-NGO-MP-001)" className="w-full bg-[#0f172a] border-2 border-slate-800 p-4 rounded-xl text-xs font-bold text-white outline-none focus:border-[#B32D2D] transition-all uppercase" value={manualPartnerId} onChange={(e) => setManualPartnerId(e.target.value.toUpperCase())} />
                           <p className="text-[8px] text-slate-500 italic">Leave empty to auto-generate based on state and type.</p>
                        </div>
                        
                        <div className="pt-4 space-y-4">
                           <p className="text-[10px] font-black text-slate-500 uppercase text-center">Current: <StatusBadge status={selectedApp.status} /></p>
                           <button onClick={() => handleStatusUpdate(selectedApp._id, 'Approved')} disabled={updating} className="w-full py-6 bg-green-600 text-white font-black rounded-3xl hover:bg-green-700 transition-all shadow-xl shadow-green-900/30 flex items-center justify-center gap-3 active:scale-95 text-xs uppercase italic">{updating ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={24} /> Approve & Send ID</>}</button>
                           <button onClick={() => handleStatusUpdate(selectedApp._id, 'Rejected')} disabled={updating} className="w-full py-6 bg-red-600/10 text-red-500 border-4 border-red-500/20 font-black rounded-3xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 text-xs uppercase italic"><XCircle size={24} /> Reject Application</button>
                           <button onClick={() => handleStatusUpdate(selectedApp._id, 'Under Review')} disabled={updating} className="w-full py-6 bg-indigo-600/10 text-indigo-400 border-4 border-indigo-500/20 font-black rounded-3xl hover:bg-indigo-600 hover:text-white transition-all active:scale-95 text-xs uppercase italic">Set Under Review</button>
                        </div>
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
  const colors = { indigo: 'from-indigo-600/30 to-slate-900 text-indigo-400 border-indigo-500/30', amber: 'from-amber-600/30 to-slate-900 text-amber-400 border-amber-500/30', green: 'from-green-600/30 to-slate-900 text-green-400 border-green-500/30', red: 'from-red-600/30 to-slate-900 text-red-400 border-red-500/30' };
  return (<div className={`p-12 bg-gradient-to-br ${colors[color]} border-4 rounded-[4rem] shadow-2xl relative overflow-hidden group hover:scale-[1.05] transition-all duration-500`}><div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-opacity"><Icon size={120} /></div><p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 italic">{title}</p><p className="text-6xl font-black text-white tracking-tighter">{value}</p></div>);
}

function StatusBadge({ status }) {
  const colors = { 'New': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30', 'Approved': 'bg-green-500/20 text-green-400 border-green-500/30 shadow-lg shadow-green-900/20', 'Rejected': 'bg-red-500/10 text-red-400 border-red-500/30', 'Under Review': 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
  return (<span className={`px-8 py-3 rounded-full border-2 text-[10px] font-black uppercase tracking-widest italic ${colors[status] || colors['New']}`}>{status}</span>);
}

function DetailSection({ title, icon: Icon, children }) {
  return (<div className="space-y-8"><div className="flex items-center gap-4 pb-4 border-b-2 border-slate-800"><div className="p-3 bg-[#B32D2D]/10 rounded-xl text-[#B32D2D]"><Icon size={24} /></div><h3 className="text-lg font-black text-white uppercase tracking-tighter italic">{title}</h3></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">{children}</div></div>);
}

function DetailItem({ label, value }) {
  return (<div className="group border-l-2 border-slate-800 pl-6 hover:border-[#B32D2D] transition-all"><p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 italic group-hover:text-[#B32D2D]">{label}</p><p className="text-sm font-bold text-slate-200">{value || '---'}</p></div>);
}

function Loader2(props) { return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>); }

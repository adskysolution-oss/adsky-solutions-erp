'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  ChevronDown,
  Loader2,
  FileText,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', payment: '' });

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filter).toString();
      const res = await fetch(`/api/admin/applications?${query}`);
      const data = await res.json();
      if (!data.error) setApplications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: id, applicationStatus: status })
      });
      if (res.ok) fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  const statusColors = {
    'submitted': 'bg-blue-500/10 text-blue-400',
    'approved': 'bg-emerald-500/10 text-emerald-400',
    'rejected': 'bg-red-500/10 text-red-400',
  };

  const paymentColors = {
    'pending': 'bg-orange-500/10 text-orange-400',
    'success': 'bg-emerald-500/10 text-emerald-400',
    'failed': 'bg-red-500/10 text-red-400',
  };

  return (
    <div className="space-y-8 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white italic">Farmer <span className="text-blue-500 text-glow">Applications</span></h1>
          <p className="text-slate-400 mt-1 uppercase text-[10px] font-black tracking-widest text-xs">Global Lead Management & Approval</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all font-bold text-xs">
             <FileText size={16} />
             Export CSV
           </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by farmer name or phone..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-blue-500/30 transition-all"
          />
        </div>
        <select 
          value={filter.status}
          onChange={e => setFilter({...filter, status: e.target.value})}
          className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-blue-500/30 font-bold text-xs uppercase"
        >
          <option value="">All Status</option>
          <option value="submitted">Pending Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select 
          value={filter.payment}
          onChange={e => setFilter({...filter, payment: e.target.value})}
          className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-blue-500/30 font-bold text-xs uppercase"
        >
          <option value="">All Payments</option>
          <option value="success">Paid ₹249</option>
          <option value="pending">Pending Fee</option>
        </select>
      </div>

      {/* Table Container */}
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Loading lead registry...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Farmer Details</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Source Agent</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Location</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Payment Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">App Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-8 py-20 text-center text-slate-500 italic">No applications found matching the filters.</td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-white font-bold">{app.farmerName}</span>
                          <span className="text-slate-500 text-[10px] flex items-center gap-1">
                            <Phone size={10} /> {app.phone}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-blue-400 font-mono text-[10px] font-black uppercase">Agent: {app.employeeCode || 'Direct'}</span>
                          <span className="text-slate-500 text-[9px] uppercase font-black">Partner: {app.partnerCode || 'ADSKY Head'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-1 text-slate-300 text-xs font-bold capitalize">
                          <MapPin size={12} className="text-slate-500" />
                          {app.location?.district}, {app.location?.state}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border border-white/5 ${paymentColors[app.paymentStatus]}`}>
                          {app.paymentStatus}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border border-white/5 ${statusColors[app.applicationStatus]}`}>
                          {app.applicationStatus}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleStatusUpdate(app._id, 'approved')}
                            className="p-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-lg transition-all"
                            title="Approve"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(app._id, 'rejected')}
                            className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                            title="Reject"
                          >
                            <XCircle size={16} />
                          </button>
                          <button className="p-2 bg-white/5 text-slate-400 hover:text-white rounded-lg transition-all">
                            <ExternalLink size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

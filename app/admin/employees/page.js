'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  Mail, 
  Phone,
  Briefcase,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/employees');
      const data = await res.json();
      if (!data.error) setEmployees(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white italic">Field <span className="text-blue-500">Agents</span></h1>
        <p className="text-slate-400 mt-1">Monitor all ground-level onboarding employees across the network.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search agents by name, code or partner..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-blue-500/50 outline-none transition-all"
          />
        </div>
        <button className="bg-white/5 border border-white/10 text-slate-300 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all font-bold text-sm">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Employees Table */}
      <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="text-slate-400 font-medium">Scanning agent network...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Agent Details</th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Employee Code</th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Associated Partner</th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Performance</th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center">
                       <div className="flex flex-col items-center gap-2 opacity-50">
                         <AlertCircle size={40} className="text-slate-400" />
                         <p className="text-slate-400 italic">No field agents registered yet.</p>
                       </div>
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr key={emp._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-lg uppercase italic">
                            {emp.user?.name?.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-white font-bold">{emp.user?.name}</span>
                            <span className="text-slate-500 text-[10px] flex items-center gap-1">
                              <Phone size={10} /> {emp.user?.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded uppercase border border-emerald-500/20">
                          {emp.employeeCode}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-slate-300 font-bold text-sm flex items-center gap-2">
                          <Briefcase size={14} className="text-blue-400" />
                          {emp.partnerCode}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-white font-bold text-sm tracking-tight">{emp.totalLeads} Leads</span>
                          <span className="text-slate-500 text-[10px] uppercase font-bold">Earnings: ₹{emp.totalEarnings}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                          <ExternalLink size={18} />
                        </button>
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

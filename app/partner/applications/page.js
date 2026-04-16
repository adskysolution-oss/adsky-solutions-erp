'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, MapPin, CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnerApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo data for Partner's leads
    setTimeout(() => {
      setApplications([
        { id: 1, name: 'Suresh Patil', agent: 'EMP1001', location: 'Pune', status: 'approved', date: '2026-04-12' },
        { id: 2, name: 'Mahesh Deshmukh', agent: 'EMP1002', location: 'Nagpur', status: 'submitted', date: '2026-04-15' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-8 pb-32">
      <div>
        <h1 className="text-3xl font-black text-white italic tracking-tight">Team <span className="text-blue-500">Leads</span></h1>
        <p className="text-slate-400 mt-1 uppercase text-[10px] font-black tracking-widest text-xs">Applications From Your Branch</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Scanning registry...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Farmer Name</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Assigned Agent</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Location</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6 text-white font-bold text-sm tracking-tight">{app.name}</td>
                    <td className="px-8 py-6">
                      {app.agent === 'Direct' ? (
                        <button className="text-[9px] font-black uppercase tracking-widest bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow-lg shadow-blue-600/20 hover:scale-105 transition-all">
                          Assign Agent
                        </button>
                      ) : (
                        <span className="text-blue-400 font-mono text-[10px] font-black uppercase">{app.agent}</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-slate-400 text-xs flex items-center gap-1 font-bold">
                      <MapPin size={12} /> {app.location}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border border-white/5 ${app.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-500 text-[10px] font-bold">{app.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

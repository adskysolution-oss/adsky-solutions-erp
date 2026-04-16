'use client';

import React, { useState, useEffect } from 'react';
import { FileText, MapPin, CheckCircle2, IndianRupee, Clock, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmployeeApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo data for field agent's leads
    setTimeout(() => {
      setApplications([
        { id: 1, name: 'Sanjay Kumar', location: 'Satara', status: 'approved', fee: 'success', date: '2026-04-10' },
        { id: 2, name: 'Vijay Khare', location: 'Pune', status: 'submitted', fee: 'success', date: '2026-04-14' },
        { id: 3, name: 'Anil Rao', location: 'Solapur', status: 'submitted', fee: 'pending', date: '2026-04-15' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-tight">My <span className="text-blue-500">Submissions</span></h1>
          <p className="text-slate-400 mt-1 uppercase text-[10px] font-black tracking-widest text-xs">Track Your Field Leads & Commissions</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
           <IndianRupee size={16} className="text-emerald-400" />
           <span className="text-xs font-black text-emerald-400 uppercase">Est. Commission: ₹{applications.filter(a => a.fee === 'success').length * 50}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-32 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Retrieving Lead Data...</p>
          </div>
        ) : (
          applications.map((app, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={app.id}
              className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
            >
               <div className="space-y-6">
                  <div className="flex items-start justify-between">
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/50 group-hover:text-blue-500 transition-colors">
                        <FileText size={24} />
                     </div>
                     <span className={`px-2 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-widest border border-white/5 ${app.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                        {app.status}
                     </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{app.name}</h3>
                    <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                       <span className="flex items-center gap-1"><MapPin size={10} /> {app.location}</span>
                       <span className="flex items-center gap-1"><Clock size={10} /> {app.date}</span>
                    </div>
                  </div>
               </div>

               <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Fee Status</p>
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${app.fee === 'success' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                       <span className="text-[10px] text-white font-bold capitalize">{app.fee}</span>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Commission</p>
                     <p className={`text-sm font-black italic ${app.fee === 'success' ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {app.fee === 'success' ? '+₹50.00' : '₹0.00'}
                     </p>
                  </div>
               </div>
            </motion.div>
          ))
        )}
      </div>

      {!loading && applications.length === 0 && (
        <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-[2.5rem]">
           <AlertCircle size={40} className="text-slate-600 mx-auto mb-4" />
           <p className="text-slate-500 font-bold">No leads found. Start onboarding farmers to see your submissions here.</p>
        </div>
      )}
    </div>
  );
}

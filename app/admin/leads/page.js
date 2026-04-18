'use client';

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Zap, 
  Activity,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { adminAPI } from '@/lib/api-client';

const columns = [
  { key: 'userName', label: 'CLIENT / APPLICANT' },
  { key: 'amount', label: 'VOLUME' },
  { key: 'status', label: 'MISSION STATUS' },
  { key: 'appliedOn', label: 'INITIATED' },
  { key: 'action', label: 'COMMAND' },
];

export default function MissionQueue() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true);
        const data = await adminAPI.getLoans();
        setLoans(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const stats = [
    { label: 'PENDING MISSIONS', value: loans.filter(l => l.status === 'SUBMITTED').length, icon: Target, color: 'text-[#f59e0b]' },
    { label: 'ACTIVE DEPLOYMENTS', value: loans.filter(l => l.status === 'APPROVED').length, icon: Zap, color: 'text-[#38bdf8]' },
    { label: 'COMPLETED OPS', value: loans.filter(l => l.status === 'DISBURSED').length, icon: CheckCircle2, color: 'text-[#22c55e]' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'APPROVED': return 'text-[#22c55e]';
      case 'REJECTED': return 'text-[#ef4444]';
      case 'SUBMITTED': return 'text-[#f59e0b]';
      default: return 'text-[#38bdf8]';
    }
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
              <Rocket size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#38bdf8] italic">Tactical Control</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Mission Queue.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Real-time oversight of all lead generation and loan applications.</p>
        </div>

        <div className="flex gap-4">
          <div className="px-6 py-4 bg-[#111827] border border-[#1f2937] rounded-2xl flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping"></div>
            <span className="text-[10px] font-black text-[#9ca3af] uppercase italic">System: Online</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-8 bg-gradient-to-br from-[#111827] to-[#0b1220] border border-[#1f2937] rounded-[2.5rem] relative group hover:border-[#38bdf8]/20 transition-all">
            <div className="relative z-10">
               <div className={`w-14 h-14 rounded-2xl bg-[#0b1220] flex items-center justify-center ${stat.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={28} />
               </div>
               <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic mb-1">{stat.label}</p>
               <p className="text-4xl font-black text-[#f3f4f6] italic">{stat.value}</p>
            </div>
            <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <Activity size={80} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Data Table Container */}
      <div className="bg-[#111827] rounded-[3rem] border border-[#1f2937] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={40} className="text-[#38bdf8] animate-spin" />
          </div>
        ) : error ? (
           <div className="p-10 text-center text-red-500 font-bold italic">Error syncing queue: {error}</div>
        ) : (
          <DataTable 
            title="Active Operations Stream" 
            columns={columns} 
            data={loans.map(loan => ({
              ...loan,
              userName: loan.userId?.name || 'Anonymous',
              amount: `₹${(loan.amount / 1000).toFixed(1)}K`,
              appliedOn: new Date(loan.appliedOn).toLocaleDateString(),
              status: (
                <span className={`flex items-center gap-2 font-black italic text-xs ${getStatusColor(loan.status)}`}>
                   {loan.status === 'APPROVED' ? <CheckCircle2 size={14}/> : <Clock size={14}/>} {loan.status}
                </span>
              ),
              action: (
                <button className="p-2 bg-[#38bdf8]/10 text-[#38bdf8] rounded-xl hover:bg-[#38bdf8] hover:text-[#0b1220] transition-all">
                  <ArrowRight size={18} />
                </button>
              )
            }))} 
          />
        )}
      </div>
    </div>
  );
}

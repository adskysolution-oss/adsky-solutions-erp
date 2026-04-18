'use client';

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Navigation, 
  Zap,
  CheckCircle2,
  Clock,
  Loader2
} from 'lucide-react';
import { adminAPI } from '@/lib/api-client';

const columns = [
  { key: 'name', label: 'AGENT NAME' },
  { key: 'code', label: 'AGENT ID' },
  { key: 'designation', label: 'ROLE / RANK' },
  { key: 'performance', label: 'EFFICIENCY' },
  { key: 'status', label: 'STATUS' },
];

export default function EmployeesManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const data = await adminAPI.getEmployees();
        setEmployees(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const stats = [
    { label: 'FIELD FORCE', value: employees.length, icon: Users, color: 'text-[#38bdf8]' },
    { label: 'ON MISSION', value: '42', icon: Navigation, color: 'text-[#f59e0b]' },
    { label: 'SYSTEM UPTIME', value: '99.9%', icon: Zap, color: 'text-[#22c55e]' },
  ];

  return (
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
              <Users size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#38bdf8] italic">Human Capital</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Field Agents.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Monitor agent performance and deployment status.</p>
        </div>

        <button className="flex items-center gap-3 px-8 py-4 bg-[#38bdf8] text-[#0b1220] rounded-2xl font-black italic shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:scale-105 transition-all">
          DEPLOY NEW AGENT
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-6 bg-[#111827] border border-[#1f2937] rounded-[2rem] flex items-center gap-5 group hover:border-[#38bdf8]/20 transition-all">
             <div className={`w-12 h-12 rounded-2xl bg-[#0b1220] flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic">{stat.label}</p>
                <p className="text-2xl font-black text-[#f3f4f6] italic">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={40} className="text-[#38bdf8] animate-spin" />
        </div>
      ) : error ? (
        <div className="p-10 bg-red-500/10 border border-red-500/20 text-red-500 rounded-3xl text-center font-bold italic">
           Error: {error}
        </div>
      ) : (
        <DataTable 
          title="Active Field Contingent" 
          columns={columns} 
          data={employees.map(e => ({
            name: e.userId?.name || 'Unknown Agent',
            code: e.employeeCode,
            designation: e.designation,
            performance: `${e.performanceScore}%`,
            status: (
              <span className="flex items-center gap-2 text-[#22c55e]"><CheckCircle2 size={14}/> Active</span>
            )
          }))} 
        />
      )}
    </div>
  );
}

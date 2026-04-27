'use client';

import React, { useState, useEffect } from 'react';
import StatCard from '@/components/admin/StatCard';
import GraphCard from '@/components/admin/GraphCard';
import Table from '@/components/admin/DataTable';
import { 
  Users, 
  TrendingUp, 
  Wallet, 
  ShieldAlert,
  Loader2,
  Calendar
} from 'lucide-react';
import { adminAPI } from '@/lib/api-client';

export default function DashboardPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await adminAPI.getStats();
        setReport(data);
      } catch (err) {
        console.error('Report Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-[#38bdf8] animate-spin" />
        <p className="text-[#38bdf8] font-black italic tracking-widest animate-pulse">SYNCING INTELLIGENCE...</p>
      </div>
    );
  }

  const stats = [
    { label: 'TOTAL USERS', value: report?.totalUsers || '0', icon: Users, color: 'text-cyan-400' },
    { label: 'VENDORS', value: report?.totalVendors || '0', icon: Users, color: 'text-purple-400' },
    { label: 'JOB VACANCIES', value: report?.totalJobs || '0', icon: Users, color: 'text-emerald-400' },
    { label: 'BLOG POSTS', value: report?.totalPosts || '0', icon: Users, color: 'text-orange-400' },
  ];


  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">Command Cockpit.</h1>
          <p className="text-slate-400 font-medium italic mt-2">Real-time orchestration of global operations and financial flow.</p>
        </div>
        <div className="flex items-center gap-4 px-6 py-3 bg-[#111827] border border-[#1f2937] rounded-2xl">
           <Calendar className="text-[#38bdf8] w-5 h-5" />
           <span className="text-[10px] font-black text-[#38bdf8] uppercase italic">{new Date().toDateString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <GraphCard title="Revenue Velocity" type="line" color="#38bdf8" />
        <GraphCard title="Operational Success" type="bar" color="#22c55e" />
      </div>

      {/* Recent Activity */}
      <div className="bg-[#111827]/50 p-1 rounded-[3rem] border border-[#1f2937] backdrop-blur-xl">
        <Table 
          title="Recent Transmissions" 
          columns={[
            { key: 'user', label: 'USER' },
            { key: 'amount', label: 'VOLUME' },
            { key: 'status', label: 'STATUS' },
            { key: 'date', label: 'TIMESTAMP' }
          ]} 
          data={(report?.recentApplications || []).map(app => ({
            user: app.user || 'Unknown',
            amount: `₹${app.amount}`,
            status: app.status,
            date: new Date(app.date).toLocaleTimeString()
          }))}

        />
      </div>
    </div>
  );
}

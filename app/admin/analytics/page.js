'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Globe, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  IndianRupee,
  Activity,
  Zap,
  LayoutDashboard,
  Target,
  Clock,
  CheckCircle2,
  PieChart as PieIcon,
  Search,
  Filter
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Cell,
  Pie
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const data = [
  { name: 'Mon', revenue: 4000, leads: 24, conversion: 65 },
  { name: 'Tue', revenue: 3000, leads: 18, conversion: 58 },
  { name: 'Wed', revenue: 9000, leads: 42, conversion: 82 },
  { name: 'Thu', revenue: 5000, leads: 28, conversion: 70 },
  { name: 'Fri', revenue: 11000, leads: 54, conversion: 88 },
  { name: 'Sat', revenue: 15400, leads: 72, conversion: 95 },
  { name: 'Sun', revenue: 12000, leads: 60, conversion: 91 },
];

const distributionData = [
  { name: 'Maharashtra', value: 4500, color: '#0ea5e9' },
  { name: 'Punjab', value: 3200, color: '#6366f1' },
  { name: 'Karnataka', value: 2800, color: '#10b981' },
  { name: 'others', value: 1500, color: '#f59e0b' },
];

export default function AdminAnalytics() {
  const [activeMetric, setActiveMetric] = useState('revenue');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const stats = [
    { title: 'Total System Revenue', value: '₹1,54,200', change: '+24.5%', positive: true, icon: IndianRupee, color: 'text-sky-600', bg: 'bg-sky-50' },
    { title: 'Farmer Registrations', value: '1,280', change: '+12.3%', positive: true, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Partner Network', value: '84', change: '+5.2%', positive: true, icon: Globe, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Avg. Conversion', value: '78.4%', change: '-2.1%', positive: false, icon: Target, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] -mr-32 -mt-32" />
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-sky-200">
               <Activity size={32} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">Operations <span className="text-sky-600">Intelligence</span></h1>
               <p className="text-slate-500 font-medium text-sm mt-1 text-slate-400 uppercase tracking-widest text-[9px] font-black">25X Enterprise Analytics Node</p>
            </div>
         </div>
         <div className="flex items-center gap-3 bg-slate-900 px-6 py-3 rounded-2xl shadow-xl">
            <Calendar size={18} className="text-sky-400" />
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Last 7 Days</span>
         </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.title}
            className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 transition-all group"
          >
            <div className="flex flex-col gap-6">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.title}</p>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 ${stat.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Card */}
        <div className="lg:col-span-2 p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="flex items-center justify-between mb-12">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-sky-600 pl-4 italic">Revenue Orchestration</h3>
              <div className="flex gap-2">
                 {['revenue', 'leads'].map(m => (
                   <button 
                    key={m}
                    onClick={() => setActiveMetric(m)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMetric === m ? 'bg-sky-600 text-white shadow-xl shadow-sky-200' : 'bg-slate-50 text-slate-400 hover:text-slate-600'}`}
                   >
                     {m}
                   </button>
                 ))}
              </div>
           </div>

           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data}>
                    <defs>
                       <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '20px' }}
                      itemStyle={{ fontWeight: 900, fontSize: '12px', textTransform: 'uppercase' }}
                    />
                    <Area type="monotone" dataKey={activeMetric === 'revenue' ? 'revenue' : 'leads'} stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Regional Distribution */}
        <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm">
           <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-indigo-500 pl-4 mb-10 italic">Regional Split</h3>
           <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                       data={distributionData}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="value"
                    >
                       {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Leads</p>
                 <p className="text-2xl font-black text-slate-900 italic">1.2K</p>
              </div>
           </div>
           
           <div className="mt-8 space-y-3">
              {distributionData.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                   </div>
                   <span className="text-xs font-black text-slate-900 leading-none italic">₹{item.value}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Transaction Feed (Ledger) */}
      <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-emerald-500 pl-4 italic">Transactional Ledger</h3>
            <div className="flex gap-4">
               <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input placeholder="Search Txn ID..." className="bg-slate-50 border border-slate-100 rounded-xl py-2 pl-10 pr-4 text-[10px] font-bold outline-none focus:border-sky-500/30" />
               </div>
               <button className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-all"><Filter size={16} /></button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-slate-50">
                     <th className="py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date / ID</th>
                     <th className="py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Actor</th>
                     <th className="py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Amount</th>
                     <th className="py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {[
                    { id: 'TXN-9402', date: '2026-04-16', actor: 'Mahesh D.', amount: '+ ₹249.00', status: 'verified', role: 'Farmer' },
                    { id: 'TXN-9401', date: '2026-04-15', actor: 'Partner X', amount: '+ ₹5,000.00', status: 'settled', role: 'Partner' },
                    { id: 'TXN-9399', date: '2026-04-15', actor: 'Suresh P.', amount: '+ ₹249.00', status: 'verified', role: 'Farmer' },
                  ].map(txn => (
                    <tr key={txn.id} className="group hover:bg-slate-50/50 transition-colors">
                       <td className="py-4">
                          <p className="text-xs font-black text-slate-900">{txn.id}</p>
                          <p className="text-[9px] font-bold text-slate-400">{txn.date}</p>
                       </td>
                       <td className="py-4">
                          <p className="text-xs font-bold text-slate-700">{txn.actor}</p>
                          <p className="text-[9px] font-black uppercase text-sky-600">{txn.role}</p>
                       </td>
                       <td className="py-4 text-xs font-black text-slate-900 tracking-tighter italic">{txn.amount}</td>
                       <td className="py-4">
                          <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase border ${txn.status === 'verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-sky-50 text-sky-600 border-sky-100'}`}>
                             {txn.status}
                          </span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

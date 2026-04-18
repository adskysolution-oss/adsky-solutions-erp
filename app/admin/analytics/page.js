'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  Activity, 
  Globe, 
  Zap,
  ArrowUpRight,
  PieChart as PieIcon
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, conversion: 2400 },
  { name: 'Feb', revenue: 3000, conversion: 1398 },
  { name: 'Mar', revenue: 2000, conversion: 9800 },
  { name: 'Apr', revenue: 2780, conversion: 3908 },
  { name: 'May', revenue: 1890, conversion: 4800 },
];

const pieData = [
  { name: 'North', value: 400 },
  { name: 'South', value: 300 },
  { name: 'West', value: 300 },
];

const COLORS = ['#38bdf8', '#6366f1', '#f59e0b', '#ef4444'];

export default function AnalyticsNode() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
              <Activity size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#38bdf8] italic">Intelligence Bureau</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Intelligence Analytics.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Advanced data orchestration, yield metrics, and regional performance matrices.</p>
        </div>

        <div className="flex items-center gap-4 bg-[#111827] border border-[#1f2937] p-2 rounded-2xl">
           <button className="px-6 py-2 rounded-xl bg-[#38bdf8] text-[#0b1220] text-[10px] font-black italic shadow-lg">LIVE FEED</button>
           <button className="px-6 py-2 rounded-xl text-[#6b7280] hover:text-[#f3f4f6] text-[10px] font-black italic transition-all">EXPORT DATA</button>
        </div>
      </motion.div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Revenue Velocity */}
         <div className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-2xl font-black text-[#f3f4f6] italic tracking-tight">Revenue Pulse</h3>
               <div className="flex items-center gap-2 text-[10px] font-black text-[#22c55e] italic">
                  <ArrowUpRight size={14} /> +12.5% vs Last Month
               </div>
            </div>
            
            <div className="h-[300px] w-full mt-4">
               {/* Fixed width/height for SSR to avoid Recharts warning */}
               <ResponsiveContainer width="100%" height={300} minWidth={0} minHeight={0}>
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                     <XAxis dataKey="name" tick={{fontSize: 10, fontWeight: 900, fill: '#6b7280'}} axisLine={false} tickLine={false} />
                     <YAxis tick={{fontSize: 10, fontWeight: 900, fill: '#6b7280'}} axisLine={false} tickLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #1f2937', borderRadius: '15px' }}
                        itemStyle={{ color: '#f3f4f6', fontWeight: 900 }}
                     />
                     <Area type="monotone" dataKey="revenue" stroke="#38bdf8" fillOpacity={1} fill="url(#colorRev)" strokeWidth={4} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Conversion Metrics */}
         <div className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-2xl font-black text-[#f3f4f6] italic tracking-tight">Mission Yield</h3>
               <div className="flex items-center gap-2 text-[10px] font-black text-[#6366f1] italic">
                  <Target size={14} /> Efficiency Optimal
               </div>
            </div>
            
            <div className="h-[300px] w-full mt-4">
               <ResponsiveContainer width="100%" height={300} minWidth={0} minHeight={0}>
                  <BarChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                     <XAxis dataKey="name" tick={{fontSize: 10, fontWeight: 900, fill: '#6b7280'}} axisLine={false} tickLine={false} />
                     <YAxis tick={{fontSize: 10, fontWeight: 900, fill: '#6b7280'}} axisLine={false} tickLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #1f2937', borderRadius: '15px' }}
                        itemStyle={{ color: '#f3f4f6', fontWeight: 900 }}
                     />
                     <Bar dataKey="conversion" fill="#6366f1" radius={[10, 10, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Regional Share */}
         <div className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] flex flex-col items-center justify-center min-h-[400px]">
            <h3 className="text-xl font-black text-[#f3f4f6] italic mb-10">Regional Dominance</h3>
            <div className="h-[200px] w-full">
               <ResponsiveContainer width="100%" height={200} minWidth={0} minHeight={0}>
                  <PieChart>
                     <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {pieData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                     </Pie>
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #1f2937', borderRadius: '15px' }}
                     />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="flex gap-6 mt-6">
               {pieData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                     <span className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest">{d.name}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Stats Recap */}
         <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
               { label: 'AVG LEAD TIME', value: '42 mins', icon: Zap, color: 'text-[#f59e0b]' },
               { label: 'BOUNCE RATE', value: '1.2%', icon: Users, color: 'text-[#ef4444]' },
               { label: 'GLOBAL REACH', value: '14.2M', icon: Globe, color: 'text-[#22c55e]' },
               { label: 'TOTAL BURDEN', value: '₹1.2Cr', icon: BarChart3, color: 'text-[#38bdf8]' },
            ].map((stat, idx) => (
               <div key={idx} className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3rem] group hover:border-white/10 transition-all flex flex-col justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-[#0b1220] flex items-center justify-center ${stat.color} mb-6 shadow-xl`}>
                     <stat.icon size={24} />
                  </div>
                  <div>
                     <p className="text-[11px] font-black uppercase text-[#6b7280] tracking-widest italic mb-1">{stat.label}</p>
                     <h3 className="text-3xl font-black text-[#f3f4f6] italic">{stat.value}</h3>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}

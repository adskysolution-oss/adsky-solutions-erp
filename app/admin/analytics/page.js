'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Target, Activity, Map, PieChart, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart as RePieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, conversion: 2400 },
  { name: 'Feb', revenue: 3000, conversion: 1398 },
  { name: 'Mar', revenue: 2000, conversion: 9800 },
  { name: 'Apr', revenue: 2780, conversion: 3908 },
  { name: 'May', revenue: 1890, conversion: 4800 },
];

const pieData = [
  { name: 'Maharashtra', value: 400 },
  { name: 'Gujarat', value: 300 },
  { name: 'Madhya Pradesh', value: 300 },
];

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

export default function AnalyticsNode() {
  return (
    <div className="space-y-8 pb-32 pt-4 px-4 overflow-x-hidden">
      <div className="flex flex-col md:items-start justify-between gap-2">
         <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">
            Intelligence <span className="text-vibrant-indigo">Analytics</span>
         </h1>
         <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Advanced Data Orchestration & Yield Metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Conversion Growth Node */}
         <div className="p-10 glass-card rounded-[3.5rem] shadow-xl border-white/60">
            <div className="flex items-center justify-between mb-8">
               <h4 className="text-lg font-black italic text-slate-900">Conversion <span className="text-rose-500">Pulse</span></h4>
               <Target size={20} className="text-slate-300" />
            </div>
            <div className="h-[250px] w-full mt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" tick={{fontSize: 9, fontWeight: 900, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                     <YAxis tick={{fontSize: 9, fontWeight: 900, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                     <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', fontWeight: 900 }} />
                     <Line type="monotone" dataKey="conversion" stroke="#ef4444" strokeWidth={4} dot={{ r: 4, fill: '#ef4444' }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Regional Distribution Node */}
         <div className="p-10 glass-card rounded-[3.5rem] shadow-xl border-white/60">
            <div className="flex items-center justify-between mb-8">
               <h4 className="text-lg font-black italic text-slate-900">Regional <span className="text-vibrant-emerald">Yield</span></h4>
               <Globe size={20} className="text-slate-300" />
            </div>
            <div className="h-[250px] w-full mt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" tick={{fontSize: 9, fontWeight: 900, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                     <YAxis tick={{fontSize: 9, fontWeight: 900, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                     <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', fontWeight: 900 }} />
                     <Bar dataKey="revenue" fill="#10b981" radius={[10, 10, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="p-8 glass-card rounded-[3rem] shadow-lg border-white/60 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Lead Efficiency</p>
            <h5 className="text-4xl font-black text-slate-900 italic tracking-tighter">84.2%</h5>
         </div>
         <div className="p-8 glass-card rounded-[3rem] shadow-lg border-white/60 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Partner Satisfaction</p>
            <h5 className="text-4xl font-black text-slate-900 italic tracking-tighter">4.9/5</h5>
         </div>
         <div className="p-8 glass-card rounded-[3rem] shadow-lg border-white/60 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Churn Rate</p>
            <h5 className="text-4xl font-black text-rose-500 italic tracking-tighter">1.2%</h5>
         </div>
      </div>
    </div>
  );
}

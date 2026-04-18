'use client';

import React from 'react';
import StatCard from '@/components/admin/StatCard';
import { 
  Users, 
  Sprout, 
  Handshake, 
  Briefcase, 
  Store, 
  TrendingUp, 
  DollarSign, 
  Clock,
  Activity,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const stats = [
    { title: 'Total Users', value: '12,482', trend: '+12%', icon: Users },
    { title: 'Farmers', value: '8,291', trend: '+18%', icon: Sprout },
    { title: 'Partners', value: '452', trend: '+5%', icon: Handshake },
    { title: 'Employees', value: '124', trend: '+2%', icon: Briefcase },
    { title: 'Vendors', value: '86', trend: '+9%', icon: Store },
    { title: "Today's Revenue", value: '₹42,850', trend: '+15%', icon: TrendingUp },
    { title: 'Total Revenue', value: '₹1.2Cr', trend: '+32%', icon: DollarSign },
    { title: 'Pending Loans', value: '₹18.4L', trend: '-4%', icon: Clock },
  ];

  const activities = [
    { id: 1, text: 'New Farmer Registered: Rajesh Kumar', time: '2 mins ago', icon: Sprout, color: 'text-[#38bdf8]' },
    { id: 2, text: 'Payment Received: ₹249 from Adarsh', time: '15 mins ago', icon: DollarSign, color: 'text-[#22c55e]' },
    { id: 3, text: 'Loan Submitted: Application #LN921', time: '45 mins ago', icon: Zap, color: 'text-[#f59e0b]' },
    { id: 4, text: 'New Employee Lead: Sanya Gupta', time: '1 hour ago', icon: Briefcase, color: 'text-[#6366f1]' },
  ];

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Dashboard Overview.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-2">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-4 bg-[#111827] border border-[#1f2937] p-2 rounded-2xl">
           <button className="px-6 py-2 rounded-xl bg-[#38bdf8] text-[#0b1220] text-xs font-black italic shadow-lg">REAL-TIME</button>
           <button className="px-6 py-2 rounded-xl text-[#6b7280] hover:text-[#f3f4f6] text-xs font-black italic transition-all">ANALYTICS</button>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Graph Placeholder */}
        <div className="lg:col-span-2 bg-[#111827] border border-[#1f2937] rounded-[3rem] p-10 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8">
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1.5 text-[10px] font-black italic text-[#22c55e]">
                    <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full"></div> REVENUE
                 </div>
                 <div className="flex items-center gap-1.5 text-[10px] font-black italic text-[#38bdf8]">
                    <div className="w-1.5 h-1.5 bg-[#38bdf8] rounded-full"></div> PROJECTIONS
                 </div>
              </div>
           </div>
           
           <h2 className="text-3xl font-black text-[#f3f4f6] tracking-tight italic mb-10">Revenue Velocity.</h2>
           
           <div className="h-80 flex items-end justify-between gap-4">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                  className="flex-grow bg-gradient-to-t from-[#38bdf8]/10 to-[#38bdf8]/40 rounded-t-xl relative group"
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-[#38bdf8] rounded-full shadow-[0_0_15px_#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              ))}
           </div>
           
           <div className="flex justify-between mt-6 px-2 text-[10px] font-black text-[#6b7280] italic uppercase tracking-widest">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Dec</span>
           </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-[#111827] border border-[#1f2937] rounded-[3rem] p-10 flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-[#f3f4f6] tracking-tight italic">Live Activity</h2>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></span>
               <span className="text-[10px] font-black uppercase text-[#22c55e] tracking-widest">Live</span>
            </div>
          </div>

          <div className="space-y-8 flex-grow">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-5 group cursor-default">
                <div className={`w-12 h-12 rounded-2xl bg-[#1f2937] border border-[#1f2937] flex items-center justify-center ${act.color} group-hover:scale-110 group-hover:bg-[#0b1220] transition-all shrink-0`}>
                   <act.icon size={20} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#f3f4f6] italic leading-snug">{act.text}</p>
                  <p className="text-[10px] font-black text-[#6b7280] uppercase tracking-wider mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-10 w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-[#f3f4f6] text-[10px] font-black uppercase tracking-[0.3em] italic hover:bg-white/10 transition-all">
            View All Events
          </button>
        </div>
      </div>
    </div>
  );
}

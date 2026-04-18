'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, trend, icon: Icon, color = '#38bdf8' }) {
  const isPositive = trend?.startsWith('+');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 bg-[#111827] border border-[#1f2937] rounded-[2rem] relative overflow-hidden group hover:border-[#38bdf8]/30 transition-all duration-500 shadow-2xl"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#38bdf8]/5 rounded-full blur-[40px] group-hover:bg-[#38bdf8]/10 transition-colors"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-[#1f2937] rounded-2xl text-[#f3f4f6] group-hover:bg-[#38bdf8] group-hover:text-[#0b1220] transition-all shadow-lg">
            {Icon && <Icon size={24} />}
          </div>
          {trend && (
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black italic tracking-wider ${isPositive ? 'bg-[#22c55e]/10 text-[#22c55e]' : 'bg-[#ef4444]/10 text-[#ef4444]'}`}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trend}
            </div>
          )}
        </div>

        <div>
          <p className="text-[11px] font-black uppercase text-[#9ca3af] tracking-[0.2em] mb-1 italic">
            {title}
          </p>
          <h3 className="text-3xl font-black text-[#f3f4f6] tracking-tighter italic">
            {value}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

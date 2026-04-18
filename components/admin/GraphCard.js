'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 1000 },
];

export default function GraphCard({ title, type, color }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-[#111827] border border-[#1f2937] rounded-[2.5rem] group"
    >
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-[#f3f4f6] italic tracking-tight">{title}</h3>
        <div className="px-3 py-1 bg-[#0b1220] rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest italic border border-[#1f2937]">
          Live Analytics
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#4b5563" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: color }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={4} 
                dot={false}
                animationDuration={2000}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="name" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: color }}
              />
              <Bar 
                dataKey="value" 
                fill={color} 
                radius={[6, 6, 0, 0]} 
                animationDuration={2000}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

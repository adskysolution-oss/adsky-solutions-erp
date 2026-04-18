'use client';

import React from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Bell, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  Send, 
  History, 
  Zap,
  CheckCircle2
} from 'lucide-react';

const alertData = [
  { type: 'WhatsApp', recipient: '8.4K Farmers', subject: 'New Scheme Alert', status: 'Sent', time: '18 Apr 10:00 PM' },
  { type: 'SMS', recipient: 'All Partners', subject: 'System Maintenance', status: 'Queued', time: '19 Apr 12:00 AM' },
  { type: 'Email', recipient: 'Ravi Kumar', subject: 'Loan Approval', status: 'Delivered', time: '18 Apr 09:12 PM' },
];

const columns = [
  { key: 'type', label: 'CHANNEL' },
  { key: 'recipient', label: 'TARGET AUDIENCE' },
  { key: 'subject', label: 'MESSAGE SUBJECT' },
  { key: 'status', label: 'PROTOCOL STATE' },
  { key: 'time', label: 'SCHEDULE' },
];

export default function NotificationsManagement() {
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
              <Bell size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#38bdf8] italic">Broadcast Terminal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Notifications.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Direct communication bridge via WhatsApp, SMS, and Email for all stakeholders.</p>
        </div>

        <button className="flex items-center gap-3 px-8 py-4 bg-[#38bdf8] text-[#0b1220] rounded-2xl font-black italic shadow-xl hover:scale-105 transition-all">
          <Send size={20} /> INITIATE BROADCAST
        </button>
      </motion.div>

      {/* Channel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: 'WA NODES', value: 'API Active', icon: MessageSquare, color: 'text-[#22c55e]' },
           { label: 'SMS CREDITS', value: '42,850', icon: Smartphone, color: 'text-[#38bdf8]' },
           { label: 'EMAIL FLOW', value: '99.9%', icon: Mail, color: 'text-[#6366f1]' },
         ].map((stat, idx) => (
           <div key={idx} className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3rem] text-center group hover:border-[#38bdf8]/30 transition-all shadow-2xl overflow-hidden">
              <div className="flex justify-center mb-6">
                 <div className={`w-16 h-16 rounded-2xl bg-[#0b1220] flex items-center justify-center ${stat.color} shadow-xl group-hover:scale-110 transition-transform`}>
                    <stat.icon size={32} />
                 </div>
              </div>
              <p className="text-[11px] font-black uppercase text-[#6b7280] tracking-widest italic mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-[#f3f4f6] italic tracking-tight">{stat.value}</h3>
           </div>
         ))}
      </div>

      {/* Table Section */}
      <DataTable 
        title="Communication History" 
        columns={columns} 
        data={alertData} 
      />

      {/* Composer Preview */}
      <div className="p-10 bg-[#111827] border border-[#1f2937] rounded-[4rem] relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-8 flex items-center gap-3">
            {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#38bdf8]/20 group-hover:bg-[#38bdf8] transition-colors" style={{ transitionDelay: `${i*100}ms` }} />)}
         </div>
         <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-8">Quick SMS/WA Template</h3>
         <div className="space-y-6">
            <textarea 
               placeholder="Write your mission broadcast here..."
               className="w-full bg-[#0b1220] border border-[#1f2937] rounded-3xl p-6 text-slate-300 font-medium italic outline-none focus:border-[#38bdf8] transition-all min-h-[150px]"
            ></textarea>
            <div className="flex justify-between items-center">
               <div className="flex gap-4">
                  <button className="px-6 py-2 rounded-xl bg-[#0b1220] border border-[#1f2937] text-[10px] font-black uppercase tracking-widest italic text-[#38bdf8] hover:bg-[#38bdf8]/10 transition-all">Save Template</button>
                  <button className="px-6 py-2 rounded-xl bg-[#0b1220] border border-[#1f2937] text-[10px] font-black uppercase tracking-widest italic text-[#6b7280]">Add Variables</button>
               </div>
               <p className="text-[9px] font-black uppercase text-[#6b7280]">Est. Reach: 12,482 Users</p>
            </div>
         </div>
      </div>
    </div>
  );
}

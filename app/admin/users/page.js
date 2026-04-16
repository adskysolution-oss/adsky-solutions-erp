'use client';

import React from 'react';
import { Users, Search, Filter, MoreVertical, ShieldCheck, UserMinus, UserX, ToggleRight, Mail, Phone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserControl() {
  const users = [
    { id: 'USR-201', name: 'Abhishek Bhardwaj', email: 'admin@adskysolution.com', role: 'admin', status: 'active', joined: '12 Apr 2026' },
    { id: 'USR-202', name: 'Raj Patel', email: 'partner@adskysolution.com', role: 'partner', status: 'active', joined: '14 Apr 2026' },
    { id: 'USR-203', name: 'Suresh Kumar', email: 'agent@adskysolution.com', role: 'employee', status: 'blocked', joined: '15 Apr 2026' },
  ];

  const getRoleStyle = (role) => {
    switch(role) {
      case 'admin': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'partner': return 'text-indigo-600 bg-indigo-50 border-indigo-100';
      default: return 'text-sky-600 bg-sky-50 border-sky-100';
    }
  };

  return (
    <div className="space-y-8 pb-32 pt-4 px-4 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">
              User <span className="text-vibrant-indigo">Control</span>
           </h1>
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Identity & RBAC Management Portal</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl shadow-xl shadow-indigo-500/10 active:scale-95 transition-all">
              <Users size={18} />
              <span className="text-xs font-black uppercase tracking-widest italic">Add New Identity</span>
           </button>
        </div>
      </div>

      <div className="p-8 glass-card rounded-[3.5rem] shadow-xl border-white/60">
         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
            <div className="relative group max-w-md w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
               <input 
                 type="text" 
                 placeholder="Search Name, Email, or Identity ID..." 
                 className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white text-sm font-bold transition-all"
               />
            </div>
            <button className="flex items-center gap-3 px-6 py-4 glass-card bg-white border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-all">
               <Filter size={16} /> Filters
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-4">
               <thead>
                  <tr className="text-left text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">
                     <th className="px-8 pb-2">Identity</th>
                     <th className="px-8 pb-2">Role Cluster</th>
                     <th className="px-8 pb-2">Activity Date</th>
                     <th className="px-8 pb-2">Status</th>
                     <th className="px-8 pb-2 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="group bg-white/40 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-2xl">
                       <td className="px-8 py-5 rounded-l-3xl border-y border-l border-white/60">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-slate-100 group-hover:bg-white/10 rounded-xl flex items-center justify-center text-slate-900 group-hover:text-white font-black text-xs">
                                {user.name.charAt(0)}
                             </div>
                             <div>
                                <p className="text-[13px] font-black italic">{user.name}</p>
                                <p className="text-[9px] font-bold text-slate-400 group-hover:text-slate-500">{user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-5 border-y border-white/60">
                          <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase italic border ${getRoleStyle(user.role)} group-hover:bg-white group-hover:text-slate-900`}>
                             {user.role}
                          </span>
                       </td>
                       <td className="px-8 py-5 border-y border-white/60">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 group-hover:text-white/60">
                             <Calendar size={14} /> {user.joined}
                          </div>
                       </td>
                       <td className="px-8 py-5 border-y border-white/60">
                          <div className="flex items-center gap-2">
                             <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                             <span className="text-[10px] font-black uppercase tracking-widest italic">{user.status}</span>
                          </div>
                       </td>
                       <td className="px-8 py-5 rounded-r-3xl border-y border-r border-white/60 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="w-9 h-9 rounded-full bg-slate-50 group-hover:bg-white/10 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-all">
                                <ShieldCheck size={18} />
                             </button>
                             <button className="w-9 h-9 rounded-full bg-slate-50 group-hover:bg-white/10 flex items-center justify-center text-slate-400 group-hover:text-rose-500 transition-all">
                                <UserX size={18} />
                             </button>
                          </div>
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

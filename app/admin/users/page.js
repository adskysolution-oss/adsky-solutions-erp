'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus, 
  ShieldAlert, 
  ShieldCheck, 
  Ban, 
  Activity, 
  Key, 
  ChevronRight,
  MoreHorizontal,
  Mail,
  Phone,
  ArrowRight,
  UserCheck,
  UserX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedFilter from '@/components/admin/AdvancedFilter';

const MOCK_USERS = [
  { id: 'U-9402', name: 'Abhishek Sharma', email: 'abhishek@adsky.com', role: 'admin', status: 'active', joined: '2026-04-10' },
  { id: 'U-9401', name: 'Rajesh Punjab', email: 'rajesh@partner.com', role: 'partner', status: 'active', joined: '2026-04-12' },
  { id: 'U-9400', name: 'Sonia Gandhi', email: 'sonia@field.com', role: 'employee', status: 'blocked', joined: '2026-04-14' },
];

export default function UserControl() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const roleColors = {
    admin: 'bg-sky-50 text-sky-600 border-sky-100',
    partner: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    employee: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    farmer: 'bg-orange-50 text-orange-600 border-orange-100',
  };

  return (
    <div className="space-y-10 pb-32 font-sans">
      {/* Header */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] -mr-32 -mt-32" />
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-sky-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-sky-200">
               <Users size={40} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">User <span className="text-sky-600">Database</span></h1>
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Full Identity Control Node</span>
                  <div className="h-1 w-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] font-black uppercase text-sky-600 tracking-widest">{MOCK_USERS.length} Total Nodes</span>
               </div>
            </div>
         </div>
         <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-3 transition-all active:scale-[0.98] relative z-10">
            <UserPlus size={18} /> Provision New User
         </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
         {/* Main List Area */}
         <div className="flex-grow space-y-8">
            <AdvancedFilter targetType="users" />

            <div className="space-y-4">
               {MOCK_USERS.map((user) => (
                 <motion.div 
                   key={user.id} 
                   onClick={() => setSelectedUser(user)}
                   className={`p-6 bg-white border rounded-[3rem] shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex items-center justify-between ${selectedUser?.id === user.id ? 'border-sky-600 shadow-sky-500/5' : 'border-slate-100'}`}
                 >
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-400 group-hover:text-sky-600 transition-colors relative">
                          <Users size={28} />
                          {user.status === 'active' ? (
                             <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-sm" />
                          ) : (
                             <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-4 border-white shadow-sm" />
                          )}
                       </div>
                       <div>
                          <h3 className="text-xl font-black text-slate-900 italic tracking-tight mb-1">{user.name}</h3>
                          <div className="flex items-center gap-3">
                             <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic">{user.id}</span>
                             <div className="w-1 h-1 bg-slate-200 rounded-full" />
                             <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase border ${roleColors[user.role]}`}>
                                {user.role}
                             </span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-12 text-right invisible md:visible">
                       <div>
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Identity Source</p>
                          <p className="text-xs font-black text-slate-900">{user.email}</p>
                       </div>
                       <div className="flex items-center gap-2">
                          <button className="p-3 bg-slate-50 hover:bg-sky-50 text-slate-400 hover:text-sky-600 border border-slate-100 rounded-2xl transition-all"><Key size={16}/></button>
                          <button className="p-3 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-100 rounded-2xl transition-all"><Ban size={16}/></button>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Selection Sidebar (Detail View) */}
         <AnimatePresence>
            {selectedUser && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full lg:w-[480px] bg-white border border-slate-100 rounded-[4rem] p-12 shadow-2xl overflow-y-auto max-h-[85vh] sticky top-8 custom-scrollbar border-t-[12px] border-t-sky-600"
              >
                 <div className="flex items-center justify-between mb-12">
                    <button onClick={() => setSelectedUser(null)} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-inner"><XCircleIcon size={24} /></button>
                    <div className="flex gap-2">
                       <button className="p-3 bg-sky-50 text-sky-600 rounded-2xl hover:bg-sky-100 transition-all"><ShieldCheck size={20}/></button>
                       <button className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition-all"><ShieldAlert size={20}/></button>
                    </div>
                 </div>

                 <div className="text-center mb-12">
                    <div className="w-28 h-28 bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-300 mx-auto mb-6 shadow-inner ring-4 ring-white relative">
                       <Users size={56} />
                       <div className="absolute bottom-2 right-2 w-8 h-8 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                          <Activity size={16} />
                       </div>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter mb-2">{selectedUser.name}</h2>
                    <p className="text-slate-300 text-[9px] font-black uppercase tracking-[0.3em] italic">Identity Key: {selectedUser.id}</p>
                 </div>

                 <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                          <p className="text-[9px] font-black uppercase text-slate-400 mb-2">Role Level</p>
                          <p className="text-[11px] font-black text-slate-900 flex items-center gap-2 uppercase italic">{selectedUser.role}</p>
                       </div>
                       <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                          <p className="text-[9px] font-black uppercase text-slate-400 mb-2">Node Lifecycle</p>
                          <p className="text-[11px] font-black text-slate-900 flex items-center gap-2">{selectedUser.joined}</p>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic border-l-4 border-sky-600 pl-4">Security Orchestration</h4>
                       <div className="space-y-3">
                          <button className="w-full p-5 bg-white border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-sky-600/30 transition-all">
                             <div className="flex items-center gap-4">
                                <Mail size={16} className="text-slate-300 group-hover:text-sky-600" />
                                <span className="text-xs font-black text-slate-600 italic">{selectedUser.email}</span>
                             </div>
                             <ArrowRight size={14} className="text-slate-200" />
                          </button>
                          <button className="w-full p-5 bg-white border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-sky-600/30 transition-all">
                             <div className="flex items-center gap-4">
                                <Activity size={16} className="text-slate-300 group-hover:text-sky-600" />
                                <span className="text-xs font-black text-slate-600 italic">View Full Activity Log</span>
                             </div>
                             <ArrowRight size={14} className="text-slate-200" />
                          </button>
                       </div>
                    </div>

                    <div className="flex gap-4 pt-10 border-t border-slate-50">
                       <button className="flex-1 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-white hover:border-sky-600/20 hover:text-sky-600 transition-all">Reset Password</button>
                       <button className={`flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-2xl transition-all ${selectedUser.status === 'active' ? 'bg-rose-600 shadow-rose-200' : 'bg-emerald-600 shadow-emerald-200'}`}>
                          {selectedUser.status === 'active' ? 'Block Identity' : 'Unblock Node'}
                       </button>
                    </div>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}

function XCircleIcon({ size, className }) {
  return <UserX size={size} className={className} />;
}

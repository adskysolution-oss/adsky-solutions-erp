'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  MapPin, 
  ChevronRight, 
  Users, 
  IndianRupee, 
  Activity, 
  CheckCircle2, 
  X, 
  Clock, 
  Filter, 
  Download,
  ArrowLeft,
  XCircle,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const MOCK_MISSIONS = [
  { id: 'LD-9042', farmer: 'Subhash Chandra', phone: '+91 94032 11022', location: 'Rewa, MP', status: 'submitted', date: '2026-04-16', revenue: 74 },
  { id: 'LD-9041', farmer: 'Pooja Devi', phone: '+91 98223 99311', location: 'Satna, MP', status: 'approved', date: '2026-04-15', revenue: 74 },
  { id: 'LD-9040', farmer: 'Vikram Singh', phone: '+91 77232 21221', location: 'Bhopal, MP', status: 'rejected', date: '2026-04-14', revenue: 0 },
];

export default function FieldMissionHistory() {
  const [selectedMission, setSelectedMission] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const statusColors = {
    submitted: 'bg-amber-50 text-amber-600 border-amber-100',
    approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    rejected: 'bg-rose-50 text-rose-600 border-rose-100'
  };

  return (
    <div className="space-y-8 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
         <Link href="/field" className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm">
            <ArrowLeft size={20} />
         </Link>
         <h2 className="text-xl font-black text-slate-900 tracking-tighter italic uppercase italic leading-none">Mission <span className="text-amber-500">History</span></h2>
         <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Global Mission Search */}
      <div className="relative group px-2">
         <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={20} />
         <input 
           placeholder="Search Name, Village, Status..." 
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="w-full bg-white border border-slate-100 rounded-[2rem] py-5 pl-16 pr-8 text-sm font-bold shadow-sm outline-none focus:border-amber-500/30 transition-all italic font-sans"
         />
      </div>

      {/* Mission List */}
      <div className="space-y-4 px-2">
         {MOCK_MISSIONS.map((mission) => (
           <motion.div 
             key={mission.id} 
             onClick={() => setSelectedMission(mission)}
             className={`p-6 bg-white border rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex items-center justify-between relative overflow-hidden ${selectedMission?.id === mission.id ? 'border-amber-500 shadow-amber-500/5' : 'border-slate-50'}`}
           >
              <div className="flex items-center gap-6 relative z-10">
                 <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-amber-600 shadow-sm transition-colors">
                    <Database size={24} />
                 </div>
                 <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tighter italic mb-1 uppercase italic">{mission.farmer}</h3>
                    <div className="flex items-center gap-3">
                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">{mission.location}</span>
                       <div className="w-1 h-1 bg-slate-200 rounded-full" />
                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">{mission.date}</span>
                    </div>
                 </div>
              </div>

              <div className="text-right relative z-10">
                 <p className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${statusColors[mission.status]}`}>
                    {mission.status}
                 </p>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Mission Detail Overlay */}
      <AnimatePresence>
         {selectedMission && (
           <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-end justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="w-full bg-white rounded-t-[4rem] p-12 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto border-t-[12px] border-t-amber-500"
              >
                 <button onClick={() => setSelectedMission(null)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900"><XCircle size={32} /></button>
                 
                 <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-600 mx-auto mb-6 shadow-inner ring-4 ring-white relative group">
                       <Database size={40} className="group-hover:rotate-12 transition-transform" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter mb-2 uppercase italic">{selectedMission.farmer}</h2>
                    <p className="text-slate-300 text-[9px] font-black uppercase tracking-[0.3em] italic">Dossier: {selectedMission.id}</p>
                 </div>

                 <div className="space-y-8">
                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] space-y-6">
                       <div className="flex justify-between items-center group cursor-default">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Node Status</span>
                          <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${statusColors[selectedMission.status]}`}>{selectedMission.status}</span>
                       </div>
                       <div className="flex justify-between items-center group cursor-default">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Mobile Nexus</span>
                          <span className="text-xs font-black text-slate-900 italic uppercase">{selectedMission.phone}</span>
                       </div>
                       <div className="flex justify-between items-center group cursor-default">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Global UTC</span>
                          <span className="text-xs font-black text-slate-900 italic uppercase">{selectedMission.date}</span>
                       </div>
                       <div className="flex justify-between items-center group cursor-default">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Regional Nexus</span>
                          <span className="text-xs font-black text-slate-900 italic uppercase">{selectedMission.location}</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group/card text-center">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/20 blur-2xl -mr-10 -mt-10 transition-all group-hover/card:scale-110" />
                          <p className="text-[9px] font-black uppercase text-slate-500 mb-2 italic">Earned Node</p>
                          <p className="text-3xl font-black italic tracking-tighter">₹{selectedMission.revenue}</p>
                       </div>
                       <div className="p-8 bg-amber-50 border border-amber-100 rounded-[2.5rem] flex flex-col justify-center items-center text-amber-600">
                          <p className="text-[8px] font-black uppercase tracking-widest mb-1 italic">Mission Flow</p>
                          <Zap size={32} />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <button className="w-full py-5 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-amber-500/30 hover:text-amber-600 transition-all flex items-center justify-center gap-3">
                          <Download size={16} /> Open Mission Dossier
                       </button>
                    </div>

                    <div className="p-6 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all text-center">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[60px] -mr-16 -mt-16 group-hover:bg-amber-500/20 transition-all" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] italic relative z-10">Export Local Sync Data</span>
                    </div>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}

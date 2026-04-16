'use client';

import React from 'react';
import { Briefcase, Search, Filter, Plus, UserCheck, TrendingUp, IndianRupee, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnersManagement() {
  const [partners, setPartners] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await fetch('/api/admin/partners');
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProvision = async () => {
    const userId = prompt('Enter User ID for new partner (or use a test UUID):');
    if (!userId) return;
    
    try {
      await fetch('/api/admin/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, region: 'New Regional Hub' })
      });
      fetchPartners();
    } catch (err) {
       console.error('Provisioning error:', err);
    }
  };

  return (
    <div className="space-y-8 pb-32 pt-4 px-4 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none mb-2">
              Partner <span className="text-vibrant-indigo">Management</span>
           </h1>
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Corporate Franchisee & Hub Control</p>
        </div>
        <button 
          onClick={handleProvision}
          className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl shadow-xl shadow-indigo-500/10 active:scale-95 transition-all"
        >
           <Plus size={18} />
           <span className="text-xs font-black uppercase tracking-widest italic">Provision New Hub</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="p-8 glass-card rounded-[2.5rem] shadow-lg border-white/60">
            <TrendingUp className="text-emerald-500 mb-4" size={24} />
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Total Revenue Share</p>
            <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter">₹84,200</h3>
         </div>
         <div className="p-8 glass-card rounded-[2.5rem] shadow-lg border-white/60">
            <UserCheck className="text-indigo-500 mb-4" size={24} />
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Active Node Count</p>
            <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter">84 <span className="text-xs text-slate-400 font-bold ml-2">Units</span></h3>
         </div>
         <div className="p-8 glass-card rounded-[2.5rem] shadow-lg border-white/60">
            <IndianRupee className="text-amber-500 mb-4" size={24} />
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Avg. Commission</p>
            <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter">28.4%</h3>
         </div>
      </div>

      <div className="p-8 glass-card rounded-[3.5rem] shadow-xl border-white/60">
         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
            <div className="relative group max-w-md w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
               <input 
                 type="text" 
                 placeholder="Search by Code, Name, or Region..." 
                 className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white text-sm font-bold transition-all"
               />
            </div>
            <button className="flex items-center gap-3 px-6 py-4 glass-card bg-white border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-all">
               <Filter size={16} />
               Regional Filters
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-4">
               <thead>
                  <tr className="text-left text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">
                     <th className="px-8 pb-2">Hub Code</th>
                     <th className="px-8 pb-2">Partner Name</th>
                     <th className="px-8 pb-2">Region</th>
                     <th className="px-8 pb-2">Commission</th>
                     <th className="px-8 pb-2 text-right">Operations</th>
                  </tr>
               </thead>
               <tbody>
                  {partners.map((partner) => (
                    <tr key={partner.id} className="group bg-white/40 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-2xl">
                       <td className="px-8 py-5 rounded-l-3xl border-y border-l border-white/60">
                          <p className="text-[11px] font-black tracking-tighter uppercase font-mono group-hover:text-indigo-400">{partner.partnerCode}</p>
                       </td>
                       <td className="px-8 py-5 border-y border-white/60">
                          <p className="text-[13px] font-black italic">{partner.user?.email || 'System Hub'}</p>
                       </td>
                       <td className="px-8 py-5 border-y border-white/60">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 group-hover:text-white/60">
                             <MapPin size={14} /> {partner.region}
                          </div>
                       </td>
                       <td className="px-8 py-5 border-y border-white/60">
                          <span className="text-xs font-black italic text-indigo-600 group-hover:text-indigo-400">{partner.commissionRate}%</span>
                       </td>
                       <td className="px-8 py-5 rounded-r-3xl border-y border-r border-white/60 text-right">
                          <button className="px-6 py-2 bg-slate-50 group-hover:bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest italic group-hover:text-white transition-all">
                             Deep Settings
                          </button>
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

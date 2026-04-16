'use client';

import React from 'react';
import PartnerSidebar from '@/components/partner/PartnerSidebar';
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  Globe,
  MoreHorizontal,
  Activity
} from 'lucide-react';

export default function PartnerLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <PartnerSidebar />

      {/* Main Content Node */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-100 px-10 flex items-center justify-between z-30 shadow-sm shadow-slate-200/5">
           <div className="flex items-center gap-6 flex-grow max-w-xl">
              <div className="relative w-full group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                 <input 
                   placeholder="Universal Node Search (Leads, EMPs, Transactions)..." 
                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-6 text-xs font-bold outline-none focus:border-indigo-500/30 transition-all font-sans"
                 />
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-2xl shadow-sm">
                 <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest italic">ADS-001 Live</span>
              </div>
              
              <div className="h-8 w-px bg-slate-100 mx-2" />
              
              <button className="relative p-2.5 text-slate-400 hover:text-indigo-600 transition-colors">
                 <Bell size={20} />
                 <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                 <div className="text-right hidden md:block">
                    <p className="text-xs font-black text-slate-900 leading-none mb-1">Rajesh Punjab</p>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Franchise Owner</span>
                 </div>
                 <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-200 cursor-pointer hover:scale-105 transition-transform">
                    <User size={20} />
                 </div>
              </div>
           </div>
        </header>

        {/* Dynamic Page Target */}
        <main className="flex-grow overflow-y-auto p-12 custom-scrollbar">
           {children}
        </main>
      </div>
    </div>
  );
}

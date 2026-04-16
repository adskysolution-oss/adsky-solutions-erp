'use client';

import React from 'react';
import EmployeeMobileNav from '@/components/employee/EmployeeMobileNav';
import { 
  Menu, 
  MapPin, 
  Zap, 
  User, 
  Settings, 
  Activity,
  Globe,
  MoreVertical,
  Bell
} from 'lucide-react';

export default function FieldLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile-First Header (Fixed) */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 flex items-center justify-between z-50">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
               <Zap size={20} fill="currentColor" />
            </div>
            <div>
               <h1 className="text-lg font-black text-slate-900 tracking-tighter italic leading-none">AdSky</h1>
               <p className="text-[8px] font-black uppercase text-amber-500 tracking-widest mt-0.5">Field Agent</p>
            </div>
         </div>

         <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
               <MapPin size={12} className="text-amber-500" />
               <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Satna, MP</span>
            </div>
            <button className="p-2.5 text-slate-400 hover:text-amber-600 transition-colors relative">
               <Bell size={20} />
               <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-white" />
            </button>
         </div>
      </header>

      {/* Main Container */}
      <div className="flex-grow flex flex-col pt-20 pb-24 md:pb-0 min-w-0">
        <main className="flex-grow overflow-y-auto px-6 py-8 custom-scrollbar">
           {children}
        </main>
      </div>

      {/* Persistent Bottom Nav (Mobile Only) */}
      <EmployeeMobileNav />
    </div>
  );
}

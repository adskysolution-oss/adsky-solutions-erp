'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Zap, 
  IndianRupee, 
  BarChart3, 
  LogOut,
  MapPin,
  Share2,
  Wallet,
  Settings,
  Activity,
  Globe,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_ITEMS = [
  { name: 'Hub Dashboard', icon: LayoutDashboard, path: '/partner' },
  { name: 'Field Force', icon: Users, path: '/partner/employees' },
  { name: 'Lead Queue', icon: Zap, path: '/partner/leads' },
  { name: 'Referral Engine', icon: Share2, path: '/partner/referrals' },
  { name: 'Earnings', icon: IndianRupee, path: '/partner/earnings' },
  { name: 'Analytics', icon: BarChart3, path: '/partner/analytics' },
];

export default function PartnerSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`w-72 bg-white border-r border-slate-100 flex flex-col h-screen fixed left-0 top-0 z-[120] shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Brand Header */}
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                 <Globe size={24} />
              </div>
              <div>
                 <h1 className="text-xl font-black text-slate-900 tracking-tighter italic leading-none">AdSky</h1>
                 <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest mt-0.5">Partner Hub</p>
              </div>
           </div>
           
           <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-900">
              <X size={20} />
           </button>
        </div>

      {/* Sidebar Nav */}
      <div className="flex-grow overflow-y-auto px-4 py-8 space-y-2 custom-scrollbar">
         {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group/item ${isActive ? 'bg-indigo-50 text-indigo-900 border border-indigo-100 shadow-lg shadow-indigo-500/5' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                 <item.icon size={18} className={`${isActive ? 'text-indigo-600' : 'text-slate-300 group-hover/item:text-slate-500'}`} />
                 <span className={`text-[11px] font-black tracking-tight ${isActive ? '' : 'uppercase tracking-widest opacity-80'}`}>
                    {item.name}
                 </span>
                 {isActive && (
                    <div className="absolute right-3 w-1 h-5 bg-indigo-600 rounded-full shadow-glow" />
                 )}
              </Link>
            );
         })}
      </div>

      {/* Regional context */}
      <div className="p-6 border-t border-slate-50 bg-slate-50/50">
         <div className="p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 blur-2xl group-hover:bg-indigo-500/10 transition-all" />
            <div className="flex items-center gap-3 relative z-10">
               <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100">
                  <MapPin size={18} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Active Region</p>
                  <p className="text-xs font-black text-slate-900 italic uppercase">Maharashtra Hub</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

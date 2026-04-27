'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  Settings, 
  Wallet, 
  BarChart3, 
  LogOut,
  ShieldCheck,
  Globe,
  Database,
  Layers,
  Sparkles,
  Search,
  Zap,
  IndianRupee,
  Activity,
  UserCheck,
  Monitor,
  Flame
} from 'lucide-react';
import { motion } from 'framer-motion';

const MENU_GROUPS = [
  {
    title: 'AdSky Command Center',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
      { name: 'CMS Builder', icon: Layers, path: '/admin/cms' },
      { name: 'Form Pro', icon: FileText, path: '/admin/cms/forms' },
      { name: 'Vendors Panel', icon: Store, path: '/admin/vendors' },
      { name: 'Branding', icon: Sparkles, path: '/admin/settings' },
    ]
  },
  {
    title: 'Operations (CRM)',
    items: [
      { name: 'User Control', icon: Users, path: '/admin/users' },
      { name: 'Partners Hub', icon: Briefcase, path: '/admin/partners' },
      { name: 'Mission Queue', icon: Zap, path: '/admin/leads' },
    ]
  },
  {
    title: 'Treasury & Finances',
    items: [
      { name: 'Settlements', icon: Wallet, path: '/admin/payouts' },
      { name: 'Audit Logs', icon: Database, path: '/admin/security' },
    ]
  }
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-80 glass-card fixed left-0 top-0 h-screen hidden md:flex flex-col z-50 shadow-[10px_0_40px_rgba(0,0,0,0.02)] border-r border-slate-200/50">
      {/* Brand Header */}
      <div className="p-6 pb-8 flex items-center justify-between relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-rose-500/5 opacity-50" />
         <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-xl">
               <Activity size={20} />
            </div>
            <div>
               <h1 className="text-xl font-black text-slate-900 tracking-tighter italic leading-none">AdSky</h1>
               <p className="text-[9px] font-black uppercase text-indigo-600 tracking-widest mt-0.5">25X SYSTEM</p>
            </div>
         </div>
      </div>

      {/* Sidebar Nav */}
      <div className="flex-grow overflow-y-auto px-4 py-2 space-y-8 custom-scrollbar relative z-10">
         {MENU_GROUPS.map((group) => (
           <div key={group.title} className="space-y-2">
              <h3 className="px-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 flex items-center gap-2">
                <div className="w-1 h-2 bg-indigo-500/20 rounded-full" />
                {group.title}
              </h3>
              {group.items.map((item) => {
                 const isActive = pathname === item.path;
                 return (
                   <Link 
                     key={item.name} 
                     href={item.path}
                     className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 relative group/item ${isActive ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                   >
                      <div className={`relative z-10 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 group-hover/item:text-indigo-600'}`}>
                        <item.icon size={18} />
                      </div>
                      
                      <span className={`relative z-10 text-[11px] font-black ${isActive ? 'italic' : 'uppercase tracking-wider opacity-90'}`}>
                         {item.name}
                      </span>
                      
                      {isActive && (
                         <div className="absolute right-3 w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                      )}
                   </Link>
                 );
              })}
           </div>
         ))}
      </div>

      {/* User Status / Logout */}
      <div className="p-6">
         <div className="p-4 bg-slate-50/50 rounded-2xl flex items-center justify-between border border-slate-100">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                  <UserCheck size={18} />
               </div>
               <div>
                  <p className="text-xs font-black text-slate-900 leading-none mb-1 italic">Root Admin</p>
                  <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Master</span>
               </div>
            </div>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-500 transition-all">
               <LogOut size={16} />
            </button>
         </div>
      </div>
    </div>
  );
}

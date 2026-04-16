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
    title: 'Intelligence',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
      { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    ]
  },
  {
    title: 'Operations (CRM)',
    items: [
      { name: 'User Control', icon: Users, path: '/admin/users' },
      { name: 'Partners', icon: Briefcase, path: '/admin/partners' },
      { name: 'Mission Queue', icon: Zap, path: '/admin/leads' },
    ]
  },
  {
    title: 'Treasury & Wallets',
    items: [
      { name: 'Finances', icon: IndianRupee, path: '/admin/financials' },
      { name: 'Settlements', icon: Wallet, path: '/admin/payouts' },
    ]
  },
  {
    title: 'Web & CMS V2',
    items: [
      { name: 'Page Builder', icon: Layers, path: '/admin/cms/builder' },
      { name: 'Form Engine', icon: FileText, path: '/admin/forms/builder' },
      { name: 'Branding', icon: Sparkles, path: '/admin/settings' },
    ]
  },
  {
    title: 'System Security',
    items: [
      { name: 'Audit Logs', icon: Database, path: '/admin/security' },
      { name: 'Fraud Node', icon: ShieldCheck, path: '/admin/fraud' },
    ]
  }
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-80 glass-card fixed left-0 top-0 h-screen hidden md:flex flex-col z-50 shadow-[20px_0_60px_-15px_rgba(30,41,59,0.05)] border-r border-white/40">
      {/* Brand Header */}
      <div className="p-8 pb-10 flex items-center justify-between relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-rose-500/5 opacity-50" />
         <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-slate-900 rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl glow-indigo group-hover:rotate-6 transition-all duration-500">
               <Activity size={26} />
            </div>
            <div>
               <h1 className="text-2xl font-black text-slate-900 tracking-tighter italic leading-none">AdSky</h1>
               <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest mt-1">25X SYSTEM</p>
            </div>
         </div>
         <div className="text-vibrant-emerald flex items-center animate-pulse">
            <Monitor size={14} />
         </div>
      </div>

      {/* Sidebar Nav */}
      <div className="flex-grow overflow-y-auto px-6 py-6 space-y-10 custom-scrollbar relative z-10">
         {MENU_GROUPS.map((group) => (
           <div key={group.title} className="space-y-3">
              <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 flex items-center gap-2">
                <div className="w-1 h-3 bg-indigo-500/20 rounded-full" />
                {group.title}
              </h3>
              {group.items.map((item) => {
                 const isActive = pathname === item.path;
                 return (
                   <Link 
                     key={item.name} 
                     href={item.path}
                     className={`flex items-center gap-4 px-5 py-4 rounded-[1.75rem] transition-all duration-500 relative group/item overflow-hidden ${isActive ? 'bg-slate-900 text-white shadow-2xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-white/60 hover:shadow-xl hover:shadow-slate-200/50'}`}
                   >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-500 opacity-20" />
                      )}
                      
                      <div className={`relative z-10 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 group-hover/item:text-indigo-600 group-hover/item:bg-indigo-50'}`}>
                        <item.icon size={20} />
                      </div>
                      
                      <span className={`relative z-10 text-[11.5px] font-black tracking-tight ${isActive ? 'italic' : 'uppercase tracking-widest opacity-80'}`}>
                         {item.name}
                      </span>
                      
                      {isActive && (
                         <div className="absolute right-4 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8]" />
                      )}
                   </Link>
                 );
              })}
           </div>
         ))}
      </div>

      {/* User Status / Logout */}
      <div className="p-8 relative z-10">
         <div className="p-5 glass-card bg-white/60 rounded-[2.5rem] flex items-center justify-between shadow-2xl shadow-indigo-500/5 group/profile">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white glow-indigo group-hover/profile:scale-110 transition-transform">
                  <UserCheck size={22} />
               </div>
               <div>
                  <p className="text-sm font-black text-slate-900 leading-none mb-1 italic">Root Admin</p>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Master Auth</span>
               </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-rose-50 hover:text-rose-500 transition-all shadow-inner">
               <LogOut size={20} />
            </button>
         </div>
      </div>
    </div>
  );
}

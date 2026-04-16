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
  UserCheck
} from 'lucide-react';

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
    <div className="w-72 bg-white border-r border-slate-100 flex flex-col h-full shadow-2xl z-40 relative group">
      {/* Brand Header */}
      <div className="p-8 border-b border-slate-50 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-sky-200">
               <Activity size={24} />
            </div>
            <div>
               <h1 className="text-xl font-black text-slate-900 tracking-tighter italic leading-none">AdSky</h1>
               <p className="text-[10px] font-black uppercase text-sky-600 tracking-widest mt-0.5">25X SYSTEM</p>
            </div>
         </div>
      </div>

      {/* Sidebar Nav */}
      <div className="flex-grow overflow-y-auto px-4 py-8 space-y-8 custom-scrollbar">
         {MENU_GROUPS.map((group) => (
           <div key={group.title} className="space-y-2">
              <h3 className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{group.title}</h3>
              {group.items.map((item) => {
                 const isActive = pathname === item.path;
                 return (
                   <Link 
                     key={item.name} 
                     href={item.path}
                     className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group/item ${isActive ? 'bg-sky-50 text-sky-900 border border-sky-100 shadow-lg shadow-sky-500/5' : 'text-slate-500 hover:bg-slate-50'}`}
                   >
                      <item.icon size={18} className={`${isActive ? 'text-sky-600' : 'text-slate-300 group-hover/item:text-slate-500'}`} />
                      <span className={`text-[11px] font-black tracking-tight ${isActive ? '' : 'uppercase tracking-widest opacity-80'}`}>
                         {item.name}
                      </span>
                      {isActive && (
                         <div className="absolute right-3 w-1 h-5 bg-sky-600 rounded-full shadow-glow" />
                      )}
                   </Link>
                 );
              })}
           </div>
         ))}
      </div>

      {/* User Status / Logout */}
      <div className="p-6 border-t border-slate-50 bg-slate-50/50">
         <div className="p-4 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                  <UserCheck size={18} />
               </div>
               <div>
                  <p className="text-xs font-black text-slate-900 leading-none">Root Admin</p>
                  <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Master Auth</span>
               </div>
            </div>
            <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
               <LogOut size={18} />
            </button>
         </div>
      </div>
    </div>
  );
}

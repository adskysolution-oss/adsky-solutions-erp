'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Sprout, 
  Handshake, 
  Briefcase, 
  Store, 
  CreditCard, 
  Wallet, 
  Coins, 
  BarChart3, 
  Globe, 
  Bell, 
  Settings,
  LogOut,
  ChevronRight,
  FileText,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

const MENU_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'CMS Builder', icon: Globe, path: '/admin/cms' },
  { name: 'Form Pro', icon: FileText, path: '/admin/cms/forms' },
  { name: 'Careers Hub', icon: Briefcase, path: '/admin/careers' },
  { name: 'Blog CMS', icon: FileText, path: '/admin/blogs' },
  { name: 'Vendors Matrix', icon: Store, path: '/admin/vendors' },
  { name: 'User Control', icon: Users, path: '/admin/users' },
  { name: 'Farmers', icon: Sprout, path: '/admin/farmers' },
  { name: 'Partners', icon: Handshake, path: '/admin/partners' },
  { name: 'Employees', icon: Briefcase, path: '/admin/employees' },
  { name: 'Payments', icon: CreditCard, path: '/admin/payments' },
  { name: 'Wallet', icon: Wallet, path: '/admin/wallet' },
  { name: 'Commissions', icon: Coins, path: '/admin/commissions' },
  { name: 'Reports', icon: BarChart3, path: '/admin/reports' },
  { name: 'Notifications', icon: Bell, path: '/admin/notifications' },
  { name: 'Branding', icon: Settings, path: '/admin/settings' },
  { name: 'SakhiHub', icon: Heart, path: '/admin/sakhihub' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 bg-[#111827] border-r border-[#1f2937] h-screen fixed left-0 top-0 overflow-y-auto hidden lg:flex flex-col z-[100] transition-all custom-scrollbar">
      {/* Brand */}
      <div className="p-8 border-b border-[#1f2937] flex items-center gap-3">
        <div className="w-10 h-10 bg-[#38bdf8] rounded-xl flex items-center justify-center text-[#0b1220] shadow-[0_0_20px_rgba(56,189,248,0.3)]">
          <LayoutDashboard size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#f3f4f6] tracking-tight">ADSKY</h1>
          <p className="text-[10px] font-black uppercase text-[#38bdf8] tracking-widest mt-0.5">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow p-4 mt-4 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group ${isActive ? 'bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 shadow-[0_0_15px_rgba(56,189,248,0.05)]' : 'text-[#9ca3af] hover:bg-[#1f2937] hover:text-[#f3f4f6]'}`}
            >
              <div className="flex items-center gap-3.5">
                <item.icon size={18} className={`${isActive ? 'text-[#38bdf8]' : 'text-[#6b7280] group-hover:text-[#f3f4f6]'}`} />
                <span className="text-[13px] font-semibold tracking-wide italic">{item.name}</span>
              </div>
              {isActive && (
                <motion.div layoutId="active" className="w-1.5 h-6 bg-[#38bdf8] rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-[#1f2937]">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ef4444]/5 text-[#ef4444] hover:bg-[#ef4444]/10 transition-all font-bold italic text-sm">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

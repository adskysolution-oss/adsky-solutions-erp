'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  UserPlus, 
  History, 
  User, 
  LayoutGrid,
  Zap
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', icon: Home, path: '/field' },
  { name: 'Onboard', icon: UserPlus, path: '/field/onboard' },
  { name: 'Missions', icon: Zap, path: '/field/history' },
  { name: 'Identity', icon: User, path: '/field/profile' },
];

export default function EmployeeMobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-between z-[100] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] rounded-t-[2.5rem]">
       {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative ${isActive ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
            >
               <div className={`p-2.5 rounded-2xl transition-all ${isActive ? 'bg-amber-100 text-amber-600 shadow-inner rotate-3' : 'text-slate-400'}`}>
                  <item.icon size={22} fill={isActive ? 'currentColor' : 'none'} fillOpacity={0.2} />
               </div>
               <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-amber-600' : 'text-slate-400'}`}>
                  {item.name}
               </span>
               {isActive && (
                  <div className="absolute -top-1 w-1 h-1 bg-amber-500 rounded-full" />
               )}
            </Link>
          );
       })}
    </div>
  );
}

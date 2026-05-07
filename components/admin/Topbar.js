'use client';

import React from 'react';
import { Search, Bell, User, MessageSquare, Menu } from 'lucide-react';

export default function Topbar({ onMenuClick }) {
  return (
    <header className="h-20 bg-[#0b1220]/80 backdrop-blur-xl border-b border-[#1f2937] px-4 md:px-8 flex items-center justify-between sticky top-0 z-[90]">
      <div className="flex items-center gap-4 lg:hidden">
        <button 
          onClick={onMenuClick}
          className="p-2.5 rounded-xl bg-[#111827] border border-[#1f2937] text-[#9ca3af] hover:text-[#38bdf8]"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-grow max-w-xl hidden md:block">
        <div className="relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280] group-focus-within:text-[#38bdf8] transition-colors" />
          <input 
            type="text" 
            placeholder="Search anything here..." 
            className="w-full bg-[#111827] border border-[#1f2937] rounded-2xl py-2.5 pl-12 pr-6 focus:ring-2 focus:ring-[#38bdf8]/20 focus:border-[#38bdf8] outline-none text-[#f3f4f6] text-sm italic font-medium transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button className="p-2.5 rounded-xl bg-[#111827] border border-[#1f2937] text-[#9ca3af] hover:text-[#38bdf8] hover:border-[#38bdf8]/50 transition-all relative">
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#ef4444] rounded-full ring-4 ring-[#0b1220]"></div>
          <Bell size={20} />
        </button>
        
        <button className="p-2.5 rounded-xl bg-[#111827] border border-[#1f2937] text-[#9ca3af] hover:text-[#38bdf8] transition-all">
          <MessageSquare size={20} />
        </button>

        <div className="w-[1px] h-8 bg-[#1f2937]"></div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-[#f3f4f6] leading-none mb-1 italic">Abhi Solution</p>
            <span className="text-[10px] font-black uppercase text-[#38bdf8] tracking-widest">Super Admin</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#38bdf8] to-[#6366f1] p-[2px] cursor-pointer hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#111827] rounded-[calc(1rem-2px)] flex items-center justify-center text-[#f3f4f6]">
              <User size={24} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

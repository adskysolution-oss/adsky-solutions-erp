'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/admin/DashboardSidebar';
import { Menu } from 'lucide-react';

export default function EmployeeLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-[100]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
            <Menu size={16} />
          </div>
          <span className="text-sm font-black text-slate-900 italic tracking-tighter">AdSky Employee</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-slate-50 rounded-lg text-slate-500"
        >
          <Menu size={20} />
        </button>
      </div>

      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} role="employee" />
      
      <main className="flex-grow p-4 md:p-8 md:ml-80 animate-in fade-in duration-700 min-w-0">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { 
  Globe, 
  User, 
  HelpCircle, 
  Home, 
  FileText, 
  Activity,
  Languages
} from 'lucide-react';
import Link from 'next/link';

export default function FarmerLayout({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLang = () => setLang(lang === 'en' ? 'hi' : 'en');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      {/* High-Accessibility Header */}
      <header className="bg-white border-b border-slate-100 px-6 h-20 flex items-center justify-between sticky top-0 z-50 shadow-sm">
         <Link href="/farmer" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
               <Globe size={24} />
            </div>
            <h1 className="text-xl font-black tracking-tighter italic italic uppercase">AdSky</h1>
         </Link>

         <button 
           onClick={toggleLang}
           className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all text-slate-600 shadow-inner"
         >
            <Languages size={18} className="text-emerald-500" />
            <span>{lang === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}</span>
         </button>
      </header>

      {/* Main Mission Node */}
      <main className="max-w-lg mx-auto p-6 md:p-8">
         {children}
      </main>

      {/* Farmer Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-8 py-4 flex items-center justify-between z-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
         <Link href="/farmer" className="flex flex-col items-center gap-1 group">
            <div className="p-2.5 rounded-2xl text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
               <Home size={24} />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Home</span>
         </Link>
         <Link href="/farmer/apply" className="flex flex-col items-center gap-1 group -mt-12">
            <div className="p-5 bg-emerald-600 text-white rounded-[2rem] shadow-2xl shadow-emerald-500/30 active:scale-90 transition-all">
               <FileText size={32} />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600 mt-1">Apply</span>
         </Link>
         <Link href="/farmer/support" className="flex flex-col items-center gap-1 group">
            <div className="p-2.5 rounded-2xl text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
               <HelpCircle size={24} />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Support</span>
         </Link>
      </nav>
    </div>
  );
}

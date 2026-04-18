'use client';

import React from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Layers, 
  Plus, 
  FileText, 
  Eye, 
  Edit3, 
  Sparkles,
  ArrowRight,
  Database
} from 'lucide-react';

const pageData = [
  { name: 'Home Landing', slug: '/', status: 'Published', lastMod: '12 Apr 2026', views: '24.2K' },
  { name: 'Careers Console', slug: '/careers', status: 'Published', lastMod: '18 Apr 2026', views: '1.2K' },
  { name: 'Project Portfolio', slug: '/projects', status: 'Published', lastMod: '18 Apr 2026', views: '840' },
  { name: 'Services Matrix', slug: '/services', status: 'Draft', lastMod: '10 Apr 2026', views: '0' },
];

const columns = [
  { key: 'name', label: 'PAGE IDENTITY' },
  { key: 'slug', label: 'URL ENDPOINT' },
  { key: 'status', label: 'LIFECYCLE' },
  { key: 'views', label: 'TRAFFIC' },
  { key: 'lastMod', label: 'LAST REVISION' },
];

export default function CMSManagement() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
              <Globe size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#38bdf8] italic">Content Architecture</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">CMS Builder.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Manage public pages, dynamic sections, and site-wide branding assets.</p>
        </div>

        <button className="flex items-center gap-3 px-8 py-4 bg-[#38bdf8] text-[#0b1220] rounded-2xl font-black italic shadow-xl hover:scale-105 transition-all">
          <Plus size={20} /> SPAWN NEW PAGE
        </button>
      </motion.div>

      {/* Stats Tier */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'TOTAL PAGES', value: '14', icon: Layers, color: 'text-[#6366f1]' },
          { label: 'LIVE ASSETS', value: '248', icon: Sparkles, color: 'text-[#22c55e]' },
          { label: 'DB CONNECTED', value: 'Synced', icon: Database, color: 'text-[#38bdf8]' },
          { label: 'PENDING FORMS', value: '4', icon: FileText, color: 'text-[#f59e0b]' },
        ].map((item, idx) => (
          <div key={idx} className="p-8 bg-[#111827] border border-[#1f2937] rounded-[2.5rem] flex flex-col items-center group hover:border-[#38bdf8]/20 transition-all">
             <div className={`w-12 h-12 rounded-2xl bg-[#0b1220] flex items-center justify-center ${item.color} mb-6 shadow-xl`}>
                <item.icon size={22} />
             </div>
             <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic mb-1">{item.label}</p>
             <p className="text-2xl font-black text-[#f3f4f6] italic">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <DataTable 
        title="Web Page Inventory" 
        columns={columns} 
        data={pageData} 
      />

      {/* Quick Launch Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
         <div className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3.5rem] relative overflow-hidden group">
            <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-8">Page Builder V2</h3>
            <p className="text-[#9ca3af] font-medium italic text-sm mb-10">Our visual composer allows you to modify homepage banners, service cards, and testimonials with zero code.</p>
            <div className="flex gap-4">
               <button className="px-8 py-4 bg-[#38bdf8] text-[#0b1220] rounded-xl font-black italic text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-2">
                  LAUNCH COMPOSER <Edit3 size={16} />
               </button>
               <button className="px-8 py-4 bg-[#1f2937] text-white rounded-xl font-black italic text-[10px] uppercase tracking-widest flex items-center gap-2">
                  VIEW PUBLIC SITE <Eye size={16} />
               </button>
            </div>
         </div>

         <div className="p-10 bg-gradient-to-br from-[#111827] to-[#0b1220] border border-[#1f2937] rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-[#6366f1]/10 rounded-3xl flex items-center justify-center text-[#6366f1] mb-2 group-hover:scale-110 transition-transform">
               <Sparkles size={40} />
            </div>
            <h3 className="text-3xl font-black text-[#f3f4f6] italic leading-tight">Dynamic <br /> SEO Node</h3>
            <p className="text-slate-400 text-sm font-medium italic max-w-xs">Meta tags, open-graph images, and sitemaps are automatically optimized for every public page.</p>
            <button className="px-10 py-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest italic text-white">REGENERATE SITEMAP</button>
         </div>
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { Sparkles, Camera, Image as ImageIcon, ZoomIn, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function GalleryPage() {
  const [page, setPage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetch('/api/admin/cms/pages/gallery')
      .then(res => res.json())
      .then(data => { if (!data.error) setPage(data); });
  }, []);

  const filters = ['All', 'Architecture', 'Strategy', 'Consulting', 'Events'];

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-24 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px] -z-10"></div>
           <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Camera size={14} /> Creative Vision
           </span>
           <h1 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40 leading-none">
              Visual Narrative.
           </h1>
           <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium italic">Witness the impact of our strategic implementations and architectural excellence.</p>
        </div>

        {/* Filter Bar */}
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4 mb-20">
           {filters.map(f => (
             <button 
               key={f}
               onClick={() => setActiveFilter(f)}
               className={`px-8 py-3 rounded-2xl font-black uppercase tracking-wider text-xs transition-all ${activeFilter === f ? 'bg-blue-600 text-white shadow-2xl scale-110' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5 hover:border-white/20'}`}
             >
               {f}
             </button>
           ))}
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {page?.sections && page.sections.length > 0 ? (
             page.sections.map((section, idx) => (
                <GalleryItem key={idx} image={section.content.image} title={section.content.title} category={section.content.subtitle || "Strategy"} />
             ))
           ) : (
             /* Fallback dynamic-styled placeholders if CMS is empty */
             <>
               <GalleryItem image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" title="Technical Blueprint" category="Architecture" />
               <GalleryItem image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop" title="Global Strategy" category="Strategy" />
               <GalleryItem image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop" title="Client Integration" category="Consulting" />
               <GalleryItem image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop" title="Leadership Summit" category="Events" />
               <GalleryItem image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop" title="Project Milestone" category="Consulting" />
             </>
           )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function GalleryItem({ image, title, category }) {
  return (
    <div className="group relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 cursor-pointer shadow-2xl italic">
       <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
       
       {/* Overlay */}
       <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
          <span className="text-blue-400 text-xs font-black uppercase tracking-[0.4em] mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 italic">{category}</span>
          <h3 className="text-2xl font-black text-white italic tracking-tighter mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">{title}</h3>
          
          <div className="flex items-center gap-2 text-white/60 font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-300">
             View Project <ZoomIn size={18} />
          </div>
       </div>
    </div>
  );
}

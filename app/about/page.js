'use client';
import { useState, useEffect } from 'react';
import { Sparkles, Target, Eye, Shield, Award, Users, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetch('/api/admin/cms/pages/about')
      .then(res => res.json())
      .then(data => { if (!data.error) setPage(data); });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow pt-32">
        {/* Dynamic Sections from CMS */}
        {page?.sections && page.sections.length > 0 ? (
          page.sections.map((section, idx) => (
            <section key={idx} className="py-24 px-6 relative overflow-hidden">
               <div className="max-w-7xl mx-auto relative z-10">
                 {section.type === 'hero' && (
                    <div className="text-center">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
                        <Sparkles size={14} /> {section.content.title || 'Our Identity'}
                      </span>
                      <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">
                         {section.content.heading || 'Our Story'}
                      </h1>
                      <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed italic">
                        {section.content.description}
                      </p>
                    </div>
                 )}

                 {section.type === 'standard' && (
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                      <div className="space-y-10">
                        <div className="p-1 px-5 bg-white/5 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] inline-block rounded-full border border-white/10 shadow-2xl">
                           Evolution
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter italic">
                          {section.content.title}
                        </h2>
                        <div className="space-y-8 text-slate-400 text-lg leading-relaxed font-medium">
                           {section.content.content}
                        </div>
                      </div>
                      <div className="relative aspect-video rounded-[4rem] bg-gradient-to-br from-blue-600/20 to-orange-500/10 border border-white/10 overflow-hidden group shadow-[0_0_100px_rgba(59,130,246,0.1)]">
                         <div className="absolute inset-0 bg-black/40 z-10"></div>
                         {section.content.image && (
                           <img src={section.content.image} alt={section.content.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                         )}
                         <div className="absolute inset-0 flex items-center justify-center z-20">
                            <p className="italic text-white/20 text-2xl font-black uppercase tracking-[1em] translate-x-[0.5em]">Global Partner</p>
                         </div>
                      </div>
                   </div>
                 )}
               </div>
            </section>
          ))
        ) : (
           /* Fallback Hero if no sections */
           <section className="py-32 text-center bg-[#020617]">
             <h1 className="text-7xl font-black italic mb-6">About Us</h1>
             <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">Empowering your digital future with enterprise solutions.</p>
           </section>
        )}

        {/* Static Values Section - Always High Fidelity */}
        <section className="py-32 px-6 bg-[#020617]">
          <div className="max-w-7xl mx-auto text-center">
             <h2 className="text-4xl md:text-6xl font-black italic mb-20 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
               Engineering Excellence
             </h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                <ValueCard icon={Shield} title="Integrity" description="Highest standards of ethics and data protection." />
                <ValueCard icon={Award} title="Excellence" description="Premium quality in every line of code we ship." />
                <ValueCard icon={Users} title="Human-Centric" description="Building relationships that drive real growth." />
                <ValueCard icon={TrendingUp} title="Innovation" description="Always ahead of the technology curve." />
             </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ValueCard({ icon: Icon, title, description }) {
  return (
    <div className="p-10 rounded-[2.5rem] border border-white/5 bg-white/5 hover:bg-white/10 hover:border-blue-500/40 transition-all duration-500 text-left group">
       <div className="text-blue-500 mb-8 group-hover:scale-110 transition-transform duration-500 w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
          <Icon size={32} />
       </div>
       <h4 className="text-2xl font-black mb-4 italic tracking-tight">{title}</h4>
       <p className="text-slate-400 leading-relaxed font-medium">{description}</p>
    </div>
  );
}

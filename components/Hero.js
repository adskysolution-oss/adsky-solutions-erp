'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const [data] = useState({
    title: 'Integrated IT Solutions & Workforce Consulting',
    description: 'Delivering expert IT consulting, software development, and professional staffing solutions for growing businesses.',
    subtitle: 'Strategic Technical Advisory'
  });

  useEffect(() => {
    // Static version: No fetch required
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 px-6 overflow-hidden bg-[#020617]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 text-white leading-[1.1] tracking-tighter" >
            {data.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light" >
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link className="px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-white text-black font-bold hover:shadow-2xl hover:shadow-white/20 transition-all transform hover:-translate-y-1 text-sm sm:text-base" href="/pricing">
              Book IT Consultation
            </Link>
            <Link className="px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-transparent border border-white/20 text-white font-bold hover:bg-white/5 transition-all text-sm sm:text-base" href="/services">
              Explore Our Services
            </Link>
          </div>
        </div>

        {/* Floating Icons/Badges - Kept from original design */}
        <div className="relative h-[650px] mt-12 hidden lg:block">
           {/* SVG Lines and Person Image Logic from original */}
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[520px] z-20" >
            <div className="relative w-full h-full group">
              <Image alt="Manpower Expert" fill className="object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] brightness-110 contrast-110" src="/men.png" />
            </div>
          </div>
          
          {/* Ad-hoc badges like Auditors, Data Annotators etc */}
          <div className="absolute left-[5%] top-[5%] text-center group z-30">
            <div className="relative w-32 h-32 p-1 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-700/30 border border-white/20 overflow-hidden shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image alt="Auditors" fill className="object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" />
              </div>
            </div>
            <p className="mt-4 text-white text-[10px] font-bold tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">Auditors</p>
          </div>

          <div className="absolute left-[0%] top-[45%] text-center group z-30">
            <div className="relative w-32 h-32 p-1 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-700/30 border border-white/20 overflow-hidden shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image alt="Data Annotators" fill className="object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" />
              </div>
            </div>
            <p className="mt-4 text-white text-[10px] font-bold tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">Data Annotators</p>
          </div>

          <div className="absolute left-[5%] bottom-[2%] text-center group z-30">
            <div className="relative w-32 h-32 p-1 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-700/30 border border-white/20 overflow-hidden shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image alt="Mentors" fill className="object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop" />
              </div>
            </div>
            <p className="mt-4 text-white text-[10px] font-bold tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">Mentors</p>
          </div>

          <div className="absolute right-[5%] top-[5%] text-center group z-30">
            <div className="relative w-32 h-32 p-1 rounded-full bg-gradient-to-br from-orange-500/30 to-orange-700/30 border border-white/20 overflow-hidden shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image alt="Promoters" fill className="object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop" />
              </div>
            </div>
            <p className="mt-4 text-white text-[10px] font-bold tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">Promoters</p>
          </div>

          <div className="absolute right-[0%] top-[45%] text-center group z-30">
            <div className="relative w-32 h-32 p-1 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-700/30 border border-white/20 overflow-hidden shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image alt="Telecallers" fill className="object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop" />
              </div>
            </div>
            <p className="mt-4 text-white text-[10px] font-bold tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">Telecallers</p>
          </div>

          <div className="absolute right-[5%] bottom-[2%] text-center group z-30">
            <div className="relative w-32 h-32 p-1 rounded-full bg-gradient-to-br from-rose-500/30 to-rose-700/30 border border-white/20 overflow-hidden shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image alt="Invigilators" fill className="object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2576&auto=format&fit=crop" />
              </div>
            </div>
            <p className="mt-4 text-white text-[10px] font-bold tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">Invigilators</p>
          </div>
        </div>

        {/* Mobile View logic - kept from original */}
        <div className="lg:hidden mt-20 grid grid-cols-2 gap-4 sm:gap-8 text-center">
            {/* simplified for brevity, following original layout */}
            <div className="col-span-2 mb-8">
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-blue-500/20 bg-blue-900/40 backdrop-blur-md flex items-center justify-center">
                <Image alt="Manpower Expert" fill className="object-contain relative z-10 brightness-110" src="/men.png" />
              </div>
            </div>
            {/* badges for mobile */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">Auditors</div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">Promoters</div>
        </div>
      </div>
    </section>
  );
}

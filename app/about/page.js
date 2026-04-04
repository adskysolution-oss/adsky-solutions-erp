'use client';
import React from 'react';
import { Target, Users, ShieldCheck, Rocket, Globe, Zap, CheckCircle2, Award, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white overflow-hidden">
      <Navbar />
      
      <main className="flex-grow pt-32">
        {/* --- HERO SECTION --- */}
        <section className="py-24 px-6 relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-white/40 leading-none">
              Engineering <br /> The Future.
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium italic animate-in fade-in slide-in-from-bottom-8 duration-700">
              AdSky Solution is a professional consulting firm specializing in IT strategy, software development, and specialized workforce solutions.
            </p>
          </div>
        </section>

        {/* --- VISION & MISSION --- */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12 p-12 rounded-[5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl group hover:bg-blue-600/10 transition-all duration-700">
              <div className="w-20 h-20 rounded-3xl bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Target size={40} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic">Our Mission</h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed italic">
                To simplify business operations through expert consulting and strategic technical integration, ensuring growth and efficiency for our partners.
              </p>
            </div>

            <div className="space-y-12 p-12 rounded-[5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl group hover:bg-indigo-600/10 transition-all duration-700">
              <div className="w-20 h-20 rounded-3xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Rocket size={40} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic">Our Vision</h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed italic">
                To become the leading standard for workforce consulting and business process advisory, bridging the gap between talent and high-growth opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* --- VALUES GRID --- */}
        <section className="py-32 px-6 bg-blue-600/5 border-y border-white/5 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
               <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic mb-6">Core Values</h2>
               <div className="w-40 h-2 bg-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <ValueItem 
                icon={ShieldCheck} 
                title="Integrity" 
                desc="ISO 9001:2015 certified processes for unmatched quality and trust across all enterprise verticals." 
              />
              <ValueItem 
                icon={Globe} 
                title="Global Scale" 
                desc="Managing operations across 50+ cities with a localized precision that respects regional dynamics." 
              />
              <ValueItem 
                icon={Zap} 
                title="Innovation" 
                desc="Constant evolution of our technical frameworks and candidate experience across all specialized service sectors." 
              />
            </div>
          </div>
        </section>

        {/* --- STATS DISPLAY --- */}
        <section className="py-32 px-6">
           <div className="max-w-7xl mx-auto rounded-[6rem] bg-white text-black p-20 relative overflow-hidden shadow-[0_0_150px_rgba(255,255,255,0.15)] flex flex-wrap justify-center gap-20">
              <BigStat value="10k+" label="Success Stories" color="blue" />
              <BigStat value="500+" label="Partners Globally" color="indigo" />
              <BigStat value="98%" label="Project ROI" color="emerald" />
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ValueItem({ icon: Icon, title, desc }) {
  return (
    <div className="space-y-6 group p-8 rounded-[3rem] hover:bg-white/5 transition-all duration-500">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-2xl">
        <Icon size={28} />
      </div>
      <h4 className="text-3xl font-black italic tracking-tight">{title}</h4>
      <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function BigStat({ value, label, color }) {
  const colors = {
    blue: 'text-blue-600',
    indigo: 'text-indigo-600',
    emerald: 'text-emerald-600'
  }
  return (
    <div className="text-center group">
      <h5 className={`text-6xl md:text-9xl font-black italic tracking-tighter ${colors[color]} group-hover:scale-110 transition-transform duration-700 leading-none`}>
        {value}
      </h5>
      <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-sm mt-4">{label}</p>
    </div>
  );
}

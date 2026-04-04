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
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-white/40 leading-[0.9]">
              Engineering <br /> The Future.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium italic animate-in fade-in slide-in-from-bottom-8 duration-700">
              AdSky Solution is a professional consulting firm specializing in IT strategy, software development, and specialized workforce solutions.
            </p>
          </div>
        </section>

        {/* --- VISION & MISSION --- */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
            {/* --- RE-DESIGNED MISSION --- */}
            <div className="relative group overflow-hidden flex flex-col items-center text-center space-y-8 p-12 md:p-14 rounded-[3.5rem] bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-1000 hover:border-blue-500/40">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/40 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative w-24 h-24 rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl transform group-hover:rotate-6 transition-transform duration-500 border-t border-white/30">
                  <Target size={44} strokeWidth={2.5} />
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-none">Our Mission</h2>
                <p className="text-lg md:text-xl text-slate-400 font-semibold leading-relaxed italic max-w-lg">
                  To simplify business operations through expert consulting and strategic technical integration, ensuring growth and efficiency for our partners.
                </p>
              </div>
            </div>

            {/* --- RE-DESIGNED VISION --- */}
            <div className="relative group overflow-hidden flex flex-col items-center text-center space-y-8 p-12 md:p-14 rounded-[3.5rem] bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-1000 hover:border-indigo-500/40">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-600/40 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative w-24 h-24 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-2xl transform group-hover:-rotate-6 transition-transform duration-500 border-t border-white/30">
                  <Rocket size={44} strokeWidth={2.5} />
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-none">Our Vision</h2>
                <p className="text-lg md:text-xl text-slate-400 font-semibold leading-relaxed italic max-w-lg">
                  To become the leading standard for workforce consulting and business process advisory, bridging the gap between talent and high-growth opportunities.
                </p>
              </div>
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
    <div className="space-y-8 group p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-700 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-blue-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-xl">
          <Icon size={28} strokeWidth={2.5} />
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-3xl font-black italic tracking-tight text-white">{title}</h4>
        <p className="text-slate-400 font-semibold leading-relaxed italic">{desc}</p>
      </div>
    </div>
  );
}

function BigStat({ value, label, color }) {
  const gradients = {
    blue: 'from-blue-400 to-indigo-600',
    indigo: 'from-indigo-400 to-purple-600',
    emerald: 'from-emerald-400 to-teal-600'
  }
  return (
    <div className="text-center group p-8">
      <h5 className={`text-6xl md:text-9xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-br ${gradients[color]} group-hover:scale-110 transition-transform duration-700 leading-none drop-shadow-2xl`}>
        {value}
      </h5>
      <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-xs mt-6 opacity-60 group-hover:opacity-100 transition-opacity italic">{label}</p>
    </div>
  );
}

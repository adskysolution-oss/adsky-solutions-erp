'use client';
import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Target, 
  Rocket, 
  Zap, 
  CheckCircle, 
  Users, 
  Globe, 
  ShieldCheck, 
  ChartColumnIncreasing,
  Cpu,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
          {/* Animated Background Gradients */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none delay-1000"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles size={14} className="animate-spin-slow" /> THE 3-PANEL ENTERPRISE ERP
            </span>
            
            <h1 className="text-6xl md:text-[7rem] font-black leading-[0.95] tracking-tighter mb-10 italic animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Integrated IT Solutions <br className="hidden md:block" /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-400 to-white/40">& Workforce Consulting</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 font-medium italic animate-in fade-in slide-in-from-bottom-12 duration-1000">
              Empowering global enterprises with automated job lifecycle management, high-fidelity CRM systems, and precision-engineered business process solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-16 duration-1000">
              <button className="px-10 py-6 rounded-[2.5rem] bg-white text-black font-black text-lg hover:bg-blue-400 hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-4 group uppercase tracking-widest italic">
                Get Started <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="px-10 py-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-black text-lg hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-4 group uppercase tracking-widest italic">
                View Solutions
              </button>
            </div>
          </div>
        </section>

        {/* --- STATS STRIP --- */}
        <section className="py-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-3xl overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
              <Stat icon={CheckCircle} value="10k+" label="Tasks Completed" />
              <Stat icon={Users} value="500+" label="Strong Workforce" />
              <Stat icon={Globe} value="50+" label="Cities Covered" />
              <Stat icon={Zap} value="1000+" label="Pin Codes" />
            </div>
          </div>
        </section>

        {/* --- FEATURE HIGHLIGHT --- */}
        <section className="py-32 px-6 relative overflow-hidden">
           <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                 <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="p-1 px-5 bg-white/5 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] inline-block rounded-full border border-white/10 shadow-2xl">
                       Our Ecosystem
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter italic">
                       Enterprise CRM <br /> 
                       <span className="text-white/40">Meets Scalable Consulting.</span>
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed font-medium italic">
                      Automate your entire recruitment funnel with our 3-panel system. From candidate sourcing to employer analytics, we provide the architecture for high-growth enterprises.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <Feature icon={ShieldCheck} title="Verification" desc="ISO 9001:2015 standards for data integrity." />
                       <Feature icon={ChartColumnIncreasing} title="Transparency" desc="Real-time tracking of every project milestone." />
                    </div>
                 </div>
                 
                 <div className="relative aspect-video rounded-[4rem] bg-gradient-to-br from-blue-600/20 to-orange-500/10 border border-white/10 overflow-hidden group shadow-[0_0_100px_rgba(59,130,246,0.1)] animate-in fade-in slide-in-from-right-8 duration-1000">
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" alt="Dashboard Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                       <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
                          <Rocket className="text-white fill-white" size={32} />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- PREMIUM CTA --- */}
        <section className="py-32 px-6">
           <div className="max-w-7xl mx-auto rounded-[4rem] p-12 md:p-24 bg-gradient-to-br from-blue-600 to-indigo-900 border border-white/10 relative overflow-hidden shadow-[0_0_150px_rgba(37,99,235,0.4)]">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 max-w-2xl">
                 <h2 className="text-4xl md:text-7xl font-black text-white mb-10 leading-[0.95] tracking-tighter italic">
                    Ready For High-Fidelity <br /> Business Transformation?
                 </h2>
                 <p className="text-xl text-white/70 mb-12 font-medium italic">
                    Join 500+ enterprises leveraging AdSky Solution for their consulting and workforce needs. Our experts are ready to guide your roadmap.
                 </p>
                 <div className="flex flex-wrap gap-6">
                   <button className="px-10 py-6 rounded-full bg-white text-black font-black text-lg hover:bg-blue-300 transition-all shadow-2xl flex items-center gap-4 group uppercase tracking-widest italic">
                     Book Consulting <Target size={20} className="group-hover:rotate-45 transition-transform" />
                   </button>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex flex-col items-center lg:items-start group">
      <div className="flex items-center gap-4 mb-2">
        <Icon className="text-blue-500 group-hover:scale-125 transition-transform duration-500" size={24} />
        <span className="text-4xl font-black italic tracking-tighter text-white">{value}</span>
      </div>
      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="space-y-4 group">
       <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/40 transition-all duration-500">
          <Icon className="text-white group-hover:text-blue-400 transition-colors" size={24} />
       </div>
       <h4 className="text-xl font-black text-white italic tracking-tight">{title}</h4>
       <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

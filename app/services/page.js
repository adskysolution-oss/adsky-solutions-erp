'use client';
import React from 'react';
import { 
  Cpu, 
  Globe, 
  ShieldCheck, 
  BrainCircuit, 
  Zap, 
  Users, 
  MessageSquare, 
  Rocket, 
  Target,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  {
    icon: Globe,
    title: "Global IT Strategy",
    desc: "Comprehensive business roadmap development for digital-native enterprises.",
    color: "blue"
  },
  {
    icon: BrainCircuit,
    title: "AI & Automation",
    desc: "Precision workflow automation and AI-driven predictive business models.",
    color: "indigo"
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    desc: "ISO 9001:2015 standards for absolute data integrity and system safety.",
    color: "emerald"
  },
  {
    icon: Cpu,
    title: "Hardware Integration",
    desc: "Scalable hardware architecture for enterprise-level operational efficiency.",
    color: "orange"
  },
  {
    icon: Users,
    title: "Workforce Consulting",
    desc: "High-fidelity staffing solutions with real-time workforce analytics.",
    color: "purple"
  },
  {
    icon: Zap,
    title: "Quick Response CRM",
    desc: "Automated Lead tracking and management with precision reporting tools.",
    color: "amber"
  },
  {
    icon: MessageSquare,
    title: "Enterprise Support",
    desc: "24/7 dedicated support for mission-critical business processes.",
    color: "rose"
  },
  {
    icon: Rocket,
    title: "Growth Acceleration",
    desc: "Consulting strategies designed for rapid scale and global market entry.",
    color: "sky"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow pt-32">
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-24">
              <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-white/40 leading-[0.9]">
                Our Services.
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium italic">
                From specialized workforce consulting to global IT strategy, we provide the architecture for high-growth businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* --- PREMIUM CTA --- */}
        <section className="py-32 px-6">
           <div className="max-w-7xl mx-auto p-16 rounded-[4rem] bg-gradient-to-br from-indigo-900 to-black border border-white/10 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                 <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8 leading-none">
                       Need A Bespoke <br /> Professional Strategy?
                    </h2>
                    <p className="text-xl text-slate-400 font-medium italic">
                       Contact our lead architects for a personalized consultation regarding your enterprise roadmap.
                    </p>
                 </div>
                 <button className="px-12 py-8 rounded-full bg-white text-black font-black text-xl hover:bg-blue-400 hover:scale-110 active:scale-95 transition-all shadow-2xl flex items-center gap-4 group uppercase tracking-widest italic shrink-0">
                    Get Proposal <Target size={24} className="group-hover:translate-x-2" />
                 </button>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc, color, index }) {
  const colors = {
    blue: 'bg-blue-600/20 text-blue-400 border-blue-600/20',
    indigo: 'bg-indigo-600/20 text-indigo-400 border-indigo-600/20',
    emerald: 'bg-emerald-600/20 text-emerald-400 border-emerald-600/20',
    orange: 'bg-orange-600/20 text-orange-400 border-orange-600/20',
    purple: 'bg-purple-600/20 text-purple-400 border-purple-600/20',
    amber: 'bg-amber-600/20 text-amber-400 border-amber-600/20',
    rose: 'bg-rose-600/20 text-rose-400 border-rose-600/20',
    sky: 'bg-sky-600/20 text-sky-400 border-sky-600/20'
  };

  return (
    <div 
      className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 flex flex-col items-center text-center group hover:bg-white/[0.05] hover:-translate-y-4 transition-all duration-700 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`w-20 h-20 rounded-3xl ${colors[color]} flex items-center justify-center mb-8 shrink-0 border group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-xl`}>
        <Icon size={40} />
      </div>
      <h3 className="text-2xl font-black text-white mb-4 italic tracking-tight uppercase leading-none min-h-[3rem] flex items-center">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-medium mb-8 italic">
        {desc}
      </p>
      <div className="mt-auto pt-4 flex items-center gap-2 text-white/40 group-hover:text-blue-400 transition-colors cursor-pointer text-xs font-black uppercase tracking-[0.3em]">
        Learn More <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
      </div>
    </div>
  );
}

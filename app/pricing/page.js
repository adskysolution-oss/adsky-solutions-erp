'use client';
import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Rocket, Target, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const plans = [
  {
    name: "Standard",
    price: "₹14,999",
    tagline: "For Growing Startups",
    features: [
      "Access to Candidate Dashboard",
      "Lead Management CRM",
      "5 Project Postings/Month",
      "Standard Workforce Support",
      "ISO 9001:2015 Compliance"
    ],
    color: "blue",
    icon: Zap
  },
  {
    name: "Enterprise",
    price: "₹49,999",
    tagline: "For Scalable Operations",
    features: [
      "Full 3-Panel Admin Ecosystem",
      "Unlimited Project Pipeline",
      "High-Fidelity CRM Setup",
      "Priority Consulting Support",
      "Global PIN Code Coverage",
      "Custom Automation Logic"
    ],
    featured: true,
    color: "indigo",
    icon: Rocket
  },
  {
    name: "Custom",
    price: "Quote",
    tagline: "For Global Infrastructure",
    features: [
      "Bespoke IT Architecture",
      "Dedicated Project Director",
      "On-site Talent Management",
      "Full Security Integration",
      "Annual Process Audit"
    ],
    color: "white",
    icon: Target
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 text-center mb-24">
            <h1 className="text-6xl md:text-[9rem] font-black leading-[0.85] tracking-tighter mb-10 italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-white/40">
               Premium Plans.
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium italic">
               Invest in high-fidelity architecture and precision consulting designed for your enterprise's roadmap.
            </p>
          </div>

          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {plans.map((plan, index) => (
              <PricingCard key={index} {...plan} index={index} />
            ))}
          </div>
        </section>

        {/* --- TRUST BADGE --- */}
        <section className="py-20 px-6 bg-white/[0.02] border-y border-white/5 relative">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 opacity-60">
              <Badge icon={ShieldCheck} text="ISO 9001:2015 Certified" />
              <Badge icon={Sparkles} text="10k+ Successful Projects" />
              <Badge icon={Target} text="Real-time Milestone Tracking" />
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PricingCard({ name, price, tagline, features, featured, color, icon: Icon, index }) {
  return (
    <div 
      className={`p-16 rounded-[4.5rem] bg-white/[0.03] border relative overflow-hidden group transition-all duration-700 shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-700 ${featured ? 'border-blue-500/40 scale-105 bg-white/[0.05]' : 'border-white/10 hover:border-white/20'}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {featured && (
        <div className="absolute top-10 right-10 px-6 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic shadow-2xl animate-pulse">
           Recommended
        </div>
      )}
      
      <div className={`w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-700 border border-white/10`}>
        <Icon size={32} className={featured ? 'text-blue-400' : 'text-white'} />
      </div>

      <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">{name}</h3>
      <p className="text-slate-400 font-medium italic mb-10">{tagline}</p>
      
      <div className="mb-12">
        <span className="text-6xl font-black italic tracking-tighter text-white">{price}</span>
        {price !== 'Quote' && <span className="text-slate-500 font-bold ml-2">/month</span>}
      </div>

      <div className="space-y-6 mb-16">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-4">
            <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-1" />
            <span className="text-slate-300 font-medium leading-tight italic">{feature}</span>
          </div>
        ))}
      </div>

      <button className={`w-full py-8 rounded-full font-black text-lg shadow-2xl flex items-center justify-center gap-4 group uppercase tracking-widest italic transition-all duration-500 ${featured ? 'bg-white text-black hover:bg-blue-400' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'}`}>
        Get Started <ArrowRight className="group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  );
}

function Badge({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-4 group">
       <Icon className="text-blue-500 group-hover:animate-spin-slow transition-all" size={24} />
       <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">{text}</span>
    </div>
  );
}

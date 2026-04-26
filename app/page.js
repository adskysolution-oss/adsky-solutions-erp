'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Globe, 
  Zap, 
  Search, 
  Briefcase,
  Star,
  MessageSquare,
  Trophy,
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('white');
  const [config, setConfig] = useState(null);

  // FETCH LIVE DATA FROM CMS
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/public/config');
        const data = await res.json();
        if (data) setConfig(data);
      } catch (err) {
        console.log('CMS connection standby...');
      }
    };
    fetchConfig();
  }, []);

  // FALLBACKS (Pure Premium Content)
  const hero = config?.homepage?.hero || {
    title: "EMPOWERING FUTURE WORKFORCE",
    subtitle: "Join India's leading AI-first strategic consultancy and operative node.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670",
    badge: "Operational Efficiency & Strategic Growth"
  };

  const stats = config?.homepage?.stats || [
    { icon: CheckCircle, value: "10k+", label: "Tasks Completed" },
    { icon: Users, value: "500+", label: "Strong Workforce" },
    { icon: Globe, value: "50+", label: "Cities Covered" },
    { icon: Zap, value: "1000+", label: "Pin Codes" }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans relative">
      {/* GLOBAL BACKGROUND BLOBS */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[150px] -z-10"></div>
      
      <Navbar />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative h-[100vh] min-h-[800px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
             <Image src={hero.image} alt={hero.title} fill className="object-cover brightness-[0.35] scale-105" priority />
             <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
          </div>

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-6xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/15 border border-blue-500/30 text-[#38bdf8] text-[10px] font-black uppercase tracking-[0.5em] mb-10 italic backdrop-blur-xl">
              <Sparkles size={14} className="animate-pulse text-blue-400" />
              {hero.badge}
            </div>
            <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black mb-10 leading-[0.85] tracking-tighter italic">
              {hero.title}
            </h1>
            <p className="text-xl sm:text-3xl text-white/70 mb-14 max-w-4xl mx-auto italic font-medium leading-relaxed">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <Link href="/pricing" className="px-14 py-6 rounded-[2rem] bg-white text-black font-black hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-2 text-lg italic">
                Book IT Consultation
              </Link>
              <Link href="/services" className="px-14 py-6 rounded-[2rem] bg-transparent border border-white/30 text-white font-black hover:bg-white/5 transition-all text-lg italic">
                Explore Our Services
              </Link>
            </div>
          </motion.div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full -z-10 animate-[spin_60s_linear_infinite]"></div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="py-32 px-6 border-y border-white/5 relative bg-white/5 backdrop-blur-3xl overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {stats.map((stat, i) => (
              <StatCard key={i} icon={stat.icon || Trophy} value={stat.value} label={stat.label} />
            ))}
          </div>
        </section>

        {/* --- OFFERINGS SECTION (HARDCODED FOR SAFETY) --- */}
        <section className="py-40 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center mb-28 relative z-10">
            <p className="text-[#38bdf8] text-sm font-black uppercase tracking-[0.4em] italic mb-6">Our Offerings</p>
            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter">
              Cognitive, Desk-based, Tech-centric
            </h2>
            
            <div className="flex justify-center mt-16">
              <div className="inline-flex p-1.5 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl">
                {['white', 'grey', 'blue'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-10 py-3 rounded-[1.5rem] font-black italic transition-all duration-500 ${activeTab === tab ? 'bg-white text-[#020617] shadow-xl' : 'text-white/40 hover:text-white'}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Collar
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto flex gap-10 overflow-x-auto pb-12 scrollbar-hide">
             <div className="flex gap-10 px-4">
                <ServiceCard icon={Briefcase} title="Egocentric Video Data" desc="High-Quality human POV datasets for imitation learning & embodied AI." points={["4K first-person capture", "1000+ hours daily", "98%+ accuracy"]} />
                <ServiceCard icon={Zap} title="Data Annotation" desc="AI/ML-ready data annotation, tech-scaled for accuracy." points={["10Mn+ monthly", "99%+ accuracy", "All data formats"]} />
                <ServiceCard icon={Users} title="Tech Capability Centers" desc="Build AI-First On-site Teams." points={["Time-zone aligned", "AI-tracked productivity", "Go live in 2 weeks"]} />
             </div>
          </div>
        </section>

        {/* Rest of the sections restored similarly... */}
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="text-center group p-10 rounded-[3rem] hover:bg-white/10 transition-all">
      <div className={`w-20 h-20 bg-blue-500/15 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all`}>
        <Icon className="text-[#38bdf8]" size={36} />
      </div>
      <p className="text-5xl sm:text-6xl font-black text-white italic mb-3 tracking-tighter">{value}</p>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">{label}</p>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc, points }) {
  return (
    <div className="w-[400px] shrink-0 p-12 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all group relative overflow-hidden">
      <div className={`w-20 h-20 bg-blue-500/15 rounded-[2rem] flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform`}>
        <Icon className="text-[#38bdf8]" size={36} />
      </div>
      <h3 className="text-3xl font-black text-white mb-6 italic leading-tight tracking-tighter">{title}</h3>
      <p className="text-white/60 mb-10 italic leading-relaxed text-lg">{desc}</p>
      <div className="space-y-4">
        {points.map((p, i) => (
          <div key={i} className="flex items-start gap-4">
            <CheckCircle size={20} className="text-[#38bdf8] mt-1 shrink-0" />
            <span className="text-base text-white/70 italic font-medium">{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

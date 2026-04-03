'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import SectionRenderer from '@/components/SectionRenderer';
import Link from 'next/link';
import { CheckCircle, Zap, Users, Globe, ArrowRight } from 'lucide-react';

// Premium Fallback — Visible if DB is empty
function FallbackHome() {
  return (
    <>
      <Hero />

      {/* Stats Banner */}
      <section className="py-24 px-6 border-y border-white/5 relative bg-[#020617]/50 backdrop-blur-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-50"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {[
            { label: 'Tasks Completed', value: '10k+', icon: CheckCircle, color: 'from-blue-500 to-cyan-400' },
            { label: 'Strong Workforce', value: '500+', icon: Users, color: 'from-orange-500 to-amber-400' },
            { label: 'Cities Covered', value: '50+', icon: Globe, color: 'from-purple-500 to-pink-400' },
            { label: 'Pin Codes', value: '1000+', icon: Zap, color: 'from-emerald-500 to-teal-400' }
          ].map((stat, i) => (
            <div key={i} className="group text-center">
              <div className="relative mb-6 inline-block">
                <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon size={28} />
                </div>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 text-white italic tracking-tighter">{stat.value}</h3>
              <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black opacity-70 italic">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Services />

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-[#020617]">
        <div className="max-w-6xl mx-auto p-12 lg:p-20 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-md relative text-center shadow-[0_0_100px_rgba(59,130,246,0.1)] group">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-all duration-1000"></div>
          <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter leading-none">
            Ready to scale with <span className="text-blue-500">Precision?</span>
          </h2>
          <p className="text-lg sm:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-medium leading-relaxed italic">
            Join hundreds of successful partners who have trusted AD Sky Solution with their strategic management and growth in the digital era.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Link className="px-12 py-6 rounded-3xl bg-blue-600 text-white font-black text-xl shadow-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3 group/btn" href="/register">
              Partner With Us <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
            </Link>
            <Link className="px-12 py-6 rounded-3xl bg-white/5 border border-white/10 text-white font-black text-xl hover:bg-white/10 transition-all" href="/careers">
              Carrier Portal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  const [sections, setSections] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const res = await fetch('/api/admin/cms/pages?slug=home');
        const data = await res.json();
        // Check if data is array or object based on route refactor
        const pageData = Array.isArray(data) ? data.find(p => p.slug === 'home') : data;
        
        if (pageData && pageData.sections && pageData.sections.length > 0) {
          setSections(pageData.sections);
        } else {
          setSections([]);
        }
      } catch (err) {
        setSections([]);
      } finally {
        setLoaded(true);
      }
    };
    fetchHomePage();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      <main className="flex-grow">
        {!loaded || sections === null ? (
          <div className="min-h-screen flex items-center justify-center bg-[#020617]">
             <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : sections.length > 0 ? (
          <SectionRenderer sections={sections} />
        ) : (
          <FallbackHome />
        )}
      </main>
      <Footer />
    </main>
  );
}

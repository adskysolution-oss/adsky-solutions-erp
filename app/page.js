'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import SectionRenderer from '@/components/SectionRenderer';
import Link from 'next/link';
import { CheckCircle, Zap, Users, Globe } from 'lucide-react';

// Hardcoded fallback — always visible even if DB is empty
function FallbackHome() {
  return (
    <>
      <Hero />

      {/* Stats Banner */}
      <section className="py-24 px-6 border-y border-white/5 relative bg-[#020617]/50 backdrop-blur-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {[
            { label: 'Tasks Completed', value: '10k+', icon: CheckCircle, color: 'from-blue-500 to-cyan-400' },
            { label: 'Strong Workforce', value: '500+', icon: Users, color: 'from-orange-500 to-amber-400' },
            { label: 'Cities Covered', value: '50+', icon: Globe, color: 'from-purple-500 to-pink-400' },
            { label: 'Pin Codes', value: '1000+', icon: Zap, color: 'from-emerald-500 to-teal-400' }
          ].map((stat, i) => (
            <div key={i} className="group text-center">
              <div className="relative mb-6 inline-block">
                <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-2xl`}>
                  <stat.icon size={28} />
                </div>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-white">{stat.value}</h3>
              <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-medium opacity-70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Services />

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-[#020617]">
        <div className="max-w-5xl mx-auto p-12 lg:p-16 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-md relative text-center shadow-2xl">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black mb-8 italic">Ready to transform your vision into reality?</h2>
          <p className="text-base sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto">Join hundreds of successful partners who have trusted AD Sky Solution with their strategic management and growth.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link className="px-10 py-5 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-2xl hover:scale-105 transition-all" href="/register">Partner With Us</Link>
            <Link className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all" href="/careers">View Career Portal</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  const [sections, setSections] = useState(null); // null = loading, [] = no DB data
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const res = await fetch('/api/admin/cms/pages?slug=home');
        const data = await res.json();
        if (data && data.sections && data.sections.length > 0) {
          setSections(data.sections);
        } else {
          setSections([]); // empty = use fallback
        }
      } catch {
        setSections([]); // on error = use fallback
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
        {/* Always show fallback if DB empty, show DB sections if available */}
        {!loaded || sections === null ? (
          <FallbackHome />
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

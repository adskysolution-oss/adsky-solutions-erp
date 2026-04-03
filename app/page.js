'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Zap, Users, Globe } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Dynamic CMS-Ready Sections */}
        <Hero />
        
        {/* Strategic Strategy Section (Static for now, but clean JSX) */}
        <section className="py-32 px-6 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-slate-900">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-8 border border-blue-100 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Strategic Technical Advisory
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tighter">
                Fuel Your <br/><span className="text-blue-600 italic">Future</span> <br/>With Expert Strategy.
              </h2>
              <p className="text-xl text-slate-600 mb-12 max-w-xl leading-relaxed font-medium">
                Website & App Strategy Consultation, CRM/HRMS Setup, and Business Process Automation guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link className="group flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-[#020617] text-white font-bold hover:shadow-2xl hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1" href="/register">
                  Book 1 Hour – ₹999 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link className="px-10 py-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold hover:bg-slate-100 transition-all text-center" href="/services">
                  Our Services
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                <Image alt="Strategy" fill className="object-cover" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                  <p className="text-3xl font-black text-white italic mb-1">99% Success Rate</p>
                  <p className="text-white/70 text-sm font-bold uppercase tracking-widest leading-none">Digital Transformation Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
              <Link className="px-10 py-5 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-2xl hover:scale-105 transition-all" href="/register">
                Partner With Us
              </Link>
              <Link className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all" href="/careers">
                View Career Portal
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </main>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Users, Globe, Zap, 
  Briefcase, Award, Sparkles, Layout
} from 'lucide-react';

const icons = {
  Zap, Users, Globe, CheckCircle, Briefcase, Award, Sparkles, Layout
};

export default function SectionRenderer({ section }) {
  const { sectionType, title, subtitle, description, image, items, styling } = section;
  const style = styling || {};

  switch (sectionType) {
    case 'hero':
      return (
        <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 px-6 overflow-hidden bg-[#020617]" style={{ backgroundColor: style.backgroundColor }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10 w-full text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 text-white leading-[1.1] tracking-tighter italic"
              style={{ color: style.textColor }}
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-slate-400 text-base sm:text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              {description}
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/register" className="px-12 py-5 rounded-2xl bg-white text-black font-black hover:shadow-2xl transition-all italic">
                Get Started
              </Link>
            </div>
          </div>
        </section>
      );

    case 'services':
      return (
        <section className="py-32 px-6 bg-[#020617]/50 relative backdrop-blur-3xl" style={{ backgroundColor: style.backgroundColor }}>
          <div className="max-w-7xl mx-auto text-center mb-20">
            <p className="text-blue-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">{subtitle}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white italic">{title}</h2>
          </div>
          <div className="max-w-7xl mx-auto flex gap-8 overflow-x-auto pb-8">
            {items?.map((item, idx) => (
              <div key={idx} className="min-w-[350px] p-10 rounded-[3rem] bg-white text-slate-900 shadow-xl">
                <h3 className="text-2xl font-bold mb-4 italic">{item.title}</h3>
                <p className="text-slate-600 mb-6 font-medium italic">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case 'cta':
      return (
        <section className="py-32 px-6 bg-[#020617] relative">
          <div className="max-w-5xl mx-auto p-16 rounded-[40px] bg-white/5 border border-white/10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-8 italic text-white">{title}</h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto italic">{description}</p>
            <Link href="/contact" className="px-12 py-5 rounded-2xl bg-blue-600 text-white font-black text-lg italic uppercase tracking-widest">
              Contact Us
            </Link>
          </div>
        </section>
      );

    default:
      return (
        <section className="py-20 px-6 text-center bg-[#020617] text-white">
          <h2 className="text-3xl font-black italic mb-4">{title}</h2>
          <p className="text-slate-400 italic">{description}</p>
        </section>
      );
  }
}

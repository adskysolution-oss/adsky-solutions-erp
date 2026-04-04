'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Briefcase, Zap, Users, Globe, ArrowRight } from 'lucide-react';

export default function Services() {
  const [data] = useState({
    title: 'Our Offerings',
    subtitle: 'Cognitive, Desk-based, Tech-centric',
    items: [
      {
        title: 'Egocentric Video Data for Robotics',
        description: 'High-Quality human POV datasets for imitation learning & embodied AI.',
        icon: Briefcase,
        points: ['4K first-person capture', '1000+ hours daily', '98% accuracy']
      },
      {
        title: 'Data Annotation',
        description: 'AI/ML-ready data annotation, tech-scaled for accuracy.',
        icon: Zap,
        points: ['10M+ points monthly', '99% accuracy', 'Supports Image/Text/Video']
      },
      {
        title: 'AI-First Tech Capability Centers',
        description: 'Build AI-First On-site Teams.',
        icon: Users,
        points: ['On-site aligned devs', 'AI-tracked productivity', 'Go live in 2 weeks']
      }
    ]
  });

  useEffect(() => {
    // Static version: No fetch required
  }, []);

  return (
    <section className="py-32 px-6 bg-[#020617]/50 relative overflow-hidden backdrop-blur-3xl border-y border-white/5">
      <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
        <p className="text-blue-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">{data.title}</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">{data.subtitle}</h2>
      </div>

      <div className="max-w-7xl mx-auto flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
        <div className="flex gap-8">
          {data.items.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative min-w-[300px] sm:min-w-[350px] md:min-w-[400px] flex flex-col p-8 rounded-4xl bg-white border border-slate-100 hover:border-blue-500/30 transition-all duration-500 overflow-hidden shadow-xl"
            >
              <div className="relative z-10 flex flex-col h-full text-slate-900">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform">
                    {/* Dynamic Icon Handling */}
                    <Briefcase size={28} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium">{item.description}</p>
                
                {item.points && (
                  <ul className="space-y-4 mb-12 grow">
                    {item.points.map((p, pidx) => (
                      <li key={pidx} className="flex items-start gap-3 text-sm text-slate-500 font-medium">
                        <span className="text-blue-600 mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0"></span>
                        {p}
                      </li>
                    ))}
                  </ul>
                )}

                <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95">
                  Know More <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

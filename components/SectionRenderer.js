import React from 'react';
import Hero from './Hero';
import Services from './Services';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Zap, Users, Globe } from 'lucide-react';

const iconMap = { CheckCircle, Zap, Users, Globe };

export default function SectionRenderer({ sections }) {
  if (!sections || !sections.length) return null;

  return (
    <>
      {sections.map((section, idx) => {
        const { sectionType, title, subtitle, description, image, items, styling } = section;

        switch (sectionType) {
          case 'hero':
            return <Hero key={idx} data={section} />;
          
          case 'services':
            return <Services key={idx} data={section} />;

          case 'stats':
            return (
              <section key={idx} className={`py-24 px-6 border-y border-white/5 relative bg-[#020617]/50 backdrop-blur-3xl overflow-hidden`}>
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                  {items?.map((stat, i) => {
                    const Icon = iconMap[stat.icon] || CheckCircle;
                    return (
                      <div key={i} className="group text-center">
                        <div className="relative mb-6 inline-block">
                          <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-2xl`}>
                            <Icon size={28} />
                          </div>
                        </div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-white">{stat.value}</h3>
                        <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-medium opacity-70">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            );

          case 'features':
            return (
              <section key={idx} className="py-32 px-6 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="text-slate-900">
                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tighter">
                      {title}
                    </h2>
                    <p className="text-xl text-slate-600 mb-12 max-w-xl leading-relaxed font-medium">
                      {description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <Link className="group flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-[#020617] text-white font-bold transition-all transform hover:-translate-y-1" href="/register">
                        Partner With Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                      <Image alt={title} fill className="object-cover" src={image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"} />
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'cta':
            return (
               <section key={idx} className="py-32 px-6 relative overflow-hidden bg-[#020617]">
                  <div className="max-w-5xl mx-auto p-12 lg:p-16 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-md relative text-center shadow-2xl">
                    <h2 className="text-2xl sm:text-4xl md:text-6xl font-black mb-8 italic">{title}</h2>
                    <p className="text-base sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto">{description}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                      <Link className="px-10 py-5 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-2xl hover:scale-105 transition-all" href="/register">
                        Start Now
                      </Link>
                    </div>
                  </div>
               </section>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

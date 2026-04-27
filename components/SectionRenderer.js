'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Award, 
  Globe, 
  Zap,
  Sparkles,
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function SectionRenderer({ section }) {
  if (!section) return null;

  const { sectionType, title, subtitle, description, items, image, isActive } = section;

  if (!isActive) return null;

  switch (sectionType) {
    case 'hero':
      return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#020617]">
          {/* Animated Background Gradients */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest italic">
                <Sparkles size={14} className="animate-spin-slow" /> Strategic Management & Workforce
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter italic">
                {title}
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed max-w-xl italic font-medium">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/candidate/register" className="px-10 py-5 rounded-2xl bg-white text-black font-black hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3 italic uppercase tracking-widest text-xs">
                  Book IT Consultation <ArrowRight size={18} />
                </Link>
                <Link href="/services" className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black hover:bg-white/10 transition-all flex items-center justify-center italic uppercase tracking-widest text-xs">
                  Explore Services
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative">
              <div className="relative aspect-square rounded-[4rem] overflow-hidden border-2 border-white/10 shadow-3xl">
                <img 
                  src={image || "https://images.unsplash.com/photo-1522071823992-74071ec41582?q=80&w=2574"} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  alt="Hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
              </div>
            </motion.div>
          </div>
        </section>
      );

    case 'stats':
      const statIcons = [<CheckCircle2 />, <Users />, <Globe />, <Zap />];
      return (
        <section className="py-24 bg-[#020617] relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {items?.map((item, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mx-auto mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    {statIcons[idx % 4]}
                  </div>
                  <div className="text-5xl md:text-7xl font-black text-white mb-2 italic tracking-tighter group-hover:text-blue-500 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'services':
      return (
        <section className="py-32 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-4 italic">{subtitle || 'Our Expertise'}</p>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter italic">
                  {title}
                </h2>
              </div>
              <p className="text-slate-500 text-xl italic font-medium max-w-sm">
                {description}
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {items?.map((item, idx) => (
              <div key={idx} className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:border-blue-500 hover:shadow-3xl transition-all group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Briefcase size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 italic tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 italic font-medium">{item.description}</p>
                <ul className="space-y-3">
                  {item.points?.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-3 text-xs font-bold text-slate-400 italic">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      );

    case 'strategy':
      return (
        <section className="py-32 px-6 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-extrabold uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>Strategic Technical Advisory
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter italic">{title}</h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium italic">{description}</p>
              <div className="flex flex-col sm:flex-row gap-6">
                 <Link href="/pricing" className="px-10 py-5 rounded-2xl bg-[#020617] text-white font-bold hover:shadow-2xl transition-all italic">Book Consultation</Link>
                 <Link href="/services" className="px-10 py-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold hover:bg-slate-100 transition-all italic text-center">Our Services</Link>
              </div>
            </motion.div>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
               <img src={image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672'} className="w-full h-full object-cover" alt="Strategy" />
            </div>
          </div>
        </section>
      );

    case 'registration':
      return (
        <section className="py-32 px-6 bg-[#020617] relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-4">{title}</h2>
            <p className="text-white/60 italic">{description}</p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
             {items?.map((item, idx) => (
               <div key={idx} className="p-12 rounded-[3rem] bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all group">
                  <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mx-auto mb-8 group-hover:scale-110 transition-transform">
                     {idx === 0 ? <Users size={40} /> : <Briefcase size={40} />}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 italic">{item.title}</h3>
                  <p className="text-white/40 text-sm italic font-medium mb-8 leading-relaxed">{item.description}</p>
                  <Link href="/register" className="text-xs font-black uppercase tracking-widest text-blue-400 hover:text-white transition-all flex items-center justify-center gap-2">JOIN NOW <ArrowRight size={14} /></Link>
               </div>
             ))}
          </div>
        </section>
      );

    case 'featured-testimonial':
      return (
        <section className="py-32 px-6 bg-white overflow-hidden">
           <div className="max-w-7xl mx-auto text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 italic tracking-tighter">{title}</h2>
           </div>
           <div className="max-w-4xl mx-auto rounded-[4rem] bg-slate-50 border border-slate-100 p-10 md:p-20 shadow-2xl flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 rounded-full overflow-hidden shrink-0 border-8 border-white shadow-xl">
                 <img src={image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574'} className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                 <span className="inline-block px-4 py-1 rounded-full bg-[#BEF264] text-slate-900 text-[10px] font-black uppercase italic mb-6">Gig Partner</span>
                 <p className="text-slate-600 text-xl italic font-medium leading-relaxed mb-8">"{description}"</p>
                 <h4 className="text-2xl font-black text-slate-900 italic">{subtitle}</h4>
              </div>
           </div>
        </section>
      );

    case 'job-grid':
      return (
        <section className="py-32 px-6 bg-white overflow-hidden">
           <div className="max-w-7xl mx-auto mb-20 text-center">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 italic tracking-tighter">{title}</h2>
           </div>
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items?.map((item, idx) => (
                <div key={idx} className="group relative flex flex-col p-10 rounded-[3rem] text-white border border-white/5 hover:border-blue-500/30 transition-all min-h-[250px] overflow-hidden">
                   <img src={item.image || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837'} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all" />
                   <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617]/90 to-blue-900/50"></div>
                   <h3 className="relative z-10 text-2xl font-bold mb-auto italic">{item.title}</h3>
                   <div className="relative z-10 flex items-center gap-3 mt-6">
                      <span className="px-4 py-1.5 rounded-full bg-[#BEF264] text-slate-900 text-[10px] font-bold uppercase italic">{item.subtitle}</span>
                      <span className="px-3 py-1.5 rounded-full bg-white text-slate-900 text-[10px] font-bold italic">{item.count || 'Jobs Open'}</span>
                   </div>
                </div>
              ))}
           </div>
        </section>
      );

    case 'why-us':
      return (
        <section className="py-32 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <p className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-4 italic">Partner with Excellence</p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 italic tracking-tighter">{title}</h2>
          </div>
          <div className="max-w-7xl mx-auto relative rounded-[4rem] bg-[#020617] p-10 lg:p-20 overflow-hidden shadow-4xl flex flex-col lg:flex-row items-center gap-16">
             <div className="w-full lg:w-1/2 relative z-10 grid grid-cols-2 gap-4">
                {items?.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:scale-105 transition-all">
                    <Sparkles className="text-blue-400 mb-2" size={24} />
                    <h4 className="text-white font-bold italic text-sm mb-1">{item.title}</h4>
                    <p className="text-white/40 text-[10px] italic font-medium">{item.description}</p>
                  </div>
                ))}
             </div>
             <div className="w-full lg:w-1/2 relative z-10 text-center lg:text-left">
                <h3 className="text-4xl md:text-7xl font-black text-white mb-8 italic tracking-tighter leading-tight">Grow <br/><span className="text-blue-400">With Us</span></h3>
                <p className="text-white/60 text-xl italic font-medium leading-relaxed mb-12">{description}</p>
                <Link href="/register" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-black hover:bg-blue-600 hover:text-white transition-all italic uppercase tracking-widest">Find Work <ArrowRight /></Link>
             </div>
          </div>
        </section>
      );

    case 'steps':
      return (
        <section className="py-24 px-6 bg-black relative">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic">{title}</h2>
            <p className="text-white/60 italic">{description}</p>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {items?.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-white text-slate-900 flex items-center justify-center text-2xl font-black mb-8 border-4 border-slate-900 italic">{idx + 1}</div>
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 h-full">
                  <h3 className="text-xl font-bold text-white mb-4 italic">{item.title}</h3>
                  <p className="text-white/60 text-sm font-medium italic leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case 'cta':
      return (
        <section className="py-24 px-6 bg-[#020617]">
          <div className="max-w-5xl mx-auto rounded-[4rem] bg-gradient-to-br from-blue-600 to-indigo-900 p-12 md:p-20 text-center relative overflow-hidden shadow-4xl group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight italic tracking-tighter">{title}</h2>
                <p className="text-white/80 text-xl italic font-medium max-w-2xl mx-auto">{description}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                  <Link href="/register" className="px-10 py-5 bg-white text-blue-600 font-black rounded-2xl hover:scale-105 transition-all italic uppercase tracking-widest text-xs shadow-2xl">Partner With Us</Link>
                  <Link href="/candidate/jobs" className="px-10 py-5 bg-white/10 border border-white/20 text-white font-black rounded-2xl hover:bg-white/20 transition-all italic uppercase tracking-widest text-xs">View Career Portal</Link>
                </div>
             </motion.div>
          </div>
        </section>
      );

    case 'blogs':
      return (
        <section className="py-32 px-6 bg-white overflow-hidden">
           <div className="max-w-7xl mx-auto text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 italic tracking-tighter">Blogs</h2>
           </div>
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {items?.map((item, idx) => (
                <div key={idx} className="rounded-[3rem] bg-slate-50 border border-slate-100 overflow-hidden hover:shadow-3xl transition-all group">
                   <div className="aspect-[4/3] overflow-hidden">
                      <img src={item.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                   </div>
                   <div className="p-10">
                      <h3 className="text-xl font-bold text-slate-900 mb-6 italic leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
                      <div className="flex items-center justify-between mt-auto">
                         <span className="text-[10px] font-black text-slate-400 italic uppercase tracking-widest">{item.date || 'Jan 15, 2026'}</span>
                         <Link href="#" className="text-xs font-black text-blue-500 italic uppercase flex items-center gap-2">Explore <ArrowRight size={14}/></Link>
                      </div>
                   </div>
                </div>
              ))}
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

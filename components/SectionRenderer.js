'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Users, Globe, Zap, 
  Briefcase, Award, Sparkles, Layout, MessageSquare, 
  TrendingUp, Calendar, ChevronRight, Loader2
} from 'lucide-react';

const icons = {
  Zap, Users, Globe, CheckCircle, Briefcase, Award, Sparkles, Layout, MessageSquare, TrendingUp
};

export default function SectionRenderer({ section }) {
  const { sectionType, title, subtitle, description, image, items, styling } = section;
  const style = styling || {};

  switch (sectionType) {
    case 'hero':
      return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 px-6 overflow-hidden bg-[#020617]" style={{ backgroundColor: style.backgroundColor }}>
          {/* Main Background Image */}
          {image && (
            <div className="absolute inset-0 z-0">
               <img src={image} alt={title} className="w-full h-full object-cover opacity-30" />
               <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
            </div>
          )}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10 w-full text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-7xl md:text-[9rem] font-black mb-8 text-white leading-[0.85] tracking-tighter italic"
              style={{ color: style.textColor }}
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed font-medium italic opacity-80"
            >
              {description}
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/candidate/register" className="px-16 py-6 rounded-[2rem] bg-white text-black font-black text-lg hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all italic uppercase tracking-widest">
                Start Career
              </Link>
            </div>
          </div>
        </section>
      );

    case 'services':
      return (
        <section className="py-32 px-6 bg-[#020617]/50 relative backdrop-blur-3xl overflow-hidden" style={{ backgroundColor: style.backgroundColor }}>
          <div className="max-w-7xl mx-auto text-center mb-20">
            <p className="text-blue-500 text-xs font-black uppercase tracking-[0.3em] mb-4 italic">{subtitle}</p>
            <h2 className="text-4xl md:text-6xl font-black mb-12 text-white italic tracking-tighter">{title}</h2>
          </div>
          <div className="max-w-7xl mx-auto flex gap-8 overflow-x-auto pb-12 custom-scrollbar no-scrollbar">
            {items?.map((item, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -10 }}
                className="min-w-[350px] p-12 rounded-[3.5rem] bg-white text-slate-900 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 text-blue-500/10 group-hover:text-blue-500/20 transition-all">
                  <Layout size={80} />
                </div>
                <h3 className="text-2xl font-black mb-4 italic relative z-10">{item.title}</h3>
                <p className="text-slate-600 mb-8 font-medium italic relative z-10 leading-relaxed">{item.description}</p>
                <div className="flex items-center gap-2 text-blue-600 font-black italic text-xs uppercase tracking-widest relative z-10">
                   Learn More <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      );

    case 'stats':
      return (
        <section className="py-24 px-6 bg-[#020617] border-y border-white/5">
           <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {items?.map((item, idx) => (
                <div key={idx} className="space-y-2">
                   <p className="text-5xl md:text-7xl font-black text-white italic tracking-tighter">{item.title}</p>
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 italic">{item.description}</p>
                </div>
              ))}
           </div>
        </section>
      );

    case 'testimonials':
      return (
        <section className="py-32 px-6 bg-[#020617]">
           <div className="max-w-7xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black italic text-white mb-4 tracking-tighter">{title}</h2>
              <p className="text-slate-500 italic font-medium">{description}</p>
           </div>
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
              {items?.map((item, idx) => (
                <div key={idx} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 relative">
                   <MessageSquare className="absolute top-10 right-10 text-blue-500/20" size={40} />
                   <p className="text-slate-300 italic font-medium mb-8 leading-relaxed">"{item.description}"</p>
                   <div>
                      <p className="text-white font-black italic text-lg">{item.title}</p>
                      <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest italic">{item.subtitle || 'Verified Partner'}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>
      );

    case 'latest-blogs':
      return <LatestBlogsSection title={title} description={description} />;

    case 'cta':
      return (
        <section className="py-32 px-6 bg-[#020617] relative">
          <div className="max-w-5xl mx-auto p-20 rounded-[4rem] bg-gradient-to-br from-blue-600 to-indigo-600 text-center shadow-3xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[80px]"></div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic text-white tracking-tighter leading-none">{title}</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto italic font-medium">{description}</p>
            <Link href="/contact" className="px-16 py-6 rounded-2xl bg-white text-black font-black text-lg italic uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
              Partner With Us
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

function LatestBlogsSection({ title, description }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/blogs')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setBlogs(data.filter(p => p.isPublished).slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section className="py-32 px-6 bg-[#020617]">
       <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
             <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-4">{title || 'Latest Intelligence.'}</h2>
             <p className="text-slate-500 italic font-medium leading-relaxed">{description || 'Stay updated with our newest articles and market insights.'}</p>
          </div>
          <Link href="/blogs" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-blue-500 italic mb-2 hover:text-white transition-all">
             Explore All News <ChevronRight size={16} />
          </Link>
       </div>
       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogs.map((post) => (
            <Link href={`/blogs/${post.slug}`} key={post._id} className="group flex flex-col p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all">
               <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-slate-500 italic mb-6">
                  <Calendar size={12} className="text-blue-500" />
                  {new Date(post.createdAt).toLocaleDateString()}
               </div>
               <h3 className="text-2xl font-black text-white italic mb-4 group-hover:text-blue-500 transition-colors line-clamp-2">{post.title}</h3>
               <p className="text-slate-500 text-sm italic font-medium mb-10 line-clamp-2">{post.excerpt || 'Read more about this article...'}</p>
               <div className="mt-auto flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/40 italic">
                  Read Story <ArrowRight size={14} />
               </div>
            </Link>
          ))}
       </div>
    </section>
  );
}

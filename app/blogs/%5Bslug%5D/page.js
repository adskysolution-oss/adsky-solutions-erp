'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Calendar, User, Clock, Share2, 
  Bookmark, Loader2, Sparkles, ChevronRight
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/blogs`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.slug === slug);
        if (found) setPost(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><Loader2 className="animate-spin text-orange-500" size={48} /></div>;

  if (!post) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center space-y-6">
       <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">STORY NOT FOUND</h1>
       <button onClick={() => router.push('/blogs')} className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-black italic">BACK TO HUB</button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white relative overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-40 pb-24 px-6 relative">
        <div className="max-w-4xl mx-auto space-y-12">
           {/* Back Button */}
           <motion.button 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             onClick={() => router.push('/blogs')}
             className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-orange-500 transition-all italic"
           >
              <ArrowLeft size={16} /> RETURN TO NEWS HUB
           </motion.button>

           {/* Article Header */}
           <div className="space-y-10">
              <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 italic">
                 <span className="px-4 py-1.5 rounded-full bg-orange-600 text-white shadow-xl shadow-orange-600/20">{post.category}</span>
                 <div className="flex items-center gap-2"><Calendar size={12} className="text-orange-500" /> {new Date(post.createdAt).toLocaleDateString()}</div>
                 <div className="flex items-center gap-2"><User size={12} className="text-orange-500" /> {post.author}</div>
                 <div className="flex items-center gap-2"><Clock size={12} className="text-orange-500" /> 6 MIN READ</div>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-[0.95]">
                 {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl md:text-2xl text-slate-400 font-medium italic border-l-4 border-orange-600 pl-8 leading-relaxed">
                   {post.excerpt}
                </p>
              )}
           </div>

           {/* Featured Image */}
           <div className="aspect-[21/9] rounded-[3.5rem] bg-white/[0.03] border border-white/5 overflow-hidden shadow-2xl relative group">
              {post.coverImage ? (
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/5">
                   <Sparkles size={120} />
                </div>
              )}
           </div>

           {/* Content Body */}
           <article className="prose prose-invert prose-xl max-w-none text-slate-300 font-medium italic leading-[1.8]">
              <div className="whitespace-pre-wrap">
                 {post.content}
              </div>
           </article>

           {/* Social Share / Footer */}
           <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-orange-500">
                    <User size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic leading-none mb-1">WRITTEN BY</p>
                    <p className="text-lg font-black text-white italic">{post.author}</p>
                 </div>
              </div>

              <div className="flex items-center gap-4">
                 <button className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-2xl"><Share2 size={24} /></button>
                 <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white hover:border-orange-500 transition-all"><Bookmark size={24} /></button>
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

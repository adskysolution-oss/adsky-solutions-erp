'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Calendar, User, ArrowRight, Loader2, 
  ChevronRight, Bookmark, Flame, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/blogs')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setPosts(data.filter(p => p.isPublished));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><Loader2 className="animate-spin text-orange-500" size={48} /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-orange-600/5 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Navbar />

      <main className="flex-grow pt-32">
        {/* --- NEWS HUB HERO --- */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
               <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter italic leading-none drop-shadow-2xl">
                  News <span className="text-orange-500 italic-outline">Hub.</span>
               </h1>
               <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium italic mb-12 uppercase tracking-widest text-[10px]">Insights, Updates & Strategic Intelligence from AdSky Solution</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="max-w-xl mx-auto relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-rose-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
               <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 h-16">
                  <div className="flex-grow flex items-center px-6 gap-4 text-white/40 focus-within:text-white transition-all">
                     <Search size={22} />
                     <input 
                       type="text" 
                       placeholder="Explore articles..." 
                       className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/20 font-black italic text-sm tracking-widest"
                       value={search}
                       onChange={e => setSearch(e.target.value)}
                     />
                  </div>
               </div>
            </motion.div>
          </div>
        </section>

        {/* --- ARTICLE FEED --- */}
        <section className="py-24 px-6 relative">
           <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                 <AnimatePresence>
                    {filteredPosts.map((post, idx) => (
                       <motion.div 
                         key={post._id}
                         initial={{ opacity: 0, y: 30 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: idx * 0.1 }}
                         className="group flex flex-col bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden hover:bg-white/[0.05] hover:border-orange-500/20 transition-all duration-700 shadow-2xl"
                       >
                          <div className="aspect-[16/10] bg-white/[0.03] relative overflow-hidden">
                             {post.coverImage ? (
                               <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center text-white/5">
                                  <Flame size={80} />
                               </div>
                             )}
                             <div className="absolute top-6 left-6">
                                <span className="px-4 py-1.5 rounded-full bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest italic shadow-xl">
                                   {post.category}
                                </span>
                             </div>
                          </div>

                          <div className="p-10 flex flex-col flex-grow">
                             <div className="flex items-center gap-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] italic mb-6">
                                <div className="flex items-center gap-2">
                                   <Calendar size={12} className="text-orange-500" />
                                   {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                                <div className="w-1 h-1 bg-white/20 rounded-full" />
                                <div className="flex items-center gap-2">
                                   <User size={12} className="text-orange-500" />
                                   {post.author}
                                </div>
                             </div>

                             <h3 className="text-2xl font-black italic tracking-tighter text-white mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                                {post.title}
                             </h3>
                             
                             <p className="text-slate-500 text-sm font-medium italic mb-10 line-clamp-2 leading-relaxed">
                                {post.excerpt || post.content.substring(0, 120) + '...'}
                             </p>

                             <Link href={`/blogs/${post.slug}`} className="mt-auto flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-all italic">
                                READ STORY <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform" />
                             </Link>
                          </div>
                       </motion.div>
                    ))}
                 </AnimatePresence>
              </div>

              {filteredPosts.length === 0 && (
                <div className="py-40 text-center space-y-6">
                   <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto text-slate-800">
                      <Bookmark size={48} />
                   </div>
                   <h3 className="text-xl font-black text-white italic uppercase tracking-widest">No Intelligence Found</h3>
                   <p className="text-slate-500 font-medium italic max-w-xs mx-auto">Adjust your exploration parameters to find relevant articles.</p>
                </div>
              )}
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, Save, Trash2, Image as ImageIcon, 
  Loader2, Search, Edit3, X, CheckCircle, Globe, Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState({ title: '', content: '', excerpt: '', category: 'News', isPublished: false });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/blogs');
      const data = await res.json();
      if (!data.error) setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPost)
      });
      if (res.ok) {
        setShowModal(false);
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh] bg-[#0b1220]"><Loader2 className="animate-spin text-orange-500" size={48} /></div>;

  return (
    <div className="space-y-12 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">Blog <span className="text-orange-500">CMS.</span></h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1 italic">Publish News, Updates & Articles</p>
        </div>
        <button 
          onClick={() => { setEditingPost({ title: '', content: '', excerpt: '', category: 'News', isPublished: false }); setShowModal(true); }}
          className="px-10 py-5 bg-orange-600 text-white rounded-[2rem] font-black italic shadow-2xl shadow-orange-600/20 hover:scale-105 transition-all uppercase tracking-widest text-xs"
        >
          <Plus size={20} className="inline mr-2" /> NEW ARTICLE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <motion.div layout key={post._id} className="p-8 bg-[#111827] border border-[#1f2937] rounded-[3rem] group hover:border-orange-500/30 transition-all relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6">
                <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest italic ${post.isPublished ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                   {post.isPublished ? 'Live' : 'Draft'}
                </span>
             </div>
             
             <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mb-8">
                <FileText size={28} />
             </div>
             
             <h3 className="text-2xl font-black text-white italic mb-4 line-clamp-2">{post.title}</h3>
             <p className="text-slate-500 text-sm font-medium italic mb-10 line-clamp-2">{post.excerpt || 'No excerpt provided...'}</p>
             
             <div className="flex items-center justify-between pt-8 border-t border-[#1f2937]">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic">{post.category}</span>
                <button onClick={() => { setEditingPost(post); setShowModal(true); }} className="p-3 bg-white/5 text-slate-400 rounded-xl hover:text-white transition-all"><Edit3 size={18} /></button>
             </div>
          </motion.div>
        ))}

        {posts.length === 0 && (
          <div className="col-span-full py-40 text-center bg-white/[0.01] border-2 border-dashed border-[#1f2937] rounded-[4rem]">
             <Layout size={48} className="mx-auto text-slate-700 mb-4" />
             <p className="text-white font-black italic uppercase tracking-widest text-sm">NO ARTICLES PUBLISHED</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0b1220]/95 backdrop-blur-2xl">
             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="w-full max-w-4xl bg-[#111827] border border-[#1f2937] rounded-[4rem] p-12 shadow-3xl max-h-[95vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-12">
                   <h2 className="text-3xl font-black text-white italic">Article <span className="text-orange-500">Composer.</span></h2>
                   <button onClick={() => setShowModal(false)} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white"><X size={24} /></button>
                </div>
                <form onSubmit={handleSave} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-8">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 italic">Headline</label>
                           <input required type="text" value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-5 px-8 text-white font-black italic outline-none focus:border-orange-500 transition-all text-xl" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 italic">Category</label>
                           <input type="text" value={editingPost.category} onChange={e => setEditingPost({...editingPost, category: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white font-black italic outline-none focus:border-orange-500 transition-all" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 italic">Excerpt (Summary)</label>
                           <textarea rows={3} value={editingPost.excerpt} onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white font-medium italic outline-none focus:border-orange-500 transition-all text-sm" />
                         </div>
                      </div>
                      <div className="space-y-8">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 italic">Rich Content</label>
                           <textarea rows={12} value={editingPost.content} onChange={e => setEditingPost({...editingPost, content: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-3xl py-6 px-8 text-white font-medium italic outline-none focus:border-orange-500 transition-all text-base leading-relaxed" placeholder="Write your story here..." />
                         </div>
                         <div className="flex items-center gap-4 p-6 bg-[#0b1220] rounded-3xl border border-[#1f2937]">
                            <label className="flex items-center gap-4 cursor-pointer">
                               <input 
                                 type="checkbox" 
                                 checked={editingPost.isPublished}
                                 onChange={e => setEditingPost({...editingPost, isPublished: e.target.checked})}
                                 className="w-6 h-6 rounded-lg bg-[#111827] border-[#1f2937] checked:bg-orange-500 transition-all"
                               />
                               <span className="text-xs font-black uppercase text-white italic tracking-widest">Publish to Website</span>
                            </label>
                         </div>
                      </div>
                   </div>
                   <button disabled={saving} className="w-full py-6 bg-orange-600 text-white font-black uppercase tracking-widest rounded-3xl transition-all shadow-2xl shadow-orange-600/20 hover:bg-orange-700 disabled:opacity-50 italic text-sm mt-8">
                      {saving ? <Loader2 size={24} className="animate-spin mx-auto" /> : 'COMMIT ARTICLE'}
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';
import React from 'react';
import { Camera, Image as ImageIcon, Sparkles, Target, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const galleryItems = [
  {
    title: "Corporate Headquarters",
    category: "Office",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
  },
  {
    title: "Innovation Hub",
    category: "Design",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2300&auto=format&fit=crop"
  },
  {
    title: "Strategic Consulting",
    category: "Meetings",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2340&auto=format&fit=crop"
  },
  {
    title: "Agile Development",
    category: "Team",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2340&auto=format&fit=crop"
  },
  {
    title: "Tech Infrastructure",
    category: "Datacenter",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2340&auto=format&fit=crop"
  },
  {
    title: "Client Success",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2340&auto=format&fit=crop"
  }
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow pt-32">
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 text-center mb-24">
            <h1 className="text-6xl md:text-[8rem] font-black leading-none tracking-tighter mb-10 italic bg-clip-text text-transparent bg-gradient-to-br from-blue-400 via-indigo-500 to-white/40">
              Our Gallery.
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium italic">
              A visual journey through our professional delivery centers and successful project lifecycles.
            </p>
          </div>

          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <GalleryCard key={index} {...item} index={index} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function GalleryCard({ title, category, image, index }) {
  return (
    <div 
      className="group relative h-[500px] rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-700" 
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 z-10 group-hover:opacity-0 transition-opacity duration-700"></div>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-10 z-20 transform group-hover:translate-y-4 transition-transform duration-700">
        <div className="p-1 px-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest inline-block mb-4 shadow-2xl">
          {category}
        </div>
        <h3 className="text-3xl font-black text-white italic tracking-tighter leading-none mb-4 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-white/40 text-xs font-black uppercase tracking-widest group-hover:text-white transition-colors">
           Launch Project <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </div>
  );
}

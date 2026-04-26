'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, Users, Zap, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('/api/public/config')
      .then(res => res.json())
      .then(data => {
        if (data?.about) setContent(data.about);
      });
  }, []);

  // FALLBACKS (Pure Premium Content)
  const about = content || {
    title: "Driving Innovation Across Industries",
    subtitle: "About AdSky Solution",
    description: "AdSky Solution is India's leading strategic consultancy and operative node, dedicated to empowering the future workforce through AI-first solutions and expert technical advisory.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
             <p className="text-blue-500 font-black uppercase tracking-widest text-sm mb-4">{about.subtitle}</p>
             <h1 className="text-5xl md:text-7xl font-black italic mb-8 leading-tight">{about.title}</h1>
             <p className="text-xl text-white/60 leading-relaxed italic">{about.description}</p>
          </motion.div>
          
          <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
             <Image src={about.image} alt="About AdSky" fill className="object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}

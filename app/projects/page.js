'use client';

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  ArrowUpRight,
  Landmark,
  Building2,
  Filter,
  Users,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const projects = [
  {
    id: 1,
    title: "National Skill Mission",
    client: "Ministry of Education",
    category: "Government",
    status: "Ongoing",
    description: "Implementing large-scale vocational training programs across rural districts.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070",
    color: "orange"
  },
  {
    id: 2,
    title: "Corporate Excellence Program",
    client: "Tech Solutions Inc.",
    category: "Private",
    status: "Completed",
    description: "Customized management training for mid-level executives and team leads.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070",
    color: "blue"
  },
  {
    id: 3,
    title: "MSME Digitization Drive",
    client: "UP State Govt.",
    category: "Government",
    status: "Ongoing",
    description: "Helping micro-enterprises adopt digital tools for accounting and sales.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070",
    color: "orange"
  },
  {
    id: 4,
    title: "Retail Manpower Supply",
    client: "V-Mart Retail",
    category: "Private",
    status: "Ongoing",
    description: "Sourcing and managing 500+ ground staff for upcoming retail outlets.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
    color: "blue"
  }
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'All' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white overflow-hidden relative">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-[1000px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none"></div>
      
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* --- HERO SECTION --- */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-black mb-8 tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-white/40 leading-[0.85] drop-shadow-2xl"
            >
              Our Portfolio.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-medium italic mb-16"
            >
              Showcasing our impact across government initiatives and private sector innovations.
            </motion.p>

            {/* Controls Filter & Search Bar */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="flex flex-col md:flex-row gap-8 items-center justify-between max-w-6xl mx-auto"
            >
              <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl w-full md:w-auto shadow-2xl">
                {['All', 'Government', 'Private'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-sm font-black italic uppercase transition-all duration-300 ${filter === cat ? 'bg-white text-black shadow-xl scale-105' : 'text-white/40 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-96 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Search projects or clients..." 
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-blue-500 outline-none transition-all italic font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- PROJECTS GRID --- */}
        <section className="px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <AnimatePresence mode='popLayout'>
                {filteredProjects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
              </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40 rounded-[4rem] bg-white/[0.02] border border-white/5"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                   <LayoutGrid size={32} className="text-white/20" />
                </div>
                <p className="text-slate-500 italic font-medium">No projects found matching your criteria.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ProjectCard({ project, index }) {
  const isGov = project.category === 'Government';
  const Icon = isGov ? Landmark : Building2;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-[600px] rounded-[3.5rem] overflow-hidden border border-white/10 bg-[#020617] shadow-2xl flex flex-col"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-12 mt-auto h-full flex flex-col">
        <div className="flex justify-between items-start mb-auto">
           <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border flex items-center gap-2 ${isGov ? 'bg-orange-500/20 text-orange-400 border-orange-500/20' : 'bg-blue-500/20 text-blue-400 border-blue-500/20'}`}>
              <Icon size={14} /> {project.category}
           </div>
           
           <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 cursor-pointer">
              <ArrowUpRight size={24} />
           </div>
        </div>

        <div className="space-y-4 mt-8">
          <p className="text-blue-400 text-xs font-black uppercase tracking-[0.3em] italic">
            {project.client}
          </p>
          <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-tight">
            {project.title}
          </h3>
          <p className="text-slate-300 font-medium italic text-lg leading-relaxed max-w-lg">
            {project.description}
          </p>
          
          <div className="flex items-center gap-4 pt-6">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/50 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                <span className={`w-2 h-2 rounded-full animate-pulse ${project.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                {project.status}
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 italic">
                Reference: #{project.id}0921
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

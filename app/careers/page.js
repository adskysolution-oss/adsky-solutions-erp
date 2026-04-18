'use client';

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  Zap,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const jobs = [
  {
    id: 1,
    title: "Senior Business Consultant",
    location: "Noida, UP",
    type: "Full Time",
    salary: "₹12L - ₹18L PA",
    posted: "2 days ago",
    description: "Lead strategic consulting projects for MSME clients and manage institutional partnerships.",
    tags: ["Management", "MSME", "Consulting"],
    category: "Consulting"
  },
  {
    id: 2,
    title: "Project Coordinator (Skill Dev)",
    location: "Remote / Noida",
    type: "Full Time",
    salary: "₹6L - ₹9L PA",
    posted: "1 week ago",
    description: "Coordinate vocational training batches and ensure compliance with government mission guidelines.",
    tags: ["Project Management", "Govt. Liaison"],
    category: "Management"
  },
  {
    id: 3,
    title: "Manpower Resource Manager",
    location: "Gurugram, HR",
    type: "Contract",
    salary: "₹8L - ₹12L PA",
    posted: "3 days ago",
    description: "Oversee recruitment and payroll for large-scale private sector manpower requirements.",
    tags: ["HR", "Recruitment", "Operations"],
    category: "Operations"
  }
];

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Navbar />

      <main className="flex-grow pt-32">
        {/* --- HERO SECTION --- */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black mb-8 tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-white/40 leading-[0.85] drop-shadow-2xl">
                Join Our <br /> Mission.
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium italic mb-12"
            >
              Shape the future of business and talent in India. Explore opportunities to grow with AD Sky Solution.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="max-w-xl mx-auto group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 h-16 shadow-2xl">
                <div className="flex-grow flex items-center px-4 gap-3 text-white/50 focus-within:text-white transition-colors">
                  <Search size={22} />
                  <input 
                    type="text" 
                    placeholder="Search job titles or skills..." 
                    className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/20 font-medium italic"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="h-full px-8 bg-white text-black font-black italic rounded-xl hover:bg-blue-400 hover:text-white transition-all transform active:scale-95 shadow-lg flex items-center gap-2">
                  FIND <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- JOBS LISTING SECTION --- */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Job Feed */}
              <div className="lg:col-span-2 space-y-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-black italic tracking-tight">Latest Openings</h2>
                  <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 italic">
                    {filteredJobs.length} Positions Available
                  </span>
                </div>

                <div className="space-y-6">
                  <AnimatePresence mode='popLayout'>
                    {filteredJobs.map((job, idx) => (
                      <JobCard key={job.id} job={job} index={idx} />
                    ))}
                    {filteredJobs.length === 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-white/[0.02] rounded-[3rem] border border-white/5"
                      >
                        <p className="text-slate-400 italic">No openings found matching your search. Try different keywords.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Sidebar / Why Us */}
              <div className="space-y-10">
                <div className="sticky top-40 space-y-10">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="p-10 rounded-[3.5rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-2xl shadow-3xl overflow-hidden relative"
                  >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-[60px]"></div>
                    <h3 className="text-3xl font-black italic mb-8 tracking-tight">Why AD Sky?</h3>
                    <ul className="space-y-6">
                      <WhyStep icon={Zap} title="Dynamic Growth" desc="Turbocharge your career trajectory." />
                      <WhyStep icon={Award} title="Govt. Impact" desc="Work on nation-scale projects." />
                      <WhyStep icon={Users} title="Top 1% Talent" desc="Collaborate with industry leaders." />
                    </ul>

                    <div className="mt-12 pt-10 border-t border-white/5">
                      <div className="relative p-6 rounded-2xl bg-white/5 border border-white/5">
                        <Sparkles className="absolute -top-3 -right-3 text-blue-400 animate-pulse" size={24} />
                        <p className="text-slate-400 text-sm italic font-medium leading-relaxed">
                          "Joining AD Sky was the best career move. The scale of impact here is truly unmatched."
                        </p>
                        <p className="mt-4 font-black italic text-xs text-white/60 uppercase tracking-widest">— Sneha R., Senior Lead</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function JobCard({ job, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.06] transition-all duration-700 shadow-2xl overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-3">
             <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest border border-blue-500/20 italic">
               {job.category}
             </span>
             <span className="text-[10px] text-white/40 font-bold italic flex items-center gap-1">
               <Clock size={12} /> {job.posted}
             </span>
          </div>
          <h3 className="text-3xl font-black italic tracking-tighter group-hover:text-blue-400 transition-colors">
            {job.title}
          </h3>
          <p className="text-slate-400 font-medium italic leading-relaxed text-sm">
            {job.description}
          </p>
          
          <div className="flex flex-wrap gap-6 pt-4">
            <JobMeta icon={MapPin} text={job.location} />
            <JobMeta icon={Briefcase} text={job.type} />
            <JobMeta icon={DollarSign} text={job.salary} />
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {job.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold uppercase tracking-wider text-white/60 italic">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button className="px-10 py-6 rounded-2xl bg-white text-black font-black transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 active:scale-95 shadow-2xl flex items-center gap-3 text-sm italic uppercase tracking-widest shrink-0">
          APPLY <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}

function JobMeta({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2 text-white/50 text-xs font-bold italic">
      <Icon size={14} className="text-blue-400" />
      <span>{text}</span>
    </div>
  );
}

function WhyStep({ icon: Icon, title, desc }) {
  return (
    <motion.li 
      whileHover={{ x: 10 }}
      className="flex items-start gap-5 group cursor-default"
    >
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg shrink-0">
        <Icon size={24} />
      </div>
      <div>
        <h5 className="font-black italic text-sm text-white mb-1">{title}</h5>
        <p className="text-white/40 text-[11px] font-medium leading-tight italic">{desc}</p>
      </div>
    </motion.li>
  );
}

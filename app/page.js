'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  CheckCircle, 
  Users, 
  Globe, 
  Zap, 
  Briefcase, 
  Search,
  MessageSquare,
  ShieldCheck,
  Rocket,
  Sparkles,
  ClipboardCheck,
  TrendingUp,
  Award
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('white');

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-[90vh] lg:h-[85vh] flex flex-col pt-32 pb-0 px-6 overflow-hidden bg-[#020617] border-b border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 w-full flex-grow flex flex-col items-center">
            
            <div className="flex items-center justify-center gap-10 sm:gap-16 mb-4 sm:mb-12 relative z-40">
              <div className="flex flex-col items-center gap-2">
                <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest">FOR JOBS</span>
                <Link href="/careers" className="px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-white text-black font-bold hover:shadow-2xl hover:shadow-white/20 transition-all text-sm sm:text-lg min-w-[160px] sm:min-w-[200px] text-center">
                  Explore Jobs
                </Link>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-widest">FOR BUSINESS</span>
                <Link href="/services" className="px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-transparent border border-white/30 text-white font-bold hover:bg-white/10 transition-all text-sm sm:text-lg min-w-[160px] sm:min-w-[200px] text-center">
                  Explore Solutions
                </Link>
              </div>
            </div>

            {/* Manpower Expert Section Visual - Centered Orbiting Layout */}
            <div className="relative w-full flex-grow flex items-end justify-center mt-auto min-h-[500px] lg:min-h-[600px] overflow-visible">
              
              {/* Awign Style Dotted SVG Paths connecting center to the blobs */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 hidden lg:block" style={{ zIndex: 10 }}>
                {/* Left side connections */}
                <path d="M 50% 100% Q 30% 20% 20% 30%" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="5 8" strokeLinecap="round" />
                <path d="M 50% 100% Q 30% 60% 15% 55%" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="5 8" strokeLinecap="round" />
                <path d="M 50% 100% Q 35% 85% 25% 80%" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="5 8" strokeLinecap="round" />
                
                {/* Right side connections */}
                <path d="M 50% 100% Q 70% 20% 80% 30%" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="5 8" strokeLinecap="round" />
                <path d="M 50% 100% Q 70% 60% 85% 55%" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="5 8" strokeLinecap="round" />
                <path d="M 50% 100% Q 65% 85% 75% 80%" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="5 8" strokeLinecap="round" />
              </svg>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] lg:w-[650px] h-[450px] sm:h-[600px] lg:h-[750px] z-20 pointer-events-none"
              >
                  <img 
                    src="/men.png" 
                    alt="Manpower Expert" 
                    className="w-full h-full object-contain object-bottom relative z-10 brightness-110 contrast-110" 
                  />
              </motion.div>

              {/* Exact Awign Style Floating Blobs */}
              <FloatingContext top="10%" left="12%" label="Auditors" color="emerald" blobShape="45% 55% 42% 58% / 54% 43% 57% 46%" image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576" />
              <FloatingContext top="45%" left="2%" label="Data Annotators" color="purple" blobShape="60% 40% 68% 32% / 54% 63% 37% 46%" image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670" />
              <FloatingContext bottom="8%" left="15%" label="Mentors" color="blue" blobShape="52% 48% 33% 67% / 38% 39% 61% 62%" image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574" />
              
              <FloatingContext top="10%" right="12%" label="Promoters" color="orange" blobShape="65% 35% 30% 70% / 55% 44% 56% 45%" image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576" />
              <FloatingContext top="45%" right="2%" label="Telecallers" color="cyan" blobShape="37% 63% 51% 49% / 46% 62% 38% 54%" image="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670" />
              <FloatingContext bottom="8%" right="15%" label="Invigilators" color="rose" blobShape="43% 57% 40% 60% / 65% 51% 49% 35%" image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2576" />
            </div>

          </div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="py-24 px-6 border-y border-white/5 relative bg-[#020617]/50 backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            <StatCard icon={CheckCircle} value="10k+" label="Tasks Completed" color="blue" />
            <StatCard icon={Users} value="500+" label="Strong Workforce" color="orange" />
            <StatCard icon={Globe} value="50+" label="Cities Covered" color="purple" />
            <StatCard icon={Zap} value="1000+" label="Pin Codes" color="emerald" />
          </div>
        </section>

        {/* --- OFFERINGS SECTION --- */}
        <section className="py-32 px-6 bg-[#020617]/50 relative overflow-hidden backdrop-blur-3xl border-b border-white/5">
          <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
            <p className="text-blue-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Our Offerings</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white italic">Cognitive, Desk-based, Tech-centric</h2>
            <div className="flex justify-center mb-16">
              <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                {['white', 'grey', 'blue'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 sm:px-8 py-2 rounded-full font-bold transition-all duration-300 text-xs sm:text-sm md:text-base ${activeTab === tab ? 'bg-white text-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'text-white/60 hover:text-white'}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Collar
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
               <ServiceCard 
                 icon={Briefcase} 
                 title="Egocentric Video Data for Robotics" 
                 desc="High-Quality human POV datasets for imitation learning & embodied AI." 
                 points={["4K first-person video capture at massive scale", "1000+ hours of egocentric video per day", "98%+ robotics-grade annotation accuracy"]} 
                 color="blue"
               />
               <ServiceCard 
                 icon={Zap} 
                 title="Data Annotation" 
                 desc="AI/ML-ready data annotation, tech-scaled for accuracy." 
                 points={["10Mn+ data points labeled monthly", "99%+ accuracy via quality checks", "Supports images, text, speech & videos", "Industry-specific annotation solutions"]} 
                 color="orange"
               />
               <ServiceCard 
                 icon={Users} 
                 title="AI-First Tech Capability Centers" 
                 desc="Build AI-First On-site Teams." 
                 points={["On-site, time-zone aligned developers", "AI-tracked productivity & oversight", "Secure offices, enterprise-ready compliance", "Go live in ~2 weeks with 5-10 engineers"]} 
                 color="purple"
               />
          </div>
        </section>

        {/* --- STRATEGY SECTION --- */}
        <section className="py-32 px-6 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-extrabold uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>Strategic Technical Advisory
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter italic">
                Fuel Your <br/><span className="text-blue-600">Future</span> <br/>With Expert Strategy.
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                Website & App Strategy Consultation, CRM/HRMS Setup, and Business Process Automation guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link href="/pricing" className="group flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl bg-[#020617] text-white font-bold hover:shadow-2xl hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1 text-sm sm:text-base italic">
                  Book 1 Hour – ₹999 <ArrowRight className="group-hover:translate-x-1" />
                </Link>
                <Link href="/services" className="px-6 sm:px-10 py-4 sm:py-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold hover:bg-slate-100 transition-all text-sm sm:text-base text-center italic">
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                <div className="absolute inset-x-0 bottom-0 top-1/4 bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"></div>
                <Image 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672" 
                  alt="Strategy" 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                  <p className="text-3xl font-black text-white italic mb-1">99% Success Rate</p>
                  <p className="text-white/70 text-sm font-bold uppercase tracking-widest leading-none">Digital Transformation Excellence</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- JOB CATEGORIES SECTION --- */}
        <section className="py-24 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center text-slate-900 mb-12 sm:mb-20 italic">Job Categories</h2>
            <div className="flex flex-col lg:flex-row items-center lg:items-end gap-12">
              <div className="hidden lg:block lg:w-[450px] shrink-0">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative h-[650px] w-full"
                >
                  <Image src="/pointing-person.png" alt="Join Us" fill className="object-contain object-bottom" />
                </motion.div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <JobCategory title="Delivery Partner Jobs" tag="Field Work" count="7 Jobs" image="https://images.unsplash.com/photo-1581092160562-40aa08e78837" />
                <JobCategory title="Exam Invigilator Jobs" tag="Field Work" count="2 Jobs" image="https://images.unsplash.com/photo-1434039319359-ef800d9b8fd2" />
                <JobCategory title="Digital Gigs Jobs" tag="Work From Home" count="1 Job" image="https://images.unsplash.com/photo-1499750310107-5fef28a66643" />
                <JobCategory title="Audit Jobs" tag="Field Work" count="Jobs coming soon" image="https://images.unsplash.com/photo-1454165833767-027ffea9e77b" />
                <JobCategory title="Telecalling Jobs" tag="Work From Home" count="Jobs coming soon" image="https://images.unsplash.com/photo-1549923155-4422ead50223" />
                <JobCategory title="Recruitment Jobs" tag="Work From Home" count="Jobs coming soon" image="https://images.unsplash.com/photo-1521737711867-e3b97375f902" />
              </div>
            </div>
          </div>
        </section>

        {/* --- WHY WORK WITH US --- */}
        <section className="py-16 md:py-32 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.3em] mb-4 italic">Partner with Excellence</p>
              <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-12 tracking-tighter italic">Why work with us?</h2>
            </div>

            <div className="relative rounded-[4rem] bg-[#020617] overflow-hidden flex flex-col lg:flex-row items-center p-10 lg:p-20 gap-10 lg:gap-0 shadow-[0_40px_100px_-20px_rgba(2,6,23,0.4)]">
              <div className="absolute top-0 left-0 w-full h-full grayscale opacity-20 pointer-events-none">
                <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670" alt="Grow With Us" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent"></div>
              </div>

              <div className="w-full lg:w-1/2 relative z-10 flex flex-col items-center lg:items-start lg:pr-12">
                {/* Refined Logo Visual */}
                <div className="relative mb-14 flex items-center justify-center lg:justify-start w-full">
                  <div className="absolute w-[280px] h-[280px] bg-blue-600/20 rounded-full blur-[80px]"></div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="relative px-6 py-4 md:px-10 md:py-6 rounded-[2rem] md:rounded-full bg-white flex items-center gap-4 md:gap-6 shadow-2xl border-4 border-white/10 w-full sm:w-auto overflow-hidden sm:overflow-visible"
                  >
                    <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-2xl overflow-hidden shadow-lg">
                      <Image src="/logo(2).jpeg" fill alt="Logo" className="object-cover" />
                    </div>
                    <div className="flex flex-col leading-tight truncate">
                      <span className="text-xl md:text-2xl font-black text-slate-900 italic tracking-tighter truncate">AD SKY</span>
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] truncate">Solution</span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Feature Grid */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-[420px]">
                  <WhyCard icon={Zap} title="Fast Tracking" desc="Growth Roadmap" color="blue" />
                  <WhyCard icon={Award} title="Certified" desc="Official Badge" color="green" />
                  <WhyCard icon={Users} title="Community" desc="Global Network" color="purple" />
                  <WhyCard icon={Globe} title="Remote" desc="Work Anywhere" color="cyan" />
                </div>
              </div>

              <div className="w-full lg:w-1/2 relative z-10 text-center lg:text-left lg:pl-12">
                <h3 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tighter italic">
                  Grow <br/><span className="text-blue-400">With Us</span>
                </h3>
                <p className="text-white/60 text-xl mb-12 leading-relaxed font-medium max-w-lg italic">
                  Take your skills to the next level with AdSky Solution's learning resources and top-tier job opportunities.
                </p>
                <Link href="/register" className="inline-flex items-center gap-3 px-10 py-6 rounded-2xl bg-white text-black font-black hover:bg-blue-600 hover:text-white transition-all text-lg italic uppercase tracking-widest">
                  Find Work <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- HOW IT WORKS --- */}
        <section className="py-24 px-6 bg-black relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 italic">How It Works</h2>
              <p className="text-white/60 max-w-2xl mx-auto italic">We ensure reliable execution of your core business operations. Here's how we do it:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <WorkStep step="1" title="Project Configuration" desc="We'll configure your task on our platform within 24 hours and share your requirements with our trained workforce." />
              <WorkStep step="2" title="Task Allocation" desc="Our automated system allocates tasks to the workforce in 10 milliseconds and ensures quality through algorithms." />
              <WorkStep step="3" title="Payment Completion" desc="Our native app offers payment capability, 99.5% of the workforce gets paid every 7 days with ZERO complaints." />
            </div>
          </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16 italic">What People Say</h2>
            <div className="relative max-w-4xl mx-auto rounded-[3rem] bg-white p-10 md:p-16 shadow-xl flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
              <div className="w-48 h-48 rounded-full overflow-hidden shrink-0 border-8 border-slate-50">
                <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574" width={200} height={200} alt="User" className="object-cover" />
              </div>
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-4 italic">Gig Partner</span>
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed italic mb-8">
                  "I am proud of the person I am today! From my first internship in the Customer Acquisition role to virtually leading a 90-member team, I have recorded 10,000 tasks with AdSky Solution to date. The best part of being a partner is that I get to work without any barriers."
                </p>
                <h4 className="text-2xl font-bold text-slate-900 italic">Ashwin Malani</h4>
              </div>
            </div>
          </div>
        </section>

        {/* --- BLOGS SECTION --- */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16 italic">Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BlogCard 
                title="How to Introduce Yourself Professionally in a Job Interview?" 
                date="JAN 15, 2025" 
                image="https://images.unsplash.com/photo-1521791136064-7986c2923216" 
              />
              <BlogCard 
                title="Important Documents Required For Joining A Company" 
                date="DEC 26, 2024" 
                image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85" 
              />
              <BlogCard 
                title="How To Answer 'Why Should We Hire You?'" 
                date="NOV 26, 2024" 
                image="https://images.unsplash.com/photo-1549923746-c502d488b3ea" 
              />
            </div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="py-32 px-6 bg-[#020617] relative">
          <div className="max-w-5xl mx-auto p-16 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl relative text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-8 italic">Ready to transform your vision into reality?</h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto italic">
              Join hundreds of successful partners who have trusted AD Sky Solution with their strategic management and growth.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/register" className="px-10 py-5 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-2xl hover:-translate-y-1 transition-all italic uppercase tracking-widest">
                Partner With Us
              </Link>
              <Link href="/careers" className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all italic uppercase tracking-widest">
                View Career Portal
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Sub-components
function FloatingContext({ top, left, right, bottom, label, color, image, blobShape }) {
  const bgColors = {
    emerald: 'bg-[#4ADE80]',
    purple: 'bg-[#A855F7]',
    blue: 'bg-[#3B82F6]',
    orange: 'bg-[#F59E0B]',
    cyan: 'bg-[#06B6D4]',
    rose: 'bg-[#F43F5E]'
  };

  return (
    <motion.div 
      style={{ top, left, right, bottom }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute text-center group z-30"
    >
      <div 
        className={`relative w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 ${bgColors[color]} overflow-hidden mx-auto border-0 shadow-lg`}
        style={{ borderRadius: blobShape || '50%' }}
      >
        <Image src={image} alt={label} fill className="object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-luminosity opacity-90" />
      </div>
      <p className="mt-4 text-white text-xs sm:text-sm lg:text-lg font-medium">{label}</p>
    </motion.div>
  );
}

function StatCard({ icon: Icon, value, label, color }) {
  const shadowColors = {
    blue: 'shadow-blue-500/20',
    orange: 'shadow-orange-500/20',
    purple: 'shadow-purple-500/20',
    emerald: 'shadow-emerald-500/20'
  };
  const gradientColors = {
    blue: 'from-blue-500 to-cyan-400',
    orange: 'from-orange-500 to-amber-400',
    purple: 'from-purple-500 to-pink-400',
    emerald: 'from-emerald-500 to-teal-400'
  };

  return (
    <div className="group text-center">
      <div className="relative mb-6 inline-block">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[color]} blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
        <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradientColors[color]} text-white transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-2xl`}>
          <Icon size={28} className="relative z-10" />
        </div>
      </div>
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 italic">{value}</h3>
      <p className="text-slate-400 text-[10px] md:text-sm uppercase tracking-[0.2em] font-medium opacity-70 italic">{label}</p>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc, points, color }) {
  const gradient = color === 'blue' ? 'from-blue-500 to-cyan-400' : color === 'orange' ? 'from-orange-500 to-amber-400' : 'from-purple-500 to-pink-400';
  
  return (
    <div className="group relative w-full flex flex-col p-8 sm:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-white border border-slate-100 hover:border-blue-500/30 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-8 shadow-lg transform group-hover:scale-110 transition-transform`}>
          <Icon size={28} />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-slate-900 italic">{title}</h3>
        <p className="text-slate-600 leading-relaxed mb-6 font-medium italic">{desc}</p>
        <ul className="space-y-4 mb-12 grow">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-500 font-medium italic">
              <span className="text-blue-600 mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0"></span>{p}
            </li>
          ))}
        </ul>
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-blue-600 transition-all shadow-lg italic uppercase tracking-widest">
          Know More <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function JobCategory({ title, tag, count, image }) {
  return (
    <div className="group relative flex flex-col p-8 rounded-[2.5rem] text-white border border-white/5 hover:border-blue-500/30 transition-all duration-500 min-h-[220px] overflow-hidden">
      <Image src={image} alt={title} fill className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617]/90 to-blue-900/50"></div>
      <h3 className="relative z-10 text-xl md:text-2xl font-bold mb-auto italic">{title}</h3>
      <div className="relative z-10 flex items-center gap-3 mt-6">
        <span className="px-4 py-1.5 rounded-full bg-[#BEF264] text-slate-900 text-[10px] font-bold uppercase italic">{tag}</span>
        <span className="px-3 py-1.5 rounded-full bg-white text-slate-900 text-[10px] font-bold italic">{count}</span>
      </div>
    </div>
  );
}

function WhyCard({ icon: Icon, title, desc, color }) {
  const borderColors = {
    blue: 'border-blue-500/20',
    green: 'border-green-500/20',
    purple: 'border-purple-500/20',
    cyan: 'border-cyan-500/20'
  };
  const textColors = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400'
  };

  return (
    <div className={`group flex flex-col gap-2 p-5 rounded-2xl border ${borderColors[color]} bg-white/5 backdrop-blur-sm hover:scale-105 transition-all duration-300`}>
      <Icon className={`${textColors[color]} mb-1`} size={22} />
      <span className="font-bold text-white text-sm italic">{title}</span>
      <span className="text-white/40 text-[10px] font-medium leading-tight italic">{desc}</span>
    </div>
  );
}

function WorkStep({ step, title, desc }) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center group">
       <div className="w-20 h-20 rounded-full bg-white text-slate-900 flex items-center justify-center text-2xl font-black mb-8 shadow-2xl border-4 border-slate-900 italic">{step}</div>
       <div className="relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all flex flex-col h-full">
          <h3 className="text-xl font-bold text-white mb-4 italic">{title}</h3>
          <p className="text-white/60 leading-relaxed text-sm font-medium italic">{desc}</p>
       </div>
    </div>
  );
}

function BlogCard({ title, date, image }) {
  return (
    <div className="group flex flex-col bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all">
      <div className="aspect-[16/10] relative">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-blue-600/10"></div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex-grow group-hover:text-blue-600 transition-colors italic">{title}</h3>
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest italic">{date}</span>
          <button className="flex items-center gap-2 text-blue-600 font-bold text-sm italic">Explore <ArrowRight size={14} /></button>
        </div>
      </div>
    </div>
  );
}

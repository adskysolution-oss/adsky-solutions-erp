'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Briefcase, Building, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const loginRoles = [
    { title: 'Candidate Portal', desc: 'Find latest job opportunities', icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'hover:border-blue-500/50', path: '/candidate/login' },
    { title: 'Employer Portal', desc: 'Manage job postings & candidates', icon: Building, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'hover:border-orange-500/50', path: '/employer/login' },
    { title: 'Admin Console', desc: 'Manage system settings & content', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'hover:border-emerald-500/50', path: '/admin' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="w-full max-w-4xl z-10 relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter italic">Welcome to <span className="text-blue-500">AdSky</span></h1>
            <p className="text-slate-400 text-lg">Select your portal to continue securely.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loginRoles.map((role, i) => (
              <Link href={role.path} key={i}>
                <div className={`p-8 rounded-[2rem] bg-white/5 border border-white/10 ${role.border} transition-all group flex flex-col items-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-${role.color.split('-')[1]}/10 cursor-pointer h-full`}>
                  <div className={`w-20 h-20 rounded-2xl ${role.bg} ${role.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <role.icon size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center text-white group-hover:text-white transition-colors">{role.title}</h3>
                  <p className="text-slate-400 text-sm text-center mb-6 flex-grow">{role.desc}</p>
                  
                  <div className="flex items-center text-sm font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                    Login Now <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-slate-500 font-medium text-sm">
              Don't have an account? <Link href="/register" className="text-blue-400 hover:text-blue-300 ml-1 hover:underline">Register Here</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';
import React from 'react';
import { MapPin, Phone, Mail, Send, Target, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white overflow-hidden">
      <Navbar />
      
      <main className="flex-grow pt-32">
        <section className="py-24 px-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 text-center mb-24">
            <h1 className="text-6xl md:text-[8rem] font-black leading-none tracking-tighter mb-10 italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-white/40">
               Get In Touch.
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium italic">
               Connect with our lead consultants for high-fidelity enterprise architecture and business process roadmaps.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* --- CONTACT INFO --- */}
            <div className="space-y-16 animate-in fade-in slide-in-from-left-12 duration-1000">
              <div className="space-y-10">
                <ContactItem 
                  icon={MapPin} 
                  title="Official Headquarters" 
                  desc="126 Satyam Enclave Sahibabad, Ghaziabad UP 201003" 
                  color="blue"
                />
                <ContactItem 
                  icon={Phone} 
                  title="Enterprise Support" 
                  desc="+91 80621 82243" 
                  color="indigo"
                />
                <ContactItem 
                  icon={Mail} 
                  title="General Inquiries" 
                  desc="support@adskysolution.com" 
                  color="emerald"
                />
              </div>

              <div className="p-12 rounded-[5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <h4 className="text-3xl font-black text-white italic tracking-tighter mb-4 relative z-10">Bespoke Inquiries</h4>
                 <p className="text-lg text-slate-400 leading-relaxed font-medium italic relative z-10">
                    Operating Monday to Friday, 10:00 AM - 6:00 PM IST. For urgent consulting bookings, please specify in the subject line.
                 </p>
              </div>
            </div>

            {/* --- CONTACT FORM --- */}
            <div className="p-12 rounded-[6rem] bg-white text-black shadow-[0_0_150px_rgba(59,130,246,0.1)] relative group animate-in fade-in slide-in-from-right-12 duration-1000">
               <form className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Field label="Full Identity" placeholder="Aditya Bhardwaj" />
                    <Field label="Direct Email" placeholder="aditya@example.com" />
                  </div>
                  <Field label="Project Intent" placeholder="High-Fidelity ERP Integration" />
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Full Brief Description</label>
                     <textarea className="w-full px-8 py-6 rounded-[2.5rem] bg-slate-50 border border-slate-200 text-black font-medium focus:border-blue-500 focus:bg-white outline-none transition-all min-h-[200px]" placeholder="Tell us about your roadmap..."></textarea>
                  </div>
                  <button className="w-full flex items-center justify-center gap-4 py-8 rounded-full bg-black text-white font-black text-xl hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase tracking-[0.3em] italic">
                     Send Proposal <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </button>
               </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ContactItem({ icon: Icon, title, desc, color }) {
  const colors = {
    blue: 'text-blue-500 bg-blue-600/10',
    indigo: 'text-indigo-500 bg-indigo-600/10',
    emerald: 'text-emerald-500 bg-emerald-600/10'
  };

  return (
    <div className="flex items-start gap-10 group">
      <div className={`w-20 h-20 rounded-3xl ${colors[color]} flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-2xl`}>
        <Icon size={32} />
      </div>
      <div>
        <h3 className="text-3xl font-black text-white mb-2 italic tracking-tighter leading-none">{title}</h3>
        <p className="text-xl text-slate-400 leading-relaxed font-medium italic">{desc}</p>
      </div>
    </div>
  );
}

function Field({ label, placeholder }) {
  return (
    <div className="space-y-4 flex flex-col">
       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic mb-1">{label}</label>
       <input className="w-full px-8 py-6 rounded-full bg-slate-50 border border-slate-200 text-black font-medium focus:border-blue-500 focus:bg-white outline-none transition-all" placeholder={placeholder} />
    </div>
  );
}

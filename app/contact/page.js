'use client';
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('/api/admin/cms/config')
      .then(res => res.json())
      .then(data => { if (!data.error) setConfig(data); });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow pt-32">
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h1 className="text-5xl md:text-8xl font-light mb-6 tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-orange-500 leading-tight">
                Get In Touch
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                Have questions? We're here to help you navigate your digital transformation journey.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-12">
                <div className="space-y-8">
                  <ContactItem 
                    icon={MapPin} 
                    title="Our Office" 
                    content={config?.contact?.address || '126 Satyam Enclave Sahibabad, \n Ghaziabad UP 201003'} 
                    color="blue"
                  />
                  <ContactItem 
                    icon={Phone} 
                    title="Call Us" 
                    content={config?.contact?.phone || '+91 80621 82243'} 
                    color="emerald"
                  />
                  <ContactItem 
                    icon={Mail} 
                    title="Email Us" 
                    content={config?.contact?.email || 'support@adskysolution.com'} 
                    color="purple"
                  />
                </div>

                <div className="p-10 rounded-[3rem] bg-gradient-to-br from-blue-600/10 to-transparent border border-white/10 shadow-2xl">
                   <h4 className="text-white font-black text-xl mb-4 italic uppercase tracking-widest leading-none">Enterprise Support</h4>
                   <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                      Operating Monday to Friday, 10:00 AM - 6:00 PM IST. 
                      For urgent consulting bookings, please use the Pricing page.
                   </p>
                </div>
              </div>

              <div className="p-10 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Field label="Full Name" placeholder="John Doe" />
                    <Field label="Email Address" placeholder="john@example.com" />
                  </div>
                  <Field label="Subject" placeholder="How can we help?" />
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Message</label>
                    <textarea className="w-full px-6 py-5 rounded-[1.5rem] bg-white/5 border border-white/10 text-white focus:border-blue-500 transition-all outline-none min-h-[160px] font-medium" placeholder="Tell us about your project..."></textarea>
                  </div>
                  <button className="w-full flex items-center justify-center gap-4 py-6 rounded-[2rem] bg-white text-black font-black text-lg hover:bg-blue-400 hover:scale-[1.02] active:scale-95 transition-all group shadow-2xl uppercase tracking-widest italic">
                    Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ContactItem({ icon: Icon, title, content, color }) {
  const colors = {
    blue: 'bg-blue-600/10 text-blue-400 border-blue-600/20',
    emerald: 'bg-emerald-600/10 text-emerald-400 border-emerald-600/20',
    purple: 'bg-purple-600/10 text-purple-400 border-purple-600/20'
  };
  
  return (
    <div className="flex items-start gap-8 group">
      <div className={`w-16 h-16 rounded-3xl ${colors[color]} flex items-center justify-center shrink-0 border group-hover:scale-110 transition-all duration-500 shadow-2xl`}>
        <Icon size={28} />
      </div>
      <div>
        <h3 className="text-2xl font-black text-white mb-2 italic tracking-tight uppercase leading-none">{title}</h3>
        <p className="text-slate-400 leading-relaxed font-medium whitespace-pre-line text-lg italic">
          {content}
        </p>
      </div>
    </div>
  );
}

function Field({ label, placeholder }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic">{label}</label>
      <input className="w-full px-6 py-5 rounded-[1.5rem] bg-white/5 border border-white/10 text-white focus:border-blue-500 transition-all outline-none font-medium" placeholder={placeholder} />
    </div>
  );
}

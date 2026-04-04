'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const config = {
    siteName: 'AD SKY',
    siteTitle: 'Solution',
    siteDescription: 'Delivering expert IT consulting, software development, and professional staffing solutions for growing businesses.',
    logoRoot: '/logo(2).jpeg',
    contact: {
      address: 'AD Sky Solution, 126 Satyam Enclave Sahibabad, \n Ghaziabad UTTAR PRADESH 201003',
      phone: '+91 80621 82243',
      email: 'support@adskysolution.com'
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-24 pb-12 px-6 bg-[#020617] border-t border-green-400/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link className="flex items-center group gap-3" href="/">
              <div className="relative flex items-center justify-center rounded-xl overflow-hidden shadow-lg border border-white/10 group-hover:scale-110 transition-transform duration-500 w-12 h-12">
                <Image alt={config?.siteName || "AD Sky Solution Logo"} fill className="object-cover" src={config?.logoRoot || "/logo(2).jpeg"} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-medium tracking-tight italic text-xl text-white">{config?.siteName || 'AD SKY'}</span>
                <span className="uppercase font-normal tracking-[0.4em] text-[9px] text-white/60">{config?.siteTitle || 'Solution'}</span>
              </div>
            </Link>
            <p className="mt-6 text-slate-400 max-w-sm leading-relaxed">
              {config?.siteDescription || 'Empowering businesses and individuals through expert consulting, skill development, and strategic management solutions.'}
            </p>
            
            <div className="flex items-center gap-6 mt-8">
              {/* Social Icons from Config */}
              {[
                { Icon: Facebook, link: config?.socialLinks?.facebook },
                { Icon: Instagram, link: config?.socialLinks?.instagram },
                { Icon: Twitter, link: config?.socialLinks?.twitter },
                { Icon: Linkedin, link: config?.socialLinks?.linkedin }
              ].map(({ Icon, link }, idx) => (
                <a 
                  key={idx} 
                  href={link || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`group relative w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-green-400/10 transition-all border border-white/5 hover:border-green-400/30 overflow-hidden shadow-2xl ${!link && 'opacity-30 cursor-not-allowed'}`}
                >
                   <div className="absolute inset-0 bg-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <Icon size={20} className="text-white/70 group-hover:text-green-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-green-400 font-bold mb-6 italic uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Services', 'Contact', 'Gallery'].map((item) => (
                <li key={item}><Link href={`/${item.toLowerCase().replace(' ', '')}`} className="text-slate-400 hover:text-green-400 transition-colors text-sm font-medium">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-green-400 font-bold mb-6 italic uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-4">
              {['IT Project Planning', 'Web & App Strategy', 'Process Automation', 'Architecture Advisory'].map((item) => (
                <li key={item}><Link href="/services" className="text-slate-400 hover:text-green-400 transition-colors text-sm font-medium">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-green-400 font-bold mb-6 italic uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-4">
              {['Pricing', 'Terms & Conditions', 'Privacy Policy', 'Refund Policy'].map((item) => (
                <li key={item}><Link href="/pricing" className="text-slate-400 hover:text-green-400 transition-colors text-sm font-medium">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-white/5 mb-12">
          <div className="flex items-start gap-4 group">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-green-400/10 text-green-400 shrink-0 transition-transform group-hover:scale-110 shadow-[0_0_15px_rgba(74,222,128,0.1)]">
              <MapPin size={24} />
            </div>
            <div>
              <h5 className="font-bold mb-1 text-green-400/90">Our Location</h5>
              <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{config?.contact?.address || 'AD Sky Solution, 126 Satyam Enclave Sahibabad, \n Ghaziabad UTTAR PRADESH 201003'}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 group">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-green-400/10 text-green-400 shrink-0 transition-transform group-hover:scale-110 shadow-[0_0_15px_rgba(74,222,128,0.1)]">
              <Phone size={24} />
            </div>
            <div>
              <h5 className="font-bold mb-1 text-green-400/90">Call Us</h5>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">{config?.contact?.phone || '+91 80621 82243'}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 group">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-green-400/10 text-green-400 shrink-0 transition-transform group-hover:scale-110 shadow-[0_0_15px_rgba(74,222,128,0.1)]">
              <Mail size={24} />
            </div>
            <div>
              <h5 className="font-bold mb-1 text-green-400/90">Email Us</h5>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">{config?.contact?.email || 'support@adskysolution.com'}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
            <p className="text-slate-500 text-sm font-medium">{config?.footer?.copyright || `© ${currentYear} AD Sky Solution. All Rights Reserved.`}</p>
        </div>
      </div>
    </footer>
  );
}

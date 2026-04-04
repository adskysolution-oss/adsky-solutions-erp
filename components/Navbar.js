'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' }
  ];

  const config = {
    siteName: 'AdSky Solution',
    siteTitle: 'The 3-Panel Enterprise ERP',
    logoRoot: '/logo(2).jpeg'
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-6 transition-all duration-500 ${isScrolled ? 'top-2' : 'top-6'}`}>
      <div className="relative w-full max-w-5xl">
        <div className={`relative p-[1px] rounded-[3rem] transition-all duration-500 ${isMobileMenuOpen ? '' : 'overflow-hidden'}`}>
          <div className="absolute inset-[-400%] opacity-100" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, #3B82F6 120deg, #6366F1 240deg, #F97316 360deg)' }}></div>
          <nav className="relative w-full h-full z-10 rounded-[3rem] bg-[#0F172A]/80 backdrop-blur-xl py-3 px-10">
            <div className="flex items-center justify-between">
              <Link className="flex items-center group gap-4 mr-8" href="/">
                <div className="relative flex items-center justify-center rounded-xl overflow-hidden shadow-lg border border-white/10 group-hover:scale-110 transition-transform duration-500 w-12 h-12">
                  <Image alt={config?.siteName || "AD Sky Solution Logo"} fill className="object-cover" src={config?.logoRoot || "/logo(2).jpeg"} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-medium tracking-tight italic text-xl text-white">{config?.siteName || 'AD SKY'}</span>
                  <span className="uppercase font-normal tracking-[0.4em] text-[9px] text-white/60">{config?.siteTitle || 'Solution'}</span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-10">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="relative text-xs font-bold uppercase tracking-[0.2em] transition-colors py-2 text-foreground/70 hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link href="/login" className="px-6 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all">
                  Portal Login
                </Link>
              </div>

              {/* Mobile Toggle */}
              <button 
                className="md:hidden text-foreground p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Nav Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 mt-4 p-6 rounded-[2rem] bg-[#0F172A] border border-white/10 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-white text-sm font-bold uppercase tracking-wider py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link href="/login" className="px-6 py-4 rounded-2xl bg-blue-600 text-white text-center font-black uppercase tracking-widest">
                  Portal Login
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionRenderer from "@/components/SectionRenderer";
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [dynamicPage, setDynamicPage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        console.log("Fetching home data...");
        const res = await fetch('/api/admin/cms/pages', { cache: 'no-store' });
        const pages = await res.json();
        
        console.log("Pages found:", pages.length);
        const home = pages.find(p => p.slug === 'home' || p.slug === '/');
        
        if (home) {
          console.log("Home Page ID:", home._id);
          const detailRes = await fetch(`/api/admin/cms/pages/${home._id}`, { cache: 'no-store' });
          const detail = await detailRes.json();
          if (detail && detail.sections) {
            console.log("Sections found:", detail.sections.length);
            setDynamicPage(detail);
          } else {
            setError("No sections found in database for Home Page.");
          }
        } else {
          setError("Home Page record not found in database.");
        }
      } catch (err) {
        console.error("Home Fetch Error:", err);
        setError("Failed to connect to Database API.");
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
        <p className="font-black italic tracking-widest animate-pulse">LOADING AD SKY DYNAMIC ENGINE...</p>
      </div>
    );
  }

  if (error || !dynamicPage) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white p-10 text-center">
        <div className="p-10 rounded-[3rem] border border-red-500/20 bg-red-500/5">
          <h2 className="text-3xl font-black text-red-500 mb-4 italic">SYNC ERROR</h2>
          <p className="text-slate-400 italic mb-8">{error || "System could not initialize dynamic content."}</p>
          <button onClick={() => window.location.reload()} className="px-10 py-4 bg-white text-black font-black rounded-2xl italic uppercase text-xs">Retry Connection</button>
        </div>
      </div>
    );
  }

  const activeSections = dynamicPage.sections.filter(s => s.isActive);

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      <main className="flex-grow">
        {activeSections.map((section, idx) => (
          <SectionRenderer key={section._id || idx} section={section} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

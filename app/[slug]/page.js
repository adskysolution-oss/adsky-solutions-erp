'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionRenderer from '@/components/SectionRenderer';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`/api/admin/cms/pages?slug=${slug}`);
        const data = await res.json();
        if (data && !data.error) {
          setPage(data);
        }
      } catch (err) {
        console.error('Page fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPage();
  }, [slug]);

  if (loading) return <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="animate-spin" size={48} color="#3b82f6" /></div>;

  return (
    <main className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      <main className="flex-grow">
        {page ? (
          <SectionRenderer sections={page.sections} />
        ) : (
          <div className="py-40 text-center">
            <h1 className="text-4xl font-black mb-4">404 - Node Not Found</h1>
            <p className="text-slate-400">The requested dynamic page does not exist in the CMS engine.</p>
          </div>
        )}
      </main>
      <Footer />
    </main>
  );
}

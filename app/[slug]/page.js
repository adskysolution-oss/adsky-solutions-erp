import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import DynamicRenderer from '@/components/cms/DynamicRenderer';

/**
 * AdSky 25X Dynamic Delivery Node
 * Serves all CMS-driven pages based on mission slug.
 */

export async function generateMetadata({ params }) {
  const page = await prisma.page.findUnique({
    where: { slug: params.slug },
  });

  if (!page) return { title: 'Not Found | AdSky' };

  const seo = page.seoMeta || {};
  return {
    title: seo.title || `${page.title} | AdSky 25X`,
    description: seo.description || 'Enterprise-grade SaaS ecosystem for high-speed regional operations.',
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [{ url: seo.ogImage }] : [],
    },
  };
}

export default async function CMSDynamicPage({ params }) {
  // Fetch page orchestration data from PostgreSQL
  const page = await prisma.page.findUnique({
    where: { slug: params.slug },
  });

  // Security: Only serve published pages to the public
  if (!page || !page.published) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 🚀 Dynamic Delivery Engine */}
      <DynamicRenderer sections={page.layoutJson} />
    </div>
  );
}

// Optimization: Static Params Generation for build-time caching
export async function generateStaticParams() {
  const pages = await prisma.page.findMany({
    select: { slug: true }
  });

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

import React from 'react';
import { notFound } from 'next/navigation';
import connectToDatabase from '@/utils/db';
import Page from '@/models/Page';
import DynamicRenderer from '@/components/cms/DynamicRenderer';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  try {
    await connectToDatabase();
    const page = await Page.findOne({ slug: params.slug });
    if (!page) return { title: 'Not Found | AdSky' };

    const seo = page.seo || {};
    return {
      title: seo.title || `${page.title} | AdSky 25X`,
      description: seo.description || 'Enterprise-grade SaaS ecosystem for high-speed regional operations.',
    };
  } catch (err) {
    return { title: 'AdSky Solution' };
  }
}

export default async function CMSDynamicPage({ params }) {
  try {
    await connectToDatabase();
    const page = await Page.findOne({ slug: params.slug }).populate('sections');

    if (!page || !page.isActive) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-white font-sans">
        {/* 🚀 Dynamic Delivery Engine */}
        <DynamicRenderer sections={page.sections || []} />
      </div>
    );
  } catch (err) {
    notFound();
  }
}


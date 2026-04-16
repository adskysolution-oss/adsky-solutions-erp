'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * AdSky 25X Dynamic Section Components
 * These are the high-fidelity building blocks of the CMS.
 */

const HeroSection = ({ props, styles }) => (
  <section 
    style={{ 
      background: styles.background, 
      padding: styles.padding,
      textAlign: styles.align 
    }}
    className="relative overflow-hidden group"
  >
    <div className="max-w-7xl mx-auto px-8 relative z-10">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{ color: styles.headlineColor }}
        className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 leading-none italic"
      >
        {props.headline}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ color: styles.subheadlineColor }}
        className="text-xl md:text-2xl font-black italic tracking-widest uppercase opacity-80 mb-10 max-w-2xl"
      >
        {props.subheadline}
      </motion.p>
      <motion.a
        href={props.ctaLink}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        style={{ background: styles.buttonBg, color: styles.buttonText }}
        className="inline-block px-10 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-sm shadow-2xl transition-all"
      >
        {props.ctaText}
      </motion.a>
    </div>
  </section>
);

const TextBlock = ({ props, styles }) => (
  <section 
    style={{ 
      background: styles.background, 
      padding: styles.padding,
      textAlign: styles.align 
    }}
  >
    <div className="max-w-4xl mx-auto px-8">
      <h2 style={{ color: styles.titleColor }} className="text-4xl font-black italic tracking-tighter uppercase mb-6 italic">{props.title}</h2>
      <p style={{ color: styles.contentColor }} className="text-xl font-bold leading-relaxed opacity-80">{props.content}</p>
    </div>
  </section>
);

const GallerySection = ({ props, styles }) => (
  <section style={{ background: styles.background, padding: styles.padding }}>
    <div className="max-w-7xl mx-auto px-8">
      <div className={`grid grid-cols-1 md:grid-cols-${styles.gridCols} gap-8`}>
        {props.images.map((img, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="aspect-square bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-xl"
          >
             <img src={img.url} alt={img.alt} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/**
 * THE RENDERER ORCHESTRATOR
 */
const SECTION_MAP = {
  hero_v1: HeroSection,
  text_block: TextBlock,
  gallery_v1: GallerySection,
};

export default function DynamicRenderer({ sections }) {
  if (!sections || !Array.isArray(sections)) return null;

  return (
    <div className="dynamic-page-manifest">
      {sections.map((section, idx) => {
        const Component = SECTION_MAP[section.type];
        if (!Component) return <div key={idx} className="p-10 bg-rose-50 text-rose-500 font-black uppercase text-xs italic">Unknown Module Type: {section.type}</div>;
        
        return <Component key={section.id || idx} props={section.props} styles={section.styles} />;
      })}
    </div>
  );
}

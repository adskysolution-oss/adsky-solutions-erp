import React from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

/**
 * AdSky 25X CMS Section Renderer (Universal Style Support)
 * Renders high-fidelity sections with dynamic per-section color overrides.
 */
export default function SectionRenderer({ section }) {
  if (!section) return null;

  // Extract dynamic styles from the section JSON
  const style = section.style || {};
  const sectionStyle = {
    background: style.background === 'gradient' 
      ? `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)` 
      : (style.background || 'transparent'),
    color: style.color || 'inherit',
  };

  const buttonStyle = {
    backgroundColor: style.buttonColor || 'rgb(var(--primary))',
    color: style.buttonTextColor || '#ffffff'
  };

  switch (section.type) {
    case 'hero':
      return (
        <section 
          style={sectionStyle}
          className={`py-32 relative overflow-hidden transition-all duration-700`}
        >
          {/* Subtle Background Mesh if not a full background override */}
          {!style.background && (
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-44 -mt-44" />
          )}
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary mb-8">
               <Sparkles size={14} /> {section.badge || 'Enterprise Solutions'}
             </div>
             
             <h1 
               className="text-5xl md:text-8xl font-black tracking-tighter mb-8 max-w-5xl italic leading-none"
               style={{ color: style.color }}
             >
               {section.title} <span className="text-secondary font-black">{section.highlight}</span>
             </h1>
             
             <p className="text-opacity-70 text-lg md:text-xl max-w-2xl mb-12 font-medium opacity-80" style={{ color: style.color }}>
               {section.subtitle}
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  style={buttonStyle}
                  className="px-12 py-6 font-black uppercase tracking-widest rounded-3xl shadow-2xl shadow-primary/20 hover:scale-105 transition-all active:scale-[0.98] flex items-center gap-3"
                >
                  {section.ctaText || 'Get Started'} <ArrowRight size={20} />
                </button>
                <button className="px-12 py-6 bg-white/10 backdrop-blur-md border border-white/20 font-bold uppercase tracking-widest rounded-3xl hover:bg-white/20 transition-all active:scale-[0.98]">
                  Learn More
                </button>
             </div>
          </div>
        </section>
      );

    case 'features':
      return (
        <section style={sectionStyle} className="py-24 transition-all duration-700">
           <div className="max-w-7xl mx-auto px-6 text-center mb-16">
              <h2 className="text-4xl font-black italic tracking-tighter mb-4" style={{ color: style.color }}>Core Capabilities</h2>
              <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full" />
           </div>
           
           <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {(section.items || []).map((item, i) => (
                   <div key={i} className="bg-white/5 backdrop-blur-lg p-10 rounded-[3rem] border border-white/10 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all" />
                      
                      <div className="w-16 h-16 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10">
                         <Zap size={32} />
                      </div>
                      
                      <h3 className="text-2xl font-black italic tracking-tighter mb-4 relative z-10" style={{ color: style.color }}>{item.title}</h3>
                      <p className="text-opacity-60 font-medium text-sm leading-relaxed relative z-10" style={{ color: style.color }}>{item.description}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      );

    default:
      return (
        <div className="py-20 text-center text-slate-400 font-mono text-xs uppercase border-y border-dashed">
          [ Unsupported Section Type: {section.type} ]
        </div>
      );
  }
}

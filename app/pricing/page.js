'use client';
import { useState, useEffect } from 'react';
import { Check, Sparkles, Zap, Shield, Crown, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PricingPage() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetch('/api/admin/cms/pages/pricing')
      .then(res => res.json())
      .then(data => { if (!data.error) setPage(data); });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-24 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
           <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} /> Transparent Value
           </span>
           <h1 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">
              Premium Solutions.
           </h1>
           <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium italic">Expert consulting and technical implementation managed with enterprise precision.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
           <PricingCard 
              name="Strategy" 
              price="Custom" 
              description="One-on-one strategy session for business growth and tech audit." 
              features={['Initial Consultation', 'Tech Audit Report', 'Growth Roadmap', 'Digital Blueprint']}
              icon={Zap}
           />
           <PricingCard 
              name="Implementation" 
              price="Project Based" 
              description="End-to-end software development and system integration." 
              features={['Full-Stack Development', 'CRM/ERP Setup', 'Quality Assurance', 'Deployment Support']}
              icon={Shield}
              premium
           />
           <PricingCard 
              name="Enterprise" 
              price="Consultancy" 
              description="Long-term retainer for continuous technical advisory and management." 
              features={['Dedicated Architect', '24/7 Support Advisory', 'Resource Optimization', 'Quarterly Review']}
              icon={Crown}
           />
        </div>

        {/* CMS Dynamic Content (if any) */}
        {page?.sections?.map((section, idx) => (
          <div key={idx} className="max-w-7xl mx-auto px-6 mt-32">
             <h2 className="text-4xl font-black italic mb-10">{section.content.title}</h2>
             <div className="prose prose-invert max-w-none text-slate-400 text-lg leading-relaxed">
                {section.content.content}
             </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}

function PricingCard({ name, price, description, features, icon: Icon, premium }) {
  return (
    <div className={`group relative p-10 rounded-[3rem] border transition-all duration-700 ${premium ? 'bg-white text-slate-900 border-blue-500 shadow-[0_0_100px_rgba(59,130,246,0.3)] scale-105 z-10' : 'bg-white/5 border-white/10 hover:border-blue-500/40 text-white'}`}>
       {premium && (
         <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-widest italic shadow-xl">
            Recommended
         </div>
       )}
       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border ${premium ? 'bg-blue-600 text-white border-blue-700' : 'bg-blue-600/10 text-blue-400 border-blue-500/20'}`}>
          <Icon size={32} />
       </div>
       <h3 className="text-3xl font-black mb-2 italic tracking-tight">{name}</h3>
       <div className="text-4xl font-black mb-6 italic">{price}</div>
       <p className={`mb-10 font-medium ${premium ? 'text-slate-600' : 'text-slate-400'}`}>{description}</p>
       
       <ul className="space-y-4 mb-12">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 font-bold text-sm italic">
               <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${premium ? 'bg-blue-600 text-white' : 'bg-blue-500/10 text-blue-400'}`}>
                  <Check size={12} />
               </div>
               {f}
            </li>
          ))}
       </ul>

       <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn ${premium ? 'bg-[#020617] text-white hover:bg-blue-600' : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black'}`}>
          Book Now <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
       </button>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { Briefcase, Zap, Users, ShieldCheck, ChartColumnIncreasing, Earth, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetch('/api/admin/cms/pages/services')
      .then(res => res.json())
      .then(data => { if (!data.error) setPage(data); });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />
      
      <main className="flex-grow pt-32">
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 text-center mb-24">
            <p className="text-blue-400 text-xs font-black uppercase tracking-[0.4em] mb-6 animate-pulse">Our Expertise</p>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-orange-500 leading-tight">
               Strategic Technical Advisory
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
              We provide professional IT & Business consulting services delivered digitally via secure online meeting platforms.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {page?.sections && page.sections.length > 0 ? (
               page.sections.filter(s => s.type === 'service' || s.type === 'standard').map((section, idx) => (
                 <ServiceCard 
                    key={idx}
                    icon={idx % 2 === 0 ? Zap : Briefcase}
                    title={section.content.title || section.content.heading}
                    description={section.content.description || section.content.content}
                    image={section.content.image}
                 />
               ))
            ) : (
              /* Fallback default services if CMS is empty */
              <>
                <ServiceCard icon={Briefcase} title="IT Project Planning" description="Comprehensive technical blueprints and roadmap development for your software projects." />
                <ServiceCard icon={Zap} title="Web & App Strategy" description="Strategic consultation for building high-performing digital products." />
                <ServiceCard icon={Users} title="CRM / HRMS Setup" description="Expert guidance on selecting and implementing the right enterprise tools." />
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ServiceCard({ icon: Icon, title, description, image }) {
  return (
    <div className="group relative p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-700 overflow-hidden shadow-2xl hover:-translate-y-4">
       {/* Background Glow */}
       <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all"></div>
       
       {/* Content */}
       <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center mb-8 border border-blue-600/20 group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-500 shadow-2xl">
             <Icon size={32} />
          </div>
          <h3 className="text-2xl font-black mb-4 text-white italic tracking-tight">{title}</h3>
          <p className="text-slate-400 leading-relaxed font-medium mb-8 text-lg">{description}</p>
          
          <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all group/btn">
             Learn More
          </button>
       </div>

       {/* Optional Image Background Subtle */}
       {image && (
         <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
            <img src={image} alt="" className="w-full h-full object-cover" />
         </div>
       )}
    </div>
  );
}

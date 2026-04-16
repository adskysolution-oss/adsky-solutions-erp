import React from 'react';
import { User, Mail, Phone, MapPin, FileText, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

/**
 * AdSky 25X Form Engine
 * Renders dynamic forms based on the 25X JSON Schema.
 */
export default function FormRenderer({ schema, formData, onChange, onNext, onPrev, step }) {
  if (!schema || !schema.sections) return <div className="p-4 border border-dashed text-slate-400">Invalid Form Schema</div>;

  const activeSection = schema.sections[step - 1];
  if (!activeSection) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeSection.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-rose-500">*</span>}
            </label>
            <div className="relative group">
              {/* Field Icon Mapping */}
              {field.type === 'email' && <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />}
              {field.type === 'tel' && <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />}
              {field.type === 'text' && <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />}
              
              <input 
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={`w-full py-5 pl-14 pr-6 bg-white border border-slate-100 rounded-2xl outline-none focus:border-sky-500/50 focus:bg-white transition-all text-slate-900 font-bold shadow-sm`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="pt-8 flex gap-4">
        {step > 1 && (
          <button 
            type="button"
            onClick={onPrev}
            className="flex-grow py-5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-2xl transition-all"
          >
            Back
          </button>
        )}
        <button 
          type="button"
          onClick={onNext}
          className="flex-[2] py-5 bg-sky-600 hover:bg-sky-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-sky-200 flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          {step === schema.sections.length ? 'Final Submit' : 'Next Step'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

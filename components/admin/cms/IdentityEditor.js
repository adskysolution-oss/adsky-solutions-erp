'use client';
import { useState } from 'react';
import { Save, Loader2, Globe, Palette, Phone, Mail, MapPin } from 'lucide-react';
import ImageUpload from './ImageUpload';

export default function IdentityEditor({ config, setConfig, onSave, saving }) {
  const updateContact = (key, value) => {
    setConfig({ ...config, contact: { ...config.contact, [key]: value } });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-8">
        <h3 className="text-xl font-black text-white flex items-center gap-3 border-b border-white/5 pb-4">
          <Globe className="text-blue-500" size={24} /> Brand Identity
        </h3>
        <div className="space-y-6">
          <Field label="COMPANY NAME" value={config.siteName} onChange={(v) => setConfig({ ...config, siteName: v })} />
          <Field label="BROWSER TAB TITLE" value={config.siteTitle} onChange={(v) => setConfig({ ...config, siteTitle: v })} />
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SITE DESCRIPTION (SEO)</label>
            <textarea 
              rows={3}
              value={config.siteDescription || ''}
              onChange={(e) => setConfig({ ...config, siteDescription: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none"
            />
          </div>
          <ImageUpload label="MAIN LOGO" value={config.logoRoot} onChange={(v) => setConfig({ ...config, logoRoot: v })} />
          <ImageUpload label="FAVICON" value={config.favicon} onChange={(v) => setConfig({ ...config, favicon: v })} />
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-xl font-black text-white flex items-center gap-3 border-b border-white/5 pb-4">
          <Phone className="text-emerald-500" size={24} /> Contact Details (Global Sync)
        </h3>
        <div className="space-y-6">
          <Field label="EMAIL ADDRESS" icon={Mail} value={config.contact?.email} onChange={(v) => updateContact('email', v)} />
          <Field label="PHONE NUMBER" icon={Phone} value={config.contact?.phone} onChange={(v) => updateContact('phone', v)} />
          <Field label="WHATSAPP" icon={Phone} value={config.contact?.whatsapp} onChange={(v) => updateContact('whatsapp', v)} />
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">OFFICE ADDRESS</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-4 top-4 text-slate-500" />
              <textarea 
                rows={4}
                value={config.contact?.address || ''}
                onChange={(e) => updateContact('address', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 pl-12 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none"
                placeholder="Full address here..."
              />
            </div>
          </div>
        </div>
        <button 
          onClick={onSave}
          disabled={saving}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          {saving ? 'Saving...' : 'PUBLISH BRAND UPDATES'}
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, icon: Icon }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">{label}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />}
        <input 
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 ${Icon ? 'pl-12' : ''} text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all`}
        />
      </div>
    </div>
  );
}

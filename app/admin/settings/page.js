'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, Globe, Shield, Image as ImageIcon, 
  Mail, Phone, MapPin, Save, Loader2, Share2, 
  Search, CheckCircle
} from 'lucide-react';

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [config, setConfig] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      setConfig(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-50"><Loader2 className="animate-spin text-blue-600" size={48} /></div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <Settings className="text-blue-600" /> Website Settings
            </h1>
            <p className="text-gray-500 font-bold mt-1 uppercase text-xs tracking-widest">Global Configuration & SEO</p>
          </div>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-black flex items-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {saving ? 'Saving...' : 'SAVE ALL CHANGES'}
          </button>
        </header>

        {message && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-green-600 text-white p-4 rounded-xl mb-6 flex items-center gap-3 font-bold">
            <CheckCircle size={20} /> {message}
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:w-64 space-y-2">
            <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={Globe} label="General" />
            <TabButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} icon={Mail} label="Contact Info" />
            <TabButton active={activeTab === 'social'} onClick={() => setActiveTab('social')} icon={Share2} label="Social Links" />
            <TabButton active={activeTab === 'seo'} onClick={() => setActiveTab('seo')} icon={Search} label="Global SEO" />
            <TabButton active={activeTab === 'visuals'} onClick={() => setActiveTab('visuals')} icon={ImageIcon} label="Visual Assets" />
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <InputGroup label="Site Name" value={config.siteName} onChange={(v) => setConfig({...config, siteName: v})} />
                <InputGroup label="Copyright Text" value={config.footer?.copyright} onChange={(v) => setConfig({...config, footer: {...config.footer, copyright: v}})} />
                <TextAreaGroup label="About Text (Footer)" value={config.footer?.aboutText} onChange={(v) => setConfig({...config, footer: {...config.footer, aboutText: v}})} />
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <InputGroup label="Support Email" icon={Mail} value={config.contactEmail} onChange={(v) => setConfig({...config, contactEmail: v})} />
                <InputGroup label="Support Phone" icon={Phone} value={config.contactPhone} onChange={(v) => setConfig({...config, contactPhone: v})} />
                <TextAreaGroup label="Office Address" icon={MapPin} value={config.address} onChange={(v) => setConfig({...config, address: v})} />
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-6">
                <InputGroup label="Facebook URL" value={config.socialLinks?.facebook} onChange={(v) => setConfig({...config, socialLinks: {...config.socialLinks, facebook: v}})} />
                <InputGroup label="Twitter URL" value={config.socialLinks?.twitter} onChange={(v) => setConfig({...config, socialLinks: {...config.socialLinks, twitter: v}})} />
                <InputGroup label="LinkedIn URL" value={config.socialLinks?.linkedin} onChange={(v) => setConfig({...config, socialLinks: {...config.socialLinks, linkedin: v}})} />
                <InputGroup label="Instagram URL" value={config.socialLinks?.instagram} onChange={(v) => setConfig({...config, socialLinks: {...config.socialLinks, instagram: v}})} />
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6">
                <InputGroup label="Default SEO Title" value={config.globalSeo?.title} onChange={(v) => setConfig({...config, globalSeo: {...config.globalSeo, title: v}})} />
                <TextAreaGroup label="Default Meta Description" value={config.globalSeo?.description} onChange={(v) => setConfig({...config, globalSeo: {...config.globalSeo, description: v}})} />
                <InputGroup label="Default Keywords" value={config.globalSeo?.keywords} onChange={(v) => setConfig({...config, globalSeo: {...config.globalSeo, keywords: v}})} />
              </div>
            )}

            {activeTab === 'visuals' && (
              <div className="space-y-8">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 block">Site Logo</label>
                  <div className="flex items-center gap-6 p-6 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
                    <img src={config.logo} className="h-20 w-auto rounded-lg shadow-sm bg-white p-2" alt="Logo" />
                    <input type="text" className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 ring-blue-500 outline-none font-bold" value={config.logo} onChange={(e) => setConfig({...config, logo: e.target.value})} placeholder="URL for logo" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all ${
        active 
        ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 translate-x-2' 
        : 'text-gray-500 hover:bg-white hover:text-blue-600'
      }`}
    >
      <Icon size={20} /> {label}
    </button>
  );
}

function InputGroup({ label, value, onChange, icon: Icon, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
        {Icon && <Icon size={12} />} {label}
      </label>
      <input 
        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 ring-blue-50 outline-none font-bold text-gray-800 transition-all"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
}

function TextAreaGroup({ label, value, onChange, icon: Icon }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
        {Icon && <Icon size={12} />} {label}
      </label>
      <textarea 
        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 ring-blue-50 outline-none font-bold text-gray-800 transition-all min-h-[120px]"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

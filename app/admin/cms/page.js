'use client';
import { useState, useEffect, useCallback } from 'react';
import { 
  Globe, Layout, Settings, Image as ImageIcon, 
  Trash2, Plus, Save, ExternalLink, ChevronRight, ChevronDown,
  ShieldCheck, Target, Globe2, Layers, Palette, 
  Twitter, Linkedin, Instagram, Facebook, 
  Mail, Phone, MapPin, Loader2, FileText, CheckCircle2, 
  AlertCircle, X, ArrowUp, ArrowDown, Eye, Edit3,
  Sliders, AlignLeft, Grid, BarChart2, MousePointer,
  Image, Link, Type, ToggleLeft, Upload, RefreshCw
} from 'lucide-react';

// Section type definitions
const SECTION_TYPES = [
  { type: 'hero', label: 'Hero / Banner', icon: '🚀', desc: 'Main banner with title, subtitle, and CTA button' },
  { type: 'slider', label: 'Image Slider', icon: '🖼️', desc: 'Auto-sliding images with text overlay' },
  { type: 'stats', label: 'Stats Counter', icon: '📊', desc: 'Animated counter metrics section' },
  { type: 'features', label: 'Feature Grid', icon: '✨', desc: 'Grid of features with icons and text' },
  { type: 'services', label: 'Services Section', icon: '🔧', desc: 'Your service offerings in a card layout' },
  { type: 'about', label: 'About Section', icon: '👥', desc: 'Company story with image and text' },
  { type: 'gallery', label: 'Photo Gallery', icon: '🖼️', desc: 'Masonry/grid photo gallery' },
  { type: 'contact', label: 'Contact form', icon: '📬', desc: 'Contact form with map' },
  { type: 'cta', label: 'Call to Action', icon: '🎯', desc: 'Bold CTA with button' },
  { type: 'text-only', label: 'Rich Text Block', icon: '📝', desc: 'Full-width text content block' },
  { type: 'custom-form', label: 'Custom Form', icon: '📋', desc: 'Apply / Lead capture form builder' },
];

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '12px 16px',
  color: 'white',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box'
};
const labelStyle = { fontSize: '11px', fontWeight: '800', color: '#475569', letterSpacing: '0.08em', marginBottom: '8px', display: 'block' };
const fieldGroup = { display: 'flex', flexDirection: 'column', marginBottom: '20px' };

export default function WebsiteCMS() {
  const [activeTab, setActiveTab] = useState('pages');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState({ siteName: '', siteTitle: '', siteDescription: '', contact: {}, footer: { copyright: '' }, socialLinks: [] });
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [showAddPage, setShowAddPage] = useState(false);
  const [showSectionPicker, setShowSectionPicker] = useState(false);
  const [showSuccess, setShowSuccess] = useState('');
  const [newPage, setNewPage] = useState({ title: '', slug: '', seo: { title: '', description: '' } });
  const [pageSections, setPageSections] = useState([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cfgRes, pagesRes] = await Promise.all([
        fetch('/api/admin/cms/config'),
        fetch('/api/admin/cms/pages')
      ]);
      const cfg = await cfgRes.json();
      const pgs = await pagesRes.json();
      setConfig(cfg || {});
      setPages(Array.isArray(pgs) ? pgs : []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const selectPage = async (page) => {
    setSelectedPage(page);
    setEditingSection(null);
    // fetch full page with populated sections
    try {
      const res = await fetch(`/api/admin/cms/pages?slug=${page.slug}`);
      const data = await res.json();
      setPageSections(data?.sections || []);
    } catch (e) { setPageSections([]); }
  };

  const saveConfig = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/cms/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config) });
      setShowSuccess('Global settings saved!');
      setTimeout(() => setShowSuccess(''), 3000);
    } catch (e) {} finally { setSaving(false); }
  };

  const createPage = async () => {
    if (!newPage.title || !newPage.slug) return alert('Title and Slug are required');
    try {
      const res = await fetch('/api/admin/cms/pages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newPage) });
      const created = await res.json();
      setPages([...pages, created]);
      setShowAddPage(false);
      setNewPage({ title: '', slug: '', seo: { title: '', description: '' } });
      setShowSuccess('Page created! Now select it to add sections.');
      setTimeout(() => setShowSuccess(''), 4000);
    } catch (e) { alert('Failed to create page'); }
  };

  const deletePage = async (pageId) => {
    if (!confirm('Delete this page?')) return;
    await fetch(`/api/admin/cms/pages?id=${pageId}`, { method: 'DELETE' });
    setPages(pages.filter(p => p._id !== pageId));
    if (selectedPage?._id === pageId) { setSelectedPage(null); setPageSections([]); }
  };

  const addSection = async (type) => {
    const defaultData = {
      sectionType: type,
      sectionId: `${type}-${Date.now()}`,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      description: 'Edit this description from the section editor.',
      items: [],
      metadata: { isPublished: true, order: pageSections.length }
    };
    try {
      const secRes = await fetch('/api/admin/cms/sections', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(defaultData) });
      const newSec = await secRes.json();
      // Add to page
      const updatedSections = [...pageSections.map(s => s._id || s), newSec._id];
      await fetch('/api/admin/cms/pages', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: selectedPage._id, sections: updatedSections }) });
      setPageSections([...pageSections, newSec]);
      setShowSectionPicker(false);
      setEditingSection(newSec);
      setShowSuccess('Section added! Edit its content below.');
      setTimeout(() => setShowSuccess(''), 3000);
    } catch (e) { alert('Failed to add section'); }
  };

  const saveSection = async (sec) => {
    try {
      const res = await fetch('/api/admin/cms/sections', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: sec._id, ...sec }) });
      const updated = await res.json();
      setPageSections(pageSections.map(s => s._id === updated._id ? updated : s));
      setEditingSection(updated);
      setShowSuccess('Section saved!');
      setTimeout(() => setShowSuccess(''), 2000);
    } catch (e) { alert('Save failed'); }
  };

  const deleteSection = async (secId) => {
    if (!confirm('Remove this section?')) return;
    await fetch(`/api/admin/cms/sections?id=${secId}`, { method: 'DELETE' });
    setPageSections(pageSections.filter(s => s._id !== secId));
    if (editingSection?._id === secId) setEditingSection(null);
  };

  const moveSectionUp = async (idx) => {
    if (idx === 0) return;
    const arr = [...pageSections];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setPageSections(arr);
    await fetch('/api/admin/cms/pages', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: selectedPage._id, sections: arr.map(s => s._id) }) });
  };

  const moveSectionDown = async (idx) => {
    if (idx === pageSections.length - 1) return;
    const arr = [...pageSections];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setPageSections(arr);
    await fetch('/api/admin/cms/pages', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: selectedPage._id, sections: arr.map(s => s._id) }) });
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: '16px' }}>
      <Loader2 className="animate-spin" size={48} color="#3b82f6" />
      <p style={{ color: '#475569', fontWeight: '700' }}>Loading CMS Engine...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '950', color: 'white', margin: 0 }}>Website CMS</h1>
          <p style={{ color: '#475569', fontSize: '14px', marginTop: '6px' }}>Manage pages, sections, content, and global settings.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: 'white', fontSize: '14px', fontWeight: '700', textDecoration: 'none' }}>
            <Eye size={16} /> View Live Site
          </a>
          <button onClick={saveConfig} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '14px', fontWeight: '900', cursor: 'pointer' }}>
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Publish All Changes
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '14px', padding: '14px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontWeight: '700' }}>
          <CheckCircle2 size={18} /> {showSuccess}
        </div>
      )}

      {/* Tab Nav */}
      <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '16px', width: 'fit-content', marginBottom: '28px', border: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { id: 'pages', label: 'Pages & Sections', icon: Layout },
          { id: 'branding', label: 'Identity & Brand', icon: Palette },
          { id: 'socials', label: 'Social Links', icon: Target },
          { id: 'footer', label: 'Footer Settings', icon: FileText },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: activeTab === tab.id ? 'rgba(59,130,246,0.15)' : 'transparent', color: activeTab === tab.id ? '#60a5fa' : '#64748b', fontSize: '13px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* ===================== PAGES & SECTIONS TAB ===================== */}
      {activeTab === 'pages' && (
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', minHeight: '700px' }}>
          {/* Left: Page list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => setShowAddPage(true)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', background: 'rgba(59,130,246,0.1)', border: '1px dashed rgba(59,130,246,0.3)', borderRadius: '14px', color: '#60a5fa', fontWeight: '800', fontSize: '13px', cursor: 'pointer', marginBottom: '8px' }}>
              <Plus size={18} /> Create New Page
            </button>
            {pages.map(page => (
              <div key={page._id} onClick={() => selectPage(page)} style={{ padding: '14px 16px', borderRadius: '14px', border: '1px solid', borderColor: selectedPage?._id === page._id ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.06)', background: selectedPage?._id === page._id ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: 'white' }}>{page.title}</div>
                  <div style={{ fontSize: '10px', color: '#475569', marginTop: '3px' }}>/{page.slug}</div>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <a href={`/${page.slug === 'home' ? '' : page.slug}`} target="_blank" style={{ padding: '4px', color: '#475569' }} onClick={e => e.stopPropagation()}><Eye size={14} /></a>
                  <button style={{ padding: '4px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); deletePage(page._id); }}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
            {pages.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#475569', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: '14px' }}>
                <Layout size={32} style={{ marginBottom: '12px', opacity: 0.2 }} />
                <p style={{ fontSize: '12px', fontWeight: '700' }}>No pages yet. Create one!</p>
              </div>
            )}
          </div>

          {/* Right: Section builder */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', overflow: 'hidden' }}>
            {!selectedPage ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '16px', color: '#475569' }}>
                <Layers size={64} style={{ opacity: 0.1 }} />
                <p style={{ fontWeight: '800', fontSize: '16px' }}>Select a page to build its content</p>
                <p style={{ fontSize: '12px', opacity: 0.6 }}>Or create a new page using the button on the left.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', height: '100%' }}>
                {/* Section list */}
                <div style={{ borderRight: '1px solid rgba(255,255,255,0.04)', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '900', color: 'white', margin: 0 }}>{selectedPage.title}</h3>
                      <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>/{selectedPage.slug} • {pageSections.length} sections</div>
                    </div>
                    <button onClick={() => setShowSectionPicker(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '12px', color: '#60a5fa', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>
                      <Plus size={16} /> Add Section
                    </button>
                  </div>

                  {pageSections.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 20px', color: '#475569', border: '2px dashed rgba(255,255,255,0.06)', borderRadius: '16px' }}>
                      <p style={{ fontWeight: '700' }}>No sections yet.</p>
                      <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '8px' }}>Click "+ Add Section" to start building</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {pageSections.map((sec, idx) => (
                        <div key={sec._id || idx} style={{ padding: '14px 16px', borderRadius: '14px', border: '1px solid', borderColor: editingSection?._id === sec._id ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.06)', background: editingSection?._id === sec._id ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setEditingSection(sec)}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '28px', height: '28px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#64748b', fontWeight: '900' }}>{idx + 1}</div>
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: '800', color: 'white' }}>{sec.title || 'Untitled Section'}</div>
                              <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>{sec.sectionType}</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button style={{ padding: '5px', background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); moveSectionUp(idx); }}><ArrowUp size={14} /></button>
                            <button style={{ padding: '5px', background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); moveSectionDown(idx); }}><ArrowDown size={14} /></button>
                            <button style={{ padding: '5px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); deleteSection(sec._id); }}><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section editor */}
                <div style={{ padding: '24px', overflowY: 'auto', maxHeight: '700px' }}>
                  {editingSection ? (
                    <SectionEditor section={editingSection} onSave={saveSection} onChange={setEditingSection} />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#475569', gap: '12px', textAlign: 'center' }}>
                      <Edit3 size={40} style={{ opacity: 0.2 }} />
                      <p style={{ fontWeight: '700', fontSize: '14px' }}>Select a section to edit</p>
                      <p style={{ fontSize: '12px', opacity: 0.6 }}>Click any section from the list to view its editor.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== BRANDING TAB ===================== */}
      {activeTab === 'branding' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}><Globe2 color="#3b82f6" size={20} /> Brand Identity</h3>
            <div style={fieldGroup}>
              <label style={labelStyle}>COMPANY NAME</label>
              <input style={inputStyle} value={config.siteName || ''} onChange={e => setConfig({ ...config, siteName: e.target.value })} placeholder="AdSky Solution" />
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>BROWSER TAB TITLE</label>
              <input style={inputStyle} value={config.siteTitle || ''} onChange={e => setConfig({ ...config, siteTitle: e.target.value })} placeholder="Enterprise ERP" />
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>SITE DESCRIPTION (SEO)</label>
              <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={config.siteDescription || ''} onChange={e => setConfig({ ...config, siteDescription: e.target.value })} placeholder="What your company does in one sentence..." />
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>LOGO URL</label>
              <input style={inputStyle} value={config.logoRoot || ''} onChange={e => setConfig({ ...config, logoRoot: e.target.value })} placeholder="https://... or /logo.png" />
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>FAVICON URL</label>
              <input style={inputStyle} value={config.favicon || ''} onChange={e => setConfig({ ...config, favicon: e.target.value })} placeholder="https://... or /favicon.ico" />
            </div>
            <button onClick={saveConfig} style={{ padding: '14px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', border: 'none', borderRadius: '14px', color: 'white', fontWeight: '900', cursor: 'pointer', fontSize: '14px' }}>
              Save Brand Settings
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={20} color="#10b981" /> Contact Info</h3>
            {[
              { key: 'email', label: 'EMAIL ADDRESS', placeholder: 'contact@company.com' },
              { key: 'phone', label: 'PHONE NUMBER', placeholder: '+91 XXXXX XXXXX' },
              { key: 'whatsapp', label: 'WHATSAPP NUMBER', placeholder: '+91 XXXXX XXXXX' },
              { key: 'address', label: 'OFFICE ADDRESS', placeholder: 'Full address here...' },
            ].map(f => (
              <div key={f.key} style={fieldGroup}>
                <label style={labelStyle}>{f.label}</label>
                {f.key === 'address' ? (
                  <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={config.contact?.[f.key] || ''} onChange={e => setConfig({ ...config, contact: { ...config.contact, [f.key]: e.target.value } })} placeholder={f.placeholder} />
                ) : (
                  <input style={inputStyle} value={config.contact?.[f.key] || ''} onChange={e => setConfig({ ...config, contact: { ...config.contact, [f.key]: e.target.value } })} placeholder={f.placeholder} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== SOCIALS TAB ===================== */}
      {activeTab === 'socials' && (
        <div style={{ maxWidth: '680px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', color: 'white', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}><Target color="#f59e0b" size={20} /> Social Media Links</h3>
          {[
            { key: 'instagram', label: 'Instagram', icon: Instagram, color: '#e1306c' },
            { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: '#0077b5' },
            { key: 'twitter', label: 'Twitter / X', icon: Twitter, color: '#1da1f2' },
            { key: 'facebook', label: 'Facebook', icon: Facebook, color: '#4267b2' },
            { key: 'youtube', label: 'YouTube', icon: Globe, color: '#ff0000' },
          ].map(social => {
            const currentLink = config.socialLinks?.find(s => s.platform === social.key)?.url || '';
            return (
              <div key={social.key} style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ padding: '14px', borderRadius: '14px', background: `${social.color}15`, color: social.color, flexShrink: 0 }}><social.icon size={22} /></div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>{social.label.toUpperCase()}</label>
                  <input style={inputStyle} placeholder={`https://${social.key}.com/yourprofile`} value={currentLink} onChange={e => {
                    const filtered = (config.socialLinks || []).filter(s => s.platform !== social.key);
                    setConfig({ ...config, socialLinks: [...filtered, { platform: social.key, url: e.target.value, icon: social.key }] });
                  }} />
                </div>
              </div>
            );
          })}
          <button onClick={saveConfig} style={{ padding: '14px 28px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', border: 'none', borderRadius: '14px', color: 'white', fontWeight: '900', cursor: 'pointer', fontSize: '14px', marginTop: '8px' }}>
            Save Social Links
          </button>
        </div>
      )}

      {/* ===================== FOOTER TAB ===================== */}
      {activeTab === 'footer' && (
        <div style={{ maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}><FileText color="#3b82f6" size={20} /> Footer Settings</h3>
          <div style={fieldGroup}>
            <label style={labelStyle}>COPYRIGHT TEXT</label>
            <input style={inputStyle} value={config.footer?.copyright || ''} onChange={e => setConfig({ ...config, footer: { ...config.footer, copyright: e.target.value } })} placeholder="© 2026 Company Name. All rights reserved." />
          </div>
          <div style={fieldGroup}>
            <label style={labelStyle}>FOOTER LINKS (Add/Remove Policy & Info Links)</label>
            {(config.footer?.links || []).map((link, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input style={{ ...inputStyle, flex: 1 }} placeholder="Link Label" value={link.label} onChange={e => {
                  const arr = [...(config.footer?.links || [])]; arr[i] = { ...arr[i], label: e.target.value };
                  setConfig({ ...config, footer: { ...config.footer, links: arr } });
                }} />
                <input style={{ ...inputStyle, flex: 1 }} placeholder="/privacy-policy" value={link.url} onChange={e => {
                  const arr = [...(config.footer?.links || [])]; arr[i] = { ...arr[i], url: e.target.value };
                  setConfig({ ...config, footer: { ...config.footer, links: arr } });
                }} />
                <button onClick={() => setConfig({ ...config, footer: { ...config.footer, links: (config.footer?.links || []).filter((_, j) => j !== i) } })} style={{ padding: '10px', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '10px', color: '#ef4444', cursor: 'pointer' }}><X size={16} /></button>
              </div>
            ))}
            <button onClick={() => setConfig({ ...config, footer: { ...config.footer, links: [...(config.footer?.links || []), { label: '', url: '' }] } })} style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px', color: '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={16} /> Add Footer Link
            </button>
          </div>
          <button onClick={saveConfig} style={{ padding: '14px 28px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', border: 'none', borderRadius: '14px', color: 'white', fontWeight: '900', cursor: 'pointer', fontSize: '14px' }}>
            Save Footer Settings
          </button>
        </div>
      )}

      {/* ===================== ADD PAGE MODAL ===================== */}
      {showAddPage && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '28px', padding: '40px', width: '100%', maxWidth: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '900', color: 'white', margin: 0 }}>Create New Page</h2>
              <button onClick={() => setShowAddPage(false)} style={{ padding: '8px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>PAGE TITLE *</label>
              <input style={inputStyle} placeholder="e.g. About Us" value={newPage.title} onChange={e => {
                const slug = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                setNewPage({ ...newPage, title: e.target.value, slug });
              }} />
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>URL SLUG *</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569', fontSize: '14px', fontWeight: '700' }}>adskysolution.com/</span>
                <input style={{ ...inputStyle, paddingLeft: '180px' }} placeholder="about-us" value={newPage.slug} onChange={e => setNewPage({ ...newPage, slug: e.target.value })} />
              </div>
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>SEO DESCRIPTION</label>
              <textarea rows={3} style={{ ...inputStyle, resize: 'none' }} placeholder="Page description for search engines..." value={newPage.seo?.description || ''} onChange={e => setNewPage({ ...newPage, seo: { ...newPage.seo, description: e.target.value } })} />
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button onClick={() => setShowAddPage(false)} style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '14px', color: 'white', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              <button onClick={createPage} style={{ flex: 2, padding: '14px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', border: 'none', borderRadius: '14px', color: 'white', fontWeight: '900', cursor: 'pointer', fontSize: '14px' }}>Create Page</button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SECTION PICKER MODAL ===================== */}
      {showSectionPicker && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '28px', padding: '40px', width: '100%', maxWidth: '720px', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '900', color: 'white', margin: 0 }}>Add Section</h2>
                <p style={{ color: '#475569', fontSize: '14px', marginTop: '6px' }}>Choose a component to add to this page</p>
              </div>
              <button onClick={() => setShowSectionPicker(false)} style={{ padding: '8px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {SECTION_TYPES.map(s => (
                <button key={s.type} onClick={() => addSection(s.type)} style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', color: 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.background = 'rgba(59,130,246,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{s.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: 'white', marginBottom: '6px' }}>{s.label}</div>
                  <div style={{ fontSize: '11px', color: '#475569', lineHeight: '1.5' }}>{s.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ========== SECTION EDITOR COMPONENT ==========
function SectionEditor({ section, onSave, onChange }) {
  const [local, setLocal] = useState(section);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setLocal(section); }, [section._id]);

  const update = (key, value) => {
    const updated = { ...local, [key]: value };
    setLocal(updated);
    onChange(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(local);
    setSaving(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '900', color: 'white', margin: 0 }}>{SECTION_TYPES.find(s => s.type === local.sectionType)?.label || local.sectionType}</h4>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '3px' }}>Section Editor</div>
        </div>
        <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '12px', color: '#10b981', fontWeight: '800', cursor: 'pointer', fontSize: '13px' }}>
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
        </button>
      </div>

      <div style={fieldGroup}>
        <label style={labelStyle}>SECTION TITLE</label>
        <input style={inputStyle} value={local.title || ''} onChange={e => update('title', e.target.value)} />
      </div>
      <div style={fieldGroup}>
        <label style={labelStyle}>SUBTITLE</label>
        <input style={inputStyle} value={local.subtitle || ''} onChange={e => update('subtitle', e.target.value)} />
      </div>
      <div style={fieldGroup}>
        <label style={labelStyle}>DESCRIPTION / BODY TEXT</label>
        <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={local.description || ''} onChange={e => update('description', e.target.value)} />
      </div>

      {/* Image field for relevant section types */}
      {['hero', 'about', 'features', 'slider'].includes(local.sectionType) && (
        <div style={fieldGroup}>
          <label style={labelStyle}>BACKGROUND / MAIN IMAGE URL</label>
          <input style={inputStyle} value={local.image || ''} onChange={e => update('image', e.target.value)} placeholder="https://images.unsplash.com/..." />
          {local.image && <img src={local.image} alt="preview" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px', marginTop: '8px' }} />}
        </div>
      )}

      {/* Items editor for stats, features, gallery, slider */}
      {['stats', 'features', 'slider', 'gallery', 'custom-form'].includes(local.sectionType) && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>
              {local.sectionType === 'stats' ? 'STAT ITEMS' : local.sectionType === 'slider' ? 'SLIDER IMAGES' : local.sectionType === 'custom-form' ? 'FORM FIELDS' : 'ITEMS'}
            </label>
            <button onClick={() => update('items', [...(local.items || []), { title: '', description: '', icon: '', link: '', image: '' }])} style={{ padding: '6px 12px', background: 'rgba(59,130,246,0.1)', border: 'none', borderRadius: '8px', color: '#60a5fa', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>+ Add</button>
          </div>
          {(local.items || []).map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                <input style={{ ...inputStyle, flex: 1 }} placeholder="Title / Label" value={item.title || ''} onChange={e => { const arr = [...local.items]; arr[i] = { ...arr[i], title: e.target.value }; update('items', arr); }} />
                <button onClick={() => update('items', local.items.filter((_, j) => j !== i))} style={{ padding: '8px', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '8px', color: '#ef4444', cursor: 'pointer' }}><X size={16} /></button>
              </div>
              {local.sectionType === 'slider' && <input style={{ ...inputStyle, marginBottom: '8px' }} placeholder="Image URL" value={item.image || ''} onChange={e => { const arr = [...local.items]; arr[i] = { ...arr[i], image: e.target.value }; update('items', arr); }} />}
              {local.sectionType !== 'slider' && <input style={inputStyle} placeholder={local.sectionType === 'stats' ? 'Value (e.g. 500+)' : 'Description'} value={item.description || ''} onChange={e => { const arr = [...local.items]; arr[i] = { ...arr[i], description: e.target.value }; update('items', arr); }} />}
              {local.sectionType === 'custom-form' && (
                <select style={{ ...inputStyle, marginTop: '8px' }} value={item.type || 'text'} onChange={e => { const arr = [...local.items]; arr[i] = { ...arr[i], type: e.target.value }; update('items', arr); }}>
                  {['text', 'email', 'number', 'textarea', 'file', 'select'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CTA Button */}
      {['hero', 'cta', 'about'].includes(local.sectionType) && (
        <div style={fieldGroup}>
          <label style={labelStyle}>CTA BUTTON LINK</label>
          <input style={inputStyle} value={local.ctaLink || ''} onChange={e => update('ctaLink', e.target.value)} placeholder="/contact or https://..." />
        </div>
      )}

      <button onClick={handleSave} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', border: 'none', borderRadius: '14px', color: 'white', fontWeight: '900', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        {saving ? 'Saving...' : 'Save Section Changes'}
      </button>
    </div>
  );
}

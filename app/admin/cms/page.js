'use client';

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Settings,
  Rocket,
  Info,
  Server
} from 'lucide-react';
import Link from 'next/link';

export default function CMSPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const sections = [
    { id: 'hero', label: 'Hero Section', icon: Rocket },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'services', label: 'Our Services', icon: Server },
    { id: 'stats', label: 'Stats Banner', icon: Layout },
    { id: 'contact', label: 'Contact Info', icon: Settings },
  ];

  async function loadSection(secId) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/cms?section=${secId}`);
      const data = await res.json();
      setContent(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadSection(activeSection);
  }, [activeSection]);

  const handleSave = async () => {
    setSaving(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setStatus({ type: 'success', message: 'Website updated successfully! 🚀' });
      } else {
        setStatus({ type: 'error', message: 'Failed to save changes.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Server error occurred.' });
    }
    setSaving(false);
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  const addItem = () => {
    setContent({
      ...content,
      items: [...(content.items || []), { title: '', description: '', icon: '', link: '' }]
    });
  };

  const removeItem = (index) => {
    const newItems = content.items.filter((_, i) => i !== index);
    setContent({ ...content, items: newItems });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...content.items];
    newItems[index][field] = value;
    setContent({ ...content, items: newItems });
  };

  if (loading && !content) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'white' }}>
      Loading Editor...
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Layout size={28} className="text-blue-500" /> Website CMS
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>Control your public website content dynamically.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/" target="_blank" style={{ padding: '10px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', textDecoration: 'none', fontSize: '13px', fontWeight: '600', border: '1px solid rgba(255,255,255,0.1)' }}>
            View Live Site
          </Link>
          <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '12px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving...' : <><Save size={18} /> Publish Changes</>}
          </button>
        </div>
      </div>

      {status.message && (
        <div style={{ padding: '16px', borderRadius: '12px', background: status.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`, color: status.type === 'success' ? '#10b981' : '#ef4444', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {status.message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
        {/* Sidebar Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '12px', border: '1px solid', 
                background: activeSection === sec.id ? 'rgba(59,130,246,0.1)' : 'transparent',
                borderColor: activeSection === sec.id ? 'rgba(59,130,246,0.3)' : 'transparent',
                color: activeSection === sec.id ? '#60a5fa' : '#94a3b8',
                textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', fontWeight: activeSection === sec.id ? '700' : '500'
              }}
            >
              <sec.icon size={18} />
              {sec.label}
            </button>
          ))}
        </div>

        {/* Editor Area */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Main Title</label>
              <input 
                type="text" 
                value={content?.title || ''} 
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '15px' }}
                placeholder="Enter title..."
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subtitle / Slug</label>
              <input 
                type="text" 
                value={content?.subtitle || ''} 
                onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '15px' }}
                placeholder="Short slug or subtitle..."
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description Content</label>
              <textarea 
                rows={4}
                value={content?.description || ''} 
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '15px', resize: 'none' }}
                placeholder="Enter section description..."
              />
            </div>

            {/* Dynamic Items (for Services, Stats, etc) */}
            {(activeSection === 'services' || activeSection === 'stats') && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Section Items</label>
                  <button onClick={addItem} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#60a5fa', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <Plus size={14} /> Add New Item
                  </button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {content?.items?.map((item, idx) => (
                    <div key={idx} style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                      <button onClick={() => removeItem(idx)} style={{ position: 'absolute', top: '12px', right: '12px', color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <Trash2 size={14} />
                      </button>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <input 
                          type="text" value={item.title} placeholder="Item Title"
                          onChange={(e) => updateItem(idx, 'title', e.target.value)}
                          style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '14px', fontWeight: '700', outline: 'none' }}
                        />
                        <textarea 
                          rows={2} value={item.description} placeholder="Item Description"
                          onChange={(e) => updateItem(idx, 'description', e.target.value)}
                          style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '13px', outline: 'none' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

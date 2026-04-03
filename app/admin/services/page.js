'use client';
import { useState, useEffect } from 'react';
import { 
  LayoutGrid, Plus, Search, Trash2, Edit2, 
  Save, X, Globe, BarChart, Users, Zap, 
  Shield, Smartphone, Cpu, Loader2, Check
} from 'lucide-react';

const availableIcons = {
  Globe, BarChart, Users, Zap, Shield, Smartphone, Cpu, LayoutGrid
};

export default function ServicesManagement() {
  const [content, setContent] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', icon: 'Zap' });
  const [submitting, setSubmitting] = useState(false);

  async function loadServices() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/cms?section=services');
      const data = await res.json();
      if (data.success && data.data) {
        setContent(data.data);
        setItems(data.data.items || []);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => { loadServices(); }, []);

  const handleSave = async (updatedItems) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'services',
          items: updatedItems
        })
      });
      if (res.ok) {
        setItems(updatedItems);
        setShowAdd(false);
        setEditingIndex(null);
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const addItem = (e) => {
    e.preventDefault();
    const newItems = [...items, formData];
    handleSave(newItems);
  };

  const updateItem = (e) => {
    e.preventDefault();
    const newItems = [...items];
    newItems[editingIndex] = formData;
    handleSave(newItems);
  };

  const deleteItem = (index) => {
    if (!confirm('Delete this service?')) return;
    const newItems = items.filter((_, i) => i !== index);
    handleSave(newItems);
  };

  return (
    <div style={{ padding: '0 0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: 0 }}>Services Management</h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Update the services displayed on your public business website.</p>
        </div>
        <button 
          onClick={() => { setShowAdd(true); setEditingIndex(null); setFormData({ title: '', description: '', icon: 'Zap' }); }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 15px -3px rgba(16,185,129,0.3)' }}
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader2 size={40} className="animate-spin text-green-500" /></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {items.map((item, i) => {
            const IconComp = availableIcons[item.icon] || Zap;
            return (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '24px', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconComp size={24} />
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => { setEditingIndex(i); setFormData(item); setShowAdd(true); }} style={{ padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#64748b', cursor: 'pointer' }}><Edit2 size={16} /></button>
                    <button onClick={() => deleteItem(i)} style={{ padding: '8px', borderRadius: '10px', background: 'rgba(239,68,68,0.05)', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                  </div>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: '0 0 12px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>{item.description}</p>
              </div>
            );
          })}
          {items.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px', color: '#475569' }}>
               <LayoutGrid size={48} strokeWidth={1} style={{ marginBottom: '16px', opacity: 0.2 }} />
               <p>No services defined yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '500px', background: '#0e1528', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: 0 }}>{editingIndex !== null ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={editingIndex !== null ? updateItem : addItem} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>SERVICE TITLE</label>
                <input required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>CHOOSE ICON</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {Object.keys(availableIcons).map(icon => {
                    const Icon = availableIcons[icon];
                    return (
                      <button key={icon} type="button" onClick={() => setFormData({...formData, icon})} style={{ padding: '12px', borderRadius: '12px', background: formData.icon === icon ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.02)', border: `1px solid ${formData.icon === icon ? '#10b981' : 'rgba(255,255,255,0.05)'}`, color: formData.icon === icon ? '#10b981' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Icon size={20} />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>DESCRIPTION</label>
                <textarea required rows="4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px', resize: 'none' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowAdd(false)} style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#94a3b8', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={submitting} style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                  {submitting ? <Loader2 size={18} className="animate-spin mx-auto" /> : (editingIndex !== null ? 'Save Changes' : 'Add Service')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

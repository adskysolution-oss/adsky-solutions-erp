'use client';
import { useState, useEffect } from 'react';
import { 
  Target, Filter, Search, Plus, MoreVertical, 
  MessageCircle, Mail, Phone, Calendar, User, 
  ChevronRight, ArrowRight, Clock, CheckCircle2, 
  AlertCircle, Download, LayoutGrid, List, Tag, 
  Loader2, X, Check, ExternalLink
} from 'lucide-react';

const leadStatus = [
  { id: 'new', label: 'New', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { id: 'contacted', label: 'Contacted', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  { id: 'interested', label: 'Interested', color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
  { id: 'converted', label: 'Converted', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  { id: 'not_interested', label: 'Not Interested', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
];

export default function LeadManagement() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', source: 'website', status: 'new', notes: '' });

  async function loadLeads() {
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      setLeads(data.data || []);
    } catch {
      // Demo Data
      setLeads([
        { _id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', status: 'new', source: 'Website', date: '2026-04-03', notes: 'Interested in Job Portal system' },
        { _id: '2', name: 'Priya Singh', email: 'priya@example.com', phone: '9871122334', status: 'contacted', source: 'Facebook', date: '2026-04-02', notes: 'Called yesterday, told to call back' },
        { _id: '3', name: 'Amit Kumar', email: 'amit@example.com', phone: '9988776655', status: 'interested', source: 'WhatsApp', date: '2026-04-01', notes: 'Need a custom ERP for retail' },
        { _id: '4', name: 'Neha Gupta', email: 'neha@example.com', phone: '8877665544', status: 'converted', source: 'Direct', date: '2026-03-28', notes: 'Contract signed for 1 year' },
        { _id: '5', name: 'Vikram Patel', email: 'vikram@example.com', phone: '7766554433', status: 'not_interested', source: 'Website', date: '2026-03-25', notes: 'Budget too low' },
      ]);
    }
    setLoading(false);
  }

  useEffect(() => { loadLeads(); }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const newLead = { ...formData, _id: Math.random().toString(), date: new Date().toISOString().split('T')[0] };
    setLeads([newLead, ...leads]);
    setShowAdd(false);
    setFormData({ name: '', email: '', phone: '', source: 'website', status: 'new', notes: '' });
  };

  const filtered = leads.filter(l => 
    (activeTab === 'all' || l.status === activeTab) &&
    (l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     l.phone.includes(searchTerm))
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: 0 }}>Lead CRM</h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Track sales prospects and conversions across sources.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#94a3b8', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            <Download size={16} />
            Export
          </button>
          <button 
            onClick={() => setShowAdd(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 15px -3px rgba(16,185,129,0.3)' }}
          >
            <Plus size={18} />
            Add New Lead
          </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            {['all', ...leadStatus.map(s => s.id)].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                style={{ 
                  padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  background: activeTab === tab ? '#3b82f6' : 'transparent',
                  color: activeTab === tab ? 'white' : '#64748b'
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '12px' }}>
            <button onClick={() => setViewMode('grid')} style={{ padding: '8px', borderRadius: '8px', border: 'none', background: viewMode === 'grid' ? 'rgba(255,255,255,0.1)' : 'transparent', color: viewMode === 'grid' ? 'white' : '#475569', cursor: 'pointer' }}><LayoutGrid size={18} /></button>
            <button onClick={() => setViewMode('list')} style={{ padding: '8px', borderRadius: '8px', border: 'none', background: viewMode === 'list' ? 'rgba(255,255,255,0.1)' : 'transparent', color: viewMode === 'list' ? 'white' : '#475569', cursor: 'pointer' }}><List size={18} /></button>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
          <input 
            type="text" 
            placeholder="Search leads name, email, phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '14px 14px 14px 48px', color: 'white', fontSize: '15px' }}
          />
        </div>
      </div>

      {/* Leads Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr', gap: '20px' }}>
        {filtered.map(lead => (
          <div key={lead._id} style={{ 
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden',
            display: viewMode === 'list' ? 'flex' : 'block', alignItems: 'center', justifyContent: 'space-between', gap: '24px', transition: 'all 0.3s'
          }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: leadStatus.find(s => s.id === lead.status)?.color }} />
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontWeight: '700', color: leadStatus.find(s => s.id === lead.status)?.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <Tag size={12} />
                  {lead.status.replace('_', ' ')}
                </div>
                <div style={{ fontSize: '11px', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  {new Date(lead.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: '0 0 4px' }}>{lead.name}</h3>
                <div style={{ fontSize: '13px', color: '#64748b' }}>From {lead.source}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#94a3b8' }}>
                  <Mail size={14} />
                  {lead.email}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#94a3b8' }}>
                  <Phone size={14} />
                  {lead.phone}
                </div>
              </div>

              <div style={{ 
                padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', fontSize: '12px', color: '#475569', 
                borderLeft: '2px solid rgba(255,255,255,0.05)', fontStyle: 'italic', marginBottom: '20px' 
              }}>
                "{lead.notes}"
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', borderTop: viewMode === 'grid' ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingTop: viewMode === 'grid' ? '16px' : '0' }}>
              <button style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.05)', color: '#10b981', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MessageCircle size={16} /></button>
              <button style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid rgba(59,130,246,0.2)', background: 'rgba(59,130,246,0.05)', color: '#3b82f6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Phone size={16} /></button>
              <button style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '600px', background: '#0e1528', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: 0 }}>Add New CRM Lead</h2>
              <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAdd} style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>PROSPECT NAME</label>
                <input required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>PHONE NUMBER</label>
                <input required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>EMAIL ADDRESS</label>
                <input style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>LEAD SOURCE</label>
                <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})}>
                  <option value="website">Website Form</option>
                  <option value="whatsapp">WhatsApp Chat</option>
                  <option value="facebook">Facebook Ads</option>
                  <option value="direct">Direct Contact</option>
                </select>
              </div>
              <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>INITIAL STATUS</label>
                <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  {leadStatus.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>INTERNAL NOTES</label>
                <textarea rows="3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px', resize: 'none' }} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowAdd(false)} style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#94a3b8', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Create Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

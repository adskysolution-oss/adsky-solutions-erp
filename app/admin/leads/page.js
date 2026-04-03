'use client';
import { useState, useEffect } from 'react';
import { 
  Target, Inbox, Phone, Mail, Globe, 
  Search, Filter, Plus, Edit3, Trash2,
  CheckCircle2, XCircle, Clock, Loader2,
  User, Briefcase, Calendar, MoreVertical,
  ChevronRight, ExternalLink, Download, 
  MessageSquare, TrendingUp, Users, Zap,
  AlertCircle, Star, Save, X, PhoneCall
} from 'lucide-react';

const statuses = [
  { id: 'new', label: 'New Lead', color: '#3b82f6' },
  { id: 'contacted', label: 'Contacted', color: '#f59e0b' },
  { id: 'interested', label: 'Interested', color: '#a855f7' },
  { id: 'converted', label: 'Converted', color: '#10b981' },
  { id: 'not_interested', label: 'Lost', color: '#ef4444' },
];

const sources = ['website', 'facebook', 'whatsapp', 'direct', 'other'];

export default function LeadCRM() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'All', source: 'All' });
  const [showModal, setShowModal] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [saving, setSaving] = useState(false);
  const [employees, setEmployees] = useState([]);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', source: 'website', status: 'new', notes: '', assignedTo: '' });

  async function loadData() {
    setLoading(true);
    try {
      const q = new URLSearchParams({
        status: filters.status,
        source: filters.source,
        search: searchTerm
      }).toString();
      
      const res = await fetch(`/api/admin/leads?${q}`);
      const data = await res.json();
      if (res.ok) setLeads(data.data || []);

      const empRes = await fetch('/api/admin/employees');
      const empData = await empRes.json();
      if (empRes.ok) setEmployees(empData.data || []);
    } catch (err) {
      console.error(err);
      // Demo Data
      setLeads([
        { _id: '1', name: 'Abhishek Kumar', email: 'abhishek@example.com', phone: '9876543210', status: 'new', source: 'website', createdAt: '2026-04-03' },
        { _id: '2', name: 'Rajesh Sharma', email: 'rajesh@example.com', phone: '9876543211', status: 'interested', source: 'whatsapp', createdAt: '2026-04-02' },
        { _id: '3', name: 'Priya Singh', email: 'priya@example.com', phone: '9876543212', status: 'converted', source: 'facebook', createdAt: '2026-04-01' },
      ]);
    }
    setLoading(false);
  }

  useEffect(() => { loadData(); }, [searchTerm, filters]);

  const handleOpenModal = (lead = null) => {
    if (lead) {
      setCurrentLead(lead);
      setFormData({ name: lead.name, email: lead.email, phone: lead.phone, source: lead.source, status: lead.status, notes: lead.notes || '', assignedTo: lead.assignedTo?._id || '' });
    } else {
      setCurrentEmp(null);
      setFormData({ name: '', email: '', phone: '', source: 'website', status: 'new', notes: '', assignedTo: '' });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = currentLead ? 'PUT' : 'POST';
      const body = currentLead ? { ...formData, id: currentLead._id } : formData;
      const res = await fetch('/api/admin/leads', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        loadData();
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: 'DELETE' });
      if (res.ok) loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', margin: 0, letterSpacing: '-0.02em' }}>Lead CRM Pipeline</h1>
          <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>Turn potential enquiries into converted business partners.</p>
        </div>
        <button onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '14px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 20px -5px rgba(16,185,129,0.3)' }}>
           <Plus size={18} /> Generate New Lead
        </button>
      </div>

      {/* Analytics Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginBottom: '40px' }}>
         {statuses.map(s => (
           <div key={s.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '20px' }}>
              <div style={{ height: '4px', width: '24px', background: s.color, borderRadius: '2px', marginBottom: '12px' }} />
              <div style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>{leads.filter(l => l.status === s.id).length}</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
           </div>
         ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
         <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
            <input type="text" placeholder="Search by name, phone or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '14px 14px 14px 48px', color: 'white', fontSize: '15px' }} />
         </div>
         <div style={{ display: 'flex', gap: '12px' }}>
            <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} style={{ padding: '0 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', color: '#94a3b8', fontSize: '14px', outline: 'none' }}>
               <option value="All">All Statuses</option>
               {statuses.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
            <select value={filters.source} onChange={e => setFilters({...filters, source: e.target.value})} style={{ padding: '0 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', color: '#94a3b8', fontSize: '14px', outline: 'none' }}>
               <option value="All">All Sources</option>
               {sources.map(sr => <option key={sr} value={sr}>{sr.toUpperCase()}</option>)}
            </select>
         </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader2 size={40} className="animate-spin text-green-500" /></div>
      ) : (
        <div style={{ height: '600px', display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }}>
           {statuses.map(stage => (
             <div key={stage.id} style={{ minWidth: '340px', flex: 1, background: 'rgba(255,255,255,0.01)', borderRadius: '28px', padding: '20px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', padding: '0 8px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: stage.color }} />
                      <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'white', textTransform: 'uppercase' }}>{stage.label}</h3>
                   </div>
                   <div style={{ fontSize: '12px', fontWeight: '800', color: '#475569' }}>{leads.filter(l => l.status === stage.id).length}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                   {leads.filter(l => l.status === stage.id).map(lead => (
                     <div key={lead._id} onClick={() => handleOpenModal(lead)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '20px', cursor: 'grab' }}>
                        <div style={{ fontSize: '15px', fontWeight: '800', color: 'white', marginBottom: '6px' }}>{lead.name}</div>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                           <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> {lead.phone}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                           <div style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>{lead.source}</div>
                           <div style={{ fontSize: '11px', color: '#475569' }}>{new Date(lead.createdAt).toLocaleDateString()}</div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div onClick={() => setShowModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }} />
           <div style={{ position: 'relative', width: '560px', background: '#0d1224', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '32px', padding: '40px', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)' }}>
              <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}><X size={24} /></button>
              <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white', marginBottom: '8px' }}>{currentLead ? 'Update Enquiry' : 'Log New Prospect'}</h2>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px' }}>Maintain a high-conversion pipeline by tracking interaction.</p>

              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>PROSPECT NAME</label>
                       <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px', color: 'white' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>PHONE NUMBER</label>
                       <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px', color: 'white' }} />
                    </div>
                 </div>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>PIPELINE STAGE</label>
                       <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px', color: 'white' }}>
                          {statuses.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                       </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>LEAD SOURCE</label>
                       <select value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px', color: 'white' }}>
                          {sources.map(sr => <option key={sr} value={sr}>{sr.toUpperCase()}</option>)}
                       </select>
                    </div>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>ASSIGN TO AGENT</label>
                    <select value={formData.assignedTo} onChange={e => setFormData({...formData, assignedTo: e.target.value})} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px', color: 'white' }}>
                       <option value="">Unassigned</option>
                       {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
                    </select>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>CRM NOTES</label>
                    <textarea rows="3" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', resize: 'none' }} placeholder="Log latest conversation detail..." />
                 </div>
                 <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                    <button type="submit" disabled={saving} style={{ flex: 1, padding: '18px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '18px', color: 'white', fontSize: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                       {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                       {saving ? 'Saving...' : currentLead ? 'Sync Lead' : 'Initialize Prospect'}
                    </button>
                    {currentLead && (
                      <button type="button" onClick={() => handleDelete(currentLead._id)} style={{ padding: '18px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '18px', color: '#f87171', cursor: 'pointer' }}>
                         <Trash2 size={20} />
                      </button>
                    )}
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}

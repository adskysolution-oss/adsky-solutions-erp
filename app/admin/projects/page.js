'use client';
import { useState, useEffect } from 'react';
import { 
  Briefcase, Plus, Search, Filter, Trash2, Edit2, 
  Download, Loader2, X, Check, Calendar, IndianRupee,
  Activity, CheckCircle, Clock
} from 'lucide-react';

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [formData, setFormData] = useState({ title: '', category: '', price: '', status: 'Active', description: '' });
  const [submitting, setSubmitting] = useState(false);

  async function loadProjects() {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        status: statusFilter,
        search: searchTerm,
        dateRange: dateFilter
      }).toString();
      const res = await fetch(`/api/admin/projects?${query}`);
      const data = await res.json();
      setProjects(data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadProjects();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [statusFilter, searchTerm, dateFilter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const method = editingProject ? 'PUT' : 'POST';
      const body = editingProject ? { ...formData, id: editingProject._id } : formData;
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        loadProjects();
        setShowAdd(false);
        setEditingProject(null);
        setFormData({ title: '', category: '', price: '', status: 'Active', description: '' });
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete project?')) return;
    try {
      await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const exportCSV = () => {
    if (projects.length === 0) return;
    const headers = ['Project Name', 'Category', 'Price', 'Status', 'Date'];
    const rows = projects.map(p => [
      p.title,
      p.category,
      p.price,
      p.status,
      new Date(p.createdAt).toLocaleDateString()
    ]);
    const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projects_report_${dateFilter}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div style={{ padding: '0 0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: 0 }}>Project Management</h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Track sales, inventory, and project deployments.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#94a3b8', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            <Download size={16} />
            Export CSV
          </button>
          <button onClick={() => { setShowAdd(true); setEditingProject(null); setFormData({ title: '', category: '', price: '', status: 'Active', description: '' }); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 15px -3px rgba(139,92,246,0.3)' }}>
            <Plus size={18} />
            Add Project
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '12px', marginBottom: '24px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
          <input type="text" placeholder="Search project name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', padding: '10px 12px 10px 42px', color: 'white', fontSize: '14px' }} />
        </div>
        <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 16px', color: '#94a3b8', fontSize: '13px', outline: 'none', cursor: 'pointer' }}>
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 16px', color: '#94a3b8', fontSize: '13px', outline: 'none', cursor: 'pointer' }}>
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Sold">Sold</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Loader2 className="animate-spin text-purple-500" size={40} /></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {projects.map(p => (
            <div key={p._id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '24px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ padding: '6px 12px', borderRadius: '8px', background: p.status === 'Sold' ? 'rgba(34,197,94,0.1)' : 'rgba(139,92,246,0.1)', color: p.status === 'Sold' ? '#22c55e' : '#a855f7', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                  {p.status}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => { setEditingProject(p); setFormData({ title: p.title, category: p.category, price: p.price, status: p.status, description: p.description }); setShowAdd(true); }} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(p._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: '0 0 16px' }}>{p.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ flex: 1, padding: '12px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '11px', color: '#475569', marginBottom: '4px' }}>PRICE</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>₹{p.price}</div>
                </div>
                <div style={{ flex: 1, padding: '12px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '11px', color: '#475569', marginBottom: '4px' }}>CATEGORY</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#94a3b8' }}>{p.category}</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
              <div style={{ fontSize: '11px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={12} />
                Added on {new Date(p.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
          {projects.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#475569' }}>No projects found.</div>}
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '500px', background: '#0e1528', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: 0 }}>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>PROJECT TITLE</label>
                <input required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>CATEGORY</label>
                  <input required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>PRICE (₹)</label>
                  <input required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>STATUS</label>
                <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="Sold">Sold</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>DESCRIPTION</label>
                <textarea rows="3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px', resize: 'none' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowAdd(false)} style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#94a3b8', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={submitting} style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                  {submitting ? <Loader2 size={18} className="animate-spin mx-auto" /> : (editingProject ? 'Save Changes' : 'Create Project')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

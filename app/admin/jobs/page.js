'use client';
import { useState, useEffect } from 'react';
import { 
  Building2, Search, Filter, CheckCircle2, XCircle, Clock, 
  ExternalLink, MoreVertical, Eye, Trash2, MapPin, 
  Briefcase, IndianRupee, Loader2, AlertCircle
} from 'lucide-react';

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  async function loadJobs() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/jobs');
      const data = await res.json();
      if (res.ok) setJobs(data.data || []);
      else throw new Error();
    } catch {
      setJobs([]);
    }
    setLoading(false);
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setJobs(jobs.map(j => j._id === id ? { ...j, status } : j));
      }
    } catch {
      alert('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job post?')) return;
    try {
      const res = await fetch(`/api/admin/jobs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setJobs(jobs.filter(j => j._id !== id));
      }
    } catch {
      alert('Error deleting job');
    }
  };

  useEffect(() => { loadJobs(); }, []);

  const filtered = jobs.filter(j => 
    (activeTab === 'all' || j.status === activeTab) &&
    (j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     j.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const statusColors = {
    active: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: <CheckCircle2 size={14} /> },
    pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: <Clock size={14} /> },
    rejected: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: <XCircle size={14} /> },
    expired: { color: '#6b7280', bg: 'rgba(107,114,128,0.1)', icon: <AlertCircle size={14} /> },
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: 0 }}>Job Management</h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Review and manage all job postings across the portal.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            {['all', 'active', 'pending', 'rejected'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                style={{ 
                  padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  background: activeTab === tab ? '#3b82f6' : 'transparent',
                  color: activeTab === tab ? 'white' : '#64748b'
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
            <input 
              type="text" 
              placeholder="Search by job title or company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '12px 12px 12px 48px', color: 'white', fontSize: '14px' }}
            />
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Job Post</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Company</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Salary</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center' }}><Loader2 className="animate-spin" size={32} style={{ margin: '0 auto', color: '#3b82f6' }} /></td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>No job listings found.</td></tr>
            ) : filtered.map((job) => (
              <tr key={job._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '20px 24px' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {job.title}
                      {job.featured && <span style={{ fontSize: '10px', background: 'rgba(59,130,246,0.1)', color: '#60a5fa', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(59,130,246,0.2)' }}>Featured</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                      <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {job.location}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={12} /> {job.jobType}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8' }}>{job.companyName}</div>
                  <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>Posted {new Date(job.createdAt).toLocaleDateString()}</div>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '10px', 
                    fontSize: '12px', fontWeight: '700', background: statusColors[job.status]?.bg, color: statusColors[job.status]?.color
                  }}>
                    {statusColors[job.status]?.icon}
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </div>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <IndianRupee size={14} /> {job.salary}
                  </div>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button title="View Details" style={{ padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', cursor: 'pointer' }}><Eye size={18} /></button>
                    {job.status === 'pending' && (
                      <>
                        <button onClick={() => handleStatusUpdate(job._id, 'active')} title="Approve" style={{ padding: '8px', borderRadius: '10px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e', cursor: 'pointer' }}><CheckCircle2 size={18} /></button>
                        <button onClick={() => handleStatusUpdate(job._id, 'rejected')} title="Reject" style={{ padding: '8px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer' }}><XCircle size={18} /></button>
                      </>
                    )}
                    {job.status === 'active' && (
                      <button onClick={() => handleStatusUpdate(job._id, 'expired')} title="Expire" style={{ padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280', cursor: 'pointer' }}><AlertCircle size={18} /></button>
                    )}
                    <button onClick={() => handleDelete(job._id)} title="Delete" style={{ padding: '8px', borderRadius: '10px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)', color: '#f87171', cursor: 'pointer' }}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

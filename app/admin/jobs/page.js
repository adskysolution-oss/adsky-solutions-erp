'use client';
import { useState, useEffect } from 'react';
import { 
  Building2, Search, Filter, CheckCircle2, XCircle, Clock, 
  ExternalLink, MoreVertical, Eye, Trash2, MapPin, 
  Briefcase, IndianRupee, Loader2, AlertCircle,
  TrendingUp, Download, PieChart as PieIcon, LayoutList
} from 'lucide-react';

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  async function loadJobs() {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        status: statusFilter,
        search: searchTerm,
        dateRange: dateFilter
      }).toString();
      const res = await fetch(`/api/admin/jobs?${query}`);
      const data = await res.json();
      if (data.success) {
        setJobs(data.data || []);
        if (data.stats) setStats(data.stats);
      }
    } catch {
      setJobs([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadJobs();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [statusFilter, searchTerm, dateFilter]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) loadJobs();
    } catch {
      alert('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job post?')) return;
    try {
      const res = await fetch(`/api/admin/jobs?id=${id}`, { method: 'DELETE' });
      if (res.ok) loadJobs();
    } catch {
      alert('Error deleting job');
    }
  };

  const exportCSV = () => {
    if (jobs.length === 0) return;
    const headers = ['Job Title', 'Company', 'Location', 'Job Type', 'Salary', 'Status', 'Posted Date'];
    const rows = jobs.map(j => [
      j.title,
      j.companyName,
      j.location,
      j.jobType,
      j.salary,
      j.status,
      new Date(j.createdAt).toLocaleDateString()
    ]);
    const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job_listings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const statusColors = {
    active: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: <CheckCircle2 size={14} /> },
    pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: <Clock size={14} /> },
    rejected: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: <XCircle size={14} /> },
    expired: { color: '#6b7280', bg: 'rgba(107,114,128,0.1)', icon: <AlertCircle size={14} /> },
  };

  return (
    <div style={{ padding: '0 0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: 0 }}>Global Job Portal</h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Review, manage and moderate all job postings across the network.</p>
        </div>
        <button 
          onClick={exportCSV}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,1)', borderRadius: '12px', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
        >
          <Download size={16} />
          Export Listings
        </button>
      </div>

      {/* Stats Dashboard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {[
          { label: 'Total Postings', value: stats.total, color: '#3b82f6', icon: <Briefcase size={20} /> },
          { label: 'Active Jobs', value: stats.active, color: '#10b981', icon: <CheckCircle2 size={20} /> },
          { label: 'Pending Review', value: stats.pending, color: '#f59e0b', icon: <Clock size={20} /> },
          { label: 'High Priority', value: 5, color: '#ef4444', icon: <TrendingUp size={20} /> }
        ].map((card, idx) => (
          <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '20px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ padding: '10px', borderRadius: '12px', background: `${card.color}15`, color: card.color }}>{card.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>{card.label}</div>
             </div>
             <div style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 2, minWidth: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
          <input 
            type="text" 
            placeholder="Search by job title or company..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '14px 14px 14px 48px', color: 'white', fontSize: '15px' }}
          />
        </div>
        <select 
          value={dateFilter} 
          onChange={(e) => setDateFilter(e.target.value)}
          style={{ flex: 1, minWidth: '150px', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '14px', color: 'white', fontSize: '14px' }}
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ flex: 1, minWidth: '150px', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '14px', color: 'white', fontSize: '14px' }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader2 size={40} className="animate-spin text-blue-500" /></div>
      ) : (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Job Post</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Employer Info</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Metrics</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.2s' }}>
                  <td style={{ padding: '20px 24px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '15px', fontWeight: '700', color: 'white' }}>{job.title}</span>
                        {job.featured && <span style={{ fontSize: '10px', background: 'rgba(59,130,246,0.1)', color: '#60a5fa', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(59,130,246,0.2)' }}>FEATURED</span>}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {job.location}</div>
                        <div style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}><IndianRupee size={12} /> {job.salary}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}><Building2 size={16} /></div>
                       <div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>{job.companyName}</div>
                          <div style={{ fontSize: '11px', color: '#475569' }}>{new Date(job.createdAt).toLocaleDateString()}</div>
                       </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '10px', 
                      fontSize: '11px', fontWeight: '800', background: statusColors[job.status]?.bg, color: statusColors[job.status]?.color, textTransform: 'uppercase'
                    }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColors[job.status]?.color }} />
                      {job.status}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                       <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>12</div>
                          <div style={{ fontSize: '10px', color: '#475569' }}>APPS</div>
                       </div>
                       <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>450</div>
                          <div style={{ fontSize: '10px', color: '#475569' }}>VIEWS</div>
                       </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {job.status === 'pending' ? (
                        <>
                          <button onClick={() => handleStatusUpdate(job._id, 'active')} title="Approve" style={{ padding: '10px', borderRadius: '12px', background: 'rgba(34,197,94,0.1)', border: 'none', color: '#22c55e', cursor: 'pointer' }}><CheckCircle2 size={18} /></button>
                          <button onClick={() => handleStatusUpdate(job._id, 'rejected')} title="Reject" style={{ padding: '10px', borderRadius: '12px', background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', cursor: 'pointer' }}><XCircle size={18} /></button>
                        </>
                      ) : (
                        <button onClick={() => handleStatusUpdate(job._id, 'pending')} title="Revert to Pending" style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><Clock size={18} /></button>
                      )}
                      <button onClick={() => handleDelete(job._id)} title="Delete" style={{ padding: '10px', borderRadius: '12px', background: 'rgba(239,68,68,0.05)', border: 'none', color: '#f87171', cursor: 'pointer' }}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '60px', color: '#475569' }}>No job postings found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

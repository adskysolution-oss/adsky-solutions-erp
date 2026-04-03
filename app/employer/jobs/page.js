'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Briefcase, Search, Filter, Plus, Edit2, Trash2, 
  MapPin, IndianRupee, Clock, CheckCircle2, XCircle, 
  AlertCircle, MoreVertical, Loader2, Download, 
  LineChart, UserCheck, Eye, Trash
} from 'lucide-react';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  async function loadJobs() {
    setLoading(true);
    try {
      const employer = JSON.parse(localStorage.getItem('employerUser') || '{}');
      if (!employer?._id) return;

      const res = await fetch(`/api/employer/jobs?employerId=${employer._id}`);
      const data = await res.json();
      if (res.ok) setJobs(data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => { loadJobs(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job listing?')) return;
    try {
      const res = await fetch(`/api/employer/jobs?id=${id}`, { method: 'DELETE' });
      if (res.ok) loadJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const statusColors = {
    active: { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    rejected: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
    expired: { color: '#64748b', bg: 'rgba(100,116,139,0.1)' },
  };

  const filteredJobs = jobs.filter(j => 
    (statusFilter === 'all' || j.status === statusFilter) &&
    (j.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: 0 }}>Manage Job Postings</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Monitor, edit and track applicants for your active listings.</p>
        </div>
        <Link href="/employer/jobs/new" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '15px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(16,185,129,0.3)' }}>
          <Plus size={18} />
          Post New Job
        </Link>
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '12px', marginBottom: '32px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
          <input 
            type="text" 
            placeholder="Search by job title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', outline: 'none', background: 'transparent', border: 'none', padding: '10px 10px 10px 48px', color: 'white', fontSize: '14px' }}
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 16px', color: '#94a3b8', fontSize: '13px', outline: 'none' }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="expired">Expired</option>
        </select>
        <button style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#94a3b8', fontSize: '13px', cursor: 'pointer' }}>
          <Download size={16} />
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
          <Loader2 size={40} className="animate-spin text-green-500" />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {filteredJobs.map(job => (
            <div key={job._id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '28px', padding: '24px', transition: 'all 0.3s', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                 <div style={{ padding: '6px 14px', borderRadius: '10px', background: statusColors[job.status]?.bg, color: statusColors[job.status]?.color, fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {job.status}
                 </div>
                 <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => handleDelete(job._id)} style={{ padding: '8px', borderRadius: '10px', background: 'rgba(239,68,68,0.05)', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                 </div>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: '0 0 12px' }}>{job.title}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                    <MapPin size={14} /> {job.location}
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#10b981', fontWeight: '600' }}>
                    <IndianRupee size={14} /> {job.salary}
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                    <Clock size={14} /> {job.jobType}
                 </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: '14px', fontWeight: '800', color: 'white' }}>0</div>
                       <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase' }}>Apps</div>
                    </div>
                    <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: '14px', fontWeight: '800', color: 'white' }}>0</div>
                       <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase' }}>Views</div>
                    </div>
                 </div>
                 <Link href={`/employer/applicants?jobId=${job._id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: '#3b82f6' }}>
                    Applicants <ChevronRight size={16} />
                 </Link>
              </div>
            </div>
          ))}
          {filteredJobs.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px dashed rgba(255,255,255,0.1)' }}>
               <Briefcase size={48} color="#475569" style={{ marginBottom: '16px', opacity: 0.3 }} />
               <h3 style={{ color: '#94a3b8', margin: '0 0 8px' }}>No active postings found</h3>
               <p style={{ color: '#475569', fontSize: '14px' }}>Click on "Post New Job" to reach thousands of candidates.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

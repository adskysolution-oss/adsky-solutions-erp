'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Users, Search, Filter, Mail, Phone, Calendar,
  CheckCircle2, XCircle, Clock, ExternalLink,
  MoreVertical, ChevronRight, Loader2, Download,
  LayoutGrid, List, Kanban, Info, User, Briefcase
} from 'lucide-react';
import { Suspense } from 'react';

const columns = [
  { id: 'applied', label: 'New Applied', color: '#3b82f6' },
  { id: 'shortlisted', label: 'Shortlisted', color: '#10b981' },
  { id: 'interview', label: 'Interviewing', color: '#8b5cf6' },
  { id: 'hired', label: 'Hired', color: '#22c55e' },
  { id: 'rejected', label: 'Rejected', color: '#ef4444' },
];

function ApplicantsContent() {
  const searchParams = useSearchParams();
  const initialJobId = searchParams.get('jobId') || 'all';
  
  const [applicants, setApplicants] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(initialJobId);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('kanban'); // kanban or list

  async function loadData() {
    setLoading(true);
    try {
      const employer = JSON.parse(localStorage.getItem('employerUser') || '{}');
      if (!employer?._id) return;

      // Load Jobs for dropdown
      const jobsRes = await fetch(`/api/employer/jobs?employerId=${employer._id}`);
      const jobsData = await jobsRes.json();
      if (jobsRes.ok) setJobs(jobsData.data || []);

      // Load Applicants
      const res = await fetch(`/api/employer/applicants?employerId=${employer._id}&jobId=${selectedJob}`);
      const data = await res.json();
      if (res.ok) setApplicants(data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => { loadData(); }, [selectedJob]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch('/api/employer/applicants', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setApplicants(applicants.map(a => a._id === id ? { ...a, status } : a));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = applicants.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'white', margin: 0, letterSpacing: '-0.02em' }}>Applicants Pipeline</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>Manage candidate progress through the hiring stages.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
           <select 
              value={selectedJob} 
              onChange={(e) => setSelectedJob(e.target.value)}
              style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: 'white', fontSize: '14px', outline: 'none' }}
           >
              <option value="all">All Job Postings</option>
              {jobs.map(j => <option key={j._id} value={j._id}>{j.title}</option>)}
           </select>
           <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '12px' }}>
              <button onClick={() => setViewMode('kanban')} style={{ padding: '8px', border: 'none', borderRadius: '8px', background: viewMode === 'kanban' ? 'rgba(255,255,255,0.1)' : 'transparent', color: viewMode === 'kanban' ? 'white' : '#475569', cursor: 'pointer' }}><Kanban size={18} /></button>
              <button onClick={() => setViewMode('list')} style={{ padding: '8px', border: 'none', borderRadius: '8px', background: viewMode === 'list' ? 'rgba(255,255,255,0.1)' : 'transparent', color: viewMode === 'list' ? 'white' : '#475569', cursor: 'pointer' }}><List size={18} /></button>
           </div>
        </div>
      </div>

      <div style={{ position: 'relative', marginBottom: '32px' }}>
        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
        <input 
          type="text" 
          placeholder="Search by candidate name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '14px 14px 14px 48px', color: 'white', fontSize: '15px' }}
        />
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader2 size={40} className="animate-spin text-green-500" /></div>
      ) : viewMode === 'kanban' ? (
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }}>
          {columns.map(col => (
            <div key={col.id} style={{ minWidth: '320px', flex: 1, background: 'rgba(255,255,255,0.02)', borderRadius: '24px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', padding: '0 8px' }}>
                 <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }} />
                    {col.label}
                 </h3>
                 <div style={{ fontSize: '12px', color: '#475569', fontWeight: '700' }}>{filtered.filter(a => (a.status || 'applied') === col.id).length}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filtered.filter(a => (a.status || 'applied') === col.id).map(app => (
                  <div key={app._id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '20px', cursor: 'grab' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: 'white' }}>{app.name[0]}</div>
                       <div>
                          <div style={{ fontSize: '15px', fontWeight: '700', color: 'white' }}>{app.name}</div>
                          <div style={{ fontSize: '12px', color: '#475569' }}>Applied {new Date(app.appliedAt).toLocaleDateString()}</div>
                       </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8', marginBottom: '16px', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
                       <Briefcase size={12} /> {app.role}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                       {columns.map(c => c.id !== col.id && (
                         <button key={c.id} onClick={() => updateStatus(app._id, c.id)} title={`Move to ${c.label}`} style={{ padding: '6px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.03)', color: c.color, cursor: 'pointer' }}>
                            <ChevronRight size={14} />
                         </button>
                       ))}
                       <button style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}><MoreVertical size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Candidate</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Role</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Applied Date</th>
                <th style={{ padding: '16px 24px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <tr key={app._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: 'white' }}>{app.name}</div>
                    <div style={{ fontSize: '12px', color: '#475569' }}>{app.email}</div>
                  </td>
                  <td style={{ padding: '20px 24px', color: '#94a3b8', fontSize: '14px' }}>{app.role}</td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '10px', background: `${columns.find(c => (app.status || 'applied') === c.id)?.color}15`, color: columns.find(c => (app.status || 'applied') === c.id)?.color, fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                       {app.status || 'applied'}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', color: '#475569', fontSize: '13px' }}>{new Date(app.appliedAt).toLocaleDateString()}</td>
                  <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                     <button style={{ padding: '8px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><ExternalLink size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function EmployerApplicants() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader2 size={40} className="animate-spin text-green-500" /></div>}>
      <ApplicantsContent />
    </Suspense>
  );
}

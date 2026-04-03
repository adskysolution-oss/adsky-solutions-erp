'use client';
import { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Mail, Phone, Calendar,
  CheckCircle2, XCircle, Clock, ExternalLink,
  MoreVertical, ChevronRight, Loader2, Download
} from 'lucide-react';

export default function EmployerApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  async function loadApplicants() {
    try {
      const employer = JSON.parse(localStorage.getItem('employerUser'));
      const res = await fetch(`/api/employer/applicants?employerId=${employer?._id}`);
      const data = await res.json();
      if (res.ok) setApplicants(data.data || []);
      else throw new Error();
    } catch {
      // Demo Data
      setApplicants([
        { _id: '1', name: 'Amit Sharma', role: 'Senior Web Developer', status: 'applied', appliedAt: '2026-04-03', email: 'amit@example.com', phone: '+91 9876543210' },
        { _id: '2', name: 'Priya Verma', role: 'Senior Web Developer', status: 'shortlisted', appliedAt: '2026-04-02', email: 'priya@example.com', phone: '+91 9876543211' },
        { _id: '3', name: 'Rahul Gupta', role: 'Marketing Manager', status: 'rejected', appliedAt: '2026-04-01', email: 'rahul@example.com', phone: '+91 9876543212' },
      ]);
    }
    setLoading(false);
  }

  useEffect(() => { loadApplicants(); }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch('/api/employer/applicants', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) loadApplicants();
    } catch {
      alert('Error updating status');
    }
  };

  const filtered = applicants.filter(a => 
    (activeTab === 'all' || a.status === activeTab) &&
    (a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     a.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const statusColors = {
    applied: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', icon: <Clock size={14} /> },
    shortlisted: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: <CheckCircle2 size={14} /> },
    rejected: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: <XCircle size={14} /> },
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: 0 }}>Applicants Tracking</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Review and manage candidates who applied for your jobs.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
          {['all', 'applied', 'shortlisted', 'rejected'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{ 
                padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                background: activeTab === tab ? '#10b981' : 'transparent',
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
            placeholder="Search by candidate name or position..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '12px 12px 12px 48px', color: 'white', fontSize: '14px' }}
          />
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <th style={{ padding: '20px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Candidate</th>
              <th style={{ padding: '20px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Applied For</th>
              <th style={{ padding: '20px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '20px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Applied Date</th>
              <th style={{ padding: '20px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((applicant) => (
              <tr key={applicant._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: 'white' }}>{applicant.name[0]}</div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: 'white' }}>{applicant.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', gap: '10px', marginTop: '4px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> {applicant.email}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8' }}>{applicant.role}</div>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '10px', 
                    fontSize: '12px', fontWeight: '700', background: statusColors[applicant.status]?.bg, color: statusColors[applicant.status]?.color
                  }}>
                    {statusColors[applicant.status]?.icon}
                    {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                  </div>
                </td>
                <td style={{ padding: '20px 24px', color: '#94a3b8', fontSize: '14px' }}>
                  {new Date(applicant.appliedAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleStatusUpdate(applicant._id, 'shortlisted')} title="Shortlist" style={{ padding: '8px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981', cursor: 'pointer' }}><CheckCircle2 size={18} /></button>
                    <button onClick={() => handleStatusUpdate(applicant._id, 'rejected')} title="Reject" style={{ padding: '8px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', cursor: 'pointer' }}><XCircle size={18} /></button>
                    <button title="Download Resume" style={{ padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', cursor: 'pointer' }}><Download size={18} /></button>
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

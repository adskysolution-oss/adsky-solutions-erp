'use client';
import { useState, useEffect } from 'react';
import { 
  Send, Search, Filter, Briefcase, MapPin, 
  IndianRupee, Clock, CheckCircle2, XCircle, 
  ChevronRight, Loader2, Building2, AlertCircle, Calendar
} from 'lucide-react';

export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  async function loadApplications() {
    try {
      const candidate = JSON.parse(localStorage.getItem('candidateUser'));
      const res = await fetch(`/api/candidate/apply?candidateId=${candidate?._id}`);
      const data = await res.json();
      if (res.ok) setApplications(data.data || []);
      else throw new Error();
    } catch {
      // Demo Data
      setApplications([
        { _id: '1', job: { title: 'Senior Web Developer', location: 'Remote', salary: '₹80K - ₹1.2L' }, employer: { companyName: 'AdSky Solution' }, status: 'applied', appliedAt: '2026-04-03' },
        { _id: '2', job: { title: 'UX Designer', location: 'Bangalore', salary: '₹60K - ₹90K' }, employer: { companyName: 'CreativePixel' }, status: 'shortlisted', appliedAt: '2026-04-01' },
      ]);
    }
    setLoading(false);
  }

  useEffect(() => { loadApplications(); }, []);

  const filtered = applications.filter(a => 
    (activeTab === 'all' || a.status === activeTab) &&
    (a.job?.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     a.employer?.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const statusColors = {
    applied: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', icon: <Clock size={16} /> },
    shortlisted: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: <CheckCircle2 size={16} /> },
    rejected: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: <XCircle size={16} /> },
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: 0 }}>My Applications</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>Track the progress of your active job applications.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
          {['all', 'applied', 'shortlisted', 'rejected'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{ 
                padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                background: activeTab === tab ? '#a855f7' : 'transparent',
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
            placeholder="Search applied jobs or companies..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '12px 12px 12px 48px', color: 'white', fontSize: '14px' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filtered.map((app) => (
          <div key={app._id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
              <div style={{ width: '54px', height: '54px', background: 'rgba(168,85,247,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                <Building2 size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: 0 }}>{app.job?.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#a855f7' }}>{app.employer?.companyName}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b' }}><MapPin size={14} /> {app.job?.location}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b' }}><Calendar size={14} /> {new Date(app.appliedAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '12px', 
                fontSize: '13px', fontWeight: '700', background: statusColors[app.status]?.bg, color: statusColors[app.status]?.color
              }}>
                {statusColors[app.status]?.icon}
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </div>
              <button style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                View Job <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#475569' }}>
            <AlertCircle size={48} style={{ margin: '0 auto 16px', opacity: 0.2 }} />
            <div>No applications found. Start applying now!</div>
          </div>
        )}
      </div>
    </div>
  );
}

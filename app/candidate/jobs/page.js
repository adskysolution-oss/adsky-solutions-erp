'use client';
import { useState, useEffect } from 'react';
import { 
  Search, MapPin, IndianRupee, Briefcase, Filter, 
  ChevronRight, Bookmark, Building2, Clock, Loader2,
  Zap, Star, ExternalLink, Grid, List as ListIcon,
  X, Send, CheckCircle2, ShieldCheck, Share2
} from 'lucide-react';

export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [applying, setApplying] = useState(false);
  const [filters, setFilters] = useState({ type: 'All', location: 'All', category: 'All' });

  async function loadJobs() {
    setLoading(true);
    try {
      const q = new URLSearchParams({
        search: searchTerm,
        type: filters.type,
        location: filters.location,
        category: filters.category
      }).toString();
      const res = await fetch(`/api/candidate/jobs?${q}`);
      const data = await res.json();
      if (res.ok) setJobs(data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => loadJobs(), 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, filters]);

  const handleApply = async (jobId) => {
    setApplying(true);
    try {
      const user = JSON.parse(localStorage.getItem('candidateUser') || '{}');
      const res = await fetch('/api/candidate/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, candidateId: user._id }),
      });
      if (res.ok) {
        alert('Application submitted successfully! 🚀');
        setShowDrawer(false);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to apply');
      }
    } catch {
      alert('Error submitting application');
    }
    setApplying(false);
  };

  const openDetails = (job) => {
    setSelectedJob(job);
    setShowDrawer(true);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', margin: 0, letterSpacing: '-0.02em' }}>Job Explorer</h1>
          <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>Find your next career move from {jobs.length} active opportunities.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
          <input 
            type="text" 
            placeholder="Search by job title, company, or skills..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '16px 16px 16px 48px', color: 'white', fontSize: '15px' }}
          />
        </div>
        <select 
           value={filters.type} 
           onChange={e => setFilters({...filters, type: e.target.value})}
           style={{ padding: '0 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', color: '#94a3b8', fontSize: '14px', outline: 'none' }}
        >
          <option value="All">Job Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader2 size={40} className="animate-spin text-purple-500" /></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {jobs.map(job => (
            <div key={job._id} onClick={() => openDetails(job)} style={{ 
               background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '28px', padding: '28px', cursor: 'pointer', transition: 'all 0.3s'
            }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ width: '52px', height: '52px', background: 'rgba(168,85,247,0.1)', color: '#a855f7', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <Building2 size={24} />
                  </div>
                  <div style={{ padding: '4px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#64748b', fontSize: '11px', fontWeight: '800' }}>{job.jobType}</div>
               </div>
               <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: '0 0 6px' }}>{job.title}</h3>
               <div style={{ fontSize: '14px', color: '#a855f7', fontWeight: '700', marginBottom: '20px' }}>{job.companyName}</div>
               
               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8', background: 'rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: '10px' }}><MapPin size={14} /> {job.location}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '6px 12px', borderRadius: '10px', fontWeight: '700' }}><IndianRupee size={12} /> {job.salary}</div>
               </div>

               <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '11px', color: '#475569' }}>Posted {new Date(job.createdAt).toLocaleDateString()}</div>
                  <div style={{ color: '#a855f7' }}><ChevronRight size={18} /></div>
               </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide-over Job Details Drawer */}
      {showDrawer && selectedJob && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
           <div onClick={() => setShowDrawer(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
           <div style={{ position: 'relative', width: '500px', height: '100%', background: '#0d1224', borderLeft: '1px solid rgba(255,255,255,0.08)', padding: '40px', overflowY: 'auto', animation: 'slideRight 0.3s ease' }}>
              <button onClick={() => setShowDrawer(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', padding: '8px', borderRadius: '12px', cursor: 'pointer' }}><X size={20} /></button>
              
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                 <div style={{ width: '80px', height: '80px', background: 'rgba(168,85,247,0.1)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', margin: '0 auto 24px' }}>
                    <Building2 size={32} />
                 </div>
                 <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white', margin: '0 0 8px' }}>{selectedJob.title}</h2>
                 <p style={{ color: '#a855f7', fontWeight: '700', margin: 0 }}>{selectedJob.companyName}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
                 <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: '800', textTransform: 'uppercase', marginBottom: '4px' }}>Location</div>
                    <div style={{ fontSize: '14px', color: 'white', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> {selectedJob.location}</div>
                 </div>
                 <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: '800', textTransform: 'uppercase', marginBottom: '4px' }}>Salary</div>
                    <div style={{ fontSize: '14px', color: '#10b981', fontWeight: '700' }}>{selectedJob.salary}</div>
                 </div>
              </div>

              <div style={{ marginBottom: '40px' }}>
                 <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}><Zap size={18} color="#f59e0b" /> Career Requirements</h4>
                 <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{selectedJob.description}</div>
              </div>

              <div style={{ position: 'sticky', bottom: '-40px', background: '#0d1224', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '12px' }}>
                 <button onClick={() => handleApply(selectedJob._id)} disabled={applying} style={{ flex: 2, padding: '16px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    {applying ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    {applying ? 'Sending...' : 'Apply Now'}
                 </button>
                 <button style={{ flex: 1, padding: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', color: '#94a3b8', cursor: 'pointer' }}>
                    <Bookmark size={20} />
                 </button>
              </div>
           </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}

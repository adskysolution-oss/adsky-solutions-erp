'use client';
import { useState, useEffect } from 'react';
import { 
  Search, MapPin, IndianRupee, Briefcase, Filter, 
  ChevronRight, Bookmark, Building2, Clock, Loader2,
  Zap, Star, ExternalLink, Grid, List as ListIcon
} from 'lucide-react';

export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({ type: 'All', location: 'All' });

  async function loadJobs() {
    try {
      const res = await fetch('/api/candidate/jobs'); // Publicly visible active jobs
      const data = await res.json();
      setJobs(data.data || []);
    } catch {
      // Demo Data
      setJobs([
        { _id: '1', title: 'Senior Web Developer', companyName: 'AdSky Solution', location: 'Remote', salary: '₹80K - ₹1.2L', jobType: 'Full Time', createdAt: '2026-04-03' },
        { _id: '2', title: 'HR Manager', companyName: 'BuildFast', location: 'Delhi, India', salary: '₹50K - ₹70K', jobType: 'Full Time', createdAt: '2026-04-02' },
        { _id: '3', title: 'UX Designer', companyName: 'CreativePixel', location: 'Bangalore', salary: '₹60K - ₹90K', jobType: 'Part Time', createdAt: '2026-04-01' },
      ]);
    }
    setLoading(false);
  }

  useEffect(() => { loadJobs(); }, []);

  const filteredJobs = jobs.filter(job => 
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     job.companyName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filters.type === 'All' || job.jobType === filters.type)
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: 0 }}>Discover Opportunities</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>Showing {filteredJobs.length} active jobs matched for you.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => setViewMode('grid')} style={{ padding: '8px', borderRadius: '10px', background: viewMode === 'grid' ? 'rgba(168,85,247,0.1)' : 'transparent', border: 'none', color: viewMode === 'grid' ? '#a855f7' : '#475569', cursor: 'pointer' }}><Grid size={18} /></button>
          <button onClick={() => setViewMode('list')} style={{ padding: '8px', borderRadius: '10px', background: viewMode === 'list' ? 'rgba(168,85,247,0.1)' : 'transparent', border: 'none', color: viewMode === 'list' ? '#a855f7' : '#475569', cursor: 'pointer' }}><ListIcon size={18} /></button>
        </div>
      </div>

      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
          <input 
            type="text" 
            placeholder="Search by job title, company, or keywords..." 
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
          <option value="All">Job Type: All</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Remote">Remote</option>
        </select>
        <button style={{ padding: '0 24px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '18px', color: '#a855f7', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Job Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr', gap: '20px' }}>
        {filteredJobs.map((job) => (
          <div key={job._id} style={{ 
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '24px', transition: 'all 0.3s ease', cursor: 'pointer',
            position: 'relative', overflow: 'hidden'
          }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ width: '54px', height: '54px', background: 'rgba(168,85,247,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                <Building2 size={24} />
              </div>
              <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}><Bookmark size={20} /></button>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', marginBottom: '6px' }}>{job.title}</h3>
            <div style={{ fontSize: '14px', color: '#a855f7', fontWeight: '700', marginBottom: '16px' }}>{job.companyName}</div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', background: 'rgba(255,255,255,0.04)', padding: '5px 12px', borderRadius: '10px' }}><MapPin size={14} /> {job.location}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981', background: 'rgba(16,185,129,0.08)', padding: '5px 12px', borderRadius: '10px', fontWeight: '700' }}><IndianRupee size={14} /> {job.salary}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', background: 'rgba(255,255,255,0.04)', padding: '5px 12px', borderRadius: '10px' }}><Clock size={14} /> {job.jobType}</div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '11px', color: '#475569' }}>Posted {new Date(job.createdAt).toLocaleDateString()}</div>
              <button style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '13px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                View Details <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

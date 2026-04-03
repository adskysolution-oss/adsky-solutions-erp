'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Building2, MapPin, IndianRupee, Clock, 
  Briefcase, Calendar, CheckCircle, Share2, Bookmark,
  Zap, Shield, Globe, Send, Loader2, AlertCircle
} from 'lucide-react';

export default function JobDetails() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function loadJob() {
    try {
      const res = await fetch('/api/candidate/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (res.ok) setJob(data.data);
      else setError(data.error || 'Job not found');
    } catch {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadJob(); }, [slug]);

  const handleApply = async () => {
    setApplying(true);
    try {
      const candidate = JSON.parse(localStorage.getItem('candidateUser'));
      const res = await fetch('/api/candidate/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: job._id, candidateId: candidate?._id, employerId: job.employerId }),
      });
      if (res.ok) setApplied(true);
      else alert('Failed to apply. Please try again.');
    } catch {
      alert('Error during application.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <Loader2 size={40} className="animate-spin" color="#a855f7" />
    </div>
  );

  if (error || !job) return (
    <div style={{ textAlign: 'center', padding: '100px 20px', color: '#f87171' }}>
      <AlertCircle size={48} style={{ margin: '0 auto 20px' }} />
      <h2>{error || 'Job post not found'}</h2>
      <button onClick={() => router.push('/candidate/jobs')} style={{ marginTop: '20px', padding: '10px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>Back to Jobs</button>
    </div>
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={() => router.push('/candidate/jobs')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '14px', fontWeight: '600' }}>
        <ArrowLeft size={16} /> Back to Listings
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Main Info */}
        <div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '32px', padding: '40px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '32px' }}>
              <div style={{ width: '80px', height: '80px', background: 'rgba(168,85,247,0.1)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                <Building2 size={40} />
              </div>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'white', margin: 0, lineHeight: '1.2' }}>{job.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#a855f7' }}>{job.companyName}</div>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#475569' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '15px' }}><MapPin size={16} /> {job.location}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '24px 0', marginBottom: '32px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#475569', fontWeight: '700', textTransform: 'uppercase' }}>Salary</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#10b981', marginTop: '4px' }}>{job.salary}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#475569', fontWeight: '700', textTransform: 'uppercase' }}>Experience</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'white', marginTop: '4px' }}>{job.experience || 'Not Specified'}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#475569', fontWeight: '700', textTransform: 'uppercase' }}>Job Type</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'white', marginTop: '4px' }}>{job.jobType}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#475569', fontWeight: '700', textTransform: 'uppercase' }}>Openings</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'white', marginTop: '4px' }}>{job.openings} Positions</div>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>Job Description</h3>
              <div style={{ fontSize: '15px', color: '#94a3b8', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                {job.description}
              </div>
            </div>

            {job.skillsRequired && job.skillsRequired.length > 0 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>Required Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {job.skillsRequired.map((skill, i) => (
                    <div key={i} style={{ padding: '8px 16px', background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: '12px', color: '#a855f7', fontSize: '13px', fontWeight: '600' }}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px', position: 'sticky', top: '96px' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Application Status</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginTop: '4px' }}>Currently Accepting</div>
            </div>

            {applied ? (
              <div style={{ padding: '20px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', color: '#10b981', fontSize: '15px', fontWeight: '700' }}>
                <CheckCircle size={24} /> Already Applied
              </div>
            ) : (
              <button 
                onClick={handleApply}
                disabled={applying}
                style={{ width: '100%', padding: '18px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 20px 25px -10px rgba(168,85,247,0.4)', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {applying ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                {applying ? 'Applying...' : 'Apply for This Job'}
              </button>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', fontWeight: '600' }}><Bookmark size={18} /> Save</button>
              <button style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', fontWeight: '600' }}><Share2 size={18} /> Share</button>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Shield size={18} color="#64748b" />
                <div style={{ fontSize: '13px', color: '#64748b' }}>Verified Employer</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Zap size={18} color="#f59e0b" />
                <div style={{ fontSize: '13px', color: '#64748b' }}>Quick Response Rate</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Globe size={18} color="#64748b" />
                <div style={{ fontSize: '13px', color: '#64748b' }}>Posted globally</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

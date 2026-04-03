'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Briefcase, Send, Bookmark, Star, 
  MapPin, Clock, ChevronRight, Search,
  TrendingUp, Bell, Zap, Loader2, Target,
  CheckCircle2, XCircle, Timer, GraduationCap, 
  UserCheck, Sparkles, AlertCircle
} from 'lucide-react';

export default function CandidateDashboard() {
  const [stats, setStats] = useState({ totalApplied: 0, shortlisted: 0, interviewing: 0, savedJobs: 0 });
  const [applications, setApplications] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [candidate, setCandidate] = useState(null);

  async function loadDashboard() {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('candidateUser') || '{}');
      setCandidate(user);
      if (!user?._id) return;

      const res = await fetch(`/api/candidate/stats?candidateId=${user._id}`);
      const data = await res.json();
      if (res.ok) {
        setStats(data.stats);
        setApplications(data.recentApplications || []);
        setRecommended(data.recommendedJobs || []);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => { loadDashboard(); }, []);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <Loader2 size={40} className="animate-spin text-purple-500" />
    </div>
  );

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Welcome Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', 
        borderRadius: '32px', padding: '40px', marginBottom: '40px', 
        position: 'relative', overflow: 'hidden', color: 'white',
        boxShadow: '0 20px 40px -10px rgba(168,85,247,0.3)'
      }}>
        <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', filter: 'blur(40px)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', margin: 0, letterSpacing: '-0.02em' }}>Hello, {candidate?.name || 'Dreamer'}! ✨</h1>
          <p style={{ fontSize: '16px', opacity: 0.9, marginTop: '12px', maxWidth: '500px', lineHeight: '1.6' }}>
             Your career journey is looking promising. You have {stats.totalApplied} active applications in progress.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
             <Link href="/candidate/jobs" style={{ padding: '12px 28px', background: 'white', borderRadius: '16px', color: '#6366f1', textDecoration: 'none', fontWeight: '800', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Search size={18} /> Find New Opportunities
             </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        {[
          { label: 'Applications', value: stats.totalApplied, icon: <Send size={24} />, color: '#a855f7' },
          { label: 'Shortlisted', value: stats.shortlisted, icon: <UserCheck size={24} />, color: '#10b981' },
          { label: 'Interviews', value: stats.interviewing, icon: <Target size={24} />, color: '#f59e0b' },
          { label: 'Saved Jobs', value: stats.savedJobs, icon: <Bookmark size={24} />, color: '#ec4899' },
        ].map((stat, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '28px', padding: '28px', transition: 'all 0.3s' }}>
             <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                {stat.icon}
             </div>
             <div style={{ fontSize: '32px', fontWeight: '900', color: 'white' }}>{stat.value}</div>
             <div style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '40px' }}>
        {/* Recent Applications */}
        <div>
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', margin: 0 }}>Recent Activity</h3>
              <Link href="/candidate/applied" style={{ fontSize: '13px', fontWeight: '700', color: '#a855f7', textDecoration: 'none' }}>View History</Link>
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {applications.map((app, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Briefcase size={22} color="#94a3b8" />
                      </div>
                      <div>
                         <div style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>{app.job?.title}</div>
                         <div style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>{app.job?.companyName} • {new Date(app.createdAt).toLocaleDateString()}</div>
                      </div>
                   </div>
                   <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '10px', background: 'rgba(59,130,246,0.1)', color: '#60a5fa', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                         {app.status || 'Applied'}
                      </div>
                   </div>
                </div>
              ))}
              {applications.length === 0 && <div style={{ textAlign: 'center', padding: '60px', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: '32px', color: '#475569' }}>No recent applications yet.</div>}
           </div>
        </div>

        {/* Recommended Jobs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '32px', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                 <Sparkles size={20} color="#f59e0b" />
                 <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: 0 }}>Discover Jobs</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                 {recommended.map((job, i) => (
                   <Link key={i} href={`/candidate/jobs/${job.slug || job._id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ padding: '20px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
                         <div style={{ fontSize: '15px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>{job.title}</div>
                         <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {job.companyName} • <MapPin size={12} /> {job.location}
                         </div>
                      </div>
                   </Link>
                 ))}
                 <Link href="/candidate/jobs" style={{ textAlign: 'center', marginTop: '12px', fontSize: '14px', fontWeight: '700', color: '#a855f7', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    Browse All <ArrowRight size={16} />
                 </Link>
              </div>
           </div>

           {/* Profile Complete Tip */}
           <div style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)', borderRadius: '32px', padding: '32px', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                 <CheckCircle2 size={24} />
                 <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Boost Visibility</h4>
              </div>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9, lineHeight: '1.6' }}>
                 Candidates with a complete bio are 4x more likely to be shortlisted by top companies. 
              </p>
              <Link href="/candidate/profile" style={{ marginTop: '20px', padding: '12px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '13px', fontWeight: '800', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                 Optimize Profile <ChevronRight size={16} />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRight({size}) { return <ChevronRight size={size} /> }

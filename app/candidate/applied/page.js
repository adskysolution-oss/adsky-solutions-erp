'use client';
import { useState, useEffect } from 'react';
import { 
  Send, Search, Filter, Briefcase, MapPin, 
  IndianRupee, Clock, CheckCircle2, XCircle, 
  ChevronRight, Loader2, Building2, AlertCircle, 
  Calendar, ArrowRight, MousePointer2, UserCheck,
  Zap, Timer, ChevronDown, ChevronUp
} from 'lucide-react';

export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  async function loadApplications() {
    setLoading(true);
    try {
      const candidate = JSON.parse(localStorage.getItem('candidateUser') || '{}');
      if (!candidate?._id) return;

      const res = await fetch(`/api/candidate/apply?candidateId=${candidate._id}`);
      const data = await res.json();
      if (res.ok) setApplications(data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => { loadApplications(); }, []);

  const filtered = applications.filter(a => 
    (activeTab === 'all' || (a.status || 'applied') === activeTab) &&
    (a.job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     a.employer?.companyName?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const statusMap = {
    applied: { label: 'Application Sent', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', icon: <Send size={14} />, desc: 'Your application has been received by the recruiter.' },
    shortlisted: { label: 'Shortlisted', color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: <UserCheck size={14} />, desc: 'The recruiter liked your profile! You are one step closer.' },
    interview: { label: 'Interview Scheduled', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: <Timer size={14} />, desc: 'Check your email for the interview invite link.' },
    rejected: { label: 'Not Selected', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: <XCircle size={14} />, desc: 'Better luck next time! Keep hunting for your dream job.' },
    hired: { label: 'Successfully Hired', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', icon: <CheckCircle2 size={14} />, desc: 'Congratulations on your new role! 🚀' },
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', margin: 0, letterSpacing: '-0.02em' }}>Application History</h1>
          <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>Real-time status tracking for all your submitted applications.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
           {['all', 'applied', 'shortlisted', 'rejected'].map(tab => (
             <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: '800', border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: activeTab === tab ? '#a855f7' : 'transparent', color: activeTab === tab ? 'white' : '#64748b', textTransform: 'capitalize' }}>
                {tab}
             </button>
           ))}
        </div>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
           <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
           <input type="text" placeholder="Filter by company or role..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '14px 14px 14px 48px', color: 'white', fontSize: '14px' }} />
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader2 size={40} className="animate-spin text-purple-500" /></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {filtered.map(app => {
            const status = statusMap[app.status || 'applied'] || statusMap.applied;
            const isExpanded = expandedId === app._id;
            
            return (
              <div key={app._id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '32px', overflow: 'hidden', transition: 'all 0.3s' }}>
                <div style={{ padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1 }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(168,85,247,0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                      <Building2 size={28} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', margin: '0 0 6px' }}>{app.job?.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                         <div style={{ fontSize: '14px', fontWeight: '700', color: '#a855f7' }}>{app.employer?.companyName}</div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569' }}><MapPin size={14} /> {app.job?.location}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    <div style={{ textAlign: 'right' }}>
                       <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '12px', background: status.bg, color: status.color, fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>
                          {status.icon} {status.label}
                       </div>
                       <div style={{ fontSize: '12px', color: '#475569', marginTop: '6px' }}>Updated {new Date(app.createdAt).toLocaleDateString()}</div>
                    </div>
                    <button onClick={() => setExpandedId(isExpanded ? null : app._id)} style={{ padding: '12px', background: 'rgba(255,255,255,0.04)', border: 'none', borderRadius: '14px', color: '#94a3b8', cursor: 'pointer' }}>
                       {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ padding: '0 32px 32px', animation: 'fadeIn 0.3s ease' }}>
                     <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                           <Clock size={16} color="#a855f7" /> Application Journey
                        </h4>
                        <div style={{ display: 'flex', gap: '24px' }}>
                           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '50%' }} />
                              <div style={{ width: '2px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />
                              <div style={{ width: '12px', height: '12px', background: app.status !== 'applied' ? status.color : 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
                           </div>
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                              <div>
                                 <div style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>Submitted Application</div>
                                 <div style={{ fontSize: '12px', color: '#475569' }}>{new Date(app.createdAt).toLocaleString()}</div>
                              </div>
                              <div>
                                 <div style={{ fontSize: '14px', fontWeight: '700', color: app.status !== 'applied' ? status.color : '#475569' }}>{status.label}</div>
                                 <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{status.desc}</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px dashed rgba(255,255,255,0.1)' }}>
               <AlertCircle size={48} color="#475569" style={{ marginBottom: '16px', opacity: 0.3 }} />
               <h3 style={{ color: '#94a3b8', margin: '0' }}>No applications found</h3>
               <p style={{ color: '#475569', fontSize: '14px', marginTop: '8px' }}>Your job applications will appear here once you start applying.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

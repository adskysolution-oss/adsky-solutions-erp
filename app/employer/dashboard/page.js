'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PlusCircle, Users, Briefcase, TrendingUp, CheckCircle, Clock, 
  ArrowUpRight, ArrowRight, UserCheck, MessageSquare, AlertCircle, 
  Zap, Loader2, CreditCard, PieChart as PieIcon, Layout, Search,
  Calendar, Building2, ChevronRight, Star
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, AreaChart, Area 
} from 'recharts';

const chartData = [
  { name: 'Mon', apps: 12 },
  { name: 'Tue', apps: 19 },
  { name: 'Wed', apps: 15 },
  { name: 'Thu', apps: 22 },
  { name: 'Fri', apps: 30 },
  { name: 'Sat', apps: 8 },
  { name: 'Sun', apps: 10 },
];

export default function EmployerDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ activeJobs: 0, totalApplicants: 0, shortlisted: 0, pendingJobs: 0 });
  const [activities, setActivities] = useState([]);
  const [employer, setEmployer] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('employerUser') || '{}');
    setEmployer(user);
    loadDashboard(user._id);
  }, []);

  async function loadDashboard(employerId) {
    if (!employerId) {
        setLoading(false);
        return;
    }
    try {
      const res = await fetch(`/api/employer/stats?employerId=${employerId}`);
      const data = await res.json();
      if (res.ok) {
        setStats(data.stats);
        setActivities(data.activity || []);
      }
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  }

  const quickActions = [
    { label: 'Post a New Job', icon: <PlusCircle size={20} />, link: '/employer/jobs/new', color: '#10b981' },
    { label: 'Manage Jobs', icon: <Layout size={20} />, link: '/employer/jobs', color: '#3b82f6' },
    { label: 'Search Talent', icon: <Search size={20} />, link: '/jobs', color: '#8b5cf6' },
    { label: 'Company Profile', icon: <Building2 size={20} />, link: '/employer/profile', color: '#f59e0b' },
  ];

  if (loading) return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 size={40} className="animate-spin text-green-500" />
    </div>
  );

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', margin: 0, letterSpacing: '-0.02em' }}>
            Welcome back, {employer?.name?.split(' ')[0] || 'Partner'}! 👋
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', marginTop: '8px' }}>
             Here is your recruitment performance for this week.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
           <div style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <CreditCard size={18} />
              </div>
              <div>
                 <div style={{ fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Current Plan</div>
                 <div style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>Premium Pro</div>
              </div>
           </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {[
          { label: 'Active Openings', value: stats.activeJobs, sub: `${stats.pendingJobs} pending`, icon: <Briefcase />, color: '#10b981' },
          { label: 'Total Applicants', value: stats.totalApplicants, sub: '+12% from last month', icon: <Users />, color: '#3b82f6' },
          { label: 'Shortlisted', value: stats.shortlisted, sub: 'Needs interview', icon: <UserCheck />, color: '#8b5cf6' },
          { label: 'Success Rate', value: '84%', sub: 'Hiring efficiency', icon: <PieIcon />, color: '#ec4899' },
        ].map((stat, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '28px', padding: '28px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '80px', height: '80px', background: `${stat.color}15`, filter: 'blur(30px)', borderRadius: '50%' }} />
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
               {stat.icon}
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>{stat.value}</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', marginBottom: '4px' }}>{stat.label}</div>
            <div style={{ fontSize: '12px', color: '#475569' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Left Column: Chart & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           {/* Chart Container */}
           <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '32px', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                   <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: 0 }}>Application Velocity</h3>
                   <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>Daily candidate influx across all active postings.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                   <div style={{ padding: '8px 16px', background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <TrendingUp size={14} /> +24% Velocity
                   </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#0e1528', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} />
                  <Area type="monotone" dataKey="apps" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>

           {/* Quick Actions Grid */}
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {quickActions.map((action, i) => (
                <Link key={i} href={action.link} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '24px', textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: `${action.color}15`, color: action.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                       {action.icon}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>{action.label}</div>
                  </div>
                </Link>
              ))}
           </div>
        </div>

        {/* Right Column: Activity & Upcoming Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Recent Activity */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '32px', padding: '32px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
               <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: 0 }}>Global Feed</h3>
               <Link href="/employer/applicants" style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', textDecoration: 'none' }}>Live View</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {activities.map((activity, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap size={18} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{activity.text}</div>
                    <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>{new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Today</div>
                  </div>
                </div>
              ))}
              {activities.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: '#475569' }}>No recent activity.</div>}
            </div>
            <Link href="/employer/applicants" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px', marginTop: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', color: '#94a3b8', fontSize: '13px', fontWeight: '700', textDecoration: 'none' }}>
               View Full Tracker <ChevronRight size={16} />
            </Link>
          </div>

          {/* Hiring Tip Card */}
          <div style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', borderRadius: '32px', padding: '32px', color: 'white', position: 'relative', overflow: 'hidden' }}>
             <Star size={60} style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.2 }} />
             <h4 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px' }}>Recruiter Tip</h4>
             <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: '1.6', margin: 0 }}>
                High-quality candidates prefer detailed job descriptions. Adding "Benefits" can increase application rate by 30%.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

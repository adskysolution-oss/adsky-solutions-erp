'use client';
import { useState, useEffect } from 'react';
import { 
  PlusCircle, Users, Briefcase, TrendingUp, CheckCircle, Clock, 
  ArrowUpRight, ArrowRight, UserCheck, MessageSquare, AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Mon', apps: 12 },
  { name: 'Tue', apps: 19 },
  { name: 'Wed', apps: 15 },
  { name: 'Thu', apps: 22 },
  { name: 'Fri', apps: 30 },
  { name: 'Sat', apps: 8 },
  { name: 'Sun', apps: 10 },
];

function StatCard({ icon: Icon, label, value, color, bg, subtitle }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: bg, opacity: 0.1, borderRadius: '0 24px 0 100px' }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ width: '48px', height: '48px', background: bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={24} color={color} strokeWidth={2.5} />
        </div>
        <div style={{ fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#64748b' }}>LAST 7 DAYS</div>
      </div>
      <div style={{ fontSize: '32px', fontWeight: '900', color: 'white', marginBottom: '4px' }}>{value}</div>
      <div style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8' }}>{label}</div>
      {subtitle && <div style={{ fontSize: '12px', color: '#475569', marginTop: '8px' }}>{subtitle}</div>}
    </div>
  );
}

export default function EmployerDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ activeJobs: 3, totalApps: 48, shortlisted: 12, views: 2400 });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid rgba(16,185,129,0.1)', borderTopColor: '#10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0, color: 'white' }}>Recruitment Dashboard</h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Manage your job posts and track applicants in real-time.</p>
        </div>
        <a href="/employer/jobs/new" style={{ textDecoration: 'none', padding: '14px 24px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 15px -3px rgba(16,185,129,0.3)' }}>
          <PlusCircle size={20} />
          Create Job Posting
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <StatCard icon={Briefcase} label="Active Jobs" value={stats.activeJobs} color="#10b981" bg="rgba(16,185,129,0.2)" subtitle="2 expiring soon" />
        <StatCard icon={Users} label="Total Applicants" value={stats.totalApps} color="#3b82f6" bg="rgba(59,130,246,0.2)" subtitle="+8 new today" />
        <StatCard icon={UserCheck} label="Shortlisted" value={stats.shortlisted} color="#8b5cf6" bg="rgba(139,92,246,0.2)" subtitle="25% conversion rate" />
        <StatCard icon={TrendingUp} label="Total Views" value="2.4K" color="#ec4899" bg="rgba(236,72,153,0.2)" subtitle="Top in category" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Application Stats Chart */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <div style={{ fontWeight: '800', fontSize: '18px', color: 'white' }}>Application Inflow</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>Candidate applications received this week</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                Daily Applicants
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} />
              <Bar dataKey="apps" radius={[6, 6, 0, 0]} barSize={36}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 4 ? '#10b981' : 'rgba(16,185,129,0.3)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Recent Activity */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
          <div style={{ fontWeight: '800', fontSize: '18px', color: 'white', marginBottom: '24px' }}>Recent Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { icon: MessageSquare, text: 'New application for Senior Web Dev', time: '2m ago', color: '#10b981' },
              { icon: CheckCircle, text: 'You shortlisted Amit Sharma', time: '1h ago', color: '#3b82f6' },
              { icon: AlertCircle, text: 'Job "UX Designer" is about to expire', time: '4h ago', color: '#f59e0b' },
              { icon: Users, text: '12 new candidates viewed your profile', time: '1d ago', color: '#8b5cf6' },
            ].map((activity, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${activity.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <activity.icon size={18} color={activity.color} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>{activity.text}</div>
                  <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
          <button style={{ width: '100%', marginTop: '32px', padding: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: '#94a3b8', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            View Full Activity
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

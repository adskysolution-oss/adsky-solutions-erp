'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, Target, Briefcase, UserCheck, 
  TrendingUp, TrendingDown, Clock, CheckCircle2,
  AlertCircle, ChevronRight, Zap, ArrowUpRight,
  Download, Filter, RefreshCcw, Loader2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area,
  LineChart, Line, Cell, PieChart, Pie
} from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/global-stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setActivity(data.activity || []);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const statCards = [
    { title: 'Total Employees', value: stats?.totalEmployees || 0, icon: <Users size={20} />, color: '#3b82f6', link: '/admin/employees', sub: 'Active staff' },
    { title: 'Total Leads', value: stats?.totalLeads || 0, icon: <Target size={20} />, color: '#f59e0b', link: '/admin/leads', sub: 'Sales pipeline' },
    { title: 'Projects', value: 28, icon: <Briefcase size={20} />, color: '#8b5cf6', link: '/admin/projects', sub: 'In progress' },
    { title: 'Candidates', value: stats?.candidates || 0, icon: <UserCheck size={20} />, color: '#10b981', link: '/admin/jobs', sub: 'Active talent' },
  ];

  if (loading) return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 size={40} className="animate-spin text-blue-500" />
    </div>
  );

  return (
    <div style={{ padding: '0 0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: 0 }}>Dashboard</h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Welcome back! Here's what's happening today.</p>
        </div>
        <button 
          onClick={loadData}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
        >
          <RefreshCcw size={16} />
          Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {statCards.map((card, i) => (
          <Link key={i} href={card.link} style={{ textDecoration: 'none' }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '24px', 
              transition: 'all 0.3s', cursor: 'pointer', position: 'relative', overflow: 'hidden' 
            }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '60px', height: '60px', borderRadius: '50%', background: `${card.color}10`, filter: 'blur(20px)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${card.color}15`, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {card.icon}
                </div>
                <div style={{ color: '#10b981', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUp size={14} /> 8%
                </div>
              </div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>{card.value}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', marginBottom: '2px' }}>{card.title}</div>
              <div style={{ fontSize: '12px', color: '#475569' }}>{card.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Activity Feed */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'white', margin: 0 }}>Recent Activity</h3>
            <button style={{ color: '#3b82f6', background: 'none', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activity.length > 0 ? activity.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#3b82f615', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: 'white', fontWeight: '500' }}>{item.text}</div>
                  <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>{new Date(item.time).toLocaleTimeString()} • Just now</div>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#475569' }}>No recent activity.</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', borderRadius: '24px', padding: '24px', color: 'white', position: 'relative' }}>
             <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 8px' }}>AdSky ERP Pro</h3>
             <p style={{ fontSize: '13px', opacity: 0.9, marginBottom: '20px' }}>Unlock advanced analytics and team tracking features.</p>
             <button style={{ padding: '12px 24px', background: 'white', border: 'none', borderRadius: '12px', color: '#3b82f6', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Upgrade Now</button>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'white', marginBottom: '16px' }}>Employee Status</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#94a3b8' }}>Total Sales Team</span>
                <span style={{ color: 'white', fontWeight: '700' }}>12</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#94a3b8' }}>Active Now</span>
                <span style={{ color: '#10b981', fontWeight: '700' }}>8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

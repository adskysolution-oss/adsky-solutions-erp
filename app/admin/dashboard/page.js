'use client';
import { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, Target, Briefcase, TrendingUp, IndianRupee, UserCheck, Clock, CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

const monthlyData = [
  { month: 'Oct', revenue: 45000, leads: 28, conversions: 8 },
  { month: 'Nov', revenue: 62000, leads: 35, conversions: 12 },
  { month: 'Dec', revenue: 55000, leads: 30, conversions: 10 },
  { month: 'Jan', revenue: 78000, leads: 45, conversions: 18 },
  { month: 'Feb', revenue: 91000, leads: 52, conversions: 22 },
  { month: 'Mar', revenue: 85000, leads: 48, conversions: 20 },
  { month: 'Apr', revenue: 110000, leads: 61, conversions: 28 },
];

const leadStatusData = [
  { name: 'Converted', value: 28, color: '#10b981' },
  { name: 'Interested', value: 15, color: '#3b82f6' },
  { name: 'Contacted', value: 22, color: '#f59e0b' },
  { name: 'No Response', value: 18, color: '#6b7280' },
  { name: 'Not Interested', value: 8, color: '#ef4444' },
];

const recentLeads = [
  { name: 'Rahul Sharma', company: 'TechCorp', source: 'Website', status: 'Interested', time: '2h ago' },
  { name: 'Priya Singh', company: 'StartupXYZ', source: 'Facebook', status: 'Contacted', time: '4h ago' },
  { name: 'Amit Kumar', company: 'RetailCo', source: 'WhatsApp', status: 'New', time: '6h ago' },
  { name: 'Neha Gupta', company: 'HealthPlus', source: 'Website', status: 'Converted', time: '1d ago' },
  { name: 'Vikram Patel', company: 'EduTech', source: 'Facebook', status: 'No Response', time: '2d ago' },
];

const statusColor = { 'New': '#3b82f6', 'Contacted': '#f59e0b', 'Interested': '#10b981', 'Converted': '#22c55e', 'No Response': '#6b7280', 'Not Interested': '#ef4444' };

function StatCard({ icon: Icon, label, value, sub, change, color, bg }) {
  const isUp = change > 0;
  return (
    <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', borderRadius: '0 16px 0 80px', background: bg, opacity: 0.15 }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} color={color} strokeWidth={2} />
        </div>
        {change !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '600', color: isUp ? '#10b981' : '#ef4444' }}>
            {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div style={{ fontSize: '28px', fontWeight: '800', color: 'white', letterSpacing: '-0.5px' }}>{value}</div>
      <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px', fontWeight: '500' }}>{label}</div>
      {sub && <div style={{ fontSize: '11px', color: '#475569', marginTop: '6px' }}>{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadStats() {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data);
    } catch {
      // Use demo data if API fails
      setStats({
        employees: { total: 12, active: 10 },
        leads: { total: 91, pending: 40, noResponse: 18 },
        projects: { total: 24, active: 8, sold: 14, pending: 2 },
        revenue: { total: 526000, monthly: 110000, today: 12500 },
        candidates: { total: 340, todayApplied: 18 },
      });
    }
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => { loadStats(); }, []);

  const handleRefresh = () => { setRefreshing(true); loadStats(); };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid rgba(59,130,246,0.2)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ color: '#475569', fontSize: '14px' }}>Loading dashboard...</div>
    </div>
  );

  const s = stats;

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: 0 }}>Dashboard</h1>
          <p style={{ color: '#475569', fontSize: '13px', margin: '4px 0 0' }}>Welcome back! Here's what's happening today.</p>
        </div>
        <button onClick={handleRefresh} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '10px', color: '#60a5fa', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>
          <RefreshCw size={14} style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatCard icon={Users} label="Total Employees" value={s?.employees?.total || 0} sub={`${s?.employees?.active || 0} active`} change={8} color="#3b82f6" bg="rgba(59,130,246,0.2)" />
        <StatCard icon={Target} label="Total Leads" value={s?.leads?.total || 0} sub={`${s?.leads?.pending || 0} pending`} change={15} color="#f59e0b" bg="rgba(245,158,11,0.2)" />
        <StatCard icon={Briefcase} label="Projects" value={s?.projects?.total || 0} sub={`${s?.projects?.active || 0} active • ${s?.projects?.sold || 0} sold`} change={5} color="#8b5cf6" bg="rgba(139,92,246,0.2)" />
        <StatCard icon={UserCheck} label="Candidates" value={s?.candidates?.total || 0} sub={`${s?.candidates?.todayApplied || 0} applied today`} change={22} color="#10b981" bg="rgba(16,185,129,0.2)" />
        <StatCard icon={IndianRupee} label="Total Revenue" value={`₹${((s?.revenue?.total || 0) / 1000).toFixed(0)}K`} sub={`₹${((s?.revenue?.monthly || 0) / 1000).toFixed(0)}K this month`} change={18} color="#ec4899" bg="rgba(236,72,153,0.2)" />
        <StatCard icon={Clock} label="Today Revenue" value={`₹${((s?.revenue?.today || 0) / 1000).toFixed(1)}K`} sub="Live updates" change={-3} color="#f97316" bg="rgba(249,115,22,0.2)" />
        <StatCard icon={CheckCircle2} label="Converted Leads" value="28" sub="This month" change={12} color="#22c55e" bg="rgba(34,197,94,0.2)" />
        <StatCard icon={AlertCircle} label="No Response" value={s?.leads?.noResponse || 18} sub="Follow up needed" color="#6b7280" bg="rgba(107,114,128,0.2)" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {/* Revenue Chart */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: 'white' }}>Revenue & Leads</div>
              <div style={{ fontSize: '12px', color: '#475569' }}>Last 7 months performance</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
              <span style={{ color: '#3b82f6' }}>● Revenue</span>
              <span style={{ color: '#10b981' }}>● Conversions</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="conv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0d1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#revenue)" strokeWidth={2} />
              <Area type="monotone" dataKey="conversions" stroke="#10b981" fill="url(#conv)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Status Pie */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>Lead Status</div>
          <div style={{ fontSize: '12px', color: '#475569', marginBottom: '20px' }}>Distribution this month</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={leadStatusData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {leadStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0d1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            {leadStatusData.map((item) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: item.color }} />
                  <span style={{ color: '#94a3b8' }}>{item.name}</span>
                </div>
                <span style={{ color: 'white', fontWeight: '600' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Recent Leads */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: 'white' }}>Recent Leads</div>
            <a href="/admin/leads" style={{ fontSize: '12px', color: '#3b82f6', textDecoration: 'none' }}>View all →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentLeads.map((lead, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: 'white', flexShrink: 0 }}>
                    {lead.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{lead.name}</div>
                    <div style={{ fontSize: '11px', color: '#475569' }}>{lead.source} • {lead.time}</div>
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '6px', background: `${statusColor[lead.status]}20`, color: statusColor[lead.status] }}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Bar Chart */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>Monthly Leads</div>
          <div style={{ fontSize: '12px', color: '#475569', marginBottom: '20px' }}>Leads vs Conversions</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0d1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              <Bar dataKey="leads" fill="rgba(59,130,246,0.7)" radius={[4,4,0,0]} name="Leads" />
              <Bar dataKey="conversions" fill="rgba(16,185,129,0.7)" radius={[4,4,0,0]} name="Converted" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

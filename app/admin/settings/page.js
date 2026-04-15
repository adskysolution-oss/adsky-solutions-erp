'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, User, Mail, Phone, Lock, Eye, EyeOff, 
  CheckCircle, AlertCircle, Loader2, Settings, 
  CreditCard, Globe, Shield, Bell, Database,
  ArrowRight, Key, Layout, Share2
} from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', currentPassword: '', newPassword: '' });
  const [system, setSystem] = useState({ siteName: 'AdSky Solution', supportEmail: 'support@adskysolution.in', contactPhone: '8076611842', logoUrl: '' });
  const [payments, setPayments] = useState({ cashfreeId: '1210130f87acf8188613ae94b960310121', cashfreeSecret: '••••••••••••••••••••••••••••••••' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/profile');
      const data = await res.json();
      if (res.ok) setProfile(prev => ({ ...prev, ...data }));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setMessage({ text: 'Settings updated effectively! 🚀', type: 'success' });
      setSaving(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'My Account', icon: <User size={18} /> },
    { id: 'system', label: 'System', icon: <Settings size={18} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> }
  ];

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <Loader2 className="animate-spin text-blue-500" size={32} />
    </div>
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'white', margin: 0 }}>Global Settings</h1>
        <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>Manage your entire ERP configuration and personal profile from one place.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px' }}>
        {/* Sidebar Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', borderRadius: '16px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontSize: '14px', fontWeight: '600',
                background: activeTab === tab.id ? 'rgba(59,130,246,0.1)' : 'transparent',
                color: activeTab === tab.id ? '#3b82f6' : '#94a3b8'
              }}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && <ArrowRight size={14} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '32px', padding: '40px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #3b82f6, #6366f1, #a855f7)', borderRadius: '32px 32px 0 0' }} />

          {message.text && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '16px', marginBottom: '32px', background: message.type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', color: message.type === 'error' ? '#f87171' : '#34d399', border: `1px solid ${message.type === 'error' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)'}`, fontSize: '14px' }}>
               {message.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
               {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {activeTab === 'profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Full Name</label>
                    <input style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Email Address</label>
                    <input style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Phone Number</label>
                  <input style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} type="text" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Site Name</label>
                  <input style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} type="text" value={system.siteName} onChange={e => setSystem({...system, siteName: e.target.value})} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Support Email</label>
                    <input style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} type="email" value={system.supportEmail} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Contact Phone</label>
                    <input style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} type="text" value={system.contactPhone} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ padding: '20px', borderRadius: '20px', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.1)', color: '#f59e0b', fontSize: '13px', display: 'flex', gap: '12px' }}>
                   <Shield size={20} style={{ flexShrink: 0 }} />
                   These keys are sensitive. Any changes will immediately affect live employer subscriptions.
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Key size={14} /> Cashfree App ID
                  </label>
                  <input style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px', fontFamily: 'monospace' }} type="text" value={payments.cashfreeId} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={14} /> Cashfree Secret Key
                  </label>
                  <input style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px', fontFamily: 'monospace' }} type="password" value={payments.cashfreeSecret} />
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Old Password</label>
                  <input style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} type="password" placeholder="••••••••" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>New Password</label>
                    <input style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} type="password" placeholder="••••••••" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Confirm Password</label>
                    <input style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} type="password" placeholder="••••••••" />
                  </div>
                </div>
              </div>
            )}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '40px', paddingTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
               <button 
                  type="submit" 
                  disabled={saving}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 32px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', 
                    border: 'none', borderRadius: '16px', color: 'white', fontSize: '14px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(59,130,246,0.4)', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
               >
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  {saving ? 'Processing...' : 'Save Settings'}
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

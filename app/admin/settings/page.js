'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminSettings() {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', currentPassword: '', newPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  async function loadProfile() {
    try {
      const res = await fetch('/api/admin/profile');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setProfile(prev => ({ ...prev, ...data }));
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
    setLoading(false);
  }

  useEffect(() => { loadProfile(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          password: profile.newPassword || undefined
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage({ text: 'Profile updated successfully! 🚀 Please login again with new credentials.', type: 'success' });
      
      // If email changed, they likely need to re-login
      if (profile.newPassword) {
        setTimeout(() => {
          document.cookie = 'auth_token=; Max-Age=0; path=/';
          router.push('/admin/login');
        }, 3000);
      }
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
    setSaving(false);
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <Loader2 className="animate-spin" size={32} color="#3b82f6" />
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white', marginBottom: '8px' }}>Global Settings</h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Manage your account settings and update your email/password.</p>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px', overflow: 'hidden', position: 'relative' }}>
        {/* Subtle background decoration */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #3b82f6, #6366f1, #a855f7)' }} />

        {message.text && (
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '12px', 
            marginBottom: '24px', 
            background: message.type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
            border: `1px solid ${message.type === 'error' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`,
            color: message.type === 'error' ? '#f87171' : '#34d399',
            fontSize: '14px', fontWeight: '500'
          }}>
            {message.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '600' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
              <input 
                type="text" 
                value={profile.name} 
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 40px', color: 'white', fontSize: '14px', transition: 'all 0.2s' }}
                onFocus={e => (e.target.style.borderColor = '#3b82f6')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '600' }}>Email Address (Login Username)</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
              <input 
                type="email" 
                value={profile.email} 
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 40px', color: 'white', fontSize: '14px', transition: 'all 0.2s' }}
                onFocus={e => (e.target.style.borderColor = '#3b82f6')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '600' }}>Phone Number</label>
            <div style={{ position: 'relative' }}>
              <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
              <input 
                type="text" 
                value={profile.phone} 
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 40px', color: 'white', fontSize: '14px', transition: 'all 0.2s' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '600' }}>New Password (Leave blank to keep current)</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
              <input 
                type={showPass ? "text" : "password"} 
                placeholder="••••••••"
                value={profile.newPassword} 
                onChange={(e) => setProfile({...profile, newPassword: e.target.value})}
                style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 40px', color: 'white', fontSize: '14px' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ gridColumn: 'span 2', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              type="submit" 
              disabled={saving}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', 
                border: 'none', borderRadius: '14px', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s',
                boxShadow: '0 10px 15px -3px rgba(59,130,246,0.3), 0 4px 6px -2px rgba(59,130,246,0.05)',
                opacity: saving ? 0.7 : 1
              }}
              onMouseEnter={e => (e.target.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.target.style.transform = 'translateY(0)')}
            >
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {saving ? 'Saving Changes...' : 'Save All Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Safety Note */}
      <div style={{ marginTop: '24px', display: 'flex', gap: '12px', padding: '16px', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.1)', borderRadius: '16px' }}>
        <AlertCircle size={20} color="#f59e0b" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '13px', color: '#d97706', lineHeight: '1.5' }}>
          <strong>Safety Note:</strong> Changing your email or password will end your current session. You will be redirected to the login page to re-authenticate with your new credentials.
        </div>
      </div>
    </div>
  );
}

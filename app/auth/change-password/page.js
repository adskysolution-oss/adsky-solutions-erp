'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, ShieldCheck, Key, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';

function ChangePasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 2000);
      } else {
        setError(data.error || 'Failed to update password');
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle2 size={48} color="#10b981" />
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>Password Updated!</h2>
        <p style={{ color: '#94a3b8' }}>Redirecting you to the dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '420px', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '32px', padding: '40px', backdropFilter: 'blur(12px)' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
         <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', borderRadius: '18px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Key size={30} color="white" />
         </div>
         <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>Update Password</h2>
         <p style={{ color: '#475569', fontSize: '14px', marginTop: '6px' }}>For security, please set a new password on your first login.</p>
      </div>

      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {error && <div style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '12px', borderRadius: '12px', fontSize: '13px' }}>{error}</div>}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>TEMPORARY PASSWORD</label>
          <input required type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '14px', color: 'white' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>NEW PASSWORD</label>
          <div style={{ position: 'relative' }}>
            <input required type={showPass ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '14px', color: 'white' }} />
            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}>
               {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>CONFIRM NEW PASSWORD</label>
          <input required type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '14px', color: 'white' }} />
        </div>

        <button type="submit" disabled={loading} style={{ marginTop: '12px', padding: '18px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: '18px', color: 'white', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
           {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
           {loading ? 'Updating...' : 'Set New Password'}
        </button>
      </form>
    </div>
  );
}

export default function ChangePasswordPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#040712', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
         <ChangePasswordContent />
      </Suspense>
    </div>
  );
}

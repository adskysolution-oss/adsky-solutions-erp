'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ChevronRight, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminUser', JSON.stringify(data.user || { name: 'Super Admin', email: 'admin' }));
        
        if (data.user?.mustChangePassword) {
          router.push(`/auth/change-password?email=${data.user.email}`);
        } else {
          router.push('/admin/dashboard');
        }
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Connection failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
      background: '#040712', fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden'
    }}>
      {/* Background Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div style={{ width: '100%', maxWidth: '420px', padding: '24px', zIndex: 10 }}>
        {/* Logo Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            width: '64px', height: '64px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', 
            borderRadius: '20px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 20px 25px -5px rgba(59,130,246,0.4)'
          }}>
            <ShieldCheck size={32} color="white" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'white', letterSpacing: '-0.5px' }}>AD SKY ERP</h1>
          <p style={{ color: '#475569', fontSize: '14px', marginTop: '6px' }}>Super Admin Authorization Required</p>
        </div>

        {/* Login Form */}
        <div style={{ 
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', 
          borderRadius: '24px', padding: '32px', backdropFilter: 'blur(12px)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
        }}>
          {error && (
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', 
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', 
              borderRadius: '12px', color: '#f87171', fontSize: '13px', marginBottom: '24px', fontWeight: '500' 
            }}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Username or Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input 
                  required
                  type="text" 
                  placeholder="admin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ 
                    width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', 
                    borderRadius: '14px', padding: '14px 14px 14px 48px', color: 'white', fontSize: '15px'
                  }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Secret Password</label>
                <a href="#" style={{ fontSize: '12px', color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}>Forgot?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ 
                    width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', 
                    borderRadius: '14px', padding: '14px 14px 14px 48px', color: 'white', fontSize: '15px'
                  }} 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                marginTop: '12px', padding: '16px', borderRadius: '16px', 
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', 
                color: 'white', fontSize: '16px', fontWeight: '800', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                boxShadow: '0 10px 15px -3px rgba(59,130,246,0.3)', transition: 'all 0.3s'
              }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
            >
              {loading ? <Loader2 size={20} className="spinner" /> : <ChevronRight size={20} />}
              {loading ? 'Verifying Access...' : 'Sign In to Portal'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '12px', marginTop: '32px' }}>
          &copy; 2026 AdSky Solution. All systems monitored.
        </p>

        <style>{`
          .spinner { animation: spin 0.8s linear infinite; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
}

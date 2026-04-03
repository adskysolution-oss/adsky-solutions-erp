'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ChevronRight, Loader2, AlertCircle, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function CandidateLogin() {
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
        if (data.user.role !== 'candidate') {
          setError('Access denied. This portal is for job candidates only.');
          return;
        }
        localStorage.setItem('candidateUser', JSON.stringify(data.user));
        router.push('/candidate/profile');
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', borderRadius: '20px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 25px -5px rgba(168,85,247,0.3)' }}>
            <Briefcase size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'white', letterSpacing: '-0.5px' }}>AD SKY JOBS</h1>
          <p style={{ color: '#475569', fontSize: '14px', marginTop: '6px' }}>Candidate Career Portal</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px', backdropFilter: 'blur(12px)' }}>
          {error && <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', color: '#f87171', fontSize: '13px', marginBottom: '24px' }}><AlertCircle size={18} /> {error}</div>}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>REGISTERED EMAIL</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input required type="email" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px 14px 14px 48px', color: 'white', fontSize: '15px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input required type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px 14px 14px 48px', color: 'white', fontSize: '15px' }} />
              </div>
            </div>

            <button disabled={loading} style={{ marginTop: '12px', padding: '16px', borderRadius: '16px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', border: 'none', color: 'white', fontSize: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 15px -3px rgba(168,85,247,0.3)' }}>
              {loading ? <Loader2 size={20} className="spinner" /> : <ChevronRight size={20} />}
              {loading ? 'Entering Portal...' : 'Sign In to Jobs'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '14px', marginTop: '32px' }}>
          New candidate? <Link href="/candidate/register" style={{ color: '#a855f7', textDecoration: 'none', fontWeight: '700' }}>Register here</Link>
        </p>

        <style>{`.spinner { animation: spin 0.8s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

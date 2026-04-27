'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, ArrowLeft, Loader2, CheckCircle2, ChevronRight, Briefcase, Tag } from 'lucide-react';
import Link from 'next/link';

export default function CandidateRegister() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', referralCode: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRef = localStorage.getItem('adsky_referral_code');
      if (savedRef) {
        setFormData(prev => ({ ...prev, referralCode: savedRef }));
      }
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'candidate' }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/candidate/login'), 3000);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '40px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(139,92,246,0.1)', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle2 size={48} color="#a855f7" />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>Welcome Abroad!</h2>
          <p style={{ color: '#64748b', fontSize: '15px' }}>Your profile has been created. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e', fontFamily: "'Inter', sans-serif", padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', borderRadius: '20px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 25px -5px rgba(168,85,247,0.3)' }}>
            <Briefcase size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'white', letterSpacing: '-0.5px' }}>JOIN AD SKY</h1>
          <p style={{ color: '#475569', fontSize: '14px', marginTop: '6px' }}>Build your profile and apply to top jobs.</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px', backdropFilter: 'blur(12px)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>FULL NAME</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 36px', color: 'white', fontSize: '14px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>EMAIL ADDRESS</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input required type="email" placeholder="example@mail.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 36px', color: 'white', fontSize: '14px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>PHONE NUMBER</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input required placeholder="+91 XXXXXXXXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 36px', color: 'white', fontSize: '14px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>CREATE PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input required type="password" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 36px', color: 'white', fontSize: '14px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>VENDOR / REFERRAL CODE (OPTIONAL)</label>
              <div style={{ position: 'relative' }}>
                <Tag size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input placeholder="e.g. ADSKY-V001" value={formData.referralCode} onChange={e => setFormData({...formData, referralCode: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 36px', color: 'white', fontSize: '14px' }} />
              </div>
            </div>

            {error && <div style={{ fontSize: '13px', color: '#f87171', textAlign: 'center' }}>{error}</div>}

            <button disabled={loading} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 15px -3px rgba(168,85,247,0.3)', marginTop: '8px' }}>
              {loading ? <Loader2 size={20} className="animate-spin" /> : <ChevronRight size={20} />}
              {loading ? 'Processing...' : 'Register Profile'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#475569' }}>
          By joining, you agree to our <Link href="/terms" style={{ color: '#a855f7', textDecoration: 'none' }}>Terms & Privacy</Link>.
          <div style={{ marginTop: '12px' }}>
            Already have an account? <Link href="/candidate/login" style={{ color: '#a855f7', fontWeight: '700', textDecoration: 'none' }}>Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, User, Mail, Lock, Phone, ArrowLeft, Loader2, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function EmployerRegister() {
  const [formData, setFormData] = useState({ name: '', email: '', companyName: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'employer' }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/employer/login'), 3000);
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
          <div style={{ width: '80px', height: '80px', background: 'rgba(16,185,129,0.1)', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle2 size={48} color="#10b981" />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>Registration Successful!</h2>
          <p style={{ color: '#64748b', fontSize: '15px' }}>Your employer account has been created. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e', fontFamily: "'Inter', sans-serif", padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '900px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
        {/* Left Side: Branding */}
        <div style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', padding: '48px', display: 'flex', flexDirection: 'column', color: 'white', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-0.5px' }}>AD SKY SOLUTION</div>
            <div style={{ fontSize: '12px', opacity: 0.8, letterSpacing: '2px', fontWeight: 'bold', marginTop: '4px' }}>FOR EMPLOYERS</div>
          </div>
          
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1.2', marginBottom: '16px' }}>Hire top talent with AdSky Job Portal</h1>
            <p style={{ fontSize: '15px', opacity: 0.9, lineHeight: '1.6' }}>Join hundreds of companies finding their perfect match through our enterprise-grade hiring system.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3].map(i => <div key={i} style={{ width: i === 1 ? '24px' : '6px', height: '6px', borderRadius: '3px', background: 'white', opacity: i === 1 ? 1 : 0.3 }} />)}
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ padding: '48px', background: '#0d1424' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: 0 }}>Create Employer Account</h2>
            <p style={{ color: '#475569', fontSize: '14px', marginTop: '6px' }}>Ready to post your first job? Get started below.</p>
          </div>

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>FULL NAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                  <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 36px', color: 'white', fontSize: '14px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>WORK EMAIL</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                  <input required type="email" placeholder="hr@company.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 36px', color: 'white', fontSize: '14px' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>COMPANY NAME</label>
              <div style={{ position: 'relative' }}>
                <Building2 size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input required placeholder="AdSky Solutions" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 36px', color: 'white', fontSize: '14px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>PHONE NUMBER</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input required placeholder="+91 XXX XXX XXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 36px', color: 'white', fontSize: '14px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>SET PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input required type="password" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 12px 12px 36px', color: 'white', fontSize: '14px' }} />
              </div>
            </div>

            {error && <div style={{ fontSize: '13px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '6px' }}><AlertCircle size={14} /> {error}</div>}

            <button disabled={loading} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '15px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 15px -3px rgba(59,130,246,0.3)', marginTop: '10px' }}>
              {loading ? <Loader2 size={20} className="animate-spin" /> : <ChevronRight size={20} />}
              {loading ? 'Creating Account...' : 'Register Company'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#475569' }}>
              Already registered? <Link href="/employer/login" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '700' }}>Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

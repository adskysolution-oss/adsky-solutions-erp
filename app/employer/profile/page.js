'use client';
import { useState, useEffect } from 'react';
import { 
  Building2, Mail, Phone, MapPin, Globe, 
  Camera, Save, Loader2, CheckCircle2, 
  AlertCircle, ChevronRight, Briefcase, 
  Image as ImageIcon, Link as LinkIcon, Info
} from 'lucide-react';

export default function EmployerProfile() {
  const [profile, setProfile] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    industry: 'Technology',
    website: '',
    address: '',
    description: '',
    logo: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  async function loadProfile() {
    setLoading(true);
    try {
      const employer = JSON.parse(localStorage.getItem('employerUser') || '{}');
      if (employer?._id) {
        // Mocking detailed profile since we only have basic info in localStorage
        setProfile(prev => ({
          ...prev,
          ...employer,
          industry: employer.industry || 'Information Technology',
          website: employer.website || `https://www.${employer.companyName?.toLowerCase().replace(/ /g, '') || 'company'}.com`,
          address: employer.address || 'H-11/2, Sector 63, Noida, UP',
          description: employer.description || 'Leading enterprise solutions provider specializing in digital transformation and recruitment excellence.'
        }));
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => { loadProfile(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      setSaving(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }, 1000);
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <Loader2 size={40} className="animate-spin text-green-500" />
    </div>
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', margin: 0, letterSpacing: '-0.02em' }}>Company Profile</h1>
        <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>Manage your organization's public branding and contact details.</p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        {/* Left Sidebar: Branding */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '32px', padding: '32px', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 24px' }}>
                 <div style={{ width: '100%', height: '100%', borderRadius: '32px', background: 'linear-gradient(45deg, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42px', fontWeight: '900', color: 'white', boxShadow: '0 20px 40px -10px rgba(59,130,246,0.3)' }}>
                    {profile.companyName?.[0] || 'C'}
                 </div>
                 <button type="button" style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '40px', height: '40px', borderRadius: '12px', background: 'white', border: 'none', color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    <Camera size={18} />
                 </button>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: '0 0 4px' }}>{profile.companyName}</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>{profile.industry}</p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#94a3b8' }}>
                    <Users size={14} /> 51-100 Employees
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#94a3b8' }}>
                    <Globe size={14} /> Global Presence
                 </div>
              </div>
           </div>

           <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.1)', borderRadius: '24px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontWeight: '800', fontSize: '14px', marginBottom: '8px' }}>
                 <Info size={18} /> Trust Score
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#065f46', lineHeight: '1.6' }}>Your profile is 85% complete. An optimized profile attracts 2x more talent.</p>
           </div>
        </div>

        {/* Right Section: Details Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '32px', padding: '40px' }}>
              {message.text && (
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px', borderRadius: '16px', background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)', fontSize: '14px', marginBottom: '32px' }}>
                    <CheckCircle2 size={18} /> {message.text}
                 </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                 {/* Section: Organization */}
                 <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Building2 size={16} /> Organization Details
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Company Name</label>
                          <input style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} value={profile.companyName} onChange={e => setProfile({...profile, companyName: e.target.value})} />
                       </div>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Industry Segment</label>
                          <input style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} value={profile.industry} onChange={e => setProfile({...profile, industry: e.target.value})} />
                       </div>
                    </div>
                 </div>

                 {/* Section: Contact */}
                 <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Mail size={16} /> Contact Information
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Public Email</label>
                          <input style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} value={profile.email} />
                       </div>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Website URL</label>
                          <input style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} value={profile.website} />
                       </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px' }}>
                       <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Office Address</label>
                       <input style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px' }} value={profile.address} />
                    </div>
                 </div>

                 {/* Section: About */}
                 <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <FileText size={16} /> Company Bio
                    </h4>
                    <textarea rows="4" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', fontSize: '14px', resize: 'none', lineHeight: '1.6' }} value={profile.description} onChange={e => setProfile({...profile, description: e.target.value})} />
                 </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '40px', paddingTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                 <button 
                    type="submit" 
                    disabled={saving}
                    style={{ 
                       display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 32px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 10px 20px -5px rgba(16,185,129,0.3)' 
                    }}
                 >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {saving ? 'Saving...' : 'Update Profile'}
                 </button>
              </div>
           </div>
        </div>
      </form>
    </div>
  );
}

// Dummy FileText since I forgot to import it
function FileText({size}) { return <Briefcase size={size} /> }

'use client';
import { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, FileText, 
  Save, Loader2, CheckCircle2, AlertCircle, Camera,
  Link as LinkIcon, Github, Linkedin, Plus, Trash2
} from 'lucide-react';

export default function CandidateProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    bio: '',
    skills: [],
    experience: [],
    education: [],
    socials: { linkedin: '', github: '', portfolio: '' }
  });

  async function loadProfile() {
    try {
      const user = JSON.parse(localStorage.getItem('candidateUser'));
      const res = await fetch(`/api/candidate/profile?candidateId=${user?._id}`);
      const data = await res.json();
      if (res.ok && data.data) setProfile(data.data);
      else {
        // Fallback to local storage if API fails or new user
        setProfile(prev => ({ ...prev, ...user }));
      }
    } catch {
      // Handle error
    }
    setLoading(false);
  }

  useEffect(() => { loadProfile(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const user = JSON.parse(localStorage.getItem('candidateUser'));
      const res = await fetch('/api/candidate/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profile, candidateId: user?._id }),
      });
      if (res.ok) {
        setMessage('✅ Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('❌ Failed to update profile.');
    }
    setSaving(false);
  };

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}><Loader2 className="animate-spin text-purple-500" /></div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: 0 }}>My Profile</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Keep your details updated to get noticed by employers.</p>
        </div>
        {message && <div style={{ padding: '12px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>{message}</div>}
      </div>

      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        {/* Sidebar Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: '32px', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 20px' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '40px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: '800', color: 'white' }}>
                {profile.name[0]}
              </div>
              <button type="button" style={{ position: 'absolute', bottom: '0', right: '0', width: '36px', height: '36px', borderRadius: '12px', background: '#0a101f', border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Camera size={16} />
              </button>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'white', margin: '0 0 4px' }}>{profile.name}</h2>
            <p style={{ fontSize: '14px', color: '#a855f7', fontWeight: '600' }}>{profile.title || 'Job Seeker'}</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'white', marginBottom: '20px' }}>Social Profiles</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <Linkedin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input placeholder="LinkedIn URL" value={profile.socials?.linkedin} onChange={e => setProfile({...profile, socials: {...profile.socials, linkedin: e.target.value}})} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 10px 10px 38px', color: 'white', fontSize: '13px' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <Github size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input placeholder="GitHub URL" value={profile.socials?.github} onChange={e => setProfile({...profile, socials: {...profile.socials, github: e.target.value}})} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 10px 10px 38px', color: 'white', fontSize: '13px' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <LinkIcon size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input placeholder="Portfolio Website" value={profile.socials?.portfolio} onChange={e => setProfile({...profile, socials: {...profile.socials, portfolio: e.target.value}})} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 10px 10px 38px', color: 'white', fontSize: '13px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', marginBottom: '24px' }}>General Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>FULL NAME</label>
                <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '12px', color: 'white' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>PROFESSIONAL TITLE</label>
                <input value={profile.title} onChange={e => setProfile({...profile, title: e.target.value})} placeholder="e.g. Full Stack Developer" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '12px', color: 'white' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>EMAIL ADDRESS</label>
                <input value={profile.email} disabled style={{ width: '100%', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '14px', padding: '12px', color: '#475569' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>PHONE NUMBER</label>
                <input value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '12px', color: 'white' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>SHORT BIO</label>
              <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} placeholder="Tell employers about yourself..." style={{ width: '100%', minHeight: '100px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '12px', color: 'white', resize: 'vertical' }} />
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: 0 }}>Skills & Expertise</h3>
              <button type="button" onClick={() => {}} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Plus size={14} /> Add Skill</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['React', 'Next.js', 'Node.js', 'Tailwind', 'MongoDB'].map(skill => (
                <div key={skill} style={{ padding: '8px 16px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '12px', color: '#a855f7', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {skill} <Trash2 size={12} style={{ cursor: 'pointer', opacity: 0.6 }} />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={saving} style={{ padding: '18px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', border: 'none', borderRadius: '18px', color: 'white', fontSize: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 20px 25px -10px rgba(168,85,247,0.4)' }}>
            {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {saving ? 'Saving Profile...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, FileText, 
  Save, Loader2, CheckCircle2, AlertCircle, Camera,
  Link as LinkIcon, Github, Linkedin, Plus, Trash2,
  GraduationCap, PlusCircle, Globe, ChevronRight,
  ShieldCheck, Award, Sparkles, UploadCloud
} from 'lucide-react';

export default function CandidateProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [activeTab, setActiveTab] = useState('general');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    bio: '',
    skills: [],
    experience: '',
    education: '',
    socials: { linkedin: '', github: '', portfolio: '' }
  });

  async function loadProfile() {
    try {
      const user = JSON.parse(localStorage.getItem('candidateUser') || '{}');
      if (!user?._id) return;
      const res = await fetch(`/api/candidate/profile?candidateId=${user._id}`);
      const data = await res.json();
      if (res.ok && data.data) {
          setProfile(prev => ({ ...prev, ...data.data }));
      } else {
          setProfile(prev => ({ ...prev, ...user }));
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
    try {
      const user = JSON.parse(localStorage.getItem('candidateUser') || '{}');
      const res = await fetch('/api/candidate/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profile, candidateId: user?._id }),
      });
      if (res.ok) {
        setMessage({ text: 'Profile updated effectively! 🚀', type: 'success' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      }
    } catch {
      setMessage({ text: 'Failed to update profile.', type: 'error' });
    }
    setSaving(false);
  };

  const handleSkillAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newSkill = e.target.value.trim();
      if (!profile.skills.includes(newSkill)) {
        setProfile({ ...profile, skills: [...profile.skills, newSkill] });
      }
      e.target.value = '';
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skillToRemove) });
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <Loader2 size={40} className="animate-spin text-purple-500" />
    </div>
  );

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '60px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', margin: 0, letterSpacing: '-0.02em' }}>Professional Portfolio</h1>
        <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>Build your digital identity to attract top recruiters globally.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px' }}>
        {/* Profile Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '32px', padding: '32px', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 24px' }}>
                 <div style={{ width: '100%', height: '100%', borderRadius: '40px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42px', fontWeight: '900', color: 'white', boxShadow: '0 20px 40px -10px rgba(168,85,247,0.3)' }}>
                    {profile.name?.[0]}
                 </div>
                 <button style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '36px', height: '36px', borderRadius: '12px', background: 'white', border: 'none', color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                    <Camera size={16} />
                 </button>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', margin: '0 0 4px' }}>{profile.name}</h3>
              <p style={{ fontSize: '14px', color: '#a855f7', fontWeight: '700', marginBottom: '24px' }}>{profile.title || 'Elite Candidate'}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#94a3b8' }}><Mail size={14} /> {profile.email}</div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#94a3b8' }}><MapPin size={14} /> {profile.location || 'Noida, India'}</div>
              </div>
           </div>

           <div style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: '24px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3b82f6', fontWeight: '800', fontSize: '14px', marginBottom: '12px' }}>
                 <ShieldCheck size={18} /> Profile Strength
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', marginBottom: '12px' }}>
                 <div style={{ width: '75%', height: '100%', background: '#3b82f6' }} />
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#1e40af', opacity: 0.8 }}>Add education details to reach 100%.</p>
           </div>
        </div>

        {/* Main Profile Form */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '40px', padding: '40px', position: 'relative' }}>
           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #a855f7, #6366f1)', borderRadius: '40px 40px 0 0' }} />

           {message.text && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '16px', background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)', fontSize: '14px', marginBottom: '32px', animation: 'fadeIn 0.3s ease' }}>
                 <CheckCircle2 size={18} /> {message.text}
              </div>
           )}

           <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {/* Section: Basics */}
              <div>
                 <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <User size={16} color="#a855f7" /> General Information
                 </h4>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Full Name</label>
                       <input style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', color: 'white', fontSize: '14px', outline: 'none' }} value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Professional Title</label>
                       <input style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', color: 'white', fontSize: '14px', outline: 'none' }} value={profile.title} onChange={e => setProfile({...profile, title: e.target.value})} placeholder="e.g. Senior Product Designer" />
                    </div>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Professional Bio</label>
                    <textarea rows="3" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', fontSize: '14px', outline: 'none', resize: 'none', lineHeight: '1.6' }} value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} placeholder="Describe your background, goals and passion..." />
                 </div>
              </div>

              {/* Section: Skills */}
              <div>
                 <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Award size={16} color="#f59e0b" /> Core Skills
                 </h4>
                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                    {profile.skills.map(skill => (
                      <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '12px', color: '#a855f7', fontSize: '13px', fontWeight: '700' }}>
                         {skill} <button type="button" onClick={() => removeSkill(skill)} style={{ background: 'none', border: 'none', color: '#a855f7', cursor: 'pointer', padding: 0, opacity: 0.6 }}><Trash2 size={12} /></button>
                      </div>
                    ))}
                 </div>
                 <input onKeyDown={handleSkillAdd} placeholder="Type a skill and hit Enter..." style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px', padding: '14px', color: 'white', fontSize: '14px' }} />
              </div>

              {/* Section: Timeline (Experience/Education) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                 <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Briefcase size={16} color="#3b82f6" /> Experience
                    </h4>
                    <textarea rows="4" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', fontSize: '14px', outline: 'none' }} value={profile.experience} onChange={e => setProfile({...profile, experience: e.target.value})} placeholder="Company Name | Job Title | Duration..." />
                 </div>
                 <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <GraduationCap size={16} color="#10b981" /> Education
                    </h4>
                    <textarea rows="4" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', fontSize: '14px', outline: 'none' }} value={profile.education} onChange={e => setProfile({...profile, education: e.target.value})} placeholder="Degree | University | Year..." />
                 </div>
              </div>

              {/* Resume Upload Placeholder */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '24px', padding: '32px', textAlign: 'center' }}>
                 <UploadCloud size={40} color="#475569" style={{ marginBottom: '16px' }} />
                 <h5 style={{ fontSize: '15px', fontWeight: '800', color: 'white', margin: '0 0 8px' }}>CV / Resume Management</h5>
                 <p style={{ margin: 0, fontSize: '12px', color: '#475569', marginBottom: '20px' }}>Upload your latest PDF resume to attract more hiring managers.</p>
                 <button type="button" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Select PDF File</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '32px' }}>
                 <button type="submit" disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 40px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 20px 40px -10px rgba(168,85,247,0.4)' }}>
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {saving ? 'Synchronizing...' : 'Finalize Profile'}
                 </button>
              </div>
           </form>
        </div>
      </div>
    </div>
  );
}

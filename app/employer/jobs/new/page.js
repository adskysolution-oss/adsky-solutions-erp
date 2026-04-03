'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PlusCircle, Briefcase, MapPin, IndianRupee, Clock, 
  FileText, CheckCircle2, ChevronRight, Loader2, 
  AlertCircle, Building2, Layers, Zap, ChevronLeft,
  ArrowRight, Sparkles, Send, Eye
} from 'lucide-react';

export default function PostJob() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salary: '',
    jobType: 'Full Time',
    experience: '',
    description: '',
    skills: '',
    openings: 1,
    category: 'Software Development'
  });

  const router = useRouter();

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const employer = JSON.parse(localStorage.getItem('employerUser'));
      const res = await fetch('/api/employer/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, employerId: employer?._id }),
      });
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/employer/jobs'), 2000);
      }
    } catch {
      alert('Error posting job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', animation: 'fadeIn 0.5s ease' }}>
        <div style={{ width: '100px', height: '100px', background: 'rgba(16,185,129,0.1)', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 20px 40px -10px rgba(16,185,129,0.3)' }}>
          <CheckCircle2 size={56} color="#10b981" />
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'white', letterSpacing: '-0.02em' }}>Job Posted Successfully!</h2>
        <p style={{ color: '#64748b', marginTop: '16px', fontSize: '16px' }}>Your job listing has been sent for admin moderation. It will be live shortly.</p>
        <button onClick={() => router.push('/employer/dashboard')} style={{ marginTop: '40px', padding: '14px 28px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: 'white', cursor: 'pointer' }}>Go to Dashboard</button>
      </div>
    );
  }

  const steps = [
    { id: 1, title: 'Basics', icon: <Briefcase size={18} /> },
    { id: 2, title: 'Details', icon: <FileText size={18} /> },
    { id: 3, title: 'Review', icon: <Eye size={18} /> }
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', margin: 0, letterSpacing: '-0.02em' }}>Create Job Listing</h1>
          <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>Step {step} of 3 • Provide accurate details to find elite talent.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
          {steps.map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '12px', background: step === s.id ? '#10b981' : 'transparent', color: step === s.id ? 'white' : '#475569', transition: 'all 0.3s' }}>
              {s.icon} <span style={{ fontSize: '13px', fontWeight: '700' }}>{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px' }}>
        {/* Form Sections */}
        <div>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'slideInRight 0.4s ease' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '32px', padding: '40px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Layers size={20} color="#10b981" /> Primary Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>Position Title</label>
                    <input autoFocus placeholder="e.g. Lead Software Engineer" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', fontSize: '15px' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>Location</label>
                      <input placeholder="e.g. Noida / Remote" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', fontSize: '15px' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>Job Category</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', fontSize: '15px' }}>
                        <option value="Software Development">Software Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Project Management">Project Management</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={nextStep} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 32px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 10px 20px -5px rgba(16,185,129,0.3)' }}>
                  Continue to Details <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'slideInRight 0.4s ease' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '32px', padding: '40px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Zap size={20} color="#3b82f6" /> Requirements & Rewards
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>Salary Range</label>
                       <div style={{ position: 'relative' }}>
                          <IndianRupee size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                          <input placeholder="e.g. 10 - 15 LPA" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px 16px 16px 44px', color: 'white', fontSize: '15px' }} />
                       </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>Experience Required</label>
                       <input placeholder="e.g. 3+ Years" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', fontSize: '15px' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>Job Description</label>
                    <textarea placeholder="Outline the main responsibilities..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', minHeight: '180px', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', color: 'white', fontSize: '15px', lineHeight: '1.6', resize: 'vertical' }} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={prevStep} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 32px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: 'white', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                  <ChevronLeft size={18} /> Back
                </button>
                <button onClick={nextStep} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 32px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}>
                  Preview & Review <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'slideInRight 0.4s ease' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '32px', padding: '40px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>Final Confirmation</h3>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px' }}>Double check your job details before submitting for moderation.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                   {[
                     { label: 'Position', value: formData.title },
                     { label: 'Category', value: formData.category },
                     { label: 'Salary', value: formData.salary },
                     { label: 'Location', value: formData.location },
                   ].map((item, i) => (
                     <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span style={{ fontSize: '13px', color: '#475569', fontWeight: '700', textTransform: 'uppercase' }}>{item.label}</span>
                        <span style={{ fontSize: '15px', color: 'white', fontWeight: '600' }}>{item.value || 'Not specified'}</span>
                     </div>
                   ))}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={prevStep} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 32px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: 'white', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                  <ChevronLeft size={18} /> Edit Details
                </button>
                <button onClick={handleSubmit} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 40px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '16px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 20px 40px -10px rgba(16,185,129,0.4)' }}>
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                  {loading ? 'Processing...' : 'Confirm & Post'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live Preview Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '32px', padding: '32px' }}>
             <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#475569', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={16} /> LIVE CARD PREVIEW
             </h4>
             <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '24px', padding: '24px', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                   <div style={{ width: '42px', height: '42px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}><Briefcase size={22} /></div>
                   <div style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#64748b', fontSize: '11px', fontWeight: '700' }}>{formData.jobType}</div>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'white', margin: '0 0 6px' }}>{formData.title || 'Your Job Title Here'}</h3>
                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>{formData.location || 'Location Placeholder'}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                   <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', fontSize: '13px', color: '#10b981', fontWeight: '700' }}>{formData.salary}</div>
                   <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', fontSize: '13px', color: '#94a3b8', fontWeight: '700' }}>{formData.experience}</div>
                </div>
             </div>
          </div>

          <div style={{ padding: '24px', borderRadius: '24px', background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.1)', color: '#8b5cf6' }}>
             <h5 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}><Sparkles size={16} /> Premium Access</h5>
             <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.5', opacity: 0.8 }}>Featured jobs get 4x more visibility and applications from highly-rated candidates.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInRight { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
}

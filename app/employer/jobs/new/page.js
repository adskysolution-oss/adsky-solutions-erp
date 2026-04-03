'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PlusCircle, Briefcase, MapPin, IndianRupee, Clock, 
  FileText, CheckCircle2, ChevronRight, Loader2, 
  AlertCircle, Building2, Layers, Zap
} from 'lucide-react';

export default function PostJob() {
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
    openings: 1
  });

  const router = useRouter();

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
        setTimeout(() => router.push('/employer/jobs/manage'), 2000);
      }
    } catch {
      alert('Error posting job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div style={{ width: '80px', height: '80px', background: 'rgba(16,185,129,0.1)', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle2 size={48} color="#10b981" />
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>Job Posted Successfully!</h2>
        <p style={{ color: '#64748b', marginTop: '12px' }}>Your job listing has been sent for admin approval.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: 0 }}>Create Job Listing</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>Provide accurate details to find the best candidates.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Main Info */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers size={18} color="#10b981" /> General Information
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>JOB TITLE</label>
                <div style={{ position: 'relative' }}>
                  <Briefcase size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                  <input required placeholder="Senior Web Developer" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px 14px 14px 44px', color: 'white', fontSize: '15px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>JOB LOCATION</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                    <input required placeholder="Delhi / Remote" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px 14px 14px 44px', color: 'white', fontSize: '15px' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>SALARY RANGE</label>
                  <div style={{ position: 'relative' }}>
                    <IndianRupee size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                    <input required placeholder="₹50,000 - ₹80,000" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px 14px 14px 44px', color: 'white', fontSize: '15px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed JD */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={18} color="#3b82f6" /> Job Description
            </h3>
            <textarea required placeholder="Write job responsibilities, duties and requirements..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', minHeight: '200px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px', color: 'white', fontSize: '15px', resize: 'vertical', lineHeight: '1.6' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Settings */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={18} color="#f59e0b" /> Job Type & Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>EXPERIENCE REQUIRED</label>
                <input placeholder="e.g. 2+ Years" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} style={{ width: '100%', marginTop: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px', color: 'white', fontSize: '15px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>NUMBER OF OPENINGS</label>
                <input type="number" value={formData.openings} onChange={e => setFormData({...formData, openings: e.target.value})} style={{ width: '100%', marginTop: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px', color: 'white', fontSize: '15px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>EMPLOYMENT TYPE</label>
                <select value={formData.jobType} onChange={e => setFormData({...formData, jobType: e.target.value})} style={{ width: '100%', marginTop: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px', color: 'white', fontSize: '15px' }}>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px', lineHeight: '1.5' }}>
              By posting, you agree to our terms. Your job listing will be manually reviewed by our admins.
            </p>
            <button disabled={loading} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 15px -3px rgba(16,185,129,0.3)' }}>
              {loading ? <Loader2 size={20} className="animate-spin" /> : <ChevronRight size={20} />}
              {loading ? 'Publishing...' : 'Publish Job Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

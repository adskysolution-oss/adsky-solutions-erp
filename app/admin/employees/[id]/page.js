'use client';
import { useState, useEffect } from 'react';
import { 
  User, Shield, Activity, MapPin, Clock, Phone, 
  Mail, Calendar, BarChart3, PieChart, Zap, 
  Monitor, Smartphone, Globe, ExternalLink,
  ChevronLeft, MoreVertical, CheckCircle2,
  AlertCircle, Briefcase, Award, TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export default function Employee360({ params }) {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const activities = [
    { time: '09:15 AM', type: 'System Login', desc: 'Secure session established via Desktop (Delhi HQ)', icon: Monitor, color: '#3b82f6' },
    { time: '10:30 AM', type: 'Lead Conversion', desc: 'Successfully converted "Modern Retail Corp" to SQL', icon: Zap, color: '#10b981' },
    { time: '11:45 AM', type: 'On-Field Check-in', desc: 'Arrived at client location: Noida Sec-62', icon: MapPin, color: '#f59e0b' },
    { time: '01:20 PM', type: 'Project Sync', desc: 'Updated milestones for "AdSky Web V2"', icon: Briefcase, color: '#8b5cf6' },
  ];

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Activity size={40} className="animate-spin text-blue-500" /></div>;

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Breadcrumb / Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/admin/employees" style={{ padding: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', color: '#64748b', display: 'flex', border: '1px solid rgba(255,255,255,0.06)' }}>
               <ChevronLeft size={20} />
            </Link>
            <div>
               <h1 style={{ fontSize: '24px', fontWeight: '900', color: 'white', margin: 0 }}>Employee 360&deg; Intelligence</h1>
               <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Deep monitoring and telemetry for Node ID: {params.id}</p>
            </div>
         </div>
         <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '12px 24px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '14px', color: '#f87171', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>Suspend Node</button>
            <button style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '13px', fontWeight: '900', cursor: 'pointer' }}>Download Full Dossier</button>
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr', gap: '32px' }}>
         {/* Left Column: Basic Info & Health */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Profile Card */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '32px', padding: '32px', textAlign: 'center' }}>
               <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 24px' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '40px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: '900', color: 'white' }}>Z</div>
                  <div style={{ position: 'absolute', bottom: '0', right: '0', width: '32px', height: '32px', background: '#10b981', border: '6px solid #0a0f1e', borderRadius: '50%' }} />
               </div>
               <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>Zeeshan Ahmad</h2>
               <p style={{ color: '#6366f1', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', marginTop: '8px', letterSpacing: '0.05em' }}>Senior System Admin</p>
               
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '32px' }}>
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                     <div style={{ fontSize: '10px', color: '#475569', fontWeight: '800', textTransform: 'uppercase', marginBottom: '4px' }}>Stability</div>
                     <div style={{ fontSize: '18px', fontWeight: '900', color: '#10b981' }}>98.4%</div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                     <div style={{ fontSize: '10px', color: '#475569', fontWeight: '800', textTransform: 'uppercase', marginBottom: '4px' }}>Impact</div>
                     <div style={{ fontSize: '18px', fontWeight: '900', color: '#3b82f6' }}>High</div>
                  </div>
               </div>
            </div>

            {/* Performance Gauges */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '32px', padding: '24px' }}>
               <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <TrendingUp size={18} color="#3b82f6" /> Performance Metrics
               </h3>
               {[
                 { label: 'Task Velocity', value: 92, color: '#3b82f6' },
                 { label: 'Client Satisfaction', value: 88, color: '#10b981' },
                 { label: 'Reporting Accuracy', value: 95, color: '#8b5cf6' },
               ].map(metric => (
                 <div key={metric.label} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                       <span style={{ color: '#94a3b8', fontWeight: '600' }}>{metric.label}</span>
                       <span style={{ color: 'white', fontWeight: '800' }}>{metric.value}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                       <div style={{ width: `${metric.value}%`, height: '100%', background: metric.color }} />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Center Column: Activity Radar & Timeline */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '32px', padding: '32px', flex: 1 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <Activity size={20} color="#6366f1" /> Activity Intelligence Feed
                  </h3>
                  <div style={{ padding: '6px 12px', background: 'rgba(16,185,129,0.1)', color: '#10b981', borderRadius: '10px', fontSize: '11px', fontWeight: '800' }}>LIVE RADAR</div>
               </div>

               <div style={{ position: 'relative' }}>
                  {/* Timeline Line */}
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: '15px', width: '2px', background: 'rgba(255,255,255,0.05)' }} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                     {activities.map((act, i) => (
                        <div key={i} style={{ display: 'flex', gap: '24px', position: 'relative' }}>
                           <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#0a0f1e', border: `2px solid ${act.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                              <act.icon size={14} color={act.color} />
                           </div>
                           <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                 <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'white' }}>{act.type}</h4>
                                 <span style={{ fontSize: '12px', color: '#475569', fontWeight: '600' }}>{act.time}</span>
                              </div>
                              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>{act.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Quick Actions / Task Launcher */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
               <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '24px', padding: '24px', cursor: 'pointer' }}>
                  <Zap size={24} color="#3b82f6" style={{ marginBottom: '12px' }} />
                  <h4 style={{ color: 'white', fontWeight: '800', fontSize: '15px' }}>Trigger Task</h4>
                  <p style={{ color: '#60a5fa', fontSize: '12px', marginTop: '4px' }}>Assign high-priority sprint</p>
               </div>
               <div style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '24px', padding: '24px', cursor: 'pointer' }}>
                  <Award size={24} color="#8b5cf6" style={{ marginBottom: '12px' }} />
                  <h4 style={{ color: 'white', fontWeight: '800', fontSize: '15px' }}>Reward Node</h4>
                  <p style={{ color: '#a78bfa', fontSize: '12px', marginTop: '4px' }}>Send performance bonus</p>
               </div>
            </div>
         </div>

         {/* Right Column: Live Context & Compliance */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Tracking Map UI Placeholder */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '32px', padding: '24px', height: '350px', position: 'relative', overflow: 'hidden' }}>
               <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={18} color="#f59e0b" /> Geo-Telematic Node
               </h3>
               <div style={{ width: '100%', height: '240px', background: '#0a0f1e', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                  {/* Ping Animation at center */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                     <div style={{ position: 'absolute', inset: '-12px', background: 'rgba(245,158,11,0.3)', borderRadius: '50%' }} className="animate-ping" />
                     <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#f59e0b', border: '3px solid white' }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', padding: '6px 12px', borderRadius: '8px', fontSize: '10px', color: 'white', fontWeight: '800' }}>
                     NEW DELHI HQ • 28.6139&deg; N
                  </div>
               </div>
            </div>

            {/* Compliance & Security */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '32px', padding: '32px' }}>
               <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'white', marginBottom: '24px' }}>Compliance Status</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { label: 'Secure Login (MFA)', status: 'Verified', icon: Shield },
                    { label: 'Latest OS Patch', status: 'Updated', icon: Monitor },
                    { label: 'Workforce Audit', status: 'Compliant', icon: CheckCircle2 },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <item.icon size={16} color="#475569" />
                          <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>{item.label}</span>
                       </div>
                       <span style={{ fontSize: '11px', fontWeight: '900', color: '#10b981' }}>{item.status}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Resource Access */}
            <div style={{ background: 'rgba(239,68,68,0.02)', border: '1px solid rgba(239,68,68,0.08)', borderRadius: '32px', padding: '24px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f87171', marginBottom: '12px' }}>
                  <AlertCircle size={18} />
                  <span style={{ fontSize: '13px', fontWeight: '800' }}>Anomaly Detection</span>
               </div>
               <p style={{ color: '#7f1d1d', fontSize: '12px', lineHeight: '1.6' }}>No irregular access patterns detected in the last 24 hours. Node behavior is within normal parameters.</p>
            </div>
         </div>
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { 
  Users, Activity, MapPin, Clock, Phone, Mail, 
  ChevronRight, ArrowUpRight, Search, Filter, 
  MoreVertical, Monitor, Smartphone, Globe,
  ShieldAlert, CheckCircle2, UserCheck, BarChart2
} from 'lucide-react';
import Link from 'next/link';

const activeStaff = [
  { id: '1', name: 'Zeeshan Ahmad', role: 'Super Admin', status: 'Online', lastActive: 'Just now', device: 'Desktop / Chrome', lat: 28.6139, lng: 77.2090, location: 'South Delhi, HQ' },
  { id: '2', name: 'Rohan Gupta', role: 'Sales Lead', status: 'Busy', lastActive: '4 mins ago', device: 'iOS / App', lat: 28.5355, lng: 77.3910, location: 'Noida, Sector 62' },
  { id: '3', name: 'Simran Kaur', role: 'Support Specialist', status: 'Offline', lastActive: '2 hours ago', device: 'Desktop / Firefox', lat: 28.4595, lng: 77.0266, location: 'Gurugram, Phase 3' },
  { id: '4', name: 'Aditya Raj', role: 'Operations Manager', status: 'Online', lastActive: '12 mins ago', device: 'Android / App', lat: 28.7041, lng: 77.1025, location: 'Rohini, North Delhi' },
];

export default function EmployeeMonitor() {
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState('All');

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', margin: 0, letterSpacing: '-0.02em' }}>Live Command Center</h1>
          <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>Real-time telemetry and geospatial tracking for the whole team.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '14px', color: '#60a5fa', fontSize: '13px', fontWeight: '800' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} className="animate-pulse" />
              12 Nodes Operational
           </div>
        </div>
      </div>

      {/* Grid Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {[
          { label: 'Active Sessions', value: '42', delta: '+8%', icon: Activity, color: '#3b82f6' },
          { label: 'Clocked In', value: '118/120', delta: '98%', icon: UserCheck, color: '#10b981' },
          { label: 'On-Field', value: '15', delta: 'Active Now', icon: MapPin, color: '#f59e0b' },
          { label: 'Alerts', value: '0', delta: 'System Stable', icon: ShieldAlert, color: '#64748b' },
        ].map((stat, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ padding: '10px', borderRadius: '12px', background: `${stat.color}11`, color: stat.color }}>
                <stat.icon size={20} />
              </div>
              <div style={{ fontSize: '12px', color: stat.color, fontWeight: '800' }}>{stat.delta}</div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: 'white', marginBottom: '4px' }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: '700', textTransform: 'uppercase' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px' }}>
        {/* Activity List */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '32px', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white' }}>Session Telemetry</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
               <Search size={18} color="#475569" style={{ cursor: 'pointer' }} />
               <Filter size={18} color="#475569" style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <div style={{ padding: '8px' }}>
             {activeStaff.map(staff => (
               <div key={staff.id} style={{ display: 'flex', alignItems: 'center', padding: '16px', borderRadius: '20px', transition: 'all 0.2s', border: '1px solid transparent' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '900', color: 'white' }}>{staff.name[0]}</div>
                    <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '16px', height: '16px', background: '#0a0f1e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: staff.status === 'Online' ? '#10b981' : staff.status === 'Busy' ? '#f59e0b' : '#64748b' }} />
                    </div>
                  </div>
                  <div style={{ marginLeft: '16px', flex: 1 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '15px', fontWeight: '800', color: 'white' }}>{staff.name}</span>
                        <span style={{ fontSize: '10px', fontWeight: '800', background: 'rgba(59,130,246,0.1)', color: '#60a5fa', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>{staff.role}</span>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', fontSize: '12px', color: '#475569' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                           <Clock size={12} /> {staff.lastActive}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                           {staff.device.includes('Desktop') ? <Monitor size={12} /> : <Smartphone size={12} />} {staff.device}
                        </div>
                     </div>
                  </div>
                  <div style={{ textAlign: 'right', marginRight: '24px' }}>
                     <div style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>{staff.location}</div>
                     <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>LAT: {staff.lat} LON: {staff.lng}</div>
                  </div>
                  <Link href={`/admin/employees/${staff.id}`} style={{ padding: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', color: '#94a3b8', display: 'flex', textDecoration: 'none' }}>
                     <ArrowUpRight size={18} />
                  </Link>
               </div>
             ))}
          </div>
          <div style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
             <button style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>Generate Full Network Report</button>
          </div>
        </div>

        {/* Live Map Interaction (Placeholder UI) */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '32px', padding: '12px', position: 'relative', overflow: 'hidden' }}>
           <div style={{ 
             width: '100%', height: '100%', borderRadius: '24px', 
             background: 'linear-gradient(225deg, #0f172a 0%, #1e293b 100%)',
             position: 'relative', overflow: 'hidden', minHeight: '600px'
           }}>
              {/* Map Grid Pattern */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              
              {/* Fake Map Elements */}
              <div style={{ position: 'absolute', top: '20%', left: '30%', width: '120px', height: '120px', border: '2px solid rgba(59,130,246,0.1)', borderRadius: '50%', background: 'rgba(59,130,246,0.05)' }} />
              <div style={{ position: 'absolute', top: '50%', left: '60%', width: '180px', height: '180px', border: '2px dashed rgba(16,185,129,0.1)', borderRadius: '50%', background: 'rgba(16,185,129,0.05)' }} />
              
              {/* Staff Markers */}
              {activeStaff.map(staff => (
                <div key={staff.id} style={{ 
                  position: 'absolute', top: `${staff.lat * 2 - 20}%`, left: `${staff.lng * 2 - 130}%`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer'
                }}>
                   <div style={{ 
                     background: 'white', color: '#0f172a', padding: '4px 10px', borderRadius: '8px', 
                     fontSize: '10px', fontWeight: '900', boxShadow: '0 10px 15px rgba(0,0,0,0.4)',
                     whiteSpace: 'nowrap', marginBottom: '6px'
                   }}>
                     {staff.name.split(' ')[0]}
                   </div>
                   <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: '-8px', background: staff.status === 'Online' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)', borderRadius: '50%' }} className="animate-ping" />
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: staff.status === 'Online' ? '#10b981' : '#f59e0b', border: '2px solid white' }} />
                   </div>
                </div>
              ))}

              {/* Map UI Controls */}
              <div style={{ position: 'absolute', bottom: '24px', right: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                 <button style={{ padding: '8px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>+</button>
                 <button style={{ padding: '8px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>-</button>
              </div>
              <div style={{ position: 'absolute', top: '24px', left: '24px', padding: '12px 18px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}>
                 <div style={{ fontSize: '13px', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChart2 size={16} color="#3b82f6" />
                    Telemetric Map View
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

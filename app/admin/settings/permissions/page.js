'use client';
import { useState } from 'react';
import { 
  ShieldCheck, Lock, Eye, Edit3, Trash2, Save, 
  ChevronRight, Info, AlertTriangle, CheckCircle2,
  Users, Target, Briefcase, FileText, Globe, CreditCard
} from 'lucide-react';

const roleList = ['super-admin', 'admin', 'manager', 'sales', 'support'];

const moduleList = [
  { id: 'dashboard', label: 'Dashboard Tracking', icon: Eye },
  { id: 'employees', label: 'Member Management', icon: Users },
  { id: 'leads', label: 'Lead CRM (BANT)', icon: Target },
  { id: 'projects', label: 'Project Operations', icon: Briefcase },
  { id: 'payments', label: 'Financial Transactions', icon: CreditCard },
  { id: 'cms', label: 'Website CMS Engine', icon: Globe },
  { id: 'reports', label: 'Corporate Intelligence', icon: FileText },
];

const permissionTypes = [
  { id: 'view', label: 'View', icon: Eye, color: '#3b82f6' },
  { id: 'create', label: 'Create', icon: ChevronRight, color: '#10b981' },
  { id: 'edit', label: 'Edit', icon: Edit3, color: '#f59e0b' },
  { id: 'delete', label: 'Delete', icon: Trash2, color: '#ef4444' },
];

export default function PermissionMatrix() {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initializing with everything checked for Super Admin, and partial for others
  const [permissions, setPermissions] = useState({
    admin: {
      dashboard: ['view'],
      employees: ['view', 'create', 'edit'],
      leads: ['view', 'create', 'edit', 'delete'],
      projects: ['view', 'create', 'edit'],
      payments: ['view'],
      cms: ['view', 'edit'],
      reports: ['view'],
    }
  });

  const togglePermission = (role, moduleId, permId) => {
    const rolePerms = permissions[role] || {};
    const modulePerms = rolePerms[moduleId] || [];
    
    let newModulePerms;
    if (modulePerms.includes(permId)) {
      newModulePerms = modulePerms.filter(p => p !== permId);
    } else {
      newModulePerms = [...modulePerms, permId];
    }

    setPermissions({
      ...permissions,
      [role]: {
        ...rolePerms,
        [moduleId]: newModulePerms
      }
    });
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', margin: 0, letterSpacing: '-0.02em' }}>Access Governance</h1>
          <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>Fine-grained permission matrix for role-level security controls.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '14px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 20px -5px rgba(59,130,246,0.3)', transition: 'all 0.3s' }}
        >
          {saving ? <ShieldCheck className="animate-spin" size={18} /> : <Save size={18} />}
          {saving ? 'Synchronizing Policy...' : 'Save Matrix Policy'}
        </button>
      </div>

      {showSuccess && (
        <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px', padding: '16px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: '#10b981', fontWeight: '600' }}>
           <CheckCircle2 size={20} /> Permission Security Policy updated across all clusters.
        </div>
      )}

      <div style={{ display: 'flex', gap: '32px' }}>
        {/* Role Selector Sidebar */}
        <div style={{ width: '280px', flexShrink: 0 }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '16px' }}>
            <h3 style={{ color: '#475569', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 16px 16px' }}>Select System Role</h3>
            {roleList.map(role => (
              <button 
                key={role}
                onClick={() => setSelectedRole(role)}
                style={{ 
                  width: '100%', padding: '14px 16px', borderRadius: '14px', border: '1px solid transparent',
                  background: selectedRole === role ? 'rgba(59,130,246,0.1)' : 'transparent',
                  color: selectedRole === role ? '#60a5fa' : '#94a3b8',
                  fontSize: '14px', fontWeight: '700', textTransform: 'capitalize', textAlign: 'left',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s',
                  border: selectedRole === role ? '1px solid rgba(59,130,246,0.2)' : 'none'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: selectedRole === role ? '#3b82f6' : '#1e293b' }} />
                {role.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '24px', padding: '24px', background: 'rgba(245,158,11,0.03)', border: '1px solid rgba(245,158,11,0.1)', borderRadius: '24px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', marginBottom: '12px' }}>
                <AlertTriangle size={18} />
                <span style={{ fontSize: '13px', fontWeight: '800' }}>Critical Notice</span>
             </div>
             <p style={{ color: '#92400e', fontSize: '12px', lineHeight: '1.6' }}>Policy changes to the Super Admin role are Restricted to avoid system lockouts.</p>
          </div>
        </div>

        {/* Matrix Table */}
        <div style={{ flex: 1 }}>
           <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '32px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                 <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                       <th style={{ padding: '24px', textAlign: 'left', color: '#475569', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>Module / Engine Access</th>
                       {permissionTypes.map(p => (
                         <th key={p.id} style={{ padding: '24px', textAlign: 'center', color: '#475569', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>{p.label}</th>
                       ))}
                    </tr>
                 </thead>
                 <tbody>
                    {moduleList.map(mod => {
                      const Icon = mod.icon;
                      const rolePerms = permissions[selectedRole] || {};
                      const modulePerms = rolePerms[mod.id] || [];
                      const isSuper = selectedRole === 'super-admin';

                      return (
                        <tr key={mod.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.2s' }}>
                           <td style={{ padding: '24px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                 <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', color: '#64748b' }}><Icon size={18} /></div>
                                 <div style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>{mod.label}</div>
                              </div>
                           </td>
                           {permissionTypes.map(p => (
                             <td key={p.id} style={{ padding: '24px', textAlign: 'center' }}>
                                <div 
                                  onClick={() => !isSuper && togglePermission(selectedRole, mod.id, p.id)}
                                  style={{ 
                                    width: '24px', height: '24px', borderRadius: '7px', margin: '0 auto',
                                    background: isSuper || modulePerms.includes(p.id) ? p.color : 'rgba(255,255,255,0.04)',
                                    border: isSuper || modulePerms.includes(p.id) ? `0px solid transparent` : '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: isSuper ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                                    boxShadow: (isSuper || modulePerms.includes(p.id)) ? `0 0 15px ${p.color}44` : 'none'
                                  }}
                                >
                                   {(isSuper || modulePerms.includes(p.id)) && <p.icon size={12} color="white" strokeWidth={3} />}
                                </div>
                             </td>
                           ))}
                        </tr>
                      );
                    })}
                 </tbody>
              </table>
           </div>

           <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {[
                { title: 'Restricted Access', value: '42%', label: 'Of System Core', color: '#ef4444' },
                { title: 'Authorized Nodes', value: '18/24', label: 'Active Endpoints', color: '#10b981' },
                { title: 'Security Tier', value: 'High', label: 'End-to-End Encrypted', color: '#3b82f6' },
              ].map(stat => (
                <div key={stat.title} style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px' }}>
                  <div style={{ color: '#475569', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px' }}>{stat.title}</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: 'white', marginBottom: '4px' }}>{stat.value}</div>
                  <div style={{ fontSize: '12px', color: stat.color, fontWeight: '700' }}>{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Search, Filter, MoreVertical, 
  Mail, Phone, Shield, Edit2, Trash2, X, Check,
  ChevronLeft, ChevronRight, Loader2, UserCheck
} from 'lucide-react';

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: 'sales', status: 'active' });
  const [submitting, setSubmitting] = useState(false);

  async function loadEmployees() {
    try {
      const res = await fetch('/api/admin/employees');
      const data = await res.json();
      setEmployees(data.success ? data.data : []);
    } catch {
      // Demo Data if API fails initially
      setEmployees([
        { _id: '1', name: 'Abhishek Kumar', email: 'abhi@adskysolution.in', phone: '8062182243', role: 'super-admin', status: 'active', joiningDate: '2026-01-10' },
        { _id: '2', name: 'Amit Singh', email: 'amit@adskysolution.in', phone: '9876543210', role: 'manager', status: 'active', joiningDate: '2026-02-15' },
        { _id: '3', name: 'Priya Sharma', email: 'priya@adskysolution.in', phone: '9988776655', role: 'sales', status: 'active', joiningDate: '2026-03-01' },
        { _id: '4', name: 'Vikram Gupta', email: 'vikram@adskysolution.in', phone: '8877665544', role: 'support', status: 'pending', joiningDate: '2026-04-02' },
      ]);
    }
    setLoading(false);
  }

  useEffect(() => { loadEmployees(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setSubmitting(true);
    // API Call would go here
    const newEmp = { ...formData, _id: Math.random().toString(), joiningDate: new Date().toISOString().split('T')[0] };
    setEmployees([newEmp, ...employees]);
    setShowAdd(false);
    setFormData({ name: '', email: '', phone: '', role: 'sales', status: 'active' });
    setSubmitting(false);
  }

  const roleColors = { 
    'super-admin': '#3b82f6', 
    'admin': '#6366f1', 
    'manager': '#f59e0b', 
    'sales': '#10b981', 
    'support': '#8b5cf6' 
  };

  const filtered = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '0 0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: 0 }}>Team Members</h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Maintain employees and access controls.</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 15px -3px rgba(59,130,246,0.3)' }}
        >
          <UserPlus size={18} />
          Add Employee
        </button>
      </div>

      {/* Filters bar */}
      <div style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '12px', marginBottom: '24px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', padding: '8px 12px 8px 40px', color: 'white', fontSize: '14px' }}
          />
        </div>
        <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '8px 16px', color: '#94a3b8', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Filter size={16} />
          Roles
        </button>
      </div>

      {/* Table */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Member</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Role</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Joining Date</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp) => (
              <tr key={emp._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', fontSize: '16px', fontWeight: '700' }}>
                      {emp.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>{emp.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{emp.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '8px', background: `${roleColors[emp.role]}15`, color: roleColors[emp.role], fontSize: '12px', fontWeight: '700', textTransform: 'capitalize' }}>
                    <Shield size={12} />
                    {emp.role.replace('-', ' ')}
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', background: emp.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', color: emp.status === 'active' ? '#22c55e' : '#f59e0b', border: `1px solid ${emp.status === 'active' ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)'}` }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: emp.status === 'active' ? '#22c55e' : '#f59e0b' }} />
                    {emp.status.toUpperCase()}
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#94a3b8' }}>{new Date(emp.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button style={{ padding: '8px', borderRadius: '8px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><Edit2 size={16} /></button>
                    <button style={{ padding: '8px', borderRadius: '8px', background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '500px', background: '#0e1528', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'white', margin: 0 }}>Add New Member</h2>
              <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAdd} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>FULL NAME</label>
                  <input required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>EMAIL ADDRESS</label>
                  <input required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>ROLE</label>
                    <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="sales" selected>Sales Executive</option>
                      <option value="support">Support</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>PHONE</label>
                    <input style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: 'white', fontSize: '14px' }} type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setShowAdd(false)} style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#94a3b8', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={submitting} style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

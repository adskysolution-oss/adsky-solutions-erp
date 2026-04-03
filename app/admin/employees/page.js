'use client';
import { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Search, Filter, Mail, Phone, 
  Calendar, Download, Edit3, Trash2, MoreVertical, 
  CheckCircle2, XCircle, Clock, Loader2, Award, 
  ShieldCheck, UserCheck, Briefcase, ChevronRight, X,
  Save, Key, FileText, ChevronDown, Plus
} from 'lucide-react';

const roles = ['admin', 'manager', 'sales', 'support'];
const statusList = ['active', 'suspended', 'pending'];

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ role: 'All', status: 'All', dateRange: 'All' });
  const [showModal, setShowModal] = useState(false);
  const [currentEmp, setCurrentEmp] = useState(null); // For edit/add
  const [saving, setSaving] = useState(false);

  // Modal form state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: 'support', password: '' });

  async function loadEmployees() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/employees');
      const data = await res.json();
      if (res.ok) setEmployees(data.data || []);
    } catch (err) {
      console.error(err);
      // Demo Data
      setEmployees([
        { _id: '1', name: 'Zeeshan Ahmad', email: 'zeeshan@adsky.com', role: 'admin', status: 'active', phone: '+91 9876543210', createdAt: '2026-04-03' },
        { _id: '2', name: 'Rohan Gupta', email: 'rohan@adsky.com', role: 'sales', status: 'active', phone: '+91 9876543211', createdAt: '2026-04-02' },
        { _id: '3', name: 'Simran Kaur', email: 'simran@adsky.com', role: 'support', status: 'pending', phone: '+91 9876543212', createdAt: '2026-04-01' },
      ]);
    }
    setLoading(false);
  }

  useEffect(() => { loadEmployees(); }, []);

  const handleOpenModal = (emp = null) => {
    if (emp) {
      setCurrentEmp(emp);
      setFormData({ name: emp.name, email: emp.email, phone: emp.phone, role: emp.role, password: '' });
    } else {
      setCurrentEmp(null);
      // Auto-generate password for new employee
      const autoPass = Math.random().toString(36).slice(-8);
      setFormData({ name: '', email: '', phone: '', role: 'support', password: autoPass });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = currentEmp ? 'PUT' : 'POST';
      const body = currentEmp ? { ...formData, id: currentEmp._id } : formData;
      const res = await fetch('/api/admin/employees', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        loadEmployees();
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    try {
      const res = await fetch(`/api/admin/employees?id=${id}`, { method: 'DELETE' });
      if (res.ok) loadEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Phone', 'Created At'];
    const rows = employees.map(e => [e.name, e.email, e.role, e.status, e.phone, e.createdAt]);
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(r => r.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `employees_report_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filters.role === 'All' || e.role === filters.role;
    const matchStatus = filters.status === 'All' || e.status === filters.status;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', margin: 0, letterSpacing: '-0.02em' }}>Member Management</h1>
          <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>Organize and monitor your internal AdSky Solution team.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
           <button onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', color: '#94a3b8', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
              <Download size={18} /> Export Data
           </button>
           <button onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '14px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 20px -5px rgba(59,130,246,0.3)' }}>
              <UserPlus size={18} /> Add New Member
           </button>
        </div>
      </div>

      {/* Control Bar */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
         <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
            <input type="text" placeholder="Search by name, email or role..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', outline: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '14px 14px 14px 48px', color: 'white', fontSize: '15px' }} />
         </div>
         <div style={{ display: 'flex', gap: '12px' }}>
            <select value={filters.role} onChange={e => setFilters({...filters, role: e.target.value})} style={{ padding: '0 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', color: '#94a3b8', fontSize: '14px', outline: 'none' }}>
               <option value="All">Role: All</option>
               {roles.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
            </select>
            <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} style={{ padding: '0 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', color: '#94a3b8', fontSize: '14px', outline: 'none' }}>
               <option value="All">Status: All</option>
               {statusList.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
            </select>
            <select value={filters.dateRange} onChange={e => setFilters({...filters, dateRange: e.target.value})} style={{ padding: '0 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', color: '#94a3b8', fontSize: '14px', outline: 'none' }}>
               <option value="All">Today</option>
               <option value="Week">This Week</option>
               <option value="Month">This Month</option>
            </select>
         </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader2 size={40} className="animate-spin text-blue-500" /></div>
      ) : (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '32px', overflow: 'hidden' }}>
           <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                 <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <th style={{ padding: '24px', fontSize: '12px', color: '#475569', fontWeight: '800', textTransform: 'uppercase' }}>Member Profile</th>
                    <th style={{ padding: '24px', fontSize: '12px', color: '#475569', fontWeight: '800', textTransform: 'uppercase' }}>Role Badge</th>
                    <th style={{ padding: '24px', fontSize: '12px', color: '#475569', fontWeight: '800', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '24px', fontSize: '12px', color: '#475569', fontWeight: '800', textTransform: 'uppercase' }}>Onboarding Date</th>
                    <th style={{ padding: '24px', textAlign: 'right' }}></th>
                 </tr>
              </thead>
              <tbody>
                 {filtered.map(emp => (
                   <tr key={emp._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.2s' }}>
                      <td style={{ padding: '24px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '900', color: 'white' }}>{emp.name[0]}</div>
                            <div>
                               <div style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>{emp.name}</div>
                               <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>{emp.email}</div>
                            </div>
                         </div>
                      </td>
                      <td style={{ padding: '24px' }}>
                         <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', fontSize: '12px', fontWeight: '800', color: '#60a5fa', textTransform: 'uppercase' }}>
                            <ShieldCheck size={14} /> {emp.role}
                         </div>
                      </td>
                      <td style={{ padding: '24px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: emp.status === 'active' ? '#10b981' : '#f59e0b' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: emp.status === 'active' ? '#10b981' : '#f59e0b' }} />
                            {emp.status}
                         </div>
                      </td>
                      <td style={{ padding: '24px', color: '#64748b', fontSize: '14px' }}>
                         {new Date(emp.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '24px', textAlign: 'right' }}>
                         <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button onClick={() => handleOpenModal(emp)} style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', color: '#94a3b8', cursor: 'pointer' }}><Edit3 size={18} /></button>
                            <button onClick={() => handleDelete(emp._id)} style={{ padding: '10px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)', borderRadius: '12px', color: '#f87171', cursor: 'pointer' }}><Trash2 size={18} /></button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
           {filtered.length === 0 && <div style={{ padding: '80px', textAlign: 'center', color: '#475569' }}>No members matched your filters.</div>}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div onClick={() => setShowModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }} />
           <div style={{ position: 'relative', width: '500px', background: '#0d1224', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '32px', padding: '40px', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)' }}>
              <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}><X size={24} /></button>
              <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white', marginBottom: '8px' }}>{currentEmp ? 'Update Member' : 'New AdSky Member'}</h2>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px' }}>Configure access rights and personal info for the team.</p>

              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>FULL NAME</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px', color: 'white', fontSize: '14px', outline: 'none' }} />
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>EMAIL ADDRESS</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px', color: 'white', fontSize: '14px', outline: 'none' }} />
                 </div>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>ACCESS ROLE</label>
                       <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px', color: 'white', fontSize: '14px', outline: 'none' }}>
                          {roles.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
                       </select>
                    </div>
                    {!currentEmp && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                         <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>AUTO-PASSWORD</label>
                         <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px dashed rgba(59,130,246,0.3)', borderRadius: '14px', padding: '14px', color: '#60a5fa', fontSize: '14px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Key size={16} /> {formData.password}
                         </div>
                      </div>
                    )}
                 </div>
                 <button type="submit" disabled={saving} style={{ marginTop: '20px', padding: '18px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: '18px', color: 'white', fontSize: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {saving ? 'Processing...' : currentEmp ? 'Update Permissions' : 'Onboard Member'}
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}

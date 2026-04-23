'use client';

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Shield, 
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2
} from 'lucide-react';
import { adminAPI } from '@/lib/api-client';

const columns = [
  { key: 'name', label: 'USER NAME' },
  { key: 'role', label: 'ROLE / CATEGORY' },
  { key: 'state', label: 'STATE' },
  { key: 'phone', label: 'PHONE' },
  { key: 'status', label: 'ACCOUNT STATUS' },
];

export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState('All');
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer',
    phone: '',
    state: ''
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const stats = [
    { label: 'ACTIVE USERS', value: users.length, icon: CheckCircle2, color: 'text-[#22c55e]' },
    { label: 'PENDING VERIFICATION', value: '1.2K', icon: Clock, color: 'text-[#f59e0b]' },
    { label: 'BLOCKED / INACTIVE', value: '420', icon: XCircle, color: 'text-[#ef4444]' },
  ];

  const filteredUsers = users.filter(u => {
    const userRole = (u.role || '').toLowerCase();
    const currentTab = activeTab.toLowerCase();
    
    // Support both singular and plural role matching
    const matchesTab = currentTab === 'all' || 
                       userRole === currentTab || 
                       userRole === currentTab.slice(0, -1);
                       
    const matchesSearch = !searchTerm || 
      (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.phone || '').includes(searchTerm);
      
    return matchesTab && matchesSearch;
  });


  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: '', // Don't show password
        role: user.role,
        phone: user.phone || '',
        state: user.state || ''
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'farmer',
        phone: '',
        state: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await adminAPI.patch(`/api/admin/users`, {
          userId: editingUser._id,
          ...formData
        });
      } else {
        await adminAPI.post(`/api/admin/users`, formData);
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (user) => {
    try {
      await adminAPI.delete(`/api/admin/users?id=${user._id}`);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-12 relative">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
              <UsersIcon size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#38bdf8] italic">Operations Control</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">User Hub.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Manage global user accounts, roles, and security permissions.</p>
        </div>

        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-3 px-8 py-4 bg-[#38bdf8] text-[#0b1220] rounded-2xl font-black italic shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:scale-105 transition-all"
        >
          <UserPlus size={20} /> ADD NEW USER
        </button>
      </motion.div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
         <div className="relative flex-grow group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#38bdf8] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111827] border border-[#1f2937] rounded-3xl py-5 pl-16 pr-8 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all"
            />
         </div>
         <div className="flex bg-[#111827] p-1.5 rounded-3xl border border-[#1f2937] w-fit overflow-x-auto">
            {['All', 'Farmers', 'Partners', 'Employees'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest italic transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#38bdf8] text-[#0b1220] shadow-lg' : 'text-[#6b7280] hover:text-[#f3f4f6]'}`}
              >
                {tab}
              </button>
            ))}
         </div>

      </div>

      {/* Mini Stats Tier */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-6 bg-[#111827] border border-[#1f2937] rounded-[2rem] flex items-center gap-5 group hover:border-[#38bdf8]/20 transition-all">
             <div className={`w-12 h-12 rounded-2xl bg-[#0b1220] flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic">{stat.label}</p>
                <p className="text-2xl font-black text-[#f3f4f6] italic">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Data Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={40} className="text-[#38bdf8] animate-spin" />
        </div>
      ) : error ? (
        <div className="p-10 bg-red-500/10 border border-red-500/20 text-red-500 rounded-3xl text-center font-bold italic">
           Error syncing with system: {error}
        </div>
      ) : (
        <DataTable 
          title={`${activeTab} Users`} 
          columns={columns} 
          data={filteredUsers.map(u => ({
            ...u,
            status: u.status === 'active' ? 'Active' : 'Blocked'
          }))} 
          onExport={() => alert('Preparing identity export...')}
          onEdit={(user) => handleOpenModal(user)}
          onDelete={(user) => handleDelete(user)}
        />
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="bg-[#111827] border border-[#1f2937] w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 p-8">
                 <button onClick={() => setIsModalOpen(false)} className="text-[#6b7280] hover:text-[#f3f4f6] transition-colors"><XCircle size={32}/></button>
              </div>

              <div className="mb-10">
                 <h2 className="text-3xl font-black text-[#f3f4f6] italic tracking-tight">{editingUser ? 'Edit' : 'Add'} Identity Node.</h2>
                 <p className="text-[#6b7280] font-medium italic">Configure core security and access parameters.</p>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">Full Name</label>
                       <input 
                         required
                         type="text" 
                         value={formData.name}
                         onChange={e => setFormData({...formData, name: e.target.value})}
                         className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">Email Address</label>
                       <input 
                         required
                         type="email" 
                         value={formData.email}
                         onChange={e => setFormData({...formData, email: e.target.value})}
                         className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">Phone Number</label>
                       <input 
                         required
                         type="text" 
                         value={formData.phone}
                         onChange={e => setFormData({...formData, phone: e.target.value})}
                         className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">Access Role</label>
                       <select 
                         value={formData.role}
                         onChange={e => setFormData({...formData, role: e.target.value})}
                         className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all appearance-none"
                       >
                          <option value="farmer">Farmer</option>
                          <option value="partner">Partner</option>
                          <option value="employee">Employee</option>
                          <option value="vendor">Vendor</option>
                          <option value="admin">Admin</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">State / Territory</label>
                       <input 
                         type="text" 
                         value={formData.state}
                         onChange={e => setFormData({...formData, state: e.target.value})}
                         className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">{editingUser ? 'New Password (Optional)' : 'Access Password'}</label>
                       <input 
                         required={!editingUser}
                         type="password" 
                         value={formData.password}
                         onChange={e => setFormData({...formData, password: e.target.value})}
                         className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all"
                       />
                    </div>
                 </div>

                 <button 
                   type="submit"
                   className="w-full py-5 bg-[#38bdf8] text-[#0b1220] rounded-2xl font-black uppercase tracking-widest italic shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all mt-8"
                 >
                   Synchronize Identity
                 </button>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
}



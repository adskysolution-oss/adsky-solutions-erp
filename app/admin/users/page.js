'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2
} from 'lucide-react';
import { adminAPI } from '@/lib/api-client';

const COLUMNS = [
  { key: 'name', label: 'USER NAME' },
  { key: 'role', label: 'ROLE / CATEGORY' },
  { key: 'state', label: 'STATE' },
  { key: 'district', label: 'DISTRICT' },
  { key: 'phone', label: 'PHONE' },
  { key: 'status', label: 'ACCOUNT STATUS' },
];



const INDIAN_STATES = [
  { id: 21, name: "Madhya Pradesh" }, { id: 34, name: "Uttar Pradesh" }, { id: 22, name: "Maharashtra" },
  { id: 30, name: "Rajasthan" }, { id: 11, name: "Gujarat" }, { id: 9, name: "Delhi" },
  { id: 12, name: "Haryana" }, { id: 29, name: "Punjab" }, { id: 5, name: "Bihar" },
  { id: 17, name: "Karnataka" }, { id: 32, name: "Tamil Nadu" }, { id: 38, name: "West Bengal" },
  // ... adding others as needed
];

const DISTRICTS_DATA = {
  "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Rewa", "Satna", "Ratlam", "Morena", "Bhind", "Shivpuri", "Chhatarpur", "Damoh", "Mandsaur", "Khargone", "Neemuch", "Khandwa", "Guna", "Itarsi", "Vidisha", "Sehore"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Prayagraj", "Ghaziabad", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Kalyan-Dombivli", "Vasai-Virar", "Aurangabad", "Navi Mumbai", "Solapur", "Mira-Bhayandar", "Bhiwandi", "Amravati"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Churu", "Beawar"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "South West Delhi", "South East Delhi", "North West Delhi"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhidham", "Nadiad", "Gandhinagar", "Anand", "Morbi"],
  "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Pathankot", "Moga"]
};

export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState('All');
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Geo API State
  const [geo, setGeo] = useState({ states: INDIAN_STATES, districts: [] });
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer',
    phone: '',
    state: '',
    district: '',
    tehsil: '',
    village: ''
  });

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getUsers();
      setUsers(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Fetch Users Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    const stateName = e.target.options[e.target.selectedIndex].text;
    setFormData({ ...formData, state: stateName, district: '' });
    
    // Check Local Hardcoded Data First (Faster & Reliable)
    if (DISTRICTS_DATA[stateName]) {
      setGeo(prev => ({ 
        ...prev, 
        districts: DISTRICTS_DATA[stateName].map((d, i) => ({ district_id: i, district_name: d })) 
      }));
      return;
    }

    // Fallback to Proxy API for other states
    if (stateId) {
      fetch(`/api/geo/districts?stateId=${stateId}`)
        .then(res => res.json())
        .then(data => setGeo(prev => ({ ...prev, districts: data.districts || [] })))
        .catch(err => {
          console.error('Districts API Error:', err);
          setGeo(prev => ({ ...prev, districts: [] }));
        });
    } else {
      setGeo(prev => ({ ...prev, districts: [] }));
    }
  };


      setGeo(prev => ({ ...prev, districts: [] }));
    }
  };



  const stats = useMemo(() => [
    { label: 'ACTIVE USERS', value: users.filter(u => u.status === 'active').length, icon: CheckCircle2, color: 'text-[#22c55e]' },
    { label: 'PENDING VERIFICATION', value: users.filter(u => u.status === 'pending').length, icon: Clock, color: 'text-[#f59e0b]' },
    { label: 'BLOCKED / INACTIVE', value: users.filter(u => u.status === 'blocked').length, icon: XCircle, color: 'text-[#ef4444]' },
  ], [users]);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const userRole = (u.role || '').toLowerCase();
      const currentTab = activeTab.toLowerCase();
      
      const matchesTab = currentTab === 'all' || 
                         userRole === currentTab || 
                         userRole === currentTab.replace(/s$/, '') ||
                         (currentTab === 'employees' && userRole === 'employee');
                         
      const matchesSearch = !searchTerm || 
        (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
        (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.phone || '').includes(searchTerm);
        
      return matchesTab && matchesSearch;
    });
  }, [users, activeTab, searchTerm]);

  const handleOpenModal = useCallback((user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || 'farmer',
        phone: user.phone || '',
        state: user.state || '',
        district: user.district || '',
        tehsil: user.tehsil || '',
        village: user.village || ''
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'farmer',
        phone: '',
        state: '',
        district: '',
        tehsil: '',
        village: ''
      });
    }
    setIsModalOpen(true);
  }, []);

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

  const handleDelete = useCallback(async (user) => {
    if (!window.confirm(`Terminate identity ${user.name}?`)) return;
    try {
      await adminAPI.delete(`/api/admin/users?id=${user._id}`);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  }, [fetchUsers]);

  const tableData = useMemo(() => {
    return filteredUsers.map(u => ({
      ...u,
      status_raw: u.status,
      status: (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase italic ${
          u.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
          u.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
          'bg-rose-500/10 text-rose-500 border border-rose-500/20'
        }`}>
          {u.status || 'Unknown'}
        </span>
      )
    }));
  }, [filteredUsers]);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
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
      </div>

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
          columns={COLUMNS} 
          data={tableData} 
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-[#111827] border border-[#1f2937] w-full max-w-3xl rounded-[3rem] p-10 shadow-2xl relative overflow-y-auto max-h-[90vh]"
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
                         <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">Email Address</label>
                         <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">Phone Number</label>
                         <input required type="text" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">Access Role</label>
                         <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all appearance-none">
                            <option value="farmer">Farmer</option>
                            <option value="partner">Partner</option>
                            <option value="employee">Employee</option>
                            <option value="vendor">Vendor</option>
                            <option value="admin">Admin</option>
                         </select>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">State</label>
                         <select 
                           onChange={handleStateChange}
                           className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all appearance-none"
                         >
                            <option value="">{formData.state || 'Select State'}</option>
                            {geo.states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                         </select>

                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">District</label>
                         <select 
                           disabled={!formData.state}
                           value={formData.district}
                           onChange={e => setFormData({...formData, district: e.target.value})}
                           className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all appearance-none disabled:opacity-30"
                         >
                            <option value="">Select District</option>
                            {geo.districts.map(d => <option key={d.district_id} value={d.district_name}>{d.district_name}</option>)}
                         </select>
                      </div>


                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">Tehsil</label>
                         <input type="text" placeholder="Tehsil" value={formData.tehsil} onChange={e => setFormData({...formData, tehsil: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">Village</label>
                         <input type="text" placeholder="Village" value={formData.village} onChange={e => setFormData({...formData, village: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all" />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                         <label className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic ml-4">{editingUser ? 'New Password (Optional)' : 'Password'}</label>
                         <input required={!editingUser} type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-[#f3f4f6] font-bold italic outline-none focus:border-[#38bdf8] transition-all" />
                      </div>
                   </div>

                   <button type="submit" className="w-full py-5 bg-[#38bdf8] text-[#0b1220] rounded-2xl font-black uppercase tracking-widest italic shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all mt-8">
                     Synchronize Identity
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

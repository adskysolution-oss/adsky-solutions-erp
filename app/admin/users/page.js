'use client';

import React, { useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Shield, 
  Search,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';

const userData = [
  { name: 'Ravi Kumar', role: 'Farmer', state: 'MP', status: 'Active', email: 'ravi@example.com', joinDate: '12 Apr 2026' },
  { name: 'Anita Singh', role: 'Partner', state: 'UP', status: 'Pending', email: 'anita@example.com', joinDate: '15 Apr 2026' },
  { name: 'Sanjay Verma', role: 'Employee', state: 'Delhi', status: 'Active', email: 'sanjay@example.com', joinDate: '10 Apr 2026' },
  { name: 'Megha Gupta', role: 'Vendor', state: 'Haryana', status: 'Inactive', email: 'megha@example.com', joinDate: '08 Apr 2026' },
  { name: 'Vikram Das', role: 'Farmer', state: 'Odisha', status: 'Active', email: 'vikram@example.com', joinDate: '14 Apr 2026' },
];

const columns = [
  { key: 'name', label: 'USER NAME' },
  { key: 'role', label: 'ROLE / CATEGORY' },
  { key: 'state', label: 'STATE' },
  { key: 'joinDate', label: 'MEMBERSHIP' },
  { key: 'status', label: 'ACCOUNT STATUS' },
];

export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState('All');

  const stats = [
    { label: 'ACTIVE USERS', value: '8.4K', icon: CheckCircle2, color: 'text-[#22c55e]' },
    { label: 'PENDING VERIFICATION', value: '1.2K', icon: Clock, color: 'text-[#f59e0b]' },
    { label: 'BLOCKED / INACTIVE', value: '420', icon: XCircle, color: 'text-[#ef4444]' },
  ];

  return (
    <div className="space-y-12">
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

        <button className="flex items-center gap-3 px-8 py-4 bg-[#38bdf8] text-[#0b1220] rounded-2xl font-black italic shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:scale-105 transition-all">
          <UserPlus size={20} /> ADD NEW USER
        </button>
      </motion.div>

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

      {/* Tab Controls */}
      <div className="flex bg-[#111827] p-1.5 rounded-2xl border border-[#1f2937] max-w-2xl">
        {['All', 'Farmers', 'Partners', 'Employees', 'Vendors'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all ${activeTab === tab ? 'bg-[#38bdf8] text-[#0b1220] shadow-lg' : 'text-[#6b7280] hover:text-[#f3f4f6]'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <DataTable 
        title={`${activeTab} Users`} 
        columns={columns} 
        data={userData} 
      />
    </div>
  );
}

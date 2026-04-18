'use client';

import React from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Sprout, 
  FileText, 
  CreditCard, 
  History,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin
} from 'lucide-react';

const farmerData = [
  { name: 'Raj Kumar', location: 'Punjab', loanAmount: '₹2.5L', status: 'Active', verification: 'Verified', crop: 'Wheat' },
  { name: 'Sita Devi', location: 'Haryana', loanAmount: '₹1.8L', status: 'Pending', verification: 'Under Review', crop: 'Rice' },
  { name: 'Arjun Singh', location: 'UP', loanAmount: '₹3.2L', status: 'Active', verification: 'Verified', crop: 'Sugarcane' },
  { name: 'Gopal Bhat', location: 'MP', loanAmount: '₹5.0L', status: 'Default', verification: 'Verified', crop: 'Cotton' },
];

const columns = [
  { key: 'name', label: 'FARMER NAME' },
  { key: 'location', label: 'LOCATION' },
  { key: 'crop', label: 'PRIMARY CROP' },
  { key: 'loanAmount', label: 'LOAN BURDEN' },
  { key: 'verification', label: 'DOC STATUS' },
  { key: 'status', label: 'CURRENT STATUS' },
];

export default function FarmersManagement() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 flex items-center justify-center text-[#22c55e]">
              <Sprout size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#22c55e] italic">Agricultural ERP</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Farmer Loan System.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">End-to-end management of farmer profiles, documents, and loan disbursements.</p>
        </div>
      </motion.div>

      {/* Process Map / Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'NEW APPLICATIONS', value: '42', icon: FileText, color: 'text-[#38bdf8]' },
          { label: 'KYC VERIFIED', value: '891', icon: CheckCircle2, color: 'text-[#22c55e]' },
          { label: 'DISBURSEMENT PENDING', value: '18', icon: Clock, color: 'text-[#f59e0b]' },
          { label: 'TOTAL DISBURSED', value: '₹1.2Cr', icon: CreditCard, color: 'text-[#6366f1]' },
        ].map((item, idx) => (
          <div key={idx} className="p-8 bg-[#111827] border border-[#1f2937] rounded-[2.5rem] relative group hover:border-[#38bdf8]/20 transition-all">
             <div className={`w-12 h-12 rounded-2xl bg-[#0b1220] flex items-center justify-center ${item.color} mb-6 group-hover:rotate-6 transition-transform`}>
                <item.icon size={22} />
             </div>
             <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-widest italic mb-1">{item.label}</p>
             <p className="text-3xl font-black text-[#f3f4f6] italic">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Main Table Container */}
      <div className="grid grid-cols-1 gap-12">
        <DataTable 
          title="Recent Loan Applications" 
          columns={columns} 
          data={farmerData} 
        />
      </div>

      {/* Action View Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
         <div className="p-10 bg-gradient-to-br from-[#111827] to-[#0b1220] border border-[#1f2937] rounded-[3.5rem] relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#38bdf8]/5 rounded-full blur-[80px]"></div>
            <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-6">Document Viewer</h3>
            <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="p-4 bg-[#0b1220]/50 border border-[#1f2937] rounded-2xl flex items-center justify-between group/item hover:border-[#38bdf8]/30 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-[#38bdf8]/10 rounded-xl flex items-center justify-center text-[#38bdf8]">
                          <FileText size={18} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-[#f3f4f6] italic">Aadhar_Front_V{i}.pdf</p>
                          <p className="text-[10px] uppercase font-black text-[#6b7280] tracking-widest">Uploaded: 12 Apr</p>
                       </div>
                    </div>
                    <ExternalLink size={16} className="text-[#6b7280] cursor-pointer hover:text-[#38bdf8]" />
                 </div>
               ))}
            </div>
         </div>

         <div className="p-10 bg-gradient-to-br from-[#111827] to-[#0b1220] border border-[#1f2937] rounded-[3.5rem] relative overflow-hidden group">
            <h3 className="text-2xl font-black text-[#f3f4f6] italic mb-6">Loan Timeline</h3>
            <div className="space-y-10 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#1f2937]">
               {[
                 { step: 'Registration', date: '10 Apr', active: true },
                 { step: 'Kyc verification', date: '12 Apr', active: true },
                 { step: 'Field audit', date: '15 Apr', active: false },
                 { step: 'Final disbursement', date: 'Pending', active: false },
               ].map((s, idx) => (
                 <div key={idx} className="flex items-center gap-6 relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${s.active ? 'bg-[#38bdf8] border-[#38bdf8] text-[#0b1220]' : 'bg-[#0b1220] border-[#1f2937] text-[#6b7280]'}`}>
                       <CheckCircle2 size={18} />
                    </div>
                    <div>
                       <p className={`text-sm font-black italic uppercase tracking-wider ${s.active ? 'text-[#f3f4f6]' : 'text-[#6b7280]'}`}>{s.step}</p>
                       <p className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest leading-none mt-1">{s.date}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

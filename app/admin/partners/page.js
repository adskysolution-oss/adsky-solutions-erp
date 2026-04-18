'use client';

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import { motion } from 'framer-motion';
import { 
  Handshake, 
  MapPin, 
  TrendingUp, 
  Users,
  CheckCircle2,
  Clock,
  Loader2
} from 'lucide-react';
import { adminAPI } from '@/lib/api-client';

const columns = [
  { key: 'code', label: 'HUB CODE' },
  { key: 'region', label: 'REGION / TERRITORY' },
  { key: 'partnerName', label: 'OWNER' },
  { key: 'commissionRate', label: 'COMMISSION %' },
  { key: 'status', label: 'VERIFICATION' },
];

export default function PartnersHub() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const data = await adminAPI.getPartners();
        setPartners(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const stats = [
    { label: 'ACTIVE HUBS', value: partners.length, icon: MapPin, color: 'text-[#38bdf8]' },
    { label: 'GROSS VOLUME', value: '₹4.2Cr', icon: TrendingUp, color: 'text-[#22c55e]' },
    { label: 'NETWORK STRENGTH', value: '128', icon: Users, color: 'text-[#f59e0b]' },
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
              <Handshake size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#38bdf8] italic">Strategic Alliances</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#f3f4f6] tracking-tighter italic">Partners Hub.</h1>
          <p className="text-[#9ca3af] font-medium italic mt-1">Manage regional partners, hub performance, and commission settlements.</p>
        </div>

        <button className="flex items-center gap-3 px-8 py-4 bg-[#38bdf8] text-[#0b1220] rounded-2xl font-black italic shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:scale-105 transition-all">
          ONBOARD PARTNER
        </button>
      </motion.div>

      {/* Stats Tier */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-8 bg-[#111827] border border-[#1f2937] rounded-[2.5rem] relative overflow-hidden group">
            <div className="relative z-10 flex flex-col gap-4">
               <div className={`w-14 h-14 rounded-2xl bg-[#0b1220] flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon size={28} />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase text-[#6b7280] tracking-[0.2em] italic mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-[#f3f4f6] italic">{stat.value}</p>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Partners List */}
      <div className="relative">
        {loading ? (
          <div className="flex items-center justify-center py-20 bg-[#111827] rounded-[2.5rem] border border-[#1f2937]">
            <Loader2 size={40} className="text-[#38bdf8] animate-spin" />
          </div>
        ) : error ? (
           <div className="p-10 bg-red-500/10 border border-red-500/20 text-red-500 rounded-3xl text-center font-bold italic">
              System Error: {error}
           </div>
        ) : (
          <DataTable 
            title="Registered Business Hubs" 
            columns={columns} 
            data={partners.map(p => ({
              ...p,
              partnerName: p.userId?.name || 'Unknown',
              status: p.verified ? (
                <span className="flex items-center gap-2 text-[#22c55e]"><CheckCircle2 size={14}/> Verified</span>
              ) : (
                <span className="flex items-center gap-2 text-[#f59e0b]"><Clock size={14}/> Pending</span>
              )
            }))} 
          />
        )}
      </div>
    </div>
  );
}

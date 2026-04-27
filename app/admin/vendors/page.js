'use client';

import React, { useState, useEffect } from 'react';
import { 
  Store, Users, Target, BarChart, Plus, ArrowRight, ShieldAlert, 
  Loader2, Search, Mail, Phone, MapPin, Tag, Copy, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VendorsManagement() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: '', email: '', phone: '', state: '', district: '' });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await fetch('/api/admin/vendors');
      const data = await res.json();
      if (!data.error) setVendors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVendor)
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchVendors();
        setNewVendor({ name: '', email: '', phone: '', state: '', district: '' });
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Optional: add a toast or visual feedback
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh] bg-[#0b1220]"><Loader2 className="animate-spin text-blue-500" size={48} /></div>;

  const filteredVendors = vendors.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) || 
    v.vendorCode?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 min-h-screen bg-[#0b1220] pb-32">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Store size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 italic">Enterprise Network Control</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic">Vendors <span className="text-blue-500">Matrix.</span></h1>
          <p className="text-slate-500 font-medium italic mt-1 uppercase text-[10px] tracking-widest">Master Control for External Field Agencies & Sub-Agents</p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-4 px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black italic shadow-2xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs"
        >
          <Plus size={20} /> INITIALIZE NEW VENDOR
        </button>
      </motion.div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Network Nodes', value: vendors.length, icon: Store, color: 'text-blue-500' },
          { label: 'Active Pipeline', value: '1.2K', icon: Target, color: 'text-emerald-500' },
          { label: 'Sync Status', value: 'Live', icon: BarChart, color: 'text-indigo-500' },
          { label: 'Security Protocols', value: 'Active', icon: ShieldAlert, color: 'text-rose-500' },
        ].map((stat, idx) => (
          <div key={idx} className="p-10 bg-[#111827] border border-[#1f2937] rounded-[3rem] group hover:border-blue-500/20 transition-all">
             <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic mb-2">{stat.label}</p>
             <div className="flex items-center justify-between">
                <p className="text-4xl font-black text-white italic">{stat.value}</p>
                <stat.icon size={28} className={stat.color} />
             </div>
          </div>
        ))}
      </div>

      {/* Vendor Directory */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-[4rem] overflow-hidden shadow-2xl">
         <div className="p-10 border-b border-[#1f2937] bg-[#0b1220]/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1 max-w-lg">
               <Search className="text-slate-600" size={20} />
               <input 
                 type="text" 
                 placeholder="Search Vendor Name or Code..." 
                 value={search}
                 onChange={e => setSearch(e.target.value)}
                 className="bg-transparent border-none outline-none text-white font-black italic italic-placeholder w-full text-lg"
               />
            </div>
            <div className="flex gap-4">
               <span className="px-4 py-2 bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest rounded-xl italic">Live Feed</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
            {filteredVendors.map((vendor) => (
              <motion.div 
                layout
                key={vendor._id}
                className="p-8 bg-[#0b1220] border border-[#1f2937] rounded-[3rem] group hover:border-blue-500/30 transition-all relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-6">
                    <span className={`w-3 h-3 rounded-full block ${vendor.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`}></span>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center text-blue-500 font-black italic text-xl uppercase">
                          {vendor.name.charAt(0)}
                       </div>
                       <div>
                          <h3 className="text-2xl font-black text-white italic leading-none">{vendor.name}</h3>
                          <div 
                            onClick={() => copyToClipboard(vendor.vendorCode)}
                            className="flex items-center gap-2 mt-2 cursor-pointer group/code"
                          >
                             <Tag size={12} className="text-blue-500" />
                             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover/code:text-white transition-colors">{vendor.vendorCode}</span>
                             <Copy size={10} className="text-slate-700 opacity-0 group-hover/code:opacity-100 transition-all" />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-[#1f2937]">
                       <div className="flex items-center gap-3 text-slate-500">
                          <Mail size={14} className="text-blue-500" />
                          <span className="text-xs font-bold italic">{vendor.email}</span>
                       </div>
                       <div className="flex items-center gap-3 text-slate-500">
                          <Phone size={14} className="text-blue-500" />
                          <span className="text-xs font-bold italic">{vendor.phone}</span>
                       </div>
                       <div className="flex items-center gap-3 text-slate-500">
                          <MapPin size={14} className="text-blue-500" />
                          <span className="text-xs font-bold italic">{vendor.district}, {vendor.state}</span>
                       </div>
                    </div>

                    <div className="pt-6 flex gap-3">
                       <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all italic border border-white/5">
                          View Agents
                       </button>
                       <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all italic shadow-lg shadow-blue-600/20">
                          Performance
                       </button>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>

         {filteredVendors.length === 0 && (
           <div className="py-40 text-center space-y-6">
              <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto text-slate-700">
                 <Store size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white italic">NO VENDORS DETECTED</h3>
                <p className="text-slate-500 font-medium italic mt-2 max-w-sm mx-auto uppercase text-[10px] tracking-widest">Deploy new vendor nodes to expand your supply chain network.</p>
              </div>
           </div>
         )}
      </div>

      {/* Register Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0b1220]/80 backdrop-blur-xl">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="w-full max-w-2xl bg-[#111827] border border-[#1f2937] rounded-[4rem] p-12 shadow-3xl overflow-y-auto max-h-[90vh]"
             >
                <div className="flex items-center justify-between mb-12">
                   <h2 className="text-3xl font-black text-white italic">Initialize <span className="text-blue-500">Vendor Node.</span></h2>
                   <button onClick={() => setShowModal(false)} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-red-500 transition-all"><Plus className="rotate-45" size={24} /></button>
                </div>

                <form onSubmit={handleRegister} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 italic">Full Name / Entity</label>
                        <input required type="text" value={newVendor.name} onChange={e => setNewVendor({...newVendor, name: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white font-black italic outline-none focus:border-blue-500 transition-all" placeholder="e.g. Shiv Shakti Ventures" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 italic">Primary Email</label>
                        <input required type="email" value={newVendor.email} onChange={e => setNewVendor({...newVendor, email: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white font-black italic outline-none focus:border-blue-500 transition-all" placeholder="vendor@adsky.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 italic">Contact Number</label>
                        <input required type="tel" value={newVendor.phone} onChange={e => setNewVendor({...newVendor, phone: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white font-black italic outline-none focus:border-blue-500 transition-all" placeholder="+91 00000 00000" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 italic">Operation State</label>
                        <input required type="text" value={newVendor.state} onChange={e => setNewVendor({...newVendor, state: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white font-black italic outline-none focus:border-blue-500 transition-all" placeholder="e.g. Rajasthan" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 italic">Specific District / HQ</label>
                        <input required type="text" value={newVendor.district} onChange={e => setNewVendor({...newVendor, district: e.target.value})} className="w-full bg-[#0b1220] border border-[#1f2937] rounded-2xl py-4 px-6 text-white font-black italic outline-none focus:border-blue-500 transition-all" placeholder="e.g. Jaipur HQ" />
                      </div>
                   </div>

                   <button disabled={saving} className="w-full py-6 bg-blue-600 text-white font-black uppercase tracking-widest rounded-3xl transition-all shadow-2xl shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50 italic text-sm mt-8">
                     {saving ? <Loader2 size={24} className="animate-spin mx-auto" /> : 'AUTHORIZE REGISTRATION'}
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

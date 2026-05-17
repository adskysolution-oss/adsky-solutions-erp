'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Search, Download, Eye, Loader2, ChevronDown, CheckCircle2,
  AlertCircle, Phone, Mail, MapPin, Building2, CreditCard, ShieldCheck,
  FileText
} from 'lucide-react';

export default function RabbitFarmingAdminPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await fetch('/api/admin/forms/rabbit-farming');
      const data = await res.json();
      if (data.success) {
        setForms(data.forms);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredForms = forms.filter(f => 
    f.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.mobile?.includes(searchTerm) ||
    f.aadhar?.includes(searchTerm)
  );

  return (
    <div className="space-y-8 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Rabbit <span className="text-indigo-600">Farming Leads</span></h1>
          <p className="text-slate-500 mt-1 uppercase text-[10px] font-black tracking-widest">Real-time Form Submissions & Applications</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, phone, aadhar..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold w-72 focus:outline-none focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="animate-spin text-indigo-500" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredForms.map((form, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={form._id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Card Header (Always Visible) */}
              <div 
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group"
                onClick={() => setExpandedId(expandedId === form._id ? null : form._id)}
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-none mb-2 group-hover:text-indigo-600 transition-colors">{form.name}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
                      <span className="flex items-center gap-1"><Phone size={14} /> {form.mobile}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {form.district}, {form.state}</span>
                      <span className="flex items-center gap-1"><CreditCard size={14} /> {form.paymentStatus || 'Pending'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Submitted On</p>
                    <p className="text-sm font-bold text-slate-700">{new Date(form.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${expandedId === form._id ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedId === form._id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-100 bg-slate-50/50"
                  >
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      <DetailSection title="Personal Info" icon={Users}>
                        <DetailRow label="Aadhar" value={form.aadhar} />
                        <DetailRow label="Father/Husband" value={form.parentName} />
                        <DetailRow label="Email" value={form.email} />
                        <DetailRow label="DOB" value={form.dob} />
                        <DetailRow label="Gender" value={form.gender} />
                        <DetailRow label="Category" value={form.socialCategory} />
                      </DetailSection>

                      <DetailSection title="Location" icon={MapPin}>
                        <DetailRow label="State" value={form.state} />
                        <DetailRow label="District" value={form.district} />
                        <DetailRow label="Block" value={form.block} />
                        <DetailRow label="Pincode" value={form.pincode} />
                        <DetailRow label="Full Address" value={form.address} />
                        <DetailRow label="Unit Loc." value={form.unitLocation} />
                      </DetailSection>

                      <DetailSection title="Business & Bank" icon={Building2}>
                        <DetailRow label="Business" value={form.businessActivity} />
                        <DetailRow label="Cost" value={form.projectCost} />
                        <DetailRow label="Bank" value={form.bankName} />
                        <DetailRow label="Branch" value={form.bankBranch} />
                        <DetailRow label="A/C No" value={form.accountNumber} />
                        <DetailRow label="IFSC" value={form.ifscCode} />
                      </DetailSection>

                      <DetailSection title="Agency Info" icon={ShieldCheck}>
                        <DetailRow label="Vendor Code" value={form.vendorCode} />
                        <DetailRow label="Vendor Name" value={form.vendorName} />
                        <DetailRow label="Sub-Vendor" value={form.subVendorCode} />
                        <DetailRow label="Agent Name" value={form.agentName} />
                        <DetailRow label="Agent Phone" value={form.agentMobile} />
                        <DetailRow label="Payment Txn" value={form.txnId} />
                      </DetailSection>

                      <div className="lg:col-span-3 xl:col-span-4 mt-4 pt-6 border-t border-slate-200">
                        <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                          <FileText size={16} /> Documents Status
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {['doc_aadhar_front', 'doc_aadhar_back', 'doc_pan', 'doc_photo', 'doc_bank', 'doc_address', 'doc_land', 'doc_rent_agreement', 'doc_dpr', 'doc_income', 'doc_loan', 'doc_training', 'doc_caste', 'doc_education', 'doc_rural_cert', 'doc_edp', 'doc_affidavit'].map(docKey => (
                            <div key={docKey} className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl">
                               {form[docKey] === 'uploaded' || form[docKey] === 'Document Uploaded ✓' || (form[docKey] && form[docKey].length > 10) ? (
                                  <CheckCircle2 className="text-emerald-500 shrink-0" size={16} />
                               ) : (
                                  <AlertCircle className="text-slate-300 shrink-0" size={16} />
                               )}
                               <span className="text-[9px] font-bold text-slate-600 uppercase truncate">
                                  {docKey.replace('doc_', '').replace('_', ' ')}
                               </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {filteredForms.length === 0 && !loading && (
             <div className="py-20 text-center">
               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                 <Search size={32} />
               </div>
               <h3 className="text-xl font-black text-slate-900">No Forms Found</h3>
               <p className="text-slate-500 font-bold mt-2">There are no Rabbit Farming leads matching your search.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
}

function DetailSection({ title, icon: Icon, children }) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2">
        <Icon size={16} /> {title}
      </h4>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider mb-0.5">{label}</p>
      <p className="text-xs font-bold text-slate-800 break-words">{value || '---'}</p>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Search, Download, Eye, Loader2, ChevronDown, CheckCircle2,
  AlertCircle, Phone, Mail, MapPin, Building2, CreditCard, ShieldCheck,
  FileText, Edit2, Trash2, Upload, Save, X, ExternalLink
} from 'lucide-react';

export default function MoringaFarmingAdminPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  
  // Edit Mode states
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await fetch('/api/admin/forms/moringa-farming');
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

  const startEdit = (form) => {
    setEditId(form._id);
    setEditData({ ...form });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingField(field);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData
        });
        const resData = await res.json();
        if (resData.url) {
          setEditData(prev => ({ ...prev, [field]: resData.url }));
          alert('New file uploaded successfully! Click Save to apply changes.');
        } else {
          alert('Upload failed: ' + (resData.error || 'Unknown error'));
        }
      } catch (err) {
        console.error(err);
        alert('File upload failed');
      } finally {
        setUploadingField(null);
      }
    }
  };

  const deleteDocument = (field) => {
    if (confirm('Are you sure you want to delete this document? You must click Save to confirm.')) {
      setEditData(prev => ({ ...prev, [field]: '' }));
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/forms/moringa-farming/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editId, updatedData: editData })
      });
      const data = await res.json();
      if (data.success) {
        alert('Application updated successfully!');
        setEditId(null);
        fetchForms();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const filteredForms = forms.filter(f => 
    f.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.mobile?.includes(searchTerm) ||
    f.aadhar?.includes(searchTerm)
  );

  return (
    <div className="space-y-8 pb-32 text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter italic">Moringa <span className="text-[#38bdf8]">Farming Leads</span></h1>
          <p className="text-slate-400 mt-1 uppercase text-[10px] font-black tracking-widest">Real-time Form Submissions & Applications</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, phone, aadhar..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-[#111827] border border-[#1f2937] text-white rounded-2xl text-sm font-bold w-72 focus:outline-none focus:border-[#38bdf8] transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#111827] border border-[#1f2937] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#38bdf8] hover:text-[#0b1220] transition-all shadow-xl">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="animate-spin text-[#38bdf8]" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredForms.map((form, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={form._id}
              className="bg-[#111827] border border-[#1f2937] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Card Header (Always Visible) */}
              <div 
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group"
                onClick={() => setExpandedId(expandedId === form._id ? null : form._id)}
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-[#38bdf8]/10 rounded-2xl flex items-center justify-center text-[#38bdf8] shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-none mb-2 group-hover:text-[#38bdf8] transition-colors">{form.name}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
                      <span className="flex items-center gap-1"><Phone size={14} /> {form.mobile}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {form.district}, {form.state}</span>
                      <span className="flex items-center gap-1"><CreditCard size={14} /> {form.paymentStatus || 'Pending'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto text-white">
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Submitted On</p>
                    <p className="text-sm font-bold text-slate-300">{new Date(form.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${expandedId === form._id ? 'bg-[#38bdf8] text-[#0b1220] rotate-180' : 'bg-[#1f2937] text-slate-400 group-hover:bg-[#38bdf8]/20 group-hover:text-[#38bdf8]'}`}>
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
                    className="border-t border-[#1f2937] bg-[#0f172a]/40"
                  >
                    <div className="p-8 space-y-8">
                      {/* Top Action Panel */}
                      <div className="flex justify-between items-center border-b border-[#1f2937] pb-4">
                        <span className="text-xs font-black uppercase tracking-wider text-[#38bdf8] italic">Application Data Manager</span>
                        {editId === form._id ? (
                          <div className="flex gap-2">
                            <button onClick={saveChanges} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md">
                              {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} Save Details
                            </button>
                            <button onClick={cancelEdit} className="flex items-center gap-1.5 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all">
                              <X size={14} /> Cancel
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => startEdit(form)} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md">
                            <Edit2 size={14} /> Edit Information
                          </button>
                        )}
                      </div>

                      {/* Info Fields Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {/* Section: Personal */}
                        <DetailSection title="Personal Info" icon={Users}>
                          <DetailRow label="Name" name="name" value={form.name} isEditing={editId === form._id} editValue={editData.name} onChange={handleInputChange} />
                          <DetailRow label="Aadhar" name="aadhar" value={form.aadhar} isEditing={editId === form._id} editValue={editData.aadhar} onChange={handleInputChange} />
                          <DetailRow label="Father/Husband" name="parentName" value={form.parentName} isEditing={editId === form._id} editValue={editData.parentName} onChange={handleInputChange} />
                          <DetailRow label="Email" name="email" value={form.email} isEditing={editId === form._id} editValue={editData.email} onChange={handleInputChange} />
                          <DetailRow label="DOB" name="dob" value={form.dob} isEditing={editId === form._id} editValue={editData.dob} onChange={handleInputChange} />
                          <DetailRow label="Gender" name="gender" value={form.gender} isEditing={editId === form._id} editValue={editData.gender} onChange={handleInputChange} />
                          <DetailRow label="Category" name="socialCategory" value={form.socialCategory} isEditing={editId === form._id} editValue={editData.socialCategory} onChange={handleInputChange} />
                        </DetailSection>

                        {/* Section: Location */}
                        <DetailSection title="Location" icon={MapPin}>
                          <DetailRow label="State" name="state" value={form.state} isEditing={editId === form._id} editValue={editData.state} onChange={handleInputChange} />
                          <DetailRow label="District" name="district" value={form.district} isEditing={editId === form._id} editValue={editData.district} onChange={handleInputChange} />
                          <DetailRow label="Block" name="block" value={form.block} isEditing={editId === form._id} editValue={editData.block} onChange={handleInputChange} />
                          <DetailRow label="Pincode" name="pincode" value={form.pincode} isEditing={editId === form._id} editValue={editData.pincode} onChange={handleInputChange} />
                          <DetailRow label="Full Address" name="address" value={form.address} isEditing={editId === form._id} editValue={editData.address} onChange={handleInputChange} />
                          <DetailRow label="Unit Loc." name="unitLocation" value={form.unitLocation} isEditing={editId === form._id} editValue={editData.unitLocation} onChange={handleInputChange} />
                        </DetailSection>

                        {/* Section: Business & Bank */}
                        <DetailSection title="Business & Bank" icon={Building2}>
                          <DetailRow label="Business" name="businessActivity" value={form.businessActivity} isEditing={editId === form._id} editValue={editData.businessActivity} onChange={handleInputChange} />
                          <DetailRow label="Cost" name="projectCost" value={form.projectCost} isEditing={editId === form._id} editValue={editData.projectCost} onChange={handleInputChange} />
                          <DetailRow label="Bank" name="bankName" value={form.bankName} isEditing={editId === form._id} editValue={editData.bankName} onChange={handleInputChange} />
                          <DetailRow label="Branch" name="bankBranch" value={form.bankBranch} isEditing={editId === form._id} editValue={editData.bankBranch} onChange={handleInputChange} />
                          <DetailRow label="A/C No" name="accountNumber" value={form.accountNumber} isEditing={editId === form._id} editValue={editData.accountNumber} onChange={handleInputChange} />
                          <DetailRow label="IFSC" name="ifscCode" value={form.ifscCode} isEditing={editId === form._id} editValue={editData.ifscCode} onChange={handleInputChange} />
                        </DetailSection>

                        {/* Section: Agency */}
                        <DetailSection title="Agency Info" icon={ShieldCheck}>
                          <DetailRow label="Vendor Code" name="vendorCode" value={form.vendorCode} isEditing={editId === form._id} editValue={editData.vendorCode} onChange={handleInputChange} />
                          <DetailRow label="Vendor Name" name="vendorName" value={form.vendorName} isEditing={editId === form._id} editValue={editData.vendorName} onChange={handleInputChange} />
                          <DetailRow label="Sub-Vendor" name="subVendorCode" value={form.subVendorCode} isEditing={editId === form._id} editValue={editData.subVendorCode} onChange={handleInputChange} />
                          <DetailRow label="Agent Name" name="agentName" value={form.agentName} isEditing={editId === form._id} editValue={editData.agentName} onChange={handleInputChange} />
                          <DetailRow label="Agent Phone" name="agentMobile" value={form.agentMobile} isEditing={editId === form._id} editValue={editData.agentMobile} onChange={handleInputChange} />
                          <DetailRow label="Payment Txn" name="txnId" value={form.txnId} isEditing={editId === form._id} editValue={editData.txnId} onChange={handleInputChange} />
                        </DetailSection>
                      </div>

                      {/* Documents Section */}
                      <div className="pt-6 border-t border-[#1f2937]">
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#38bdf8] mb-6 flex items-center gap-2">
                          <FileText size={16} /> Documents Management Panel
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {['doc_aadhar_front', 'doc_aadhar_back', 'doc_pan', 'doc_photo', 'doc_bank', 'doc_address', 'doc_land', 'doc_rent_agreement', 'doc_dpr', 'doc_income', 'doc_loan', 'doc_training', 'doc_caste', 'doc_education', 'doc_rural_cert', 'doc_edp', 'doc_affidavit'].map(docKey => {
                            const docValue = editId === form._id ? editData[docKey] : form[docKey];
                            const isUploaded = docValue && docValue.startsWith('http');
                            
                            return (
                              <div key={docKey} className="p-4 bg-[#111827] border border-[#1f2937] rounded-2xl flex flex-col justify-between gap-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">
                                  {docKey.replace('doc_', '').replace(/_/g, ' ')}
                                </span>
                                
                                <div className="flex items-center gap-3">
                                  {isUploaded ? (
                                    <div className="flex-1 flex items-center justify-between bg-emerald-950/20 border border-emerald-900/30 p-2.5 rounded-xl">
                                      <div className="flex items-center gap-2 truncate">
                                        <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                                        <span className="text-xs font-bold text-emerald-400 truncate">Uploaded</span>
                                      </div>
                                      <a href={docValue} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-[#1f2937] hover:bg-[#38bdf8]/20 hover:text-[#38bdf8] text-slate-300 rounded-lg transition-all shrink-0" title="Open Document">
                                        <ExternalLink size={14} />
                                      </a>
                                    </div>
                                  ) : (
                                    <div className="flex-grow flex items-center gap-2 bg-[#1f2937] p-2.5 rounded-xl border border-dashed border-[#2d3748]">
                                      <AlertCircle className="text-slate-500 shrink-0" size={18} />
                                      <span className="text-xs font-bold text-slate-500">Not Uploaded</span>
                                    </div>
                                  )}
                                </div>

                                {/* Doc Actions in Edit Mode */}
                                {editId === form._id && (
                                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1f2937]">
                                    {uploadingField === docKey ? (
                                      <span className="flex items-center gap-1 text-[10px] font-black text-[#38bdf8] uppercase">
                                        <Loader2 className="animate-spin" size={12} /> Uploading...
                                      </span>
                                    ) : (
                                      <>
                                        <label className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-[10px] font-bold cursor-pointer transition-all">
                                          <Upload size={12} /> Re-Upload
                                          <input type="file" onChange={(e) => handleFileChange(e, docKey)} className="hidden" />
                                        </label>
                                        {isUploaded && (
                                          <button onClick={() => deleteDocument(docKey)} className="p-1.5 bg-rose-950/20 hover:bg-rose-600 hover:text-white text-rose-500 border border-rose-900/30 rounded-lg transition-all">
                                            <Trash2 size={12} />
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
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
               <div className="w-20 h-20 bg-[#111827] border border-[#1f2937] rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                 <Search size={32} />
               </div>
               <h3 className="text-xl font-bold text-white">No Forms Found</h3>
               <p className="text-slate-400 font-semibold mt-2">There are no Moringa Farming leads matching your search.</p>
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
      <h4 className="text-xs font-black uppercase tracking-widest text-[#38bdf8] flex items-center gap-2">
        <Icon size={16} /> {title}
      </h4>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function DetailRow({ label, name, value, isEditing, editValue, onChange }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider mb-1">{label}</span>
      {isEditing ? (
        <input 
          type="text" 
          name={name} 
          value={editValue || ''} 
          onChange={onChange}
          className="px-3 py-2 bg-[#1f2937] border border-[#2d3748] rounded-xl text-xs font-bold text-white outline-none focus:border-[#38bdf8] transition-all w-full"
        />
      ) : (
        <span className="text-xs font-bold text-slate-300 break-words">{value || '---'}</span>
      )}
    </div>
  );
}

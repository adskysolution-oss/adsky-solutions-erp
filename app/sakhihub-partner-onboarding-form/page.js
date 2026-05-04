'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, ShieldCheck, MapPin, Briefcase, Heart, 
  Building2, CreditCard, FileUp, Eye, CheckCircle2, 
  AlertCircle, Loader2, ArrowRight, ArrowLeft, 
  Check, X, Phone, Mail, Globe, Search, Plus, Trash2, Camera, Edit3, Upload, CheckCircle, Calendar, Users
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Basic Details', icon: User, fields: ['applicantType', 'organizationName', 'contactPersonName', 'designation', 'mobileNumber', 'emailId'] },
  { id: 2, title: 'Legal & Identity', icon: ShieldCheck, fields: ['aadhaarNumber', 'panNumber', 'registrationDate'] },
  { id: 3, title: 'Address Details', icon: MapPin, fields: ['address', 'state', 'district', 'pincode'] },
  { id: 4, title: 'Work Area', icon: Globe, fields: ['workAreaType'] },
  { id: 5, title: 'Capacity & Experience', icon: Heart, fields: ['interestedWorkCategories', 'monthlyCapacity', 'natureOfWork'] },
  { id: 6, title: 'Bank Details', icon: CreditCard, fields: ['bankName', 'accountNumber', 'ifscCode'] },
  { id: 7, title: 'Document Upload', icon: FileUp, fields: [] },
  { id: 8, title: 'Review & Submit', icon: Eye, fields: [] }
];

export default function SakhiHubOnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [formData, setFormData] = useState({
    applicantType: '', organizationName: '', contactPersonName: '', designation: '',
    mobileNumber: '', alternateMobileNumber: '', emailId: '',
    whatsappNumber: '', websiteSocialLink: '', registrationDate: '',
    aadhaarNumber: '', panNumber: '', gstNumber: '',
    ngoRegistrationNumber: '', firmRegistrationNumber: '', udyamMsmeNumber: '',
    address: '', state: '', district: '', tehsil: '', block: '', cityVillage: '', pincode: '',
    officeType: '', staffCount: '',
    workAreaType: '', selectedStates: [], selectedDistricts: [], manualWorkArea: '',
    interestedWorkCategories: [], monthlyCapacity: '', natureOfWork: '',
    bankName: '', accountHolderName: '', accountNumber: '', confirmAccountNumber: '', ifscCode: '', bankBranch: '',
    documents: {
      aadhaarFront: '', aadhaarBack: '', panCard: '', ngoFirmProof: '',
      gstCertificate: '', udyamCertificate: '', cancelledCheque: '',
      officePhoto: '', workProof: ''
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states').then(res => res.json()).then(data => setStates(data.states || [])).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (formData.state && states.length > 0) {
      const stateObj = states.find(s => s.state_name.toLowerCase().includes(formData.state.toLowerCase()) || formData.state.toLowerCase().includes(s.state_name.toLowerCase()));
      if (stateObj) {
        fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateObj.state_id}`).then(res => res.json()).then(data => setDistricts(data.districts || [])).catch(err => console.error(err));
      }
    }
  }, [formData.state, states]);

  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`).then(res => res.json()).then(data => {
        if (data[0].Status === "Success") {
          const po = data[0].PostOffice[0];
          setFormData(prev => ({ ...prev, state: po.State, district: po.District, block: po.Block, cityVillage: po.Name }));
        }
      }).catch(err => console.error(err));
    }
  }, [formData.pincode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => {
      const current = prev[name] || [];
      return current.includes(value) ? { ...prev, [name]: current.filter(v => v !== value) } : { ...prev, [name]: [...current, value] };
    });
  };

  const validateStep = (stepId) => {
    const step = STEPS.find(s => s.id === stepId);
    const newErrors = {};
    if (step.fields) {
      step.fields.forEach(field => {
        if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) newErrors[field] = 'Required';
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => { if (validateStep(currentStep)) { setCurrentStep(prev => Math.min(prev + 1, 8)); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const prevStep = () => { setCurrentStep(prev => Math.max(prev - 1, 1)); window.scrollTo(0, 0); };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sakhihub/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (res.ok) { setApplicationId(data.applicationId); setSubmitted(true); } else { alert(data.error); }
    } catch (err) { alert('Submission Error'); }
    finally { setLoading(false); }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 font-sans">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-white border-4 border-[#DEB887] rounded-[3rem] p-12 text-center shadow-2xl">
          <CheckCircle2 size={80} className="mx-auto mb-8 text-green-600" />
          <h2 className="text-4xl font-black text-[#B32D2D] mb-4 italic uppercase tracking-tighter leading-none">Success!</h2>
          <p className="text-gray-500 font-bold mb-10 leading-relaxed uppercase text-xs tracking-widest italic">Application ID: <span className="text-[#B32D2D] text-lg block mt-2">{applicationId}</span></p>
          <button onClick={() => window.location.href = '/'} className="w-full py-5 bg-[#B32D2D] text-white font-black rounded-2xl hover:bg-[#8e2424] shadow-xl uppercase italic tracking-widest">Done</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24 font-sans text-slate-800">
      <header className="sticky top-0 z-50 bg-[#B32D2D] text-white shadow-2xl border-b-[6px] border-[#DEB887]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative">
          <div className="bg-white p-1 rounded-xl rotate-[-2deg] shadow-lg"><img src="/logo.jpeg" className="h-12" /></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <h1 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter">SakhiHub <span className="text-[#DEB887]">Onboarding</span></h1>
          </div>
          <Heart className="text-[#DEB887] animate-pulse" />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 mt-16">
        <div className="flex justify-between mb-16 overflow-x-auto no-scrollbar py-6 px-4 gap-4">
          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1 min-w-[100px] group cursor-pointer" onClick={() => step.id < currentStep && setCurrentStep(step.id)}>
              <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center border-4 transition-all duration-500 shadow-xl ${currentStep >= step.id ? 'bg-[#B32D2D] border-[#DEB887] text-white rotate-[-3deg]' : 'bg-white border-slate-100 text-slate-300'}`}>
                {currentStep > step.id ? <Check size={24} /> : <step.icon size={22} />}
              </div>
              <span className={`mt-4 text-[9px] font-black uppercase tracking-widest italic text-center ${currentStep >= step.id ? 'text-[#B32D2D]' : 'text-slate-400'}`}>{step.title}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border-[4px] border-[#DEB887] rounded-[4rem] shadow-[0_20px_80px_rgba(0,0,0,0.1)] overflow-hidden mb-24">
          <div className="bg-[#DEB887] px-12 py-6 flex justify-between items-center shadow-inner">
             <h3 className="text-white font-black italic uppercase tracking-[0.2em]">{STEPS.find(s => s.id === currentStep).title}</h3>
             <span className="bg-white/20 text-white px-5 py-2 rounded-full text-[10px] font-black italic uppercase">Step {currentStep} of 8</span>
          </div>

          <div className="p-10 md:p-16">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <SelectField label="Applicant Type" name="applicantType" value={formData.applicantType} onChange={handleChange} error={errors.applicantType} options={['NGO', 'Vendor / Distributor', 'SHG Group', 'Individual Partner', 'State Partner', 'District Partner', 'Block / Tehsil Partner']} required />
                    <InputField label="Firm / NGO Name" name="organizationName" value={formData.organizationName} onChange={handleChange} error={errors.organizationName} placeholder="As per registration" required />
                    <InputField label="Contact Person" name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} error={errors.contactPersonName} required />
                    <InputField label="Designation" name="designation" value={formData.designation} onChange={handleChange} error={errors.designation} placeholder="e.g. Director, President" required />
                    <InputField label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} error={errors.mobileNumber} maxLength={10} required />
                    <InputField label="Email ID" name="emailId" value={formData.emailId} onChange={handleChange} error={errors.emailId} type="email" required />
                    <InputField label="WhatsApp Number" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} />
                    <InputField label="Website / Social Link" name="websiteSocialLink" value={formData.websiteSocialLink} onChange={handleChange} />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <InputField label="Registration Date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} error={errors.registrationDate} type="date" required />
                    <InputField label="Aadhaar Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} error={errors.aadhaarNumber} maxLength={12} required />
                    <InputField label="PAN Number" name="panNumber" value={formData.panNumber} onChange={handleChange} error={errors.panNumber} maxLength={10} required />
                    <InputField label="GST Number (Optional)" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
                    <InputField label="NGO / Firm Reg #" name="ngoRegistrationNumber" value={formData.ngoRegistrationNumber} onChange={handleChange} />
                    <InputField label="Udyam / MSME #" name="udyamMsmeNumber" value={formData.udyamMsmeNumber} onChange={handleChange} />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="md:col-span-2"><InputField label="Full Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} placeholder="House/Plot No, Street, Landmark" required /></div>
                    <InputField label="PIN Code" name="pincode" value={formData.pincode} onChange={handleChange} error={errors.pincode} maxLength={6} required />
                    <InputField label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} required />
                    <InputField label="District" name="district" value={formData.district} onChange={handleChange} error={errors.district} required />
                    <InputField label="Tehsil / Block" name="block" value={formData.block} onChange={handleChange} />
                    <SelectField label="Office Type" name="officeType" value={formData.officeType} onChange={handleChange} options={['Owned', 'Rented', 'Home Office', 'Collaborated']} />
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-12">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {['Full State', 'Multiple States', 'Single District', 'Multiple Districts', 'Block Level', 'Village Level'].map(t => (
                        <button key={t} onClick={() => setFormData(p => ({ ...p, workAreaType: t }))} className={`px-8 py-6 rounded-[2rem] border-4 font-black text-[10px] uppercase italic transition-all ${formData.workAreaType === t ? 'bg-[#B32D2D] border-[#B32D2D] text-white shadow-xl' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>{t}</button>
                      ))}
                    </div>
                    {formData.workAreaType && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-10 bg-[#FDFBF7] border-4 border-slate-100 rounded-[3rem] space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <InputField label="Type State Name" name="state" value={formData.state} onChange={handleChange} />
                           <div className="space-y-3">
                              <p className="text-[10px] font-black text-slate-400 uppercase italic">Or Select State</p>
                              <select name="state" value={formData.state} onChange={handleChange} className="w-full px-6 py-5 bg-white border-2 border-slate-100 rounded-3xl font-black text-xs appearance-none cursor-pointer"><option value="">--- Select ---</option>{states.map(s => <option key={s.state_id} value={s.state_name}>{s.state_name}</option>)}</select>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <p className="text-[10px] font-black text-[#B32D2D] uppercase italic tracking-widest">Manually Define Your Service Areas (Cities/Blocks/Districts)</p>
                           <textarea name="manualWorkArea" value={formData.manualWorkArea} onChange={handleChange} className="w-full px-8 py-6 bg-white border-2 border-slate-100 rounded-[2.5rem] font-bold text-xs min-h-[150px] outline-none focus:border-[#B32D2D] transition-all shadow-inner" placeholder="E.g. Full Madhya Pradesh / Only Indore & Ujjain Districts..."></textarea>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-12">
                    <p className="text-[10px] font-black text-[#B32D2D] uppercase italic tracking-widest mb-6 underline">Work Interests & Current Strength</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Women Awareness', 'Sanitary Pad Distribution', 'SHG Training', 'NGO Collaboration', 'Membership Drive', 'Rural Health Camps', 'Distribution / Franchise'].map(cat => (
                        <button key={cat} onClick={() => handleMultiSelect('interestedWorkCategories', cat)} className={`px-8 py-5 rounded-2xl border-4 text-[11px] font-black text-left flex justify-between items-center transition-all ${formData.interestedWorkCategories?.includes(cat) ? 'border-[#B32D2D] bg-red-50 text-[#B32D2D]' : 'border-slate-50 bg-white text-slate-400'}`}>{cat} {formData.interestedWorkCategories?.includes(cat) && <CheckCircle size={18} />}</button>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <SelectField label="Monthly Awareness Capacity" name="monthlyCapacity" value={formData.monthlyCapacity} onChange={handleChange} options={['Below 500 women', '500 - 2,000 women', '2,000 - 10,000 women', '10,000+ women']} required />
                      <InputField label="Total Staff / Volunteers" name="staffCount" value={formData.staffCount} onChange={handleChange} type="number" />
                    </div>
                    <div className="space-y-3">
                       <p className="text-[10px] font-black text-slate-400 uppercase italic">Nature of Current Work / Activities</p>
                       <textarea name="natureOfWork" value={formData.natureOfWork} onChange={handleChange} error={errors.natureOfWork} className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] font-bold text-xs min-h-[120px] outline-none focus:border-[#B32D2D]" placeholder="Briefly describe your current activities..." required></textarea>
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <InputField label="Account Holder Name" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} required autoComplete="off" />
                    <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} required autoComplete="off" />
                    <InputField label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleChange} error={errors.ifscCode} maxLength={11} required autoComplete="off" />
                    <InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} type="password" required autoComplete="new-password" />
                    <InputField label="Confirm Account Number" name="confirmAccountNumber" value={formData.confirmAccountNumber} onChange={handleChange} error={errors.confirmAccountNumber} required autoComplete="new-password" />
                  </div>
                )}

                {currentStep === 7 && (
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                      {[
                        { k: 'aadhaarFront', l: 'Aadhaar Front' }, { k: 'aadhaarBack', l: 'Aadhaar Back' },
                        { k: 'panCard', l: 'PAN Card' }, { k: 'ngoFirmProof', l: 'Reg. Proof' },
                        { k: 'cancelledCheque', l: 'Bank Proof' }, { k: 'officePhoto', l: 'Office Photo' }
                      ].map(doc => (
                        <FileUploadField key={doc.k} label={doc.l} value={formData.documents[doc.k]} onChange={(e) => {
                           const file = e.target.files[0]; if (file) { const r = new FileReader(); r.onloadend = () => setFormData(p => ({ ...p, documents: { ...p.documents, [doc.k]: r.result } })); r.readAsDataURL(file); }
                        }} onClear={() => setFormData(p => ({ ...p, documents: { ...p.documents, [doc.k]: '' } }))} onPreview={() => setPreviewImage(formData.documents[doc.k])} />
                      ))}
                   </div>
                )}

                {currentStep === 8 && (
                   <div className="space-y-12">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                         <ReviewItem title="Primary Contact" icon={User} data={{ 'Partner': formData.applicantType, 'Org': formData.organizationName, 'Person': formData.contactPersonName, 'Designation': formData.designation, 'Mobile': formData.mobileNumber, 'Email': formData.emailId }} onEdit={() => setCurrentStep(1)} />
                         <ReviewItem title="Legal & Identity" icon={ShieldCheck} data={{ 'Reg. Date': formData.registrationDate, 'Aadhaar': formData.aadhaarNumber, 'PAN': formData.panNumber, 'GST': formData.gstNumber, 'District': formData.district, 'Pincode': formData.pincode }} onEdit={() => setCurrentStep(2)} />
                         <ReviewItem title="Work & Capacity" icon={Briefcase} data={{ 'Work Type': formData.workAreaType, 'Capacity': formData.monthlyCapacity, 'Interests': formData.interestedWorkCategories?.join(', '), 'Staff': formData.staffCount }} onEdit={() => setCurrentStep(4)} />
                         <ReviewItem title="Bank Information" icon={CreditCard} data={{ 'Holder': formData.accountHolderName, 'Bank': formData.bankName, 'IFSC': formData.ifscCode, 'AC': 'XXXX XXXX ' + formData.accountNumber?.slice(-4) }} onEdit={() => setCurrentStep(6)} />
                      </div>
                      <div className="p-10 bg-slate-50 border-4 border-slate-100 rounded-[3rem] space-y-8">
                         <p className="text-[10px] font-black text-[#B32D2D] uppercase tracking-widest italic underline">Self Declaration</p>
                         <div className="flex items-start gap-5 cursor-pointer" onClick={() => document.getElementById('declare').click()}>
                            <input type="checkbox" id="declare" className="w-8 h-8 rounded-xl accent-[#B32D2D] cursor-pointer mt-1 shadow-sm" required />
                            <label className="text-[11px] font-bold text-slate-600 leading-relaxed italic">I hereby declare that all the information provided above is true to the best of my knowledge and I agree to the terms and conditions of SakhiHub partnership initiative.</label>
                         </div>
                      </div>
                   </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-8 mt-16 pt-12 border-t-4 border-[#DEB887]/20">
               {currentStep > 1 && <button onClick={prevStep} className="flex-1 py-5 border-4 border-[#B32D2D] text-[#B32D2D] font-black rounded-2xl hover:bg-red-50 uppercase tracking-[0.2em] italic text-[11px] flex items-center justify-center gap-3"><ArrowLeft size={18} /> BACK</button>}
               {currentStep < 8 ? <button onClick={nextStep} className="flex-[2] py-5 bg-[#B32D2D] text-white font-black rounded-2xl hover:bg-[#8e2424] shadow-2xl uppercase tracking-[0.2em] italic text-[11px] flex items-center justify-center gap-3">CONTINUE TO STEP {currentStep + 1} <ArrowRight size={18} /></button> : <button onClick={handleSubmit} disabled={loading} className="flex-[2] py-5 bg-[#22c55e] text-white font-black rounded-2xl hover:bg-[#16a34a] shadow-2xl uppercase tracking-[0.2em] italic text-[11px] flex items-center justify-center gap-3">{loading ? <Loader2 className="animate-spin" /> : 'FINAL SUBMIT APPLICATION'}</button>}
            </div>
          </div>
        </div>
      </div>

      {previewImage && <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-8 backdrop-blur-xl" onClick={() => setPreviewImage(null)}><img src={previewImage} className="max-w-full max-h-full rounded-[3rem] border-8 border-white shadow-[0_0_100px_rgba(0,0,0,0.5)]" /></div>}
    </div>
  );
}

function InputField({ label, name, value, onChange, error, type="text", required=false, ...props }) {
  return (
    <div className="space-y-3">
      <div className="bg-[#B32D2D] text-white text-[9px] font-black px-4 py-1.5 rounded-xl inline-block uppercase italic tracking-widest">{label} {required && '*'}</div>
      <input type={type} name={name} value={value} onChange={onChange} className={`w-full px-6 py-5 bg-[#FDFBF7] border-2 rounded-2xl font-bold text-xs text-slate-700 outline-none transition-all shadow-inner ${error ? 'border-red-500' : 'border-slate-100 focus:border-[#B32D2D] focus:shadow-lg focus:shadow-[#B32D2D]/5'}`} {...props} />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, error, required=false }) {
  return (
    <div className="space-y-3">
      <div className="bg-[#B32D2D] text-white text-[9px] font-black px-4 py-1.5 rounded-xl inline-block uppercase italic tracking-widest">{label} {required && '*'}</div>
      <select name={name} value={value} onChange={onChange} className="w-full px-6 py-5 bg-[#FDFBF7] border-2 border-slate-100 rounded-2xl font-bold text-xs text-slate-700 outline-none focus:border-[#B32D2D] shadow-inner appearance-none cursor-pointer">
        <option value="">Select Option</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function FileUploadField({ label, value, onChange, onClear, onPreview }) {
  return (
    <div className="space-y-4">
       <p className="text-[9px] font-black text-slate-400 uppercase text-center tracking-widest italic">{label}</p>
       <div className={`relative h-40 rounded-[2.5rem] border-4 border-dashed transition-all flex flex-col items-center justify-center ${value ? 'border-green-500 bg-green-50/10' : 'border-slate-100 bg-slate-50 hover:border-[#B32D2D]'}`}>
          {value ? <div className="w-full h-full p-3 relative"><img src={value} onClick={onPreview} className="w-full h-full object-cover rounded-[2rem] cursor-zoom-in" /><button onClick={onClear} className="absolute -top-3 -right-3 w-10 h-10 bg-red-500 text-white rounded-full border-4 border-white shadow-lg"><X size={18} /></button></div> : <><input type="file" onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" /><Camera size={32} className="text-[#B32D2D]/30" /><p className="text-[9px] font-black text-slate-300 mt-3 uppercase tracking-widest">Upload</p></>}
       </div>
    </div>
  );
}

function ReviewItem({ title, icon: Icon, data, onEdit }) {
  return (
    <div className="p-8 bg-white border-2 border-slate-50 rounded-[3rem] shadow-xl hover:border-[#B32D2D] transition-all group relative">
       <div className="flex justify-between items-center mb-6"><div className="flex items-center gap-3"><div className="p-2 bg-[#B32D2D]/10 rounded-xl text-[#B32D2D]"><Icon size={16} /></div><h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">{title}</h4></div><button onClick={onEdit} className="p-3 text-slate-200 hover:text-[#B32D2D] opacity-0 group-hover:opacity-100 transition-all"><Edit3 size={18} /></button></div>
       <div className="space-y-3">{Object.entries(data).map(([k, v]) => (<div key={k} className="flex justify-between items-start gap-4"><span className="text-[9px] font-black text-slate-400 uppercase italic leading-loose">{k}</span><span className="text-[11px] font-black text-slate-800 text-right leading-loose">{v || '---'}</span></div>))}</div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, ShieldCheck, MapPin, Briefcase, Heart, 
  Building2, CreditCard, FileUp, Eye, CheckCircle2, 
  AlertCircle, Loader2, ArrowRight, ArrowLeft, 
  Check, X, Phone, Mail, Globe, Search, Plus, Trash2, Camera, Edit3, Upload, CheckCircle, Map
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Basic Details', icon: User, fields: ['applicantType', 'organizationName', 'contactPersonName', 'mobileNumber', 'emailId'] },
  { id: 2, title: 'Identity & Legal', icon: ShieldCheck, fields: ['aadhaarNumber', 'panNumber'] },
  { id: 3, title: 'Address Details', icon: MapPin, fields: ['address', 'state', 'district', 'pincode'] },
  { id: 4, title: 'Work Area', icon: Globe, fields: ['workAreaType'] },
  { id: 5, title: 'Work Interest', icon: Heart, fields: ['interestedWorkCategories', 'monthlyCapacity'] },
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
    applicantType: '', organizationName: '', contactPersonName: '',
    mobileNumber: '', alternateMobileNumber: '', emailId: '',
    whatsappNumber: '', websiteSocialLink: '',
    otpVerified: true, 
    aadhaarNumber: '', panNumber: '', gstNumber: '',
    ngoRegistrationNumber: '', firmRegistrationNumber: '', udyamMsmeNumber: '',
    address: '', state: '', district: '', tehsil: '', block: '', cityVillage: '', pincode: '',
    workAreaType: '', selectedStates: [], selectedDistricts: [], manualWorkArea: '',
    interestedWorkCategories: [], monthlyCapacity: '', teamSize: '', experience: [],
    bankName: '', accountHolderName: '', accountNumber: '', confirmAccountNumber: '', ifscCode: '', bankBranch: '',
    documents: {
      aadhaarFront: '', aadhaarBack: '', panCard: '', ngoFirmProof: '',
      gstCertificate: '', udyamCertificate: '', cancelledCheque: '',
      officePhoto: '', workProof: ''
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states')
      .then(res => res.json())
      .then(data => setStates(data.states || []))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (formData.state && states.length > 0) {
      const stateObj = states.find(s => s.state_name.toLowerCase().includes(formData.state.toLowerCase()) || formData.state.toLowerCase().includes(s.state_name.toLowerCase()));
      if (stateObj) {
        fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateObj.state_id}`)
          .then(res => res.json())
          .then(data => setDistricts(data.districts || []))
          .catch(err => console.error(err));
      }
    }
  }, [formData.state, states]);

  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`)
        .then(res => res.json())
        .then(data => {
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
      if (current.includes(value)) {
        return { ...prev, [name]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [name]: [...current, value] };
      }
    });
  };

  const validateStep = (stepId) => {
    const step = STEPS.find(s => s.id === stepId);
    const newErrors = {};
    if (step.fields) {
      step.fields.forEach(field => {
        if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
          newErrors[field] = 'Required';
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 8));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sakhihub/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setApplicationId(data.applicationId);
        setSubmitted(true);
      } else { alert(data.error); }
    } catch (err) { alert('Submission Error'); }
    finally { setLoading(false); }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-white border-4 border-[#DEB887] rounded-[3rem] p-10 text-center shadow-2xl">
          <CheckCircle2 size={72} className="mx-auto mb-8 text-green-600" />
          <h2 className="text-4xl font-black text-[#B32D2D] mb-4 italic uppercase">Success!</h2>
          <p className="text-gray-600 font-bold mb-8">Your Application ID: <span className="text-[#B32D2D]">{applicationId}</span></p>
          <button onClick={() => window.location.href = '/'} className="w-full py-5 bg-[#B32D2D] text-white font-black rounded-2xl hover:bg-[#8e2424]">OK</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans">
      <header className="sticky top-0 z-50 bg-[#B32D2D] text-white shadow-2xl border-b-[6px] border-[#DEB887]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between relative">
          <div className="bg-white p-1 rounded-xl rotate-[-2deg]"><img src="/logo.jpeg" className="h-12" /></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <h1 className="text-2xl md:text-3xl font-black uppercase italic">SakhiHub <span className="text-[#DEB887]">Onboarding</span></h1>
          </div>
          <Heart className="text-[#DEB887] animate-pulse" />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 mt-12">
        <div className="flex justify-between mb-12 overflow-x-auto no-scrollbar py-4 px-2">
          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1 min-w-[80px]">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 shadow-lg ${currentStep >= step.id ? 'bg-[#B32D2D] border-[#DEB887] text-white' : 'bg-white border-gray-200 text-gray-300'}`}>
                {currentStep > step.id ? <Check size={20} /> : <step.icon size={18} />}
              </div>
              <span className={`mt-2 text-[8px] font-black uppercase tracking-tighter ${currentStep >= step.id ? 'text-[#B32D2D]' : 'text-gray-400'}`}>{step.title}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border-[3px] border-[#DEB887] rounded-[3rem] shadow-2xl overflow-hidden mb-20">
          <div className="bg-[#DEB887] px-10 py-5 flex justify-between items-center">
             <h3 className="text-white font-black italic uppercase tracking-widest">{STEPS.find(s => s.id === currentStep).title}</h3>
             <span className="bg-white/20 text-white px-4 py-1 rounded-full text-[10px] font-bold">STEP {currentStep} OF 8</span>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SelectField label="Applicant Type" name="applicantType" value={formData.applicantType} onChange={handleChange} error={errors.applicantType} options={['NGO', 'Vendor / Distributor', 'SHG Group', 'Individual Partner', 'State Partner', 'District Partner', 'Block / Tehsil Partner']} required />
                    <InputField label="Organization Name" name="organizationName" value={formData.organizationName} onChange={handleChange} error={errors.organizationName} placeholder="Enter Name" required />
                    <InputField label="Contact Person" name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} error={errors.contactPersonName} required />
                    <InputField label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} error={errors.mobileNumber} maxLength={10} required />
                    <InputField label="Email ID" name="emailId" value={formData.emailId} onChange={handleChange} error={errors.emailId} type="email" required />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Aadhaar Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} error={errors.aadhaarNumber} maxLength={12} required />
                    <InputField label="PAN Number" name="panNumber" value={formData.panNumber} onChange={handleChange} error={errors.panNumber} maxLength={10} required />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2"><InputField label="Full Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} required /></div>
                    <InputField label="PIN Code" name="pincode" value={formData.pincode} onChange={handleChange} error={errors.pincode} maxLength={6} required />
                    <InputField label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} required />
                    <InputField label="District" name="district" value={formData.district} onChange={handleChange} error={errors.district} required />
                    <InputField label="Tehsil/Block" name="block" value={formData.block} onChange={handleChange} />
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-10">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {['Full State Level', 'Multiple States', 'Single District', 'Multiple Districts', 'Block / Tehsil Level', 'City / Village Level'].map(t => (
                        <button key={t} onClick={() => setFormData(p => ({ ...p, workAreaType: t }))} className={`px-6 py-4 rounded-2xl border-2 font-black text-[10px] transition-all ${formData.workAreaType === t ? 'bg-[#B32D2D] border-[#B32D2D] text-white' : 'bg-white border-gray-100 text-gray-500'}`}>{t}</button>
                      ))}
                    </div>

                    {formData.workAreaType && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-slate-50 border-2 border-slate-100 rounded-[2rem] space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <InputField label="State Name (For Selection)" name="state" value={formData.state} onChange={handleChange} placeholder="Type State Name" />
                           <div className="space-y-2">
                              <div className="bg-[#B32D2D] text-white text-[8px] font-black px-3 py-1 rounded inline-block uppercase italic">Or Select from List</div>
                              <select name="state" value={formData.state} onChange={handleChange} className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl font-bold text-xs">
                                <option value="">--- Select State ---</option>
                                {states.map(s => <option key={s.state_id} value={s.state_name}>{s.state_name}</option>)}
                              </select>
                           </div>
                        </div>

                        {(formData.workAreaType.includes('State') || formData.workAreaType.includes('District')) && (
                           <div className="space-y-6 pt-6 border-t border-slate-200">
                             {formData.workAreaType === 'Multiple States' && (
                               <div className="space-y-4">
                                  <p className="text-[10px] font-black text-gray-400 uppercase italic">Click to select Multiple States:</p>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-[200px] overflow-y-auto p-2 no-scrollbar border-2 border-gray-100 rounded-2xl bg-white">
                                    {states.map(s => (
                                      <button key={s.state_id} onClick={() => handleMultiSelect('selectedStates', s.state_name)} className={`px-2 py-2 rounded-lg border text-[8px] font-bold ${formData.selectedStates?.includes(s.state_name) ? 'bg-[#B32D2D] text-white border-[#B32D2D]' : 'bg-white text-gray-400'}`}>{s.state_name}</button>
                                    ))}
                                  </div>
                               </div>
                             )}

                             {(formData.workAreaType.includes('District')) && (
                               <div className="space-y-4">
                                  <p className="text-[10px] font-black text-gray-400 uppercase italic">Select Districts for {formData.state || 'Selected State'}:</p>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto p-2 no-scrollbar border-2 border-gray-100 rounded-2xl bg-white">
                                    {districts.map(d => (
                                      <button key={d.district_id} onClick={() => handleMultiSelect('selectedDistricts', d.district_name)} className={`px-2 py-2 rounded-lg border text-[8px] font-bold ${formData.selectedDistricts?.includes(d.district_name) ? 'bg-[#B32D2D] text-white border-[#B32D2D]' : 'bg-white text-gray-400'}`}>{d.district_name}</button>
                                    ))}
                                  </div>
                               </div>
                             )}

                             {/* Manual Entry Field */}
                             <div className="space-y-3">
                                <div className="bg-[#B32D2D] text-white text-[8px] font-black px-3 py-1 rounded inline-block uppercase italic">Enter Work Areas Manually (If not in list)</div>
                                <textarea name="manualWorkArea" value={formData.manualWorkArea} onChange={handleChange} className="w-full px-6 py-5 bg-white border-2 border-gray-100 rounded-[2rem] font-bold text-xs min-h-[120px] outline-none focus:border-[#B32D2D] transition-all shadow-inner" placeholder="E.g. Indore, Bhopal, Dewas (Madhya Pradesh)"></textarea>
                                <p className="text-[8px] text-gray-400 italic px-4 font-bold uppercase">Yaha aap apne prantiya kshetra ya jilo ke naam likh sakte hain jo upar list me nahi hain.</p>
                             </div>
                           </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Women Awareness Campaign', 'Sanitary Pad Distribution', 'Membership Drive', 'NGO Collaboration', 'School / College Awareness', 'Rural Women Health Program', 'Franchise / Distribution', 'Training Program'].map(cat => (
                        <button key={cat} onClick={() => handleMultiSelect('interestedWorkCategories', cat)} className={`px-6 py-4 rounded-xl border-2 text-[10px] font-black text-left flex justify-between items-center transition-all ${formData.interestedWorkCategories?.includes(cat) ? 'border-[#B32D2D] bg-red-50 text-[#B32D2D]' : 'border-gray-100'}`}>{cat} {formData.interestedWorkCategories?.includes(cat) && <CheckCircle size={14} />}</button>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <SelectField label="Monthly Capacity" name="monthlyCapacity" value={formData.monthlyCapacity} onChange={handleChange} options={['500 women', '1,000 women', '5,000 women', '10,000+ women']} />
                      <SelectField label="Team Size" name="teamSize" value={formData.teamSize} onChange={handleChange} options={['1–5', '5–20', '20–50', '50+']} />
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Account Holder" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} required />
                    <InputField label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleChange} error={errors.ifscCode} maxLength={11} required />
                    <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} required />
                    <InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} type="password" required />
                    <InputField label="Confirm A/C Number" name="confirmAccountNumber" value={formData.confirmAccountNumber} onChange={handleChange} error={errors.confirmAccountNumber} required />
                  </div>
                )}

                {currentStep === 7 && (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { k: 'aadhaarFront', l: 'Aadhaar Front' }, { k: 'aadhaarBack', l: 'Aadhaar Back' },
                        { k: 'panCard', l: 'PAN Card' }, { k: 'ngoFirmProof', l: 'Reg. Certificate' },
                        { k: 'cancelledCheque', l: 'Bank Proof' }, { k: 'officePhoto', l: 'Office Photo' }
                      ].map(doc => (
                        <FileUploadField key={doc.k} label={doc.l} value={formData.documents[doc.k]} onChange={(e) => {
                           const file = e.target.files[0];
                           if (file) {
                              const r = new FileReader();
                              r.onloadend = () => setFormData(p => ({ ...p, documents: { ...p.documents, [doc.k]: r.result } }));
                              r.readAsDataURL(file);
                           }
                        }} onClear={() => setFormData(p => ({ ...p, documents: { ...p.documents, [doc.k]: '' } }))} onPreview={() => setPreviewImage(formData.documents[doc.k])} />
                      ))}
                   </div>
                )}

                {currentStep === 8 && (
                   <div className="space-y-10">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         <ReviewItem title="Basic Information" icon={User} data={{ 'Applicant Type': formData.applicantType, 'Organization': formData.organizationName, 'Contact Person': formData.contactPersonName, 'Mobile': formData.mobileNumber, 'Email': formData.emailId }} onEdit={() => setCurrentStep(1)} />
                         <ReviewItem title="Identity & Address" icon={ShieldCheck} data={{ 'Aadhaar': formData.aadhaarNumber, 'PAN': formData.panNumber, 'District': formData.district, 'State': formData.state, 'Pincode': formData.pincode }} onEdit={() => setCurrentStep(2)} />
                         <ReviewItem title="Work Interest" icon={Briefcase} data={{ 'Work Area': formData.workAreaType, 'Interests': formData.interestedWorkCategories?.join(', '), 'Manual Entry': formData.manualWorkArea }} onEdit={() => setCurrentStep(4)} />
                         <ReviewItem title="Bank Information" icon={CreditCard} data={{ 'A/C Holder': formData.accountHolderName, 'Bank Name': formData.bankName, 'IFSC': formData.ifscCode, 'A/C Number': 'XXXX XXXX ' + formData.accountNumber?.slice(-4) }} onEdit={() => setCurrentStep(6)} />
                      </div>
                      <div className="p-8 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem]">
                         <h4 className="text-[10px] font-black text-[#B32D2D] uppercase tracking-widest italic mb-6">Uploaded Documents Preview</h4>
                         <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                            {Object.entries(formData.documents).map(([key, val]) => (val && <div key={key} className="space-y-2" onClick={() => setPreviewImage(val)}><div className="aspect-square bg-white rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm cursor-zoom-in"><img src={val} className="w-full h-full object-cover" /></div><p className="text-[7px] font-black text-center text-gray-400 uppercase">{key}</p></div>))}
                         </div>
                      </div>
                      <div className="p-8 bg-[#B32D2D]/5 border-2 border-[#B32D2D]/20 rounded-[2.5rem] flex items-start gap-4">
                         <input type="checkbox" id="declare" className="w-6 h-6 rounded-lg accent-[#B32D2D] cursor-pointer mt-1" />
                         <label htmlFor="declare" className="text-[10px] font-black text-gray-700 leading-relaxed italic">I confirm that all information provided is true and correct.</label>
                      </div>
                   </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-6 mt-12 pt-10 border-t-2 border-[#DEB887]/20">
               {currentStep > 1 && <button onClick={prevStep} className="flex-1 py-4 border-4 border-[#B32D2D] text-[#B32D2D] font-black rounded-2xl hover:bg-red-50 uppercase tracking-widest text-xs"><ArrowLeft className="inline mr-2" size={16} /> BACK</button>}
               {currentStep < 8 ? <button onClick={nextStep} className="flex-[2] py-4 bg-[#B32D2D] text-white font-black rounded-2xl hover:bg-[#8e2424] shadow-xl uppercase tracking-widest text-xs flex items-center justify-center gap-2">NEXT STEP <ArrowRight size={18} /></button> : <button onClick={handleSubmit} disabled={loading} className="flex-[2] py-4 bg-[#22c55e] text-white font-black rounded-2xl hover:bg-[#16a34a] shadow-xl uppercase tracking-widest text-xs flex items-center justify-center gap-2">{loading ? <Loader2 className="animate-spin" /> : 'FINAL SUBMIT APPLICATION'}</button>}
            </div>
          </div>
        </div>
      </div>

      {previewImage && <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6" onClick={() => setPreviewImage(null)}><img src={previewImage} className="max-w-full max-h-full rounded-3xl border-4 border-white shadow-2xl" /></div>}
    </div>
  );
}

function InputField({ label, name, value, onChange, error, type="text", required=false, ...props }) {
  return (
    <div className="space-y-2">
      <div className="bg-[#B32D2D] text-white text-[8px] font-black px-3 py-1 rounded inline-block uppercase italic">{label} {required && '*'}</div>
      <input type={type} name={name} value={value} onChange={onChange} className={`w-full px-5 py-4 bg-white border-2 rounded-2xl font-bold text-xs text-gray-800 outline-none transition-all ${error ? 'border-red-500' : 'border-gray-100 focus:border-[#B32D2D]'}`} {...props} />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, error, required=false }) {
  return (
    <div className="space-y-2">
      <div className="bg-[#B32D2D] text-white text-[8px] font-black px-3 py-1 rounded inline-block uppercase italic">{label} {required && '*'}</div>
      <select name={name} value={value} onChange={onChange} className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl font-bold text-xs text-gray-800 outline-none focus:border-[#B32D2D] shadow-sm appearance-none cursor-pointer">
        <option value="">Select Option</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function FileUploadField({ label, value, onChange, onClear, onPreview }) {
  return (
    <div className="space-y-3">
       <p className="text-[8px] font-black text-[#DEB887] uppercase text-center">{label}</p>
       <div className={`relative h-32 rounded-3xl border-3 border-dashed transition-all flex flex-col items-center justify-center ${value ? 'border-green-500 bg-green-50/20' : 'border-gray-100 bg-white hover:border-[#B32D2D]'}`}>
          {value ? <div className="w-full h-full p-2"><img src={value} onClick={onPreview} className="w-full h-full object-cover rounded-2xl cursor-zoom-in" /><button onClick={onClear} className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full border-2 border-white"><X size={14} /></button></div> : <><input type="file" onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" /><Camera size={24} className="text-[#B32D2D]/30" /><p className="text-[8px] font-black text-gray-300 mt-2">UPLOAD</p></>}
       </div>
    </div>
  );
}

function ReviewItem({ title, icon: Icon, data, onEdit }) {
  return (
    <div className="p-6 bg-white border-2 border-gray-50 rounded-[2.5rem] shadow-sm hover:border-[#B32D2D] transition-all group relative">
       <div className="flex justify-between items-center mb-4"><div className="flex items-center gap-2"><Icon size={14} className="text-[#B32D2D]" /><h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{title}</h4></div><button onClick={onEdit} className="p-2 text-gray-200 hover:text-[#B32D2D] opacity-0 group-hover:opacity-100 transition-all"><Edit3 size={14} /></button></div>
       <div className="space-y-2">{Object.entries(data).map(([k, v]) => (<div key={k} className="flex justify-between"><span className="text-[8px] font-black text-gray-400 uppercase">{k}</span><span className="text-[10px] font-black text-gray-800 text-right">{v || '---'}</span></div>))}</div>
    </div>
  );
}

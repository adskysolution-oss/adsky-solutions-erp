'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, ShieldCheck, MapPin, Briefcase, Heart, 
  Building2, CreditCard, FileUp, Eye, CheckCircle2, 
  AlertCircle, Loader2, ArrowRight, ArrowLeft, 
  Check, X, Phone, Mail, Globe, Search, Plus, Trash2, Camera, Edit3, Upload
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
  
  const [formData, setFormData] = useState({
    // Step 1
    applicantType: '', organizationName: '', contactPersonName: '',
    mobileNumber: '', alternateMobileNumber: '', emailId: '',
    whatsappNumber: '', websiteSocialLink: '',
    otp: '', otpSent: false, otpVerified: false,
    
    // Step 2
    aadhaarNumber: '', panNumber: '', gstNumber: '',
    ngoRegistrationNumber: '', firmRegistrationNumber: '', udyamMsmeNumber: '',
    
    // Step 3
    address: '', state: '', district: '', tehsil: '', block: '', cityVillage: '', pincode: '',
    
    // Step 4
    workAreaType: '', selectedStates: [], selectedDistricts: [], selectedBlocks: [], exclusiveStateInterest: false,
    
    // Step 5
    interestedWorkCategories: [], monthlyCapacity: '', teamSize: '', experience: [],
    
    // Step 6
    bankName: '', accountHolderName: '', accountNumber: '', confirmAccountNumber: '', ifscCode: '', bankBranch: '',
    
    // Step 7
    documents: {
      aadhaarFront: '', aadhaarBack: '', panCard: '', ngoFirmProof: '',
      gstCertificate: '', udyamCertificate: '', cancelledCheque: '',
      officePhoto: '', workProof: ''
    }
  });

  const [errors, setErrors] = useState({});

  // Auto-fill Pincode
  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`)
        .then(res => res.json())
        .then(data => {
          if (data[0].Status === "Success") {
            const po = data[0].PostOffice[0];
            setFormData(prev => ({ 
              ...prev, 
              state: po.State, 
              district: po.District, 
              block: po.Block,
              cityVillage: po.Name
            }));
          }
        }).catch(err => console.error(err));
    }
  }, [formData.pincode]);

  // Auto-fill IFSC
  useEffect(() => {
    if (formData.ifscCode.length === 11) {
      fetch(`https://ifsc.razorpay.com/${formData.ifscCode}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.BANK) {
            setFormData(prev => ({ ...prev, bankName: data.BANK, bankBranch: data.BRANCH }));
          }
        }).catch(err => console.error(err));
    }
  }, [formData.ifscCode]);

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
    
    if (stepId === 1 && !formData.otpVerified) {
      newErrors.otp = 'Mobile verification mandatory';
    }

    if (step.fields) {
      step.fields.forEach(field => {
        if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
          newErrors[field] = 'This field is required';
        }
      });
    }

    if (stepId === 2) {
        if (formData.aadhaarNumber && formData.aadhaarNumber.length !== 12) newErrors.aadhaarNumber = '12 digit Aadhaar required';
        if (formData.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) newErrors.panNumber = 'Invalid PAN format';
    }

    if (stepId === 6) {
        if (formData.accountNumber !== formData.confirmAccountNumber) newErrors.confirmAccountNumber = 'Account numbers do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOtp = async () => {
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      alert('Valid 10-digit mobile required');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/sakhihub/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', mobile: formData.mobileNumber })
      });
      if (res.ok) {
        setFormData(prev => ({ ...prev, otpSent: true }));
        alert('OTP sent! Check console in dev mode.');
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const verifyOtp = async () => {
    if (!formData.otp) return;
    setLoading(true);
    try {
      const res = await fetch('/api/sakhihub/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', mobile: formData.mobileNumber, otp: formData.otp })
      });
      if (res.ok) {
        setFormData(prev => ({ ...prev, otpVerified: true }));
      } else {
        alert('Invalid OTP');
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 8));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert("Please fill all required fields correctly.");
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
      } else {
        alert(data.error || 'Submission failed');
      }
    } catch (err) { alert('Error submitting form'); }
    finally { setLoading(false); }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-white border-4 border-[#DEB887] rounded-[3rem] p-10 text-center shadow-2xl">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600 shadow-inner"><CheckCircle2 size={56} /></div>
          <h2 className="text-4xl font-black text-[#B32D2D] mb-4 italic uppercase">Success!</h2>
          <p className="text-gray-600 font-bold mb-8">Thank you for joining SakhiHub. Your application has been submitted successfully.</p>
          <div className="bg-[#FDFBF7] p-6 rounded-3xl border-2 border-[#DEB887] mb-8">
             <p className="text-[10px] font-black text-[#DEB887] uppercase tracking-widest mb-1">Application ID</p>
             <p className="text-2xl font-black text-[#B32D2D]">{applicationId}</p>
          </div>
          <button onClick={() => window.location.href = '/'} className="w-full py-5 bg-[#B32D2D] text-white font-black rounded-2xl hover:bg-[#8e2424] shadow-xl shadow-red-100 transform active:scale-95 transition-all">OK</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans">
      {/* Rabbit Farming Style Header */}
      <header className="sticky top-0 z-50 bg-[#B32D2D] text-white shadow-2xl border-b-[6px] border-[#DEB887]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between relative min-h-[90px]">
          <div className="flex-shrink-0 z-10">
            <div className="bg-white p-1.5 rounded-xl shadow-2xl rotate-[-2deg]">
              <img src="/logo.jpeg" alt="Logo" className="h-12 md:h-14 w-auto object-contain" />
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-20 text-center">
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none mb-1 italic">
              SakhiHub <span className="text-[#DEB887]">Partner Onboarding</span>
            </h1>
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#DEB887] opacity-90">
              Women Empowerment & Awareness Initiative
            </p>
          </div>

          <div className="hidden md:block w-14 h-14 bg-white/10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
             <Heart className="text-[#DEB887] animate-pulse" />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 mt-12">
        {/* Stepper (Rabbit Style) */}
        <div className="flex justify-between mb-12 overflow-x-auto no-scrollbar py-4 px-2 bg-white/50 rounded-full border border-[#DEB887]/20">
          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1 min-w-[100px]">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-700 shadow-lg ${
                  currentStep >= step.id 
                  ? 'bg-[#B32D2D] border-[#DEB887] text-white rotate-[360deg]' 
                  : 'bg-white border-gray-200 text-gray-300'
                }`}
              >
                {currentStep > step.id ? <CheckCircle2 size={24} /> : <step.icon size={22} />}
              </div>
              <span className={`mt-3 text-[9px] font-black uppercase text-center tracking-tighter ${currentStep >= step.id ? 'text-[#B32D2D]' : 'text-gray-400'}`}>
                {step.title.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>

        {/* Main Card (Rabbit Style) */}
        <div className="bg-white border-[3px] border-[#DEB887] rounded-[3.5rem] shadow-[0_20px_50px_rgba(179,45,45,0.1)] overflow-hidden mb-20">
          <div className="bg-[#DEB887] px-10 py-5 flex justify-between items-center border-b-4 border-[#B32D2D]/10">
            <div className="flex items-center gap-4">
               <div className="w-8 h-8 bg-[#B32D2D] rounded-lg flex items-center justify-center text-white shadow-lg">
                  <span className="font-black text-sm">{currentStep}</span>
               </div>
               <h3 className="text-white font-black italic text-base uppercase tracking-widest">{STEPS.find(s => s.id === currentStep).title}</h3>
            </div>
            {currentStep > 1 && currentStep < 8 && (
              <button onClick={() => setCurrentStep(8)} className="text-[10px] bg-white/20 hover:bg-white/40 px-4 py-2 rounded-full text-white font-black flex items-center gap-2 border border-white/30 backdrop-blur-sm transition-all">
                <Eye size={14} /> JUMP TO PREVIEW
              </button>
            )}
          </div>

          <div className="p-8 md:p-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              >
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SelectField label="Applicant Type" name="applicantType" value={formData.applicantType} onChange={handleChange} error={errors.applicantType} options={['NGO', 'Vendor / Distributor', 'SHG Group', 'Individual Partner', 'State Partner', 'District Partner', 'Block / Tehsil Partner']} required />
                    <InputField label="Organization / Firm Name" name="organizationName" value={formData.organizationName} onChange={handleChange} error={errors.organizationName} placeholder="Enter Name" required />
                    <InputField label="Contact Person Name" name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} error={errors.contactPersonName} placeholder="Full Name" required />
                    <div className="space-y-4">
                      <InputField label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} error={errors.mobileNumber} placeholder="10 digits" maxLength={10} required disabled={formData.otpVerified} />
                      {!formData.otpVerified && (
                        <div className="flex gap-4">
                           <button onClick={sendOtp} disabled={loading || !formData.mobileNumber} className="text-[10px] font-black text-[#B32D2D] uppercase border-b-2 border-[#B32D2D]/20 hover:border-[#B32D2D] pb-0.5">
                             {formData.otpSent ? 'Resend OTP' : 'Send Verification OTP'}
                           </button>
                        </div>
                      )}
                    </div>
                    {formData.otpSent && !formData.otpVerified && (
                      <div className="md:col-span-2 bg-[#FDFBF7] p-8 rounded-[2rem] border-2 border-[#DEB887] shadow-inner flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1 w-full text-center md:text-left">
                           <p className="text-[10px] font-black text-[#DEB887] uppercase mb-2">Verify your mobile</p>
                           <input type="text" name="otp" value={formData.otp} onChange={handleChange} className="w-full bg-white border-2 border-[#DEB887]/30 rounded-2xl px-6 py-4 font-black text-2xl tracking-[0.8em] text-center focus:border-[#B32D2D] outline-none" maxLength={6} placeholder="000000" />
                        </div>
                        <button onClick={verifyOtp} disabled={loading} className="px-12 py-5 bg-[#B32D2D] text-white font-black rounded-2xl hover:bg-red-800 shadow-xl shadow-red-100">
                          {loading ? <Loader2 className="animate-spin" /> : 'VERIFY NOW'}
                        </button>
                      </div>
                    )}
                    {formData.otpVerified && <div className="md:col-span-2 bg-green-50 border-2 border-green-100 p-4 rounded-2xl flex items-center gap-3 text-green-700 font-bold italic text-sm"><CheckCircle2 /> Mobile Verified!</div>}
                    <InputField label="Email ID" name="emailId" value={formData.emailId} onChange={handleChange} error={errors.emailId} placeholder="example@gmail.com" type="email" required />
                    <InputField label="WhatsApp Number" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} placeholder="Optional" maxLength={10} />
                    <InputField label="Website / Social Link" name="websiteSocialLink" value={formData.websiteSocialLink} onChange={handleChange} placeholder="Optional" />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Aadhaar Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} error={errors.aadhaarNumber} placeholder="12 digit number" maxLength={12} required />
                    <InputField label="PAN Card Number" name="panNumber" value={formData.panNumber} onChange={handleChange} error={errors.panNumber} placeholder="ABCDE1234F" maxLength={10} required />
                    <InputField label="GST Number" name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="Optional" />
                    <InputField label="NGO Registration #" name="ngoRegistrationNumber" value={formData.ngoRegistrationNumber} onChange={handleChange} placeholder="Optional" />
                    <InputField label="Firm Registration #" name="firmRegistrationNumber" value={formData.firmRegistrationNumber} onChange={handleChange} placeholder="Optional" />
                    <InputField label="Udyam / MSME Number" name="udyamMsmeNumber" value={formData.udyamMsmeNumber} onChange={handleChange} placeholder="Optional" />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                       <InputField label="Office / Residential Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} placeholder="Full Address" required />
                    </div>
                    <InputField label="PIN Code (Auto-fill Location)" name="pincode" value={formData.pincode} onChange={handleChange} error={errors.pincode} placeholder="6 digits" maxLength={6} required />
                    <InputField label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} required />
                    <InputField label="District" name="district" value={formData.district} onChange={handleChange} error={errors.district} required />
                    <InputField label="Block / Tehsil" name="block" value={formData.block} onChange={handleChange} />
                    <InputField label="City / Village" name="cityVillage" value={formData.cityVillage} onChange={handleChange} />
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-10">
                    <div className="bg-[#FDFBF7] p-10 rounded-[3rem] border-2 border-[#DEB887]">
                       <p className="text-sm font-black text-[#B32D2D] mb-6 italic uppercase underline">Area Work Selection</p>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {['Full State Level', 'Multiple States', 'Single District', 'Multiple Districts', 'Block / Tehsil Level', 'City / Village Level'].map(type => (
                            <button key={type} onClick={() => setFormData(p => ({ ...p, workAreaType: type }))} className={`px-6 py-4 rounded-2xl border-2 font-black text-xs transition-all shadow-sm ${formData.workAreaType === type ? 'bg-[#B32D2D] border-[#B32D2D] text-white scale-105' : 'bg-white border-gray-100 text-gray-500 hover:border-[#DEB887]'}`}>
                              {type}
                            </button>
                          ))}
                       </div>
                    </div>
                    {/* Add more work area specific selectors here if needed */}
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-[#DEB887] uppercase tracking-widest block">Work Interests</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Women Awareness Campaign', 'Sanitary Pad Distribution', 'Membership Drive', 'NGO Collaboration', 'School / College Awareness', 'Rural Women Health Program', 'Franchise / Distribution', 'Training Program'].map(cat => (
                          <button key={cat} onClick={() => handleMultiSelect('interestedWorkCategories', cat)} className={`px-6 py-4 rounded-2xl border-2 text-xs font-black text-left flex items-center justify-between transition-all ${formData.interestedWorkCategories?.includes(cat) ? 'border-[#B32D2D] bg-red-50 text-[#B32D2D]' : 'border-gray-100 bg-white text-gray-400'}`}>
                            {cat} {formData.interestedWorkCategories?.includes(cat) && <CheckCircle2 size={16} />}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <SelectField label="Monthly Capacity" name="monthlyCapacity" value={formData.monthlyCapacity} onChange={handleChange} options={['500 women', '1,000 women', '5,000 women', '10,000+ women']} />
                       <SelectField label="Team Size" name="teamSize" value={formData.teamSize} onChange={handleChange} options={['1–5', '5–20', '20–50', '50+']} />
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Account Holder Name" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} placeholder="As per Bank" required />
                    <InputField label="IFSC Code (Auto-fill Bank)" name="ifscCode" value={formData.ifscCode} onChange={handleChange} error={errors.ifscCode} placeholder="SBIN0001234" maxLength={11} required />
                    <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} required />
                    <InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} error={errors.accountNumber} type="password" required />
                    <InputField label="Confirm Account Number" name="confirmAccountNumber" value={formData.confirmAccountNumber} onChange={handleChange} error={errors.confirmAccountNumber} required />
                  </div>
                )}

                {currentStep === 7 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {[
                       { k: 'aadhaarFront', l: 'Aadhaar Front' },
                       { k: 'aadhaarBack', l: 'Aadhaar Back' },
                       { k: 'panCard', l: 'PAN Card' },
                       { k: 'ngoFirmProof', l: 'Reg. Certificate' },
                       { k: 'cancelledCheque', l: 'Cancelled Cheque' },
                       { k: 'officePhoto', l: 'Office Photo' }
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
                     <div className="bg-amber-50 p-8 rounded-[3rem] border-4 border-[#DEB887]/30 flex items-start gap-6">
                        <AlertCircle className="text-[#B32D2D] mt-1 shrink-0" size={32} />
                        <div>
                           <p className="text-xl font-black text-[#B32D2D] italic uppercase">Review Application</p>
                           <p className="text-sm font-bold text-gray-600 mt-1">Please confirm all details before final submission to SakhiHub.</p>
                        </div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ReviewBox title="Partner Info" data={{ 'Name': formData.organizationName, 'Type': formData.applicantType, 'Mobile': formData.mobileNumber }} onEdit={() => setCurrentStep(1)} />
                        <ReviewBox title="Work Area" data={{ 'Selection': formData.workAreaType, 'Category': formData.interestedWorkCategories?.join(', ') }} onEdit={() => setCurrentStep(4)} />
                        <ReviewBox title="Location" data={{ 'District': formData.district, 'State': formData.state, 'PIN': formData.pincode }} onEdit={() => setCurrentStep(3)} />
                        <ReviewBox title="Bank Info" data={{ 'Bank': formData.bankName, 'A/C Number': 'XXXX XXXX ' + formData.accountNumber?.slice(-4) }} onEdit={() => setCurrentStep(6)} />
                     </div>
                     <div className="p-10 bg-[#FDFBF7] border-2 border-[#DEB887] rounded-[3rem] flex items-start gap-5">
                        <input type="checkbox" id="declare" className="w-8 h-8 rounded-lg accent-[#B32D2D] cursor-pointer mt-1" />
                        <label htmlFor="declare" className="text-sm font-black text-gray-700 leading-relaxed cursor-pointer italic">
                          I hereby declare that all information provided is true to the best of my knowledge. I understand that any false information will lead to rejection of my partnership.
                        </label>
                     </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-6 mt-16 pt-10 border-t-2 border-[#DEB887]/20">
               {currentStep > 1 && (
                 <button onClick={prevStep} className="flex-1 py-5 border-4 border-[#B32D2D] text-[#B32D2D] font-black rounded-2xl hover:bg-red-50 transition-all uppercase tracking-widest text-xs">
                   <ArrowLeft className="inline mr-2" size={18} /> BACK
                 </button>
               )}
               {currentStep < 8 ? (
                 <button onClick={nextStep} className="flex-[2] py-5 bg-[#B32D2D] text-white font-black rounded-2xl hover:bg-[#8e2424] shadow-2xl shadow-red-100 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95">
                   NEXT STEP <ArrowRight size={20} />
                 </button>
               ) : (
                 <button onClick={handleSubmit} disabled={loading} className="flex-[2] py-5 bg-[#22c55e] text-white font-black rounded-2xl hover:bg-[#16a34a] shadow-2xl shadow-green-100 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50">
                   {loading ? <Loader2 className="animate-spin" /> : 'FINAL SUBMIT APPLICATION'}
                 </button>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6">
           <button onClick={() => setPreviewImage(null)} className="absolute top-10 right-10 text-white hover:text-[#B32D2D] transition-colors"><X size={48} /></button>
           <img src={previewImage} className="max-w-full max-h-full rounded-[2rem] shadow-[0_0_100px_rgba(179,45,45,0.3)] border-4 border-white" alt="Preview" />
        </div>
      )}
    </div>
  );
}

// Helper Components (Rabbit Style)

function InputField({ label, name, value, onChange, error, type="text", required=false, ...props }) {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2">
         <div className="bg-[#B32D2D] text-white text-[9px] font-black px-3 py-1 rounded shadow-lg uppercase tracking-tighter italic">
            {label} {required && '*'}
         </div>
      </label>
      <input type={type} name={name} value={value} onChange={onChange} className={`w-full px-6 py-4 bg-white border-2 rounded-2xl font-bold text-sm text-gray-800 outline-none transition-all shadow-sm ${error ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-[#B32D2D]'}`} {...props} />
      {error && <p className="text-[10px] font-black text-red-500 uppercase italic px-2">{error}</p>}
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, error, required=false }) {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2">
         <div className="bg-[#B32D2D] text-white text-[9px] font-black px-3 py-1 rounded shadow-lg uppercase tracking-tighter italic">
            {label} {required && '*'}
         </div>
      </label>
      <select name={name} value={value} onChange={onChange} className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl font-bold text-sm text-gray-800 outline-none focus:border-[#B32D2D] appearance-none shadow-sm cursor-pointer">
        <option value="">Select / चुनें</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p className="text-[10px] font-black text-red-500 uppercase italic px-2">{error}</p>}
    </div>
  );
}

function FileUploadField({ label, value, onChange, onClear, onPreview }) {
  return (
    <div className="space-y-4">
       <div className="text-[10px] font-black text-[#DEB887] uppercase tracking-widest text-center">{label}</div>
       <div className={`relative h-44 rounded-[2.5rem] border-3 border-dashed transition-all flex flex-col items-center justify-center p-6 ${value ? 'border-[#22c55e] bg-green-50/20' : 'border-gray-100 bg-[#FDFBF7] hover:border-[#B32D2D]'}`}>
          {value ? (
            <div className="relative w-full h-full">
               <img src={value} onClick={onPreview} className="w-full h-full object-cover rounded-3xl cursor-zoom-in" alt="doc" />
               <button onClick={onClear} className="absolute -top-3 -right-3 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-xl border-4 border-white"><X size={18} /></button>
            </div>
          ) : (
            <>
              <input type="file" onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="w-16 h-16 bg-white rounded-[1.5rem] shadow-xl flex items-center justify-center text-[#B32D2D] mb-4">
                 <Camera size={32} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase italic">Click to Upload</p>
            </>
          )}
       </div>
    </div>
  );
}

function ReviewBox({ title, data, onEdit }) {
  return (
    <div className="p-8 bg-white border-2 border-gray-100 rounded-[3rem] shadow-sm relative group hover:border-[#B32D2D] transition-all">
       <div className="flex justify-between items-center mb-6">
          <h4 className="text-[10px] font-black text-[#B32D2D] uppercase tracking-widest italic">{title}</h4>
          <button onClick={onEdit} className="p-2 text-gray-300 hover:text-[#B32D2D] opacity-0 group-hover:opacity-100 transition-all"><Edit3 size={18} /></button>
       </div>
       <div className="space-y-3">
          {Object.entries(data).map(([k, v]) => (
            <div key={k} className="flex justify-between items-center">
               <span className="text-[9px] font-black text-gray-400 uppercase">{k}</span>
               <span className="text-xs font-black text-gray-800">{v || '---'}</span>
            </div>
          ))}
       </div>
    </div>
  );
}

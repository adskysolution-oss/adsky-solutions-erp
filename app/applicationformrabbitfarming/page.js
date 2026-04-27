'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MapPin, Briefcase, Building2, ShieldCheck, 
  ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Loader2,
  FileText, CreditCard, GraduationCap
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Personal / व्यक्तिगत', icon: User },
  { id: 2, title: 'Qualification / योग्यता', icon: GraduationCap },
  { id: 3, title: 'Address & Unit / पता और इकाई', icon: MapPin },
  { id: 4, title: 'Project & Bank / प्रोजेक्ट और बैंक', icon: CreditCard },
  { id: 5, title: 'Vendor / वेंडर', icon: ShieldCheck }
];

export default function RabbitFarmingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    // Step 1: Personal
    aadhar: '',
    name: '',
    parentName: '',
    mobile: '',
    email: '',
    gender: '',
    dob: '',
    socialCategory: '', // General, SC, ST, OBC, Minority
    specialCategory: 'Not Applicable',
    pan: '',

    // Step 2: Qualification
    qualification: '', // 8th, 10th, 12th, Graduate, etc.
    edpTraining: 'No',
    experience: 'No',

    // Step 3: Address & Unit
    address: '',
    state: '',
    district: '',
    block: '',
    pincode: '',
    unitLocation: 'Rural', // Rural, Urban
    unitAddress: '',

    // Step 4: Project & Bank
    businessActivity: 'Rabbit Farming',
    industryType: 'Service',
    projectCost: '', // Capital + Working Capital
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    bankBranch: '',

    // Step 5: Vendor
    vendorCode: '',
    vendorName: '',
    subVendorCode: '',
    subVendorName: '',
    agentName: '',
    agentMobile: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.mobile || formData.mobile.length !== 10 || !formData.aadhar || formData.aadhar.length !== 12) {
        alert('Please enter valid Name, 10-digit Mobile, and 12-digit Aadhar Number');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 5));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const GOOGLE_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzEC_C3n1Cz6kknKk6vJabBOSODvbAvZMHU0d5ZQOmWF3prY9LmB_4bNGCx03U-U9if/exec';

    try {
      await fetch(GOOGLE_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (err) {
      setError('Submission failed. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-white border-2 border-[#DEB887] rounded-3xl p-10 text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600"><CheckCircle2 size={48} /></div>
          <h2 className="text-3xl font-black text-[#B32D2D] mb-4">सफलतापूर्वक जमा!</h2>
          <p className="text-gray-600 font-bold mb-8">आपका आवेदन PMEGP पोर्टल के अनुसार जमा कर लिया गया है।</p>
          <button onClick={() => window.location.reload()} className="w-full py-4 bg-[#B32D2D] text-white font-black rounded-xl hover:bg-[#8e2424]">OK</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      {/* PMEGP Styled Header */}
      <div className="bg-white border-b-4 border-[#B32D2D] shadow-sm mb-8">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/800px-Emblem_of_India.svg.png" className="h-14" alt="Emblem" />
              <div>
                 <h1 className="text-lg md:text-xl font-black text-[#B32D2D]">Online Application Form</h1>
                 <p className="text-[10px] font-bold text-gray-500 uppercase">Rabbit Farming Entrepreneurship Development</p>
              </div>
           </div>
           <div className="flex gap-4">
              <img src="https://www.kviconline.gov.in/pmegpeportal/resources/images/pmegp-logo.png" className="h-10" alt="PMEGP" />
           </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        {/* Step Indicator */}
        <div className="flex justify-between mb-10 overflow-x-auto no-scrollbar py-2">
          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1 min-w-[120px]">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${currentStep >= step.id ? 'bg-[#B32D2D] border-[#B32D2D] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                {currentStep > step.id ? <CheckCircle2 size={20} /> : <step.icon size={20} />}
              </div>
              <span className={`mt-2 text-[10px] font-black uppercase text-center ${currentStep >= step.id ? 'text-[#B32D2D]' : 'text-gray-400'}`}>{step.title}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border-2 border-[#DEB887] rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-[#DEB887] px-8 py-3"><h3 className="text-white font-black italic text-sm">{STEPS.find(s => s.id === currentStep).title}</h3></div>

          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Aadhar Number / आधार नंबर" name="aadhar" value={formData.aadhar} onChange={handleChange} required maxLength={12} />
                  <InputField label="Applicant Name / आवेदक का नाम" name="name" value={formData.name} onChange={handleChange} required />
                  <InputField label="Father/Husband Name" name="parentName" value={formData.parentName} onChange={handleChange} />
                  <InputField label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} required maxLength={10} />
                  <SelectField label="Social Category" name="socialCategory" value={formData.socialCategory} onChange={handleChange} options={['General', 'SC', 'ST', 'OBC', 'Minority']} />
                  <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                  <InputField label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} type="date" />
                  <InputField label="PAN Card Number" name="pan" value={formData.pan} onChange={handleChange} maxLength={10} />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectField label="Educational Qualification" name="qualification" value={formData.qualification} onChange={handleChange} options={['8th Pass', '10th Pass', '12th Pass', 'Graduate', 'Post Graduate', 'Diploma']} />
                  <SelectField label="EDP Training Done?" name="edpTraining" value={formData.edpTraining} onChange={handleChange} options={['Yes', 'No']} />
                  <SelectField label="Prior Experience?" name="experience" value={formData.experience} onChange={handleChange} options={['Yes', 'No']} />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2"><InputField label="Communication Address" name="address" value={formData.address} onChange={handleChange} /></div>
                  <InputField label="State" name="state" value={formData.state} onChange={handleChange} />
                  <InputField label="District" name="district" value={formData.district} onChange={handleChange} />
                  <InputField label="Taluka/Block" name="block" value={formData.block} onChange={handleChange} />
                  <InputField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} maxLength={6} />
                  <SelectField label="Unit Location" name="unitLocation" value={formData.unitLocation} onChange={handleChange} options={['Rural', 'Urban']} />
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Business Activity" name="businessActivity" value={formData.businessActivity} disabled />
                  <InputField label="Estimated Project Cost (₹)" name="projectCost" value={formData.projectCost} onChange={handleChange} type="number" />
                  <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
                  <InputField label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleChange} />
                  <InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
                  <InputField label="Branch Name" name="bankBranch" value={formData.bankBranch} onChange={handleChange} />
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Vendor Code" name="vendorCode" value={formData.vendorCode} onChange={handleChange} required />
                  <InputField label="Vendor Name" name="vendorName" value={formData.vendorName} onChange={handleChange} required />
                  <InputField label="Agent Name" name="agentName" value={formData.agentName} onChange={handleChange} required />
                  <InputField label="Agent Mobile" name="agentMobile" value={formData.agentMobile} onChange={handleChange} required maxLength={10} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-4 pt-6">
              {currentStep > 1 && <button type="button" onClick={prevStep} className="flex-1 py-4 border-2 border-[#B32D2D] text-[#B32D2D] font-black rounded-xl">BACK</button>}
              {currentStep < 5 ? (
                <button type="button" onClick={nextStep} className="flex-[2] py-4 bg-[#B32D2D] text-white font-black rounded-xl flex items-center justify-center gap-2">NEXT STEP <ArrowRight size={20} /></button>
              ) : (
                <button type="submit" disabled={loading} className="flex-[2] py-4 bg-[#22c55e] text-white font-black rounded-xl flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="animate-spin" /> : 'SUBMIT APPLICATION'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text", required = false, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-600 uppercase">{label} {required && '*'}</label>
      <input type={type} name={name} value={value} onChange={onChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B32D2D] font-bold text-sm" {...props} />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-600 uppercase">{label}</label>
      <select name={name} value={value} onChange={onChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B32D2D] font-bold text-sm">
        <option value="">Select / चुनें</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

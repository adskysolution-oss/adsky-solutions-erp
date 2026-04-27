'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MapPin, Briefcase, Building2, ShieldCheck, 
  ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Loader2,
  FileText, CreditCard, GraduationCap
} from 'lucide-react';

const INDIA_GEO_DATA = {
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri", "Namsai", "Papum Pare", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Dadra and Nagar Haveli", "Daman", "Diu"],
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang", "Devbhumi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
  "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
  "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  "Ladakh": ["Kargil", "Leh"],
  "Lakshadweep": ["Lakshadweep"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
  "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
  "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
  "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh"],
  "Puducherry": ["Karaikal", "Mahe", "Pondicherry", "Yanam"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"],
  "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
  "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareilly", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
};

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
  const [availableDistricts, setAvailableDistricts] = useState([]);
  
  const [formData, setFormData] = useState({
    aadhar: '', name: '', parentName: '', mobile: '', email: '', gender: '', dob: '', socialCategory: '', specialCategory: 'Not Applicable', pan: '',
    qualification: '', edpTraining: 'No', experience: 'No',
    address: '', state: '', district: '', block: '', pincode: '', unitLocation: 'Rural', unitAddress: '',
    businessActivity: 'Rabbit Farming', industryType: 'Service', projectCost: '', bankName: '', accountNumber: '', ifscCode: '', bankBranch: '',
    vendorCode: '', vendorName: '', subVendorCode: '', subVendorName: '', agentName: '', agentMobile: ''
  });

  // Pincode Auto-fill Logic
  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`)
        .then(res => res.json())
        .then(data => {
          if (data[0].Status === "Success") {
            const postOffice = data[0].PostOffice[0];
            const foundState = Object.keys(INDIA_GEO_DATA).find(s => s.toLowerCase().includes(postOffice.State.toLowerCase()) || postOffice.State.toLowerCase().includes(s.toLowerCase()));
            
            setFormData(prev => ({ 
              ...prev, 
              state: foundState || postOffice.State, 
              district: postOffice.District, 
              block: postOffice.Block 
            }));
          }
        }).catch(err => console.error(err));
    }
  }, [formData.pincode]);

  // IFSC Auto-fill Logic
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

  // Update Districts when State selection changes
  useEffect(() => {
    if (formData.state && INDIA_GEO_DATA[formData.state]) {
      setAvailableDistricts(INDIA_GEO_DATA[formData.state]);
    } else {
      setAvailableDistricts([]);
    }
  }, [formData.state]);

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
    if (currentStep === 3) {
      if (!formData.state || !formData.district || !formData.pincode) {
        alert('Please select State, District and Pincode');
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

  const handleManualSubmit = async () => {
    if (!formData.vendorCode || !formData.vendorName || !formData.agentName || !formData.agentMobile) {
      alert('Please fill all Vendor details before submitting.');
      return;
    }
    
    setLoading(true);
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
      alert('Submission Error. Please check your internet.');
    } finally {
      setLoading(false);
    }
  };

  // Prevent Form submission on Enter Key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-white border-2 border-[#DEB887] rounded-3xl p-10 text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600"><CheckCircle2 size={48} /></div>
          <h2 className="text-3xl font-black text-[#B32D2D] mb-4">सफलतापूर्वक जमा!</h2>
          <p className="text-gray-600 font-bold mb-8">आपका आवेदन सफलतापूर्वक जमा कर लिया गया है।</p>
          <button onClick={() => window.location.reload()} className="w-full py-4 bg-[#B32D2D] text-white font-black rounded-xl hover:bg-[#8e2424]">OK</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      <div className="bg-white border-b-4 border-[#B32D2D] shadow-sm mb-8">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-center gap-6">
           <div className="flex items-center gap-4">
              <img src="/logo.jpeg" className="h-16" alt="AdSky Logo" />
              <div className="border-l-2 border-gray-200 pl-4">
                 <h1 className="text-xl md:text-2xl font-black text-[#B32D2D]">Online Application Form</h1>
                 <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Rabbit Farming Mission | ADSKY Solution</p>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
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

          <div onKeyDown={handleKeyDown} className="p-6 md:p-10 space-y-8">
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
                  <InputField label="Pincode / पिनकोड (Auto-fill)" name="pincode" value={formData.pincode} onChange={handleChange} maxLength={6} required placeholder="Enter Pincode to auto-fill" />
                  <SelectField label="State / राज्य" name="state" value={formData.state} onChange={handleChange} options={Object.keys(INDIA_GEO_DATA)} required />
                  <SelectField label="District / जिला" name="district" value={formData.district} onChange={handleChange} options={availableDistricts} required />
                  <InputField label="Taluka/Block" name="block" value={formData.block} onChange={handleChange} />
                  <div className="md:col-span-2"><InputField label="Full Address" name="address" value={formData.address} onChange={handleChange} /></div>
                  <SelectField label="Unit Location" name="unitLocation" value={formData.unitLocation} onChange={handleChange} options={['Rural', 'Urban']} />
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Business Activity" name="businessActivity" value={formData.businessActivity} disabled />
                  <InputField label="Estimated Project Cost (₹)" name="projectCost" value={formData.projectCost} onChange={handleChange} type="number" />
                  <InputField label="IFSC Code / आईएफएससी (Auto-fill)" name="ifscCode" value={formData.ifscCode} onChange={handleChange} maxLength={11} required placeholder="Enter IFSC to auto-fill bank" />
                  <InputField label="Bank Name / बैंक का नाम" name="bankName" value={formData.bankName} onChange={handleChange} />
                  <InputField label="Branch Name / शाखा" name="bankBranch" value={formData.bankBranch} onChange={handleChange} />
                  <InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
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
                <button type="button" onClick={handleManualSubmit} disabled={loading} className="flex-[2] py-4 bg-[#22c55e] text-white font-black rounded-xl flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="animate-spin" /> : 'SUBMIT APPLICATION'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text", required = false, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-600 uppercase">{label} {required && '*'}</label>
      <input type={type} name={name} value={value} onChange={onChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B32D2D] font-bold text-sm outline-none" {...props} />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-600 uppercase">{label} {required && '*'}</label>
      <select name={name} value={value} onChange={onChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B32D2D] font-bold text-sm outline-none">
        <option value="">Select / चुनें</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

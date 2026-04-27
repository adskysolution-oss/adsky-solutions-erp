'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MapPin, Briefcase, Building2, ShieldCheck, 
  ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Loader2,
  FileText, CreditCard, GraduationCap, Upload, FileUp, Eye, X, Edit3
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
  { id: 1, title: 'Personal / व्यक्तिगत', icon: User, fields: ['aadhar', 'name', 'parentName', 'mobile', 'gender', 'dob'] },
  { id: 2, title: 'Qualification / योग्यता', icon: GraduationCap, fields: ['qualification'] },
  { id: 3, title: 'Address & Unit / पता और इकाई', icon: MapPin, fields: ['state', 'district', 'pincode', 'address'] },
  { id: 4, title: 'Project & Bank / प्रोजेक्ट और बैंक', icon: CreditCard, fields: ['projectCost', 'bankName', 'accountNumber', 'ifscCode'] },
  { id: 5, title: 'Agency/Vendor / एजेंसी/वender', icon: ShieldCheck, fields: ['vendorCode', 'vendorName', 'agentName', 'agentMobile'] },
  { id: 6, title: 'Documents / दस्तावेज', icon: FileUp, fields: [] },
  { id: 7, title: 'Review / समीक्षा', icon: Eye, fields: [] }
];

export default function RabbitFarmingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  
  const [formData, setFormData] = useState({
    aadhar: '', name: '', parentName: '', mobile: '', email: '', gender: '', dob: '', socialCategory: '', specialCategory: 'Not Applicable', pan: '',
    qualification: '', edpTraining: 'No', experience: 'No',
    address: '', state: '', district: '', block: '', pincode: '', unitLocation: 'Rural', unitAddress: '',
    businessActivity: 'Rabbit Farming', industryType: 'Service', projectCost: '', bankName: '', accountNumber: '', ifscCode: '', bankBranch: '',
    vendorCode: '', vendorName: '', subVendorCode: '', subVendorName: '', agentName: '', agentMobile: '',
    doc_aadhar_front: '', doc_aadhar_back: '', doc_pan: '', doc_photo: '', doc_bank: '', doc_address: '', doc_land: '', doc_dpr: '', doc_income: '', doc_training: '', doc_caste: '',
    doc_rural_cert: '', doc_affidavit: '',
    txnId: '', paymentStatus: 'Pending'
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('rabbit_farming_draft');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
        const savedStep = localStorage.getItem('rabbit_farming_step');
        if (savedStep) setCurrentStep(parseInt(savedStep));
      } catch (e) { console.error("Error loading draft", e); }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('rabbit_farming_draft', JSON.stringify(formData));
    localStorage.setItem('rabbit_farming_step', currentStep.toString());
  }, [formData, currentStep]);

  // Inject Cashfree SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File too large. Max 5MB allowed.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`)
        .then(res => res.json())
        .then(data => {
          if (data[0].Status === "Success") {
            const postOffice = data[0].PostOffice[0];
            const foundState = Object.keys(INDIA_GEO_DATA).find(s => s.toLowerCase().includes(postOffice.State.toLowerCase()) || postOffice.State.toLowerCase().includes(s.toLowerCase()));
            setFormData(prev => ({ ...prev, state: foundState || postOffice.State, district: postOffice.District, block: postOffice.Block }));
          }
        }).catch(err => console.error(err));
    }
  }, [formData.pincode]);

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

  const validateStep = (stepId) => {
    const step = STEPS.find(s => s.id === stepId);
    if (!step) return true;
    for (const field of step.fields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        return false;
      }
    }
    return true;
  };

  const [duplicateError, setDuplicateError] = useState('');

  // Debounced Duplicate Check
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (formData.aadhar.length === 12 || formData.mobile.length === 10) {
        try {
          const res = await fetch('/api/forms/rabbit-farming/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ aadhar: formData.aadhar, mobile: formData.mobile })
          });
          const data = await res.json();
          if (data.isDuplicate) {
            setDuplicateError(data.message);
          } else {
            setDuplicateError('');
          }
        } catch (err) { console.error(err); }
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.aadhar, formData.mobile]);

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      alert("Please fill all required fields marked with *");
      return;
    }

    if (currentStep === 1 && duplicateError) {
      alert(duplicateError);
      return;
    }

    setCurrentStep(prev => Math.min(prev + 1, 7));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleManualSubmit = async () => {
    if (!window.Cashfree) {
      alert("Payment gateway is loading, please wait...");
      return;
    }

    setLoading(true);
    
    try {
      const orderRes = await fetch('/api/payment/cashfree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 249,
          customerName: formData.name,
          customerPhone: formData.mobile,
          customerEmail: formData.email || 'customer@adskysolution.com',
          orderNote: 'Rabbit Farming Processing Fee'
        })
      });

      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error(orderData.error || 'Failed to create order');

      const cashfree = window.Cashfree({ mode: "production" });
      const checkoutOptions = {
        paymentSessionId: orderData.paymentSessionId,
        redirectTarget: "_modal", 
      };

      cashfree.checkout(checkoutOptions).then(async (result) => {
        if (result.error) {
          alert(result.error.message);
          setLoading(false);
          return;
        }

        if (result.paymentDetails || result.redirect) {
          const txnId = orderData.orderId;
          const updatedFormData = { ...formData, txnId: txnId, paymentStatus: 'Success' };
          
          // 1. Save to Google Sheets
          const GOOGLE_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzEC_C3n1Cz6kknKk6vJabBOSODvbAvZMHU0d5ZQOmWF3prY9LmB_4bNGCx03U-U9if/exec';
          fetch(GOOGLE_WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFormData)
          });

          // 2. Save to our MongoDB (for duplicate check)
          await fetch('/api/forms/rabbit-farming/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFormData)
          });
          
          // Clear Draft
          localStorage.removeItem('rabbit_farming_draft');
          localStorage.removeItem('rabbit_farming_step');
          setSubmitted(true);
        }
      });

    } catch (err) {
      alert(err.message || 'Payment Error. Please try again.');
      setLoading(false);
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
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans">
      {/* Top Urgency Strip */}
      <div className="bg-red-600 text-white py-1.5 px-4 text-center relative z-[60]">
        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3">
          <AlertCircle size={14} className="animate-pulse" /> 
          <span>Limited Seats Available – Apply Now before they close!</span>
          <AlertCircle size={14} className="animate-pulse" />
        </p>
      </div>

      {/* Professional Header Section */}
      <header className="sticky top-0 z-50 bg-[#0f172a] text-white shadow-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <div className="bg-white p-1.5 rounded-xl shadow-lg border border-gray-100">
              <img 
                src="/logo.jpeg" 
                alt="AdSky Logo" 
                className="h-10 md:h-16 w-auto object-contain"
              />
            </div>
          </div>

          {/* Right: Title & Subtitle */}
          <div className="text-center md:text-right">
            <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white leading-none mb-1">
              Rabbit Farming <span className="text-[#DEB887]">Application Form</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-end gap-2 md:gap-4 opacity-80">
              <p className="text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] flex items-center gap-2">
                <CheckCircle2 size={12} className="text-green-400" /> PAN India Project
              </p>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#DEB887]"></div>
              <p className="text-[9px] md:text-xs font-black text-orange-400 uppercase tracking-[0.1em]">
                Limited Slots Left
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        {/* Stepper */}
        <div className="flex justify-between mb-10 overflow-x-auto no-scrollbar py-2">
          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1 min-w-[100px]">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${currentStep >= step.id ? 'bg-[#B32D2D] border-[#B32D2D] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                {currentStep > step.id ? <CheckCircle2 size={20} /> : <step.icon size={20} />}
              </div>
              <span className={`mt-2 text-[8px] font-black uppercase text-center ${currentStep >= step.id ? 'text-[#B32D2D]' : 'text-gray-400'}`}>{step.title.split(' / ')[0]}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border-2 border-[#DEB887] rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className="bg-[#DEB887] px-8 py-3 flex justify-between items-center">
            <h3 className="text-white font-black italic text-sm uppercase">{STEPS.find(s => s.id === currentStep).title}</h3>
            {currentStep > 1 && currentStep < 7 && (
              <button onClick={() => setCurrentStep(7)} className="text-[10px] bg-white/20 hover:bg-white/40 px-3 py-1 rounded-full text-white font-bold flex items-center gap-1">
                <Eye size={12} /> JUMP TO PREVIEW
              </button>
            )}
          </div>

          <div className="p-6 md:p-10 space-y-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Aadhar Number / आधार नंबर" name="aadhar" value={formData.aadhar} onChange={handleChange} required maxLength={12} />
                  <InputField label="Applicant Name / आवेदक का नाम" name="name" value={formData.name} onChange={handleChange} required />
                  <InputField label="Father/Husband Name" name="parentName" value={formData.parentName} onChange={handleChange} />
                  <InputField label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} required maxLength={10} />
                  <InputField label="Email ID / ईमेल" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="example@gmail.com" />
                  <SelectField label="Social Category" name="socialCategory" value={formData.socialCategory} onChange={handleChange} options={['General', 'SC', 'ST', 'OBC', 'Minority']} />
                  <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                  <InputField label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} type="date" />
                  <InputField label="PAN Card Number" name="pan" value={formData.pan} onChange={handleChange} maxLength={10} />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectField label="Educational Qualification" name="qualification" value={formData.qualification} onChange={handleChange} options={['8th Pass', '10th Pass', '12th Pass', 'Graduate', 'Post Graduate', 'Diploma']} required />
                  <SelectField label="EDP Training Done?" name="edpTraining" value={formData.edpTraining} onChange={handleChange} options={['Yes', 'No']} />
                  <SelectField label="Prior Experience?" name="experience" value={formData.experience} onChange={handleChange} options={['Yes', 'No']} />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Pincode / पिनकोड (Auto-fill)" name="pincode" value={formData.pincode} onChange={handleChange} maxLength={6} required placeholder="Enter Pincode" />
                  <SelectField label="State / राज्य" name="state" value={formData.state} onChange={handleChange} options={Object.keys(INDIA_GEO_DATA)} required />
                  <SelectField label="District / जिला" name="district" value={formData.district} onChange={handleChange} options={availableDistricts} required />
                  <InputField label="Taluka/Block" name="block" value={formData.block} onChange={handleChange} />
                  <div className="md:col-span-2"><InputField label="Full Address" name="address" value={formData.address} onChange={handleChange} /></div>
                  <SelectField label="Unit Location" name="unitLocation" value={formData.unitLocation} onChange={handleChange} options={['Rural', 'Urban']} />
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Business Activity" name="businessActivity" value={formData.businessActivity} disabled className="bg-gray-50 border-gray-100" />
                  <InputField label="Estimated Project Cost (₹)" name="projectCost" value={formData.projectCost} onChange={handleChange} type="number" />
                  <InputField label="IFSC Code / आईएफएससी (Auto-fill)" name="ifscCode" value={formData.ifscCode} onChange={handleChange} maxLength={11} required placeholder="Enter IFSC" />
                  <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} required />
                  <InputField label="Branch Name" name="bankBranch" value={formData.bankBranch} onChange={handleChange} />
                  <InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Agency/Vendor Code" name="vendorCode" value={formData.vendorCode} onChange={handleChange} required />
                  <InputField label="Agency/Vendor Name" name="vendorName" value={formData.vendorName} onChange={handleChange} required />
                  <InputField label="Sub-Agency Code" name="subVendorCode" value={formData.subVendorCode} onChange={handleChange} />
                  <InputField label="Sub-Agency Name" name="subVendorName" value={formData.subVendorName} onChange={handleChange} />
                  <InputField label="Agent Name" name="agentName" value={formData.agentName} onChange={handleChange} required />
                  <InputField label="Agent Mobile" name="agentMobile" value={formData.agentMobile} onChange={handleChange} required maxLength={10} />
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3 mb-6">
                    <AlertCircle className="text-blue-500 shrink-0 mt-1" size={20} />
                    <p className="text-sm text-blue-700 font-bold italic">Upload clear photos. You can preview and re-upload before final submission.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FileUploadField label="Aadhaar Card (Front)" name="doc_aadhar_front" value={formData.doc_aadhar_front} onChange={(e) => handleFileChange(e, 'doc_aadhar_front')} onPreview={() => setPreviewImage(formData.doc_aadhar_front)} onClear={() => setFormData(p => ({...p, doc_aadhar_front: ''}))} />
                    <FileUploadField label="Aadhaar Card (Back)" name="doc_aadhar_back" value={formData.doc_aadhar_back} onChange={(e) => handleFileChange(e, 'doc_aadhar_back')} onPreview={() => setPreviewImage(formData.doc_aadhar_back)} onClear={() => setFormData(p => ({...p, doc_aadhar_back: ''}))} />
                    <FileUploadField label="PAN Card" name="doc_pan" value={formData.doc_pan} onChange={(e) => handleFileChange(e, 'doc_pan')} onPreview={() => setPreviewImage(formData.doc_pan)} onClear={() => setFormData(p => ({...p, doc_pan: ''}))} />
                    <FileUploadField label="Passport Photo" name="doc_photo" value={formData.doc_photo} onChange={(e) => handleFileChange(e, 'doc_photo')} onPreview={() => setPreviewImage(formData.doc_photo)} onClear={() => setFormData(p => ({...p, doc_photo: ''}))} />
                    <FileUploadField label="Bank Passbook" name="doc_bank" value={formData.doc_bank} onChange={(e) => handleFileChange(e, 'doc_bank')} onPreview={() => setPreviewImage(formData.doc_bank)} onClear={() => setFormData(p => ({...p, doc_bank: ''}))} />
                    <FileUploadField label="Address Proof" name="doc_address" value={formData.doc_address} onChange={(e) => handleFileChange(e, 'doc_address')} onPreview={() => setPreviewImage(formData.doc_address)} onClear={() => setFormData(p => ({...p, doc_address: ''}))} />
                    <FileUploadField label="Rural Certificate" name="doc_rural_cert" value={formData.doc_rural_cert} onChange={(e) => handleFileChange(e, 'doc_rural_cert')} onPreview={() => setPreviewImage(formData.doc_rural_cert)} onClear={() => setFormData(p => ({...p, doc_rural_cert: ''}))} />
                    <FileUploadField label="Affidavit" name="doc_affidavit" value={formData.doc_affidavit} onChange={(e) => handleFileChange(e, 'doc_affidavit')} onPreview={() => setPreviewImage(formData.doc_affidavit)} onClear={() => setFormData(p => ({...p, doc_affidavit: ''}))} />
                  </div>
                </motion.div>
              )}

              {currentStep === 7 && (
                <motion.div key="s7" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                  <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-2xl">
                     <h4 className="text-[#B32D2D] font-black uppercase flex items-center gap-2 mb-4"><Eye /> Review Your Application</h4>
                     <p className="text-sm font-bold text-amber-800">Please check all details carefully. Click 'Edit' icon to change any section.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <PreviewSection title="Personal Details" data={{'Name': formData.name, 'Aadhar': formData.aadhar, 'Mobile': formData.mobile, 'Email': formData.email}} onEdit={() => setCurrentStep(1)} />
                    <PreviewSection title="Address Details" data={{'State': formData.state, 'District': formData.district, 'Pincode': formData.pincode, 'Full Address': formData.address}} onEdit={() => setCurrentStep(3)} />
                    <PreviewSection title="Bank Details" data={{'Bank': formData.bankName, 'A/C Number': formData.accountNumber, 'IFSC': formData.ifscCode}} onEdit={() => setCurrentStep(4)} />
                    <PreviewSection title="Agency Details" data={{'Agency': formData.vendorName, 'Code': formData.vendorCode, 'Agent': formData.agentName}} onEdit={() => setCurrentStep(5)} />
                    
                    <div className="p-5 border-2 border-gray-100 rounded-2xl">
                       <div className="flex justify-between items-center mb-4">
                          <h5 className="font-black text-gray-800 uppercase text-xs">Uploaded Documents</h5>
                          <button onClick={() => setCurrentStep(6)} className="text-[#B32D2D]"><Edit3 size={16} /></button>
                       </div>
                       <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                          {['doc_aadhar_front', 'doc_aadhar_back', 'doc_pan', 'doc_photo', 'doc_bank', 'doc_address', 'doc_rural_cert', 'doc_affidavit'].map(doc => (
                            formData[doc] && (
                              <div key={doc} onClick={() => setPreviewImage(formData[doc])} className="aspect-square border-2 border-gray-100 rounded-lg overflow-hidden cursor-pointer hover:border-[#B32D2D]">
                                <img src={formData[doc]} className="w-full h-full object-cover" alt="doc" />
                              </div>
                            )
                          ))}
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-4 pt-6">
              {currentStep > 1 && <button type="button" onClick={prevStep} className="flex-1 py-4 border-2 border-[#B32D2D] text-[#B32D2D] font-black rounded-xl hover:bg-red-50">BACK</button>}
              {currentStep < 7 ? (
                <button type="button" onClick={nextStep} className="flex-[2] py-4 bg-[#B32D2D] text-white font-black rounded-xl flex items-center justify-center gap-2 hover:bg-red-800 shadow-lg shadow-red-100 transition-all">
                  {currentStep === 6 ? 'REVIEW APPLICATION' : 'NEXT STEP'} <ArrowRight size={20} />
                </button>
              ) : (
                <button type="button" onClick={handleManualSubmit} disabled={loading} className="flex-[2] py-4 bg-[#22c55e] text-white font-black rounded-xl flex items-center justify-center gap-2 hover:bg-green-700 shadow-xl shadow-green-100 transition-all active:scale-[0.98]">
                  {loading ? <Loader2 className="animate-spin" /> : 'CONFIRM & PAY ₹249'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
           <button onClick={() => setPreviewImage(null)} className="absolute top-6 right-6 text-white hover:text-red-500"><X size={32} /></button>
           <img src={previewImage} className="max-w-full max-h-full rounded-xl shadow-2xl" alt="Preview" />
        </div>
      )}
    </div>
  );
}

function PreviewSection({ title, data, onEdit }) {
  return (
    <div className="p-5 border-2 border-gray-100 rounded-2xl group hover:border-[#DEB887] transition-colors">
      <div className="flex justify-between items-center mb-3">
        <h5 className="font-black text-[#B32D2D] uppercase text-xs tracking-widest">{title}</h5>
        <button onClick={onEdit} className="p-2 text-gray-400 hover:text-[#B32D2D] transition-colors"><Edit3 size={16} /></button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(data).map(([key, val]) => (
          <div key={key}>
            <p className="text-[9px] font-black text-gray-400 uppercase">{key}</p>
            <p className="text-xs font-bold text-gray-800 break-all">{val || '---'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text", required = false, className = "", ...props }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="bg-[#B32D2D]/10 text-[#B32D2D] text-[9px] font-black px-3 py-1 rounded shadow-sm uppercase tracking-wider border-l-4 border-[#B32D2D]">
          {label} {required && <span className="text-red-500">*</span>}
        </div>
      </div>
      <input type={type} name={name} value={value} onChange={onChange} className={`w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#B32D2D] focus:bg-white font-bold text-sm outline-none transition-all ${className}`} {...props} />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="bg-[#B32D2D]/10 text-[#B32D2D] text-[9px] font-black px-3 py-1 rounded shadow-sm uppercase tracking-wider border-l-4 border-[#B32D2D]">
          {label} {required && <span className="text-red-500">*</span>}
        </div>
      </div>
      <select name={name} value={value} onChange={onChange} className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-[#B32D2D] focus:bg-white font-bold text-sm outline-none transition-all appearance-none">
        <option value="">Select / चुनें</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function FileUploadField({ label, value, onChange, onPreview, onClear }) {
  return (
    <div className="space-y-3 group cursor-pointer relative">
      <div className="flex items-center gap-2">
        <div className={`text-[10px] font-black px-4 py-1.5 rounded-lg shadow-sm uppercase tracking-wider border-l-4 transition-all ${value ? 'bg-green-50 text-green-600 border-green-600' : 'bg-[#B32D2D]/10 text-[#B32D2D] border-[#B32D2D]'}`}>
          {label}
        </div>
        <div className="h-[1px] flex-1 bg-gray-100" />
      </div>
      
      <div className={`relative border-2 border-dashed rounded-2xl p-5 transition-all duration-300 transform ${
        value 
        ? 'border-green-500 bg-green-50/30' 
        : 'border-gray-200 bg-[#fafafa] hover:border-[#B32D2D]/30 hover:bg-white'
      }`}>
        {!value ? (
          <>
            <input type="file" onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white text-[#B32D2D] border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center">
                <Upload size={28} />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-gray-800">Click to Upload</p>
                <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase italic tracking-tighter">PDF, JPG, PNG (Max 5MB)</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div onClick={onPreview} className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-md cursor-zoom-in">
                 <img src={value} className="w-full h-full object-cover" alt="thumb" />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-green-700">Uploaded Successfully</p>
                <button onClick={onPreview} className="text-[10px] font-bold text-blue-600 underline uppercase mt-1">View Full Size</button>
              </div>
            </div>
            <button onClick={onClear} className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
              <X size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MapPin, Briefcase, Building2, ShieldCheck, 
  ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Loader2,
  FileText, CreditCard, GraduationCap, Upload, FileUp, Info
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
  { id: 1, title: 'Personal', sub: 'व्यक्तिगत', icon: User },
  { id: 2, title: 'Qualification', sub: 'योग्यता', icon: GraduationCap },
  { id: 3, title: 'Address', sub: 'पता', icon: MapPin },
  { id: 4, title: 'Project', sub: 'प्रोजेक्ट', icon: CreditCard },
  { id: 5, title: 'Agency', sub: 'एजेंसी', icon: ShieldCheck },
  { id: 6, title: 'Documents', sub: 'दस्तावेज', icon: FileUp }
];

export default function RabbitFarmingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  
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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size too large (Max 5MB)');
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

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.mobile || formData.mobile.length !== 10 || !formData.aadhar || formData.aadhar.length !== 12) {
        alert('Please enter valid Name, 10-digit Mobile, and 12-digit Aadhar Number');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 6));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      
      cashfree.checkout({
        paymentSessionId: orderData.paymentSessionId,
        redirectTarget: "_modal",
      }).then(async (result) => {
        if (result.error) {
          alert(result.error.message);
          setLoading(false);
          return;
        }

        if (result.paymentDetails || result.redirect) {
          const txnId = orderData.orderId;
          const updatedFormData = { ...formData, txnId: txnId, paymentStatus: 'Success' };
          
          const GOOGLE_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzEC_C3n1Cz6kknKk6vJabBOSODvbAvZMHU0d5ZQOmWF3prY9LmB_4bNGCx03U-U9if/exec';
          await fetch(GOOGLE_WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFormData)
          });
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-2xl border border-slate-100">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-inner"><CheckCircle2 size={40} /></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">आवेदन सफल!</h2>
          <p className="text-slate-500 mb-8 text-sm">आपका आवेदन सफलतापूर्वक जमा कर लिया गया है। हम जल्द ही आपसे संपर्क करेंगे।</p>
          <button onClick={() => window.location.reload()} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98]">Done</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans text-slate-900 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
           <div className="flex flex-col">
             <h1 className="text-lg md:text-xl font-extrabold text-slate-900 leading-none">Application Form</h1>
             <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">Rabbit Farming Mission</p>
           </div>
           <div className="bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] font-bold text-indigo-700 uppercase tracking-tighter">Live Registration Portal</span>
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-10">
        {/* Modern Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step {currentStep} of 6</span>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{STEPS[currentStep-1].title}</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
             <motion.div initial={{ width: 0 }} animate={{ width: `${(currentStep / 6) * 100}%` }} className="h-full bg-indigo-600 rounded-full" />
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Form Banner */}
          <div className="bg-indigo-600 px-8 py-4 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white backdrop-blur-md">
                   {React.createElement(STEPS[currentStep-1].icon, { size: 18 })}
                </div>
                <h3 className="text-white font-bold text-sm tracking-tight uppercase">{STEPS[currentStep-1].title} Details</h3>
             </div>
             <span className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">{STEPS[currentStep-1].sub}</span>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <InputField label="Aadhar Number" name="aadhar" value={formData.aadhar} onChange={handleChange} required maxLength={12} placeholder="0000 0000 0000" />
                  <InputField label="Applicant Name" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
                  <InputField label="Father/Husband Name" name="parentName" value={formData.parentName} onChange={handleChange} placeholder="Guardian Name" />
                  <InputField label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} required maxLength={10} placeholder="10-digit number" />
                  <InputField label="Email ID (Optional)" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="example@gmail.com" />
                  <SelectField label="Social Category" name="socialCategory" value={formData.socialCategory} onChange={handleChange} options={['General', 'SC', 'ST', 'OBC', 'Minority']} />
                  <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                  <InputField label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} type="date" />
                  <InputField label="PAN Card Number" name="pan" value={formData.pan} onChange={handleChange} maxLength={10} placeholder="ABCDE1234F" />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <SelectField label="Educational Qualification" name="qualification" value={formData.qualification} onChange={handleChange} options={['8th Pass', '10th Pass', '12th Pass', 'Graduate', 'Post Graduate', 'Diploma']} />
                  <SelectField label="EDP Training Done?" name="edpTraining" value={formData.edpTraining} onChange={handleChange} options={['Yes', 'No']} />
                  <SelectField label="Prior Experience?" name="experience" value={formData.experience} onChange={handleChange} options={['Yes', 'No']} />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <InputField label="Pincode (Auto-fill)" name="pincode" value={formData.pincode} onChange={handleChange} maxLength={6} required placeholder="Enter 6-digit Pincode" />
                  <SelectField label="State / राज्य" name="state" value={formData.state} onChange={handleChange} options={Object.keys(INDIA_GEO_DATA)} required />
                  <SelectField label="District / जिला" name="district" value={formData.district} onChange={handleChange} options={availableDistricts} required />
                  <InputField label="Taluka/Block" name="block" value={formData.block} onChange={handleChange} />
                  <div className="md:col-span-2"><InputField label="Full Address" name="address" value={formData.address} onChange={handleChange} placeholder="House No, Landmark, Village" /></div>
                  <SelectField label="Unit Location" name="unitLocation" value={formData.unitLocation} onChange={handleChange} options={['Rural', 'Urban']} />
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <InputField label="Business Activity" name="businessActivity" value={formData.businessActivity} disabled className="bg-slate-50 border-slate-100" />
                  <InputField label="Estimated Project Cost (₹)" name="projectCost" value={formData.projectCost} onChange={handleChange} type="number" placeholder="Enter Amount" />
                  <InputField label="IFSC Code (Auto-fill)" name="ifscCode" value={formData.ifscCode} onChange={handleChange} maxLength={11} required placeholder="e.g. SBIN0001234" />
                  <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
                  <InputField label="Branch Name" name="bankBranch" value={formData.bankBranch} onChange={handleChange} />
                  <InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Enter Account Number" />
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div key="s5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <InputField label="Agency/Vendor Code" name="vendorCode" value={formData.vendorCode} onChange={handleChange} required />
                  <InputField label="Agency/Vendor Name" name="vendorName" value={formData.vendorName} onChange={handleChange} required />
                  <InputField label="Sub-Agency Code" name="subVendorCode" value={formData.subVendorCode} onChange={handleChange} />
                  <InputField label="Sub-Agency Name" name="subVendorName" value={formData.subVendorName} onChange={handleChange} />
                  <InputField label="Agent Name" name="agentName" value={formData.agentName} onChange={handleChange} required />
                  <InputField label="Agent Mobile" name="agentMobile" value={formData.agentMobile} onChange={handleChange} required maxLength={10} />
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div key="s6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-4">
                     <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0"><Info size={20} /></div>
                     <p className="text-xs font-semibold text-slate-600 leading-relaxed uppercase tracking-tighter">Upload high-quality scans of your documents. Non-mandatory but recommended for faster processing. (Max 5MB each)</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FileUploadField label="Aadhaar Front" onChange={(e) => handleFileChange(e, 'doc_aadhar_front')} hasFile={!!formData.doc_aadhar_front} />
                    <FileUploadField label="Aadhaar Back" onChange={(e) => handleFileChange(e, 'doc_aadhar_back')} hasFile={!!formData.doc_aadhar_back} />
                    <FileUploadField label="PAN Card" onChange={(e) => handleFileChange(e, 'doc_pan')} hasFile={!!formData.doc_pan} />
                    <FileUploadField label="Passport Photo" onChange={(e) => handleFileChange(e, 'doc_photo')} hasFile={!!formData.doc_photo} />
                    <FileUploadField label="Bank Passbook" onChange={(e) => handleFileChange(e, 'doc_bank')} hasFile={!!formData.doc_bank} />
                    <FileUploadField label="Address Proof" onChange={(e) => handleFileChange(e, 'doc_address')} hasFile={!!formData.doc_address} />
                    <FileUploadField label="Rural Certificate" onChange={(e) => handleFileChange(e, 'doc_rural_cert')} hasFile={!!formData.doc_rural_cert} />
                    <FileUploadField label="Affidavit" onChange={(e) => handleFileChange(e, 'doc_affidavit')} hasFile={!!formData.doc_affidavit} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-4 mt-12">
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="flex-1 py-4 px-6 border-2 border-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-95">
                  <ArrowLeft size={18} /> Back
                </button>
              )}
              {currentStep < 6 ? (
                <button type="button" onClick={nextStep} className="flex-[2] py-4 px-6 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 active:scale-95">
                  Continue <ArrowRight size={18} />
                </button>
              ) : (
                <button type="button" onClick={handleManualSubmit} disabled={loading} className="flex-[2] py-4 px-6 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 active:scale-95">
                  {loading ? <Loader2 className="animate-spin" /> : 'Pay ₹249 & Final Submit'}
                </button>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Secured by Cashfree Payments & SSL Encryption</p>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text", required = false, className = "", ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input 
        type={type} name={name} value={value} onChange={onChange} 
        className={`w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-sm outline-none placeholder:text-slate-300 ${className}`} 
        {...props} 
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select 
        name={name} value={value} onChange={onChange} 
        className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-sm outline-none appearance-none"
      >
        <option value="">Select Option</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function FileUploadField({ label, onChange, hasFile }) {
  return (
    <div className="relative group cursor-pointer">
      <div className={`p-4 rounded-2xl border-2 border-dashed transition-all duration-300 ${hasFile ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200 group-hover:border-indigo-400 group-hover:bg-indigo-50'}`}>
        <input type="file" onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${hasFile ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white text-slate-400 shadow-sm border border-slate-100'}`}>
            {hasFile ? <CheckCircle2 size={18} /> : <Upload size={18} />}
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">{label}</p>
            <p className={`text-[9px] font-bold mt-0.5 ${hasFile ? 'text-emerald-600' : 'text-slate-400'}`}>{hasFile ? 'Document Selected' : 'Choose File'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

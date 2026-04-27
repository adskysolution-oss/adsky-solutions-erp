'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MapPin, Briefcase, Building2, ShieldCheck, 
  ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Loader2,
  FileText, CreditCard, GraduationCap, Upload, FileUp
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
  { id: 5, title: 'Agency/Vendor / एजेंसी/वेंडर', icon: ShieldCheck },
  { id: 6, title: 'Documents / दस्तावेज', icon: FileUp }
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

  // Inject Cashfree SDK
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
    window.scrollTo(0, 0);
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
      // 1. Create Cashfree Order
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

      // 2. Initialize Checkout
      const cashfree = window.Cashfree({ mode: "production" });
      const checkoutOptions = {
        paymentSessionId: orderData.paymentSessionId,
        redirectTarget: "_self", // Or "_modal"
      };

      // 3. Start Checkout
      // Note: Since we are using _self, the page will redirect. 
      // If we want to stay on page and then submit to Google Sheets, we should use a verification step.
      // However, for simplicity and immediate feedback, we can use a callback if we use _modal.
      
      cashfree.checkout(checkoutOptions).then(async (result) => {
        if (result.error) {
          alert(result.error.message);
          setLoading(false);
          return;
        }
        if (result.redirect) {
          console.log("Redirecting...");
          return;
        }

        // 4. Verify Payment (using modal result or after redirect back)
        // For modal flow:
        if (result.paymentDetails) {
          const txnId = orderData.orderId;
          const updatedFormData = { ...formData, txnId: txnId, paymentStatus: 'Success' };
          
          // 5. Submit to Google Sheets
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
    } finally {
      // Don't stop loading here if redirecting
      // setLoading(false);
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
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col items-center justify-center gap-2">
           <h1 className="text-2xl md:text-3xl font-black text-[#B32D2D]">Online Application Form</h1>
           <p className="text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-widest">Rabbit Farming Mission | Entrepreneurship Development</p>
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

          <div className="p-6 md:p-10 space-y-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
                  <InputField label="Branch Name" name="bankBranch" value={formData.bankBranch} onChange={handleChange} />
                  <InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Agency/Vendor Code" name="vendorCode" value={formData.vendorCode} onChange={handleChange} required />
                  <InputField label="Agency/Vendor Name" name="vendorName" value={formData.vendorName} onChange={handleChange} required />
                  <InputField label="Sub-Agency/Vendor Code" name="subVendorCode" value={formData.subVendorCode} onChange={handleChange} />
                  <InputField label="Sub-Agency/Vendor Name" name="subVendorName" value={formData.subVendorName} onChange={handleChange} />
                  <InputField label="Agent Name" name="agentName" value={formData.agentName} onChange={handleChange} required />
                  <InputField label="Agent Mobile" name="agentMobile" value={formData.agentMobile} onChange={handleChange} required maxLength={10} />
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div key="s6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3 mb-6">
                    <AlertCircle className="text-blue-500 shrink-0 mt-1" size={20} />
                    <p className="text-sm text-blue-700 font-bold italic">Upload clear photos or scans of your documents. (Non-mandatory)</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FileUploadField label="Aadhaar Card (Front Side)" onChange={(e) => handleFileChange(e, 'doc_aadhar_front')} hasFile={!!formData.doc_aadhar_front} />
                    <FileUploadField label="Aadhaar Card (Back Side)" onChange={(e) => handleFileChange(e, 'doc_aadhar_back')} hasFile={!!formData.doc_aadhar_back} />
                    <FileUploadField label="PAN Card" onChange={(e) => handleFileChange(e, 'doc_pan')} hasFile={!!formData.doc_pan} />
                    <FileUploadField label="Passport Size Photo" onChange={(e) => handleFileChange(e, 'doc_photo')} hasFile={!!formData.doc_photo} />
                    <FileUploadField label="Bank Passbook / Statement" onChange={(e) => handleFileChange(e, 'doc_bank')} hasFile={!!formData.doc_bank} />
                    <FileUploadField label="Address Proof (Voter/DL)" onChange={(e) => handleFileChange(e, 'doc_address')} hasFile={!!formData.doc_address} />
                    <FileUploadField label="Land Doc (Khasra/Khatauni)" onChange={(e) => handleFileChange(e, 'doc_land')} hasFile={!!formData.doc_land} />
                    <FileUploadField label="Project Report (DPR)" onChange={(e) => handleFileChange(e, 'doc_dpr')} hasFile={!!formData.doc_dpr} />
                    <FileUploadField label="Income Proof" onChange={(e) => handleFileChange(e, 'doc_income')} hasFile={!!formData.doc_income} />
                    <FileUploadField label="Training Certificate" onChange={(e) => handleFileChange(e, 'doc_training')} hasFile={!!formData.doc_training} />
                    <FileUploadField label="Caste Certificate" onChange={(e) => handleFileChange(e, 'doc_caste')} hasFile={!!formData.doc_caste} />
                    <FileUploadField label="Rural Praman Patr (ग्रामीण प्रमाण पत्र)" onChange={(e) => handleFileChange(e, 'doc_rural_cert')} hasFile={!!formData.doc_rural_cert} />
                    <FileUploadField label="PMEGP Rabbit Farming Affidavit" onChange={(e) => handleFileChange(e, 'doc_affidavit')} hasFile={!!formData.doc_affidavit} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-4 pt-6">
              {currentStep > 1 && <button type="button" onClick={prevStep} className="flex-1 py-4 border-2 border-[#B32D2D] text-[#B32D2D] font-black rounded-xl">BACK</button>}
              {currentStep < 6 ? (
                <button type="button" onClick={nextStep} className="flex-[2] py-4 bg-[#B32D2D] text-white font-black rounded-xl flex items-center justify-center gap-2">NEXT STEP <ArrowRight size={20} /></button>
              ) : (
                <button type="button" onClick={handleManualSubmit} disabled={loading} className="flex-[2] py-4 bg-[#22c55e] text-white font-black rounded-xl flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="animate-spin" /> : 'PAY ₹249 & SUBMIT APPLICATION'}
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

function FileUploadField({ label, onChange, hasFile }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-600 uppercase">{label}</label>
      <div className={`relative border-2 border-dashed rounded-xl p-4 transition-colors ${hasFile ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-[#B32D2D]'}`}>
        <input type="file" onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${hasFile ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
            {hasFile ? <CheckCircle2 size={20} /> : <Upload size={20} />}
          </div>
          <div>
            <p className="text-xs font-black text-gray-700">{hasFile ? 'File Selected' : 'Choose File'}</p>
            <p className="text-[10px] text-gray-400">PDF, JPG, PNG (Max 5MB)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

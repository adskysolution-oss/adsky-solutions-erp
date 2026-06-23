"use client";

import { useState, useRef } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    gender: "",
    dob: "",
    mobile: "",
    whatsapp: "",
    email: "",
    state: "",
    district: "",
    address: "",
    postApplied: "",
    subject: "",
    qualification: "",
    specialization: "",
    passingYear: "",
    experience: "",
    organizationName: "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [photoError, setPhotoError] = useState("");

  const [declarations, setDeclarations] = useState({
    d1: false,
    d2: false,
    d3: false,
    d4: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const getFileIcon = (file) => {
    if (!file) return null;
    if (file.type.startsWith("image/")) return "🖼️";
    if (file.type === "application/pdf") return "📄";
    return "📝";
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setPhotoError("");
    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setPhotoError("Only Image (JPG/PNG), PDF, or Word (.doc/.docx) files are allowed.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setPhotoError("File size must be less than 10 MB.");
        return;
      }
      setPhoto(file);
      setPhotoName(file.name);
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      formData.fullName, formData.fatherName, formData.gender, formData.dob,
      formData.mobile, formData.whatsapp, formData.email, formData.state,
      formData.district, formData.address, formData.postApplied, formData.subject,
      formData.qualification, formData.specialization, formData.passingYear, formData.experience
    ];
    
    if (requiredFields.some(field => !field || !field.trim())) return false;
    if (!/^\d{10}$/.test(formData.mobile)) return false;
    if (!/^\d{10}$/.test(formData.whatsapp)) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
    if (!photo) return false;
    if (!declarations.d1 || !declarations.d2 || !declarations.d3 || !declarations.d4) return false;
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid() || !photo) return;
    
    setIsSubmitting(true);
    
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    submitData.append("photo", photo);
    
    try {
      const response = await fetch("/api/teacher-register", {
        method: "POST",
        body: submitData,
      });
      
      const data = await response.json();
      
      if (response.ok && data.payment_session_id) {
        router.push(`/teacherrecruitmentform/payment?session_id=${data.payment_session_id}&order_id=${data.order_id}`);
      } else {
        alert("Error: " + (data.error || "Failed to initiate payment."));
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>PRT, TGT & PGT Teacher Recruitment 2026</h1>
        <p className={styles.subtitle}>Online Test Registration Form</p>
        
        <div className={styles.badges}>
          <div className={styles.badgeWarning}>
            This is NOT a Government Job
          </div>
          <div className={styles.badgeFee}>
            Online Test Fee ₹100
          </div>
        </div>
      </header>

      <div className={styles.importantDates}>
        <h3>Important Recruitment Details</h3>
        <p style={{ marginBottom: "16px", color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", lineHeight: "1.6" }}>
          Government School Project – Outsource Basis &nbsp;|&nbsp; Recruitment through Private Outsourcing Agency
        </p>
        <div className={styles.dateGrid}>
          <div className={styles.dateItem}>
            <span className={styles.dateLabel}>Last Date to Apply</span>
            <span className={styles.dateValue}>30 June 2026</span>
          </div>
          <div className={styles.dateItem}>
            <span className={styles.dateLabel}>Online Exam Date</span>
            <span className={styles.dateValue}>05 July 2026</span>
          </div>
          <div className={styles.dateItem}>
            <span className={styles.dateLabel}>Exam Time</span>
            <span className={styles.dateValue}>02:00 PM</span>
          </div>
          <div className={styles.dateItem}>
            <span className={styles.dateLabel}>Requirement</span>
            <span className={styles.dateValue}>Android + Internet</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formHeader}>
          <h2 style={{ color: "var(--primary-blue, #0A3D91)", margin: 0, fontSize: "1.5rem", fontWeight: "700" }}>Application Form</h2>
          <p style={{ color: "var(--text-muted, #64748B)", fontSize: "0.9rem", marginTop: "4px" }}>Fill out all required details accurately.</p>
        </div>

        <div className={styles.formBody}>
          <h3 className={styles.sectionTitle}>1. Basic Details</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Full Name <span className={styles.requiredAsterisk}>*</span></label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required placeholder="As per records" />
            </div>
            <div className={styles.formGroup}>
              <label>Father's Name <span className={styles.requiredAsterisk}>*</span></label>
              <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Gender <span className={styles.requiredAsterisk}>*</span></label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Date of Birth <span className={styles.requiredAsterisk}>*</span></label>
              <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Mobile Number <span className={styles.requiredAsterisk}>*</span></label>
              <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} required placeholder="10 Digit Mobile" maxLength={10} pattern="\d{10}" />
            </div>
            <div className={styles.formGroup}>
              <label>WhatsApp Number <span className={styles.requiredAsterisk}>*</span></label>
              <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required placeholder="10 Digit WhatsApp" maxLength={10} pattern="\d{10}" />
            </div>
            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label>Email ID <span className={styles.requiredAsterisk}>*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="your.email@example.com" />
            </div>
          </div>

          <h3 className={styles.sectionTitle}>2. Address Details</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>State <span className={styles.requiredAsterisk}>*</span></label>
              <select name="state" value={formData.state} onChange={handleInputChange} required>
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                <option value="Odisha">Odisha</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>District <span className={styles.requiredAsterisk}>*</span></label>
              <input type="text" name="district" value={formData.district} onChange={handleInputChange} required placeholder="Enter District" />
            </div>
            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label>Current Address <span className={styles.requiredAsterisk}>*</span></label>
              <textarea name="address" value={formData.address} onChange={handleInputChange} required rows={3} placeholder="Full Address with Pincode" />
            </div>
          </div>

          <h3 className={styles.sectionTitle}>3. Post & Qualification</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Applying Post <span className={styles.requiredAsterisk}>*</span></label>
              <select name="postApplied" value={formData.postApplied} onChange={handleInputChange} required>
                <option value="">Select Post</option>
                <option value="PRT">PRT - Primary Teacher</option>
                <option value="TGT">TGT - Trained Graduate Teacher</option>
                <option value="PGT">PGT - Post Graduate Teacher</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Subject Applying For <span className={styles.requiredAsterisk}>*</span></label>
              <select name="subject" value={formData.subject} onChange={handleInputChange} required>
                <option value="">Select Subject</option>
                {["English", "Hindi", "Mathematics", "Science", "Social Science", "Physics", "Chemistry", "Biology", "Commerce", "Economics", "Political Science", "History", "Geography", "Computer Science"].map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Highest Qualification <span className={styles.requiredAsterisk}>*</span></label>
              <select name="qualification" value={formData.qualification} onChange={handleInputChange} required>
                <option value="">Select Qualification</option>
                <option value="D.El.Ed.">D.El.Ed.</option>
                <option value="B.El.Ed.">B.El.Ed.</option>
                <option value="Graduation">Graduation</option>
                <option value="Graduation + B.Ed.">Graduation + B.Ed.</option>
                <option value="Post Graduation + B.Ed.">Post Graduation + B.Ed.</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Specialization / Subject <span className={styles.requiredAsterisk}>*</span></label>
              <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Passing Year <span className={styles.requiredAsterisk}>*</span></label>
              <input type="number" name="passingYear" value={formData.passingYear} onChange={handleInputChange} required placeholder="YYYY" min="1980" max="2026" />
            </div>
          </div>

          <h3 className={styles.sectionTitle}>4. Experience</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Teaching Experience <span className={styles.requiredAsterisk}>*</span></label>
              <select name="experience" value={formData.experience} onChange={handleInputChange} required>
                <option value="">Select Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4+ Years">4+ Years</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Current School / Organization Name (Optional)</label>
              <input type="text" name="organizationName" value={formData.organizationName} onChange={handleInputChange} />
            </div>
          </div>

          <h3 className={styles.sectionTitle}>5. Document Upload</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label>Upload Document (Photo / Certificate / Degree) <span className={styles.requiredAsterisk}>*</span></label>
              <div 
                className={styles.fileUploadBox} 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileChange({ target: { files: [file] } });
                }}
              >
                <input 
                  type="file" 
                  accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                  ref={fileInputRef} 
                  style={{ display: "none" }} 
                  onChange={handleFileChange}
                />
                {photoName ? (
                  <>
                    <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>{getFileIcon(photo)}</div>
                    <p style={{ color: "#10B981", fontWeight: 600, fontSize: "1rem" }}>{photoName}</p>
                    <p style={{ color: "#64748B", fontSize: "0.8rem", marginTop: "4px" }}>Click to change file</p>
                  </>
                ) : (
                  <>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue, #0A3D91)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px" }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
                    </svg>
                    <p style={{ fontWeight: 600, color: "#1E293B", marginBottom: "6px" }}>Click to Upload or Drag & Drop</p>
                    <p style={{ color: "#64748B", fontSize: "0.85rem" }}>Supported: JPG, PNG, PDF, DOC, DOCX</p>
                    <p style={{ color: "#94A3B8", fontSize: "0.8rem", marginTop: "4px" }}>Maximum size: 10 MB</p>
                  </>
                )}
              </div>
              {photoError && <p className={styles.errorText}>{photoError}</p>}
            </div>
          </div>

          <h3 className={styles.sectionTitle}>6. Declaration & Payment</h3>
          <div className={styles.declarations}>
            <p style={{ fontWeight: 600, marginBottom: "16px" }}>Please accept all declarations before proceeding to payment:</p>
            
            <label className={styles.checkboxItem}>
              <input type="checkbox" checked={declarations.d1} onChange={(e) => setDeclarations({...declarations, d1: e.target.checked})} />
              <span className={styles.checkboxLabel}>I confirm that all information provided by me is true and correct.</span>
            </label>
            
            <label className={styles.checkboxItem}>
              <input type="checkbox" checked={declarations.d2} onChange={(e) => setDeclarations({...declarations, d2: e.target.checked})} />
              <span className={styles.checkboxLabel}>I understand this recruitment is for Government School Projects through a Private Outsourcing Agency and this is not a Government Job.</span>
            </label>
            
            <label className={styles.checkboxItem}>
              <input type="checkbox" checked={declarations.d3} onChange={(e) => setDeclarations({...declarations, d3: e.target.checked})} />
              <span className={styles.checkboxLabel}>I understand that the ₹100 examination fee is non-refundable.</span>
            </label>
            
            <label className={styles.checkboxItem}>
              <input type="checkbox" checked={declarations.d4} onChange={(e) => setDeclarations({...declarations, d4: e.target.checked})} />
              <span className={styles.checkboxLabel}>I understand that only candidates qualifying the Online Test will be called for Document Verification.</span>
            </label>
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn} 
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Pay ₹100 & Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}

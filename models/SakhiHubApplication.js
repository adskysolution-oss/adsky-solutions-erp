import mongoose from 'mongoose';

const SakhiHubApplicationSchema = new mongoose.Schema({
  applicationId: { type: String, unique: true, required: true },
  partnerId: { type: String, sparse: true },
  status: { 
    type: String, 
    enum: ['New', 'Under Review', 'Document Pending', 'Approved', 'Rejected', 'Hold'],
    default: 'New'
  },
  
  // Step 1: Basic Details
  applicantType: { type: String, required: true },
  organizationName: { type: String, required: true },
  contactPersonName: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  alternateMobileNumber: { type: String },
  emailId: { type: String, required: true },
  whatsappNumber: { type: String },
  websiteSocialLink: { type: String },
  otpVerified: { type: Boolean, default: false },

  // Step 2: Identity & Legal Details
  aadhaarNumber: { type: String, required: true, unique: true },
  panNumber: { type: String, required: true },
  gstNumber: { type: String },
  ngoRegistrationNumber: { type: String },
  firmRegistrationNumber: { type: String },
  udyamMsmeNumber: { type: String },

  // Step 3: Address Details
  address: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  tehsil: { type: String },
  block: { type: String },
  cityVillage: { type: String },
  pincode: { type: String, required: true },

  // Step 4: Work Area Selection
  workAreaType: { type: String, required: true },
  selectedStates: [{ type: String }],
  selectedDistricts: [{ type: String }],
  selectedBlocks: [{ type: String }],
  exclusiveStateInterest: { type: Boolean },

  // Step 5: Work Interest
  interestedWorkCategories: [{ type: String }],
  monthlyCapacity: { type: String },
  teamSize: { type: String },
  experience: [{ type: String }],

  // Step 6: Bank Details
  bankName: { type: String, required: true },
  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },

  // Step 7: Document Upload (Storage links)
  documents: {
    aadhaarFront: { type: String },
    aadhaarBack: { type: String },
    panCard: { type: String },
    ngoFirmProof: { type: String },
    gstCertificate: { type: String },
    udyamCertificate: { type: String },
    cancelledCheque: { type: String },
    officePhoto: { type: String },
    workProof: { type: String }
  },

  // Metadata
  submissionIp: { type: String },
  adminRemarks: { type: String },
  approvedBy: { type: String },
  approvalDate: { type: Date },
  duplicateCheckStatus: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.SakhiHubApplication || mongoose.model('SakhiHubApplication', SakhiHubApplicationSchema);

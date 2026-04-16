import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  farmerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  district: { type: String },
  state: { type: String },
  pincode: { type: String },
  
  // Custom Form Data (Dynamic Fields)
  customData: { type: Map, of: String },
  
  // Documents
  documents: [{
    name: { type: String },
    url: { type: String },
    type: { type: String }
  }],
  
  // Referring Codes
  partnerCode: { type: String },
  employeeCode: { type: String },
  
  // Status & Payment
  paymentStatus: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  transactionId: { type: String },
  applicationStatus: {
    type: String,
    enum: ['submitted', 'under-review', 'approved', 'rejected'],
    default: 'submitted'
  },
  adminRemarks: { type: String },
  
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);

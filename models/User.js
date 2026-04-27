import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['admin', 'sub-admin', 'partner', 'employee', 'farmer', 'vendor'],
    required: true,
    default: 'farmer'
  },
  status: {
    type: String,
    enum: ['active', 'blocked', 'pending'],
    default: 'active'
  },
  state: { type: String },
  district: { type: String },
  tehsil: { type: String },
  village: { type: String },
  profileImage: { type: String },
  lastLogin: { type: Date },
  // Vendor/Agent Tracking
  vendorCode: { type: String, unique: true, sparse: true }, // Unique code for vendors
  referredBy: { type: String }, // Code of the vendor/agent who referred this user
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Parent vendor for agents
}, { timestamps: true });


export default mongoose.models.User || mongoose.model('User', UserSchema);

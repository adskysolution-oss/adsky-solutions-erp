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
}, { timestamps: true });


export default mongoose.models.User || mongoose.model('User', UserSchema);

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['admin', 'partner', 'employee', 'farmer'],
    required: true,
    default: 'farmer'
  },
  status: {
    type: String,
    enum: ['active', 'blocked', 'pending'],
    default: 'active'
  },
  profileImage: { type: String },
  lastLogin: { type: Date },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);

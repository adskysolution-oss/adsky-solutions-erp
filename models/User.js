import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  phone: { type: String },
  role: { 
    type: String, 
    enum: ['super-admin', 'admin', 'manager', 'sales', 'support', 'employer', 'candidate'],
    required: true,
    default: 'candidate'
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'pending'],
    default: 'active'
  },
  subBranch: { type: String }, // Branch location
  category: { type: String }, // User category/role-type
  mustChangePassword: { type: Boolean, default: true },
  profileImage: { type: String },
  
  // -- Employer Specific Fields --
  companyName: { type: String },
  subscriptionPlan: { type: String, default: 'free' },
  
  // -- Candidate Specific Fields --
  title: { type: String },
  bio: { type: String },
  resumeUrl: { type: String }, // AWS S3 URL
  multipleResumes: [{ name: String, url: String }],
  skills: [{ type: String }],
  education: { type: String },
  experience: { type: String },
  location: { type: String },
  socials: {
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String }
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);

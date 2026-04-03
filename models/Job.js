import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String },
  experience: { type: String },
  jobType: { 
    type: String, 
    enum: ['Full Time', 'Part Time', 'Remote', 'Contract'], 
    required: true 
  },
  skillsRequired: [{ type: String }],
  education: { type: String },
  lastDate: { type: Date },
  openings: { type: Number, default: 1 },
  description: { type: String, required: true }, // Rich text HTML
  
  // Advanced Features
  imageBanner: { type: String }, // AWS S3
  pdfJd: { type: String }, // AWS S3
  dynamicSections: [{
    title: String,
    content: String
  }],
  seoTitle: { type: String },
  metaDescription: { type: String },
  slug: { type: String, unique: true },
  
  // Job Status
  status: {
    type: String,
    enum: ['pending', 'active', 'expired', 'rejected'],
    default: 'pending' // Requires Admin Approval
  },
  featured: { type: Boolean, default: false },
  autoExpiry: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model('Job', JobSchema);

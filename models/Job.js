import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Remote'], default: 'Full-time' },
  salary: String,
  experience: String,
  requirements: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model('Job', JobSchema);

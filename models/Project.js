import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Active', 'Sold', 'Pending'],
    default: 'Active'
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  images: [{ type: String }],
  features: [{ type: String }],
  description: { type: String }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);

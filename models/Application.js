import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['applied', 'shortlisted', 'rejected', 'hired'],
    default: 'applied'
  },
  appliedAt: { type: Date, default: Date.now },
  notes: { type: String },
  history: [{
    status: String,
    date: { type: Date, default: Date.now },
    remark: String
  }]
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);

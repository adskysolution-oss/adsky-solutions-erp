import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  source: { 
    type: String, 
    enum: ['Facebook', 'Website', 'WhatsApp', 'Manual'],
    default: 'Manual'
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Interested', 'Converted', 'Not Interested'],
    default: 'New'
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Sales CRM assignment
  followUpDate: { type: Date },
  notes: [{
    text: String,
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

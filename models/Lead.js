import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  source: { 
    type: String, 
    enum: ['website', 'facebook', 'whatsapp', 'direct', 'other'],
    default: 'website' 
  },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'interested', 'converted', 'not_interested'],
    default: 'new' 
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String },
  followUps: [{
    date: { type: Date },
    note: { type: String },
    status: { type: String }
  }],
  reminders: [{
    date: { type: Date },
    message: { type: String },
    completed: { type: Boolean, default: false }
  }]
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { 
    type: String, 
    enum: ['admin', 'manager', 'sales', 'support'],
    default: 'sales'
  },
  department: { type: String },
  salary: { type: Number },
  joiningDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'suspended'], default: 'active' },
  performanceScore: { type: Number, default: 0 },
  assignedLeads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lead' }],
}, { timestamps: true });

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);

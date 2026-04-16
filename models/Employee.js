import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeCode: { type: String, required: true, unique: true },
  partnerCode: { type: String, required: true }, // The partner they work under
  totalLeads: { type: Number, default: 0 },
  successfulLeads: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);

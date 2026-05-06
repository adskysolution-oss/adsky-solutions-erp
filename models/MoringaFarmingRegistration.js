import mongoose from 'mongoose';

const MoringaFarmingRegistrationSchema = new mongoose.Schema({
  aadhar: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  txnId: { type: String },
  paymentStatus: { type: String, default: 'Pending' },
  formData: { type: Object } // Store full data for backup
}, { timestamps: true });

export default mongoose.models.MoringaFarmingRegistration || mongoose.model('MoringaFarmingRegistration', MoringaFarmingRegistrationSchema);

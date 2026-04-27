import mongoose from 'mongoose';

const RabbitFarmingRegistrationSchema = new mongoose.Schema({
  aadhar: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  txnId: { type: String },
  paymentStatus: { type: String, default: 'Pending' },
  formData: { type: Object } // Store full data for backup
}, { timestamps: true });

export default mongoose.models.RabbitFarmingRegistration || mongoose.model('RabbitFarmingRegistration', RabbitFarmingRegistrationSchema);

import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  partnerCode: { type: String, required: true, unique: true },
  region: { type: String },
  commissionRate: { type: Number, default: 0 }, // Individual commission rate if different from global
  totalEarnings: { type: Number, default: 0 },
  pendingWithdrawals: { type: Number, default: 0 },
  onboardingFeePaid: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Partner || mongoose.model('Partner', PartnerSchema);

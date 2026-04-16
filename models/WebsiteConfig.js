import mongoose from 'mongoose';

const WebsiteConfigSchema = new mongoose.Schema({
  applicationFee: { type: Number, default: 249 },
  partnerCommission: { type: Number, default: 30 },
  employeeCommission: { type: Number, default: 50 },
  cashfreeAppId: { type: String },
  cashfreeSecretKey: { type: String },
  isLive: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.WebsiteConfig || mongoose.model('WebsiteConfig', WebsiteConfigSchema);

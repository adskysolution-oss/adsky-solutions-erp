import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Wallet || mongoose.model('Wallet', WalletSchema);

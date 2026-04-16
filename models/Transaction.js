import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true }, // Credit = earnings, Debit = withdrawal
  amount: { type: Number, required: true },
  description: { type: String, required: true }, // e.g., 'Lead Commission: Suresh Patel'
  referenceId: { type: String }, // PartnerCode or EmployeeCode
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' }
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

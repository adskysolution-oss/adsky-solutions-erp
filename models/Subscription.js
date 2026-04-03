import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planName: {
    type: String,
    enum: ['Free', 'Basic', 'Premium', 'Enterprise'],
    default: 'Free'
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  paymentId: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'ACTIVE', 'expired', 'failed'],
    default: 'pending'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date
  },
  features: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);

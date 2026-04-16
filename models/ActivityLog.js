import mongoose from 'mongoose';

const ActivityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g., 'LOGIN', 'APP_APPROVED', 'SETTINGS_UPDATED'
  resource: { type: String }, // e.g., 'Application', 'User'
  details: { type: String },
  ip: { type: String },
  userAgent: { type: String }
}, { timestamps: true });

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);

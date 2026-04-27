import mongoose from 'mongoose';

const FormResponseSchema = new mongoose.Schema({
  form: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomForm', required: true },
  data: { type: mongoose.Schema.Types.Mixed }, // Flexible JSON data
  files: [{
    label: String,
    url: String,
    name: String
  }],
  status: { type: String, enum: ['New', 'Reviewed', 'Accepted', 'Rejected'], default: 'New' },
  metadata: {
    ip: String,
    userAgent: String
  }
}, { timestamps: true });

export default mongoose.models.FormResponse || mongoose.model('FormResponse', FormResponseSchema);

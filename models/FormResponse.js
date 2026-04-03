import mongoose from 'mongoose';

const FormResponseSchema = new mongoose.Schema({
  form: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomForm', required: true },
  data: { type: Map, of: String }, // Stores { fieldLabel: value }
  fileUrl: { type: String },      // For resumes or attachments
  status: { type: String, enum: ['New', 'Reviewed', 'Accepted', 'Rejected'], default: 'New' }
}, { timestamps: true });

export default mongoose.models.FormResponse || mongoose.model('FormResponse', FormResponseSchema);

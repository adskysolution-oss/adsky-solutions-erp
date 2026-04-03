import mongoose from 'mongoose';

const CustomFormSchema = new mongoose.Schema({
  formName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  fields: [{
    label: { type: String, required: true },
    type: { type: String, enum: ['text', 'email', 'number', 'textarea', 'file', 'select'], default: 'text' },
    required: { type: Boolean, default: false },
    options: [String] // for select fields
  }]
}, { timestamps: true });

export default mongoose.models.CustomForm || mongoose.model('CustomForm', CustomFormSchema);

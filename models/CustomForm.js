import mongoose from 'mongoose';

const CustomFormSchema = new mongoose.Schema({
  formName: { type: String, required: true },
  description: String,
  slug: { type: String, required: true, unique: true },
  steps: [{
    title: { type: String, required: true },
    fields: [{
      label: { type: String, required: true },
      type: { 
        type: String, 
        enum: ['text', 'email', 'number', 'textarea', 'file', 'select', 'date', 'checkbox', 'radio', 'rating', 'time', 'linear-scale'], 
        default: 'text' 
      },
      required: { type: Boolean, default: false },
      placeholder: String,
      helpText: String,
      options: [String], // for select/radio/checkbox
      min: Number, // for linear-scale/rating
      max: Number  // for linear-scale/rating
    }]
  }],
  styling: {
    headerImage: String,
    accentColor: { type: String, default: '#3b82f6' },
    backgroundColor: { type: String, default: '#020617' },
    fontStyle: { type: String, default: 'italic' }
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.CustomForm || mongoose.model('CustomForm', CustomFormSchema);

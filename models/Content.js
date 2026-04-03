import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  section: { 
    type: String, 
    required: true, 
    unique: true,
    enum: ['hero', 'about', 'services', 'contact', 'footer', 'stats']
  },
  title: { type: String },
  subtitle: { type: String },
  description: { type: String },
  image: { type: String },
  items: [{
    title: String,
    description: String,
    icon: String,
    link: String
  }],
  metadata: {
    lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPublished: { type: Boolean, default: true }
  }
}, { timestamps: true });

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);

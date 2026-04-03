import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  sectionType: { 
    type: String, 
    required: true,
    enum: ['hero', 'about', 'services', 'contact', 'footer', 'stats', 'banner', 'cta', 'features', 'text-only', 'custom']
  },
  sectionId: { type: String, unique: true }, // For anchoring (e.g., #services)
  title: { type: String },
  subtitle: { type: String },
  description: { type: String },
  image: { type: String },
  videoUrl: { type: String }, // For video backgrounds
  
  items: [{
    title: String,
    description: String,
    icon: String,
    link: String,
    image: String
  }],
  
  styling: {
    backgroundColor: { type: String, default: 'transparent' },
    textColor: { type: String, default: 'white' },
    padding: { type: String, default: 'py-24' },
    alignment: { type: String, default: 'center', enum: ['left', 'center', 'right'] },
    fullWidth: { type: Boolean, default: false }
  },
  
  metadata: {
    lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);

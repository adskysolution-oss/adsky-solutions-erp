import mongoose from 'mongoose';
import './Content'; 

const PageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', default: null }, // for sub-pages
  
  seo: {
    title: { type: String },
    description: { type: String },
    keywords: { type: String }
  },
  
  sections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content' // Each Content document will represent a Section
  }],
  
  isActive: { type: Boolean, default: true },
  showInNav: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Page || mongoose.model('Page', PageSchema);

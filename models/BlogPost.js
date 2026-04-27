import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: String,
  coverImage: String,
  author: { type: String, default: 'AdSky Team' },
  category: { type: String, default: 'General' },
  tags: [String],
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

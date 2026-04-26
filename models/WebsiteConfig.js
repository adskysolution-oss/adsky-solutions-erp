import mongoose from 'mongoose';

const WebsiteConfigSchema = new mongoose.Schema({
  // Global settings
  logo: String,
  contactEmail: String,
  contactPhone: String,
  
  // Homepage CMS Data
  homepage: {
    hero: {
      title: { type: String, default: "EMPOWERING FUTURE WORKFORCE" },
      subtitle: { type: String, default: "Join India's leading AI-first strategic consultancy and operative node." },
      image: { type: String, default: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670" },
      badge: { type: String, default: "Operational Efficiency & Strategic Growth" }
    },
    stats: [{
      label: String,
      value: String,
      iconName: String // CheckCircle, Users, etc.
    }],
    offerings: {
      title: String,
      subtitle: String,
      items: [{
        title: String,
        description: String
      }]
    }
  },
  // About Page CMS Data
  about: {
    title: String,
    subtitle: String,
    description: String,
    image: String
  },
  // Services Page CMS Data
  services: {
    title: String,
    subtitle: String,
    items: [{
      title: String,
      description: String,
      icon: String
    }]
  }
}, { timestamps: true });

export default mongoose.models.WebsiteConfig || mongoose.model('WebsiteConfig', WebsiteConfigSchema);

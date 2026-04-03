import mongoose from 'mongoose';

const WebsiteConfigSchema = new mongoose.Schema({
  siteName: { type: String, default: 'AdSky Solution' },
  siteTitle: { type: String, default: 'The 3-Panel Enterprise ERP' },
  siteDescription: { type: String },
  logoRoot: { type: String }, // Main logo
  logoAlt: { type: String },  // Footer/Dark logo
  favicon: { type: String },
  
  contact: {
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    whatsapp: { type: String }
  },
  
  socialLinks: [{
    platform: { type: String }, // e.g., 'Instagram', 'LinkedIn'
    url: { type: String },
    icon: { type: String }
  }],
  
  theme: {
    primaryColor: { type: String, default: '#3b82f6' },
    secondaryColor: { type: String, default: '#6366f1' },
    darkMode: { type: Boolean, default: true }
  },
  
  footer: {
    copyright: { type: String, default: '© 2026 AdSky Solution. All rights reserved.' },
    links: [{
      label: { type: String },
      url: { type: String }
    }]
  }
}, { timestamps: true });

export default mongoose.models.WebsiteConfig || mongoose.model('WebsiteConfig', WebsiteConfigSchema);

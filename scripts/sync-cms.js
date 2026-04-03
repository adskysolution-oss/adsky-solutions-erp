const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("Please define MONGODB_URI");
  process.exit(1);
}

// Define Schemas inline for the script
const ContentSchema = new mongoose.Schema({
  sectionType: String,
  sectionId: String,
  title: String,
  subtitle: String,
  description: String,
  image: String,
  items: Array,
  metadata: { isPublished: { type: Boolean, default: true } }
});

const PageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
  isActive: { type: Boolean, default: true }
});

const WebsiteConfigSchema = new mongoose.Schema({
  siteName: String,
  siteTitle: String,
  logoRoot: String,
  footer: Object
});

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);
const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);
const WebsiteConfig = mongoose.models.WebsiteConfig || mongoose.model('WebsiteConfig', WebsiteConfigSchema);

async function sync() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  // 1. Create Global Config
  await WebsiteConfig.findOneAndUpdate({}, {
    siteName: 'AdSky Solution',
    siteTitle: 'The 3-Panel Enterprise ERP',
    footer: {
      copyright: '© 2026 AdSky Solution. All rights reserved.'
    }
  }, { upsert: true });

  // 2. Create Sections from app/page.js
  const hero = await Content.findOneAndUpdate({ sectionId: 'hero' }, {
    sectionType: 'hero',
    sectionId: 'hero',
    title: 'Precision Management For The Enterprise Era.',
    description: 'AdSky Solution presents a high-fidelity 3-panel ecosystem for Admins, Employers, and Candidates—engineered for scale and seamless job lifecycle management.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
  }, { upsert: true, new: true });

  const stats = await Content.findOneAndUpdate({ sectionId: 'stats' }, {
    sectionType: 'stats',
    sectionId: 'stats',
    items: [
      { label: 'Tasks Completed', value: '10k+', icon: 'CheckCircle' },
      { label: 'Strong Workforce', value: '500+', icon: 'Users' },
      { label: 'Cities Covered', value: '50+', icon: 'Globe' },
      { label: 'Pin Codes', value: '1000+', icon: 'Zap' }
    ]
  }, { upsert: true, new: true });

  const strategy = await Content.findOneAndUpdate({ sectionId: 'strategy' }, {
    sectionType: 'features',
    sectionId: 'strategy',
    title: 'Fuel Your Future With Expert Strategy.',
    description: 'Website & App Strategy Consultation, CRM/HRMS Setup, and Business Process Automation guidance.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop'
  }, { upsert: true, new: true });

  // 3. Create Home Page
  await Page.findOneAndUpdate({ slug: 'home' }, {
    title: 'Home',
    slug: 'home',
    sections: [hero._id, strategy._id, stats._id],
    showInNav: true
  }, { upsert: true });

  console.log("Sync Complete!");
  process.exit(0);
}

sync().catch(err => {
  console.error(err);
  process.exit(1);
});

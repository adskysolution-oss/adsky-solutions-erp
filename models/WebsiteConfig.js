import mongoose from 'mongoose';

const WebsiteConfigSchema = new mongoose.Schema({
  // Global visual settings
  logo: { type: String, default: "/logo.jpeg" },
  favicon: { type: String, default: "/favicon.ico" },
  siteName: { type: String, default: "AD Sky Solution" },
  
  // Contact info
  contactEmail: { type: String, default: "info@adskysolution.com" },
  contactPhone: { type: String, default: "8076611842" },
  address: { type: String, default: "AD Sky Solution, 126 Satyam Enclave Sahibabad, Ghaziabad UP" },
  
  // Social Media Links
  socialLinks: {
    facebook: { type: String, default: "#" },
    twitter: { type: String, default: "#" },
    linkedin: { type: String, default: "#" },
    instagram: { type: String, default: "#" },
    youtube: { type: String, default: "#" }
  },

  // Global SEO Default Settings
  globalSeo: {
    title: { type: String, default: "AD Sky Solution - Innovative Tech & Growth" },
    description: { type: String, default: "Leading provider of Tech, Strategy and Resource solutions." },
    keywords: { type: String, default: "tech, business, strategy, rabbit farming, growth" },
    ogImage: { type: String, default: "/og-image.jpg" }
  },

  // Footer Settings
  footer: {
    copyright: { type: String, default: "© 2024 AD Sky Solution. All Rights Reserved." },
    aboutText: { type: String, default: "Empowering businesses through innovation and strategic growth." }
  },
  
  // Homepage CMS Data (Existing)
  homepage: {
    hero: {
      slides: [{
        title: String,
        subtitle: String,
        image: String,
        badge: String
      }]
    },
    stats: [{
      label: String,
      value: String,
      iconName: String
    }],
    offerings: {
      title: { type: String, default: "Cognitive, Desk-based, Tech-centric" },
      subtitle: { type: String, default: "Our Offerings" },
      items: [{
        title: String,
        description: String,
        iconName: String
      }]
    },
    strategy: {
      title: { type: String, default: "Fuel Your Future With Expert Strategy." },
      description: { type: String, default: "Website & App Strategy Consultation, CRM/HRMS Setup..." },
      image: { type: String, default: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672" },
      highlight: { type: String, default: "99% Success Rate" },
      price: { type: String, default: "₹999" }
    },
    jobs: {
      mainImage: { type: String, default: "/pointing-person.png" },
      categories: [{
        title: String,
        tag: String,
        count: String,
        image: String
      }]
    },
    testimonials: [{
      name: String,
      role: String,
      content: String,
      image: String
    }],
    blogs: [{
      title: String,
      date: String,
      image: String,
      link: String
    }]
  }
}, { timestamps: true });

export default mongoose.models.WebsiteConfig || mongoose.model('WebsiteConfig', WebsiteConfigSchema);

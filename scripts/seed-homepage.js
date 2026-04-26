import mongoose from 'mongoose';
import connectToDatabase from '../utils/db.js';
import WebsiteConfig from '../models/WebsiteConfig.js';

const seedHomepage = async () => {
  try {
    await connectToDatabase();
    
    const homepageData = {
      homepage: {
        hero: {
          title: "Integrated IT Solutions & Workforce Consulting",
          subtitle: "Delivering expert IT consulting, software development, and professional staffing solutions for growing businesses.",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670",
          badge: "Strategic Growth & Operational Efficiency"
        },
        stats: [
          { label: "Tasks Completed", value: "10k+", iconName: "CheckCircle" },
          { label: "Strong Workforce", value: "500+", iconName: "Users" },
          { label: "Cities Covered", value: "50+", iconName: "Globe" },
          { label: "Pin Codes", value: "1000+", iconName: "Zap" }
        ],
        offerings: {
          title: "Cognitive, Desk-based, Tech-centric",
          subtitle: "Our Offerings",
          items: [
            { 
              title: "Egocentric Video Data for Robotics", 
              description: "High-Quality human POV datasets for imitation learning & embodied AI." 
            },
            { 
              title: "Data Annotation", 
              description: "AI/ML-ready data annotation, tech-scaled for accuracy." 
            },
            { 
              title: "AI-First Tech Capability Centers", 
              description: "Build AI-First On-site Teams." 
            }
          ]
        }
      },
      address: "H-161, BSI Business Park, Sector 63, Noida, UP",
      contactPhone: "+91 91190 55151"
    };

    await WebsiteConfig.findOneAndUpdate({}, homepageData, { upsert: true, new: true });
    console.log('--- DATABASE SYNCED WITH LIVE WEBSITE CONTENT ---');
    process.exit(0);
  } catch (err) {
    console.error('Sync failed:', err);
    process.exit(1);
  }
};

seedHomepage();

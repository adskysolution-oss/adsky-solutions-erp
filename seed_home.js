const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const ContentSchema = new mongoose.Schema({
  sectionType: String,
  title: String,
  subtitle: String,
  description: String,
  image: String,
  items: [mongoose.Schema.Types.Mixed],
  order: Number,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);
const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

async function seedHomeSections() {
  try {
    const MONGODB_URI = "mongodb://adskysolution_db_user:Eg7FMpHSXxVk6dOp@ac-tgi5uyr-shard-00-00.vyzf0e9.mongodb.net:27017,ac-tgi5uyr-shard-00-01.vyzf0e9.mongodb.net:27017,ac-tgi5uyr-shard-00-02.vyzf0e9.mongodb.net:27017/adsky?replicaSet=atlas-5zgvpl-shard-0&ssl=true&authSource=admin";
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB...');

    let homePage = await Page.findOne({ slug: 'home' });
    if (!homePage) {
      homePage = new Page({ title: 'Home Page', slug: 'home', isActive: true });
    }

    if (homePage.sections && homePage.sections.length > 0) {
      await Content.deleteMany({ _id: { $in: homePage.sections } });
    }
    homePage.sections = [];

    const sections = [
      {
        sectionType: 'hero',
        title: 'Integrated IT Solutions & Workforce Consulting',
        description: 'Delivering expert IT consulting, software development, and professional staffing solutions for growing businesses.',
        image: '/men.png',
        order: 0,
        isActive: true
      },
      {
        sectionType: 'stats',
        title: 'Performance Metrics',
        items: [
          { title: '10k+', description: 'TASKS COMPLETED' },
          { title: '500+', description: 'STRONG WORKFORCE' },
          { title: '50+', description: 'CITIES COVERED' },
          { title: '1000+', description: 'PIN CODES' }
        ],
        order: 1,
        isActive: true
      },
      {
        sectionType: 'services',
        title: 'Cognitive, Desk-based, Tech-centric',
        subtitle: 'OUR OFFERINGS',
        items: [
          { 
            title: 'Egocentric Video Data for Robotics', 
            description: 'High-Quality human POV datasets for imitation learning & embodied AI.',
            points: ['4K first-person video capture', '1000+ hours per day', '98%+ accuracy']
          },
          { 
            title: 'Data Annotation', 
            description: 'AI/ML-ready data annotation, tech-scaled for accuracy.',
            points: ['10Mn+ data points labeled', '99%+ accuracy', 'Images, Text, Speech & Video']
          },
          { 
            title: 'AI-First Tech Capability Centers', 
            description: 'Build AI-First On-site Teams.',
            points: ['On-site developers', 'AI-tracked productivity', 'Go live in ~2 weeks']
          }
        ],
        order: 2,
        isActive: true
      },
      {
        sectionType: 'services',
        title: 'Explore Job Categories',
        subtitle: 'OPPORTUNITIES',
        description: 'Find the right career path with our diverse job offerings.',
        items: [
          { title: 'Delivery Partner Jobs', description: '7 Jobs', subtitle: 'Field Work' },
          { title: 'Exam Invigilator Jobs', description: '2 Jobs', subtitle: 'Field Work' },
          { title: 'Digital Gigs Jobs', description: '1 Job', subtitle: 'Work From Home' }
        ],
        order: 3,
        isActive: true
      },
      {
        sectionType: 'testimonials',
        title: 'Why work with us?',
        description: 'Take your skills to the next level with AdSky Solution\'s resources.',
        items: [
          { title: 'Fast Tracking', description: 'Growth Roadmap' },
          { title: 'Certified', description: 'Official Badge' },
          { title: 'Community', description: 'Global Network' }
        ],
        order: 4,
        isActive: true
      },
      {
        sectionType: 'cta',
        title: 'Ready to transform your vision into reality?',
        description: 'Join hundreds of successful partners who have trusted AD Sky Solution with their strategic management and growth.',
        order: 5,
        isActive: true
      }
    ];

    for (const s of sections) {
      const created = await Content.create(s);
      homePage.sections.push(created._id);
    }

    await homePage.save();
    console.log('Complete Home hierarchy seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedHomeSections();

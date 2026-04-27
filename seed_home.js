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
        sectionType: 'strategy',
        title: 'Fuel Your Future With Expert Strategy.',
        description: 'Website & App Strategy Consultation, CRM/HRMS Setup, and Business Process Automation guidance.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672',
        order: 3,
        isActive: true
      },
      {
        sectionType: 'job-grid',
        title: 'Job Categories',
        items: [
          { title: 'Delivery Partner Jobs', count: '7 Jobs', subtitle: 'FIELD WORK', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837' },
          { title: 'Exam Invigilator Jobs', count: '2 Jobs', subtitle: 'FIELD WORK', image: 'https://images.unsplash.com/photo-1434039319359-ef800d9b8fd2' },
          { title: 'Digital Gigs Jobs', count: '1 Job', subtitle: 'WORK FROM HOME', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643' },
          { title: 'Audit Jobs', count: 'Coming Soon', subtitle: 'FIELD WORK', image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b' },
          { title: 'Telecalling Jobs', count: 'Coming Soon', subtitle: 'WORK FROM HOME', image: 'https://images.unsplash.com/photo-1549923155-4422ead50223' },
          { title: 'Recruitment Jobs', count: 'Coming Soon', subtitle: 'WORK FROM HOME', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902' }
        ],
        order: 4,
        isActive: true
      },
      {
        sectionType: 'why-us',
        title: 'Why work with us?',
        description: 'Take your skills to the next level with AdSky Solution\'s resources and top-tier job opportunities.',
        items: [
          { title: 'Fast Tracking', description: 'Growth Roadmap' },
          { title: 'Certified', description: 'Official Badge' },
          { title: 'Community', description: 'Global Network' },
          { title: 'Remote', description: 'Work Anywhere' }
        ],
        order: 5,
        isActive: true
      },
      {
        sectionType: 'steps',
        title: 'How It Works',
        description: 'We ensure reliable execution of your core business operations. Here\'s how we do it:',
        items: [
          { title: 'Project Configuration', description: 'We\'ll configure your task on our platform within 24 hours.' },
          { title: 'Task Allocation', description: 'Our automated system allocates tasks to the workforce in 10ms.' },
          { title: 'Payment Completion', description: 'Our native app offers payment capability, paid every 7 days.' }
        ],
        order: 6,
        isActive: true
      },
      {
        sectionType: 'featured-testimonial',
        title: 'What People Say',
        subtitle: 'Ashwin Malani',
        description: 'I am proud of the person I am today! From my first internship in the Customer Acquisition role to virtually leading a 90-member team, I have recorded 10,000 tasks with AdSky Solution to date.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574',
        order: 7,
        isActive: true
      },
      {
        sectionType: 'blogs',
        title: 'Blogs',
        items: [
          { title: 'How to Introduce Yourself Professionally in a Job Interview?', date: 'Jan 15, 2026', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902' },
          { title: 'Important Documents Required For Joining A Company', date: 'Dec 26, 2024', image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b' },
          { title: 'How To Answer \'Why Should We Hire You?\'', date: 'Nov 26, 2024', image: 'https://images.unsplash.com/photo-1549923155-4422ead50223' }
        ],
        order: 8,
        isActive: true
      },
      {
        sectionType: 'registration',
        title: 'Partner With AdSky',
        description: 'Choose an account type to get started on your journey.',
        items: [
          { title: 'I am a Candidate', description: 'Create a profile to apply for jobs and track applications.' },
          { title: 'I am an Employer', description: 'Post jobs, manage hiring, and consult with our experts.' }
        ],
        order: 9,
        isActive: true
      },
      {
        sectionType: 'cta',
        title: 'Ready to transform your vision into reality?',
        description: 'Join hundreds of successful partners who have trusted AD Sky Solution with their strategic management and growth.',
        order: 10,
        isActive: true
      }
    ];

    for (const s of sections) {
      const created = await Content.create(s);
      homePage.sections.push(created._id);
    }

    await homePage.save();
    console.log('COMPLETE Homepage with Testimonials & Blogs successfully seeded!');
    process.exit();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedHomeSections();

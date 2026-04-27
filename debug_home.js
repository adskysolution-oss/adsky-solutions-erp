const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }]
}, { timestamps: true });

const ContentSchema = new mongoose.Schema({
  sectionType: String,
  title: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);
const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

async function debugHomePage() {
  try {
    const MONGODB_URI = "mongodb://adskysolution_db_user:Eg7FMpHSXxVk6dOp@ac-tgi5uyr-shard-00-00.vyzf0e9.mongodb.net:27017,ac-tgi5uyr-shard-00-01.vyzf0e9.mongodb.net:27017,ac-tgi5uyr-shard-00-02.vyzf0e9.mongodb.net:27017/adsky?replicaSet=atlas-5zgvpl-shard-0&ssl=true&authSource=admin";
    await mongoose.connect(MONGODB_URI);
    
    const home = await Page.findOne({ slug: 'home' }).populate('sections');
    console.log('--- DEBUG HOME PAGE ---');
    if (!home) {
      console.log('Home Page NOT FOUND!');
    } else {
      console.log(`Title: ${home.title}`);
      console.log(`Section count: ${home.sections?.length || 0}`);
      home.sections?.forEach((s, i) => {
        console.log(`Section ${i+1}: ${s?.sectionType} | Title: ${s?.title} | ID: ${s?._id}`);
      });
    }
    console.log('-----------------------');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

debugHomePage();

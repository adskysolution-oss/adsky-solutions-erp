const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);

async function checkPages() {
  try {
    const MONGODB_URI = "mongodb://adskysolution_db_user:Eg7FMpHSXxVk6dOp@ac-tgi5uyr-shard-00-00.vyzf0e9.mongodb.net:27017,ac-tgi5uyr-shard-00-01.vyzf0e9.mongodb.net:27017,ac-tgi5uyr-shard-00-02.vyzf0e9.mongodb.net:27017/adsky?replicaSet=atlas-5zgvpl-shard-0&ssl=true&authSource=admin";
    await mongoose.connect(MONGODB_URI);
    const pages = await Page.find();
    console.log('--- ALL PAGES IN DB ---');
    pages.forEach(p => console.log(`Title: ${p.title} | Slug: ${p.slug} | ID: ${p._id}`));
    console.log('-----------------------');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkPages();

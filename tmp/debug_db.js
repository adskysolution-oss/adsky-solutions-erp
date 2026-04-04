const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://adskysolution_db_user:Eg7FMpHSXxVk6dOp@ac-tgi5uyr-shard-00-00.vyzf0e9.mongodb.net:27017,ac-tgi5uyr-shard-00-01.vyzf0e9.mongodb.net:27017,ac-tgi5uyr-shard-00-02.vyzf0e9.mongodb.net:27017/adsky?replicaSet=atlas-5zgvpl-shard-0&ssl=true&authSource=admin";

async function test() {
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(MONGODB_URI, { 
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000 
    });
    console.log("Connected successfully!");
    
    // Check Content collection
    const Content = mongoose.models.Content || mongoose.model('Content', new mongoose.Schema({ sectionId: String, sectionType: String }));
    const content = await Content.find({});
    console.log("Content count:", content.length);
    console.log("Content samples:", JSON.stringify(content.slice(0, 2), null, 2));
    
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err.message);
    process.exit(1);
  }
}

test();

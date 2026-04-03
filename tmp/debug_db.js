const mongoose = require('mongoose');

const uri = "mongodb+srv://adskysolution_db_user:Eg7FMpHSXxVk6dOp@cluster0.vyzf0e9.mongodb.net/adsky?appName=Cluster0";

console.log("--- MongoDB Connection Test ---");
console.log("URI:", uri.replace(/:([^@]+)@/, ":****@")); // Mask password

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log("✅ SUCCESS: Connected to MongoDB!");
  process.exit(0);
})
.catch(err => {
  console.log("❌ FAILURE: Connection failed.");
  console.log("Error Name:", err.name);
  console.log("Error Message:", err.message);
  if (err.reason) {
    console.log("Error Reason:", JSON.stringify(err.reason, null, 2));
  }
  process.exit(1);
});

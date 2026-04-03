const mongoose = require('mongoose');

const uri = "mongodb+srv://adskysolution_db_user:Eg7FMpHSXxVk6dOp@cluster0.vyzf0e9.mongodb.net/adsky?appName=Cluster0";

console.log("Attempting to connect to MongoDB...");

mongoose.connect(uri)
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB!");
    process.exit(0);
  })
  .catch(err => {
    console.error("FAILURE: Could not connect to MongoDB.");
    console.error(err);
    process.exit(1);
  });

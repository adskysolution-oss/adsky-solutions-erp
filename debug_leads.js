const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const FormResponseSchema = new mongoose.Schema({
  form: mongoose.Schema.Types.ObjectId,
  data: mongoose.Schema.Types.Mixed
}, { timestamps: true });

async function checkLeads() {
  await mongoose.connect(process.env.MONGODB_URI);
  const FormResponse = mongoose.models.FormResponse || mongoose.model('FormResponse', FormResponseSchema);
  
  const count = await FormResponse.countDocuments({});
  console.log(`TOTAL LEADS IN DB: ${count}`);
  
  const recent = await FormResponse.find({}).limit(5).sort({ createdAt: -1 });
  recent.forEach((r, i) => {
    console.log(`Lead ${i+1}: FormID: ${r.form} | Data Keys: ${Object.keys(r.data || {}).join(', ')}`);
  });

  process.exit();
}

checkLeads();

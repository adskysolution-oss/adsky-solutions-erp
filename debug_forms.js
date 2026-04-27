const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const CustomFormSchema = new mongoose.Schema({
  formName: String,
  slug: String,
  isActive: Boolean
});

async function checkForms() {
  await mongoose.connect(process.env.MONGODB_URI);
  const CustomForm = mongoose.models.CustomForm || mongoose.model('CustomForm', CustomFormSchema);
  
  const forms = await CustomForm.find({});
  console.log('--- ALL FORMS IN DB ---');
  forms.forEach(f => {
    console.log(`Name: ${f.formName} | Slug: ${f.slug} | Active: ${f.isActive}`);
  });
  
  // If a form exists with name 'leadform' but wrong slug, let's fix it
  const leadForm = await CustomForm.findOne({ formName: /leadform/i });
  if (leadForm && !leadForm.slug) {
    leadForm.slug = 'leadform';
    await leadForm.save();
    console.log('Fixed leadform slug!');
  }

  process.exit();
}

checkForms();

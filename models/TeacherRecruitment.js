import mongoose from 'mongoose';

const teacherRecruitmentSchema = new mongoose.Schema({
  application_id: { type: String, unique: true, sparse: true },
  full_name: { type: String, required: true },
  father_name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  mobile: { type: String, required: true },
  whatsapp: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  post_applied: { type: String, required: true },
  subject: { type: String, required: true },
  qualification: { type: String, required: true },
  specialization: { type: String, required: true },
  passing_year: { type: String, required: true },
  experience: { type: String, required: true },
  organization_name: { type: String, default: null },
  photo_url: { type: String, required: true },
  declaration_accepted: { type: Boolean, required: true },
  payment_status: { type: String, default: 'Pending' }, // Pending, Paid, Failed
  cashfree_order_id: { type: String, unique: true, sparse: true },
  cashfree_payment_id: { type: String, default: null },
  transaction_id: { type: String, default: null },
  amount: { type: Number, default: 100.0 },
}, { timestamps: true });

export default mongoose.models.TeacherRecruitment || mongoose.model('TeacherRecruitment', teacherRecruitmentSchema);

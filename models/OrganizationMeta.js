import mongoose from 'mongoose';

const OrganizationMetaSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true, 
    unique: true, 
    enum: ['branches', 'categories'] 
  },
  values: [{ type: String }]
}, { timestamps: true });

export default mongoose.models.OrganizationMeta || mongoose.model('OrganizationMeta', OrganizationMetaSchema);

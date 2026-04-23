const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String, required: true, unique: true },
    region: { type: String, required: true },
    commissionRate: { type: Number, default: 28 }, // Percentage
    activeHubs: { type: Number, default: 1 },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Partner', partnerSchema);

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeCode: { type: String, required: true, unique: true },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }, // Assigned Partner
    designation: { type: String, default: 'Field Agent' },
    earnings: { type: Number, default: 0 },
    performanceScore: { type: Number, default: 100 },
    lastLocation: {
        lat: Number,
        lng: Number,
        updatedAt: Date
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);

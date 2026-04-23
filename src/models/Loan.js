const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['SUBMITTED', 'PAYMENT_DONE', 'UNDER_REVIEW', 'DOCUMENT_PENDING', 'APPROVED', 'REJECTED', 'DISBURSED'], 
        default: 'SUBMITTED' 
    },
    documents: [
        {
            name: String,
            url: String,
            verified: { type: Boolean, default: false }
        }
    ],
    appliedOn: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Loan', loanSchema);

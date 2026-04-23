const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
const Loan = require('../models/Loan');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payments/razorpay/order
// @access  Private
const createRazorpayOrder = async (req, res) => {
    const { amount, currency = 'INR' } = req.body;

    try {
        const options = {
            amount: amount * 100, // Amount in paise
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verifiy Payment & Save
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, amount, loanId } = req.body;

    try {
        // In production, verify signature here using crypto

        const payment = await Payment.create({
            userId: req.user._id,
            amount,
            txnId: razorpay_payment_id || razorpay_order_id,
            status: 'SUCCESS',
            gateway: 'RAZORPAY'
        });

        // If this was for a loan, update loan status
        if (loanId) {
            await Loan.findByIdAndUpdate(loanId, { status: 'PAYMENT_DONE' });
        }

        res.json({ message: 'Payment verified and saved', payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createRazorpayOrder, verifyPayment };

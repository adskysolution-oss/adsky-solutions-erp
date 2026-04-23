const express = require('express');
const { createRazorpayOrder, verifyPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/razorpay/order', protect, createRazorpayOrder);
router.post('/verify', protect, verifyPayment);

module.exports = router;

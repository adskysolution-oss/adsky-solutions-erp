const express = require('express');
const { createLoan, getLoans, updateLoanStatus } = require('../controllers/loanController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/apply', protect, createLoan);
router.get('/', protect, authorize('ADMIN'), getLoans);
router.put('/:id/status', protect, authorize('ADMIN'), updateLoanStatus);

module.exports = router;

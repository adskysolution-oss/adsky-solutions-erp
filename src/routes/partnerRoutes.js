const express = require('express');
const { getPartners, createPartner } = require('../controllers/partnerController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, authorize('ADMIN'), getPartners);
router.post('/', protect, authorize('ADMIN'), createPartner);

module.exports = router;

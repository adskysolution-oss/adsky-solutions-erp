const express = require('express');
const { getUsers, createUser, getUsersByRole } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, authorize('ADMIN'), getUsers);
router.post('/create', protect, authorize('ADMIN'), createUser);
router.get('/role/:role', protect, authorize('ADMIN'), getUsersByRole);

module.exports = router;

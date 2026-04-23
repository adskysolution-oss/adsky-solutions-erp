const express = require('express');
const { getEmployees, createEmployee } = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, authorize('ADMIN'), getEmployees);
router.post('/', protect, authorize('ADMIN'), createEmployee);

module.exports = router;

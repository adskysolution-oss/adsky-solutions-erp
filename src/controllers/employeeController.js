const Employee = require('../models/Employee');
const User = require('../models/User');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private/Admin
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({})
            .populate('userId', 'name email phone')
            .populate('partnerId', 'code region');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new employee
// @route   POST /api/employees
// @access  Private/Admin
const createEmployee = async (req, res) => {
    const { userId, employeeCode, partnerId, designation } = req.body;

    try {
        const employee = await Employee.create({
            userId,
            employeeCode: employeeCode || 'EMP' + Date.now(),
            partnerId,
            designation
        });
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getEmployees, createEmployee };

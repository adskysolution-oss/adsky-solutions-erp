const Loan = require('../models/Loan');

// @desc    Create new loan application
// @route   POST /api/loans/apply
// @access  Private/Farmer
const createLoan = async (req, res) => {
    const { amount, documents } = req.body;

    try {
        const loan = await Loan.create({
            userId: req.user._id,
            amount,
            documents
        });
        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all loans (Admin)
// @route   GET /api/loans
// @access  Private/Admin
const getLoans = async (req, res) => {
    try {
        const loans = await Loan.find({}).populate('userId', 'name email phone');
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update loan status
// @route   PUT /api/loans/:id/status
// @access  Private/Admin
const updateLoanStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const loan = await Loan.findById(req.params.id);

        if (loan) {
            loan.status = status;
            loan.updatedAt = Date.now();
            const updatedLoan = await loan.save();
            res.json(updatedLoan);
        } else {
            res.status(404).json({ message: 'Loan not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createLoan, getLoans, updateLoanStatus };

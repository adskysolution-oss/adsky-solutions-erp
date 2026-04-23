const User = require('../models/User');
const Loan = require('../models/Loan');
const Payment = require('../models/Payment');
const Partner = require('../models/Partner');

// @desc    Get dashboard summary report
// @route   GET /api/reports/summary
// @access  Private/Admin
const getSummaryReport = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalLoans = await Loan.countDocuments();
        const activeLoans = await Loan.countDocuments({ status: 'APPROVED' });
        
        const payments = await Payment.find({ status: 'SUCCESS' });
        const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

        const recentPayments = await Payment.find({ status: 'SUCCESS' })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('userId', 'name email');

        res.json({
            stats: {
                totalUsers,
                totalLoans,
                activeLoans,
                totalRevenue
            },
            recentPayments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSummaryReport };

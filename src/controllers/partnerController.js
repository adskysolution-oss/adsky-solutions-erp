const Partner = require('../models/Partner');
const User = require('../models/User');

// @desc    Get all partners
// @route   GET /api/partners
// @access  Private/Admin
const getPartners = async (req, res) => {
    try {
        const partners = await Partner.find({}).populate('userId', 'name email phone');
        res.json(partners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new partner
// @route   POST /api/partners
// @access  Private/Admin
const createPartner = async (req, res) => {
    const { userId, code, region, commissionRate } = req.body;

    try {
        const partner = await Partner.create({
            userId,
            code: code || 'PART' + Date.now(),
            region,
            commissionRate
        });
        res.status(201).json(partner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPartners, createPartner };

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        const adminExists = await User.findOne({ email: 'admin@adskysolution.com' });
        if (adminExists) {
            console.log('Admin already exists. Skipping seed.');
            process.exit(0);
        }

        const admin = await User.create({
            name: 'AdSky System Admin',
            email: 'admin@adskysolution.com',
            phone: '9876543210',
            password: 'Admin@SecureP@ss2026', // This will be hashed via the User model pre-save hook
            role: 'ADMIN',
            state: 'Delhi',
            district: 'New Delhi'
        });

        if (admin) {
            console.log('✅ Admin account seeded successfully!');
            console.log('Email: admin@adskysolution.com');
            console.log('Pass: Admin@SecureP@ss2026');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
};

seedAdmin();

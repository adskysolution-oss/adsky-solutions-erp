const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const updateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB...');

        const NEW_PASSWORD = 'Admin@123';
        const EMAIL = 'admin@adskysolution.com';

        let admin = await User.findOne({ email: EMAIL });
        
        if (admin) {
            console.log('Found admin user. Updating password...');
            admin.password = NEW_PASSWORD;
            await admin.save();
            console.log('✅ Password updated successfully!');
        } else {
            console.log('Admin user not found. Creating new admin...');
            admin = await User.create({
                name: 'AdSky System Admin',
                email: EMAIL,
                phone: '9876543210',
                password: NEW_PASSWORD,
                role: 'ADMIN',
                state: 'Delhi',
                district: 'New Delhi'
            });
            console.log('✅ New admin account created successfully!');
        }

        console.log('Email:', EMAIL);
        console.log('New Password:', NEW_PASSWORD);
        process.exit(0);
    } catch (error) {
        console.error('❌ Operation failed:', error.message);
        process.exit(1);
    }
};

updateAdmin();

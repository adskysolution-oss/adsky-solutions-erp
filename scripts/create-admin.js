import connectToDatabase from '../utils/db.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

async function createAdmin() {
    try {
        await connectToDatabase();
        
        const existing = await User.findOne({ email: 'admin@adskysolution.com' });
        if (existing) {
            console.log("Admin already exists!");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('Admin@123', 12);
        
        const admin = await User.create({
            name: 'Master Admin',
            email: 'admin@adskysolution.com',
            password: hashedPassword,
            phone: '0000000000',
            role: 'admin',
            status: 'active'
        });

        console.log("Admin created successfully:", admin.email);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

createAdmin();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const cleanup = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for cleanup...');

        const result = await User.deleteOne({ email: 'admin@adsky.in' });
        console.log(`Deleted ${result.deletedCount} old admin user(s).`);

        process.exit(0);
    } catch (error) {
        console.error('Cleanup failed:', error.message);
        process.exit(1);
    }
};

cleanup();

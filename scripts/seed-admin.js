const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb://adskysolution_db_user:Eg7FMpHSXxVk6dOp@ac-tgi5uyr-shard-00-00.vyzf0e9.mongodb.net:27017,ac-tgi5uyr-shard-00-01.vyzf0e9.mongodb.net:27017,ac-tgi5uyr-shard-00-02.vyzf0e9.mongodb.net:27017/adsky?replicaSet=atlas-5zgvpl-shard-0&ssl=true&authSource=admin';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin exists
    const User = mongoose.model('User', new mongoose.Schema({
      name: String, email: String, password: { type: String, select: false }, role: String, status: String, phone: String
    }));

    const existing = await User.findOne({ email: 'admin@adsky.com' });
    if (existing) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Super Admin',
      email: 'admin@adsky.com',
      password: hashedPassword,
      phone: '9999999999',
      role: 'admin',
      status: 'active'
    });

    console.log('Admin user created successfully');
    console.log('Email: admin@adsky.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();

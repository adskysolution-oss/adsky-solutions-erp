const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = 'mongodb://localhost:27017/adsky'; // Change if different in .env

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB for seeding...');

  const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String },
    role: String,
    partnerCode: String,
    employeeCode: String
  });

  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  // Clear existing test users (optional)
  // await User.deleteMany({ email: { $in: ['admin@adsky.com', 'partner@adsky.com', 'agent@adsky.com'] } });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  const hashedPartnerPass = await bcrypt.hash('partner123', salt);
  const hashedAgentPass = await bcrypt.hash('agent123', salt);

  const users = [
    {
      name: 'Super Admin',
      email: 'admin@adsky.com',
      password: hashedPassword,
      role: 'admin'
    },
    {
      name: 'Direct Partner',
      email: 'partner@adsky.com',
      password: hashedPartnerPass,
      role: 'partner',
      partnerCode: 'ADSKY001'
    },
    {
      name: 'Field Agent',
      email: 'agent@adsky.com',
      password: hashedAgentPass,
      role: 'employee',
      partnerCode: 'ADSKY001',
      employeeCode: 'EMP1001'
    }
  ];

  for (const user of users) {
    const exists = await User.findOne({ email: user.email });
    if (!exists) {
      await User.create(user);
      console.log(`Created ${user.role} user: ${user.email}`);
    } else {
      console.log(`${user.role} user already exists: ${user.email}`);
    }
  }

  console.log('Seeding complete! You can now login with these credentials.');
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

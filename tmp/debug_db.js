import connectToDatabase from '../utils/db.js';
import User from '../models/User.js';


async function debug() {
  try {
    await connectToDatabase();
    const admin = await User.findOne({ role: /admin/i });
    if (admin) {
      console.log('Found Admin:', { email: admin.email, role: admin.role, status: admin.status });
    } else {
      console.log('No admin found!');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

debug();

import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_local_dev';

// GET Admin Profile
export async function GET(req) {
  try {
    await connectToDatabase();
    
    // Get token from cookie
    const token = req.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Handle hardcoded bypass if they are still on it
    if (token === 'logged_in_token') {
      return NextResponse.json({ 
        name: 'Super Admin', 
        email: 'admin', 
        role: 'super-admin' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE Admin Profile
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { name, email, password, phone } = await req.json();

    const token = req.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let userId;
    
    if (token === 'logged_in_token') {
      // First time transitioning from hardcoded admin to DB admin
      // Check if this new email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return NextResponse.json({ error: 'Email already exists' }, { status: 400 });

      // Create a super-admin
      const hashedPassword = await bcrypt.hash(password || 'admin123', 12);
      const newUser = await User.create({
        name: name || 'Super Admin',
        email: email,
        password: hashedPassword,
        role: 'super-admin',
        status: 'active'
      });
      userId = newUser._id;
    } else {
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
      
      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;
      if (password) updateData.password = await bcrypt.hash(password, 12);

      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) return NextResponse.json({ error: 'Email already in use' }, { status: 400 });

      await User.findByIdAndUpdate(userId, updateData);
    }

    return NextResponse.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

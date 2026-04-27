import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await connectToDatabase();
    const { name, email, password, phone, role, companyName, referralCode } = await req.json();

    if (!name || !email || !password || !phone) {
      return NextResponse.json({ error: 'Please provide all required fields' }, { status: 400 });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return NextResponse.json({ error: 'Email or Phone already registered' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Attribution Logic
    let vendorId = null;
    if (referralCode) {
      const referrer = await User.findOne({ vendorCode: referralCode.toUpperCase() });
      if (referrer) vendorId = referrer._id;
    }

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || 'candidate',
      companyName: role === 'employer' ? companyName : undefined,
      referredBy: referralCode,
      vendorId: vendorId
    });

    return NextResponse.json({ success: true, message: 'User registered successfully', userId: newUser._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

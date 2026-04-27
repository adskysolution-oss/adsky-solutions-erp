import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectToDatabase();
    
    const existing = await User.findOne({ email: 'admin@adskysolution.com' });
    if (existing) {
      return NextResponse.json({ message: "Admin already exists!" });
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    
    await User.create({
      name: 'Master Admin',
      email: 'admin@adskysolution.com',
      password: hashedPassword,
      phone: '0000000000',
      role: 'admin',
      status: 'active'
    });

    return NextResponse.json({ message: "Admin created successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

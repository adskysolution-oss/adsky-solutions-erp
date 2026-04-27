import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectToDatabase();
    const vendors = await User.find({ role: 'vendor' }).sort({ createdAt: -1 });
    return NextResponse.json(vendors);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();

    // Check if email/phone exists
    const existing = await User.findOne({ $or: [{ email: data.email }, { phone: data.phone }] });
    if (existing) return NextResponse.json({ error: "Email or Phone already registered" }, { status: 400 });

    // Generate Vendor Code if missing
    if (!data.vendorCode) {
      const count = await User.countDocuments({ role: 'vendor' });
      data.vendorCode = `ADSKY-V${(count + 1).toString().padStart(3, '0')}`;
    }

    const hashedPassword = await bcrypt.hash(data.password || 'Vendor@123', 10);
    
    const vendor = await User.create({
      ...data,
      password: hashedPassword,
      role: 'vendor'
    });

    return NextResponse.json({ success: true, vendor });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

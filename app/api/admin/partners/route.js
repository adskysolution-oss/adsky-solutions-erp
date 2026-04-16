import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import Partner from '@/models/Partner';

// List all partners
export async function GET() {
  try {
    await connectToDatabase();
    const partners = await Partner.find().populate('user', '-password').sort({ createdAt: -1 });
    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a new partner
export async function POST(req) {
  try {
    await connectToDatabase();
    const { name, email, password, phone, partnerCode, region, commissionRate } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email or phone already exists' }, { status: 400 });
    }

    // Check if partner code exists
    const existingPartner = await Partner.findOne({ partnerCode });
    if (existingPartner) {
      return NextResponse.json({ error: 'Partner code already taken' }, { status: 400 });
    }

    // Create User first
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'partner'
    });

    // Create Partner profile
    const partner = await Partner.create({
      user: user._id,
      partnerCode,
      region,
      commissionRate: commissionRate || 0
    });

    return NextResponse.json({ success: true, partner });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

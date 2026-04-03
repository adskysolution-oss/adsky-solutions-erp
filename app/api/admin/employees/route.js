import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// GET all employees
export async function GET() {
  try {
    await connectToDatabase();
    const employees = await User.find({ 
      role: { $in: ['admin', 'manager', 'sales', 'support', 'super-admin'] } 
    }).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: employees });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE new employee
export async function POST(req) {
  try {
    await connectToDatabase();
    const { name, email, password, phone, role } = await req.json();

    const existing = await User.findOne({ email });
    if (existing) return NextResponse.json({ error: 'User already exists' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password || '123456', 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      status: 'active'
    });

    return NextResponse.json({ success: true, data: newUser });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE employee
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Employee deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

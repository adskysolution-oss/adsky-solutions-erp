import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { sendOnboardingEmail } from '@/utils/email';

// GET all internal employees
export async function GET() {
  try {
    await connectToDatabase();
    // Exclude candidate and employer roles
    const employees = await User.find({ 
      role: { $in: ['admin', 'manager', 'sales', 'support'] } 
    }).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: employees });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new employee
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, email, role, phone, password, subBranch, category } = body;

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) return NextResponse.json({ error: 'User already exists' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await User.create({
      name, email, role, phone, password: hashedPassword,
      subBranch, category,
      mustChangePassword: true,
      status: 'active'
    });

    // Send onboarding email asynchronously
    try {
      await sendOnboardingEmail({ name, email, password, role });
    } catch (emailError) {
      console.error('Failed to send onboarding email:', emailError);
      // We still return success since the user was created
    }

    return NextResponse.json({ success: true, data: employee });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE employee
export async function PUT(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, ...updateData } = body;

    const updated = await User.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, data: updated });
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
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

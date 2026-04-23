import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import { authorize, rbacResponse } from '@/lib/security/rbac';
import bcrypt from 'bcryptjs';

export async function GET(req) {
  const auth = await authorize(['admin']);
  if (!auth.success) return rbacResponse(auth.error);

  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role');
    const status = searchParams.get('status');

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    if (role && role !== 'All') query.role = role.toLowerCase();
    if (status) query.status = status;

    const users = await User.find(query).sort({ createdAt: -1 }).limit(100);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve identity nodes' }, { status: 500 });
  }
}

export async function POST(req) {
  const auth = await authorize(['admin']);
  if (!auth.success) return rbacResponse(auth.error);

  try {
    await connectToDatabase();
    const data = await req.json();
    const { email, password, name, role, phone, state } = data;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Identity already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role?.toLowerCase() || 'user',
      phone,
      state,
      status: 'active'
    });

    return NextResponse.json({ message: 'Identity node provisioned', user: newUser });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  const auth = await authorize(['admin']);
  if (!auth.success) return rbacResponse(auth.error);

  try {
    await connectToDatabase();
    const { userId, ...updateData } = await req.json();
    
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }

    const updated = await User.findByIdAndUpdate(userId, updateData, { new: true });
    
    if (!updated) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Identity node updated', user: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Identity update failed' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const auth = await authorize(['admin']);
  if (!auth.success) return rbacResponse(auth.error);

  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json({ error: 'Identity ID required' }, { status: 400 });
    }

    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return NextResponse.json({ error: 'Identity not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Identity node terminated' });
  } catch (error) {
    return NextResponse.json({ error: 'Termination failed' }, { status: 500 });
  }
}



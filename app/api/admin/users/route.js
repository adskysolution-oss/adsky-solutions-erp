import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'adsky-master-key';

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) return false;

  try {
    const decoded = jwt.verify(token.value, JWT_SECRET);
    return decoded.role === 'admin';
  } catch {
    return false;
  }
}

export async function GET(req) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Access Denied: Admin Elevation Required' }, { status: 403 });
  }

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
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) query.role = role;
    if (status) query.status = status;

    const users = await User.find(query).sort({ createdAt: -1 }).limit(100);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve identity nodes' }, { status: 500 });
  }
}

export async function PATCH(req) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Access Denied: Admin Elevation Required' }, { status: 403 });
  }

  try {
    await connectToDatabase();
    const { userId, status, role } = await req.json();
    const updated = await User.findByIdAndUpdate(userId, { status, role }, { new: true });
    
    if (!updated) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Identity node updated', user: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Identity update failed' }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import { authorize, rbacResponse } from '@/lib/security/rbac';

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
  const auth = await authorize(['admin']);
  if (!auth.success) return rbacResponse(auth.error);


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


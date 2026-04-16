import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
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

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const role = searchParams.get('role');
  const status = searchParams.get('status');

  try {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          search ? { email: { contains: search, mode: 'insensitive' } } : {},
          role ? { role } : {},
          status ? { status } : {}
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: 100
    });

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
    const { userId, status, role } = await req.json();
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { status, role }
    });
    return NextResponse.json({ message: 'Identity node updated', user: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Identity update failed' }, { status: 500 });
  }
}

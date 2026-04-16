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

export async function GET() {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Access Denied: Admin Elevation Required' }, { status: 403 });
  }

  try {
    const config = await prisma.websiteConfig.findUnique({
      where: { id: 'global' }
    });
    return NextResponse.json(config || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve node configuration' }, { status: 500 });
  }
}

export async function POST(req) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Access Denied: Admin Elevation Required' }, { status: 403 });
  }

  try {
    const data = await req.json();
    const updated = await prisma.websiteConfig.upsert({
      where: { id: 'global' },
      update: data,
      create: { id: 'global', ...data }
    });
    return NextResponse.json({ message: 'Configuration synchronized', config: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Configuration sync failed' }, { status: 500 });
  }
}

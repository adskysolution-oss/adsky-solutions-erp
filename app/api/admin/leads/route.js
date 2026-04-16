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
  const status = searchParams.get('status');
  const partnerCode = searchParams.get('partnerCode');

  try {
    const submissions = await prisma.submission.findMany({
      where: {
        AND: [
          status ? { status } : {},
          partnerCode ? { partnerCode } : {}
        ]
      },
      include: {
        form: {
           select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 200
    });

    return NextResponse.json(submissions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve mission stream' }, { status: 500 });
  }
}

export async function PATCH(req) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Access Denied: Admin Elevation Required' }, { status: 403 });
  }

  try {
    const { id, status } = await req.json();
    const updated = await prisma.submission.update({
      where: { id },
      data: { status }
    });
    return NextResponse.json({ message: 'Mission node updated', submission: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Mission update failed' }, { status: 500 });
  }
}

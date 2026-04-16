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
    const partners = await prisma.partner.findMany({
      include: {
        user: {
           select: { email: true, status: true }
        },
        _count: {
           select: { employees: true }
        }
      },
      orderBy: { partnerCode: 'desc' }
    });

    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve partner hubs' }, { status: 500 });
  }
}

export async function POST(req) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Access Denied: Admin Elevation Required' }, { status: 403 });
  }

  try {
    const data = await req.json();
    const { userId, region, commissionRate } = data;

    // Generate next partner code
    const lastPartner = await prisma.partner.findFirst({
      orderBy: { partnerCode: 'desc' }
    });
    
    let nextCode = 'ADS-101';
    if (lastPartner) {
       const lastNum = parseInt(lastPartner.partnerCode.split('-')[1]);
       nextCode = `ADS-${lastNum + 1}`;
    }

    const partner = await prisma.partner.create({
      data: {
        userId,
        partnerCode: nextCode,
        region,
        commissionRate: parseFloat(commissionRate) || 30.0
      }
    });

    return NextResponse.json({ message: 'Hub provisioned successfully', node: partner });
  } catch (error) {
    return NextResponse.json({ error: 'Hub provisioning failed' }, { status: 500 });
  }
}

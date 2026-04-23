import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Partner from '@/models/Partner';
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

export async function GET() {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Access Denied: Admin Elevation Required' }, { status: 403 });
  }

  try {
    await connectToDatabase();
    const partners = await Partner.find()
      .populate('user', 'name email status')
      .sort({ partnerCode: -1 });

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
    await connectToDatabase();
    const data = await req.json();
    const { userId, region, commissionRate } = data;

    // Generate next partner code
    const lastPartner = await Partner.findOne().sort({ partnerCode: -1 });
    
    let nextCode = 'ADS-101';
    if (lastPartner && lastPartner.partnerCode.startsWith('ADS-')) {
       const lastNum = parseInt(lastPartner.partnerCode.split('-')[1]);
       if (!isNaN(lastNum)) {
         nextCode = `ADS-${lastNum + 1}`;
       }
    }

    const partner = await Partner.create({
      user: userId,
      partnerCode: nextCode,
      region,
      commissionRate: parseFloat(commissionRate) || 30.0
    });

    return NextResponse.json({ message: 'Hub provisioned successfully', node: partner });
  } catch (error) {
    return NextResponse.json({ error: 'Hub provisioning failed: ' + error.message }, { status: 500 });
  }
}


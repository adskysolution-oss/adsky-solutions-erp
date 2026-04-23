import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import WebsiteConfig from '@/models/WebsiteConfig';
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
    const config = await WebsiteConfig.findOne();
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
    await connectToDatabase();
    const data = await req.json();
    
    // We only ever have one config
    const updated = await WebsiteConfig.findOneAndUpdate(
      {},
      data,
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ message: 'Configuration synchronized', config: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Configuration sync failed' }, { status: 500 });
  }
}


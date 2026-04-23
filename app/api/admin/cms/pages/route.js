import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Page from '@/models/Page';
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
  const slug = searchParams.get('slug');

  try {
     await connectToDatabase();
     if (slug) {
        const page = await Page.findOne({ slug });
        return NextResponse.json(page);
     }
     const pages = await Page.find().sort({ updatedAt: -1 });
     return NextResponse.json(pages);
  } catch (error) {
     return NextResponse.json({ error: 'Failed to retrieve CMS nodes' }, { status: 500 });
  }
}

export async function POST(req) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Access Denied: Admin Elevation Required' }, { status: 403 });
  }

  try {
    await connectToDatabase();
    const { slug, title, layoutJson, published } = await req.json();
    
    const updated = await Page.findOneAndUpdate(
      { slug },
      { title, layoutJson, published },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ message: 'CMS node synchronized', page: updated });
  } catch (error) {
    return NextResponse.json({ error: 'CMS synchronization failed' }, { status: 500 });
  }
}


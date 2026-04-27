import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Page from '@/models/Page';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const pages = await Page.find().sort({ order: 1 });
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    // Ensure slug is unique
    const existing = await Page.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const page = await Page.create(body);
    return NextResponse.json({ success: true, page });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

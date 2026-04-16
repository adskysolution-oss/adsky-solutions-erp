import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Page from '@/models/Page';
import Content from '@/models/Content';

// Get all pages
export async function GET() {
  try {
    await connectToDatabase();
    const pages = await Page.find().sort({ order: 1 });
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a new page
export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    // Auto-generate slug from title if missing
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    const page = await Page.create(data);
    return NextResponse.json({ success: true, page });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

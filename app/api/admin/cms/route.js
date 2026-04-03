import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Content from '@/models/Content';

// GET all content or specific section
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const section = searchParams.get('section');

    if (section) {
      const content = await Content.findOne({ section });
      return NextResponse.json(content || { section, title: '', subtitle: '', description: '', items: [] });
    }

    const allContent = await Content.find({});
    return NextResponse.json(allContent);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST to update/create content
export async function POST(req) {
  try {
    // Auth validation would use JWT here

    await connectToDatabase();
    const body = await req.json();
    const { section, ...updateData } = body;

    const content = await Content.findOneAndUpdate(
      { section },
      { ...updateData, 'metadata.lastUpdatedBy': 'admin' },
      { new: true, upsert: true }
    );

    return NextResponse.json({ message: 'Content updated successfully', content });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

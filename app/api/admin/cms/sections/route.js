import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Page from '@/models/Page';
import Content from '@/models/Content';

// Get sections for a page
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const pageId = searchParams.get('pageId');
    
    if (!pageId) return NextResponse.json({ error: 'Page ID required' }, { status: 400 });

    const page = await Page.findById(pageId).populate('sections');
    return NextResponse.json(page.sections);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add/Update section
export async function POST(req) {
  try {
    await connectToDatabase();
    const { pageId, sectionData } = await req.json();
    
    let section;
    if (sectionData._id) {
      // Update existing
      section = await Content.findByIdAndUpdate(sectionData._id, sectionData, { new: true });
    } else {
      // Create new
      section = await Content.create(sectionData);
      // Link to page
      await Page.findByIdAndUpdate(pageId, { $push: { sections: section._id } });
    }

    return NextResponse.json({ success: true, section });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

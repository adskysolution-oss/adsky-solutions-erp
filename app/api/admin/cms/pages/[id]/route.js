import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Page from '@/models/Page';
import Content from '@/models/Content';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    let page = await Page.findById(id).populate('sections').lean();
    if (!page) return NextResponse.json({ error: "Page not found" }, { status: 404 });

    // Fallback: If population returned empty but sections array has IDs
    if ((!page.sections || page.sections.length === 0) && page.sections?.length > 0) {
      const sectionDocs = await Content.find({ _id: { $in: page.sections } }).sort({ order: 1 });
      page.sections = sectionDocs;
    }

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await req.json();
    
    const page = await Page.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, page });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Special route for adding/updating sections
export async function PATCH(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const { sectionId, action, sectionData } = await req.json();

    if (action === 'add') {
      const newSection = await Content.create(sectionData);
      await Page.findByIdAndUpdate(id, { $push: { sections: newSection._id } });
      return NextResponse.json({ success: true, section: newSection });
    }

    if (action === 'update') {
      const updated = await Content.findByIdAndUpdate(sectionId, sectionData, { new: true });
      return NextResponse.json({ success: true, section: updated });
    }

    if (action === 'delete') {
      await Page.findByIdAndUpdate(id, { $pull: { sections: sectionId } });
      await Content.findByIdAndDelete(sectionId);
      return NextResponse.json({ success: true });
    }

    if (action === 'reorder') {
        const { sectionIds } = await req.json(); // Array of IDs
        await Page.findByIdAndUpdate(id, { sections: sectionIds });
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

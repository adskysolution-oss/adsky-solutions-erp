import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Page from '@/models/Page';
import Content from '@/models/Content';

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const page = await Page.findOne({ slug }).populate('sections');
      return NextResponse.json(page);
    }

    const pages = await Page.find().sort({ order: 1 });
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    // Create sections if provided
    if (data.sections && data.sections.length > 0) {
      const sectionPromises = data.sections.map(async (sec) => {
        if (sec._id) {
          return Content.findByIdAndUpdate(sec._id, sec, { new: true });
        }
        return Content.create(sec);
      });
      const savedSections = await Promise.all(sectionPromises);
      data.sections = savedSections.map(s => s._id);
    }

    const page = await Page.create(data);
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { id, ...updateData } = data;

    if (updateData.sections && updateData.sections.length > 0) {
      const sectionPromises = updateData.sections.map(async (sec) => {
        if (sec._id) {
          return Content.findByIdAndUpdate(sec._id, sec, { new: true });
        }
        return Content.create(sec);
      });
      const savedSections = await Promise.all(sectionPromises);
      updateData.sections = savedSections.map(s => s._id);
    }

    const page = await Page.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await Page.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

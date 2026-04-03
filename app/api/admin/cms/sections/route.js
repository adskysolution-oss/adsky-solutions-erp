import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Content from '@/models/Content';

// GET sections for a page or all sections
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (id) {
      const section = await Content.findById(id);
      return NextResponse.json(section);
    }
    
    const sections = await Content.find().sort({ 'metadata.order': 1 });
    return NextResponse.json(sections);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - create new section
export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const section = await Content.create(data);
    return NextResponse.json(section);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - update existing section
export async function PUT(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { id, ...updateData } = data;
    const section = await Content.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(section);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - remove section
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await Content.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

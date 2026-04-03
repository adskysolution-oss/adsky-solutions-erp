import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import OrganizationMeta from '@/models/OrganizationMeta';

// GET all meta data (branches and categories)
export async function GET() {
  try {
    await connectToDatabase();
    const meta = await OrganizationMeta.find();
    
    // Default structure if not exists
    const result = {
      branches: meta.find(m => m.type === 'branches')?.values || [],
      categories: meta.find(m => m.type === 'categories')?.values || []
    };

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST to add a value to a meta type
export async function POST(req) {
  try {
    await connectToDatabase();
    const { type, value } = await req.json(); // type: 'branches' | 'categories'

    if (!['branches', 'categories'].includes(type)) {
      return NextResponse.json({ error: 'Invalid meta type' }, { status: 400 });
    }

    const updated = await OrganizationMeta.findOneAndUpdate(
      { type },
      { $addToSet: { values: value } },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE to remove a value from a meta type
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const value = searchParams.get('value');

    if (!type || !value) {
      return NextResponse.json({ error: 'Missing type or value' }, { status: 400 });
    }

    const updated = await OrganizationMeta.findOneAndUpdate(
      { type },
      { $pull: { values: value } },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

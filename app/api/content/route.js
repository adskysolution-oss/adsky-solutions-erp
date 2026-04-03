import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Content from '@/models/Content';

export async function GET(request) {
  try {
    await connectToDatabase();
    const contents = await Content.find({});
    const formatted = contents.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    return NextResponse.json(formatted);
  } catch (err) {
    console.error('Content GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    
    if (!data.key || !data.value) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    const updated = await Content.findOneAndUpdate(
      { key: data.key },
      { value: data.value },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    console.error('Content POST error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import WebsiteConfig from '@/models/WebsiteConfig';

export async function GET() {
  try {
    await connectToDatabase();
    let config = await WebsiteConfig.findOne();
    if (!config) {
      config = await WebsiteConfig.create({});
    }
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    let config = await WebsiteConfig.findOne();
    if (config) {
      config = await WebsiteConfig.findByIdAndUpdate(config._id, data, { new: true });
    } else {
      config = await WebsiteConfig.create(data);
    }
    
    return NextResponse.json({ success: true, config });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

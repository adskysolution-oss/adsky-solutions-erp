import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import WebsiteConfig from '@/models/WebsiteConfig';

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    // Upsert the config (only one config should exist)
    const config = await WebsiteConfig.findOneAndUpdate(
      {}, 
      body, 
      { upsert: true, new: true }
    );
    
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import WebsiteConfig from '@/models/WebsiteConfig';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const config = await WebsiteConfig.findOne();
    return NextResponse.json(config || {});
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

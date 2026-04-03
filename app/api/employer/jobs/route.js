import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Job from '@/models/Job';

// GET all jobs for this employer
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const employerId = searchParams.get('employerId');
    
    const jobs = await Job.find({ employerId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new job
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    // Create slug from title
    const slug = body.title.toLowerCase().replace(/ /g, '-') + '-' + Math.random().toString(36).substring(2, 7);
    
    const job = await Job.create({
      ...body,
      slug,
      status: 'pending' // Admin must approve
    });
    
    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

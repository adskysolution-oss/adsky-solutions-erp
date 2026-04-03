import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Job from '@/models/Job';

// GET all active approved jobs for candidates
export async function GET() {
  try {
    await connectToDatabase();
    
    // Only fetch jobs approved by admin and not expired
    const jobs = await Job.find({ 
      status: 'active' 
    }).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET single job detail by slug
export async function POST(req) {
  try {
    await connectToDatabase();
    const { slug } = await req.json();
    const job = await Job.findOne({ slug, status: 'active' });
    
    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    
    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

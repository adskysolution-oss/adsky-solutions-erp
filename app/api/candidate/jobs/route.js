import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Job from '@/models/Job';

// GET active jobs for candidates with filtering
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || 'All';
    const location = searchParams.get('location') || 'All';
    const category = searchParams.get('category') || 'All';

    let query = { status: 'active' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } }
      ];
    }
    if (type !== 'All') query.jobType = type;
    if (location !== 'All') query.location = { $regex: location, $options: 'i' };
    if (category !== 'All') query.category = category;

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET single job details
export async function POST(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();
    const job = await Job.findById(id);
    
    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    
    // Increment view count (if we had a viewCount field)
    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

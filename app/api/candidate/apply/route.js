import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Application from '@/models/Application';
import Job from '@/models/Job';

// POST new application from candidate
export async function POST(req) {
  try {
    await connectToDatabase();
    const { jobId, candidateId, employerId } = await req.json();

    // Check if already applied
    const existing = await Application.findOne({ job: jobId, candidate: candidateId });
    if (existing) return NextResponse.json({ error: 'Already applied' }, { status: 400 });

    const application = await Application.create({
      job: jobId,
      candidate: candidateId,
      employer: employerId,
      status: 'applied'
    });

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET applications for a specific candidate
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const candidateId = searchParams.get('candidateId');
    
    const applications = await Application.find({ candidate: candidateId })
      .populate('job')
      .populate('employer', 'companyName')
      .sort({ createdAt: -1 });
      
    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Application from '@/models/Application';
import Job from '@/models/Job';
import User from '@/models/User';

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const candidateId = searchParams.get('candidateId');

    if (!candidateId) {
      return NextResponse.json({ error: 'Candidate ID required' }, { status: 400 });
    }

    const totalApplied = await Application.countDocuments({ candidate: candidateId });
    const shortlisted = await Application.countDocuments({ candidate: candidateId, status: 'shortlisted' });
    const interviewing = await Application.countDocuments({ candidate: candidateId, status: 'interview' });
    
    // Recent applications
    const recentApplications = await Application.find({ candidate: candidateId })
      .populate('job', 'title location companyName')
      .sort({ createdAt: -1 })
      .limit(5);

    // Some recommended jobs based on recently viewed or just latest active jobs
    const recommendedJobs = await Job.find({ status: 'active' }).sort({ createdAt: -1 }).limit(3);

    return NextResponse.json({
      success: true,
      stats: {
        totalApplied,
        shortlisted,
        interviewing,
        savedJobs: 0 // Placeholder until saved jobs model is ready
      },
      recentApplications,
      recommendedJobs
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

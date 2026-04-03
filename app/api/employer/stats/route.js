import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Job from '@/models/Job';
import Application from '@/models/Application';

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const employerId = searchParams.get('employerId');
    
    if (!employerId) return NextResponse.json({ error: 'Employer ID required' }, { status: 400 });

    const [activeJobs, pendingJobs, totalApplicants, shortlisted] = await Promise.all([
      Job.countDocuments({ employerId, status: 'active' }),
      Job.countDocuments({ employerId, status: 'pending' }),
      Application.countDocuments({ employer: employerId }),
      Application.countDocuments({ employer: employerId, status: 'shortlisted' })
    ]);

    // Recent Activity (last 5 applications)
    const recentApps = await Application.find({ employer: employerId })
      .populate('candidate', 'name')
      .populate('job', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    const activity = recentApps.map(app => ({
      _id: app._id,
      text: `${app.candidate?.name || 'A candidate'} applied for ${app.job?.title || 'a job'}`,
      time: app.createdAt,
      type: 'user'
    }));

    return NextResponse.json({
      success: true,
      stats: {
        activeJobs,
        pendingJobs,
        totalApplicants,
        shortlisted
      },
      activity
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

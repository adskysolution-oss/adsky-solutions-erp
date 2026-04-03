import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import Lead from '@/models/Lead';
import Job from '@/models/Job';
import Application from '@/models/Application';

export async function GET() {
  try {
    await connectToDatabase();

    const totalEmployees = await User.countDocuments({ 
      role: { $in: ['admin', 'manager', 'sales', 'support'] } 
    });
    const totalLeads = await Lead.countDocuments();
    const candidates = await User.countDocuments({ role: 'candidate' });
    const activeJobs = await Job.countDocuments({ status: 'active' });
    const totalApplications = await Application.countDocuments();

    // Mocking some activity for now, can be replaced with real logs later
    const activity = [
      { text: 'New lead generated from Website', time: new Date() },
      { text: 'New job application for Web Developer', time: new Date(Date.now() - 3600000) },
      { text: 'Sales team added 5 new prospects', time: new Date(Date.now() - 7200000) }
    ];

    return NextResponse.json({
      success: true,
      stats: {
        totalEmployees,
        totalLeads,
        candidates,
        activeJobs,
        totalApplications
      },
      activity
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

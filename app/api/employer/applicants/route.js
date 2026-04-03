import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Application from '@/models/Application';
import User from '@/models/User';
import Job from '@/models/Job';

// GET all applicants for this employer
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const employerId = searchParams.get('employerId');
    
    // Find all applications where the job belongs to this employer
    // Or simpler, where employerId matches
    const applications = await Application.find({ employer: employerId })
      .populate('candidate', 'name email phone')
      .populate('job', 'title')
      .sort({ createdAt: -1 });

    const formatted = applications.map(app => ({
      _id: app._id,
      name: app.candidate?.name || 'Anonymous',
      email: app.candidate?.email || 'N/A',
      phone: app.candidate?.phone || 'N/A',
      role: app.job?.title || 'Unknown Position',
      status: app.status,
      appliedAt: app.appliedAt
    }));
      
    return NextResponse.json({ success: true, data: formatted });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE application status (Shortlist/Reject)
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, status } = await req.json();
    const updated = await Application.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

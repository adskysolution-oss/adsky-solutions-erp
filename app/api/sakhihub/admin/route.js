import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import SakhiHubApplication from '@/models/SakhiHubApplication';

export async function GET(req) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const state = searchParams.get('state');
    const search = searchParams.get('search');

    const query = {};
    if (status) query.status = status;
    if (state) query.state = state;
    if (search) {
      query.$or = [
        { mobileNumber: { $regex: search, $options: 'i' } },
        { organizationName: { $regex: search, $options: 'i' } },
        { applicationId: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await SakhiHubApplication.find(query).sort({ createdAt: -1 });
    
    // Stats
    const stats = {
      total: await SakhiHubApplication.countDocuments(),
      pending: await SakhiHubApplication.countDocuments({ status: 'New' }),
      approved: await SakhiHubApplication.countDocuments({ status: 'Approved' }),
      rejected: await SakhiHubApplication.countDocuments({ status: 'Rejected' })
    };

    return NextResponse.json({ applications, stats });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectToDatabase();
    const { id, status, adminRemarks, partnerId } = await req.json();

    const updateData = { status, adminRemarks, updatedAt: Date.now() };
    if (partnerId) updateData.partnerId = partnerId;

    const application = await SakhiHubApplication.findByIdAndUpdate(id, updateData, { new: true });
    
    return NextResponse.json({ success: true, application });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

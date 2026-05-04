import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import SakhiHubApplication from '@/models/SakhiHubApplication';
import { sendApprovalEmail } from '@/lib/services/emailService';

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    
    const status = searchParams.get('status');
    const state = searchParams.get('state');
    const search = searchParams.get('search');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = {};

    if (status) query.status = status;
    if (state) query.state = state;
    
    if (search) {
      query.$or = [
        { applicationId: { $regex: search, $options: 'i' } },
        { organizationName: { $regex: search, $options: 'i' } },
        { contactPersonName: { $regex: search, $options: 'i' } },
        { mobileNumber: { $regex: search, $options: 'i' } },
        { emailId: { $regex: search, $options: 'i' } }
      ];
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    const applications = await SakhiHubApplication.find(query).sort({ createdAt: -1 });

    const stats = {
      total: await SakhiHubApplication.countDocuments(),
      pending: await SakhiHubApplication.countDocuments({ status: 'New' }),
      approved: await SakhiHubApplication.countDocuments({ status: 'Approved' }),
      rejected: await SakhiHubApplication.countDocuments({ status: 'Rejected' }),
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
    
    const oldApp = await SakhiHubApplication.findById(id);
    if (!oldApp) return NextResponse.json({ error: 'Application not found' }, { status: 404 });

    const updated = await SakhiHubApplication.findByIdAndUpdate(
      id, 
      { status, adminRemarks, partnerId },
      { new: true }
    );

    // Send email if approved
    if (status === 'Approved' && updated.emailId) {
      await sendApprovalEmail(
        updated.emailId, 
        updated.contactPersonName, 
        partnerId || updated.partnerId, 
        updated.organizationName
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

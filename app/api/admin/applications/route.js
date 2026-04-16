import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Application from '@/models/Application';

// List all applications with filters
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const payment = searchParams.get('payment');

    const query = {};
    if (status) query.applicationStatus = status;
    if (payment) query.paymentStatus = payment;

    const applications = await Application.find(query).sort({ createdAt: -1 });
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update application status
export async function PATCH(req) {
  try {
    await connectToDatabase();
    const { applicationId, applicationStatus, remarks } = await req.json();

    const application = await Application.findByIdAndUpdate(
      applicationId, 
      { applicationStatus, remarks }, 
      { new: true }
    );

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

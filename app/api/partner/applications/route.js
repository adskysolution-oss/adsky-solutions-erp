import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Application from '@/models/Application';

export async function PATCH(req) {
  try {
    await connectToDatabase();
    const { applicationId, employeeCode } = await req.json();

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { employeeCode },
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

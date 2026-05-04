import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import SakhiHubApplication from '@/models/SakhiHubApplication';
import { appendToSheet } from '@/lib/services/googleSheets';

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();

    // 1. Duplicate Check
    const existing = await SakhiHubApplication.findOne({
      $or: [
        { mobileNumber: data.mobileNumber },
        { aadhaarNumber: data.aadhaarNumber }
      ]
    });

    if (existing) {
      const field = existing.mobileNumber === data.mobileNumber ? 'mobile number' : 'Aadhaar number';
      return NextResponse.json({ 
        error: `This ${field} is already registered. Duplicate application is not allowed.` 
      }, { status: 400 });
    }

    // 2. Generate Application ID (SH-APP-2026-0001)
    const currentYear = new Date().getFullYear();
    const count = await SakhiHubApplication.countDocuments();
    const sequence = (count + 1).toString().padStart(4, '0');
    const applicationId = `SH-APP-${currentYear}-${sequence}`;

    // 3. Save to MongoDB
    const applicationData = {
      ...data,
      applicationId,
      status: 'New',
      submissionIp: req.headers.get('x-forwarded-for') || '127.0.0.1'
    };

    const application = await SakhiHubApplication.create(applicationData);

    // 4. Sync to Google Sheets (Async)
    try {
      await appendToSheet(applicationData);
    } catch (sheetError) {
      console.error('Failed to sync to Google Sheets:', sheetError);
      // We don't fail the response if sheet sync fails, but we log it.
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully',
      applicationId 
    });

  } catch (error) {
    console.error('Submission Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

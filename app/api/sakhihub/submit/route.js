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

    // 3. Strip Base64 documents — they are too large for MongoDB (16MB limit).
    //    Instead, store only a flag (e.g. "uploaded") so the record saves successfully.
    //    The actual base64 data is sent to Google Sheets separately.
    const safeDocuments = {};
    if (data.documents) {
      Object.keys(data.documents).forEach(key => {
        const val = data.documents[key];
        // If it's a base64 string, just mark it as uploaded (don't store raw base64 in MongoDB)
        safeDocuments[key] = val && val.startsWith('data:') ? 'uploaded' : (val || '');
      });
    }

    // 4. Save to MongoDB (without raw base64 images)
    const applicationData = {
      ...data,
      documents: safeDocuments,
      applicationId,
      status: 'New',
      submissionIp: req.headers.get('x-forwarded-for') || '127.0.0.1'
    };

    const application = await SakhiHubApplication.create(applicationData);

    // 5. Sync to Google Sheets with original data (including doc metadata)
    try {
      await appendToSheet({ ...data, applicationId, status: 'New' });
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
    console.error('SakhiHub Submission Error:', error.message, error.stack);
    return NextResponse.json({ 
      error: error.message || 'Internal server error. Please try again.' 
    }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import MoringaFarmingRegistration from '@/models/MoringaFarmingRegistration';

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();

    // 1. Strip Base64 documents for MongoDB (to avoid 16MB limit)
    const mongoData = { ...data };
    const docFields = ['doc_aadhar_front', 'doc_aadhar_back', 'doc_pan', 'doc_photo', 'doc_bank', 'doc_address', 'doc_land', 'doc_rent_agreement', 'doc_dpr', 'doc_income', 'doc_loan', 'doc_training', 'doc_caste', 'doc_education', 'doc_rural_cert', 'doc_edp', 'doc_affidavit'];
    
    docFields.forEach(field => {
      if (mongoData[field] && mongoData[field].startsWith('data:')) {
        mongoData[field] = 'uploaded'; // Keep a flag instead of raw base64
      }
    });

    const registration = await MoringaFarmingRegistration.findOneAndUpdate(
      { aadhar: data.aadhar },
      { 
        ...mongoData,
        paymentStatus: 'Success'
      },
      { upsert: true, new: true }
    );

    // 2. Sync to Google Sheets (Server-side to avoid CORS and payload issues)
    // Strip Base64 docs from sheet data too (Google Apps Script has payload limits)
    try {
      const GOOGLE_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwU-nyt1OsJ8E_4k-odkJ8ZZJyd85Tdirf46RWZkdH4sL4tUf99ES5hx9LtHxz9PTdg/exec';
      
      const sheetData = { ...data };
      const docFields = ['doc_aadhar_front', 'doc_aadhar_back', 'doc_pan', 'doc_photo', 'doc_bank', 'doc_address', 'doc_land', 'doc_rent_agreement', 'doc_dpr', 'doc_income', 'doc_loan', 'doc_training', 'doc_caste', 'doc_education', 'doc_rural_cert', 'doc_edp', 'doc_affidavit'];
      docFields.forEach(field => {
        if (sheetData[field] && sheetData[field].startsWith('data:')) {
          sheetData[field] = 'Document Uploaded ✓';
        }
      });

      fetch(GOOGLE_WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData)
      }).catch(err => console.error('Google Sheets Sync Error:', err));

    } catch (sheetError) {
      console.error('Failed to trigger Google Sheets sync:', sheetError);
    }

    return NextResponse.json({ success: true, registration });

  } catch (error) {
    console.error('Save Registration Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { google } from 'googleapis';

export async function appendToSheet(data) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const values = [
      [
        new Date().toISOString(), // Timestamp
        data.applicationId,
        data.partnerId || '',
        data.status || 'New',
        data.applicantType,
        data.organizationName,
        data.contactPersonName,
        data.mobileNumber,
        data.alternateMobileNumber || '',
        data.whatsappNumber || '',
        data.emailId,
        data.aadhaarNumber,
        data.panNumber,
        data.gstNumber || '',
        data.ngoRegistrationNumber || '',
        data.state,
        data.district,
        data.tehsil || '',
        data.block || '',
        data.cityVillage || '',
        data.address,
        data.workAreaType,
        (data.selectedStates || []).join(', '),
        (data.selectedDistricts || []).join(', '),
        (data.selectedBlocks || []).join(', '),
        (data.interestedWorkCategories || []).join(', '),
        data.monthlyCapacity || '',
        data.teamSize || '',
        (data.experience || []).join(', '),
        data.bankName,
        data.accountHolderName,
        data.accountNumber,
        data.ifscCode,
        Object.values(data.documents || {}).filter(Boolean).join(' | '), // Document Links
        data.submissionIp || '',
        data.otpVerified ? 'Yes' : 'No',
        data.duplicateCheckStatus || 'Passed',
        '', // Admin Remarks
        '', // Approved / Rejected By
        ''  // Approval Date
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:AN',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    return { success: true };
  } catch (error) {
    console.error('Google Sheets Error:', error);
    return { success: false, error: error.message };
  }
}

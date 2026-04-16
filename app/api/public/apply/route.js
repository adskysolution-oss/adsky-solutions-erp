import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Application from '@/models/Application';
import Partner from '@/models/Partner';
import Employee from '@/models/Employee';

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    const { 
      farmerName, 
      phone, 
      email, 
      partnerCode, 
      employeeCode,
      state,
      district,
      customData // Any data from the dynamic form
    } = data;

    // Create the application in 'pending' status
    const application = await Application.create({
      farmerName,
      phone,
      email,
      partnerCode,
      employeeCode,
      location: { state, district },
      formData: customData,
      paymentStatus: 'pending',
      applicationStatus: 'submitted'
    });

    // Generate a Dummy Payment Link (Integration with Cashfree would go here)
    // For now, we return a success response with the application ID
    // which the frontend will use to redirect to the checkout simulator
    
    return NextResponse.json({ 
      success: true, 
      applicationId: application._id,
      message: 'Lead captured, proceeding to payment.'
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

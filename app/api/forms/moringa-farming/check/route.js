import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import MoringaFarmingRegistration from '@/models/MoringaFarmingRegistration';

export async function POST(req) {
  try {
    await connectToDatabase();
    const { aadhar, mobile } = await req.json();

    if (!aadhar || !mobile) {
      return NextResponse.json({ error: 'Aadhar and Mobile are required' }, { status: 400 });
    }

    // Check if aadhar or mobile already exists with 'Success' payment
    const existing = await MoringaFarmingRegistration.findOne({
      $or: [
        { aadhar: aadhar },
        { mobile: mobile }
      ],
      paymentStatus: 'Success'
    });

    if (existing) {
      const field = existing.aadhar === aadhar ? 'Aadhar Number' : 'Mobile Number';
      return NextResponse.json({ 
        isDuplicate: true, 
        message: `This ${field} is already registered for Moringa Farming.` 
      });
    }

    return NextResponse.json({ isDuplicate: false });

  } catch (error) {
    console.error('Check Duplicate Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

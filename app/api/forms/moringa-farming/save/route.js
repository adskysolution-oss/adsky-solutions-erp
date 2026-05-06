import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import MoringaFarmingRegistration from '@/models/MoringaFarmingRegistration';

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();

    const registration = await MoringaFarmingRegistration.findOneAndUpdate(
      { aadhar: data.aadhar },
      { 
        ...data,
        paymentStatus: 'Success'
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, registration });

  } catch (error) {
    console.error('Save Registration Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import MoringaFarmingRegistration from '@/models/MoringaFarmingRegistration';

export async function GET() {
  try {
    await connectToDatabase();
    // Fetch all registrations sorted by latest first
    const forms = await MoringaFarmingRegistration.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, forms });
  } catch (error) {
    console.error('Fetch Moringa Farming Forms Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

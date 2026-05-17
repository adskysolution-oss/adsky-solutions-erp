import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import RabbitFarmingRegistration from '@/models/RabbitFarmingRegistration';

export async function GET() {
  try {
    await connectToDatabase();
    // Fetch all registrations sorted by latest first
    const forms = await RabbitFarmingRegistration.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, forms });
  } catch (error) {
    console.error('Fetch Rabbit Farming Forms Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

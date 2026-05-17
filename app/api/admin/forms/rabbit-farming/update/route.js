import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import RabbitFarmingRegistration from '@/models/RabbitFarmingRegistration';

export async function POST(req) {
  try {
    await connectToDatabase();
    const { id, updatedData } = await req.json();

    if (!id || !updatedData) {
      return NextResponse.json({ success: false, error: 'Missing id or updatedData' }, { status: 400 });
    }

    const updated = await RabbitFarmingRegistration.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    return NextResponse.json({ success: true, form: updated });
  } catch (error) {
    console.error('Update Rabbit Farming Form Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

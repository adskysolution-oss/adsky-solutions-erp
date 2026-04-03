import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Subscription from '@/models/Subscription';

export async function GET() {
  try {
    await connectToDatabase();
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });
    return NextResponse.json(subscriptions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import FormResponse from '@/models/FormResponse';
import CustomForm from '@/models/CustomForm';

export async function GET() {
  try {
    await connectToDatabase();
    const responses = await FormResponse.find()
      .populate('form')
      .sort({ createdAt: -1 });
    return NextResponse.json(responses);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

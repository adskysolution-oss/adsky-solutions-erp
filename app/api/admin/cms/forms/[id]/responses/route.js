import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import FormResponse from '@/models/FormResponse';

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const responses = await FormResponse.find({ formId: id }).sort({ createdAt: -1 });
    return NextResponse.json(responses);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

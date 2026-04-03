import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Lead from '@/models/Lead';

// GET all leads
export async function GET() {
  try {
    await connectToDatabase();
    const leads = await Lead.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE new lead
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const lead = await Lead.create(body);
    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE lead status
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, status, notes } = await req.json();
    const updated = await Lead.findByIdAndUpdate(id, { status, notes }, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

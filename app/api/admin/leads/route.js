import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Lead from '@/models/Lead';
import User from '@/models/User';

// GET all leads with filtering
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'All';
    const source = searchParams.get('source') || 'All';
    const search = searchParams.get('search') || '';

    let query = {};
    if (status !== 'All') query.status = status;
    if (source !== 'All') query.source = source;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const leads = await Lead.find(query)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
      
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new lead
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

// UPDATE lead (Status, Assignment, Notes)
export async function PUT(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, ...updateData } = body;

    const updated = await Lead.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE lead
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    await Lead.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

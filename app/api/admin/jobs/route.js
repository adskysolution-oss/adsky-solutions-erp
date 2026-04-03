import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Job from '@/models/Job';

// GET all jobs for admin
export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await Job.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE job status (Approve/Reject)
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, status } = await req.json();
    const updated = await Job.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE job
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await Job.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Job deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

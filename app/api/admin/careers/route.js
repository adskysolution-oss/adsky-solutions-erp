import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Job from '@/models/Job';

export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await Job.find().sort({ createdAt: -1 });
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    let job;
    if (data._id) {
      job = await Job.findByIdAndUpdate(data._id, data, { new: true });
    } else {
      job = await Job.create(data);
    }
    return NextResponse.json({ success: true, job });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

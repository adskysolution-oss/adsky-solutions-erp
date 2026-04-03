import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';

// GET candidate profile
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const candidateId = searchParams.get('candidateId');
    
    const profile = await User.findById(candidateId).select('-password');
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE candidate profile
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { candidateId, ...updateData } = body;
    
    // Ensure education and experience are handled correctly if they are arrays
    const updated = await User.findByIdAndUpdate(candidateId, { $set: updateData }, { new: true }).select('-password');
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

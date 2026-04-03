import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import User from '@/models/User';

// GET candidate profile
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const candidateId = searchParams.get('candidateId');
    
    // In our simplified model, we use the User model for candidates too
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
    
    const updated = await User.findByIdAndUpdate(candidateId, updateData, { new: true }).select('-password');
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

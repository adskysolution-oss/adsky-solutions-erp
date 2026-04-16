import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Employee from '@/models/Employee';

export async function GET() {
  try {
    await connectToDatabase();
    // Get all employees and populate user info
    const employees = await Employee.find()
      .populate('user', '-password')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

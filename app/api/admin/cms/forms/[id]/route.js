import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import CustomForm from '@/models/CustomForm';

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    const form = await CustomForm.findById(id);
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    
    return NextResponse.json(form);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

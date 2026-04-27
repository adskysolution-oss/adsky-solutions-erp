import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import CustomForm from '@/models/CustomForm';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { slug } = params;
    const form = await CustomForm.findOne({ slug, isActive: true });
    
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    
    return NextResponse.json(form);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

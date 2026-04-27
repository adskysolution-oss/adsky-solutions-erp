import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import FormResponse from '@/models/FormResponse';
import CustomForm from '@/models/CustomForm';

export async function POST(req) {
  try {
    await connectToDatabase();
    const { slug, ...data } = await req.json();

    // Flexible slug search (case-insensitive, optional leading slash)
    const form = await CustomForm.findOne({ 
      slug: { $regex: new RegExp(`^/?${slug.trim()}$`, 'i') } 
    });
    
    if (!form) {
      return NextResponse.json({ error: 'Form structure not found in the dynamic engine.' }, { status: 404 });
    }

    const response = await FormResponse.create({
      form: form._id,
      data
    });

    return NextResponse.json({ success: true, message: 'Response recorded successfully.' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import CustomForm from '@/models/CustomForm';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { slug } = params;
    console.log(`[API] Fetching form for slug: ${slug}`);
    
    // Look for slug with or without leading slash, case-insensitive
    const form = await CustomForm.findOne({ 
      slug: { $regex: new RegExp(`^/?${slug.trim()}$`, 'i') } 
    });
    
    if (!form) {
      console.log(`[API] Form NOT FOUND for slug: ${slug}`);
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    console.log(`[API] Form FOUND: ${form.formName}`);
    
    return NextResponse.json(form);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/utils/db';
import CustomForm from '@/models/CustomForm';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    
    if (!slug) {
      return NextResponse.json({ error: "Slug is missing" }, { status: 400 });
    }
    
    const cleanSlug = slug.trim();
    const slugRegex = new RegExp(`^/?${cleanSlug}$`, 'i');
    
    console.log(`[API] Fetching form for slug: ${cleanSlug}`);
    
    const form = await CustomForm.findOne({ slug: slugRegex });
    
    if (!form) {
      console.log(`[API] Form NOT FOUND for slug: ${slug}`);
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    console.log(`[API] Form FOUND: ${form.formName}`);
    
    return NextResponse.json(form);
  } catch (error) {
    console.error(`[API ERROR] Error fetching form:`, error);
    return NextResponse.json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    }, { status: 500 });
  }
}

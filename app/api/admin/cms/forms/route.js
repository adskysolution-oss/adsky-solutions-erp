import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import CustomForm from '@/models/CustomForm';

// Get all forms
export async function GET() {
  try {
    await connectToDatabase();
    const forms = await CustomForm.find().sort({ createdAt: -1 });
    return NextResponse.json(forms);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create/Update form
export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    if (!data.slug) {
      data.slug = data.formName.toLowerCase().replace(/\s+/g, '-');
    }
    
    let form;
    if (data._id) {
      form = await CustomForm.findByIdAndUpdate(data._id, data, { new: true });
    } else {
      form = await CustomForm.create(data);
    }

    return NextResponse.json({ success: true, form });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

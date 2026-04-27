import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import FormResponse from '@/models/FormResponse';
import CustomForm from '@/models/CustomForm';

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;

    const form = await CustomForm.findById(id);
    if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });

    const submissions = await FormResponse.find({ form: id }).sort({ createdAt: -1 });

    return NextResponse.json({ form, submissions });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectToDatabase();
    const { submissionId, status } = await req.json();

    const updated = await FormResponse.findByIdAndUpdate(submissionId, { status }, { new: true });
    return NextResponse.json({ success: true, submission: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

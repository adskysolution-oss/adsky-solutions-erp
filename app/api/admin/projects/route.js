import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Project from '@/models/Project';

// GET projects with filtering
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'all';
    const search = searchParams.get('search') || '';
    const dateRange = searchParams.get('dateRange') || 'all';

    let query = {};
    
    // Status Filter
    if (status !== 'all') {
      query.status = status;
    }

    // Search Filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    // Date Range Filter (Today, Week, Month)
    if (dateRange !== 'all') {
      const now = new Date();
      let startDate = new Date();
      if (dateRange === 'today') {
        startDate.setHours(0, 0, 0, 0);
      } else if (dateRange === 'week') {
        startDate.setDate(now.getDate() - 7);
      } else if (dateRange === 'month') {
        startDate.setMonth(now.getMonth() - 1);
      }
      query.createdAt = { $gte: startDate };
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE new project
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE project
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, ...updateData } = await req.json();
    const updated = await Project.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

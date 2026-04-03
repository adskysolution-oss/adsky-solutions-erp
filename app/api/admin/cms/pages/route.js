import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Page from '@/models/Page';
import Content from '@/models/Content';

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    // Auto-seed if database is empty
    const pageCount = await Page.countDocuments();
    if (pageCount === 0) {
      console.log("Database empty. Auto-seeding initial pages...");
      
      // Create initial sections for seeding
      const hero = await Content.create({
        sectionId: 'hero',
        sectionType: 'hero',
        title: 'Precision Management For The Enterprise Era.',
        description: 'AdSky Solution presents a high-fidelity 3-panel ecosystem for Admins, Employers, and Candidates—engineered for scale and seamless job lifecycle management.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
      });

      const stats = await Content.create({
        sectionId: 'stats',
        sectionType: 'stats',
        items: [
          { label: 'Tasks Completed', value: '10k+', icon: 'CheckCircle' },
          { label: 'Strong Workforce', value: '500+', icon: 'Users' },
          { label: 'Cities Covered', value: '50+', icon: 'Globe' },
          { label: 'Pin Codes', value: '1000+', icon: 'Zap' }
        ]
      });

      const strategy = await Content.create({
        sectionId: 'strategy',
        sectionType: 'features',
        title: 'Fuel Your Future With Expert Strategy.',
        description: 'Website & App Strategy Consultation, CRM/HRMS Setup, and Business Process Automation guidance.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop'
      });

      await Page.create({
        title: 'Home',
        slug: 'home',
        sections: [hero._id, strategy._id, stats._id],
        showInNav: true,
        isActive: true
      });

      await Page.create({
        title: 'About',
        slug: 'about',
        sections: [],
        showInNav: true,
        isActive: true
      });
    }

    if (slug) {
      const page = await Page.findOne({ slug }).populate('sections');
      return NextResponse.json(page);
    }

    const pages = await Page.find().sort({ order: 1 });
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    // Create sections if provided
    if (data.sections && data.sections.length > 0) {
      const sectionPromises = data.sections.map(async (sec) => {
        if (sec._id) {
          return Content.findByIdAndUpdate(sec._id, sec, { new: true });
        }
        return Content.create(sec);
      });
      const savedSections = await Promise.all(sectionPromises);
      data.sections = savedSections.map(s => s._id);
    }

    const page = await Page.create(data);
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { id, ...updateData } = data;

    if (updateData.sections && updateData.sections.length > 0) {
      const sectionPromises = updateData.sections.map(async (sec) => {
        if (sec._id) {
          return Content.findByIdAndUpdate(sec._id, sec, { new: true });
        }
        return Content.create(sec);
      });
      const savedSections = await Promise.all(sectionPromises);
      updateData.sections = savedSections.map(s => s._id);
    }

    const page = await Page.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await Page.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

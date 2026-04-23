import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Page from '@/models/Page';
import { authorize, rbacResponse } from '@/lib/security/rbac';

export async function GET(req) {
  const auth = await authorize(['admin']);
  if (!auth.success) return rbacResponse(auth.error);


  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  try {
     await connectToDatabase();
     if (slug) {
        const page = await Page.findOne({ slug });
        return NextResponse.json(page);
     }
     const pages = await Page.find().sort({ updatedAt: -1 });
     return NextResponse.json(pages);
  } catch (error) {
     return NextResponse.json({ error: 'Failed to retrieve CMS nodes' }, { status: 500 });
  }
}

export async function POST(req) {
  const auth = await authorize(['admin']);
  if (!auth.success) return rbacResponse(auth.error);


  try {
    await connectToDatabase();
    const { slug, title, layoutJson, published } = await req.json();
    
    const updated = await Page.findOneAndUpdate(
      { slug },
      { title, layoutJson, published },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ message: 'CMS node synchronized', page: updated });
  } catch (error) {
    return NextResponse.json({ error: 'CMS synchronization failed' }, { status: 500 });
  }
}


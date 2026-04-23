import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import WebsiteConfig from '@/models/WebsiteConfig';
import { authorize, rbacResponse } from '@/lib/security/rbac';

export async function GET() {
  const auth = await authorize(['admin']);
  if (!auth.success) return rbacResponse(auth.error);


  try {
    await connectToDatabase();
    const config = await WebsiteConfig.findOne();
    return NextResponse.json(config || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve node configuration' }, { status: 500 });
  }
}

export async function POST(req) {
  const auth = await authorize(['admin']);
  if (!auth.success) return rbacResponse(auth.error);


  try {
    await connectToDatabase();
    const data = await req.json();
    
    // We only ever have one config
    const updated = await WebsiteConfig.findOneAndUpdate(
      {},
      data,
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ message: 'Configuration synchronized', config: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Configuration sync failed' }, { status: 500 });
  }
}


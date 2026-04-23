import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Partner from '@/models/Partner';
import User from '@/models/User';
import { authorize, rbacResponse } from '@/lib/security/rbac';

export async function GET() {
  const auth = await authorize(['admin']);
  if (!auth.success) return rbacResponse(auth.error);


  try {
    await connectToDatabase();
    const partners = await Partner.find()
      .populate('user', 'name email status')
      .sort({ partnerCode: -1 });

    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve partner hubs' }, { status: 500 });
  }
}

export async function POST(req) {
  const auth = await authorize(['admin']);
  if (!auth.success) return rbacResponse(auth.error);


  try {
    await connectToDatabase();
    const data = await req.json();
    const { userId, region, commissionRate } = data;

    // Generate next partner code
    const lastPartner = await Partner.findOne().sort({ partnerCode: -1 });
    
    let nextCode = 'ADS-101';
    if (lastPartner && lastPartner.partnerCode.startsWith('ADS-')) {
       const lastNum = parseInt(lastPartner.partnerCode.split('-')[1]);
       if (!isNaN(lastNum)) {
         nextCode = `ADS-${lastNum + 1}`;
       }
    }

    const partner = await Partner.create({
      user: userId,
      partnerCode: nextCode,
      region,
      commissionRate: parseFloat(commissionRate) || 30.0
    });

    return NextResponse.json({ message: 'Hub provisioned successfully', node: partner });
  } catch (error) {
    return NextResponse.json({ error: 'Hub provisioning failed: ' + error.message }, { status: 500 });
  }
}

